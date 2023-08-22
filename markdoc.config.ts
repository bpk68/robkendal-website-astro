import { defineMarkdocConfig, component, nodes } from '@astrojs/markdoc/config';
import shiki from '@astrojs/markdoc/shiki';

export default defineMarkdocConfig({
  tags: {
    youtube: {
      render: component('./src/components/YouTubeEmbed.astro'),
      attributes: {
        url: { type: String, required: true },
        label: { type: String, required: true },
      },
      selfClosing: true,
    },
    tweet: {
      render: component('./src/components/TweetEmbed.astro'),
      attributes: {
        url: { type: String, required: true },
      },
      selfClosing: true,
    },
    codepen: {
      render: component('./src/components/CodePenEmbed.astro'),
      attributes: {
        url: { type: String, required: true },
        title: { type: String, required: true },
      },
      selfClosing: true,
    },
    githubgist: {
      render: component('./src/components/GitHubGistEmbed.astro'),
      attributes: {
        id: { type: String, required: true },
      },
      selfClosing: true,
    },
    iframe: {
      render: component('./src/components/IFrameEmbed.astro'),
      attributes: {
        url: { type: String, required: true },
        label: { type: String, required: true },
        style: { type: String, required: false },
      },
      selfClosing: true,
    },
  },
  nodes: {
    blockquote: {
      ...nodes.blockquote, // Apply Markdoc's defaults for other options
      render: component('./src/components/Blockquote.astro'),
    },
    heading: {
      ...nodes.heading,
      render: component('./src/components/Heading.astro'),
      attributes: {
        level: { type: Number, required: true },
      },
    },
    link: {
      ...nodes.link,
      render: component('./src/components/AppLink.astro'),
      children: ['strong', 'em', 's', 'code', 'text', 'tag', 'inline', 'image'], // ADDED  `image` and `inline` (don't  think `inline`  is necessary for linked images)
      attributes: {
        href: { type: String, required: true },
        target: { type: String },
        rel: { type: String },
        title: { type: String },
      },
    },
  },
  extends: [
    shiki({
      theme: 'nord',
      wrap: true,
    }),
  ],
});
