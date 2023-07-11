---
templateKey: blog-post
title: How to use arrow functions in JavaScript ES6
featuredimage: /img/dlanor-s-703975-unsplash.jpg
featured: false
date: 2019-01-02T10:10:30.008Z
description: >-
  Let's look at arrow functions in the ES6 version of JavaScript. Learn what
  arrow functions are, how to use arrow functions and how they help with this.
tags:
  - Development
  - JavaScript
  - Tutorials
---

![JavaScript on a computer screen](/img/dlanor-s-703975-unsplash.jpg)

I've been learning a lot about [React](https://reactjs.org/) lately, largely from the wonderful [Fullstack React book](https://www.fullstackreact.com/). (Which I'd highly recommed, as well as following the team on their Twitter account, [@fullstackreact](https://twitter.com/fullstackreact)).

One of the exciting parts of this journery is the liberal use of ES6 throughout the book. ES6 language features are a delight to use over and above the standard JavaScript language flavour and add some sound new tools and techniques to the language. However, one of the features I found particularly interesting was _arrow functions._

I realise that I'm a little late to the party on this one as they're hardly a new and unknown feature, but I certainly found them intriguing and was a little confused at the different syntax required to use them. Hopefully, this guide will help me cement my own understanding, as well as help anyone who's looking to get to grips with arrow functions and their uses.

### What are arrow functions?

Arrow functions (as per the [MDN reference guide on arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)) are simply function statements with shorter syntaxes; they offer an alternative to the standard function construct, `function (args) { // code stuff here; }` and their primary advantage is in creating code clarity.

They do offer some more control over `this`, but for now, let's look at their shorter syntax and how they play a part in generating terse, more readable code.

### How do we use them?

Glad you asked! There are three main ways you're likely to construct and use arrow functions so let's get going with some examples.

**NB -** in these examples, we'll imagine we're using an array of ice cream flavours like this:

`const flavours = [chocolate, strawberry, vanilla, cherry, toffee];`

**Multiple-line body with _explicit_ `return`**

If your function spans multiple lines with several statements, you can write an arrow function like this:

```javascript
const flavourLengths = flavors.map((flavour) => {
	const flavourLength = flavour.length;
	const flavourCapitalised = flavour.charAt(0).toUpperCase() + flavour.slice(1);
	return `${flavourCapitalised} is ${flavourLength} letters`; 
});
console.log(flavourLengths);
// prints -> ["Chocolate is 9 letters", "Strawberry is 10 letters", ...etc]
```

Note that here we must include an explicit `return` statement. What's more, if you only have a single parameter, you can also omit the initial brackets like this:

```javascript
const flavourLengths = flavours.map(flavour => {\
  // ...
);
```

**Single-line/-expression body with _implicit_ `return`**

If your function body only contains a single line, you can wrap it in brackets and ignore the `return` statement as it is implied.

```javascript
const flavourLove = flavours.map(flavour => (
	'I love ' + flavour.toUpperCase() + ' ice cream!'
));
console.log(flavourLengths);
// prints -> ["I love CHOCOLATE ice cream", "I love STRAWBERRY ice cream", ...etc]
```


**Single statement which includes `return` (e.g. the super-terse way)**

Even better, if your statement is very short or the only statement is a return, then you can reduce your arrow function into the following:

```javascript
console.log(flavours.map(flavour => flavour.length));
// prints -> [9, 10, 7, 6, 6]
```

### What about _this_?

`this` is a complex and often confusing topic in the land of JavaScript. From the [MDN documentation on arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions):

> Until arrow functions, every new function defined its own `[this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)` value (based on how function was called, a new object in the case of a constructor, undefined in [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) function calls, the base object if the function is called as an \object method\, etc.).

Traditionally declared anonymous functions like to bind `this` to the global object, which can cause problems, both in execution and development.

Arrow functions help by providing a `this` that is taken from the local context. For example, if `this` isn't found in the current scope, it will be taken from the enclosing scope.

To illustrate just how this works, let's look at two examples:

**A traditional function with global `this` scoping**

```javascript
function printLemurName() {
	console.log('nothing here but us globals');
}

const lemurLand = {
	lemurs: ['Dave', 'John', 'Alice', 'Tanya', 'Lemur No. 5'],
	printLemurName: function(lemur) {
		console.log('This lemur is called ' + lemur);
	},
	printAllLemurNames: function() {
		// Right now, `this` is bound to the lemurLand object, great! 
		this.lemurs.forEach(function(lemur) {
			// but here, `this` is bound to the global object...oh dear
			this.printLemurName(lemur);
		});
	},
};

lemurLand.printAllLemurNames();
// 'nothing here but us globals'
// 'nothing here but us globals'
// 'nothing here but us globals'
// 'nothing here but us globals'
// 'nothing here but us globals'
```

**The same example, replaced with an arrow function**

```javascript
//...same preceding code

	printAllLemurNames: function() { 
		this.lemurs.forEach(lemur => {
			// ahh that's better, `this` is correctly set to the lemurLand object
			this.printLemurName(lemur);
		});
	},
};

lemurLand.printAllLemurNames();
// 'This lemur is called Dave'
// ...etc.
// 'This lemur is called Lemur No. 5' 
```

### There's more to arrow functions

This is a quick intro guide into what arrow functions are, what role they play in clean, readable code writing and what problems they can solve with their helpful application of `this`.

However, they do have some other, advanced uses and I would highly recommend reading the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for more examples, use cases and a more indepth technical overview of arrow functions.
