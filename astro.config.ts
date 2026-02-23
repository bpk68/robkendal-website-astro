/* eslint-disable turbo/no-undeclared-env-vars */
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import markdoc from "@astrojs/markdoc";

import playformCompress from "@playform/compress";

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
		"/sitemap.xml": {
			status: 301,
			destination: "/sitemap-index.xml",
		},
		"/freelance-jamstack-developer": {
			status: 301,
			destination: "/enterprise-software-development",
		},
		"/freelance-cloud-cannon-developer": {
			status: 301,
			destination: "/enterprise-software-development",
		},
		"/freelance-seo": {
			status: 301,
			destination: "/enterprise-software-development",
		},
		"/small-business-websites": {
			status: 301,
			destination: "/enterprise-software-development",
		},
		"/wordpress-consultancy": {
			status: 301,
			destination: "/enterprise-software-development",
		},
		"/blog/using-wordpress-as-a-headless-cms-with-next.js": {
			status: 301,
			destination: "/blog/using-wordpress-as-a-headless-cms-with-nextjs",
		},
		"/blog/create-a-static-website-rss-feed-with-next.js": {
			status: 301,
			destination: "/blog/create-a-static-website-rss-feed-with-nextjs",
		},
		"/arrow-functions-in-javascript": {
			status: 301,
			destination: "/blog/how-to-use-arrow-functions-in-javascript-es6",
		},
		"/build-a-restful-node-api-server-using-json-files": {
			status: 301,
			destination:
				"/blog/build-a-restful-node-api-server-using-json-and-typescript",
		},
		"/tags/java-script": {
			status: 301,
			destination: "/tags/javascript",
		},
		"/headless-wordpress-websites": {
			status: 301,
			destination: "/enterprise-software-development",
		},
		"/blog/configuring-wordpress-as-a-headless-cms-with-next.js": {
			status: 301,
			destination: "/blog/configuring-wordpress-as-a-headless-cms-with-nextjs",
		},
		"/blog/how-to-get-intro-the-web-development-industry": {
			status: 301,
			destination: "/blog",
		},
		"/everthing-wrong-with-css-in-js": {
			status: 301,
			destination: "/blog/why-is-css-in-js-a-bad-or-good-idea",
		},
		"/how-to-land-that-dev-job-youve-always-wanted": {
			status: 301,
			destination: "/blog",
		},
		"/nest-smart-home-review": {
			status: 301,
			destination:
				"/blog/nest-cam-nest-protect-and-nest-thermostat-review-1-year-in",
		},
		"/are-tech-tests-still-relevant": {
			status: 301,
			destination:
				"/blog/are-tech-tests-still-relevant-in-todays-hiring-landscape",
		},
		"/webpack-project-starter-kit": {
			status: 301,
			destination:
				"/blog/quick-start-javascript-projects-with-this-webpack-project-starter-kit",
		},
		"/blog/2024-11-21-detecting-os-level-dark-mode-": {
			status: 301,
			destination: "/blog/2024-11-21-detecting-os-level-dark-mode",
		},
		"/tags": {
			status: 301,
			destination: "/blog",
		},
		"/continuous-refactoring-avoiding-technical-debt-in-the-here-and-now": {
			status: 301,
			destination:
				"/blog/continuous-refactoring-avoiding-technical-debt-in-the-here-and-now",
		},
		"/Netlify": {
			status: 301,
			destination: "/blog",
		},
		"/Below": {
			status: 301,
			destination: "/blog",
		},
		"/blog/configuring-wordpress-as-a-headless-": {
			status: 301,
			destination: "/blog/configuring-wordpress-as-a-headless-cms-with-nextjs",
		},
	},
	compressHTML: true,
	server: { port: SERVER_PORT },
	site: "https://robkendal.co.uk",
	prefetch: true,
	integrations: [markdoc({ allowHTML: true }), sitemap(), playformCompress()],
	trailingSlash: "never",
	markdown: {
		shikiConfig: {
			theme: "nord",
			wrap: true,
		},
	},
	vite: {
		build: {
			sourcemap: true,
		},
	},
});
