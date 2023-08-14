// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE =
  'Freelance Shopify Developer | Freelance Website Consultant | Rob Kendal';
export const SITE_DESCRIPTION =
  'Freelance Shopify developer, software consultant, Jamstack CMS developer building lead-generating websites and enterprise software with 20 years experience in Wakefield, Leeds, and West Yorkshire';
export const TWITTER_HANDLE = '@kendalmintcode';
export const MY_NAME = 'Rob Kendal';

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE_URL);
export const SITE_URL = BASE_URL.origin;
