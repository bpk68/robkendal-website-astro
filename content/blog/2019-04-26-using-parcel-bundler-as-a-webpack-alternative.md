---
templateKey: blog-post
title: Using Parcel bundler as a Webpack alternative
date: 2019-04-26T07:06:11.293Z
featured: false
featuredimage: /img/blog-parcel-bundler-alternative.jpg
description: >-
  Parcel JS is a Webpack alternative that helps you build modern JavaScript
  projects. If you're looking for a simple Webpack alternative, try this Parcel
  JS starter kit.
tags:
  - Development
  - JavaScript
  - React
---

I've recently become a [mentor on Coding Coach](https://codingcoach.io/) and found that a lot of development struggles seem to happen right at the first hurdle: project set up. People have lots of great ideas, but find it hard to get started, what with all the choice of languages, design systems, and general project set up.

Depending on what you want to work with there are lots of options out there, including [Create React App](https://facebook.github.io/create-react-app/) (for React-based projects) and bundlers such as Webpack for more general JavaScript web apps or if you want more control over your projects in's and out's.

Webpack in particular is awesome, but quite involved to get configured to a decent spec for most modern web projects. To help with this, I created the [Webpack starter kit](https://robkendal.co.uk/blog/quick-start-javascript-projects-with-this-webpack-project-starter-kit/), that includes common helper plugins and all the configuration for development and production environments.

Great, I hear you say, so why are we talking about [Parcel](https://parceljs.org/)?

## What is Parcel and why is it a great Webpack alternative?

Parcel JS is a comparable Webpack alternative that offers much of the same features and functionality as Webpack but in a much more straightforward fashion and with more of the 'standard' options configured out of the box.

For example, if will automatically find and link JavaScript dependencies from your very first starting file and also help to bundle common web assets, such as images and CSS files; something that Webpack doesn't do natively, out of the box.

Right now, it feels like Parcel is a little less well-known, a little underground even, but it's gathering traction as a genuine alternative to Webpack.

The real big, killer feature of Parcel is that it offers a very web-project-friendly configuration out the box with **almost zero faff needed**.

The [documentation for Parcel](https://parceljs.org/getting_started.html) is fantastic: simple, to the point and well worth checking out.

![Workbench filled with tools](/img/cesar-carlevarino-aragon-778069-unsplash.jpg 'Image credit to Cesar Carlevarino-aragon via Unsplash')

## Getting started with Parcel

Parcel couldn't be easier to get going with Parcel for your next project. In fact, there are only four steps to getting going:

1. Install Parcel
2. Create a `package.json` file
3. Create a starting/entry point (e.g. `index.html`)
4. Call the parcel command against the file

The first two points can be achieved like this:

```javascript
/* add it globally, so it's available to all your projects */
yarn global add parcel-bundler
```

and initialise the project, adding a package.json file.

```javascript
yarn init -y
```

Now, at step 3, we can just create two files to do something useful. First, a starter html file

```markup
/* add this to your project root as index.html */
<html>
  <body>
    <main id="app"></main>
    <script src="./index.js"></script>
  </body>
</html>
```

Next, we need an initial JS file to do some work:

```javascript
/* again, add this file to your project root as index.js */
const myName = {
  firstName: 'Parcel',
  lastName: 'Tastic',
};
document.querySelector(
  '#app'
).innerHTML = `Hello there, ${myName.firstName} ${myName.lastName}`;
```

Finally, kick it all off using the parcel command:

```javascript
parcel index.html
```

And that's it (for now). Parcel handily includes a development server (you can browse to `http://localhost:1234` to view the output of the code above) so you should see the above rendered something like this output from my Code Sandbox instance:

{% iframe
  url="https://codesandbox.io/embed/8z4vzk10p8?fontsize=14"
  label="Parcel example from blog"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
/%}

## Introducing the Parcel JS starter kit

Using those four simple steps above, you can get a project flying off the ground in under 10 minutes. However, if you want something a little bit more, such as the ability to use SASS or newer, ES6 langauge features, you'll need some addtional config to get started.

That's why (along with my [Webpack starter kit](https://robkendal.co.uk/blog/quick-start-javascript-projects-with-this-webpack-project-starter-kit/)) I've created a similar starter project for those interested in using Parcel.

### What's included in the kit?

Not a great deal to be honest. Because Parcel is so helpful and ready to go, straight out of the box, this starter project just sprinkles a few nice-to-haves on top of the base files we went through earlier in this article.

Specifically, working through the project, it includes:

- `index.html` - where it all begins. This file is set as the main entry point in your `package.json` file and where Parcel takes its cue to load the resources it finds from there. This base HTML starting point adds a few niceties in such as a mobile viewport meta and 'no script' tags.
- `.babelrc` - if you want to use newer JS language features right now, you need Babel. Babel is installed as a dependency in the project already, but you need this small config file in your project root to enable the Babel goodness.
- `package.json` - nothing too fancy in here beyong the usual project information. It does, however, contain a `start `command for running development services locally and a `build` command that will bundle your project up and add it to the `/dist` folder for deployment.
- `src/index.js` - the first file that Parcel looks for at the start of its bundling journey. Parcel will begin here and look for any other files that are referenced within it, loading them up and bundling as needed.
- `src/app.scss` - a simple, starting point for your SASS files. It adds a default font family and size, but should be used as a starting point for the rest of your project's style files.
- `/dist` - this folder contains (or will contain) the squished, bundled files that are output by Parcel, following a production build command -- available from the `package.json` file as `yarn build`.

### Using the Parcel starter project

I've tried to keep the starter project super simple to use -- just like Parcel itself! All you need to get going is another four steps:

1. Fork the repo (available here: <https://github.com/bpk68/parcel-template>) or download the files
2. Run `yarn install`
3. Edit anything you like
4. Run `yarn start` - your browser should open up to something like http://localhost:1234

And that's it. Super simple.

## Need something else? Try createapp.dev

As well as the [Parcel starter kit](https://github.com/bpk68/parcel-template) from this article, there is a [handy tool available called Create App](https://createapp.dev/parcel) and it includes a Parcel project setup. Essentially, you can check a bunch of options using a GUI to configure a Webpack or Parcel project if your needs are a little more specific or you want something different to begin with.

Definitely worth some time investigating!
