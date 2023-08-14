/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from 'astro/config';
// import tailwind from '@astrojs/tailwind';
import prefetch from "@astrojs/prefetch";
import sitemap from '@astrojs/sitemap';
import compress from "astro-compress";

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
// the url to access your blog during local development
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;
// the url to access your blog after deploying it somewhere (Eg. Netlify)
const LIVE_URL = 'https://robkendal.co.uk';
// this is the astro command your npm script runs
const SCRIPT = process.env.npm_lifecycle_script || '';
const isBuild = SCRIPT.includes('astro build');
let BASE_URL = LOCALHOST_URL;

// When you're building your site in local or in CI, you could just set your URL manually
if (isBuild) {
  BASE_URL = LIVE_URL;
}

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
  site: BASE_URL,
  integrations: [
    sitemap(),
		prefetch(),
		compress({ logger: 1 }),
  ],
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
