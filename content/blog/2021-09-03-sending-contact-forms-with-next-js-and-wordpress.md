---
date: 2021-09-03T20:08:20
published: true
title: How to use contact forms with headless WordPress and Next.js
description: Part 4 in Getting Started with Next.js and this time we're looking at how to send a contact form using WordPress in headless mode.
featuredimage: '/img/next-js-with-wordpress-part-4-blog-post.png'
featured: true
tags:
  - React
  - Next
  - Static Sites
---

![Blog header for How to use contact forms with headless WordPress and Next.js](/img/next-js-with-wordpress-part-4-blog-post.png 'How to use contact forms with headless WordPress and Next.js')

If you’ve been following along with the series, you’ll have come across the previous posts:

- [Configuring WordPress for use as a headless CMS and setting up a Next.js project](https://robkendal.co.uk/blog/configuring-wordpress-as-a-headless-cms-with-next.js)
- [Using WordPress as a headless CMS with Next.js](https://robkendal.co.uk/blog/using-wordpress-as-a-headless-cms-with-next.js)
- [Create a Next.js RSS feed for your static website](https://robkendal.co.uk/blog/create-a-static-website-rss-feed-with-next.js)

In this article, part 4, we’re going to cover a key part of and good website: handling contact forms within a static website.

_If you like this article, you’ll love the other helpful content I post on Twitter._ [Find me on Mastodon @kendalmintcode@indieweb.social](https://indieweb.social/@kendalmintcode) _and say hi._

## Contact forms and headless WordPress with Next.js

When it comes to allowing your visitors to send information to you via a contact form on your headless WordPress backend from a statically-generated front end, there are a few options, and I’m sure more are being added all the time.

However, in my experience, there are two solid, reliable, stand-out options to choose from:

- [Netlify Forms](https://www.netlify.com/products/forms/).
- [The WPGraphQL WordPress plugin](https://wpgraphqldocs.gatsbyjs.io/extenstion-plugins/wpgraphql-send-email/).

Let’s take a look at these options in more detail.

## Netlify Forms

[Netlify Forms](https://www.netlify.com/products/forms/) is yet another super powerful extension to the ever-popular [Netlify](Netlify) platform. It works so easily and simply, using the familiar magic that only Netlify has.

It’s a cinch to set up with very minimal changes to your form HTML (or JSX in our case as we _are_ dealing with React after all 😊), so let’s start with an example.

> **Wait!** What if I don’t want to host things on Netlify? Good point. Netlify is awesome and I highly recommend it, but Vercel (the makers of Next) do the best job of hosting Next sites. That’s why we’re looking at the powerful Forms feature from Netlify _first_ and then I’ll explain about the next best option.

Here’s a typical HTML form that you might have in your React app:

```js
const MyContactForm = () => (
  <form name="contact" method="post">
    <p>
      <label>
        Your Name: <input type="text" name="name" />
      </label>
    </p>
    <p>
      <label>
        Your Email: <input type="email" name="email" />
      </label>
    </p>
    <p>
      <label>
        Message: <textarea name="message"></textarea>
      </label>
    </p>
    <p>
      <button type="submit">Send</button>
    </p>
  </form>
);
```

Nothing too fancy there. To add Netlify’s form-handling powers to this then you need to do a few things:

1. Add in a hidden input with a `form-name` attribute and provide the name of your form.
2. Add in a `netlify` or `data-netlify` attribute to help Netlify identify the form.
3. Add in a `data-netlify-honeypot` attribute to help avoid unnecessary captchas for your visitors.

With these parts in place, the form now looks like this:

```js
const MyContactForm = () => (
  <form
    name="contact"
    method="post"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
  >
    <input type="hidden" name="form-name" value="contact form" />

    {/* ...Rest of the form*/}
  </form>
);
```

Yeah, I know, it really is _that_ simple. Depending on what React flavour your using (Next, Gatsby, etc.), you might need to add in a couple of additional small steps to make sure the form is wired up with Netlify. In this case you can read all the details on their blog post about [integrating Netlify Forms in a React App](https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/#form-handling-with-static-site-generators).

You can also read more in the [official Netlify Forms documentation](https://docs.netlify.com/forms/setup/#javascript-forms).

## WPGraphQL Send Email

Our next option is to use the popular WordPress plugin [WPGraphQL Send Email](https://en-gb.wordpress.org/plugins/add-wpgraphql-send-mail/). Before we dive into the setup and implementation, head over to the plugin’s page on WordPress.org and download and install it, or search for it directly in your WordPress site and add it there.

The WPGraphQL Send Email plugin wires up email sending capability into WordPress and exposes a GraphQL mutation inside of the WPGraphQL schema. This new `sendEmail` mutation enables you to send emails from your static front-end _via_ WordPress.

[![course banner for beginners React course](/img/react-course-cta.png "Beginner's Guide to Real-World React")](https://www.newline.co/courses/beginners-guide-to-real-world-react/ "See the Beginner's Guide to Real-World React")

You can integrate the sending capability with different providers too, such as SendGrid, Gmail, and Outlook/Office365. That part of the setup is a little beyond the scope of this article, but you’re free to use a simple SMTP server if you’d prefer — basically any service that can fire emails to other people.

## Updating our Next.js site to use the WPGraphQL Send Email plugin

It’s not too difficult to plug all this into our Next site, but it does require a little more work than the Netlify Forms configuration.

We need to do two things here:

1. Add a new `async` API function to our `/lib/api.js` file.
2. Add a new contact page complete with a new contact form.

### Add a new API handling function

OK, so first things first we need to add a new function to our `/lib/api.js` file. This new function will be a GraphQL _mutation_. Its sole purpose will be to pass our website visitor’s form data to our WordPress backend. Here, the Send Email plugin (now wired into the WPGraphQL system) will handle the physical sending of the email to whomever we’ve set up in there.

If you’re following on from the previous article on [Using WordPress as a Headless CMS with Next.js](https://robkendal.co.uk/blog/using-wordpress-as-a-headless-cms-with-next.js) then you can go ahead and open up the `/lib/api.js` file.

> If you’re reading this article fresh with no existing codebase, then you can download a great starter kit project to wire up WordPress with Next.js on my GitHub profile. Check out the [wordpress-next-starter repo](https://github.com/bpk68/wordpress-next-starter) to get started.

With the `api.js` file open and ready, add in the following new function:

```js
export async function sendMail(subject, body, mutationId = 'contact') {
  const fromAddress = 'noreply@yourwebsite.com';
  const toAddress = 'someone@yourwebsite.com';
  const data = await fetchAPI(
    `
		mutation SendEmail($input: SendEmailInput!) {
			sendEmail(input: $input) {
				message
				origin
				sent
			}
		}
	`,
    {
      variables: {
        input: {
          clientMutationId: mutationId,
          from: fromAddress,
          to: toAddress,
          body: body,
          subject: subject,
        },
      },
    }
  );

  return data?.sendEmail;
}
```

What’s going on here in this new `sendMail` API function? Well, the [official Send Mail plugin](https://en-gb.wordpress.org/plugins/add-wpgraphql-send-mail/#description) isn’t hugely helpful in explaining this on the plugin info page, but let’s go over what’s what.

First up, we have a function that accepts a `subject`, a `body`, and a `mutationId` which defaults to `contact`. The `subject` and `body` arguments are going to represent the subject line of the email we wish to send, and the body (HTML or otherwise) of the very same email. The `mutationId` field helps us to identify the name of the form we wish to send an email about.

We have a few variables at the start of the function that outline a ‘from’ address and ‘to’ address’, which will be attached to the email to identify who it’s _from_ and where it’s going _to_. With the `data` variable, this is the main GraphQL mutation.

The mutation calls the `sendEmail` endpoint (this is the new endpoint exposed by the Send Email plugin) and is passed a `SendEmailInput` object. What it gives us back is a message, origin, and sent values. These are useful, particularly the sent value, for our front end to be sure that the form has been submitted successfully.

Further down the mutation in the supplied `variables` we just connect up all the incoming data and arguments we have so far, such as the body, from address and subject.

With that taken care of, let’s create a new page to house our contact form.

### Add a new contact page and form

You could create a contact form anyway, or even create a reusable component that does the same trick, but for our purposes we’re going to create a good ol’ contact page with a form directly upon it.

We want this to live at the `/contact` route in our website, so in your Next.js project, under the `/pages` directory, create a new folder `contact` and a new file `index.js`.

With that done, populate the new `index.js` file with the following:

```js
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../../styles/Home.module.css';

const Contact = ({ menuItems }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (evt) => {
    // we'll fill this in in a moment
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Contact us page</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Contact us</h1>
        <hr />

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">Your name</label>
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Your email</label>
            <input
              class="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Your message</label>
            <textarea
              className="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <button>Send</button>
        </form>
      </main>
    </div>
  );
};

export default Contact;
```

Looks quite long, but I always feel anything involving forms tends to look like this. Let’s break it down.

At the top, in the imports section, we’re bringing in `useState` from React, which we’ll use to store the entered values in our upcoming form fields. We also bring in `useRouter` and `Head` from Next which we’ll respectively use to route the user to another page when they’ve submitted the form, and to inject some SEO values in the page meta area.

Next we bring in the `styles` CSS module for the same generic styling we used before in the previous articles.

Now we’re onto the component itself. We set up a few `useState` variables, one each for our name, email, and message form fields we’ll be defining shortly:

```js
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [message, setMessage] = useState('');
const router = useRouter();
```

We’re also initialising Next’s built-in `useRouter()` function so that we can redirect our visitors to a ‘thank you’ page when they’ve submitted the form.

We’ve created a `handleSubmit()` function that you won’t be surprised to hear will handle the submission of our form, which we’ll define next.

In the component’s JSX, after we add a bit of page scaffolding, title, SEO meta data, etc. you can see we return a pretty standard HTML form. We’re attaching the `handleSubmit` function to the form’s `onSubmit` event, and then everything else is straightforward HTML form business. The only thing of note here is that we connect each of the `useState` getters and setters to their corresponding form fields’ `value` attributes and `onChange` events.

So now, when people update the form fields’ values, their input values will be stored in our component’s `state`. Pretty neat!

With that out of the way, let’s fill out the `handleSubmit` function:

```js
// ...other imports

// bring in the new sendMail API function
import { sendMail } from '../../lib/api';

const Contact = ({ menuItems }) => {
  // ...variables as before

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const emailContent = `
      Message received from <strong>${name}</strong>. 
      Their email address is <strong>${email}</strong>. <br />
      They'd like to know about...
      ${message}
    `;
    const data = await sendMail(
      'New message from website contact form',
      emailContent
    );

    if (data.sent) {
      // email was sent successfully!
      router.push('/contact/thanks');
    }
  };

  return (
    <div className={styles.container}>
      {/* ...rest of page and contact form */}
    </div>
  );
};

export default Contact;
```

We’ve brought in out `sendMail` function from the API file, and filled out the `handleSubmit` function. Walking through the function, the process looks like this:

- We call the `evt.preventDefault()` to stop the form from refreshing the page.
- Next, we construct a string message, `emailContent` which will represent the body of the email we’re going to send from WordPress.
- After this, we call our `sendMail` API function, passing in an email subject and our `emailContent` email body, and `await` the return.
- Once the function returns, we check the `sent` property and if it’s successfully sent it’ll be true, which means we can redirect our visitor to the `/contact/thanks` page via Next’s built-in router.

**We haven’t actually created the `/contact/thanks` route** as it’s outside the aim of this article, but you could redirect your visitor’s anywhere at this point, an external URL, another internal page, or even not route them anywhere and just display a simple ‘thank you’ message.

> **Note**: you could abstract some of the email body creation into a separate function in a utility/helper library to build up a suite of rich HTML email templates if you wanted. We’ve just opted for a plain ‘someone sent you a message on your website’ situation here for simplicity.

## Sending contact forms with WordPress and Next.js

And that’s it! With very little effort, we’ve managed to wire up our WordPress backend with our detached, Next-powered front-end to facilitate sending contact forms from our static sites via the handy WPGraphQL Send Email plugin.

## Helpful links

Here’s a reminder of the links used in this article:

- [Netlify](https://www.netlify.com/)
- [Netlify Forms](https://www.netlify.com/products/forms/) and the [official Forms documentation](https://docs.netlify.com/forms/setup/)
- [WPGraphQL Send Mail](https://en-gb.wordpress.org/plugins/add-wpgraphql-send-mail/)
- Part one of the series: [Configuring WordPress as a Headless CMS with Next](https://robkendal.co.uk/blog/configuring-wordpress-as-a-headless-cms-with-next.js)
- Part two of the series: [Using WordPress as a Headless CMS with Next](https://robkendal.co.uk/blog/using-wordpress-as-a-headless-cms-with-next.js)
- Part three of the series: [Create a Next.js RSS feed for your static website](https://robkendal.co.uk/blog/create-a-static-website-rss-feed-with-next.js)
