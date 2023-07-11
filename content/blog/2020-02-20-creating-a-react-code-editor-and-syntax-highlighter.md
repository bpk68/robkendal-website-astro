---
templateKey: blog-post
title: " Creating a React code editor and syntax highlighter"
date: 2020-02-20T08:02:21.235+00:00
featured: true
featuredimage: "/img/react-syntax-highlighter-blog-post.png"
description: Can you build a simple, lightweight code and syntax highlighter using
  Prism JS and React? Sure you can. I'll show how I did it in no time flat.
tags:
- Development
- Tutorials
- React

---
![](/img/react-syntax-highlighter-blog-post.png)

Fuelled by a workplace conundrum about finding a reliable, efficient means to do a simple job, without needing to bring in the heavy hammer of another dependency, I recently created a React-based code syntax highlighter.

## Surely there's something else already out there?

Yes, yes there is. There are a few code syntax highlighting components out there, but there are a few things to consider when shopping around for a third-party component:

1. Adding an extra dependency adds more code weight and potential security problems into your project. If you can avoid this, you should.
2. If the task is fairly small or not too onerous from an effort point of view then it's worth building an in-house solution where possible.
3. The existing third-party offerings can be either quite out of date or paid options (and the paid options are usually expensive).

Using the ever useful [Prism JS](https://prismjs.com/) made by the helpful [Lea Verou](http://lea.verou.me/), we built a simple, to the point syntax highlighter that tracks its own state and dynamically swaps the language highlighting as needed.

Without further ado, here's how to do it

## Building the React code syntax highlighter from scratch

First things first, get a React project up and running and then let's install Prism JS

```javascript
npm i prismjs

// or

yarn add prismjs
```

Next we need to add our CodeEditor component to the main App.js file to kick everything else off.

```javascript
import React, { useState } from "react";

// Styles
import "./styles.css";

// Components
import CodeEditor from "./CodeEditor";

export default function App() {
  const [editorLanguage, setEditorLanguage] = useState("javascript");

  return (
    <div className="App">
      <h1>React code syntax hightlighter</h1>

      <fieldset>
        <legend>Choose language:</legend>
        <input
          type="radio"
          id="javascript"
          name="language"
          value="javascript"
          checked={editorLanguage === "javascript"}
          onChange={() => setEditorLanguage("javascript")}
        />
        <label htmlFor="javascript">JavaScript</label>
        <input
          type="radio"
          id="xml"
          name="language"
          value="markup"
          checked={editorLanguage === "markup"}
          onChange={() => setEditorLanguage("markup")}
        />
        <label htmlFor="xml">XML</label>
        <input
          type="radio"
          id="css"
          name="language"
          value="css"
          checked={editorLanguage === "css"}
          onChange={() => setEditorLanguage("css")}
        />
        <label htmlFor="css">CSS</label>
      </fieldset>

      <CodeEditor language={editorLanguage} />
    </div>
  );
}
```

Nothing too tricky going on here. We're adding `useState` from React to keep track of our language selection. Speaking of which, we've also got some simple radio button elements that update our language selection into state.

When a user selects a different language, we update their choice in state and then pass this along to our CodeEditor component which will, eventually, call Prism to update the syntax highlighting.

One caveat to watch out for here is to make sure you add the `checked` property to the radio buttons and compare that radio button's language with the current state value. This relationship between state values and form fields [turns ordinary form fields into controlled components](https://reactjs.org/docs/forms.html#controlled-components).

Now, although we haven't created the CodeEditor component yet (we'll do that next), we've finished off the main App component with all the necessary bits we need.

### Creating the CodeEditor component

Now we come to the main event, the syntax highlighter itself, the CodeEditor component.

Here it is in full:

