---
templateKey: blog-post
title: Saving text to a client-side file using vanilla JS
date: 2020-04-17T14:30:00.263+00:00
featured: true
featuredimage: "/img/saving-to-client-side-files-blog-post.png"
description: Want to save files to the client using JavaScript? Let's look at how
  to save a file client-side using s simple handful of vanilla JavaScript
tags:
- Tutorials
- JavaScript

---
![](/img/saving-to-client-side-files-blog-post.png)

Another one of those 'born of an issue I stumbled across' sort of situations, I came across the need to save some data entered into a form (some configuration details into a textarea to be specific).

Sure, there are lots of means available to save something to the local machine of a user, but they tend to involve either less-than-ideal solutions such as a browser's local storage, a cookie, or even using the [HTML canvas blob](https://html.spec.whatwg.org/multipage/canvas.html).

## The need for simple solutions

There is a great article (if not a little out of date by now) by Eli Grey on [saving generated files on the client side](https://eligrey.com/blog/saving-generated-files-on-the-client-side/) that also discusses his excellent utility [FileSaver.js](https://github.com/eligrey/FileSaver.js), which utilises the very same canvas blob functions mentioned above.

However, for me, it seemed a little overblown to bring in _another_ utility dependency to perform a really simple task of creating a small text file and stashing it on the client's machine.

## A vanilla JS solution to client-side file saving

So here we are, a really simple way to create and save a file on the client side, from the browser, based on some information saved into a textarea.

First, the HTML...

```markup
<fieldset>
  <legend>Enter some config details</legend>
  <textarea></textarea>
  <button id="btnSave">save config</button>
</fieldset>
```

Which renders the following no-frills elements in the browser (styling not shown for simplicity):

![Screenshot of the textarea and save button ready to save the file](/img/config-file-save.jpg)

Now, for the JavaScript:

```javascript
const downloadToFile = (content, filename, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  
  a.href= URL.createObjectURL(file);
  a.download = filename;
  a.click();

	URL.revokeObjectURL(a.href);
};

document.querySelector('#btnSave').addEventListener('click', () => {
  const textArea = document.querySelector('textarea');
  
  downloadToFile(textArea.value, 'my-new-file.txt', 'text/plain');
});
```

What we've got going on here, is a plain, browser-native querySelector call that grabs our button with the id `btnSave`, attaches an event listener that fires on click — nothing too fancy here.

Where the magic (well, really simple magic) is in the 'downloadToFile' method above. We create a new anchor element and a new [Blob object](https://developer.mozilla.org/en-US/docs/Web/API/Blob) using the content and contentType arguments we passed in.

Next, we set the `href` element to the result of the `URL.createObjectURL()` method that creates a DOMString containing a URL that represents the file object we just made.

Finally, we trigger our new anchor element's click event, which kicks off the download process in the browser, before cleaning things up using the `URL.revokeObjectURL()` method.

## See it in action

You can [view the code in action](https://codepen.io/robkendal/pen/dyYMqMP) in my CodePen, or below in a handy iFrame.

<iframe height="650" style="width: 100%;" scrolling="no" title="Saving files with JavaScript" src="https://codepen.io/robkendal/embed/dyYMqMP?height=265&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
See the Pen <a href='https://codepen.io/robkendal/pen/dyYMqMP'>Saving files with JavaScript</a> by Rob Kendal
(<a href='https://codepen.io/robkendal'>@robkendal</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Wrapping things up

And that's it. Nice and simple, gets the job done. Sometimes, the most straightforward solution is the best one if you need something lightweight that just works.

You might also like these articles that use plain old JS and CSS:

* [Funky text backgrounds with background-clip CSS](https://robkendal.co.uk/blog/2020-04-02-funky-text-backgrounds-with-background-clip-css/)
* [Creating unique, merged arrays using JavaScript's Set (and more)](https://robkendal.co.uk/blog/2020-02-04-creating-unique-merged-arrays-using-javascripts-set-and-more/)
* [Configure Parcel JS and Babel to use JavaScript proposal class properties](https://robkendal.co.uk/blog/2019-05-13-configure-parcel-js-and-babel-to-use-javascript-proposal-class-properties/)
* [How to use arrow functions in JavaScript ES6](https://robkendal.co.uk/blog/how-to-use-arrow-functions-in-javascript-es6/)