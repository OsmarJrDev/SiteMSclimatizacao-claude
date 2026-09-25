#!/usr/bin/env node
// Prebuild: so roda de verdade quando src/data/site.ts tem mercado: 'PT'.
// Falha o build se o texto visivel tiver termos claramente pt-BR, listados
// em docs/nichos.md ("Termos proibidos em sites PT") e reproduzidos aqui:
//
//   celular, contato, cadastro, tela, time (no sentido de equipe), equipe,
//   ônibus, cardápio, academia, banheiro, "Fale conosco", gerúndio
//   progressivo ("estamos atendendo", "estamos esperando"), "você" dirigido
//   ao leitor.
//
// A lista e um ponto de partida, nao uma garantia linguistica: revisao final
// sempre por um nativo de Portugal (docs/nichos.md).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listarArquivos, textoVisivel } from './lib/texto.mjs';

const raizBase = fileURLToPath(new URL('..', import.meta.url));
const srcDir = join(raizBase, 'src');

const siteTsTexto = readFileSync(join(srcDir, 'data', 'site.ts'), 'utf8');
const ehMercadoPT = /mercado:\s*'PT'/.test(siteTsTexto);

if (!ehMercadoPT) {
  console.log('[validar-ptpt] site.mercado não é PT, checagem pulada.');
  process.exit(0);
}

// Palavras/expressoes inteiras, sem plural automatico (cada forma que importa
// esta listada). \b nao cobre acentos como limite de palavra em todo motor,
// entao usamos lookaround simples baseado em nao-letra.
const TERMOS_PROIBIDOS = [
  'celular',
  'contato',
  'cadastro',
  'tela',
  'time',
  'equipe',
  'ônibus',
  'cardápio',
  'academia',
  'banheiro',
  'fale conosco',
];

const REGEX_GERUNDIO_PROPAGANDA = /\bestamos\s+\w+ndo\b/i;
const REGEX_VOCE = /\bvocê\b/i;

/** @type {string[]} */
const erros = [];

function checarTermos(caminhoRelativo, texto) {
  const textoBaixo = texto.toLowerCase();
  for (const termo of TERMOS_PROIBIDOS) {
    if (textoBaixo.includes(termo)) {
      erros.push(`${caminhoRelativo}: termo pt-BR "${termo}" em site de mercado PT.`);
    }
  }
  if (REGEX_GERUNDIO_PROPAGANDA.test(texto)) {
    erros.push(`${caminhoRelativo}: gerúndio de propaganda ("estamos ...ndo") em site de mercado PT.`);
  }
  if (REGEX_VOCE.test(texto)) {
    erros.push(`${caminhoRelativo}: pronome "você" em site de mercado PT (use 3ª pessoa sem pronome).`);
  }
}

const arquivos = listarArquivos(srcDir, ['.astro']);
for (const caminho of arquivos) {
  const conteudo = readFileSync(caminho, 'utf8');
  const visivel = textoVisivel(conteudo);
  checarTermos(caminho.replace(raizBase, '').replace(/^[\\/]/, ''), visivel);
}

// site.ts tambem carrega texto exibido diretamente (nomes de servico, faq,
// diferenciais etc.), entao entra na checagem mesmo sendo .ts.
checarTermos('src/data/site.ts', siteTsTexto);

if (erros.length > 0) {
  console.error('\n[validar-ptpt] Build bloqueado:');
  for (const erro of erros) console.error(`  - ${erro}`);
  console.error('');
  process.exit(1);
}

console.log('[validar-ptpt] OK');
