---
templateKey: blog-post
title: 'React & Redux: components, API''s and handler utilities part two'
date: 2020-01-27T11:30:18.035Z
featured: true
featuredimage: /img/react-redux-api-s-and-the-data-hander-part-ii-blog-post.png
description: >-
  Part two of the series on learning to use React and Redux with an API and a
  data handler utility to act as a bridge between our components and application
  state.
tags:
  - Development
  - JavaScript
  - Tutorials
---
![Blog article header for react & redux components, API's and data handling part two](/img/react-redux-api-s-and-the-data-hander-part-ii-blog-post.png)

In [React and Redux: components, API's and handlers Part I](https://robkendal.co.uk/blog/2020-01-21-react-redux-components-apis-and-handler-utilities/), we looked at how to add Redux to your React app and add in calls to an API via JavaScript's `fetch()` . 

Here in part two, we're going to build on this idea and introduce the concept of a data handler. Our data handler will act as an intermediary between our component, our API and the Redux dispatching of actions. 

For those eager to explore the finished article before ploughing on, you can [find the complete data handling project in a new Code Sandbox here](https://codesandbox.io/s/redux-data-handler-example-2-mklek?fontsize=14&hidenavigation=1&theme=dark).

## Enter the data handler

You may remember that in part one, we had a diagram highlighting the different elements involved in fetching data, updating state and doing component things. In fact, here it is:

![Diagram showing the relationship between a React component, an API and Redux state](/img/redux-data-handler-diagram.png)

This works fine and our app does what we set out to do: grab some users from an API and list them.

However, it's very closely tied to our component. In fact, this model is very component-centric. The component is responsible for calling the API, updating state via Redux and then doing whatever the component is meant to be doing in the first place. 

This can introduce a few headaches which we outlined in part one of this series, but two of the biggest flaws for me are:

* We're going to potentially have a lot of duplicated code as our app grows,
* and our component is handling too many responsibilities.

### The data handling middleman

With the introduction of a data handling mechanism, our new diagram looks like this:

![An improved diagram showing how a data handler can interact between state and our components](/img/redux-data-handler-diagram-updated.png)

As you can see, we now have a much better spread of roles and responsibilities. Our new data flow looks like this:

1. The user clicks a button to load a list of users
2. The React component calls the data handler to give it some data
3. The data handler calls the API using a GET request to something like '/users'
4. The API fetches the data and returns its Promise to the data handler
5. The data handler then dispatches a Redux action with the API payload (e.g the list of users) 
6. Redux updates app state with the list of users it has been passed
7. The state change is noticed by the component, which takes action to refresh, updating itself with the shiny list of users.

Great, this looks a lot better and our component is now only really concerned with asking for data, without caring as much about where that data comes from or how it is obtained.

## Building the new app and data handler

To make our lives a little easier, we're going to replace the standard implementation of Redux (we've been using [React-Redux](https://react-redux.js.org/) up to this point) with the brilliant [Redux Starter Kit](https://redux-starter-kit.js.org). The starter kit lets us simplify our redux set up and will enable us to abstract a lot of similar redux operations into a nice reducer factory approach. 

So let's get going. Here's a list of the changes we need to make:

- Install Redux Starter Kit into our project
- Strip out our Redux actions and reducers into a reducer factory
- Create a data handler to talk to our API
- Replace our Redux dispatching and API calls in our component with our new data handler utility

## 1, Install and set up Redux Starter Kit

Let's begin by installing the [Redux Starter Kit](https://redux-starter-kit.js.org/introduction/quick-start) by running the following command:

```JavaScript
# NPM
npm install --save @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```
Next, we'll need three things:

- To create a root reducer that pulls together all the other reducers in our app
- A users reducer that handles state management for the users slice of our app state
- To wire this all up into our app's `index.js` file.

### Creating the root reducer

We create a new file, `rootReducer.js` and populate it like so:

```JavaScript
import { combineReducers } from "@reduxjs/toolkit";
import users from "./usersReducer";

const rootReducer = combineReducers({
  users
});

export default rootReducer;
```
Using the `combineReducers` function provided by the Redux Starter Kit, we can import any number of reducers that our app needs and handily *combine* them into one master reducer.

Nothing too fancy here, but we do need to create a users reducer because we're importing it in this file. 

### Creating the users reducer

Normally, this reducer would contain a lot of reducer actions and updates to state, specifically the users section of state.

However, by using our pending reducer factory, we can abstract a lot of this potentially repetitive code away from our users reducer. 

We'll make a new file, `usersReducer.js` and code out the following:

```JavaScript
import ReducerFactory from "./reducerFactory";

const factory = new ReducerFactory("users", "users");

export const reducer = factory.reducer;
export const actions = factory.actions;
export default reducer;
```
Don't worry, we'll create the reducer factory in a moment, but for now, just look at the simplicity of this users reducer. We import our factory and create an instance of it, supplying two arguments, a name for the reducer (e.g. 'users') and the name of the slice of state that we'll be amending (e.g. also 'users').

Of course, both our reducer name and slice of state happen to be 'users' in this case. However, you might have different names to distinguish them, so it's useful to be able to supply two different arguments. 

You could refactor this to use default arguments to reduce this doubling up of names, but that's an article for another day.

Finally, we export our reducer and the actions that will be created and returned by our factory. 

### Wiring up our new Redux approach

Finally, to make everything talk to each other, we need to fire up the `index.js` file and hook up our new root reducer to the Redux store and plug it into the main entry point of our app.

It looks like this:

```JavaScript
// ...other imports

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducers";

import App from "./App";

const store = configureStore({
  reducer: rootReducer
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
```
The `<Provider store={}>` line is a common Redux pattern and is essentially a type of [React context](https://reactjs.org/docs/context.html). The interesting parts that we're concerned with here, is the importing of the `configureStore` from the starter kit and the root reducer we just made.

All we need to create a Redux store is the `configureStore` method. We pass in an options object that contains a single property, `reducer` , and our root reducer and that's it!

## 2, Create the reducer factory

Now we have our smaller, handier version of Redux installed and configured, it's time to set up our reducer factory. Unsurprisingly, our reducer factory will be a central production class that will create and output very common, CRUD-style reducers. 

It will reduce a lot of duplication when it comes to reducers that essentially do very common actions, such as getting lists of things.

Here's our reducer factory class:
﻿
```JavaScript
import { createSlice } from "@reduxjs/toolkit";
import initialState from "./state";

class ReducerFactory {
  constructor(slice, state) {
    const reducerResult = createSlice({
      name: slice,
      initialState: initialState[state],
      reducers: this._generateReducers()
    });

    this.reducer = reducerResult.reducer;
    this.actions = reducerResult.actions;
  }

  _generateReducers = () => {
    return {
      // get our list of items
      requestGetItems: (state, action) => {
        state.isLoading = true;
      },
      requestGetItemsSuccess: (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      },
      requestGetItemsError: (state, action) => {
        state.isLoading = false;
      }
    };
  };
}

export default ReducerFactory;
```
Starting from the top, we import the `createSlice` method from the starter kit. This really is where the Redux Starter kit shines. `createSlice` auto-generates our action types and action creators for us, which saves a lot of, frankly, tedious code. 

We supply it with a slice name, the section of state we wish to act upon and a list of reducers to alter that section of state.
﻿
```JavaScript
const reducerResult = createSlice({
    name: slice,
    initialState: initialState[state],
    reducers: this._generateReducers()
  }); 
```
We're doing this in the reducer factory's constructor to take advantage of our `slice` and `state` arguments. We also imported `initialState` from our state file and found the section we need using our `state` argument.

The `createSlice` function returns an object that contains the created reducer and actions, which we assign to our reducer factory instance like so:
﻿
```JavaScript
this.reducer = reducerResult.reducer;
this.actions = reducerResult.actions;
```
Finally, we create our reducers in the private function, `_generateReducers()`.

```JavaScript
_generateReducers = () => {
  return {
    // get our list of items
    requestGetItems: (state, action) => {
      state.isLoading = true;
    },
    requestGetItemsSuccess: (state, action) => {
      state.isLoading = false;
      state.list = action.payload;
    },
    requestGetItemsError: (state, action) => {
      state.isLoading = false;
    }
  };
};
```
This function returns an object populated with a series of reducer function properties. 

For now, we're only creating three reducers that handle a GET mechanism, but you could expand this to handle updating, adding and deleting, and more. We have three because there are three states of dealing with our API: fetching in progress; fetch successfully completed; fetch error.

### Editing state directly

One of the mantras you'll discover when using React and certainly Redux, is that **state is immutable** and that **state should never be edited directly**. 

And yet, in our reducer factory, we're directly setting state properties — `state.isLoading = false;` . Why is this?

Well, behind the scenes, the Redux Starter Kit is kindly taking care of the hard work of mirroring state, updating this mirror, and assigning our app state to this new, updated version. 

What this means for us, is that instead of lengthy code where we have to carefully manipulate a copy of state (trust me, this get very cumbersome with nested objects and arrays), we just use our good old `=` to — seemingly — edit state directly with our changes. 

## 3, Create the data handler

The penultimate piece in the puzzle is to remove all of the Redux interactions and API handling into a new utility class, the data handler. 

Our new `dataHandler.js` looks like this:

```JavaScript
class DataHandler {
  constructor(dispatch, actions, baseUrl) {
    this.dispatch = dispatch;
    this.actions = actions;
    this.baseUrl = baseUrl;
  }

  getAll = () => {
    this.dispatch(this.actions.requestGetItems());

    return fetch(this.baseUrl)
      .then(response => response.json())
      .then(json => this.dispatch(this.actions.requestGetItemsSuccess(json)));
  };
}

export default DataHandler;
```
This deceptively simple class can reduce a ton of repetitive code from our app. We need to supply it with three arguments:

- a `dispatch` function that will trigger our state actions
- an `actions` object that is unique to the area of state we're dealing with
- and a `baseUrl` that again, is likely to be unique to the area of current interest

It could be expanded for other CRUD operations, such as updating and deleting. For now, however, let's just deal with the common getting of items from an API.

You can see how we combine both dispatch methods to inform our app that we're starting a request (`requestGetItems`) and for handling our state update when we return with a list of users (`requestGetItemsSuccess`). 

This neatly combines our state management calls with our data provisioning via an API into a nice, clean handler paradigm. 

The one thing we've ommited here is dealing with errors from the API. That's where we'd do some app logging, inform the user about the error and dispatch our `requestGetItemsError` reducer. 

## 4, Refactor our App component

Finally, to connect all the dots, we need to plumb our shiny data handler into our main App component. 

As a refresher, here how it looked before:

```JavaScript
import React from "react";

import { connect } from "react-redux";
import { getUsers, getUsersSuccess } from "./actions";

import "./styles.css";

class App extends React.Component {
  handleLoadUsersClick = () => {
    this.props.onLoadUsersClick();

    // let's do our api call
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => this.props.onLoadUsersComplete(json));
  };

  render() {
    return (
      <div className="App">
        <h1>React, Redux, and Data Handling</h1>
        <h2>An example </h2>
        <p>
          Click the load users button below to start loading users from the api
        </p>
        <p>
          <button onClick={this.handleLoadUsersClick}>Load users</button>
        </p>
        <hr />
        <h3>Users</h3>
        {this.props.loading ? <p>loading...</p> : null}
        {!this.props.loading && this.props.users ? (
          <ul>
            {this.props.users.map(user => (
              <li key={user.id}>
                <strong>{user.name}</strong> | {user.email}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  loading: state.isLoading
});

const mapDispatchToProps = dispatch => {
  return {
    onLoadUsersClick: () => {
      dispatch(getUsers());
    },
    onLoadUsersComplete: users => {
      dispatch(getUsersSuccess(users));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
```
We need to replace the `mapDispatchToProps` with our data handler, and the click handler `handleLoadUsersClick` method with a call to our new data handler.

Here's the updated code:

```JavaScript
// ...other imports

import { actions } from "./usersReducer";
import DataHandler from "./dataHandler";


class App extends React.Component {
  handleLoadUsersClick = () => {
    this.props.dataHandler.getAll();
  };

  render() {
    // ...render implementation
  }
}

// ...mapStateToProps

const mapDispatchToProps = dispatch => ({
  dataHandler: new DataHandler(
    dispatch,
    actions,
    "https://jsonplaceholder.typicode.com/users"
  )
});

// ...rest of file
```
At the top, we import our user actions to pass into the data handler class, and the data handler itself. We have to pass in specific item actions because, although the handler is generic, the data we want to fetch and process is definitely *not*.  

Next we can replace the entire `handleLoadUsersClick()` method with a single call to our data handler's `getAll()` function which takes care of fetching the users from an API and updating our state.

To round off the refactor, we replace the growing list of reducer actions we had previously within the `mapDispatchToProps` function, with a single call to create a new instance of the data handler. We pass in the dispatch function, our item-specific actions object, and a base API url for our data handler to call.

## The final project in action

And here, in all its finished, user-loading glory, is the Code Sandbox space.

<iframe
     src="https://codesandbox.io/embed/redux-data-handler-example-2-mklek?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Redux data handler - example 2"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Useful links

Here's a list of useful links used throughout this article:

- [Code Sandbox](https://codesandbox.io/s/redux-data-handler-example-2-mklek?fontsize=14&hidenavigation=1&theme=dark)
- [React-Redux](https://react-redux.js.org/)
- [Redux Starter Kit](https://redux-starter-kit.js.org)
- [React and Redux, components, API's and data handlers, part one](https://robkendal.co.uk/blog/2020-01-21-react-redux-components-apis-and-handler-utilities/)










