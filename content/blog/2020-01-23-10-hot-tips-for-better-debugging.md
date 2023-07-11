---
templateKey: blog-post
title: 10 hot tips for better debugging
date: 2020-01-23T10:59:02.993Z
featured: true
featuredimage: /img/10-debugging-tips-blog-post.png
description: >-
  We all run into coding problems and get stuck. Fortunately, I've got 10 great
  tips to help you become a better debugger and to get your code flowing again.
tags:
  - JavaScript
  - Debugging
  - Tips
---

![Blog header image for 10 tips for better debugging](/img/10-debugging-tips-blog-post.png)

Whether you're a seasoned, mature developer or just starting out, there is one universal truth: you're gonna get stuck. It's a regular part of the #DevLife to find that something just doesn't work how you expect it to, is doing something weird, or is just plain dead in the water.

One of the most valuable (and underrated) skills in the developer's toolkit is being able to smoothly and successfully debug their applications and get everything back on track.

In fact, it's such a key skill, I should have probably put it in my recent article on '[What you should know as a frontend developer](https://robkendal.co.uk/blog/2020-01-07-what-should-you-know-as-a-frontend-developer/)'.

## The importance of debugging

'Why is debugging such a valuable skill?' I hear you cry! Well, it's because things go wrong during development. Sometimes a lot, sometimes a little, but roadblocks happen and your life is going to be so much easier if you know where to look and how to fix it.

You've got so many plates spinning, so many elements and layers interacting, it's not surprising that things can frequently perform in unexpected ways or not quite wire up how you intend. Even just focussing on the frontend (ignoring the backend, SQL, etc.) you've got HTML, CSS, JavaScript, browsers, API's, your own computer, and more all trying to mesh and bring your creation to life; you're going to get problems here and there.

Plus, the less able you are to solve your own problems, the more resources you'll consume within your team and the more time will be lost during production.

As a coding mentor through the [popular Coding Coach platform](https://codingcoach.io/), it's a skill that I try to encourage in those I help. I love helping people and have lots of time to answer questions and look through code, but I firmly believe in the 'teach a man to fish' philosophy.

By learning how to quickly diagnose and solve and issue, you'll become a better developer, unblock yourself more frequently, and be able to help others to do the same.

So let's get to the tips!

## 1 - It's probably caching

No, seriously, it probably is.

If I had a single £1 for every time I've been tripped up or caught out by caching, well...

But really, there is a lot to be said for caching and problems that it causes. It could be you have some images in a CDN or data from an API that have caching applied to them and, even though you've updated everything and cleared it out, you're still getting a weird issue that you can't put your finger on.

Then you've got browsers, which, despite their best intentions of making your browsing experience smooth and quick, do enjoy hanging on for grim life to assets, such as JS files or stylesheets.

Flush all the caches, try again, repeat!

## 2 - No, it's _still_ probably caching

See 1.

## 3 - If it's not caching, it's probably you

This sounds mean, and I don't intend for it to, but it's most likely that you have become your own worst debugging nightmare.

![Boy sitting on a chair, facepalming](/img/boy-666803_640.jpg)

I've lost count of the number of times I've been stumped merely because I've spelt a variable incorrectly, or just straight up used the wrong variable altogether.

From typos, to missing semicolons, from calling the wrong function, to not calling the intended function at all, it's all to easy to have a really simple slip up that can cause you pain.

It leads us nicely into point four below, but double check your own work to make sure everything that should be wired up, is, and that the cause of a code malfunction isn't your own accursed hand.

## 4 - Narrow it down

For all other non-caching issues, the best advice is the narrow your focus like a laser beam and target the specifics of what is (or isn't) happening.

This is the real skill when it comes to debugging, playing digital detective and trying to move through your app or process step by step and hunting down the area where the issue is actually happening.

For example, you've clicked a button and expect some data from an API to show up. But it hasn't...Hmmmm.

There's likely multiple factors at work here and you need to take them out of the equation. If you've got [Postman](https://www.getpostman.com/) then you should be able to test the API in isolation and rule it out as a suspect. If that's working, then could it be how you're _calling_ the API from your JavaScript?

By shifting your gaze from the broad and mushy 'it's not working' to a more focussed '_that's_ not working' and identifying the iffy part of an otherwise good whole, you'll be back on track in no time.

## 5 - Use your browser tools

The most common browsers on the market are Google's Chrome and Mozilla's FireFox. They both have excellent dev tools jam-packed with handy utilities. You can do loads with the suite of tools at your disposal, including:

- Inspecting HTML, CSS or JS files directly
- Using browser extensions to monitor state for frameworks such as React or Vue
- View network calls, requests and responses
- Monitor your app's performance and see where the bottlenecks are
- You can even live debug JS files and step through the code
- ...and more

Even Microsoft's abomination of a browser has some of these, so there is no excuse to fire up alt-cmd-i (well, for FireFox at least) and use the helpful suite of browser-based resources given to you for free.

## 6 - Use your IDE

I use the excellent VS Code for my development work, but whatever you use, it's most likely got some sort of debugger facility. For example, in VS code, you can launch a browser of your choice, attached to the running application and step through the code line by line to narrow down the issue.

You won't always need to do this, of course and it can be a slightly cumbersome task to be honest, but there are times when you just need to get a feel for how data is flowing around your app and stepping through it via the IDE's debugging process is a great place to start.

Outside of an actual debugging flow, don't be afraid of the old `console.log()` function; `console.log()` is your friend! It allows you to get a snapshot of an object or variable without having to break the flow of your app by stepping through using the debugger.

## 7 - Use your team

Earlier in the article I mentioned learning to solve your own debugging issues, but this is a skill that grows over time. As you gain more experience, you'll see common problems flair up again and again and as that happens, you'll naturally take less time to fix these sorts of issues in the future.

![group of people fist bumping over a table](/img/people-2569234_640.jpg)

However, I would always recommend spending some time trying to figure things out for yourself, but not _all_ your time. If you've spent more than 20-30 minutes and haven't made any progress, then grab a colleague, a senior dev, anyone who can get a fresh pair of eyes on the matter and whose experience you can draw upon to get things moving forward.

## 8 - Start simple and add in

There are times when things are just a bit of a mess. You've started with the best intentions, but it's got out of hand and you just can't see the wood for the trees.

In times like these, I like to strip out as much of the clutter as I can to achieve some clarity, some zen. Maybe it's just commenting lots of unnecessary lines out, or removing a component, but if you can strip back what you're currently working with to the bare bones, you'll have a better vantage point to be able to suss out what's going wrong.

Starting from this base point, you can begin to add things back in until you hit the trouble spot, where you can solve for 'x'.

## 9 - Start complex and take away

Conversely, there are times where you don't have the luxury of being able to pair things back. Besides, everything _was_ fine and dandy until you started adding in those other components.

In this scenario, it's best to remove things, one at a time, little by little, until you've got something working and then add to it until you've worked out the kinks.

## 10 - Leave it alone and come back later

Genuinely the best tip on this entire list. If you do _nothing_ else, do this:

Go away.

![Closed sign hanging on a door reading 'sorry we're closed but still awesome'](/img/sorry-we-re-closed-but-still-awesome-tag-1101720.jpg)

Seriously, just leave it alone for 5, 10, 15 minutes. Hell, sometimes, you've got so frustrated that you need an overnight gap to spin yourself back up and tackle the beast.

By having a break, you'll cool off some of those burnt out brain endings and be able to see things more clearly and definitely move forward. It might be that you can't fix what isn't working, but you might have gleaned a better idea of how to solve your issue using a different approach.

Whatever you're struggling with, having a mini-break will boost your productivity and help you push through the debugging pain.

## What tips do you have to help fight the coding woes?

Do you have any debugging tips? Have I missed any out? Let me know.
