---
date: 2022-03-23T09:08:41
published: true
title: How to fix 'Property does not exist on type Window in TypeScript' error
description:
  If you've been asking 'How do I fix the "Property does not exist on type Window in TypeScript" error?'
  then this is the article for you. We'll fix the property does not exist on type Window error
  once and for all.
featuredimage: '/img/property-does-not-exist-on-window-blog-header.png'
featured: true
tags:
  - Tutorial
  - Development
  - TypeScript
---

![Blog header image for how to fix property does not exist on Window article](/img/property-does-not-exist-on-window-blog-header.png 'Blog header image for how to fix property does not exist on Window article')

If you've been doing something with an external library, global variable or anything that involved the native `Window` object in TypeScript, you may have come across this error:

> Property does not exist on type 'Window & typeof globalThis'.ts (123)

It's a pain, but really simple to fix, so let's get to it!

## Discovering the 'Property does not exist on type Window in TypeScript' error

I was recently working on a client site and it involved using the excellent [Cloudinary](https://cloudinary.com) service. They have some equally excellent [embeddable widgets](https://cloudinary.com/documentation/upload_widget) which only require a bit of simple JS to drop in. Here's a snippet of the code:

```javascript
const myWidget = window.cloudinary.createUploadWidget(options, processResults);
// ...rest of the file
```

The problem is, this was a React app in Next.js and a TypeScript codebase at that! The code worked fine, but the classic 'Property does not exist on type Window in TypeScript' error flagged up on the build command and TypeScript complained about it endlessly.

## Identifying the problem

The `Window` type is defined in the `lib.dom` TypeScript module (as per the [following documentation on TSDoc](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.window.html). You can see we have the global `Window` object definition here with a ton of properties.

If you need anything not defined in this list, however, then that's when you'll hit the `Property does not exist on type 'window & typeof globalthis'.ts` style error. Common examples of this are when you add external libraries from Google for their analytics or Tag Manager, or, in my case, Cloudinary.

Cloudinary added it's own `cloudinary` object to the global `window` object provided by the browser, but TypeScript has no idea what it is or what _types_ it has because they're not defined.

This is one of those cases where the error is actually pointing us in the right direction.

[![Follow me on Mastodon @kendalmintcode@indieweb.social](/img/mastodon_cta.png)](https://indieweb.social/@kendalmintcode)

## Fixing the 'Property does not exist on type Window in TypeScript' error

Fortunately for us, the fix is quite simple and involves three steps:

1. Creating an `index.d.ts` file somewhere in our project.
2. Editing the file to define the types on the `Window` object.
3. (optional) adding a reference to the file in the `tsconfig.json` file.

Starting with number 1, you'll need to add the following into your `index.d.ts` file:

```ts
export {};

declare global {
  interface Window {
    somePropertyHere: any;
  }
}
```

> If you don't have such a file, then create a folder in your project root or `src` folder called `types`. In here, add a new file called `index.d.ts` and then add the previous code snippet in there.

If you already have an `index.d.ts` file or a `global.d.ts` (or any other declared project types file) in your project with other type definitions in it, then you may not need the `export {}` line. You can omit that part and add the rest.

You can define whatever other properties you'd like in here as per your project needs, e.g.

```ts
export {};

declare global {
  interface Window {
    cloudinary: any;
    gtag: (...args: any[]) => void;
  }
}
```

In the above snippet, you'll see I added the `cloudinary` global object with a type of `any` as, unfortunately Cloudinary don't seem to offer a TypeScript option for their widgets so we're unsure what the `cloudinary` object will contain. However, with the `gtag` one, we know that it is a function that has a `void` return type.

**Where possible, always try to strongly type your properties if you can, rather than opting for `any`**.

Finally, if you're still experiencing issues, you might need to do one last step to wire things up. Take a note of your `index.d.ts` file's location and head into your `tsconfig.json` file, which should be in the root of your project:

```json
{
  "compilerOptions": {
    // ... other settings
    "typeRoots": ["./src/types", "./types"]
  }
}
```

Under the `typeRoots` property (an array), make sure you have a path to the containing folder for your `index.d.ts` file. In my case it was in `./src/types` so I added that in my `tsconfig.json` file.

## Wrapping up

And it's a simple as that. If you've been plagued by TypeScript's complaints about a 'Property does not exist on type Window in TypeScript' error, you should have the knowledge and really simple steps to fix that once and for all.
