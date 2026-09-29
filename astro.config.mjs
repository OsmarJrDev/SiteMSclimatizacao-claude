// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // [PREENCHER: trocar pelo domínio real do cliente antes do deploy de produção]
  site: 'https://ms-climatizacao-exemplo.pt',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap()],

  // Imagens responsivas nativas do Astro: gera srcset/sizes automaticamente
  // e aplica o CSS de redimensionamento, para toda <Image />/<Picture /> que
  // usar a prop layout. Ligado por padrao em todo template (25/09/2026).
  image: {
    responsiveStyles: true,
    layout: 'constrained'
  },

  // Fonts API do Astro: os arquivos de fonte sao baixados e auto-hospedados
  // no build. Nunca usar <link> para fonts.googleapis.com.
  // Par mantido da direção visual anterior (não fazia parte da crítica do
  // cliente, ver CLAUDE.md): Archivo (títulos, com peso 800, e corpo, mesma
  // família nas duas funções, ver --font-titulo em src/styles/global.css) +
  // JetBrains Mono (rótulos: eyebrow, índices numerados dos serviços,
  // cssVariable --font-rotulo).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Archivo',
      cssVariable: '--font-corpo',
      weights: [400, 500, 600, 700, 800],
      fallbacks: ['sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'JetBrains Mono',
      cssVariable: '--font-rotulo',
      weights: [400, 500, 700],
      fallbacks: ['monospace']
    }
  ]
});