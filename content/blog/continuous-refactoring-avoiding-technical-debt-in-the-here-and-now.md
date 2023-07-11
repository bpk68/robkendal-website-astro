---
templateKey: blog-post
title: 'Continuous refactoring: avoiding technical debt in the here and now'
featuredimage: /img/rawpixel-783429-unsplash_o-1.jpg
featured: false
date: 2019-02-01T13:26:22.510Z
description: >-
  How do you find time to refactor your code? The answer is simple: continuous
  refactoring. Learn how to reduce your future development technical debt
tags:
  - Thoughts
  - Development
---

![Rubber gloved hands scrubbing a toilet](/img/rawpixel-783429-unsplash_o-1.jpg)

Having just read a fascinating article on [CSS Tricks](https://css-tricks.com/the-slow-and-steady-refactor/) by Robin Rendle, called '[The Slow and Steady Refactor](https://css-tricks.com/the-slow-and-steady-refactor/)', I was compelled to share my own experiences with improving code on the go.

Large, lumbering technical debt and bloated, sluggish, poor-performant code has always been a problem in any development industry. Whether it's code that never quite got tidied up, new stuff that's piled on top of old, or even misunderstood dark arts style code left behind by a past developer, legacy technical debt can cause all sorts of problems.

I'm going to share my recent approach to tackling this monster in the coding cupboard with a concept I dub _continuous refactoring_.

First, however, let's take a look at how we end up with refactoring nightmares...

_(Pssst...you can skip to the [continuous refactoring part](#enter-continuous-refactoring) if you like)_

How did we get like this?
-------------------------

In some ways, the feature image of this post (the fetching toilet being scrubbed) does a good job of representing the tangled mess of wires that large scale development projects often become: they're messy, hard to clean and generally a thankless task that no one wants to take on (well, maybe some of the more sadistic coders out there).

The larger the code base, the more problems you can encounter:

*   They become harder to maintain
*   Optimising and improving is a challenge due to spaghetti code or unknown dependencies
*   It can be difficult to change feature 'x' without impacting widget 'y'
*   Code bases have their own set of bugs without the fear of introducing more by refactoring large parts of the code

It's no one's fault, specifically, how projects end up in this state, yet we all share some of the blame in fostering a culture of 'getting stuff done _quickly,_ now' at the sacrifice of 'how to get stuff done _easily_ and _smoothly_, in the future'.

### Productivity trumps maintainability

One of the reasons is that we're increasingly focussed on building bigger, better things in shorter amounts of time. Over my career, I've seen increasing emphasis and pressure placed on dev teams to 'get product x released', to 'beat the competition to it' and practices like Agile feed into this mindset, enabling the mentality of 'always be shipping/releasing'.

I'm not suggesting that there is anything inherently _bad_ with this, of course, and approaches like Agile, continuous build and deployment, and so on have enabled us to build better things in a shorter timeframe, which can **only be a great thing**!

But (there's always a but...) in an effort to get things deployed more quickly, it is all too easy to not find the time to refactor our work, to revisit and improve, to smooth out the rough - all to easy to otherwise put it off until some mythical time in the future, and so it becomes a towering beast in the background.

### Shiny and new trumps well-planned and robust

Sure, technology pulls at the edges at a frightening pace, but we shouldn't allow ourselves to be so obsessed with 'using the latest thing' or 'building the new Facebook' that we sacrifice well-maintained and easy-to-scale software.

Many a time, it's all to easy to be lured into what everyone else is using, without really understanding the _why,_ hacking things together whilst still learning about the tools or libraries we're using to do the hacking.

Again, there's nothing wrong with keeping up-to-date, but diving in head-first without thinking it out results in the newer stuff - hopefully full of best practices and learned knowledge as we master what we're using - being dumped onto old, leading to a code swamp that will (likely) never be addressed.

### Bickering about what the other guys are doing

There are a lot of arguments on Twitter at the moment in the development world around topics such as [CSS-in-JS](https://robkendal.co.uk/everthing-wrong-with-css-in-js/) or how we're all doing HTML wrong. The irony is that rarely is any one side right or wrong, they just prefer a different approach.

There's nothing horrendously bad about [CSS-in-JS](https://robkendal.co.uk/everthing-wrong-with-css-in-js/), for example (even though I hate the idea...\*shudders\*), but these debates tend to create a divide in how people tackle a common goal (in this case, including CSS into their final output).

The upshot this can be a team mixing-and-matching coding conventions which makes refactoring difficult. It can also slow down on-boarding of new team members as they struggle to get to grips with different areas of the same app, developed in a different way.

Besides, getting caught up in arguments about CSS-in-JS, or why framework 'ThingyJS' is better than library 'McGuffin.io' rather than '**which will work best for us to produce, robust, well-structured, maintainable, code that we can improve, scale and release quickly**', means you're asking the wrong questions.

<a name="enter-continuous-refactoring"></a>Enter continuous refactoring
----------------------------

So how can we tackle and reduce the burden of bloat and technical debt and make time to refactor? Simple, _continuous refactoring_.

It really can be as simple as it sounds:

> by slowing our pace a little and weaving in time to refactor our code _as we code it_, we help our future selves (and future team) benefit from a more streamlined code base.

There's a little more to it if you want to dig deeper of course. Here are some of the best approaches I've experienced over the years and the habits I try to foster now to ensure that code is as tip top as it can be:

*   Reduce the need for massive refactors with planning
*   Commit small, commit often
*   Refactor as you go
*   Ask your team for help
*   Get refactoring conventions in place
*   Don't use third parties because 'it's easy'
*   Document document document

### Reduce the need for massive refactors with planning

It starts _before_ you touch an IDE...

As [Robin alludes to in his article](https://css-tricks.com/the-slow-and-steady-refactor/), by slowing down and planning out _how_ we approach creating a code base before we dive in, setting standards, conventions and guidelines on how to address and reduce code clutter, and streamline things _now,_ we can side-step some headaches later on.

OK, it's not really refactoring, but by having a plan (a pre-emptive refactor, if you will) in place _before_ you start, the need to refactor at all can be reduced.

### Commit small, commit often

Again, with a big nod to Robin's article, his use of Git versioning involves making more frequent, yet smaller commits to repositories. This is a great approach for several reasons including:

*   Documenting decision making as you go
*   Making it easy to roll back smaller changes, rather than having a huge commit with many files

### Refactor as you go

There is usually a way, however small, to improve what you've written. It might be that you can reduce a function from 15 lines to 10 (whilst maintaining readability) or break a long function into a handful of smaller ones.

However you choose to refactor, rework or improve your code, you should aim to do it _as you're writing it_, or, at the very least, before you commit it. Often, development teams put off refactoring altogether in the hopes that they'll get some down time to work through that list of todo's or thin out that pesky account controller they've been meaning to work on for ages.

In reality, this time never comes. Refactoring doesn't often add value to a product so it's usually pushed to the bottom of the priority list. Therefore it's up to you as a diligent developer to make improvements and cut the cruft now, in the moment, before it's a problem down the line.

> Refactoring rarely helps a product's value in the short-term, but it always helps a team's productivity (and sanity) in the long-term

**Don't be tempted to put off refactoring work unless you absolutely have to!**

### Ask your team for help, make everyone accountable

Code reviews should be a vital part of the development lifecycle. They don't have to be a big formal thing either. For instance, at Bytemark, we use merge requests as an opportunity to review each other's work and get another perspective on things.

They're a great way to make improvements before committing to the code base because they're an easy way to get feedback and hold everyone accountable (in an objective way) to high standards.

They can highlight:

*   Ways to improve what you're written
*   Issues you may have overlooked
*   Others' experience to help rework something
*   Where you can trim duplicate work (e.g. something like that already exists to solve 'xyz').

### Get refactoring conventions in place

This might be more of a planning thing, but there's never a bad time to step back, analyse what you're doing and get some agreements on how the whole team should be tackling things.

When it comes to refactoring, having some documented, agreed-upon habits and conventions will help everyone in the team to recognise where, when and how they can be refactoring for the better.

Some of those conventions might include:

*   How large files should be (e.g. 300 line JS files are too long)
*   When should a class be broken down into separate modules?
*   At what point do we use a functional, stateless component over a regular React component class?
*   Striving to use [arrow functions](https://robkendal.co.uk/arrow-functions-in-javascript/) over regular 'function()' declarations
*   How to nest BEM classes in SASS

Tools like linters for CSS and JS can help enforce some of these agreed conventions to a degree.

### Don't use third parties because 'it's easy'

We've all seen the comics and memes about npm packages, right? That one where you load a 20kb app with 2gb of npm dependencies? Well, the exaggeration is not entirely misplaced, npm packages can quickly bloat an otherwise simple project.

But it's not a problem inherent to the npm machine, you see this sort of thing all over the place: WordPress developers are quick to grab at the plugin store for something that might be quick and easy to do themselves (we've all been there!); jQuery projects can find more and more plugins, which can be replaced by newer browser capabilities.

I get it; sometimes, you don't have time. You're not alone in wanting to get something done quickly with as little friction as possible and there are many great reasons to use external plugins, packages and libraries - a robust, tested suite, for example, that does what you need it to.

But we have to **think carefully before chucking another dependency on what is ultimately _our own heaps!_**

When considering adding a third party dependency into the mix, ask yourself a few questions:

*   How much extra time will this save above creating it the same feature in-house?
*   What additional weight will it add to the project? Is that worth the trade-off?
*   Is the third-party package generally well-maintained and regular improved/added to?
*   Will it introduce any errors or problems in any other areas of the site/app/etc. - e.g. conflicts?

### Document document document

A fairly obvious addition to the list, but document all the things! It's never not useful to have a lovely explanation of an otherwise mysterious or complex section of an app, find out what it does, why and how.

Whilst not strictly a refactoring measure, the aim of refactoring is to make our development lives easier down the line and to aid in creating new and maintaining old. With that in mind, good documentation can only help us.

How do you keep things neat, tidy and smooth as butter?
-------------------------------------------------------

So that's _continuous refactoring_. What are your thoughts? Do you have any ideas, practices you've seen work well? Share them in the comments. Let's all try to be better developers by slaying the beast of technical debt.
