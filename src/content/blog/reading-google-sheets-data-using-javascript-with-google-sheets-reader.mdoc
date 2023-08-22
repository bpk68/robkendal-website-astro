---
templateKey: blog-post
title: Reading Google Sheets data using JavaScript with Google Sheets Reader
featuredimage: /img/mika-baumeister-703680-unsplash.jpg
featured: false
date: 2019-01-10T14:17:09.678Z
description: >-
  How can I access Google Sheet spreadsheets with JavaScript? I'll walk you
  through the handy Google Sheets Reader so you can fetch data with ease.
tags:
  - Development
  - JavaScript
  - Tutorials
---

![Floating point numbers on a computer screen](/img/mika-baumeister-703680-unsplash.jpg)

If you've ever found yourself asking 'how can I access Google Sheet spreadsheets with JavaScript?', then you're probably not alone. You only have to type something like 'reading google sheets data using javascript' into Google (or Duck Duck Go as I'm currently using :D ) and you'll be inundated with a bevvy of solutions to this conundrum.

The problem is, in my experience they're either very complex and overblown, or quite difficult to get up and running with (e.g. poor documentation), or they're just a bit too prescriptive with how they serve you those precious results.

So, I built my own...

![Yeah!! On colourful background](https://images.unsplash.com/photo-1519635694260-6af6fc200c89?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

Photo by [rawpixel](https://unsplash.com/@rawpixel?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

## Enter the Google Sheets Reader

Because I couldn't find something that worked well for my needs (and I didn't want to wrestle with the full-blown [Google Sheets API](https://developers.google.com/sheets/api/)), I decided to build a [quick, lightweight utility](https://github.com/bpk68/g-sheets-api.git#readme) to get hold of some simple data from within a Google Sheet and return it to me in a suitable fashion for me to deal with as I please.

The **Google Sheets Reader** is available on GitHub and the NPM package repository here:

- [GitHub project](https://github.com/bpk68/g-sheets-api.git#readme)
- [NPM package](https://www.npmjs.com/package/g-sheets-api)

We'll go into the why's and wherefore's in a moment, but let's cut to the chase and explain how to use it first.

## How do I use it?

Glad you asked. Head on over to the [GitHub repo and take a look for yourself](https://github.com/bpk68/g-sheets-api.git#readme). I've put together a decent readme file detailing exactly how to consume and use the Google Sheets Reader for yourself in your own projects.

### Firstly, is this right for my needs?

The Google Sheets Reader is a simple, one-way data fetcher that allows for _reading only_ from a publicly published Google Sheet. If your needs look like these, then it might be a great fit:

- You are able to publish your Google Sheet publicly
- You have a relatively simple data set in a single sheet (multiple sheets is a planned feature)
- You only need to _read_ the data
- You don't need access to more advanced functionality (such as caching or OAuth) provided by the [official Google Sheets API](https://developers.google.com/sheets/api/).
- You want a simple, straightforward means to get data > do things with data > celebrate!

[![Follow me on Mastodon @kendalmintcode@indieweb.social](/img/mastodon_cta.png)](https://indieweb.social/@kendalmintcode)

### Enough chatter, let me use the Google Sheets Reader!

The basic premise is that you need to do the following:

1.  Set up a Google Sheet for public access (there's a guide on the [GitHub project's readme file](https://github.com/bpk68/g-sheets-api.git#readme))
2.  Add the npm package to your repository
3.  Call the reader function and pass in a set of options and a callback function to handle the results

Once you have a Google Sheet available, you can add the npm package to your project:

`npm install g-sheets-api --save-dev`

or, if you prefer Yarn,

`yarn add --dev g-sheets-api`

Next, you need to call the reader in your project:

```javascript
const reader = require('g-sheets-api');
const readerOptions = {
  sheetId: '1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg',
  returnAllResults: false,
  filter: {
    'key to filter on': 'value to match',
  },
};

reader(readerOptions, (results) => {
  /* Do something amazing with the results */
});
```

The initial data soup that's returned from Google Sheets is neither JSON in nature, nor particularly friendly. In fact, it's a JSON-esque dump of cell values from the Sheet in question.

What the reader does for you is fetch this data swamp, trims and neatens it before parsing it into proper JSON. Then, it formats this collection of JSON cells into an array of row objects that look like this:

```json
[
  {
    // row 1
    "column 1 header": "column 1, row 1 value",
    "column 2 header": "column 2, row 1 value",
    "column 3 header": "column 3, row 1 value"
  },
  {
    // row 2
    "column 1 header": "column 1, row 2 value",
    "column 2 header": "column 2, row 2 value",
    "column 3 header": "column 3, row 2 value"
  }
  // etc.
]
```

That way, you're free to deal with them however you wish!

## Why build a Google Sheets Reader?

During a recent project involving the need to read structured, tabular data from an online storage pot (of some nature), we had initially used Google's Fusion Tables. However, these are a beta product and are being closed down this year year (August 2019 ish at the time of writing).

The need to swap out the Fusion Tables data store for an alternative that was robust enough to securely store the data, yet accessible enough for regular content editors to keep up to date or make changes, was strong; ultimately, this lead us to opt for Google Sheets as a replacement.

But...

The Fusion Tables setup is really just a nice UI on top of some JSON data, so it's already bundled with the mechanism to read the underlying data structure via nice, REST-like API endpoints.

Google Sheets, not so much.

Reading and writing data from Google Sheets largely revolves around setting up the API (currently V4 at the time of writing) via Google's Dev Console, and then slogging through the development docs and creating a (to my mind) faffy set of JavaScript functions to add the client auth library, get the promise object, get some data, squidge it into a reasonable shape, etc.

In our case, all we needed was a means to grab some simple, tabular data from a Google Sheet and stuff it onto the page in a HTML table.

Luckily, I discovered that there is a funky way to access the data in a Google Sheet by calling a special URL with a JSON modifier on the end:

`https://spreadsheets.google.com/feeds/cells/1-CmQumuz5ZiOvINhphEMgfplrJacQhD623RROcOBTAg/1/public/values?alt=json-in-script`

However, **this only works if you have published your Sheet to the wide world** - obviously, not appropriate for all needs, but a great fit for ours!

I then built the simple library to fetch data using this URL because, as mentioned above, the initial results that you get are a less-than-friendly collection of raw cell values. I needed a way to smoothly get the data, then massage it into something nicer to work with.

So, when you want to read data from Google Sheets using JavaScript in a simple, fuss-free way, now you can :D

## Useful links

If you'd like to know more about the utility or explore the code, then please take a look; feel free to leave comments, fork the work, suggest improvements - I'm all ears.

- [GitHub project](https://github.com/bpk68/g-sheets-api.git#readme)
- [NPM package](https://www.npmjs.com/package/g-sheets-api)
- [Google Sheets official API](https://developers.google.com/sheets/api/)
