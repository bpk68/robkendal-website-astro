// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE =
	"Freelance Shopify Developer | Freelance Storyblok Developer | Rob Kendal";
export const SITE_DESCRIPTION =
	"Freelance Shopify and Storyblok developer serving Leeds, York, and Wakefield. Freelance website and software development with over 20 years experience.";
export const TWITTER_HANDLE = "@kendalmintcode";
export const MY_NAME = "Rob Kendal";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE_URL);
export const SITE_URL = BASE_URL.origin;
