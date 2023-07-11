---
templateKey: blog-post
title: Why is CSS-in-JS a bad (or good) idea?
featuredimage: /img/greg-rakozy-129733-unsplash.jpg
featured: false
date: 2018-12-19T14:08:05.726Z
description: >-
  CSS-in-JS is demonised and heralded on social media, but is CSS-in-JS really
  all that bad? Or is it the digital devil? Read why I think everyone's wrong
tags:
  - JavaScript
  - CSS
  - Development
  - Controversial
---
![Lovely web development books on a shelf](/img/greg-rakozy-129733-unsplash.jpg "All you need to build a website")

One of the latest developer debates to have cropped up recently on twitter is whether or not CSS-in-JS is a good idea or not (or, as an alternative view, _why everyone who does not look at things the same way as you is obviously wrong!_)

There are many, many back and forth's to be found on the subject, some for, some against, some missing the point. Even prolific Twitterers and thought-leaders such as [Snook]("https://snook.ca/") got involved:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">You missed my point. JS as a language is not inherently more maintainable than CSS. That’s it. Writing CSS in JS does not inherently make it more maintainable. Your anecdote supports what I’m saying.</p>&mdash; Snook (@snookca) <a href="https://twitter.com/snookca/status/1074287183832457216?ref_src=twsrc%5Etfw">December 16, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">“- nothing prevents progressive enhancement with CSS-in-JS” Oh no? What about when JS fails, no styling. Because CSS is now dependent on JS. PE is all about preventing that from happening.</p>&mdash; Hans Grimm (@grimmweb) <a href="https://twitter.com/grimmweb/status/1074960572985282560?ref_src=twsrc%5Etfw">December 18, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Every developer loves CSS-in-JS, but not your browser. Browser doesn&#39;t like it.<br>CSS-in-JS is fast, but as more you use it - the more performance is affected.<br><br>PS: This is styled-components v3, v4 works a bit better, but still has a cost. <a href="https://t.co/jWIhTKaXUD">pic.twitter.com/jWIhTKaXUD</a></p>&mdash; Anton Korzunov (@theKashey) <a href="https://twitter.com/theKashey/status/1074947149891174402?ref_src=twsrc%5Etfw">December 18, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

> Oh and CSS files have \*waaaay\* better tooling than anything CSS-in-JS has to offer. Y'all keep talking about static analysis in JS but CSS linters and shit are where it's at
> — Jamie-Presenting Nipples 🏳️‍🌈 (@jamiebuilds) [December 14, 2018]("https://twitter.com/jamiebuilds/status/1073511705781522432?ref_src=twsrc%5Etfw")

Personally, I like the snarky ones like this :p

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Hey y’all. In an effort to avoid controversy, I won’t be using css-in-js for my new site.<br><br>As matter of fact, I’m going to avoid css and js altogether.<br><br>Going a non-controversial route and sticking with nested tables and transparent gifs to achieve that pixel perfect layout.</p>&mdash; David Brunelle (@davidbrunelle) <a href="https://twitter.com/davidbrunelle/status/1073781429509619712?ref_src=twsrc%5Etfw">December 15, 2018</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

Ultimately, the problem is, people end up getting a little personal and going off track, attacking other people's stack, methodologies, processes, habits, development style, etc. and end up missing the point. It's unhelpful and pointless at best and damages the developer community at worst.

For me, with CSS-in-JS (and a lot of these sorts of development-related arguments) there are two vital things everyone forgets about:

1. The end user
2. Individual/team development ecosystems

So let's address them.

### The end user doesn't care about CSS-in-JS

Let's get this out of the way: generally, the end user doesn't care about the underlying 'magic' that makes the thing do the thing. End users, consumers, care about things like:

* Being able to achieve a desired goal (search for a thing, buy a thing, do a thing, etc.) **AKA functionality**
* Doing it quickly and efficiently, with as little friction as possible, **AKA performance**
* Catering for their needs, **AKA accessibility, UX**

They don't know about CSS-in-JSS, care about CSS-in-JS or any of that witchcraft that makes their app or website work.

Yes, they care about the outcome that is supported and enabled by the underpinning technology, but you have to ask yourself, if you're building something for users, then some of your decision-making should be based around their needs, drivers, goals and so on.

**If your development practices use CSS-in-JS and that enables you to make a better, more robust end product then great! It probably won't matter to the target audience.**

### Development ecosystems

You, the developer or maybe your development team or company. It cares very much about what technologies are used and in what way, but again, as developers we care about some larger more abstract things than whether or not we should stuff CSS into our JavaScript:

* Avoiding legacy code bases (especially sizable ones), where we've fallen too far behind from the current standards
* Reducing and avoiding technical debt - similar to the legacy argument
* Creating and fostering a code base that is easy to maintain and expand upon
* Agreeing and adhering to a set of standards and habits that support the maintainable code base
* Testing all the things! Making a robust development environment that is easily tested.

If your team agrees that moving to a system of putting CSS into JS then go for it! **If that will help your team create great things quicker, more efficiently, more robustly, and you're all on the same page - ace!**

### When is CSS-in-JS is a bad idea?

There are a few cons to CSS-in-JS that I've seen floating about:

* What happens when the JavaScript fails? Plain, vanilla CSS doesn't need JS to work just fine
* The learning curve - it's CSS, but in a different way
* More dependencies
* Performance hits - some evidence suggests loading CSS in this way negatively impacts performance
* It's not the usual way of doing things...?

Personally, I don't like the idea of CSS-in-JS, but this is driven more by stylistic choices. I like that CSS is a fully-featured thing in its own right and I have always subscribed to the _separation of concerns_ rule. Plus, I have a wealth of experience with CSS from the early days, so I'm comfortable using CSS how the digital gods intended.

I prefer my CSS in a separate CSS or SASS file, but will happily import this into a JS module. I can harness the modular nature of modern development (e.g. React) but keep the physical separation of languages into their respective boxes.

If there is a killer argument for _not_ going for it, however, it would be mixing styles - styles - as in approaches, not the cascading type. For example, if half your app is using regular CSS and then along comes part of your development team and starts using CSS-in-JS then this could lead to an unmaintainable style-rule nightmare that consumes your very existance....or, you know, creates a few maintenance headaches down the line.

### Why is CSS-in-JS a good idea?

There is a [great article about CSS-in-JS from Hackernoon on Medium]("https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc") (albeit almost a year old - told you it was a long-winded and enduring argument!) about the background to and pros and cons of CSS-in-JS.

Some of the pros include:

* Closer alignment with modular, componentised development
* Scoped selectors 
* Improved vendor prefixing
* Code sharing via constants and functions
* Reduced load by only loading on-screen vital styles
* Reducing or eliminating dead code
* Unit tests for CSS...hurrah?

### It's all about choices, and there are few wrong ones

Sometimes there are clearly wrong choices: making toast in the bath, wearing flip-flops in the snow. But when it comes to coding, it really does largely boil down to preference and maintainability.

> **If putting all your CSS eggs into a JS basket makes you more productive, happy, able to develop things better, then go for it.**

If you prefer the old (standard) ways, then that's good too.

### Where do you land on the CSS-in-JS debate?

Dust off those opinions and scattergun them into the comments. Let me know where you stand, what your experience of this henious/miraculous practice lies.
