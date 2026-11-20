import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * Defina a URL definitiva de produção via variável de ambiente SITE_URL
 * (ex.: SITE_URL=https://seudominio.com.br no Netlify) ou preencha abaixo
 * quando o domínio oficial estiver contratado.
 * Enquanto permanecer vazio, nenhum domínio fictício será publicado.
 */
const siteUrl = (process.env.SITE_URL || '').trim();

export default defineConfig({
  output: 'static',
  ...(siteUrl ? { site: siteUrl, integrations: [sitemap()] } : {}),
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
});
