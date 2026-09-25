#!/usr/bin/env node
// QA rápido (skill qa-site, nível completo usa também npx lhci autorun).
// Pressupõe que "npm run preview" já está rodando em http://localhost:4321
// (o próprio operador ou agente sobe isso antes, nunca "astro dev").
//
// Faz, nessa ordem:
//   1. screenshots em 320/375/768/1440px, salvos em qa/<data>/
//   2. auditoria de acessibilidade (@axe-core/playwright) em 375 e 1440px
//   3. checagem de overflow horizontal em cada largura
//   4. soma do peso "gzip" do JS carregado na home (comprime localmente com
//      zlib, porque o servidor de preview pode não comprimir)
//   5. tamanho do arquivo de imagem do hero, se o hero tiver alguma <img>
//   6. parse do JSON-LD da home, para garantir que é um JSON válido
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { gzipSync } from 'node:zlib';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const URL_BASE = process.env.QA_URL ?? 'http://localhost:4321';
const LARGURAS = [320, 375, 768, 1440];
const LIMITE_JS_GZIP_KB = 50;
const LIMITE_HERO_KB = 150;

const raizBase = fileURLToPath(new URL('..', import.meta.url));
const hoje = new Date().toISOString().slice(0, 10);
const pastaQa = join(raizBase, 'qa', hoje);
mkdirSync(pastaQa, { recursive: true });

/** @type {string[]} */
const problemas = [];

async function confirmarPreviewNoAr() {
  try {
    const resposta = await fetch(URL_BASE, { method: 'GET' });
    if (!resposta.ok) throw new Error(`status ${resposta.status}`);
  } catch (erro) {
    console.error(
      `\n[qa] Não consegui acessar ${URL_BASE}. Suba "npm run preview" antes de rodar "npm run qa".\n` +
        `Detalhe: ${erro instanceof Error ? erro.message : erro}\n`
    );
    process.exit(1);
  }
}

async function main() {
  await confirmarPreviewNoAr();

  const browser = await chromium.launch();

  // ---- 1, 3, 4: screenshots + overflow + peso de JS, um por largura -------
  let pesoJsGzipTotalBytes = 0;
  const requisicoesJsContadas = new Set();

  for (const largura of LARGURAS) {
    const contexto = await browser.newContext({ viewport: { width: largura, height: 900 } });
    const pagina = await contexto.newPage();

    pagina.on('response', async (resposta) => {
      const url = resposta.url();
      const tipo = resposta.headers()['content-type'] ?? '';
      const ehJs = url.endsWith('.js') || tipo.includes('javascript');
      if (!ehJs || requisicoesJsContadas.has(url)) return;
      requisicoesJsContadas.add(url);
      try {
        const corpo = await resposta.body();
        pesoJsGzipTotalBytes += gzipSync(corpo).byteLength;
      } catch {
        // resposta sem corpo acessível (redirect, etc.): ignora
      }
    });

    await pagina.goto(URL_BASE, { waitUntil: 'networkidle' });

    const temOverflow = await pagina.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );
    if (temOverflow) {
      problemas.push(`Overflow horizontal em ${largura}px.`);
    }

    await pagina.screenshot({
      path: join(pastaQa, `largura-${largura}.png`),
      fullPage: true,
    });

    // ---- 2: axe só em 375 e 1440, pra não repetir 4x o mesmo relatório ----
    if (largura === 375 || largura === 1440) {
      const resultadoAxe = await new AxeBuilder({ page: pagina }).analyze();
      if (resultadoAxe.violations.length > 0) {
        for (const violacao of resultadoAxe.violations) {
          problemas.push(
            `[axe ${largura}px] ${violacao.id} (${violacao.impact}): ${violacao.help} — ${violacao.nodes.length} ocorrência(s).`
          );
        }
      }
      writeFileSync(
        join(pastaQa, `axe-${largura}.json`),
        JSON.stringify(resultadoAxe.violations, null, 2)
      );
    }

    // ---- 5: tamanho do hero, so na primeira largura (mesma imagem sempre) --
    if (largura === LARGURAS[0]) {
      const srcHero = await pagina
        .locator('section[aria-labelledby="hero-titulo"] img')
        .first()
        .getAttribute('src')
        .catch(() => null);
      if (srcHero) {
        const respostaHero = await pagina.request.get(new URL(srcHero, URL_BASE).toString());
        const tamanhoKb = (await respostaHero.body()).byteLength / 1024;
        if (tamanhoKb > LIMITE_HERO_KB) {
          problemas.push(
            `Imagem do hero com ${tamanhoKb.toFixed(1)} KB, acima do limite de ${LIMITE_HERO_KB} KB.`
          );
        }
        console.log(`[qa] Imagem do hero: ${tamanhoKb.toFixed(1)} KB.`);
      } else {
        console.log('[qa] Hero sem <img> (layout tipográfico) — checagem de tamanho pulada.');
      }
    }

    await contexto.close();
  }

  const pesoJsGzipKb = pesoJsGzipTotalBytes / 1024;
  console.log(`[qa] JS total (gzip estimado): ${pesoJsGzipKb.toFixed(1)} KB em ${requisicoesJsContadas.size} arquivo(s).`);
  if (pesoJsGzipKb > LIMITE_JS_GZIP_KB) {
    problemas.push(`JS gzip da home em ${pesoJsGzipKb.toFixed(1)} KB, acima do limite de ${LIMITE_JS_GZIP_KB} KB.`);
  }

  // ---- 6: JSON-LD valido -----------------------------------------------
  const paginaFinal = await browser.newPage();
  await paginaFinal.goto(URL_BASE, { waitUntil: 'networkidle' });
  const jsonLdTexto = await paginaFinal
    .locator('script[type="application/ld+json"]')
    .first()
    .textContent();
  if (!jsonLdTexto) {
    problemas.push('Nenhum <script type="application/ld+json"> encontrado na home.');
  } else {
    try {
      JSON.parse(jsonLdTexto);
      console.log('[qa] JSON-LD: válido.');
    } catch (erro) {
      problemas.push(`JSON-LD inválido: ${erro instanceof Error ? erro.message : erro}`);
    }
  }

  await browser.close();

  console.log(`\n[qa] Screenshots e relatórios de axe salvos em ${pastaQa}`);

  if (problemas.length > 0) {
    console.error('\n[qa] Problemas encontrados:');
    for (const problema of problemas) console.error(`  - ${problema}`);
    process.exitCode = 1;
  } else {
    console.log('\n[qa] Nenhum problema encontrado.');
  }
}

main();
