import rss from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';
import Markdoc from '@markdoc/markdoc';
import { blog } from '../lib/markdoc/frontmatter.schema';
import { readAll } from '../lib/markdoc/read';
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from '../config';

export const get = async () => {
  const posts = await readAll({
    directory: 'blog',
    frontmatterSchema: blog,
  });

  const sortedPosts = posts
    .filter((p) => p.frontmatter.draft !== true)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).valueOf() -
        new Date(a.frontmatter.date).valueOf()
    );

  let baseUrl = SITE_URL;
  // removing trailing slash if found
  // https://example.com/ => https://example.com
  baseUrl = baseUrl.replace(/\/+$/g, '');

  const rssItems = sortedPosts.map(
    ({ frontmatter, slug, content: postContent }) => {
      const title = frontmatter.title;
      const pubDate = frontmatter.date;
      const description = frontmatter.description;
      const link = `${baseUrl}/blog/${slug}`;
      const htmlContent = Markdoc.renderers.html(postContent);
      const content = sanitizeHtml(htmlContent);

      return {
        title,
        pubDate,
        description,
        content,
        link,
      };
    }
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: baseUrl,
    items: rssItems,
  });
};
