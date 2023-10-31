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
  redirects: {
    '/sitemap.xml': {
      status: 301,
      destination: '/sitemap-index.xml',
    },
    '/freelance-jamstack-developer': {
      status: 302,
      destination: '/enterprise-software-development',
    },
    '/blog/using-wordpress-as-a-headless-cms-with-next.js': {
      status: 302,
      destination: '/blog/using-wordpress-as-a-headless-cms-with-nextjs',
    },
    '/blog/create-a-static-website-rss-feed-with-next.js': {
      status: 302,
      destination: '//blog/create-a-static-website-rss-feed-with-nextjs',
    },
    '/arrow-functions-in-javascript': {
      status: 302,
      destination: '/blog/how-to-use-arrow-functions-in-javascript-es6',
    },
    '/build-a-restful-node-api-server-using-json-files': {
      status: 302,
      destination:
        '/blog/build-a-restful-node-api-server-using-json-and-typescript',
    },
    '/tags/java-script': {
      status: 302,
      destination: '/tags/javascript',
    },
    '/headless-wordpress-websites': {
      status: 302,
      destination: '/enterprise-software-development',
    },
    '/blog/configuring-wordpress-as-a-headless-cms-with-next.js': {
      status: 302,
      destination: '/blog/configuring-wordpress-as-a-headless-cms-with-nextjs',
    },
    '/blog/how-to-get-intro-the-web-development-industry': {
      status: 302,
      destination: '/blog',
    },
    '/everthing-wrong-with-css-in-js': {
      status: 302,
      destination: '/blog/why-is-css-in-js-a-bad-or-good-idea',
    },
    '/how-to-land-that-dev-job-youve-always-wanted': {
      status: 302,
      destination: '/blog',
    },
    '/nest-smart-home-review': {
      status: 302,
      destination:
        '/blog/nest-cam-nest-protect-and-nest-thermostat-review-1-year-in',
    },
    '/are-tech-tests-still-relevant': {
      status: 302,
      destination:
        '/blog/are-tech-tests-still-relevant-in-todays-hiring-landscape',
    },
    '/webpack-project-starter-kit': {
      status: 302,
      destination:
        '/blog/quick-start-javascript-projects-with-this-webpack-project-starter-kit',
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
