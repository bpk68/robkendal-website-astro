---
templateKey: blog-post
title: What should you know as a frontend developer?
date: 2020-01-07T12:32:00.302Z
featured: false
featuredimage: /img/what-should-you-know-as-a-frontend-developer-blog-post.png
cta: aspire_to_hired
description: >-
  Whether you're a budding frontend developer or have been coding a while, what
  exactly should you know as a frontend developer?
tags:
  - Thoughts
  - Development
---

![What you should know as a frontend developer blog header image](/img/what-should-you-know-as-a-frontend-developer-blog-post.png)

As a [coding coach](https://codingcoach.io/) mentor I get asked a lot of questions about the intricacies of the web and how it works. The other day I was asked to take a look at a web page and explain how it worked, how it loaded and displayed the page.

To be honest, I struggled with some of the deeper technology and processes involved and this got me thinking: just what should you know as a frontend developer and to what level?

I'm going to unload my brain a little and share some of the common skills or areas of knowledge that I feel are useful or essential to have as a budding frontend developer. These are certainly things that I would look for in a potential hire to join my team.

This is a long post, so here are some jump links to help you out:

- [Technology-specific skills](#tech-skills)
- [Core, role-specific skills](#core-skills)
  - [HTML](#html-skills)
  - [CSS](#css-skills)
  - [JavaScript](#javascript-skills)
  - [Accessibility](#accessibility-skills)
  - [Performance optimisation](#performance-skills)
  - [Layouts, UI patterns and UX](#layout-skills)
  - [Debugging and troubleshooting](#debugging-skills)
  - [Unit testing](#testing-skills)
- [Broader skills](#soft-skills)

## Technology-specific skills <a name="tech-skills"></a>

Increasingly, companies are hiring for person-fit and culture alignment these days over hardcore, specific or niche skillsets. A lot of forward-thinking companies prefer people who are adaptable and have a capacity to skill up quickly and play nicely with others.

That said, you're probably going to have an edge if you're applying for a role as a developer in the AWS platform and you have a solid understanding of Amazon's flagship cloud server technologies.

Understandably, this causes a lot of stress for people starting out in frontend development as they're not sure where to focus their attention in learning — there's just so much!

My advice is always to learn what you can, take opportunities when they appear, and focus on what interests you. If you love Kubernetes, learn it! If you're interested in building a backend to your frontend, try Mongo DB. If you fancy React (whilst not strictly a 'technology in itself), go for it!

![headphones, keyboard and mouse laid out on a pink background](/img/workplace-2303851_640.jpg)

No amount of exposure to different technologies, frameworks and platforms will do you harm, but if you have a real ambition to work within, say, the blockchain world, then I would endeavour to learn as much as possible in that direction.

The thing to remember is that technologies change very quickly and tying yourself into one too deeply too early in your career can have its drawbacks. I'd recommend gaining a solid, high-level overview by sourcing some great introduction articles or other media, such as [this great comic book intro to Kubernetes from Google](https://cloud.google.com/kubernetes-engine/kubernetes-comic/).

## Core, role-specific skills <a name="core-skills"></a>

This is where the meat and potatoes of your skills should lay as a frontend developer. Now, should these be hyper niched, specific, or more versatile and broad?

For me, the answer is...it depends.

There's tons of sub topics that you can delve into and specialise in, whether that's one of the fundamental pillars of frontend development (HTML, CSS, JavaScript), or something more overarching, such as performance or security. Of course, it's useful to have at least some understanding of things like security and performance, but there are tons of developers out there who are real specialists in, say, layouts and CSS performance, above their JavaScript skills, for example.

In terms of frontend development, the following list will give you a rounded set of applicable skills to just about any frontend role you do:

### HTML - the structural foundation <a name="html-skills"></a>

The building blocks of any web page, HTML offers to structure our raw data, as well as providing an interface called the [DOM (document object model)](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) to attach events to and which allows scripts to access and update the content.

A good understanding of HTML would include being able to identify the right elements for the right job, semantics of structural layout, what attributes are available (important for accessibility), and at least a little on how the DOM works and what its purpose is.

### CSS - the paint on top <a name="css-skills"></a>

Without looking into preprocessors like SASS, raw CSS is the icing slathered on top of the HTML cake to make our structured content look a certain way and lay out in a particular fashion.

When it comes to CSS it's important to know a few different ways to achieve the same goal. For example, older browsers don't support certain selectors or properties so it's useful to know how to get what you need using a different approach.

It's also helpful to know a little about _how_ and _when_ CSS kicks in and how it interacts with other resources on the page. How JavaScript can block CSS from rendering and the impact that importing certain items, such as fonts, can have on the loading of your page.

In terms of abject knowledge, the cascade part of cascading style sheets is one of the most common tripping points for many a dev. Get familiar with how the cascade works in terms of properties down the line from parent to child, learn how specificity affects your selectors and you'll prevent future headaches.

Additionally, I would study the more tricky concepts; things like flexbox, or CSS grid, which can be quite confusing and produce unexpected layouts when used without a solid base of understanding.

Finally, some common layout gotchas, such as a collapsing parent element when all child elements are floated. **This will help you troubleshoot display bugs and solve them!**

### JavaScript - the behaviour controller <a name="javascript-skills"></a>

JavaScript should look after the _behaviour_ of our pages. It manipulates content and allows us to truly interact with the page beyond the limited controls that HTML (and CSS) gives us.

However, JavaScript is such a huge topic all on its own it's hard to know _what_ to know and what to recommend.

For a start, a good understanding of [OOP](https://en.wikipedia.org/wiki/Object-oriented_programming) and [SOLID](https://en.wikipedia.org/wiki/SOLID) principles are important, not strictly for JavaScript, but programming and development in general. JavaScript is becoming more object-oriented in its approach with the newer versions of the language offering more class-oriented options and strongly typed elements (it's still a very loose, dynamic language, however).

Understanding the quirks of JavaScript, about its [data structures and conventions on 'this'](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures) will also help you avoid common pitfalls later in your development career.

![lines of JavaScript code on a black background](/img/technology-1283624_640.jpg)

If I were starting out, I'd focus on ES6 habits and practices. Learning how the newer language features work, such as [arrow functions](https://robkendal.co.uk/blog/how-to-use-arrow-functions-in-javascript-es6/) and array manipulations, and how to approach your JavaScript development in a component-based, modular way.

Also, take the time to do a little [reading on the CSSOM](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model), the CSS version of the DOM. It's within here that JavaScript interacts with our CSS layer.

Finally, I'd certainly check out the `fetch()` paradigm and all [about how Promises work](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). If you're dealing with anything in modern frontend development, you'll be interacting with an API. Of course, there are libraries that abstract a lot of this away from you, but knowing how these two core JavaScript concepts work will help your understanding of asynchronous code execution.

### Accessibility <a name="accessibility-skills"></a>

An increasingly hot topic, but a vital one to the web ecosystem for so many users who have different accessibility needs. You don't need to be a guru on the in's and out's of making everything accessible but it's certainly advised to be mindful of how to approach your frontend development with inclusion in mind.

In practice this means understanding how different people can access your site/app and working on making it easier to navigate without a keyboard, for example; at the very least it means not undoing a lot of the builtin controls and accessible constructs offered by HTML and the browser by default.

Rather than bolting it on as a separate topic, accessibility is helpful to weave into the initial learning. For example, if you're learning about HTML forms, learn how tab indexing and default HTML buttons help with making a form more accessible.

### Performance optimisation <a name="performance-skills"></a>

Again, there are people who specialise almost exclusively in optimising web app performance. You don't need that level of understanding, but it's helpful to know how to improve.

There are tons of tools out there whether it's directly within an IDE (such as Visual Studio) or in-browser (such as Google Chrome's Lighthouse), that will help you see any obvious blockers or bottlenecks in your code which can then be improved.

Of course, if you follow a refactoring approach like [my own thoughts on continuous refactoring](https://robkendal.co.uk/blog/continuous-refactoring-avoiding-technical-debt-in-the-here-and-now/) then you can save a number of problems before they begin by keeping code as lean and lightweight as possible.

This is also where some deeper knowledge of code execution comes into play. Are you performing too many unnecessary loops in that one JavaScript class? Are you targeting a lot of universal selectors in your CSS (\*) in your stylesheets?

Knowing what options are available during build and post-deployment steps help too. Can you leverage a CDN to serve content and assets? Are you using a rigorous compression and production building of your apps and web sites?

### Layouts, UI design patterns and UX <a name="layout-skills"></a>

OK, these are three big topics here, but I don't think you need to be an expert in any of them as a frontend dev.

That said, you'll be working in the area where your users play, building the interfaces that they use. It's helpful, therefore, to have at least a passible knowledge of some common layout approaches, as well as some popular UI patterns.

UX is a huge area in its own right, but it'll go a long way to bridging any gaps between departments and your users if you can articulate designs and ideas into wireframes, and interpret user feedback into meaningful changes to your code.

### Debugging and troubleshooting (both skills and tools) <a name="debugging-skills"></a>

It doesn't matter whether you're barely on page one of your first development textbook, or you've been a developer for 20 years, **things are going to go wrong and stop working or do something so weird that you'll be scratching your head**.

Being able to debug successfully is about narrowing the issue down into the most localised part of the code possible and correcting it. In my experience this is a combination of a few factors: working backwards from what you _expect to be happening_ and what _actually is_; using a built up knowledge base from experience and 'most likely reasons'; and useful tools, which might be within the IDE, or using browser dev tools; and finally, [Occam's Razor](https://www.britannica.com/topic/Occams-razor).

It can be an intangible skill, but learning how to solve problems is fundamentally what development is all about. When those solutions themselves cause problems, it's imperative to learn how to break down and step through your code to see what's at fault.

_...PS - it's almost always caused by caching or spelling a variable name incorrectly :D_

### Unit testing <a name="testing-skills"></a>

This one's good for the team, but knowing some common concepts around how and what to test and what frameworks are available to help you is important.

Unit tests help by offering an indication that your code does what you intended and that any recent changes haven't altered functionality elsewhere.

Bringing a willingness to unit test to the table, as well as some understanding of how to go about unit testing for your specific codebase, will go a long way.

There aren't too many hard and fast rules with unit testing, but in the frontend world, using a framework such as Jest, we tend to look at user-based outcomes rather than specific execution of code. For example, we might like to check that if a button is clicked (simulated in the unit tests of course), does a particular UI element change or update? As opposed to 'did this particular method in the JavaScript class fire?'.

## Broader, 'soft' skills <a name="soft-skills"></a>

I'll put this out there, I'm not a fan of the term 'soft skills' for many reasons and there's a growing unease across our industry with the term too.

![a male solving a Rubix cube](/img/magic-cube-1976725_640.jpg)

However, until we have a better label for it (comments section help me out!), this does a good job of grouping together the types of skills or areas of knowledge that apply to things outside of being a developer. Those that don't pertain to a particular set of technology or the general tool belt of being a developer. Probably just those that make up good life skills.

These include:

- **Assertiveness**
  Often mistaken for being obtuse or bossy, this is merely being able to state your opinions and ideas in a firm and controlled manner. Being unafraid to ask for what you want and sharing your thoughts with others, good or bad.
- **Communication**
  Quite broad, but being able to get an idea or a point across successfully to others. This could be in writing or via a visual means, such as wireframes or sketches. Vital for anyone who wants to work in such as visual field as frontend development.
- **Positive attitude**
  Having a positive outlook on a situation can make a world of difference. It's not about relentlessly finding even a sliver of good, but it's focusing on the positive where possible and making things work. People like to work with people who aren't afraid to have a go and try something new and those that approach even mundane or less exciting tasks with a can-do attitude.
- **Helpful spirit**
  Similar to being positive, having a kind and helpful approach will pay dividends. Everyone needs help sometimes, even you, so it's just good sense to spread that help around when you can. If a fellow develop is struggling, help them out. If there's a second pair of hands needed, things will move forward sooner if you pitch in.
- **For-the-good-of-the-team spirit**
  No, you don't have to be a drone or mindless company lemming, but the choices you make and the decisions you arrive at should be with the team in mind: will this make everyone's life a little easier, will it help more than just me, etc.? You're all in the same boat with development so it helps to work towards the collective good where possible.
- **Critical thinking**
  Being able to look at a situation or task with an open mind and logical reasoning is invaluable, especially as a developer. That ability to break down a large problem into many cumulative solutions is a big part of our role.
- **Objectiveness**
  If you can take yourself and your feelings out of a situation and look at it from an overhead, third-party point of view, this is helpful to see if the decisions you're making are coming from your own opinions or long-held beliefs. Objectivity helps us to see if there could be a different way to do things.
- **Learning learning learning**
  Life happens, things move on, stuff changes. Especially in the tech industry. If you don't have a love of learning new things (not just for the sake of it) then you'll get left behind quickly. Being able to find joy in a new challenge and enjoying keeping up with the changes in our field is helpful in bringing new ideas to the collective table and solving all sorts of problems.

## How deep is your ~~love~~ knowledge

I have seen interviewers probing the depths of a candidate's knowledge of browsers and the intricate in's and out's of how a web page is physically rendered on a page and sometimes this feels a little unfair or 'trappy'.

I mean, you don't have to know how a car physically converts small explosions in its engine to be able to drive it at a professional level. This is where the 'it depends' comes in: you would probably expect a mechanic to know how an engine works, wouldn't you?

But _again_, to what level? Would you expect that same mechanic to understand exactly how much fuel needs to be injected into each piston at any given moment? Would you expect him to be able to explain the underlying physics behind how brakes work?

Maybe not...

Getting away from the metaphor and back to frontend and browsers, how deep should your knowledge hole go?

For me, I think it's good to have a broad understanding of the major players in the rendering of a web page: the DOM, CSSOM and JavaScript and the distinct parts that each plays. Being able to break down a large problem into smaller ones and solving those in a neat, well-documented and well tested way is much more important to me than knowing, at a binary level, how the browser renders a page.

That said, it's all about levels and experience. If you're a senior dev, you'll likely have more experience with certain things and be able to build on that base knowledge, adding more advanced learning on top in layers.

## What's on your 'things frontend developers should know' list

Let me know if I've missed anything or what your list would look like.
