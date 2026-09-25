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

  // Fonts API do Astro: os arquivos de fonte sao baixados e auto-hospedados
  // no build. Nunca usar <link> para fonts.googleapis.com.
  // Par escolhido para a direção "Sombra e cal" (docs/nichos.md): Space
  // Grotesk (títulos, traço técnico e preciso) + Instrument Sans (corpo,
  // neutro e legível).
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Space Grotesk',
      cssVariable: '--font-titulo',
      weights: [500, 600, 700],
      fallbacks: ['sans-serif']
    },
    {
      provider: fontProviders.google(),
      name: 'Instrument Sans',
      cssVariable: '--font-corpo',
      weights: [400, 500, 700],
      fallbacks: ['sans-serif']
    }
  ]
});