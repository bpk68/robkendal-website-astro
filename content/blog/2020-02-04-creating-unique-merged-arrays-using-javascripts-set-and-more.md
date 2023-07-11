---
templateKey: blog-post
title: Creating unique, merged arrays using JavaScript's Set (and more)
date: 2020-02-04T15:43:28.124+00:00
featured: true
featuredimage: "/img/merging-arrays-blog-post.png"
description: Merging arrays in JavaScript isn't all that tricky. Getting unique values
  in merged arrays can be. We'll look at some different methods and approaches in
  JavaScript that create unique arrays, including the shiny Set object.
tags:
- JavaScript
- Tutorials
- Development

---
![](/img/merging-arrays-blog-post.png)

Picture the scene: you've got two (or more) similar arrays, each containing some overlapping data. How can you use JavaScript to merge the two into one single array that contains only _unique_ values?

Well, as it turns out, there are quite a few ways...

For all the the sections below, we'll be using the following two array's that have a combination of different and identical numerical values:

```JavaScript
const arr1 = [1,2,3,4,5,6];
const arr2 = [1,3,4,7,8,9];
```

We'll be using the fancy arrow functions all over this article; if you [want to know more about arrow functions, then I have a lovely article on them here](https://robkendal.co.uk/blog/how-to-use-arrow-functions-in-javascript-es6/).

## What about `concat` or fancy spread syntax?

