#!/usr/bin/env node
// Prebuild: valida o conteudo antes de astro check/build (CLAUDE.md secao 7).
// Roda sobre os arquivos-fonte (nao existe dist/ ainda neste ponto do ciclo).
//
// O que falha o build:
// 1. Qualquer item de depoimentos/numeros/credenciais/premios em src/data/site.ts
//    sem os campos "fonte" e "aprovadoPeloCliente: true". SEMPRE ativo.
// 2. Texto banido em qualquer .astro/.ts de src/: "lorem", "Cliente Satisfeito",
//    "João S." (case-insensitive para lorem). SEMPRE ativo.
// 3. Um numero de 2+ digitos escrito direto no conteudo visivel de uma secao ou
//    pagina de negocio (src/components/sections, src/pages, exceto paginas
//    legais e utilitarias) que nao aparece em nenhum lugar de src/data/site.ts.
//    A ideia e forcar todo numero exibido (estatistica, preco, ano) a vir da
//    fonte de dados unica, nunca escrito solto num componente. SEMPRE ativo.
// 4. "[PREENCHER" presente em qualquer arquivo de conteudo, mas SO quando a
//    variavel de ambiente DEPLOY_ALVO=producao estiver definida. Sem essa
//    variavel (build local, de demonstracao ou de revisao com o cliente),
//    placeholders pendentes sao permitidos e so aparecem no relatorio final.
//
// Paginas excluidas da checagem 3 porque citam numeros legitimos que nao vem
// de site.ts (lei, ano de norma, codigo de status HTTP):
const PAGINAS_EXCLUIDAS_DE_NUMEROS = ['politica-de-privacidade.astro'];

import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listarArquivos, removerFrontmatter, removerTags, removerExpressoes } from './lib/texto.mjs';

const raizBase = fileURLToPath(new URL('..', import.meta.url));
const srcDir = join(raizBase, 'src');
const isProducao = process.env.DEPLOY_ALVO === 'producao';

/** @type {string[]} */
const erros = [];
/** @type {string[]} */
const avisos = [];

// ---------------------------------------------------------------------------
// 1. depoimentos / numeros / credenciais / premios precisam de prova real
// ---------------------------------------------------------------------------

function extrairArrayLiteral(texto, nomeCampo) {
  const marcador = `${nomeCampo}:`;
  const inicioCampo = texto.indexOf(marcador);
  if (inicioCampo === -1) return null;
  const inicioColchete = texto.indexOf('[', inicioCampo);
  if (inicioColchete === -1) return null;

  let profundidade = 0;
  let dentroDeString = null; // aspas ou crase atual, ou null
  for (let i = inicioColchete; i < texto.length; i++) {
    const c = texto[i];
    const anterior = texto[i - 1];
    if (dentroDeString) {
      if (c === dentroDeString && anterior !== '\\') dentroDeString = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      dentroDeString = c;
      continue;
    }
    if (c === '[') profundidade++;
    if (c === ']') {
      profundidade--;
      if (profundidade === 0) {
        return texto.slice(inicioColchete, i + 1);
      }
    }
  }
  return null;
}

function dividirObjetosDoArray(arrayTexto) {
  const objetos = [];
  let profundidade = 0;
  let inicioObjeto = -1;
  let dentroDeString = null;
  for (let i = 0; i < arrayTexto.length; i++) {
    const c = arrayTexto[i];
    const anterior = arrayTexto[i - 1];
    if (dentroDeString) {
      if (c === dentroDeString && anterior !== '\\') dentroDeString = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      dentroDeString = c;
      continue;
    }
    if (c === '{') {
      if (profundidade === 0) inicioObjeto = i;
      profundidade++;
    }
    if (c === '}') {
      profundidade--;
      if (profundidade === 0 && inicioObjeto !== -1) {
        objetos.push(arrayTexto.slice(inicioObjeto, i + 1));
        inicioObjeto = -1;
      }
    }
  }
  return objetos;
}

function validarProvaReal(siteTsTexto) {
  const campos = ['depoimentos', 'numeros', 'credenciais', 'premios'];
  for (const campo of campos) {
    const arrayTexto = extrairArrayLiteral(siteTsTexto, campo);
    if (!arrayTexto) continue;
    const objetos = dividirObjetosDoArray(arrayTexto);
    objetos.forEach((objeto, indice) => {
      const temFonte = /\bfonte\s*:/.test(objeto);
      const temAprovacao = /\baprovadoPeloCliente\s*:\s*true\b/.test(objeto);
      if (!temFonte || !temAprovacao) {
        erros.push(
          `src/data/site.ts: item ${indice + 1} de "${campo}" sem "fonte" e/ou ` +
            `"aprovadoPeloCliente: true". Todo depoimento, número, credencial ou ` +
            `prêmio precisa das duas provas (CLAUDE.md seção 7).`
        );
      }
    });
  }
}

