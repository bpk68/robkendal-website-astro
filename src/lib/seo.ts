import type {
  IPageMetaReturnObj,
  PageMeta,
  PageOgMeta,
  TwitterMeta,
} from './types';
import { PageMetaType } from './types';

export function getPageMeta({
  title: pageTitle,
  description,
  baseUrl,
  ogImageAbsoluteUrl,
  ogImageAltText,
  ogImageWidth,
  ogImageHeight,
  siteOwnerTwitterHandle,
  contentAuthorTwitterHandle,
  authorName,
  publishDate,
  metaType = PageMetaType.page,
}: {
  title: string;
  description: string;
  baseUrl?: string;
  ogImageAbsoluteUrl?: string; // should always be absolute
  ogImageAltText?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  siteOwnerTwitterHandle?: string;
  contentAuthorTwitterHandle?: string;
  authorName?: string;
  publishDate?: string;
  metaType?: PageMetaType;
}): IPageMetaReturnObj {
  if (!pageTitle) {
    throw Error('title is required for page SEO');
  }
  if (ogImageAbsoluteUrl) {
    ogImageAltText = !ogImageAltText
      ? `Preview image for ${pageTitle}`
      : ogImageAltText;
  }

  const meta: PageMeta = {
    title: pageTitle,
    description: description,
    canonicalUrl: baseUrl,
  };

  const og: PageOgMeta = {
    title: pageTitle,
    description: description,
    type: 'website',
    url: baseUrl,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
    imageWidth: ogImageWidth ? String(ogImageWidth) : undefined,
    imageHeight: ogImageHeight ? String(ogImageHeight) : undefined,
  };

  if (metaType === PageMetaType.blog) {
    og.type = 'article';
    og.author = authorName;
    og.publishDate = publishDate;
  }

  const twitter: TwitterMeta = {
    title: pageTitle,
    description: description,
    card: 'summary_large_image',
    site: baseUrl,
    creator: contentAuthorTwitterHandle ?? siteOwnerTwitterHandle,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
  };

  return {
    meta,
    og,
    twitter,
  };
}
