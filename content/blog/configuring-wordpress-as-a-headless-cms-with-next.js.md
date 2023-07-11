---
date: 2020-09-06T09:33:25.000+00:00
published: true
title: Configuring WordPress as a headless CMS with Next.js
description:
  In part 1 of the Getting Started with Next.js, we're looking at how to
  use configure WordPress as a headless CMS to use with Next.js using WPGraphQL
featuredimage: '/img/next-js-with-wordpress-part-1-blog-post.png'
featured: true
tags:
  - Static Sites
  - Next
  - JavaScript
---

![Blog article on configuring WordPress as a headless CMS with Next.js](/img/next-js-with-wordpress-part-1-blog-post.png)

Welcome to the first in a series of articles on getting started with Next.js. In this very first starting point, we'll be looking at creating a brand new Next.js project using the very helpful `create-next-app` tool.

From there, we'll be setting up WordPress as a headless CMS to manage our blog posts' content for us.

As we move through future articles in the series, we'll be covering a lot of moving parts to round out the entire process, including:

- Starting a blog using Next.js,
- Using WordPress as a headless CMS with Next.js,
- Creating an RSS feed for our static Next.js blog
- Bundling, building and deploying our Next.js static blog with Netlify

For this very article, however, we're just going to start with the basics of getting Next.js and our headless WordPress instance setup and ready to go.

So let's get to it!

## Why Next.js

