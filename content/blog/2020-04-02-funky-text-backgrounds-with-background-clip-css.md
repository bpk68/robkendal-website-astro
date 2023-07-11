---
templateKey: blog-post
title: Funky text backgrounds with background-clip CSS
date: 2020-04-02T09:01:00.263Z
featured: true
featuredimage: /img/css-background-clip-blog-post.png
description: >-
  Want to spice up your text-effects in CSS? Check out this quick tip on
  creating funky text backgrounds with the CSS background-clip property.
tags:
  - CSS
  - Development
  - Tutorials
  - Tips
---

![Blog header for the article on background-clip CSS property](/img/css-background-clip-blog-post.png)

Once of the best ways to learn new things is to see them in the wild, take an interest and give them a hack about, see what makes them tick. It's [how I got started in development](https://thefrontendpodcast.site/episodes/episode-1/) way back in the old days of MySpace; editing the CSS in your profile and changing things up.

A while back, I came across this funky looking text effect on Apple's website, [in the iPhone HR section](https://web.archive.org/web/20190105152534/https://www.apple.com/uk/iphone-xr/) (it was a little while ago!).

![example of background-clip property used by Apple on their website](/img/apple-bg-effect.png)

Having had a little dig around in the behind the scenes, you might be surprised to learn that it's really quite simple, taking advantage of the CSS 'background-clip' property.

The background-clip is a CSS property that determines whether an element's background is visible/shows underneath the content's border box, padding bounds, or box of the content itself. However, you can also restrict this to just the text, which is how we're going to achieve our final look in this article. You can [read more about background-clip and its uses](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip) in the ever-helpful MDN documentation on background-clip.

Here's a quick, paired back demo on how to achieve this really cool text effect for yourself.

## Implementing the background-clip property on your text

Firstly, fire up your favourite editor and create a new HTML page; I used CodePen and [there's a link to the completed demo](https://codepen.io/robkendal/pen/MWwRmMo) at the bottom of this article.

Here's the simple code we need to get things looking almost like Apple's example:

```html
<div class="container">
  <p>...put whatever text you like in here</p>
</div>
```

For the complete demo, I used the excellent [Samuel L. Ipsum](https://slipsum.com/) generator for mine, you may want something a little more 'safe for work'.

Next, our simple base styles:

```css
html {
  font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.container {
  max-width: 950px;
  font-size: 64px;
  font-weight: 600;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=640&q=80);
}
```

Nothing too special here, just a few base styles on the document to give it a punchy look, like Apple's on the HTML, and for the `.container` class, we're just restricting the width and making the text bold and big.

Oh, and I found this [excellent background texture on Unsplash](https://unsplash.com/photos/8uZPynIu-rQ). It's a textural image created by Paweł Czerwiński.

![Texture image from Unsplash comprising of pinks, purples and light blue swirls](/img/pawel-czerwinski-8uZPynIu-rQ-unsplash.jpg)

Now, without the `background-clip` property, it looks a little weak and unreadable, like this:

![Example of the unfinished text with the background applied](/img/texture-without-clip.png)

So, we need to add in the final property, `background-clip: text` to make the magic happen:

```css
/* The magic */
background-clip: text;
-webkit-background-clip: text;
color: transparent;
```

**Note:** we need the `color: transparent;` part to make the background show through. Without it, all you'll have is white text that, whilst looking classy enough, doesn't achieve our desired effect.

![Example of the finished text background effect using background-clip CSS property](/img/finished-background-clip.png)

### Browser support for background-clip text

Support is pretty good actually with modern browsers happily clipping that text. However, in an unsurprising move, **Internet Explorer does not support this CSS property**. Fortunately, you can just have your text fall back to a solid colour which will work just fine.

## Funky backgrounds for your text, as simple as that

And there we have it. Simple, quick, but such a striking effect that can brighten up some otherwise dull text — just be mindful of what background you choose as it can have an impact on visual impairments and make some text hard to read.

<iframe height="550" style="width: 100%;" scrolling="no" title="Textured Transparent Text Effect - CSS" src="https://codepen.io/robkendal/embed/MWwRmMo?height=550&theme-id=dark&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/robkendal/pen/MWwRmMo'>Textured Transparent Text Effect - CSS</a> by Rob Kendal
  (<a href='https://codepen.io/robkendal'>@robkendal</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Helpful links

Here are some supporting links used in the article:

- Unsplash background image I used for the text effect
- [Background-clip CSS property on MDN web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip)
- Apple's use of this property [on their iPhone HR webpage](https://web.archive.org/web/20190105152534/https://www.apple.com/uk/iphone-xr/) (archived)
- The final [demo on my CodePen](https://codepen.io/robkendal/pen/MWwRmMo)
- [The Front End podcast](https://thefrontendpodcast.site) (because who else is going to shamelessly promote my podcast about all things frontend?)
