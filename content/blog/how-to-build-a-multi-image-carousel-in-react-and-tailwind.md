---
date: 2022-03-10T09:13:41
published: true
title: How to build a multi-image carousel in React and Tailwind
description:
  Ever wanted to learn how to build a multi-item carousel in React? Well,
  in this article we'll do just that by building a multi-item or multi-image carousel
  in vanilla React using Vite.js and some Tailwind CSS
featuredimage: '/img/react-multi-item-carousel-blog-header.png'
featured: true
tags:
  - Tutorial
  - Development
  - React
---

![Blog header image for React multi-image carousel](/img/react-multi-item-carousel-blog-header.png 'Blog header image for React multi-image carousel')

I had a client project recently that required some nifty coding to produce **a multi-item carousel in React**. Really, it was a **multi-image carousel** with a few extra bits, but as we'll soon see, what we'll build in this article can be easily modified to suit whatever multi-items you'd like to stuff into your carousel.

Let's get building.

## What we'll be building

To be honest, it's difficult to find a solid definition of what exactly a 'multi-item carousel' or 'multi-image carousel' is, let alone finding a good example of one built in React. Sometimes it seems the terms 'carousel', 'slider', and others get all interchanged and mingled around to the point where it can be confusing...

My definition or requirements looked like this:

> I wanted to create a fixed-width container that housed several child items (mainly images with overlays for my purposes) arranged horizontally with an equal gap between them. Any child items that overflowed the container's bounds would be hidden offscreen, yet scrollable to bring them into view along the horizontal axis.

See the following image to illustrate what I mean:

![Example of how a multi-item carousel can work](/img/muti-item-carousel-example.png 'Example of how a multi-item carousel can work')

