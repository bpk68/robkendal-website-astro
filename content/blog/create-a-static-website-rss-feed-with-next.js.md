---
date: 2020-10-04T08:08:20
published: true
title: Create a Next.js RSS feed for your static website
description:
  Learn how to create an RSS feed for your Next.js website in  part three
  in the series of using WordPress as a headless CMS with Next.js
featuredimage: '/img/nextjs-with-wordpress-part3-blog-post.png'
featured: true
tags:
  - Tutorials
  - Next.js
  - JavaScript
---

![Blog header for creating an RSS feed with Next.js](/img/nextjs-with-wordpress-part3-blog-post.png 'Create RSS feed for Next.js site')

If you've been following along with the series, you'll have come across the previous posts:

- [Configuring WordPress for use as a headless CMS and setting up a Next.js project](https://robkendal.co.uk/blog/configuring-wordpress-as-a-headless-cms-with-next.js 'Configuring WordPress as a headless CMS with Next.js')
- [Using WordPress as a headless CMS with Next.js](https://robkendal.co.uk/blog/using-wordpress-as-a-headless-cms-with-next.js 'Using WordPress as a headless CMS with Next.js')

In part three, we're going to cover an important aspect of any good blogging site or marketing site that is frequently updated: an RSS feed.

_If you like this article, you'll love the other helpful content I post on Mastodon._ [_Follow me on Mastodon @kendalmintcode@indieweb.social_](https://indieweb.social/@kendalmintcode 'Find me on Mastodon @kendalmintcode') _and say hi._

We have a little bit of helpful information on hosting a Next.js site which might dictate how you create the RSS feed, but you can [skip to the code if you'd prefer](#create-rss-feed 'Skip to the RSS feed code').

## Your Next.js website needs an RSS feed

RSS feeds are an important part of any website that has frequently updated content, such as a blog (we are using WordPress after all!) or marketing-led website.

An RSS feed is a specific page on a website (usually `/rss.xml`) which returns all, or part of a website's content as a list in structured XML format. This makes it very easy for content readers (such as Feedly) to pull in new and updated content on a regular basis.

However, creating an RSS feed for a Next.js site is surprising not well documented, so I wanted to bring my solution to the web to hopefully solve an issue for someone else, that I had to solve for this very website you're reading right now.

## RSS feed options when using Next.js

RSS feeds are a little tricky with statically generated sites because they need to be generated as `.xml` files to be served to feed readers. If not served as `.xml` files that already exist on the server, then the server needs to otherwise generate some sort of XML data and push it to the response stream that is sent back to the browser.

### Next.js sites hosted on Vercel

By default, Next.js generates a build output that includes a small Node server. It does this to handle server-side page generation, which is what you'll need to use for RSS feeds, because you can change the response's content type to XML and write the data dynamically.

Hosting your Next.js website [on Vercel's platform](https://vercel.com/ 'Next.js hosting on Vercel') (the creators of Next.js) means you won't have to worry about anything; it's perfectly geared up to handling the default Next build output as you might expect.

In this scenario, you'd use the `getServerSideProps` function as part of a `rss.js` page. Then, each time the page is requested, Next.js will fetch the data, build the XML feed and write the results to the response object as XML data.

It might look like this:

```js
export async function getServerSideProps(context) {
  const res = context.res;
  if (!res) {
    return;
  }
  // fetch your RSS data from somewhere here
  const blogPosts = getRssXml(fetchMyPosts());
  res.setHeader('Content-Type', 'text/xml');
  res.write(blogPosts);
  res.end();
}
```

You can read more about `getServerSideProps` [on the Next.js website](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering 'Nexxt.js documentation on the getServerSideProps').

### Next.js sites hosted on Netlify (or non-Vercel hosts)

If you're looking to host your sites on a different provider, such as Netlify, then you'll need to employ a different strategy. A lot of hosts that support statically-generated sites don't offer an easy way to support the type of output that Next.js produces.

To get around this, Next.js does provide a handy solution, [the export command](https://nextjs.org/docs/advanced-features/static-html-export 'Next.js export command documentation').

So, instead of just running `yarn build`, you'll need to use `next export` instead. This will still run a build of the site, but it generates entirely static output, instead of the typical hybrid of static with dynamic Node server. **The `next export` command generates the site's files in a new folder called `/out` in the project root.**

What it means is that you can't just have a page called `rss.js` and have it render an XML response in the browser on the fly. You'll need a different way to create an XML RSS feed for your site.

For me, this involved running an extra build command that uses Node to create an XML file and move it into the final `/out` folder as part of the build process.

### Your RSS generation options

Whatever your hosting choice and however you choose to go about gathering and generating your RSS feed data, you're going to need to ultimately render it as XML data into the browser.

In summary, you have a few ways to handle this:

1. Use a third-party site-mapping tool or RSS feed generator  
   These can be expensive and require additional faff to set up and maintain.
2. Generate the XML RSS feed on each request using Next's `getServerSideProps()`

   This won't work for sites that are generated using the `next export` command.

3. Generate a static XML RSS feed at build time using a separate Node script as part of the build process  
   This is what we'll be doing in this article!

> The programatic options above will work with the code we're going to outline in a moment. The main difference is that if you stick to using vanilla Next.js then you can run this as a separate page (e.g. `rss.js`) and use the `getServerSideProps()` function to push the feed as XML content to the response object. **We won't have that option, so we'll incorporate a separate Node command as part of our build process.**

I based my final code on this [excellent article by Fredrik Bergqvist on Dev](https://dev.to/fredrikbergqvist/how-to-add-an-rss-feed-to-your-next-js-site-1h02 'How to add an rss feed to your Next.js site').

[![Follow me on Mastodon @kendalmintcode@indieweb.social](/img/mastodon_cta.png 'Follow me on Mastodon for even more front end content')](https://indieweb.social/@kendalmintcode 'Follow Rob Kendal on Mastodon')

## Creating an Next.js RSS feed for a Next.js website (using WordPress)

Since we've been making a series on using WordPress in headless CMS mode with Next.js, we'll be continuing on that theme and pulling our RSS XML data direct from WordPress.

However, the main body of the code here will work whatever your situation, the big differences are going to be _where_ you get your data from (e.g. WordPress, `.md` files, other CMS, API endpoint, etc.), and _when_ you get your data — are you grabbing yours on the fly for each request using `getServerSideProps`, or generating it ahead of time when the site builds?

### Project set up

We'll be carrying on with our existing site from the previous articles. You can find the [wordpress-next-starter project on GitHub](https://github.com/bpk68/wordpress-next-starter 'WordPress and Next.js Starter project on GitHub') if you'd like to take a look.

The first thing we need to do is install the [axios project](https://github.com/axios/axios 'Axios fetch library on GitHub') as it'll make handling fetches to our WordPress instance easier via Node.

We'll also add in [the Dotenv package](https://www.npmjs.com/package/dotenv 'Dotenv - a package for loading environment variable files'). This will enable us to load in our API URL information from the default `.env.local` file we added in the previous articles.

```node
    yarn add --dev axios dotenv
```

Now, we'll need to add a new Node script into the `package.json` file. Open up the `package.json` file and add in the following line to the `"scripts"` section:

```node
    "deploy": "yarn build && next export && node rss-gen.js"
```

What we're doing here is a combination Node command that does a few things to build us a finished build directory (located at `/out`) that we can deploy to wherever we wish.

It achieves three things:

1. It gets Next.js to build the site.
2. Then, it [triggers the Next.js export feature](https://nextjs.org/docs/advanced-features/static-html-export 'Next.js export feature documentation') to generate us a completely static build to a new directory, `/out`.
3. Finally, it runs a Node command to execute the `rss-gen.js` file we'll be building in a moment. This file will gather up our posts information from WordPress, create an XML RSS feed and stash this new XML file inside of the `/out` directory.

With that line in place, your `scripts` section in the `package.json` file will look like this:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "deploy": "yarn build && next export && node rss-gen.js"
},
```

<a id="create-rss-feed"></a>

### Creating the RSS generator file

With our new packages added and the `package.json` file updated, we need to create a new file to actually generate us some RSS XML. Let's do it!

Create a new file in the project root called `rss-gen.js` and add the following imports at the top:

```js
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const axios = require('axios');
```

Nothing flash so far. We're loading in the `dotenv` package as the **very first thing** so we can grab variables from our `.env.local` file to use later on. By default, Node won't recognise an environment variable file called `.env.local`, hence the need for the `dotenv` helper here.

Next, we're importing the `fs` library to do file system things, `path` to deal with our working directory when we want to save our the RSS XML, and `axios` to handle the data fetching.

### Fetching all the posts data

Next up, let's add the following code that will physically go off to our WordPress instance and grab our post data:

```js
const getAllPostsXmlData = async () => {
  const query = `
        query AllPosts {
          posts(where: {orderby: {field: DATE, order: DESC}}) {
            edges {
              node {
                id
                date
                title
                slug
                content
                excerpt
              }
            }
          }
        }
        `;
  const headers = { 'Content-Type': 'application/json' };
  const allPosts = await axios({
    method: 'post',
    url: process.env.WP_API_URL,
    headers,
    data: JSON.stringify({ query }),
  });

  return allPosts.data.data.posts.edges;
};
```

We've got a very stripped down GraphQL query here that just grabs an ID, date, title, slug, content, and excerpt.

Next, we simply call axios' post request with the `WP_API_URL`. Once this returns, we pass back the array of posts data fresh from the WordPress kitchen.

> **Note:** we're fetching posts from WordPress here because this is what the whole series is about. However, you could easily replace this section with any other content data you wish. This site, for example, uses Markdown files to generate a blog post RSS feed.

### Processing posts data into XML feed items

For the next function, we want to create one that takes the fetched WordPress Post data and processes each individual Post's data into an XML feed item. Create a new function, `blogPostsRssXml` and add in the following:

```js
const blogPostsRssXml = (blogPosts) => {
  let latestPostDate = '';
  let rssItemsXml = '';
  blogPosts.forEach(({ node }) => {
    const post = node;
    const postDate = Date.parse(post.date);

    // Remember to change this URL to your own!
    const postHref = `https://myamazingwebsite.com/blog/${post.slug}`;

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }

    rssItemsXml += `
          <item>
            <title><![CDATA[ ${post.title} ]]></title>
            <link>${postHref}</link>
            <pubDate>${post.date}</pubDate>
            <guid isPermaLink="false">${postHref}</guid>
            <description>
            <![CDATA[ ${post.excerpt} ]]>
            </description>
            <content:encoded>
              <![CDATA[ ${post.content} ]]>
            </content:encoded>
        </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};
```

Another function that looks long, but is fairly simple in its operation. We're looping through the available blog posts that WordPress gave us, generating a human readable date, then checking to see if the current post is the latest post and updating the latest post date if that's true.

Finally, we build up and return a an individual XML item string which is added to the `rssItemsXml` string, which will eventually be returned as a large string, back to the calling function.

In case you're interested in the structure and markup for an XML RSS feed, the [W3 Schools website has a great introduction to the syntax on XML RSS feeds](https://www.w3schools.com/XML/xml_rss.asp 'W3 Schools RSS XML feed structure'). They'll outline which elements you can include, how it's all structured and more.

Oh, and **remember to change the line with `https://myamazingwebsite.com` to your own URL**!

### Generating the file's XML feed

The penultimate step is to create a function that will outline the bare bones skeleton of the RSS document, before calling the `blogPostsRssXml` to fill in the main content of the file with our Posts data.

Add the following code to our `rss-gen.js` file.

```js
const getRssXml = (blogPosts) => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);

  // Edit the '<link>' and '<description>' data here to reflect your own website details!
  return `<?xml version="1.0" ?>
      <rss
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:content="http://purl.org/rss/1.0/modules/content/"
        xmlns:atom="http://www.w3.org/2005/Atom"
        version="2.0"
      >
        <channel>
            <title><![CDATA[ Frontend development articles by Rob Kendal ]]></title>
            <link>https://myamazingwebsite.com</link>
            <description>
              <![CDATA[ A description about your own website that really shows off what it's all about ]]>
            </description>
            <language>en</language>
            <lastBuildDate>${latestPostDate}</lastBuildDate>
            ${rssItemsXml}
        </channel>
      </rss>`;
};
```

This is standard RSS XML feed structure here. It describes the data and the content, gives the feed a title and a meaningful description, as well as identifying the feed's language.

Again, notice that you should **replace the link and description with your own information** before you set this feed live!

### Putting it all together

By this point, if we just called the previous function, `getRssXml` on its own, we'd have a perfectly fine RSS feed for our Next.js site...in string format, **not** XML.

Even though the previous functions together make up about 95% of the task, the missing final 5% is the crucial part; the part that physically writes the RSS feed to a file as XML.

We're going to finish off the file with a new function `generateRSS` that will gather our blog post data from WordPress, use it to generate all the feed data for us (in string format) and write it out to a file for us.

Here's the last function to create and add at the end of our file:

```js
async function generateRSS() {
  const allBlogPostData = await getAllPostsXmlData();
  const processedXml = getRssXml(allBlogPostData);

  const staticOutputPath = path.join(process.cwd(), 'out');

  fs.writeFile(`${staticOutputPath}/rss.xml`, processedXml, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully');
    }
  });
}

// kick it all off
generateRSS();
```

You can see we fetch the WordPress Post data and supply it to the `getRssXml()` function, which gets us our RSS feed as a string, `processedXml`.

Next, we use the `path` import to work out the current working directory path so we can write a file to it.

Finally, we use Node's `fs` function to write a new file, `rss.xml`, containing our RSS feed string. We're writing this file directly into the root of the `/out` folder, which you'll recall is the folder that Next.js creates for us when we use the special `yarn export` command — it contains all the statically generated files for our site.

### The finished `rss-gen.js` file

With all of the above done, the finished `rss-gen.js` file should look like this:

```js
require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const getAllPostsXmlData = async () => {
  const query = `
        query AllPosts {
          posts(where: {orderby: {field: DATE, order: DESC}}) {
            edges {
              node {
                id
                date
                title
                slug
                content
                excerpt
              }
            }
          }
        }
        `;
  const headers = { 'Content-Type': 'application/json' };
  const allPosts = await axios({
    method: 'post',
    url: process.env.WP_API_URL,
    headers,
    data: JSON.stringify({ query }),
  });

  return allPosts.data.data.posts.edges;
};

const blogPostsRssXml = (blogPosts) => {
  let latestPostDate = '';
  let rssItemsXml = '';
  blogPosts.forEach(({ node }) => {
    const post = node;
    const postDate = Date.parse(post.date);

    // Remember to change this URL to your own!
    const postHref = `https://myamazingwebsite.com/blog/${post.slug}`;

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
    }

    rssItemsXml += `
          <item>
            <title><![CDATA[ ${post.title} ]]></title>
            <link>${postHref}</link>
            <pubDate>${post.date}</pubDate>
            <guid isPermaLink="false">${postHref}</guid>
            <description>
            <![CDATA[ ${post.excerpt} ]]>
            </description>
            <content:encoded>
              <![CDATA[ ${post.content} ]]>
            </content:encoded>
        </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate,
  };
};

const getRssXml = (blogPosts) => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);

  // Edit the '<link>' and '<description>' data here to reflect your own website details!
  return `<?xml version="1.0" ?>
      <rss
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:content="http://purl.org/rss/1.0/modules/content/"
        xmlns:atom="http://www.w3.org/2005/Atom"
        version="2.0"
      >
        <channel>
            <title><![CDATA[ Frontend development articles by Rob Kendal ]]></title>
            <link>https://myamazingwebsite.com</link>
            <description>
              <![CDATA[ A description about your own website that really shows off what it's all about ]]>
            </description>
            <language>en</language>
            <lastBuildDate>${latestPostDate}</lastBuildDate>
            ${rssItemsXml}
        </channel>
      </rss>`;
};

async function generateRSS() {
  const allBlogPostData = await getAllPostsXmlData();
  const processedXml = getRssXml(allBlogPostData);

  const staticOutputPath = path.join(process.cwd(), 'out');

  fs.writeFile(`${staticOutputPath}/rss.xml`, processedXml, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully');
    }
  });
}

// kick it all off
generateRSS();
```

And that's about it. Not a tiny file, but not a behemoth either. In just over 100 lines of code, we've managed to create a reusable RSS feed generator for Next.js that collects data from WordPress and creates an XML file for our blog posts.

You can easily swap out the data feed portion of this file if you need to get your RSS feed's data from somewhere else, or even pull it in from multiple sources.

## What's coming up next?

Next in the Next.js and WordPress series is going to be an in-depth look at a familiar situation: sending emails from contact forms within a static website.

_If you like this article, you'll love the other helpful content I post on Mastodon._ [_Follow me on Mastodon @kendalmintcode@indieweb.social_](https://indieweb.social/@kendalmintcode 'Follow me on Mastodon @kendalmintcode@indieweb.social') _and say hi._
