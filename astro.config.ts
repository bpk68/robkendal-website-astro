/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';
import markdoc from '@astrojs/markdoc';

/* 
  We are doing some URL mumbo jumbo here to tell Astro what the URL of your website will be.
  In local development, your SEO meta tags will have localhost URL.
  In built production websites, your SEO meta tags should have your website URL.
  So we give our website URL here and the template will know what URL to use 
  for meta tags during build.
  If you don't know your website URL yet, don't worry about this
  and leave it empty or use localhost URL. It won't break anything.
*/

const SERVER_PORT = 3000;

export default defineConfig({
  experimental: {
    assets: true,
    viewTransitions: true,
  },
  redirects: {
    '/sitemap.xml': {
      status: 301,
      destination: '/sitemap-index.xml',
    },
    '/freelance-jamstack-developer': {
      status: 302,
      destination: '/enterprise-software-development',
    },
  },
  compressHTML: true,
  server: { port: SERVER_PORT },
  site: 'https://robkendal.co.uk',
  integrations: [markdoc(), sitemap(), prefetch(), compress({ logger: 1 })],
  markdown: {
    shikiConfig: {
      theme: 'nord',
      wrap: true,
    },
  },
  vite: {
    build: {
      sourcemap: true,
    },
  },
});