There are some existing packages in the wild, such as this one [react multi carousel](https://www.npmjs.com/package/react-multi-carousel), which is worth a look, but often they're too complex, or just not what we need.

What we're building here is a simple, minimal (as possible), example that fits the definition above, and to my mind embodies the wider definition of a multi-item carousel built in React.

You can view the finished multi-item carousel here [https://codesandbox.io/s/react-multi-item-carousel-uvmchp](https://codesandbox.io/s/react-multi-item-carousel-uvmchp 'Codesandbox link to React multi-item carousel demo').

Also, there's a repo with the code in here, [react-carousel on GitHub](https://github.com/bpk68/react-carousel).

### Tools used

For this React multi-item carousel, I've chosen to build it using the [really popular Vite.js](https://vitejs.dev/ 'Vite JavaScript bundler') and [Tailwind CSS](https://tailwindcss.com/ 'Utility-first CSS framework Tailwind CSS'). Tailwind just allows for rapid building of websites and apps by removing all the fluff of starting with a blank CSS slate and gives us the utility-based CSS building blocks to quickly put things like this together.

Vite is just used to bundle and build our JavaScript so React works, but you can use whatever you like. Same with Tailwind -- use any CSS you like, but obviously you'll have to code the matching styles that Tailwind gives us into your version.

The key point in the demo is the `carousel.jsx` component that we'll see in a minute.

## Building the multi-image carousel in React

Enough preamble; let's build our multi-image carousel in React and Tailwind, starting with the scaffolding parts.

The exact set-up with Vite and Tailwind is outside the scope of this article, so I'm assuming you have some sort of React project set up and ready to go that also has Tailwind installed and configured.

### Carousel data

In the finished demo you'll see that each carousel item looks like this:

```jsx
<div key={index} className="...">
  <a
    href={resource.link}
    className="..."
    style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
  >
    <img src={resource.imageUrl || ''} alt={resource.title} className="..." />
  </a>
  <a href={resource.link} className="...">
    <h3 className="...">{resource.title}</h3>
  </a>
</div>
```

And that's it. That's a single carousel item. I've omitted the Tailwind classes from this to keep it a little cleaner, but you can see that this could be whatever you like to show in the carousel, I've just gone with images inside a clickable link, then a heading level 3 that will be displayed on hover.

The main point here is that we're pulling data in to use where we have things like `href={resource.link}` from a file `data.json`, which looks like this:

```json
{
  "resources": [
    {
      "title": "Find me on Mastodon",
      "link": "https://indieweb.social/@kendalmintcode",
      "imageUrl": "https://placeimg.com/300/300/any"
    },
    {
      "title": "Welcome to Ark Labs",
      "link": "https://ark-labs.co.uk",
      "imageUrl": "https://placeimg.com/300/300/animals"
    },
    {
      "title": "Some sort of third title",
      "link": "https://indieweb.social/@kendalmintcode",
      "imageUrl": "https://placeimg.com/300/300/architecture"
    },

    ...other entries

    {
      "title": "Super item number the last",
      "link": "https://indieweb.social/@kendalmintcode",
      "imageUrl": "https://placeimg.com/300/300/tech"
    }
  ]
}
```

You can see we have a title, link URL and image source URL in an array of objects called resources. When this `data.json` file is imported into the carousel component we can loop through each resource item, which will become a single carousel item.

Again, you could bend this to your needs and this data might even come from an API (the real project I use this in does just that), but it'll keep things cleaner inside our carousel component for now.

### Basic styles

The only other thing to highlight from the demo point of view is the starting styles. In the main App component, `app.jsx` we have this:

```jsx
function App() {
  return (
    <div className="2xl:container 2xl:mx-auto 2xl:px-0 py-3 px-10">
      <Carousel />
    </div>
  );
}
```

Really simple and all it's doing is pulling in the carousel component and wrapping it in a div with some basic tailwind classes on it, to fix the width on very large screens and add some nice padding around the carousel for nicer display purposes.

Next, in the `styles.css` file, some basic CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html,
body {
  padding: 0;
  margin: 0;
}

* {
  box-sizing: border-box;
}
```

Up top we have the necessary Tailwind imports, then we just strip off the padding and margin from body and HTML, and set all box-sizing to `border-box`.

Again, these styles aren't super important for your purposes, but I want to be clear up-front about where some minor little display styles are and what they're doing.

## The multi-item carousel component

And now, the part you've been waiting for, the main carousel component itself. In the `carousel.jsx` component you'll see the following imports:

```jsx
import { useState, useRef, useEffect } from 'react';

// Data
import data from './data.json';
```

We've already mentioned the data that we're pulling in from our JSON file, but yours might be coming from your own JSON data, an API, a database, wherever. The key point here is that we're going to be using three hooks from React, `useState`, `useRef` and `useEffect`.

### The carousel JSX

Perhaps counterintuitively we'll start with the output JSX from the component. It looks like this:

```jsx
return (
  <div className="carousel my-12 mx-auto">
    <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
      Our epic carousel
    </h2>
    <div className="relative overflow-hidden">
      <div className="flex justify-between absolute top left w-full h-full">
        <button
          onClick={movePrev}
          className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          disabled={isDisabled('prev')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-20 -ml-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="sr-only">Prev</span>
        </button>
        <button
          onClick={moveNext}
          className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
          disabled={isDisabled('next')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-20 -ml-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
      <div
        ref={carousel}
        className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
      >
        {data.resources.map((resource, index) => {
          return (
            <div
              key={index}
              className="carousel-item text-center relative w-64 h-64 snap-start"
            >
              <a
                href={resource.link}
                className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
              >
                <img
                  src={resource.imageUrl || ''}
                  alt={resource.title}
                  className="w-full aspect-square hidden"
                />
              </a>
              <a
                href={resource.link}
                className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
              >
                <h3 className="text-white py-6 px-3 mx-auto text-xl">
                  {resource.title}
                </h3>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
```

Breaking that down a little, we start with a simple container and heading level 2:

```jsx
<div className="my-12 mx-auto">
  <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
    Our epic carousel
  </h2>
  <div className="relative overflow-hidden">... rest of carousel jsx</div>
</div>
```

Nothing too fancy thus far, we're just adding some vertical margins and displaying it centrally on the screen. With the heading, we're adjusting the size to suit our needs.

The `div` that features the `relative overflow-hidden` classes will house our images or items and the left and right controls. We hide the overflow so we can scroll it into view later, and the `relative` class allows us to absolutely position the scroll buttons.

Next up, we have a block that houses our left and right scroll buttons:

```jsx
<div className="flex justify-between absolute top left w-full h-full">
  <button
    onClick={movePrev}
    className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
    disabled={isDisabled('prev')}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-20 -ml-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    <span className="sr-only">Prev</span>
  </button>
  <button
    onClick={moveNext}
    className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
    disabled={isDisabled('next')}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-12 w-20 -ml-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
    <span className="sr-only">Next</span>
  </button>
</div>
```

One of the downsides to Tailwind is that the class lists get quite verbose and subsequent JSX gets a little longer, but we'll break each part down here.

Starting with the scroll left/right button container:

```jsx
<div className="flex justify-between absolute top left w-full h-full">
  ...buttons
</div>
```

We position the block absolutely, add flexbox to the display type, then push the child items (i.e. left/right buttons) to the far left and right edges using `justify-between`. Finally, we force the container to have full width and height.

Next up, the buttons:

```jsx
<button
  onClick={movePrev}
  className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
  disabled={isDisabled('prev')}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-20 -ml-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
  <span className="sr-only">Prev</span>
</button>
```

I'm just showing the 'prev' button for now as both buttons are the same, just the SVG icon differs between left and right chevron. We're assigning the function `movePrev` to the button's click handler. The other button has a matching `moveNext` click handler and we'll define these click handlers in the logic section coming up.

Both buttons have a `disabled` property that's calculated using the `isDisabled()` function that we'll also cover next in the logic section of the article.

And each button has a butt load of Tailwind classes on it, but they essentially do the following:

- Add base background colours and opacity
- Add hover colors with less opactiy
- Add disabled styles (i.e. when you can't move left or right any further)
- Set the height and width
- Set some base transitions just for nice look and feel when you hover over them

The other thing of note here is that we've included a simple span element with the `sr-only` class so that screen readers can still understand what they're dealing with. If we just have images or SVGs on there it'll be harder for less abled or visually impaired users to understand what the button is and does.

We're using SVG icons from the excellent (and free!) [heroicons](), which is another Tailwind CSS product, but you could use your own icons, no icons, whatever you like here.

And finally, we'll look at the main carousel item loop:

```jsx
<div
  ref={carousel}
  className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
>
  {data.resources.map((resource, index) => {
    return (
      <div
        key={index}
        className="carousel-item text-center relative w-64 h-64 snap-start"
      >
        <a
          href={resource.link}
          className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
          style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
        >
          <img
            src={resource.imageUrl || ''}
            alt={resource.title}
            className="w-full aspect-square hidden"
          />
        </a>
        <a
          href={resource.link}
          className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
        >
          <h3 className="text-white py-6 px-3 mx-auto text-xl">
            {resource.title}
          </h3>
        </a>
      </div>
    );
  })}
</div>
```

With our final JSX, we start with some classes that hide the overflow of any child items, display child items using flexbox, provide a basic gap between carousel items, and then add a bunch of scroll snap styles using [Tailwind's handy scroll-snap](https://tailwindcss.com/docs/scroll-snap-type) facilities.

The scroll snap stuff isn't 100% necessary but it's recommended as it adds a nice little feel to how each item _snaps_ into place when scrolled left to right, and helps prevent the scroll ending up weird half-way place between image items.

Next up we have a classic React pattern of looping through some sort of array with the `.map()` function and spitting out some repeated JSX for each iteration.

For each resource item we produce the following JSX:

```jsx
<div
  key={index}
  className="carousel-item text-center relative w-64 h-64 snap-start"
>
  <a
    href={resource.link}
    className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
    style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
  >
    <img
      src={resource.imageUrl || ''}
      alt={resource.title}
      className="w-full aspect-square hidden"
    />
  </a>
  <a
    href={resource.link}
    className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
  >
    <h3 className="text-white py-6 px-3 mx-auto text-xl">{resource.title}</h3>
  </a>
</div>
```

This is what we saw in the early part of the article but with the Tailwind classes back in. What's happening here is that we have two blocks for each resource item.

The first block has a forced square width and height as well as centring any text. Inside of this, we have a link and an image. We're using an image-hiding pattern here that aids accessibility whilst giving us a tip-top UI. The image is given a `src` property and an alt tag, but is visually hidden from display. This allows screen readers to _see_ the image but handles situations where the image is a wonky or irregular shape.

We attach the same image URL to the background property of the item and then set background styles via Tailwind to centralise and cover the full height and width of the item with the image.

The second block is another link that contains a heading level 3 element with the resource's title. Like its image block friend, it's given a full height and width, but 0% opacity so it's effectively 'hidden' from view (hiding in plain sight 😆).

When hovered on it's given a full opacity with a translucent background colour and contrasting white text. It's also positioned absolutely so we can display it on top of the image; the z-index value of 10 really helps here too.

This combination pattern of having some sort of image with some sort of hovered content appearing is very common. Although it's worth bearing in mind that **for mobile purposes you'd likely want an alternative approach** as the hover stuff won't work.

### The carousel logic

Now for the fun part: making the carousel be more, well, carouselly...

Let's start with the component definition and initial variables:

```jsx
const Carousel = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);
```

We define the component and then set up some variables:

- `maxScrollWidth` - we're going to store the carousel's total scrollable width in this variable once we finish rendering the component. We're using the `useRef` Hook from React here because it allows us to create a fixed or static value that won't change between renders. Important because the component is likely to rerender by clicking the prev/next buttons.
- `currentIndex` - this is a simple state value that will keep track of what 'page' we're on. It'll help us later on to determine if we can move forward or backwards.
- `carousel` - we're using the `useRef` Hook again, but this time to create a static reference to the underlying DOM element that is a `div` which houses the carousel contents. We'll need this to help work out when and how to scroll and get values relating to the carousel's width.

With the variables in place, let's look at the scrolling handlers...

```jsx
const movePrev = () => {
  if (currentIndex > 0) {
    setCurrentIndex((prevState) => prevState - 1);
  }
};
```

For moving backwards, the `movePrev` function handles button clicks on the 'prev' button. We check to see if the `currentIndex` value is greater than zero and if it _is_, then we simply update the value in state to one _less_ than the current value.

If we're already at zero then it doesn't make sense to go back anymore so the function short circuits out and doesn't do anything.

```jsx
const moveNext = () => {
  if (
    carousel.current !== null &&
    carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
  ) {
    setCurrentIndex((prevState) => prevState + 1);
  }
};
```

When the 'next' button is clicked it's `moveNext`'s time to shine. We're essentially doing the exact opposite of the `movePrev` function but things are a bit trickier. When moving backwards we just need to know when we hit zero. But when scrolling _forwards_ we don't know how many times we can do that, it's not a hard limit defined by a single number.

Instead, we need to work out if the currently visible slice (i.e. width) of the carousel, times the current _page_, is going to be _less than_ the maximum scrollable width of the carousel's content -- i.e. the carousel's total width, even that which isn't visible.

If it's going to be _more_ than the max-width, it doesn't make sense to allow users to scroll anymore, so we don't do anything.

However, if our conditional statement passes, we do the opposite of `movePrev` and update the `currentIndex` value in state to one higher than its current value.

> On their own, these button click handlers don't physically scroll the carousel contents, but we'll see in a moment how we can watch the value of `currentIndex` using the `useEffect` Hook to make that happen.

Next up, our `isDisabled` helper function:

```jsx
const isDisabled = (direction) => {
  if (direction === 'prev') {
    return currentIndex <= 0;
  }

  if (direction === 'next' && carousel.current !== null) {
    return (
      carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
    );
  }

  return false;
};
```

Whilst the `movePrev` and `moveNext` click handlers will take care of actually triggering a scroll (or not), our users won't get any visual cues that they can or can't actually scroll. That's where our `isDisabled` function comes in.

On each render and rerender of the component, the buttons call out to the `isDisabled` function to see if their `disabled` attribute should be true, or false.

It accepts a `direction` argument and checks that first. You'll see that the conditional statements are very similar to the `movePrev` and `moveNext` ones. If we can't scroll left (previous) anymore, then it'll return _true_ so that the button is disabled. Likewise, if we can't scroll right (next) anymore we'll also return _true_ so the next button is disabled.

Failing all else, we'll just return _false_ so that the buttons aren't disabled should the execution fall past our 'if' statements.

If a button is disabled, then Tailwind's `disabled:` styles will kick in and the user will find it much more obvious as to what they can and can't do.

Onto the part that makes the magic happen, the first `useEffect` Hook:

```jsx
useEffect(() => {
  if (carousel !== null && carousel.current !== null) {
    carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
  }
}, [currentIndex]);
```

It's a deceptively simple little function that powers the scrolling of the carousel. The Hook accepts an array of dependencies that cause the code inside the Hook to fire when any of their values change.

In our case, we've added the `currentIndex` value as a dependency. So, when this value changes, say when we press the next or prev buttons, the code inside will run.

[![](/img/react-course-cta.png)](https://www.newline.co/courses/beginners-guide-to-real-world-react "Learn React with The Beginner's Guide to Real World React")

The first thing that happens is a null check to make sure that we've actually got a reference to the underlying carousel `div` element from our `useRef` Hook.

If we do, then we simply update the carousel's `scrollLeft` value to the carousel's currently visible width multiplied by the current index or page or _slice_ of the content that we want to see.

> As a simplified example of the maths involved here think of it like this...
>
> If we have 10 items in our carousel each being 100 pixels wide, then we have a total scrollable width of 1000 pixels (10 items x 100 px).
>
> However, because of the size of screen, the _visible_ width of the carousel is only 250 pixels (remember, all the overflow is hidden by the CSS). This means we'll only be able to see two and a half items at any one time.
>
> If we start from the initial view, 0 scroll left position, when we click 'next', the current index will be bumped up to '1'.
>
> Now, we need to scroll the visible content `currentIndex` times the currently visible content width (1 x 250 px). Our carousel's new `scrollLeft` value will become 250 px and the carousel's contents will scroll over.

This will cause the contents of the carousel to scroll to the left and because of the smooth scroll and snap classes provided us by Tailwind, this happens nice and smoothly with a satisfying little 'snap' animation. Pretty neat!

There's just one last thing to take care of and that's a `useEffect` that fires on component render:

```jsx
useEffect(() => {
  maxScrollWidth.current = carousel.current
    ? carousel.current.scrollWidth - carousel.current.offsetWidth
    : 0;
}, []);
```

We're passing in an empty array here, so this Hook only fires once, on the first component render. Its sole purpose is to get the carousel element's total scrollable content width _minus_ the currently visible offset width value, and store this value in the `maxScrollWidth` ref value.

This will give us the bounding boxes that allow us to work out how much to scroll, how many times we can scroll before we run out of road, and help make the magic happen.

## The final multi-item carousel component

The full `carousel.jsx` component looks like this:

```jsx
import { useState, useRef, useEffect } from 'react';

// Data
import data from './data.json';

const Carousel = () => {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      );
    }

    return false;
  };

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, []);

  return (
    <div className="carousel my-12 mx-auto">
      <h2 className="text-4xl leading-8 font-semibold mb-12 text-slate-700">
        Our epic carousel
      </h2>
      <div className="relative overflow-hidden">
        <div className="flex justify-between absolute top left w-full h-full">
          <button
            onClick={movePrev}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('prev')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Prev</span>
          </button>
          <button
            onClick={moveNext}
            className="hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300"
            disabled={isDisabled('next')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-20 -ml-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </button>
        </div>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {data.resources.map((resource, index) => {
            return (
              <div
                key={index}
                className="carousel-item text-center relative w-64 h-64 snap-start"
              >
                <a
                  href={resource.link}
                  className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
                  style={{ backgroundImage: `url(${resource.imageUrl || ''})` }}
                >
                  <img
                    src={resource.imageUrl || ''}
                    alt={resource.title}
                    className="w-full aspect-square hidden"
                  />
                </a>
                <a
                  href={resource.link}
                  className="h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-blue-800/75 z-10"
                >
                  <h3 className="text-white py-6 px-3 mx-auto text-xl">
                    {resource.title}
                  </h3>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
```

## Viewing the final demo

Here's the finished carousel code embedded via CodeSandbox and you can [find a link to the sandbox here too](https://codesandbox.io/s/react-multi-item-carousel-uvmchp 'Codesandbox link to React multi-item carousel demo'):

<iframe src="https://codesandbox.io/embed/fragrant-feather-uvmchp?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="react-multi-item-carousel"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