```javascript
import React, { useState, useEffect } from "react";
import Prism from "prismjs";

const CodeEditor = props => {
  const [content, setContent] = useState(props.content);

  const handleKeyDown = evt => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent(value);
    }
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [props.language, content]);

  return (
    <div className="code-edit-container">
      <textarea
        className="code-input"
        value={content}
        onChange={evt => setContent(evt.target.value)}
        onKeyDown={handleKeyDown}
      />
      <pre className="code-output">
        <code className={`language-${props.language}`}>{content}</code>
      </pre>
    </div>
  );
};

export default CodeEditor;
```

It's not too big or complex of a component, but let's break it down.

First, we import the `useEffect` and `useState` hooks from React as well as importing the PrismJS module.

We're using `useState` to track updates to our input, for which we're using a text area element. We also output the Prism-styled _input_ into a `pre` block as per Prism JS's documentation.

```javascript
<pre className="code-output">
  <code className={`language-${props.language}`}>{content}</code>
</pre>
```

`useEffect` replaces many React lifecycle functions, such as `componentDidMount()`. For our purposes, we're essentially watching changes to both the language passed in via props, and our input changes. If either happens, we fire Prism's `highlightAll` function to update the styling.

```javascript
useEffect(() => {
  Prism.highlightAll();
}, [props.language, content]);
```

Which is very neat and effective. One of the benefits of React Hooks!

The most interesting part is what happens on the `onKeyDown` event:

```javascript
const handleKeyDown = evt => {
    let value = content,
      selStartPos = evt.currentTarget.selectionStart;

    console.log(evt.currentTarget);

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      setContent(value);
    }
  };
```

In a nutshell, whenever the user hits a key, we check to see if it's the tab key. If it is, we alter the current state value from our input and add in some spacing, updating the selection point of the cursor along the way. This almost makes it feel like a genuine code editor.

And that's it. All done. But wait, things are looking a bit weird.

![Screen capture of a weird styling issue in Code Sandbox from our React syntax highlighter](/img/screenshot-2020-02-19-codesandbox.png)

Let's create some nice styles to join up the dots.

### Adding the styles

For our styles, there's nothing too flash, but here they are:

```css
/** ---------------------------- */
/** --- Code editor ------------ */
/** ---------------------------- */
.code-edit-container {
  position: relative;
  height: 500px;
  border: 1px solid hsl(0, 0%, 60%);
  background-color: hsl(212, 35%, 95%);
  margin: 1em 0;
}

.code-input,
.code-output {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border: none;
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 0.8rem;
  background: transparent;
  white-space: pre-wrap;
  line-height: 1.5em;
  word-wrap: break-word;
  font-size: 1rem;
}

.code-input {
  opacity: 1;
  margin: 0;
  color: hsl(0, 0%, 40%);
  resize: none;
}

.code-output {
  pointer-events: none;
  z-index: 3;
  margin: 0;
  overflow-y: auto;
}

code {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 1rem;
  display: block;
  color: hsl(0, 0%, 40%);
  font-size: 0.8rem;
  font-family: "PT Mono", monospace;
}

/* overrides */
.code-edit-container :not(pre) > code[class*="language-"],
.code-edit-container pre[class*="language-"] {
  background: transparent;
  margin: 0;
}
```

The main take away is that we create comparative text styling (font size, line-heights, etc.) between the text area input and the code output, and then layer the Prism-styled output _over_ the text area input.

Finally, we have to add a few Prism overrides to just neaten everything up.

## React code syntax highlighter in action

<iframe
src="https://codesandbox.io/embed/focused-forest-y9re6?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="focused-forest-y9re6"
allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"

> </iframe>

## Helpful links

And that's it really. If you'd like to see it in action, there's a Code Sandbox below as well as some other helpful links.

* [React forms and controlled components](https://reactjs.org/docs/forms.html#controlled-components)
* [Prism JS for syntax highlighting](https://prismjs.com/)
* [Code Sandbox example project to see the React highlighter in action](https://codesandbox.io/s/focused-forest-y9re6?fontsize=14&hidenavigation=1&theme=dark)