Sure, you can merge two (or more) arrays using the `concat()` method or the [shiny ES6/ES2015 spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

```JavaScript
arr1.concat(arr2)
// OR
[...arr1, ...arr2] // this is functionally the same as concat

// logging to the console, both the above will produce:
// [1, 2, 3, 4, 5, 6, 1, 3, 4, 7, 8, 9]
```

Both these methods are great: they're compact, efficient and do a really simple job in merging two or more arrays. However, they really just append one array to the end of the previous one.

If you really care about having a single array of _unique_ values, then we're going to have to try something else.

## 1, The old fashioned, but reliable `forEach` loop

Ahh, nothing like the comfort of an old friend, the `forEach()` array method. As you can see from the [MDN web docs on forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) it's a simple loop over each of the items in an array. You pass it a function and do what you need to do.

It doesn't return a new array or alter the existing array's data, it just moves along from item to item in the array in question, doing whatever you need to in the callback function.

To use it to combine two arrays into a single, unique output, we can do the following:

```JavaScript
﻿let combinedArr = [];

arr1.forEach(value => {
  if(!arr2.includes(value)) {
    combinedArr.push(value);
  }
});

combinedArr = combinedArr.concat(arr2);

// outputs > [2, 5, 6, 1, 3, 4, 7, 8, 9]
```

This is good. We've got the desired result of one single array, complete with a set of unique values.

For this example, we take the first array, `arr1` and loop through all the values, checking to see if each value is found in `arr2`. If they are unique, then we add them to our final array, `combinedArr`. Once the `forEach` is complete, we append the entire contents of `arr2` onto the end of `combinedArr` because we know that all the values in there will be unique.

On the plus side, `forEach` has a lot more compatibility with older browsers out of the box, without requiring a processor (like Babel) and it's compact enough if you're only looking to do something simple such as the above.

The downsides are is that it can grow to be a less elegant solution — especially for multiple arrays — and it doesn't offer any sort of ordering on the final array; maybe not a big deal, but if it matters for your needs, you might need to move on.

## 2, The shinier `filter` approach

Another array method compatible with older browsers from the ES5/ECMAScript 5 specification, is the handy `filter()`. You can [read more on the MDN docs on the filter method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), but it works in a similar way to `forEach`, looping over each item in the array. However, this time, it performs a callback function that returns a true/false value to either keep an item in the final array, or remove it (i.e. filter it out).

It's also worth noting that whilst it doesn't alter the original array, it does return a new, filtered one.

Here's how the previous example works by replacing the implementation with `filter`:

```JavaScript
﻿arr1.concat(arr2.filter(value => !arr1.includes(value)));

// outputs > [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

We're performing a similar operation to the `forEach` one, but here, we're concatenating a filtered `arr2` onto `arr1`. During the filter, we remove any value from `arr2` that is present in `arr1` using the `includes` method.

The `filter` approach has the advantage of looking much neater with its terse syntax. It will also look a little clearer when repeating this approach for multiple arrays, but that too will start looking a little messy if you're doing a lot.

## 3, Use `reduce` for something different

If you really want to get fancy, you can use `array.reduce()`. Looking at [the MDN docs on reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), they do mention that it can be a more efficient approach than using multiple combinations of methods, such as `filter` and `map`.

For our purposes, however, we'll be using reduce like this:

```JavaScript
﻿let uniqueArr = arr1.concat(arr2).reduce(
  (accumulator, currentValue) => {
      if(!accumulator.includes(currentValue)) {
        accumulator.push(currentValue);
      }
    
      return accumulator;
  }, []
);

// outputs > [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

We have our concatenated starter arrays (`arr1` and `arr2`) and then we run `reduce` on them. Reduce accepts two arguments, a callback function and an initial value. The callback function accepts two arguments.

Here are the arguments we're using and what they do:

* Callback > accumulator - an array that ends up being an accumulation of our callback function's return statement(s).
* Callback > current value - simply the current item in the array at the current position in the loop.
* Reduce > Initial value - we pass in an empty array (`[]`) here so that the reducer will start at position 0 in our target array. If not supplied, it'll start at 1.

The `reduce` method can be a little cumbersome to get to grips with but once you get there, it's a powerful tool to have in your belt when it comes to manipulating arrays and certainly has a really useful place in specific applications. You can [read the MDN docs on reduce for more use cases](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

Although it looks a little more ugly, it can be a very performant and efficient approach. It has the bonus of sorting our outputs too, which is nice.

It also has the super bonus of being able to work on a complete set. So, if you have multiple arrays to mush together, you can concatenate them all _first_ and then run `reduce` on the whole lot: nicer to look at and much more efficient in the long run.

## 4, The super fancy `Set` method

Now, if you're one of the shiny ES6/ECMA2015 types, then you can take advantage of the super fancy `Set` object. One more time, [referencing the MDN docs on Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), `Set` is an object that lets you store primitive types as a collection of values.

It offers a lot of similarities to the Array object, but the biggest advantage is that a Set may only contain _unique_ values! What's more, when creating a new `Set` it helpfully does the work for us by removing any duplicates — sweet!

Let's take a look:

```JavaScript
﻿const mySet = new Set([
  ...arr1,
  ...arr2
]);

// outputs > [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

Now, how clean and simple is that?! Especially when combined with the spread syntax to concatenate our two (or more) array's together.

This offers three huge advantages over the other methods:

1. It offers a much cleaner, terser approach of creating merged arrays of unique values.
2. It scales much better. You can see how we could easily add another handful of arrays into the constructor and the code would look just as neat.
3. `Set` does the hard work for you and removes duplicates.

**The biggest upside is that Set is blazing fast** and is my go-to method of combining arrays that need to be unique.

The downside, of course, is that `Set` is a newer language feature and, as such, isn't supported in older browsers unless you're inclined to use Babel or a polyfill. In addition, you will have to go the extra step and convert the result of a new `Set` into an array or otherwise iterable thing to be able to do more with it.

This isn't a huge burden, however, and can be achieved like this:

```JavaScript
﻿const newArr = Array.from(mySet);
// OR
const newArr = [...mySet];
```

## A note on performance

People like to get hung up on the performance of various JavaScript things. Indead, if you have a quick nosey around Stack Overflow, you'll find a lot of 'um, actually...' types who love to explain why method a is faster or more efficient than method b and breate you for using the 'wrong' one.

With the examples above you can performance test them using the browser debug tools and you'll find that they all come in at around the same, i.e. somewhere in the 1-2ms range. However, this varies wildly because of things like browser operation caching and the sheer minute scale of the arrays we're merging here. Basically, they're too small to really make any sort of meaningful impact on performance times.

However, when it comes to performance, there are lots of arguments around the application of a thing. For example, are you loading a public informational website, or are you offering an application with a captive audience, like an admin console?

Performance is important, no question, but don't be pressured into taking some sort of performance hunting axe to your code just because it'll save a fraction of a millisecond off a loading time.

Consider your application's application, your users, and the clarity and maintainability of your code's ecosystem.

That said...

### Let science do the talking!

Ok, ok, you want hard data. Well, here you go...

To test the performance of each of these methods on some large arrays, and check out the various times involved, I populated our original arrays (`arr1` and `arr2`) with 10,000 integer values each.

After performing each of the listed operations, here are the times involved:

* `forEach` > 102ms
* `filter` > 124ms
* `reduce` > 223ms
* `Set` > 7 ms

Our humble `forEach` is actually super quick compared to the clunkier `reduce` but none are quite as performant as the hero of the piece, `Set`.