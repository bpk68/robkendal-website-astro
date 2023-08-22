declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;
	export type CollectionEntry<C extends keyof AnyEntryMap> = Flatten<AnyEntryMap[C]>;

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {})
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {})
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
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
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2019-04-26-using-parcel-bundler-as-a-webpack-alternative.md": {
	id: "2019-04-26-using-parcel-bundler-as-a-webpack-alternative.md";
  slug: "2019-04-26-using-parcel-bundler-as-a-webpack-alternative";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-04-29-using-parcel-bundler-with-react-js.md": {
	id: "2019-04-29-using-parcel-bundler-with-react-js.md";
  slug: "2019-04-29-using-parcel-bundler-with-react-js";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-05-04-getting-hired-as-a-developer-in-the-tech-industry.md": {
	id: "2019-05-04-getting-hired-as-a-developer-in-the-tech-industry.md";
  slug: "2019-05-04-getting-hired-as-a-developer-in-the-tech-industry";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-05-10-fighting-imposter-syndrome-as-a-developer.md": {
	id: "2019-05-10-fighting-imposter-syndrome-as-a-developer.md";
  slug: "2019-05-10-fighting-imposter-syndrome-as-a-developer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-05-13-configure-parcel-js-and-babel-to-use-javascript-proposal-class-properties.md": {
	id: "2019-05-13-configure-parcel-js-and-babel-to-use-javascript-proposal-class-properties.md";
  slug: "2019-05-13-configure-parcel-js-and-babel-to-use-javascript-proposal-class-properties";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-05-23-are-companies-missing-out-on-talent-by-fear-of-remote-working.md": {
	id: "2019-05-23-are-companies-missing-out-on-talent-by-fear-of-remote-working.md";
  slug: "2019-05-23-are-companies-missing-out-on-talent-by-fear-of-remote-working";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-06-07-getting-past-developers-block.md": {
	id: "2019-06-07-getting-past-developers-block.md";
  slug: "2019-06-07-getting-past-developers-block";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-12-22-solving-react-hooks-invalid-hook-call-warning.md": {
	id: "2019-12-22-solving-react-hooks-invalid-hook-call-warning.md";
  slug: "2019-12-22-solving-react-hooks-invalid-hook-call-warning";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-01-07-what-should-you-know-as-a-frontend-developer.md": {
	id: "2020-01-07-what-should-you-know-as-a-frontend-developer.md";
  slug: "2020-01-07-what-should-you-know-as-a-frontend-developer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-01-14-how-to-survive-remote-working.md": {
	id: "2020-01-14-how-to-survive-remote-working.md";
  slug: "2020-01-14-how-to-survive-remote-working";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-01-21-react-redux-components-apis-and-handler-utilities.md": {
	id: "2020-01-21-react-redux-components-apis-and-handler-utilities.md";
  slug: "2020-01-21-react-redux-components-apis-and-handler-utilities";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-01-23-10-hot-tips-for-better-debugging.md": {
	id: "2020-01-23-10-hot-tips-for-better-debugging.md";
  slug: "2020-01-23-10-hot-tips-for-better-debugging";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-01-27-react-redux-components-apis-and-handler-utilities-part-two.md": {
	id: "2020-01-27-react-redux-components-apis-and-handler-utilities-part-two.md";
  slug: "2020-01-27-react-redux-components-apis-and-handler-utilities-part-two";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-02-04-creating-unique-merged-arrays-using-javascripts-set-and-more.md": {
	id: "2020-02-04-creating-unique-merged-arrays-using-javascripts-set-and-more.md";
  slug: "2020-02-04-creating-unique-merged-arrays-using-javascripts-set-and-more";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-02-20-creating-a-react-code-editor-and-syntax-highlighter.md": {
	id: "2020-02-20-creating-a-react-code-editor-and-syntax-highlighter.md";
  slug: "2020-02-20-creating-a-react-code-editor-and-syntax-highlighter";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-04-02-funky-text-backgrounds-with-background-clip-css.md": {
	id: "2020-04-02-funky-text-backgrounds-with-background-clip-css.md";
  slug: "2020-04-02-funky-text-backgrounds-with-background-clip-css";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-04-07-replacing-reacts-redux-library-with-usereducer-hook.md": {
	id: "2020-04-07-replacing-reacts-redux-library-with-usereducer-hook.md";
  slug: "2020-04-07-replacing-reacts-redux-library-with-usereducer-hook";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-04-17-saving-text-to-client-side-file-using-vanilla-js.md": {
	id: "2020-04-17-saving-text-to-client-side-file-using-vanilla-js.md";
  slug: "2020-04-17-saving-text-to-client-side-file-using-vanilla-js";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-05-29-github-activity-graphs-are-meaningless.md": {
	id: "2020-05-29-github-activity-graphs-are-meaningless.md";
  slug: "2020-05-29-github-activity-graphs-are-meaningless";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-06-12-30-helpful-tools-apps-and-websites.md": {
	id: "2020-06-12-30-helpful-tools-apps-and-websites.md";
  slug: "2020-06-12-30-helpful-tools-apps-and-websites";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021-06-07-should-you-learn-react-angular-or-vue.md": {
	id: "2021-06-07-should-you-learn-react-angular-or-vue.md";
  slug: "2021-06-07-should-you-learn-react-angular-or-vue";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021-09-03-sending-contact-forms-with-next-js-and-wordpress.md": {
	id: "2021-09-03-sending-contact-forms-with-next-js-and-wordpress.md";
  slug: "2021-09-03-sending-contact-forms-with-next-js-and-wordpress";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Build-a-restful-Node-API-server-using-JSON-and-TypeScript.md": {
	id: "Build-a-restful-Node-API-server-using-JSON-and-TypeScript.md";
  slug: "build-a-restful-node-api-server-using-json-and-typescript";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"are-tech-tests-still-relevant-in-todays-hiring-landscape.md": {
	id: "are-tech-tests-still-relevant-in-todays-hiring-landscape.md";
  slug: "are-tech-tests-still-relevant-in-todays-hiring-landscape";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"configuring-wordpress-as-a-headless-cms-with-next.js.md": {
	id: "configuring-wordpress-as-a-headless-cms-with-next.js.md";
  slug: "configuring-wordpress-as-a-headless-cms-with-nextjs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"continuous-refactoring-avoiding-technical-debt-in-the-here-and-now.md": {
	id: "continuous-refactoring-avoiding-technical-debt-in-the-here-and-now.md";
  slug: "continuous-refactoring-avoiding-technical-debt-in-the-here-and-now";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"create-a-static-website-rss-feed-with-next.js.md": {
	id: "create-a-static-website-rss-feed-with-next.js.md";
  slug: "create-a-static-website-rss-feed-with-nextjs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"design-systems-are-important.md": {
	id: "design-systems-are-important.md";
  slug: "design-systems-are-important";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-becoming-a-parent-made-me-a-better-coder.md": {
	id: "how-becoming-a-parent-made-me-a-better-coder.md";
  slug: "how-becoming-a-parent-made-me-a-better-coder";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-build-a-multi-image-carousel-in-react-and-tailwind-alt.mdoc": {
	id: "how-to-build-a-multi-image-carousel-in-react-and-tailwind-alt.mdoc";
  slug: "how-to-build-a-multi-image-carousel-in-react-and-tailwind-alt";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdoc"] };
"how-to-build-a-multi-image-carousel-in-react-and-tailwind.md": {
	id: "how-to-build-a-multi-image-carousel-in-react-and-tailwind.md";
  slug: "how-to-build-a-multi-image-carousel-in-react-and-tailwind";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-build-a-restful-node-js-api-server-using-json-files.md": {
	id: "how-to-build-a-restful-node-js-api-server-using-json-files.md";
  slug: "how-to-build-a-restful-node-js-api-server-using-json-files";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-fix-property-does-not-exist-on-window-type-in-typescript.md": {
	id: "how-to-fix-property-does-not-exist-on-window-type-in-typescript.md";
  slug: "how-to-fix-property-does-not-exist-on-window-type-in-typescript";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-get-intro-the-web-development-industry.md": {
	id: "how-to-get-intro-the-web-development-industry.md";
  slug: "how-to-get-intro-the-web-development-industry";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-use-arrow-functions-in-javascript-es6.md": {
	id: "how-to-use-arrow-functions-in-javascript-es6.md";
  slug: "how-to-use-arrow-functions-in-javascript-es6";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"job-hunting-in-the-tech-industry-tips-tricks-and-experiences.md": {
	id: "job-hunting-in-the-tech-industry-tips-tricks-and-experiences.md";
  slug: "job-hunting-in-the-tech-industry-tips-tricks-and-experiences";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"nest-cam-nest-protect-and-nest-thermostat-review-1-year-in.md": {
	id: "nest-cam-nest-protect-and-nest-thermostat-review-1-year-in.md";
  slug: "nest-cam-nest-protect-and-nest-thermostat-review-1-year-in";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"quick-start-javascript-projects-with-this-webpack-project-starter-kit.md": {
	id: "quick-start-javascript-projects-with-this-webpack-project-starter-kit.md";
  slug: "quick-start-javascript-projects-with-this-webpack-project-starter-kit";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"reading-google-sheets-data-using-javascript-with-google-sheets-reader.md": {
	id: "reading-google-sheets-data-using-javascript-with-google-sheets-reader.md";
  slug: "reading-google-sheets-data-using-javascript-with-google-sheets-reader";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"signs-to-lookout-for-if-you-suspect-you-ve-ended-up-in-the-wrong-career.md": {
	id: "signs-to-lookout-for-if-you-suspect-you-ve-ended-up-in-the-wrong-career.md";
  slug: "signs-to-lookout-for-if-you-suspect-you-ve-ended-up-in-the-wrong-career";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"things-i-wish-i-d-known-as-a-junior-developer.md": {
	id: "things-i-wish-i-d-known-as-a-junior-developer.md";
  slug: "things-i-wish-i-d-known-as-a-junior-developer";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"use-webpack-and-require-context-to-load-html-files.md": {
	id: "use-webpack-and-require-context-to-load-html-files.md";
  slug: "use-webpack-and-require-context-to-load-html-files";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"using-css-custom-properties-to-apply-themes-in-javascript-or-react.md": {
	id: "using-css-custom-properties-to-apply-themes-in-javascript-or-react.md";
  slug: "using-css-custom-properties-to-apply-themes-in-javascript-or-react";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"using-wordpress-as-a-headless-cms-with-next.js.md": {
	id: "using-wordpress-as-a-headless-cms-with-next.js.md";
  slug: "using-wordpress-as-a-headless-cms-with-nextjs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-bruce-lee-taught-me-about-business.md": {
	id: "what-bruce-lee-taught-me-about-business.md";
  slug: "what-bruce-lee-taught-me-about-business";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-is-css-in-js-a-bad-or-good-idea.md": {
	id: "why-is-css-in-js-a-bad-or-good-idea.md";
  slug: "why-is-css-in-js-a-bad-or-good-idea";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
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

	type ContentConfig = typeof import("../src/content/config");
}