// ---------------------------------------------------------------------------
// 2. texto banido em qualquer arquivo de conteudo
// ---------------------------------------------------------------------------

function validarTextoBanido(caminho, conteudo) {
  const relativo = relative(raizBase, caminho);
  if (/lorem/i.test(conteudo)) {
    erros.push(`${relativo}: contém texto de preenchimento "lorem ipsum". Escreva o texto real ou [PREENCHER].`);
  }
  if (conteudo.includes('Cliente Satisfeito')) {
    erros.push(`${relativo}: contém o depoimento de exemplo "Cliente Satisfeito". Use um depoimento real e aprovado, ou remova.`);
  }
  if (conteudo.includes('João S.')) {
    erros.push(`${relativo}: contém o nome de exemplo "João S.". Use um nome real e aprovado, ou remova.`);
  }
}

// ---------------------------------------------------------------------------
// 3. numero solto no conteudo visivel que nao vem de site.ts
// ---------------------------------------------------------------------------

function validarNumerosSoltos(caminho, conteudo, siteTsTexto) {
  const nomeArquivo = caminho.split(/[\\/]/).pop();
  if (PAGINAS_EXCLUIDAS_DE_NUMEROS.includes(nomeArquivo)) return;

  const semFrontmatter = removerFrontmatter(conteudo);
  const semTags = removerTags(semFrontmatter);
  const textoEstatico = removerExpressoes(semTags);
  const numeros = textoEstatico.match(/\d{2,}/g) ?? [];

  for (const numero of numeros) {
    if (!siteTsTexto.includes(numero)) {
      const relativo = relative(raizBase, caminho);
      erros.push(
        `${relativo}: número "${numero}" escrito direto no texto, sem existir em ` +
          `src/data/site.ts. Mova para site.ts (com fonte + aprovadoPeloCliente quando ` +
          `for estatística) e use interpolação {..}.`
      );
    }
  }
}

// ---------------------------------------------------------------------------
// 4. [PREENCHER pendente, so falha em build de producao
// ---------------------------------------------------------------------------

function validarPreencherPendente(caminho, conteudo) {
  if (!conteudo.includes('[PREENCHER')) return;
  const relativo = relative(raizBase, caminho);
  if (isProducao) {
    erros.push(`${relativo}: contém "[PREENCHER" e DEPLOY_ALVO=producao está definido. Preencha antes de publicar.`);
  } else {
    avisos.push(`${relativo}: contém "[PREENCHER" (pendência a resolver antes do deploy de produção).`);
  }
}

// ---------------------------------------------------------------------------
// execucao
// ---------------------------------------------------------------------------

const siteTsPath = join(srcDir, 'data', 'site.ts');
const siteTsTexto = readFileSync(siteTsPath, 'utf8');
validarProvaReal(siteTsTexto);

const arquivos = listarArquivos(srcDir, ['.astro', '.ts']);
for (const caminho of arquivos) {
  const conteudo = readFileSync(caminho, 'utf8');
  validarTextoBanido(caminho, conteudo);
  validarPreencherPendente(caminho, conteudo);

  const dentroDeSecoesOuPaginas =
    caminho.includes(`${join('src', 'components', 'sections')}`) ||
    caminho.includes(`${join('src', 'pages')}`);
  const eGoldenFile = caminho.includes(join('src', 'components', '_exemplos'));
  if (dentroDeSecoesOuPaginas && !eGoldenFile) {
    validarNumerosSoltos(caminho, conteudo, siteTsTexto);
  }
}

if (avisos.length > 0) {
  console.warn('\n[validar-conteudo] Pendências (não bloqueiam este build):');
  for (const aviso of avisos) console.warn(`  - ${aviso}`);
}

if (erros.length > 0) {
  console.error('\n[validar-conteudo] Build bloqueado:');
  for (const erro of erros) console.error(`  - ${erro}`);
  console.error('');
  process.exit(1);
}

console.log('[validar-conteudo] OK' + (avisos.length > 0 ? ` (${avisos.length} pendência(s) registrada(s) acima)` : ''));
