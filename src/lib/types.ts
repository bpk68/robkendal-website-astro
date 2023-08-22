export type PageMeta = {
  title: string;
  description?: string;
  canonicalUrl?: string;
};

export type PageOgMeta = {
  title: string; // page title
  description?: string; // page description
  type: 'article' | 'profile' | 'book' | 'website';
  url?: string; // site URL
  image?: string; // preview image
  author?: string; // post author name
  publishDate?: string; // ISO string
  imageAlt?: string; // alt text for preview image
  imageWidth?: string; // preview image width - 1200px standard
  imageHeight?: string; // preview image height - 627px standard
};

export type TwitterMeta = {
  title: string; // same as og:title
  description?: string; // same as og:description
  card: 'summary_large_image';
  site?: string; // twitter handle (@username) of blog owner
  creator?: string; // twitter handle (@username) of content owner (usually same as blog owner)
  image?: string; // same as og:image
  imageAlt?: string; // same as og:image:alt
};

export enum PageMetaType {
  page,
  blog,
}

export interface IPageMetaReturnObj {
  meta: PageMeta;
  og: PageOgMeta;
  twitter: TwitterMeta;
}
