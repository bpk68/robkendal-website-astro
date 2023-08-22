---
templateKey: blog-post
title: Quick-start JavaScript projects with this Webpack project starter kit
featuredimage: /img/webpack-starter-kit-blog-header.png
featured: false
date: 2019-02-13T09:26:05.091Z
description: >-
  Use my free, tried-and-tested Webpack project starter kit if you'd like to get
  your next web app or JavaScript project started quickly
tags:
  - Development
  - JavaScript
---

![Webpack starter kit diagram](/img/webpack-starter-kit-blog-header.png)

I feel as if I've written a number of non-technical posts lately, mainly because I've had a lot of broader concepts floating around in my noggin. So if you're interested in article on [tech tests being relevant](https://robkendal.co.uk/are-tech-tests-still-relevant/), [continuous refactoring](https://robkendal.co.uk/continuous-refactoring-avoiding-technical-debt-in-the-here-and-now/) or whether you should [use nest stuff in your smart home](https://robkendal.co.uk/nest-smart-home-review/), you're all set.

But let's not do that here. Here, I'm going to share with you my quick and simple [starter kit](https://github.com/bpk68/web-template) for [Webpack](https://webpack.js.org/) based projects.

(_Pssst! If you'd rather just investigate the GitHub repo for the Webkit project starter then go there via this link:_ [https://github.com/bpk68/web-template](https://github.com/bpk68/web-template)_)_

Why Webpack (vs Gulp or Grunt)?
-------------------------------

**Gulp** and **Grunt** have reigned victorious as JavaScript project favourites for many a year. As JavaScript task runners, both Gulp and Grunt do a great job of minifying code, cleaning CSS, transforming template files and, well, just about anything you can imagine as a task that can be run during a build.

![](https://robkendal.co.uk/content/images/2019/02/logo-on-white-bg.png)

Webpack - the bundling system for JS projects

However, they've fallen out of favour amongst the community in recent times as support for both their core product and their coupled ecosystems (e.g. Bower) is dwindling. A further nail in the coffin comes in the form of React, which offers an all-in-one starter solution – Create React App – using....drum roll...**Webpack**.

Although Webpack at its core is a bundler, not a task runner, it has been enjoying more use in place of Gulp and Grunt – appearing in more overall stacks than either of the two task runners, and is mentioned in nearly twice the number of job posts. It’s also far more popular on GitHub.

Why a Webpack starter kit?
--------------------------

Webkit works well out of the box with minimal configuration. However, depending on your situation, you'll almost always find yourself requiring a little bit more than the 'default' setup.

The problem _I_ faced when I started regularly using Webkit to kick-off projects is that it requires a lot of additional plugins and settings to get it to the point where it covers all the things I want my project to automatically handle. Things such as:

*   Bundling _and_ minification
*   Code chunking and optimisation running
*   Linting support
*   ES6/ES2015 language features via Babel
*   Copying and moving assets as part of the build
*   ...and some others

By setting up a blank project, with all of the above configured out of the box, I can focus on the productivity and excitement of a new project, _without_ getting bogged down in repetitive set up files.

![power](https://images.unsplash.com/photo-1493994055174-cfa612a0d07c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjExNzczfQ)

Photo by [Fancycrave](https://unsplash.com/@fancycrave?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit) / [Unsplash](https://unsplash.com/?utm_source=ghost&utm_medium=referral&utm_campaign=api-credit)

Let me introduce the (finished?) Webpack starter kit
----------------------------------------------------

OK, so you're never _really_ finished – there'll always be tweaking and changes to make as needs shift. But for now, the current state of the [publicly available Webpack starter project](https://github.com/bpk68/web-template) is a great jumping off point for a web app project.

It includes all the configuration baked in and ready for deploying to a server of your choice. It even includes some non-Webpack packages, such as the amazing [Semantic Release](https://github.com/semantic-release/semantic-release).

### What's included?

It's a simple setup with relatively unbiased opinions. Here is a brief outline of the project with summaries of the what's and why's of some of the files:

*   `.babelrc` - specifies the version of language support that babel brings. In this case, it's set to use the latest ES6/ES2015 language features.
*   `.npmignore` - a handy cousin to the .gitignore file that ignores some project files/folders if you're doing an npm deploy or publish with this project.
*   `.releaserc.json` - some good defaults for getting Semantic Release working.
*   `templates/index.html` - a very simple html document where your bundles are added and your app starts from. You don't strictly need this file, but it's likely you'll prefer a little more control over what gets added into your final html output, whether that's meta info, other stylesheets, or perhaps micro-schema. This template gives you that control whilst retaining the auto-bundle-inclusion witchcraft of Webpack.
*   `src/index.js` - the very start of your project, where all the magic JS happens.
*   `src/vendors.js` - a good file to put your third-party libraries or load your vendor files in. The webpack.config.js files split out the code based on the main index.js and vendors.js files.
*   `config/` - we'll go into this in a moment, but for now, this is where your common (shared), development, and production configuration files for Webpack live.

### Splitting the Webpack configuration

In a similar way that you can split out Grunt configs into multiple files, Webpack allows you to separate your common (shared), production, and development settings into distinct files. To achieve this, we can use the webpack-merge plugin – included in the starter kit.

Under the `/config` folder, you'll find these three files:

*   `webpack.common.js` - although the largest of the config files, the shared/common config sets up from Webpack basics, such as how to chunk your bundled assets, creating file-path aliases, how to handle certain files, as well as cleaning the `/dist` folder before deployment and choosing which html template to use to start your project.
*   `webpack.dev.js` - in here you'll find rules to process CSS using the css-loader plugin, source-mapping options and a fully-functional web server to serve your in-development work from – `localhost:8080` by default. It omits any optimisation or minification at this level.
*   `webpack.prod.js` - for production, these settings uglify, minify, and optimise your JS and CSS assets, and the mini-css-extract plugin chops your CSS files into bite-sized chunks; a bit like Webpack does for your JS files.

### Project plugins, add-ons and the package.json file

Finally, we have the package.json file for the project which includes a number of plugins to help Webpack do its stuff. Here's a breakdown of what does what:

*   `@babel/polyfill` - polyfill from [BabelJs](https://babeljs.io/) that helps you to run the latest JS features (in our case, from ES6) now.
*   `semantic-release` - [Semantic Release](https://github.com/semantic-release/semantic-release) helps to automate the scheduled release workflow including adding version numbers, updating release notes, and pushing releases to GitHub/npm. This can be deleted if it's not to your liking.
*   `babel-loader` - this adds Babel support and transpilation to Webpack during bundling of JS files.
*   `clean-webpack-plugin` - simply empties the `/dist` folder during a build to remove any previous code/assets from the last build.
*   `html-webpack-plugin` - an [official Webpack plugin](https://webpack.js.org/plugins/html-webpack-plugin/) that helps to give you more control over the creation of html files from which to server your bundles.
*   `copy-webpack-plugin` - copies files from the source directory into the build/output directory. You can view the [npm package here](https://www.npmjs.com/package/copy-webpack-plugin).
*   `mini-css-extract-plugin` - the [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) splits your CSS into separate files – a little like how the JS files can be chunked. It supports on-demand loading of CSS and sourcemaps.
*   `optimize-css-assets-webpack-plugin` - [optimises and minifies CSS](https://www.npmjs.com/package/optimize-css-assets-webpack-plugin) assets during the production build.
*   `uglifyjs-webpack-plugin` - nice and simple, this one takes your beautiful JS files and transforms them into less-readable, uglified versions that are smaller and harder to understand (keep your coding secrets safe...ish).
*   `style, css, file, image-loader` - these are all official Webpack add-ons that help you to process different file types based on some rules (this is set in the modules section of Webpack config files). For example, we catch CSS files, run them through the `style-loader` helper to bundle them into our final build output.

Using the Webpack starter project
---------------------------------

Hopefully, it should be really easy. Here's how to get started:

1.  Fork the repo (get it here: [https://github.com/bpk68/web-template](https://github.com/bpk68/web-template)) or download the raw files.
2.  Run `yarn install` (assuming you have yarn installed on your machine) to add the npm packages.
3.  Edit any settings or config files to suit.
4.  Edit `src/index.js` to create something magical.
5.  Then run `yarn start` to deploy the files locally and spin up a local webserver.
6.  Browse to `http://localhost:8080` to view your work.

Updates, comments, feedback, changes
------------------------------------

This is a handy starter project that I created for my own purposes, but I know people run into the same issues as I do and I hope that this gets people moving faster.

If you have any comments, add them into the Disqus form below. If you have issues, problems, or general feature requests then start a pull request or issue on GitHub and I'll do my best to look at it really quickly.

Now get out there and make something amazing!
