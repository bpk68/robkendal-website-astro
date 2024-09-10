declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2019-04-26-using-parcel-bundler-as-a-webpack-alternative.mdoc": {
	id: "2019-04-26-using-parcel-bundler-as-a-webpack-alternative.mdoc";
  slug: "2019-04-26-using-parcel-bundler-as-a-webpack-alternative";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2019-04-29-using-parcel-bundler-with-react-js.mdoc": {
	id: "2019-04-29-using-parcel-bundler-with-react-js.mdoc";
  slug: "2019-04-29-using-parcel-bundler-with-react-js";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2019-05-04-getting-hired-as-a-developer-in-the-tech-industry.mdoc": {
	id: "2019-05-04-getting-hired-as-a-developer-in-the-tech-industry.mdoc";
  slug: "2019-05-04-getting-hired-as-a-developer-in-the-tech-industry";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2019-05-10-fighting-imposter-syndrome-as-a-developer.mdoc": {
	id: "2019-05-10-fighting-imposter-syndrome-as-a-developer.mdoc";
  slug: "2019-05-10-fighting-imposter-syndrome-as-a-developer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2019-05-13-configure-parcel-js-and-babel-to-use-javascript-proposal-class-properties.mdoc": {
	id: "2019-05-13-configure-parcel-js-and-babel-to-use-javascript-proposal-class-properties.mdoc";
  slug: "2019-05-13-configure-parcel-js-and-babel-to-use-javascript-proposal-class-properties";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2019-05-23-are-companies-missing-out-on-talent-by-fear-of-remote-working.mdoc": {
	id: "2019-05-23-are-companies-missing-out-on-talent-by-fear-of-remote-working.mdoc";
  slug: "2019-05-23-are-companies-missing-out-on-talent-by-fear-of-remote-working";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2019-06-07-getting-past-developers-block.mdoc": {
	id: "2019-06-07-getting-past-developers-block.mdoc";
  slug: "2019-06-07-getting-past-developers-block";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2019-12-22-solving-react-hooks-invalid-hook-call-warning.mdoc": {
	id: "2019-12-22-solving-react-hooks-invalid-hook-call-warning.mdoc";
  slug: "2019-12-22-solving-react-hooks-invalid-hook-call-warning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-01-07-what-should-you-know-as-a-frontend-developer.mdoc": {
	id: "2020-01-07-what-should-you-know-as-a-frontend-developer.mdoc";
  slug: "2020-01-07-what-should-you-know-as-a-frontend-developer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-01-14-how-to-survive-remote-working.mdoc": {
	id: "2020-01-14-how-to-survive-remote-working.mdoc";
  slug: "2020-01-14-how-to-survive-remote-working";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-01-21-react-redux-components-apis-and-handler-utilities.mdoc": {
	id: "2020-01-21-react-redux-components-apis-and-handler-utilities.mdoc";
  slug: "2020-01-21-react-redux-components-apis-and-handler-utilities";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-01-23-10-hot-tips-for-better-debugging.mdoc": {
	id: "2020-01-23-10-hot-tips-for-better-debugging.mdoc";
  slug: "2020-01-23-10-hot-tips-for-better-debugging";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-01-27-react-redux-components-apis-and-handler-utilities-part-two.mdoc": {
	id: "2020-01-27-react-redux-components-apis-and-handler-utilities-part-two.mdoc";
  slug: "2020-01-27-react-redux-components-apis-and-handler-utilities-part-two";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-02-04-creating-unique-merged-arrays-using-javascripts-set-and-more.mdoc": {
	id: "2020-02-04-creating-unique-merged-arrays-using-javascripts-set-and-more.mdoc";
  slug: "2020-02-04-creating-unique-merged-arrays-using-javascripts-set-and-more";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-02-20-creating-a-react-code-editor-and-syntax-highlighter.mdoc": {
	id: "2020-02-20-creating-a-react-code-editor-and-syntax-highlighter.mdoc";
  slug: "2020-02-20-creating-a-react-code-editor-and-syntax-highlighter";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-04-02-funky-text-backgrounds-with-background-clip-css.mdoc": {
	id: "2020-04-02-funky-text-backgrounds-with-background-clip-css.mdoc";
  slug: "2020-04-02-funky-text-backgrounds-with-background-clip-css";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-04-07-replacing-reacts-redux-library-with-usereducer-hook.mdoc": {
	id: "2020-04-07-replacing-reacts-redux-library-with-usereducer-hook.mdoc";
  slug: "2020-04-07-replacing-reacts-redux-library-with-usereducer-hook";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-04-17-saving-text-to-client-side-file-using-vanilla-js.mdoc": {
	id: "2020-04-17-saving-text-to-client-side-file-using-vanilla-js.mdoc";
  slug: "2020-04-17-saving-text-to-client-side-file-using-vanilla-js";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-05-29-github-activity-graphs-are-meaningless.mdoc": {
	id: "2020-05-29-github-activity-graphs-are-meaningless.mdoc";
  slug: "2020-05-29-github-activity-graphs-are-meaningless";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2020-06-12-30-helpful-tools-apps-and-websites.mdoc": {
	id: "2020-06-12-30-helpful-tools-apps-and-websites.mdoc";
  slug: "2020-06-12-30-helpful-tools-apps-and-websites";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2021-06-07-should-you-learn-react-angular-or-vue.mdoc": {
	id: "2021-06-07-should-you-learn-react-angular-or-vue.mdoc";
  slug: "2021-06-07-should-you-learn-react-angular-or-vue";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2021-09-03-sending-contact-forms-with-next-js-and-wordpress.mdoc": {
	id: "2021-09-03-sending-contact-forms-with-next-js-and-wordpress.mdoc";
  slug: "2021-09-03-sending-contact-forms-with-next-js-and-wordpress";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"2024-09-09-swot-analysis-choosing-javascript-framework.mdoc": {
	id: "2024-09-09-swot-analysis-choosing-javascript-framework.mdoc";
  slug: "2024-09-09-swot-analysis-choosing-javascript-framework";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"Build-a-restful-Node-API-server-using-JSON-and-TypeScript.mdoc": {
	id: "Build-a-restful-Node-API-server-using-JSON-and-TypeScript.mdoc";
  slug: "build-a-restful-node-api-server-using-json-and-typescript";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"are-tech-tests-still-relevant-in-todays-hiring-landscape.mdoc": {
	id: "are-tech-tests-still-relevant-in-todays-hiring-landscape.mdoc";
  slug: "are-tech-tests-still-relevant-in-todays-hiring-landscape";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"configuring-wordpress-as-a-headless-cms-with-next.js.mdoc": {
	id: "configuring-wordpress-as-a-headless-cms-with-next.js.mdoc";
  slug: "configuring-wordpress-as-a-headless-cms-with-nextjs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"continuous-refactoring-avoiding-technical-debt-in-the-here-and-now.mdoc": {
	id: "continuous-refactoring-avoiding-technical-debt-in-the-here-and-now.mdoc";
  slug: "continuous-refactoring-avoiding-technical-debt-in-the-here-and-now";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"create-a-static-website-rss-feed-with-next.js.mdoc": {
	id: "create-a-static-website-rss-feed-with-next.js.mdoc";
  slug: "create-a-static-website-rss-feed-with-nextjs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"design-systems-are-important.mdoc": {
	id: "design-systems-are-important.mdoc";
  slug: "design-systems-are-important";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"how-becoming-a-parent-made-me-a-better-coder.mdoc": {
	id: "how-becoming-a-parent-made-me-a-better-coder.mdoc";
  slug: "how-becoming-a-parent-made-me-a-better-coder";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"how-to-build-a-multi-image-carousel-in-react-and-tailwind.mdoc": {
	id: "how-to-build-a-multi-image-carousel-in-react-and-tailwind.mdoc";
  slug: "how-to-build-a-multi-image-carousel-in-react-and-tailwind";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"how-to-build-a-restful-node-js-api-server-using-json-files.mdoc": {
	id: "how-to-build-a-restful-node-js-api-server-using-json-files.mdoc";
  slug: "how-to-build-a-restful-node-js-api-server-using-json-files";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"how-to-build-astro-site-with-graphql.mdoc": {
	id: "how-to-build-astro-site-with-graphql.mdoc";
  slug: "how-to-build-astro-site-with-graphql";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"how-to-fix-property-does-not-exist-on-window-type-in-typescript.mdoc": {
	id: "how-to-fix-property-does-not-exist-on-window-type-in-typescript.mdoc";
  slug: "how-to-fix-property-does-not-exist-on-window-type-in-typescript";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"how-to-get-intro-the-web-development-industry.mdoc": {
	id: "how-to-get-intro-the-web-development-industry.mdoc";
  slug: "how-to-get-intro-the-web-development-industry";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"how-to-use-arrow-functions-in-javascript-es6.mdoc": {
	id: "how-to-use-arrow-functions-in-javascript-es6.mdoc";
  slug: "how-to-use-arrow-functions-in-javascript-es6";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"job-hunting-in-the-tech-industry-tips-tricks-and-experiences.mdoc": {
	id: "job-hunting-in-the-tech-industry-tips-tricks-and-experiences.mdoc";
  slug: "job-hunting-in-the-tech-industry-tips-tricks-and-experiences";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"nest-cam-nest-protect-and-nest-thermostat-review-1-year-in.mdoc": {
	id: "nest-cam-nest-protect-and-nest-thermostat-review-1-year-in.mdoc";
  slug: "nest-cam-nest-protect-and-nest-thermostat-review-1-year-in";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"quick-start-javascript-projects-with-this-webpack-project-starter-kit.mdoc": {
	id: "quick-start-javascript-projects-with-this-webpack-project-starter-kit.mdoc";
  slug: "quick-start-javascript-projects-with-this-webpack-project-starter-kit";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"reading-google-sheets-data-using-javascript-with-google-sheets-reader.mdoc": {
	id: "reading-google-sheets-data-using-javascript-with-google-sheets-reader.mdoc";
  slug: "reading-google-sheets-data-using-javascript-with-google-sheets-reader";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"signs-to-lookout-for-if-you-suspect-you-ve-ended-up-in-the-wrong-career.mdoc": {
	id: "signs-to-lookout-for-if-you-suspect-you-ve-ended-up-in-the-wrong-career.mdoc";
  slug: "signs-to-lookout-for-if-you-suspect-you-ve-ended-up-in-the-wrong-career";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"things-i-wish-i-d-known-as-a-junior-developer.mdoc": {
	id: "things-i-wish-i-d-known-as-a-junior-developer.mdoc";
  slug: "things-i-wish-i-d-known-as-a-junior-developer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"use-webpack-and-require-context-to-load-html-files.mdoc": {
	id: "use-webpack-and-require-context-to-load-html-files.mdoc";
  slug: "use-webpack-and-require-context-to-load-html-files";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"using-css-custom-properties-to-apply-themes-in-javascript-or-react.mdoc": {
	id: "using-css-custom-properties-to-apply-themes-in-javascript-or-react.mdoc";
  slug: "using-css-custom-properties-to-apply-themes-in-javascript-or-react";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"using-wordpress-as-a-headless-cms-with-next.js.mdoc": {
	id: "using-wordpress-as-a-headless-cms-with-next.js.mdoc";
  slug: "using-wordpress-as-a-headless-cms-with-nextjs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"what-bruce-lee-taught-me-about-business.mdoc": {
	id: "what-bruce-lee-taught-me-about-business.mdoc";
  slug: "what-bruce-lee-taught-me-about-business";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"why-is-css-in-js-a-bad-or-good-idea.mdoc": {
	id: "why-is-css-in-js-a-bad-or-good-idea.mdoc";
  slug: "why-is-css-in-js-a-bad-or-good-idea";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
};
"projects": {
"g-sheets.md": {
	id: "g-sheets.md";
  slug: "g-sheets";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"node-api-starter.md": {
	id: "node-api-starter.md";
  slug: "node-api-starter";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"remote-dev-jobs.md": {
	id: "remote-dev-jobs.md";
  slug: "remote-dev-jobs";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
"visual-query.md": {
	id: "visual-query.md";
  slug: "visual-query";
  body: string;
  collection: "projects";
  data: InferEntrySchema<"projects">
} & { render(): Render[".md"] };
};
"testimonials": {
"testimonial-1.md": {
	id: "testimonial-1.md";
  slug: "testimonial-1";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
"testimonial-2.md": {
	id: "testimonial-2.md";
  slug: "testimonial-2";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
"testimonial-3.md": {
	id: "testimonial-3.md";
  slug: "testimonial-3";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
"testimonial-4.md": {
	id: "testimonial-4.md";
  slug: "testimonial-4";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
"testimonial-5.md": {
	id: "testimonial-5.md";
  slug: "testimonial-5";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
"testimonial-6.md": {
	id: "testimonial-6.md";
  slug: "testimonial-6";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
"testimonial-7.md": {
	id: "testimonial-7.md";
  slug: "testimonial-7";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
"testimonial-8.md": {
	id: "testimonial-8.md";
  slug: "testimonial-8";
  body: string;
  collection: "testimonials";
  data: InferEntrySchema<"testimonials">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
