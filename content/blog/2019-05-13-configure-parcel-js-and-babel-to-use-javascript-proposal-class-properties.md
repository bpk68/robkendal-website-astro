---
templateKey: blog-post
title: Configure Parcel JS and Babel to use JavaScript proposal class properties
date: 2019-05-13T06:45:24.216Z
featured: false
featuredimage: /img/using-proposal-class-properties-blog-post.png
description: >-
  Want to use Parcel JS with frameworks like React but keep using shiny new
  JavaScript things like the proposed new class properties? Well read on my
  coding adventurer as we're going to learn to configure Babel and Parcel to do
  just that.
tags:
  - JavaScript
  - Development
  - Tutorials
---
![Article hero image including title Babel and Parcel using proposal class properties](/img/using-proposal-class-properties-blog-post.png)

Continuing on from the recent posts on [using Parcel as a Webpack alternative](https://robkendal.co.uk/blog/2019-04-26-using-parcel-bundler-as-a-webpack-alternative/) and [using React with Parcel JS](https://robkendal.co.uk/blog/2019-04-29-using-parcel-bundler-with-react-js/), I've been thinking a lot about using modern JavaScript development approaches. One such approach is using the [shiny new class properties proposal](https://tc39.github.io/proposal-class-public-fields/), specifically the public fields declaration part.

Using the new proposal class properties syntax is almost second nature if you've been using React lately, especially via the super useful [Create React App](https://facebook.github.io/create-react-app/) which has them installed and turned on by default.

## The beauty of class properties

There are a lot of good reasons to start using these new class properties and the new initialiser syntax, but the main two are to simplify class properties (methods and fields) and the binding of `this`

As an example, this is currently how you could create a JS class:

```javascript
class MyClass {
    someFunction() {
        console.log(this.bigNumber);
    }
    
    constructor() {
        this.someFunction = this.someFunction.bind(this); // bind our method to 'this'
    	this.bigNumber = 123456789; // a property
    }
}
```

Not a fancy class, not particularly hard on the eyes or difficult to read. However, imagine that you've got a ton of methods and properties like this. The class soon becomes difficult to read with lots of clunky `this` binding in the constructor.

However, by switching it up with the new declaration syntax, you get this:

```javascript
class MyClass {
    bigNumber = 123456789;

    someFunction = () => {
        console.log(this.bigNumber);
    }

    constructor() {
	// other constructor stuff
    }
}
```

There's not much in it at this point, but the class is now much more self-documenting and, in this example alone, we've removed the need for the constructor altogether.

## Let's start using the proposal class properties now!

If you've discovered the previous article on [using Parcel bundler as a Webpack alternative](https://robkendal.co.uk/blog/2019-04-26-using-parcel-bundler-as-a-webpack-alternative/), then we're almost there in terms of setup for this to work. You can [fork the codebase here and implement your own solution](https://codesandbox.io/embed/8z4vzk10p8) using the Babel plugin we'll get to in a moment.

Because the new class properties are in the proposal stage, we need a bit of help from Babel JS magic to start using them now. 

If you [head over to the official Babel JS plugin page](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) you can read all about it. With that in mind, let's get a new project going.

### The initial set up

I've created a [fully-working solution using Parcel and the Babel plugin-proposal-class-properties plugin on CodeSandbox](https://codesandbox.io/embed/zqjr30zznm). 

It's a simple project that involves 3 files of interest:

1. `index.js` the main project file that kicks everything off
2. `listmaker.js` that is our JS class with the new class properties being used
3. `.babelrc` the Babel JS config file that enables Babel core functionality as well as configures the class properties transform function

**Note:** _we're using [CodeSandbox.io](https://codesandbox.io)'s vanilla template which includes Parcel by default. You may need to add your own Babel Core dependencies if you're setting things up from scratch on your local machine._

If we run the project, we encounter this rather egregious error:

![Syntax error showing because Babel JS is not configured correctly](/img/screenshot_2019-05-10-codesandbox.png)

Urgh...

First, we'll need to install the Babel plugin _[@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)_, let's do that now:

```bash
yarn add @babel/plugin-proposal-class-properties --dev
```

Next, we'll need to add a .babelrc file (if you haven't one already) in the project root and add the following to it:

```json
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-runtime",
    "@babel/plugin-proposal-class-properties"
  ]
}
```

The line with the '@babel/plugin-proposal-class-properties' part is the key here, it's where we enable the Babel plugin.

### Working through the files

Starting with `index.js`:

```javascript
import "./styles.css";
import ListMaker from "./listmaker";

// let's make some silly lists
const myLists = {
  vegetables: ["cucumber", "turnip", "potato", "carrot", "spinach"],
  dogsNames: ["Rover", "Bosley", "Finn", "Digby", "Doggy McDogface"]
};

// instantiate our ListMaker class
const listMaker = new ListMaker(myLists);

// kick off the list html generation
listMaker.generateLists();

// output the html to the browser
document.getElementById("app").innerHTML = `
<h1>Let's make lists!</h1>
<div>
  ${listMaker.listsOutput}
</div>`;
```

Nothing too scary or unfamiliar here. We import our class listmaker.js create a list object that holds some arrays, before instantiating the List Maker class and generating our lists. We add the lists' output into the final HTML on the page using the JavaScript string notation syntax.

Next, inside listmaker.js:

```javascript
class ListMaker {
  listHtml = "<div><ul>{0}</ul></div>";
  listItemHtml = "<li>{0}</li>";
  lists = {};
  listsOutput = "";
  
  constructor(listsObj = {}) {
    this.lists = listsObj;
  }
  
  makeList = list => {
    let listItemsOutput = "";

    list.forEach(
      listItem =>
        (listItemsOutput += this.listItemHtml.replace("{0}", listItem))
    );

    return this.listHtml.replace("{0}", listItemsOutput);
  };

  generateLists = () => {
    // loop through our list arrays from our initial lists object
    // passed in via props
    Object.entries(this.lists).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        this.listsOutput += this.makeList(value);
      }
    });
  };
}

export default ListMaker;
```

Right away, at the top of the class, we're defining a few class variables such as the output HTML and  default lists object.

When the constructor is called, we're updating one of the class variables using the supplied list object.

Back in `index.js` we call our instantiated List Maker class' `generateLists()` function which is where we use another nice JS feature, the `Object.entries()` method. Within here we loop through the objects within the class `lists` properties, grabbing each object's array of strings, before stuffing their string values into the final HTML string that will be returned to the function caller.

As you can see, the output with Babel proposal class properties transform enabled looks like this:

![Final list output from out listmaker.js class. It shows two lists built from our arrays](/img/screenshot_2019-05-10-codesandbox-1-.png)

And there you have it! Nothing fancy on the back, nothing fancy on the front, but it illustrates how simple and self-documenting your classes can become.

## Rummaging in the final project

If you'd like to take a look at the finished project for reference, you can [jump to the project over on my CodeSandbox account](https://codesandbox.io/embed/zqjr30zznm).

I've also included it here:

<iframe src="https://codesandbox.io/embed/zqjr30zznm?fontsize=14" title="Parcel example with class transform from blog" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
