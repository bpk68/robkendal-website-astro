import { z, defineCollection } from 'astro:content';
import { rssSchema } from '@astrojs/rss';

const blog = defineCollection({
  type: 'content',
  schema: rssSchema.extend({
    featured: z.optional(z.boolean()),
    featuredimage: z.optional(z.string()),
    date: z.date(),
    tags: z.array(z.string()),
    pubDate: z.optional(z.date()),
    imgtitle: z.optional(z.string()),
    draft: z.optional(z.boolean()),
  }),
});

const testimonials = defineCollection({
  type: 'content',
  schema: z.object({
    avatar: z.string(),
    avatarAlt: z.string(),
    cite: z.string(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    img: z.string(),
    imgAlt: z.string(),
    title: z.string(),
    subtitle: z.string(),
    href: z.string(),
    order: z.number().default(0),
  }),
});

export const collections = { blog, testimonials, projects };