[Next.js](https://nextjs.org/ 'Next.js from Vercel') (made by a company called [Vercel](https://vercel.com/ 'Vercel static website hosting') — formally Zeit) is a React-based framework for producing static-generated websites. It fills in some of the blanks of using React in its vanilla form, such as dynamic page routing, and it also allows developers a bevvy of choices of where to get their data from to power their static websites.

### Isn't it just like Gatsby

It's very comparable to [Gatsby](https://nextjs.org/ 'Next.js from Vercel') (which I also love) in many ways. Indeed Next.js and Gatsby share the same end goal: to connect data with a static-generator engine to produce a static website.

Personally, I prefer Next.js the more I use it. Whilst Gatsby offers a more mature eco-system with its plugins and community, Next.js offers a much less complex setup and often requires fewer plugins to achieve the same thing.

I'd recommend trying both and seeing which you prefer.

## Why use WordPress as a headless CMS

WordPress is an often maligned platform, but it does power something close to 35% of the entire web. It's a hugely popular content management platform and most people have come across it, if not directly used it at some point during their time.

However, it does have a reputation for being quite clunky at times and it takes some work to produce a performant website on the front end.

One of the best reasons to consider WordPress as a headless CMS is that it solves the largest problem facing static-generated websites: editing content!

Sure, for most developers (me included) this isn't so much of a burden. For example, I use [Forestry.io](https://forestry.io 'Forestry.io markdown CMS') as a markdown editor/CMS to edit the markdown files that power this very site directly in my GitHub repo.

Other developers may choose to just edit HTML directly, and that's fine and dandy.

But what about 'normal' users, marketers, content editors, _non-developers_?! Editing markdown or HTML files is a bit beyond their needs or, perhaps, their skillsets.

By using WordPress as a headless CMS with Next.js, it's win win win. Website visitors get performant, accessible websites. Developers get a great developer experience and aren't hampered by the very opinionated and clunky PHP development required for WordPress. And content producers and site owners still get to use their favourite content management tool, WordPress, to handle the editing process!

[![Follow me on Mastodon @kendalmintcode@indieweb.social](/img/mastodon_cta.png)](https://indieweb.social/@kendalmintcode)

## Step 1, getting WordPress ready for Next.js

Installing and getting a WordPress instance going is beyond the scope of this article and there are many places to help get you started with that.

If you're looking for a recommendation then check out [Amazon's Lightsail](https://aws.amazon.com/lightsail/ 'Amazon Lightsail hosting'), or the AWS platform in general as there are often free tiers available, especially whilst you're just getting started.

What we're bothered about here is adding some necessary bits and pieces to a WordPress website to turn it into a headless CMS for Next.js to access.

So, assuming you already have a WordPress instance set up, let's move on.

![Demo WordPress website from Rob Kendal](/img/nextjs-demo-robkendal.jpg)

### Installing WPGraphQL (and plugins)

Out of the box you can use the WordPress REST API to fetch data and so on, but we're going to be using GraphQL to do the heavy lifting.

This does mean we have to install a few plugins, however, before we can start accessing our data via Next.js.

So, we'll be heading over to [https://www.wpgraphql.com/](https://www.wpgraphql.com/ 'WPGraphQL plugin') and we'll want to install the following plugins:

- [WPGraphQL main plugin](https://github.com/wp-graphql/wp-graphql/releases 'WPGraphQL plugin')
- [WPGraphQL for ACF](https://github.com/wp-graphql/wp-graphql-acf 'WPGraphQL for ACF plugin') (advanced custom fields)
- [WPGraphiQL](https://github.com/wp-graphql/wp-graphiql 'WPGraphiQL plugin') - a visual query builder/explorer for GraphQL

**Note:** _with the WPGraphQL stuff, you'll have to visit those links, download the Source Code (zip) as zip files and upload them to WordPress manually via the Admin Menu > Plugins > Add New > Upload dialog._

![WPGraphQL releases plugin download page](/img/nextjs-article-wpgraphql.jpg)

The reason for favouring GraphQL is that it's faster than the REST API and GraphQL gives us the power and flexibility to return only the data we need. Using the WPGraphiQL plugins also allows us to both build our queries directly inside of our WordPress instance before moving them into Next.js

> This is hugely important as we can see the output of the queries, testing and tweaking them as we go, _before_ we have to blindly add them to our local dev instance.

We'll also need one last plugin, [Advanced Custom Fields](https://www.advancedcustomfields.com/ 'WordPress Advanced Custom Fields (ACF) plugin') (ACF). This will allow us to add extra fields to our posts or pages to extend their content capabilities.

### Adding custom fields to posts

Next, and this part is optional if you don't want/need custom fields on your posts, we'll set up a few custom fields using ACF and make sure they're enabled for WPGraphQL, **otherwise they won't show up**.

Head over to your WordPress admin console and then to Custom Fields > Field Groups and make a new one, calling it whatever you like.

For my site, I called the Field Group 'Extra Post Info'. Then, I added three fields:

1. Author Excerpt - a text area field
2. Preview Image - a simple image selection field
3. Thumbnail Image - as above

![WordPress ACF fields setup](/img/nextjs-article-acf-setup.jpg)

You can add whatever fields you wish and name them to suit your needs.

From here, scroll all the way to the bottom of this page and enable the WPGraphQL settings as follows:

1. Make sure `Show in GraphQL` is set to 'Yes'
2. For `GraphQL Field Name` set this to a meaningful and descriptive name for your extra fields. This will be the name we use to reference the extra fields in GraphQL. Here, I named mine `extraPostInfo`

![WPGraphQL settings to enable custom fields to show up](/img/nextja-article-ac-graphql-settins.jpg)

And that's that. One final thing is to populate a few dummy posts in the Posts section of the admin menu. Just create a handful of new posts and add in whatever content you wish (I find Lorem Ipsum works just fine here).

### Viewing our Posts in GraphQL

Having installed all the necessary WPGraphQL posts, added some extra fields, and made sure those were added to the GraphQL schema, with some dummy Post content in place, we can go check out the Posts data via the WPGraphiQL explorer.

Head over to the GraphiQL menu item in your WordPress admin console.

Now for the real magic! GraphiQL is a visual query builder that lets you simply expand and toggle data fields on the left hand side, build a query in the middle using those data fields, and execute that query to see what data is returned.

Very powerful stuff, I'm sure you'll agree. Now, the in's and out's of GraphQL language and the GraphiQL tool are entire articles and courses in themselves, but you can find out more from the [official GraphQL website](https://graphql.org/ 'Official GraphQL website and documentation').

For our purposes, you can see below that I've expanded various paths on the tree menu, starting with `posts` and this has automatically built me a query in the centre editor panel. When I pressed the big play button, the query is executed and the results shown in the rightmost panel.

![GraphiQL query data builder](/img/nextjs-article-graphiql-query.png)

The query built looks like this:

```js
    query MyQuery {
      posts {
        edges {
          node {
            id
            date
            title
            slug
            featuredImage {
              node {
                mediaItemUrl
              }
            }
            extraPostInfo {
              authorExcerpt
            }
          }
        }
      }
    }
```

And this query returns something along the lines of this data:

```json
{
  "data": {
    "posts": {
      "edges": [
        {
          "node": {
            "id": "cG9zdDoyOA==",
            "date": "2020-07-09T07:18:42",
            "title": "A third post with an interesting name",
            "slug": "a-third-post-with-an-interesting-name",
            "featuredImage": null,
            "extraPostInfo": {
              "authorExcerpt": "I'm a thing. I usually try to keep my sadness pent up inside where it can fester quietly as a mental illness. Leela, are you alright? You got wanged on the head. Okay, I like a challenge. Robot 1-X, save my friends! And Zoidberg!"
            }
          }
        },
        {
          "node": {
            "id": "cG9zdDoyNQ==",
            "date": "2020-07-09T07:17:19",
            "title": "Another awesome post with a really long title",
            "slug": "another-awesome-post-with-a-really-long-title",
            "featuredImage": null,
            "extraPostInfo": {
              "authorExcerpt": "It's okay, Bender. I like cooking too. Why would I want to know that? Fry, we have a crate to deliver. You guys aren't Santa! You're not even robots. How dare you lie in front of Jesus? My fellow Earthicans, as I have explained in my book 'Earth in the Balance'', and the much more popular ''Harry Potter and the Balance of Earth', we need to defend our planet against pollution. Also dark wizards."
            }
          }
        },
        ...others
      ]
    }
  }
}
```

And with that, we have our WordPress instance set up as a headless CMS with the Posts data all ready to go in a nice, neat GraphQL query.

## Step 2, creating a Next.js project

The final step in the project setup process to use WordPress as a headless CMS using Next.js is the most important part: Next.js!

As it happens, [Next.js has a project create tool](https://nextjs.org/learn/basics/create-nextjs-app/setup 'Next.js Create Next App tool documentation') called `create-next-app` which will create us a bootstrapped Next.js app with the barebones of configuration ready to go.

Much like React's own `create-react-app` tool, the `create-next-app` tool is run from the command line and creates a directory with all the necessary project files in place.

It's a great starting place, so let's run it now in a directory of your choosing. Fire up your terminal and run the following command:

    npx create-next-app headless-wp-demo

Once finished, you'll receive a message saying everything's been successful and then you will be given a few commands to build, run, and start our new app.

Let's check everything's working first by typing the following commands in your terminal:

    cd headless-wp-demo

and finally:

    yarn dev

What you'll see is a blazing fast site build, followed by a message that your site has successfully been started at `http://localhost:3000`. Open that address in a browser of your choosing and you should see the following page.

![Next.js local development site running on http://localhost:3000](/img/nextjs-article-nextjs-demo-site-start.png)

And it really is as simple as that...for now.

In part two, we'll be looking at how to access our GraphQL data using Next.js and take a deeper dive into dynamic routing.

You can skip ahead to part two, [using WordPress as a headless CMS with Next.js](https://robkendal.co.uk/blog/using-wordpress-as-a-headless-cms-with-next.js) now.
