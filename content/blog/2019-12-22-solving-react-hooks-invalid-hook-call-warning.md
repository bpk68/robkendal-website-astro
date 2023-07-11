---
templateKey: blog-post
title: Solving React Hooks' invalid hook call warning
date: 2019-12-22T09:28:23.344+00:00
featured: false
featuredimage: "/img/fixing-invalid-hooks-warning-blog-header.png"
description: 'Building a React project and have the error ''Hooks can only be called
  inside the body of a function component''? We''ll solve the ''invalid hook call
  warning'' error and get your project back on track.

'
tags:
- JavaScript
- Development
- Tutorials
- React
- Debugging

---

![Blog header for article on invalid hook call warning](/img/fixing-invalid-hooks-warning-blog-header.png)

Recently, I decided to build a [React-based visual query builder](https://github.com/bpk68/react-visual-query-builder) as none of the existing ones out in the wild were doing what I wanted. Awesome: who doesn't love the chance to get their chops around a meaty sort-of-side-project, especially when we'd planned to release it to the open source community?!

The project went surprisingly well, smoothly even and the React query builder came together quickly and worked great. We had it all, lots of documentation, we were using Hooks (a new adventure for me) and it was well tested.

However, during testing I was slapped in the face by the rather rude Hooks warning you might be familiar with:

> Hooks can only be called inside the body of a function component.

The problem is, that's _exactly_ where all the uses of Hooks were being called from....hmmm

## So what causes the invalid hook call warning?

The warning can be fairly misleading if, like me, you've followed all the Hooks rules _and_ the tool you're building is working in a local example/demo project — which this was.

Despite the error message being a little misleading, the warning comes with a link to the [really helpful official documentation](https://reactjs.org/warnings/invalid-hook-call-warning.html) from the React team, which, in summary, informs us that there are actually three possible causes of this issue:

_There are three common reasons you might be seeing it:_

1. _You might have mismatching versions of React and React DOM._
2. _You might be breaking the Rules of Hooks._
3. _You might have more than one copy of React in the same app._

I definitely wasn't falling foul of causes two or three, and I thought I had number one covered, but this required a little more digging.

Hugely frustrating times ensued. Monitors were thrown out of the window and I started to question my entire development life.

[![course banner for beginners React course](/img/react-course-cta.png "Beginner's Guide to Real-World React")](https://www.newline.co/courses/beginners-guide-to-real-world-react/ "See the Beginner's Guide to Real-World React")

### Finally finding the answer

After much searching and debugging, the problem seemed to definitely lay with this duplicate versions of React or React DOM issue.

In fact, the answer lay at the end of the helpful React Hooks documentation above. There was a link to an extended [GitHub discussion on the pesky invalid hook call warning error](https://github.com/facebook/react/issues/13991) and plenty of fellow devs with the exact same woes. More importantly, it had lots of different possible solutions to different situations.

For my particular scenario, I'd used my very own [Parcel JS starter project (complete with React)](https://robkendal.co.uk/blog/2019-04-29-using-parcel-bundler-with-react-js/) to build the query builder. I did take note of the 'multiple versions of React' no no from the above list and had used [Parcel's alias feature](https://parceljs.org/module_resolution.html#aliases), as well as making sure to employ the `peerDependencies` config setting in package.json.

    "peerDependencies": {
        "react": ">=16.8.0",
        "react-dom": ">=16.8.0"
      },

Despite all this caution, Parcel was still **bundling React and React DOM into the production build!**

So then, we've found the answer, but how do we solve this issue and make sure there's only _one single version of React overall_??

## How to fix the invalid hook call warning

In a normal setup, you'll have a dependency pushed to some hosting repository, such as NPM, and you'll consume that in some other project that you're working on using the `npm install my-cool-widget` command.

This diagram illustrates the typical setup.

![typical npm dependency diagram illustrating how the consuming project depends on a dependency project](/img/dependency-hooks-example.png)

The problem here, is that, despite all the precautions above, our 'Shiny new thing' widget was bundling React into its final package _as well as_ our existing/consuming project containing React.

Thus, unknowingly, I'd violated the first law of Hooks: **thou shalt not have multiple versions of React in the same project.**

The solution? Stop using Parcel and switch to Webpack (don't worry, I've got a [great Webpack starter project](https://github.com/bpk68/web-template) too, with all the initial nuts and bolts you'll need preconfigured).

(At the time of writing, I'm not convinced that there is a way to use Parcel JS with React in such a way as to create a consumable dependency to push to NPM — prove me wrong comments section!).

[![Follow me on Mastodon @kendalmintcode@indieweb.social](/img/mastodon_cta.png)](https://indieweb.social/@kendalmintcode)

## Fix the invalid hook call warning using Webpack

It's probably less likely that you'll have a Parcel JS specific problem here, but either way, you'll probably find that **your mysterious React invalid hooks error is caused by duplicate React versions**. And, since Webpack is arguably the most popular JS bundler out there, there _is_ a good chance you'll be using that to bundle and package your lovely dependency.

In order to dodge the invalid Hooks error caused by duplicate React version, using Webpack, we'll need to do a few things in the dependency project (i.e. the widget you're building):

### Set React as a peer dependency

First things first, open your `package.json` file and set your versions of React as a peer dependency:

```json
"peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
},
```

This won't solve your issue, but it's necessary to ensure that the consuming project has React (or whatever else you have in here) installed as a dependency.

### Configure Webpack to reference a different version of React

Now for the real meat and potatoes of the solution: we need to configure Webpack to essentially _ignore_ React as part of the production bundle and instead, reference it from the project where this code will ultimately by consumed.

To do that, you'll need to add Webpack's `externals` property to the production settings, like so:

```js
externals: {
  react: "commonjs react",
  "react-dom": "commonjs react-dom",
},
```

Finally, we'll also adjust the type of module system that Webpack outputs in the production build. To do that, we'll add the `libraryTarget` property to the `output` setting in the Webpack config as follows:

```js
output: {
    ...// other settings here
    libraryTarget: 'commonjs2'
},
```

## Ahh all's well that ends well

So that should see you right. It's worth noting that your consuming project will throw all sorts of other, new errors if it _doesn't_ have React available, but once you have that installed, the dependency will look for React and try to import it (using the commonjs `require()` syntax) and all will be well.

## Helpful links

Here's a quick summary of the helpful links used throughout this article:

- [Official React hooks error documentation](https://reactjs.org/warnings/invalid-hook-call-warning.html)
- [The React Query Builder on GitHub](https://github.com/bpk68/react-visual-query-builder)
- [The React Visual Query Builder on NPM](https://www.npmjs.com/package/react-visual-query-builder)
- [The Hooks error discussion on GitHub](https://github.com/facebook/react/issues/13991)
- [My Webpack starter project](https://github.com/bpk68/web-template)
- [My Parcel JS starter project with React](https://github.com/bpk68/parcel-starter-with-react)
