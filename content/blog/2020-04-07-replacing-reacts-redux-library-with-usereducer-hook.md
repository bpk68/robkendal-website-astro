---
templateKey: blog-post
title: Replacing React's Redux library with the useReducer Hook
date: 2020-04-07T08:01:00.263+00:00
featured: true
featuredimage: "/img/useReducer-blog-post.png"
description: Redux can be a tricky concept to get. By using React's useReducer Hook
  we can replace complex Redux configurations and still use state management.
tags:
- React
- Development
- Tutorials
- JavaScript

---
![Blog header for the article on replacing Redux libraries with the useReducer Hook](/img/useReducer-blog-post.png)

I've been moving over to using React Hooks in my development of late. They offer a much simpler, terser approach to development and are super powerful. They do require a certain mind-shift towards [thinking in React Hooks](https://wattenberger.com/blog/react-hooks) (read that article by Amelia Wattenberger, it's so well written and helpful!), but they really push your development on.

Anyway, up until now, I had been like a lot of developers who wanted to employ a centralised state management system; I had been using the [Redux library](https://redux.js.org/), specifically [React Redux](https://react-redux.js.org/introduction/why-use-react-redux) and the [Redux Toolkit](https://redux-toolkit.js.org/) (which just simplifies things a little I feel).

However, the React core team has [introduced the `useReducer` Hook](https://reactjs.org/docs/hooks-reference.html#usereducer) and I've found it a little nicer to use. It doesn't require additional libraries or tooling, and I feel like it might just take some of the edge off learning the Redux pattern(s) for beginners. It certainly removes a lot of the configuration 'fun' that accompanies a typical Redux setup.

So let's start using it!

## Contents

This is a long article, so if you want to skip around then you'll find this outline handy:

* [Redux primer](#redux-primer) a gentle introduction to Redux for beginners
  * [Reducers](#reducers)
  * [Action creators](#action-creators)
  * [Dispatchers](#dispatch-methods)
* [Redux with useReducer](#redux-with-usereducer)
  * [Creating the reducer](#creating-reducers)
* [Wiring up the App component](#wiring-the-app)
  * [Faking API calls](#fake-api-calls)
  * [Rendering components](#rendering-components)
* [Displaying our ShoppingList](#displaying-the-list)
  * [Introducing React's Context](#introducing-context)
  * [Dispatching updates to state](#dispatch-updates)
* [Adding new items](#add-new-items)
* [Demo and working code in action](#demo)
* [Further reading and resources](#further-reading)

## A Redux primer

<a name="redux-primer"></a>

**(If you're already a Redux king or queen and just want to start using the useReducer Hook, you can** [**skip to the tutorial part now**](#redux-with-usereducer)**)**

I mentor some junior and aspiring developers and at some point they all land on the Redux methodology for managing their state. It's easy to see why: it's a very common approach to solving application state management in complex apps; let's face it, most commercial apps qualify as 'complex' and you are always better off learning things that are geared to helping you in a realistic role.

However, the concepts involved in Redux are where a lot of beginners come unstuck. I think it's a combination of having to understand several moving parts that wire together to make a Redux-y state change, as well as some unfamiliar (and potentially confusing) terminology.

Hopefully, this little interlude can help get you familiar with the basics before we plough on with implementing the useReducer Hook for our own Redux stuff.

### The main players in Redux

So, there are four main players within the Redux pattern:

1. Application state
2. Dispatchers
3. Action creators
4. Reducers

### Application state

The most straightforward of the bunch, this is simply a centralised object with various properties that represent the 'state' of our application at a given moment. It can contain anything your app needs, but typically it could contain collections of items, settings, preferences and so on.

In more complex applications you might find that state is broken into small sections (often referred to as 'slices' in Redux land) which are then stitched together when the application is served.

### Reducers

<a name="reducers"></a>

Reducers are functions that modify our state.

They usually accept an output of an **action creator** and use this to determine what _action_ to take on our state.

You might see something like this:

```javascript
function mySuperReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    default:
      return state;
  }
}
```

For some state changes, however, we also need to modify our state based on a passed in value. For this, we'll use an action that contains a **payload**.

A **payload** could be anything: a value, string, integer, array, object, etc. It's passed in with the action object into the reducer and is used to modify state.

It might look like this:

```JavaScript
function mySuperReducer(state, action) {
    switch(action.type) {
        case 'ADD_USER':
            return [...state, action.payload.newUser]
        default:
            return state;
    }
}
```

### Action creators

<a name="action-creators"></a>

Action creators are functions that create actions. That's not very helpful though.

What they are, are quite simple functions that return an object. This object usually contains two things:

1. The type of action you want to take (often a string constant)
2. The value you want to take action with (see above example in the reducers section)

When you pass an action (the result of an action creator) into a reducer, it is the action type that determines what will happen to state, and (if required/available) what _value_ will be used as part of the state changes.

What they look like varies from use to use, but in a relatively standard Redux setup, they'll look either like this:

```JavaScript
const ADD_USER = 'ADD USER; // our string constant part

function addUser(newUser) {
    return { type: ADD_USER, newUser };
}
```

or like this if you're using one of the Redux library's handy helpers:

```JavaScript
const addUser = createAction('ADD USER');
```

### Dispatchers

<a name="dispatch-methods"></a>

The final piece of the puzzle, dispatchers. Dispatchers are the gophers between actions and reducers. Essentially, dispatchers are functions that trigger/kick-off all state updates.

You call a dispatch function, passing in an action. The dispatch function takes the action to the reducer and the reducer modifies the state.

Using a dispatcher might look like this:

```JavaScript
// Here's our action
function addUser(newUser) {
    return { type: 'ADD_USER', newUser };
}

// here's a new user object
const user = {
    name: 'rob kendal',
    age: 380,
    dob: 01/01/1901
}

// and here's the dispatch to trigger things
dispatch(addUser(user));
```

### Putting it all together

There is [a good explanation of the flow of data and the various interaction points](https://redux.js.org/basics/data-flow) in a Redux update cycle available on the Redux JS website. In the meantime, here's a handy diagram that should help cement the concepts at a high level.

![Diagram showing the data flow and connectivity between various Redux components](/img/redux-data-flow.png)

### Further reading

If you need further help on this, check out the various [Redux JS documentation sites](https://redux.js.org/) and I have a couple of articles on using Redux with a data handler:

1. [React and Redux components - part one](https://robkendal.co.uk/blog/2020-01-21-react-redux-components-apis-and-handler-utilities/)
2. [React and Redux components with data handlers - part two](https://robkendal.co.uk/blog/2020-01-27-react-redux-components-apis-and-handler-utilities-part-two/)

[![banner highlighting the beginner guide to React](/img/react-course-cta.png "Beginner's Guide to Real-World React")](https://www.newline.co/courses/beginners-guide-to-real-world-react/ "Learn real-life React with The Beginner's Guide")

## Redux with React and useReducer

<a name="redux-with-usereducer"></a>

OK, to the main meat and potatoes of the article, using the useReducer Hook to manage your application state in React.

We're going to build a small shopping list app that accepts some simple data via input elements and uses the Redux pattern to update a global state-held list.

The tools we'll be using include:

* `useReducer` - this is the [React Hook](https://reactjs.org/docs/hooks-reference.html#usereducer) that is billed as an alternative to `useState`.
* `useContext` - the [useContext Hook](https://reactjs.org/docs/hooks-reference.html#usecontext) will allow us to grab the current context value from the specific context we're referencing. In our case, we'll be passing down both a dispatch function to allow for state updates and the state object itself to make use of its contents.
* Creating a reducer function to update our state
* Making an action creator function that just simplifies the building of an action
* Creating an initial state with some predefined items on our list

So let's get to it; first up, we'll create our initial state

### Initial state

Firstly, we'll need a place to store our app's data, our initial state. We'll create a new file `initialstate.js` and load it up.

```JavaScript
export default {
    loadingItems: false, // our app uses this to determine if we're loading our list
    shoppingList: [ // our initial list of items
    {
        id: 1,
        name: "Bananas",
        description: "A bunch of 5 bananas, fresh from the plant",
        price: 1.83
    },
    {
        id: 2,
        name: "Soup",
        description: "A can of beef broth",
        price: 0.54
    }
    ]
};
```

Nothing too clever here, just a plain old JavaScript object with a couple of properties that are fairly self-explanatory;

### Creating the reducer

<a name="creating-reducers"></a>

Next, we'll create our reducer file, `reducer.js`. It will contain a few items when we're done:

1. **A React context**, this will contain our dispatch method and our application state. It will be wrapped around our React app to be referenced in child components further down the tree.
2. **Action types**: this is just be a simple JS object with string constants. We'll use these to prevent ambiguity or errors when triggering dispatches.
3. **A reducer function**, the main star of the show that will ultimately affect change in our app's state.

Our new file looks like this:

```JavaScript
// We need React in scope to create our context objects
import React from "react";

// Context
// will be used to pass down the dispatch method and our
// application state via the Context Provider and consumed
// in child components using the useContext Hook
export const StoreContext = React.createContext(null);

// Action constants
// we will import this object and use the various properties
// in child objects when calling the dispatch method
export const actions = {
    GET_ITEMS: "get items",
    GET_ITEMS_SUCCESS: "get items success",
    ADD_ITEM: "add item",
    REMOVE_ITEM: "remove item"
};

// This is a simple helper function that will take a type
// (from the constants above) and a payload, which will be the
// value which needs to be affected in state it returns
// a simple object that will be passed to our dispatch function
export const createAction = (type, payload) => {
    return {
    type,
    payload
    };
};

// Reducer
// the function that accepts our app state, and the action to
// take upon it, which then carries out that action
export const reducer = (state, action) => {
    switch (action.type) {
    case actions.GET_ITEMS:
        return {
        ...state,
        loadingItems: true
        };
    case actions.GET_ITEMS_SUCCESS:
        return {
        ...state,
        loadingItems: false
        };
    case actions.ADD_ITEM:
        const nextId = Math.max.apply(
        null,
        state.shoppingList.map(item => item.id)
        );
        const newItem = {
        ...action.payload,
        id: nextId + 1
        };
        return {
        ...state,
        shoppingList: [...state.shoppingList, newItem]
        };
    case actions.REMOVE_ITEM:
        return {
        ...state,
        shoppingList: state.shoppingList.filter(
            item => item.id !== action.payload
        )
        };
    default:
        return state;
    }
};
```

In a more complex app, it may make sense to split these functions out, but for smaller apps and our example, it makes sense to me to keep them contained within one reducer file. You could name it something that encompasses the more holistic nature of the elements within it, but for now, it's fine.

The main thing to understand is that each part in here is related and will join together throughout our app to make changes to our state.

The reducer function is the most interesting part and you can see that it accepts our current state (this is taken care of by React's `useReducer` function that you will see later on) and the action we want to take against the state.

Based on the supplied action's type, the reducer determines which action we're talking about and then does some simple state mutation based on what that action type may be.

For example, if we pass the action type 'REMOVE_ITEM' (just a string constant), the reducer returns a new version of state with the 'shoppingList' property where the previous shopping list has been filtered to remove the item that matches the action's payload (which will be the item's id value).

## Wiring up the App component with `useReducer`

<a name="wiring-the-app"></a>

So we've got a reducer (and it's other moving parts) and some state for the reducer to act upon. Now we need to wire this up into our App.

First, we'll import some important items at the top of the file:

```JavaScript
import React, { useReducer, useEffect } from "react";

// Styles
import "./styles.css";

// Data
import initialState from "./initialstate";
import { reducer, StoreContext, actions } from "./reducer";

// Components
import AddItem from "./components/AddItem";
import ShoppingList from "./components/ShoppingList";
```

We'll get to useReducer and useEffect in a minute. The important bits of this so far are that we're importing our app's initial state, as well as most items from the `/reducer.js` file.

Next, we'll define our main export and proceed to fill it as we go.

```JavaScript
export default props => {

    return (
        <div>The app has landed</div>
    );
};
```

From here, we'll finally use our useReducer Hook:

```JavaScript
export default props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    // simulate loading of items from an API
    dispatch({
        type: actions.GET_ITEMS
    });

    setTimeout(() => {
        dispatch({
        type: actions.GET_ITEMS_SUCCESS
        });
    }, 2000);
    }, []);

    return (
        ...
    );
};
```

The useReducer Hook is a really simple function in essence. It returns an array, `[state, dispatch]` which contains our app's state, and the dispatch function we will use to update it.

We're also using the useEffect Hook with an empty array, which means it will only fire once, **not on every render**.

The useEffect Hook here is not at all necessary, but I've used it to mimic a realistic scenario whereby an app would load and then go off and fetch some data from an API.

### Faking the API call

<a name="fake-api-calls"></a>

In a real app, you'll need to interact with an API and you'll most likely want to show some sort of loading message whilst you wait for data back. We're not using an API and our data is miniscule by comparison, but we can fake the _effects_ of an API using a `setTimeout` callback.

In the useEffect Hook, we actually use the dispatch method for the first time. We pass it a type of 'GET_ITEMS' which is a string property on our imported actions constants object (`actions`) from the top of our App component.

You can see in our `reducer.js` file what affect this has on state:

```JavaScript
export const reducer = (state, action) => {
    switch (action.type) {
    case actions.GET_ITEMS:
        return {
        ...state,
        loadingItems: true
        };
    // ... rest of reducer
    }
};
```

We simply set the 'loadingItems' flag to true, which means in our App component, we'll display a loading element.

### Rendering the components

<a name="rendering-components"></a>

Finally, we need to wire up the app so that it actually renders something useful. We'll do that here:

```JavaScript
export default props => {

    // ...unchanged

    return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <h1>Redux fun with shopping lists</h1>
      <hr />
      {state.loadingItems && <div className="loading">...loading</div>}
      {!state.loadingItems && (
          <div className="columns">
          <div className="column">
              <h2>Add a new item</h2>
              <AddItem />
          </div>
          <div className="column">
              <h2>Shopping list</h2>
              <ShoppingList />
          </div>
          </div>
      )}
    </StoreContext.Provider>
    );
};
```

The main take away here is the context provider that we use to wrap the main App component in.

The line, `<StoreContext.Provider value={{ dispatch, state }}>` allows us to pass down the `dispatch` function and store `state` to child components.

This is a key part of the process as they allow us to access `dispatch` and `state` from child components. You can [read more about React's Context on the official documentation](https://reactjs.org/docs/context.html).

### Finishing off the App component

Everything else is pretty much standard React stuff. We check to see if the `loadingItems` property/flag is set to 'true' and either display a loading element, or our AddItem and ShoppingList components.

Here's our app's entry point in complete, the App component:

```JavaScript
import React, { useReducer, useEffect } from "react";

// Styles
import "./styles.css";

// Data
import initialState from "./initialstate";
import { reducer, StoreContext, actions } from "./reducer";

// Components
import AddItem from "./components/AddItem";
import ShoppingList from "./components/ShoppingList";

export default props => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    // simulate loading of items from an API
    dispatch({
        type: actions.GET_ITEMS
    });

    setTimeout(() => {
        dispatch({
        type: actions.GET_ITEMS_SUCCESS
        });
    }, 2000);
    }, []);

    return (
    <StoreContext.Provider value={{ dispatch, state }}>
      <h1>Redux fun with shopping lists</h1>
      <hr />
      {state.loadingItems && <div className="loading">...loading</div>}
      {!state.loadingItems && (
          <div className="columns">
          <div className="column">
              <h2>Add a new item</h2>
              <AddItem />
          </div>
          <div className="column">
              <h2>Shopping list</h2>
              <ShoppingList />
          </div>
          </div>
      )}
    </StoreContext.Provider>
    );
};
```

## Displaying our list in the ShoppingList component

<a name="displaying-the-list"></a>

Next, we'll dig into the ShoppingList component. At the top of the file, we'll see a familiar set of imports:

```JavaScript
import React, { useContext } from "react";

// State
import {
    StoreContext,
    actions,
    createAction
} from "../reducer";
```

Next, we'll define the main output for this component:

```JavaScript
export default props => {
  const store = useContext(StoreContext);
  const state = store.state;
  const dispatch = store.dispatch;

  const handleRemoveItem = id => {
    dispatch(createAction(actions.REMOVE_ITEM, id));
  };

  return (
    <>
      {!state.shoppingList && <p>no items in list</p>}
      {state.shoppingList && (
      <table>
          <thead>
          <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {state.shoppingList &&
              state.shoppingList.map(item => (
              <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>£{item.price}</td>
                  <td>
                  <button onClick={() => handleRemoveItem(item.id)}>
                      remove
                  </button>
                  </td>
              </tr>
              ))}
          </tbody>
      </table>
      )}
    </>
  );
};
```

The main return of the component doesn't have anything too interesting beyond standard React stuff. The interesting things, however, are the 'const' definitions and the `handleRemoteItem()` method.

### Wiring up context in the ShoppingList component

<a name="introducing-context"></a>

We know from our App component that we're already passing down the Redux dispatch method and our application state, but how do we access them?

Simple: with the `useContext` Hook...

```JavaScript
const store = useContext(StoreContext);
const state = store.state;
const dispatch = store.dispatch;
```

That's all there is to it. We can now use `state` to access various properties on our global application state, such as `shoppingList`, which we actually use to display our table.

Similarly, we use `dispatch` to trigger state changes; in our case to remove items from our list.

### Dispatching updates to our shopping list

<a name="dispatch-updates"></a>

Whilst you could inline the following directly into the button element (and I normally would for brevity), I think it's a little clearer for learning to abstract the 'remove' button's click handler into its own variable.

```JavaScript
const handleRemoveItem = id => {
    dispatch(createAction(actions.REMOVE_ITEM, id));
};
```

Again, quite a simple approach, but we call the dispatch function, passing in the result of the createAction function. The createAction function accepts a 'type' and a value, referred to as a 'payload'.

It's worth noting that the above is functionally equivalent to the following:

```JavaScript
const handleRemoveItem = id => {
    dispatch({ type: 'remove item', payload: id});
};
```

It just looks a bit neater in the first example, and leaves less room for error(s).

Again, you can see that this links through to our reducer file like so:

```JavaScript
export const reducer = (state, action) => {
    switch (action.type) {
    // ...rest of reducer
    case actions.REMOVE_ITEM:
        return {
        ...state,
        shoppingList: state.shoppingList.filter(
            item => item.id !== action.payload
        )
        };
    }
};
```

We employ a straightforward `Array.filter()` on the state's shoppingList property that just skips over the item with the id value that we've passed in, that we want to remove.

## Adding new items with the AddItem component

<a name="add-new-items"></a>

Finally, we need to be able to add an item to our list to complete the circle of CRUD (almost, we're not doing updates...).

By now, things should start looking familiar, so we'll take a look at the entire AddItem component as a whole and walk through the finer points:

```JavaScript
import React, { useContext, useState } from "react";

// State
import { StoreContext, actions, createAction } from "../reducer";

export default props => {
    const _defaultFields = {
      name: "",
      description: "",
      price: ""
    };
    const store = useContext(StoreContext);
    const dispatch = store.dispatch;
    const [fields, setFields] = useState({ ..._defaultFields });

    const handleInputChange = evt => {
      setFields({
          ...fields,
          [evt.target.id]: evt.target.value
      });
    };

    const handleFormSubmit = evt => {
      evt.preventDefault();
      dispatch(createAction(actions.ADD_ITEM, fields));
      setFields(_defaultFields);
    };

    return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={fields.name}
        onChange={handleInputChange}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        value={fields.description}
        onChange={handleInputChange}
      />
      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="text"
        value={fields.price}
        onChange={handleInputChange}
      />
      <button type="submit">Add item</button>
    </form>
    );
};
```

Right at the top, we've got our React and state imports.

Next, in our main output, we have a default state object, `_defaultFields` that we're using to reset the fields in local state when we've finished adding a new item.

We consume the dispatch function using the `store` variable which consumes the `useContext` Hook so we can pass a new item into our shopping list. **Notice that we're not using the state context, however.** We don't need to use anything from our application's state, so there's no need to grab it and assign it to a variable.

Most everything else is pretty standard React form field handling [using controlled components](https://reactjs.org/docs/forms.html#controlled-components) that is beyond the scope of this article.

What we're interested in, however, happens in the `handleFormSubmit()` method:

```JavaScript
const handleFormSubmit = evt => {
    evt.preventDefault();
    dispatch(createAction(actions.ADD_ITEM, fields));
    setFields(_defaultFields);
};
```

Firstly, we call the synthetic event's `preventDefault()` method to prevent the page from refreshing.

Next, we call our familiar dispatch method, passing in the action 'ADD_ITEM' and the fields object from state which is a collection of any values we've made into the form's fields.

What happens in our reducer looks like this:

```JavaScript
export const reducer = (state, action) => {
    switch (action.type) {
    // ...rest of reducer
    case actions.ADD_ITEM:
      const nextId = Math.max.apply(
        null,
        state.shoppingList.map(item => item.id)
      );
      const newItem = {
        ...action.payload,
        id: nextId + 1
      };
      return {
        ...state,
        shoppingList: [...state.shoppingList, newItem]
      };
    // ...rest of reducer
    }
};
```

This is arguably the most complex part of our reducer, but it's easy to follow:

* We work out the current highest id value in our shopping list items and increment it by one (not recommended in real life!);
* We add the id to a new item object;
* We update the state's shoppingList property by copying the array to a new array, adding in the new item object.

Finally, we clear out any saved fields/input data by replacing local state with the `_defaultFields` object.

## Putting it all together

<a name="demo"></a>

You can see the finished app and play about with it below, and you can [view it online in the CodeSandbox environment](https://codesandbox.io/s/redux-with-usereducer-9tfko).

<iframe
src="https://codesandbox.io/embed/redux-with-usereducer-9tfko?fontsize=14&hidenavigation=1&theme=dark"
style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
title="redux-with-usereducer"
allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"

> </iframe>

## Caveats, gotchas and things to bear in mind

This article covers the basics of using the useReducer Hook in conjunction with React's Context mechanism to both update and access your application's state. It can be used instead of the standard Redux library's approach, and it certainly requires no additional setup or configuration, which is handy (because there's a lot of that in the traditional Redux world).

However, this particular approach I've used may not suit you and your situation. It probably won't scale that well 'as-is' and could benefit from some smoothing out in terms of using this exact approach for a full-scale application. For example, you may wish to split your state into smaller parts for different areas of your application, which is great, but you can see how you'll need to work on that with from we've done here.

There is always more than one way to approach a problem and I think it's worth knowing your options. This article helps to introduce the Redux patterns and concepts whilst employing a nice new approach of employing reducers using built-in Hooks.

I would (and do) use this commercially, but do take what you see here and adapt it to your own means.

## Further reading and references

<a name="further-reading"></a>

It's always handy to have a list of other sources of information, so here's that very list of useful references, links, resources that are worth a peek to help you in your quest to be a Redux master:

* [Redux JS](https://redux-toolkit.js.org/tutorials/basic-tutorial) - discover more about the Redux methodology and library
* [Redux Toolkit](https://redux-toolkit.js.org/) - an opinionated version of the Redux JS library for React
* [React's official documentation on Hooks](https://reactjs.org/docs/hooks-reference.html) - especially helpful for the [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) and [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) Hooks
* Amelia Wattenberger's ['thinking in hooks' article](https://wattenberger.com/blog/react-hooks) - super helpful, clear resource for shifting your mindset into using Hooks in your own code
* My own articles on Redux and React, using API's and data handlers. I have an [article part one](https://robkendal.co.uk/blog/2020-01-21-react-redux-components-apis-and-handler-utilities/), and [article part two](https://robkendal.co.uk/blog/2020-01-27-react-redux-components-apis-and-handler-utilities-part-two/) available, which cover some more real-world examples.