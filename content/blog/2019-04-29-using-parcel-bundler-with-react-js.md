---
templateKey: blog-post
title: Using Parcel JS bundler with React
date: 2019-04-27T07:06:11.293Z
featured: false
featuredimage: /img/react-parcel-blog-post.png
description: >-
  You can build a Parcel JS website using React, instead of using Create React
  App. In this article, we'll look at  how to add in the missing parts of the
  Parcel JS bundler to allow us to build sites with React.
tags:
  - Development
  - JavaScript
  - React
---
A few days ago I wrote an article about my [Parcel JS starter kit](https://robkendal.co.uk/blog/2019-04-26-using-parcel-bundler-as-a-webpack-alternative/) and using [Parcel JS bundler as an alternative to the popular Webpack](https://robkendal.co.uk/blog/2019-04-26-using-parcel-bundler-as-a-webpack-alternative/) (and yes, I even have a [Webpack starter kit](https://robkendal.co.uk/blog/quick-start-javascript-projects-with-this-webpack-project-starter-kit/)!).

However, if you're quite keen on using React, but don't want to go down the [Create React App](https://facebook.github.io/create-react-app/) route, read on! I'm going to build on the [Parcel JS starter kit](https://robkendal.co.uk/blog/2019-04-26-using-parcel-bundler-as-a-webpack-alternative/) and add in a few necessary pieces of the puzzle so you can use [React JS](https://reactjs.org/) with your Parcel projects.

## What's wrong with Create React App?

To be honest, not much. It's a **fantastic resource** and I use it personally and professionally without a hitch. However, Create React App abstracts its underlying Webpack set up. This abstraction isn't suitable for everyone and every project, and some people just don't want to sacrifice control of their configuration. 

But of course the gain in control by eschewing Create React App's config secrects is offset by the additional work needed to get it playing nicely with a system like Webpack or Parcel. 

Well, until now!

## How do I use React with Parcel JS?

Because we're going solo for now, we have to add a few things to our project in order to get React working and start using the nice, shiny ES6 language syntax and features. Namely:

* React (and some React bits, such as React Component).
* Babel. For Babel, we're also going to add the correct preset and some React niceties so that Babel and React play well with each other.
* Package.json. Yes, this is already in the project, but we need to change a few things in here to make everything work.

### It started with a kit

We're going to build upon the [CodeSandbox example from the previous article](https://codesandbox.io/s/8z4vzk10p8?fontsize=14) which, you may remember, looks like this:

![Screenshot showing parcel in action](/img/screenshot_2019-04-27-codesandbox-1-.png "Screenshot of Parcel JS loading the text")

Which is using plain ol' JavaScript to load the following code:

```javascript
const myName = {
  firstName: "Parcel",
  lastName: "Tastic"
};
document.querySelector("#app").innerHTML = `Hello there, ${myName.firstName} ${
  myName.lastName
}`;
```

### Adding React (and friends) to the base project

Let's React-ify (can I claim this new word?) this puppy! We'll need to add React (no kidding!), Babel, and add some settings into the recipe.

First things first: let's add React with the following command:

```
yarn add react react-dom
```

This will add the base React JS library and the React DOM module, giving us access to actually output our stuff onto the page. Next, we'll add some Babel transpilation configuration goodness. 

When it comes to Babel, Parcel is such a good egg that it includes Babel by default (you can [read Parcel's transforms documentation](https://parceljs.org/transforms.html) for more information), but you **have to add a _.babelrc_ file to your route to enable this feature!**.

We do, however, have to add Babel's React preset, so let's do that now:

```
yarn add @babel/preset-react --dev
```

Now, there's just the tiny matter of creating a `.babelrc` file in the route of our project and adding in some configuration options:

```json
{
  "presets": [
    "env", "@babel/preset-react"
  ],
}
```

In the `.babelrc` file, we're essentially telling Babel to use its ES2015/ES6 transpilation options, but also look after some React specifics, such as .jsx syntax.

### Updating our index.js to use React

If you save, build and refresh everything, you'll be a little disappointed. Nothing's actually going to do anything with React just yet, we have to swap out our vanilla JS for some React code!

Open up the `/index.js` file and add in some React to replace the element selector we had before. 

```javascript
// firstly, we need to import React and ReactDOM
// this enables us to create React components and render them on the page
import React from "react";
import ReactDOM from "react-dom";

// our 'myName' object remains the same
const myName = {
  firstName: "Parcel",
  lastName: "Tastic"
};

// let's create a simple stateless React component that accepts a name object
// and outputs a heading level 2
const Title = props => {
  return (
    <h2>
      Hello there, {props.name.firstName} {props.name.lastName}
    </h2>
  );
};

// finally, we're taking the same #app id selector to find out main HTML element
// and passing that, plus our Title component to React to render
ReactDOM.render(
  <Title name={myName} />, 
  document.querySelector("#app")
);
```

Ta da! Nothing very flash, just black text on a white background, but it does the trick and is a great example of what you can do with very little effort using Parcel and React together.

![Heading text loaded using Parcel and React](/img/screenshot_2019-04-27-codesandbox.png "Heading text loaded using Parcel and React")

## The complete example and next steps

If you'd like to explore the entire project, you can [have a look over at the CodeSandbox site](https://codesandbox.io/s/w0410q1228?fontsize=14) and check it out. Alternatively, I've embedded the full project below for your perusal. 

<iframe src="https://codesandbox.io/embed/w0410q1228?fontsize=14" title="Parcel example using React from blog" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

From here, the world's your oyster. At the moment, we've **added React to a Parcel JS project** and made it do something, well, React-y. But you can edit this, add more components and make it into a fully-fledged React SPA or web app -- sky's the limit!

Either way, hopefully you can get a feel for the power of Parcel JS and the flexibility it offers when it comes to finding alternatives to more complex beasts, such as Create React App or Webpack.
