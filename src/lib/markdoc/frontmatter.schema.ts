import { z } from 'zod';

const baseSchema = z.object({
  draft: z.optional(z.boolean().default(false)),
  featured: z.boolean().default(false),
  title: z.string({
    required_error: 'Required frontmatter missing: title',
    invalid_type_error: 'title must be a string',
  }),
  date: z.date({
    required_error: 'Required frontmatter missing: date',
    invalid_type_error:
      'date must be written in yyyy-mm-dd format without quotes: For example, Jan 22, 2000 should be written as 2000-01-22.',
  }),
  templateKey: z.optional(z.string()), // this is largely ignored as it's a Next.js hangover I don't want to painstakingly remove...
  featuredimage: z.optional(z.string()),
  tags: z.array(z.string()),
  description: z.optional(z.string()),
  ogImagePath: z.optional(z.string()),
  canonicalUrl: z.optional(z.string()),
});

/*
  Blog posts are posts you write in markdown files in content/blog/*.md
*/
export const blog = baseSchema;

export const project = baseSchema.extend({
  url: z.string(),
});
