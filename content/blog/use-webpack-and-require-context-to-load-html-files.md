---
templateKey: blog-post
title: Use Webpack and require.context to load HTML files
featuredimage: /img/malcolm-lightbody-668615-unsplash-md.jpg
featured: false
date: 2019-03-18T10:48:02.800Z
description: >-
  In this code article, I'm going to show you how to load fragments of HTML from
  a folder and output them onto a page using Webpack and require.context().
tags:
  - Development
  - JavaScript
  - Tutorials
---

![Glass fragments](/img/malcolm-lightbody-668615-unsplash-md.jpg)

There are a lot of ways to build a website these days using templates and templating languages: you've got handlebars, mustache, markdown, jasmine, JSX, and plenty of static generators to deal with them, such as Eleventy, Hugo, Gatsby. And that's not to mention the choice of vanilla HTML or some sort of framework, such as React.

But sometimes you just need to grab some HTML from some files and get it out onto a page. In this code article, I'm going to show you how to load fragments of HTML from a folder and output them onto a page using Webpack and `require.context()`.

If you just want to [jump to the bit where we start using require.context](#webpack-and-require-context-to-the-rescue) to load HTML files, go right ahead.

![cube](https://images.unsplash.com/photo-1529700215145-58542a1f36b6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

Photo by [Christian Fregnan](https://unsplash.com/@christianfregnan?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

### Why use require.context or HTML fragments at all?

If you're looking to build a website or even a small web app then there are probably more straightforward, scalable methods – see the numerous options mentioned at the start of the article.

Recently, however, I've been building a component UI library (using the amazing [Bulma CSS framework](http://bulma.io/)) and wanted a quick way to simply grab some HTML and include it in an end page – or series of pages – to show a live version of the library in action (a bit like [Bulma's own docs](http://bulma.io/)).

The HTML files weren't complete documents, however, simply _fragments_ of HTML that encapsulated a particular component from the library to show its markup. Also, I wanted them broken up into separate files in a folder for better organisation in the project. The main issues this presents is finding a reliable way to grab _all_ the files since they're broken up parts, not entire HTML documents, and grabbing them in a logical order, rather than having to have one loooooong document.

I'm using Webpack to bundle everything and deal with the CSS and JS processing, so it made sense to try and find a simple way to involve Webpack to grab these files and process them. Sure, I could have used some sort of templating language, but this would cause a couple of issues:

*   Introducing another level of complexity (however small) in what is otherwise a straightforward site.
*   Having to redo the components in a templating language.

There are other options of course, but some aren't all that feasible...

### Using native HTML include

Well, there isn't one really. There are lots of solutions involving `iframe` and `object`, but none of them are ideal - especially given the drawbacks of using iframes.

### Using the shiny new HTML import feature

There is a brilliant article by Eric Bidelman on [using HTML imports](https://www.html5rocks.com/en/tutorials/webcomponents/imports/). His method uses the current [Editor's Draft spec from W3C](https://w3c.github.io/webcomponents/spec/imports/) for the importing of HTML files using the `link` element in the head of a document as follows:

```markup
<link rel="import" href="/path/to/awesome/file.html">
```

From here, you can use some really simple JavaScript to grab the HTML content and load it onto the page:

```javascript
const content = document.querySelector('link[rel="import"]');
const outputElement = document.querySelector('#placeToShoveContent');

outputElement.appendChild(content.import);
```

Whilst this will need a little more JavaScript hacking to handle multiple imports programmatically, it's a nice clean solution that works pretty well using native features. **Unfortunately**, this feature is currently in **working draft** stage and not quite ready for production use.

Checking out [Can I Use's site](https://caniuse.com/#feat=imports) (at the time of writing) it's only available in the latest versions of Chrome and Opera. Sad face.

### Using JavaScript to load it up

Again, you can use some vanilla JS or even jQuery to load up other files, something like this:

```javascript
$(function() {
	$('#placeToShoveContent').load('path/to/file.html');
});
```

That's simple enough, but then it means loading jQuery into the project, just to do that. The vanilla JS solution is slightly more verbose then is ideal, mainly using AJAX to request the files (which is what the `jQuery.load()` function is really doing under the hood anyway).

<a name="webpack-and-require-context-to-the-rescue"></a>Webpack and require.context() to the rescue!
--------------------------------------------

So then, since we're already using Webpack to build this thing, let's leverage one of Webpack's great features: require.context().

(By the way, if you're looking for a [good Webpack starter kit](https://robkendal.co.uk/webpack-project-starter-kit/), then I have a [great template available on GitHub](https://github.com/bpk68/web-template))

### First, configure html-loader to process our files

Firstly, because we're loading HTML files, we'll need to install Webpack's [html-loader](https://webpack.js.org/loaders/html-loader/); an easy feat with npm/yarn:

`npm i -D html-loader` or `yarn add --dev html-loader`

From here, we need to add the html-loader configuration into our `webpack.config.js`

```javascript
module: {
        rules: 
        [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader'
                }
            },
            ...
            {
            //other rules here
            }
        ]
      }
```

Now, Webpack can recognise and process HTML files for us if we do something like this:

`require('/path/to/html/file.html');`

But that's just one file, we need to load a bunch in, which will be a growing list – impractical to keeping adding a single line at a time.

### Using require.context()

Now we can load HTML files, we can set about using `require.context()` to load in some files within a folder and process their contents.

Here's what I did to achieve just that:

```javascript
// grab the element where we'll output the HTML to
const output = document.querySelector('#output');

// create a 'cache' where we can store our built up HTML from our fragments
let htmlFragmentCache = {};

// here, we're creating an anonymous function that loads up our HTML fragments
// then it adds them to our cache object
const importAll = requireContext => requireContext.keys().forEach(key => htmlFragmentCache[key] = requireContext(key));

// next, we call our importAll() function to load the files
// notice how this is where we call the require.context() function
// it uses our file path, whether to load subdirectories and what file type to get
importAll(require.context('./fragments', false, /.html$/));

// finally, we can loop over our cache's keys and add the HTML to our output element
Object.keys(htmlFragmentCache).forEach(key => output.innerHTML += htmlFragmentCache[key]);
```

And it's as simple as that! Of course, even those scant few lines can be condensed into an [anonymous function](https://robkendal.co.uk/arrow-functions-in-javascript/) (really, an example of an [Immediately Invoked Function Expression](https://blog.mgechev.com/2012/08/29/self-invoking-functions-in-javascript-or-immediately-invoked-function-expression/) or IIFE) to create an even cleaner, terser end result:

```javascript
(context => {
	// need to clear out the current element's contents (just in case!)
	output.innerHTML = '';

	// now, load up the html fragments and add them to the page
	context.keys().forEach(key => output.innerHTML += context(key));
})(require.context('./fragments', false, /.html$/));
```

And there we have it. A really clean, simple way to load in a bunch of HTML files in a folder, using `require.context()` in a JavaScript file, loaded, processed and bundled using Webpack. Bosh!

Any other ideas?
----------------

Comments: you got 'em! Let me know how you would (or have) handled this sort of thing in the past. Do you have an easier solution, something better? I'd love to hear your thoughts and ideas.
