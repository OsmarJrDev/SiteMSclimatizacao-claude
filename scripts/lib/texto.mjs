// Utilitarios pequenos e sem estado, compartilhados pelos scripts de
// validacao (validar-conteudo.mjs e validar-ptpt.mjs). Trabalham em texto
// puro porque rodam antes do build (nao ha dist/ nem runtime do Astro ainda).
import { readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

export function listarArquivos(dir, extensoes) {
  /** @type {string[]} */
  const resultado = [];
  for (const entrada of readdirSync(dir)) {
    const caminho = join(dir, entrada);
    const info = statSync(caminho);
    if (info.isDirectory()) {
      resultado.push(...listarArquivos(caminho, extensoes));
    } else if (extensoes.includes(extname(caminho))) {
      resultado.push(caminho);
    }
  }
  return resultado;
}

/** Remove o bloco de frontmatter (entre os dois primeiros "---") de um .astro. */
export function removerFrontmatter(conteudoAstro) {
  const partes = conteudoAstro.split('---');
  if (partes.length < 3) return conteudoAstro;
  return partes.slice(2).join('---');
}

/**
 * Remove expressoes {} do template, respeitando profundidade e strings
 * internas, para sobrar so o texto estatico visivel.
 */
export function removerExpressoes(texto) {
  let resultado = '';
  let profundidade = 0;
  let dentroDeString = null;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    const anterior = texto[i - 1];
    if (dentroDeString) {
      if (c === dentroDeString && anterior !== '\\') dentroDeString = null;
      continue;
    }
    if (profundidade > 0 && (c === '"' || c === "'" || c === '`')) {
      dentroDeString = c;
      continue;
    }
    if (c === '{') {
      profundidade++;
      continue;
    }
    if (c === '}') {
      profundidade = Math.max(0, profundidade - 1);
      continue;
    }
    if (profundidade === 0) resultado += c;
  }
  return resultado;
}

/** Remove tags HTML e comentarios, deixando so o texto entre elas. */
export function removerTags(texto) {
  return texto.replace(/<!--[\s\S]*?-->/g, ' ').replace(/<[^>]*>/g, ' ');
}

/** Texto estatico visivel de um arquivo .astro: sem frontmatter, tags nem expressoes. */
export function textoVisivel(conteudoAstro) {
  return removerExpressoes(removerTags(removerFrontmatter(conteudoAstro)));
}
