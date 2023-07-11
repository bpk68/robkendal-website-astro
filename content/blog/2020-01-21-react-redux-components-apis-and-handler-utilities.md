---
templateKey: blog-post
title: 'React & Redux: components, API''s and handler utilities'
date: 2020-01-21T13:06:05.233Z
featured: true
featuredimage: /img/react-redux-api-s-and-the-data-hander-part-i-blog-post.png
description: >-
  Learn how to use React and Redux with an API and a data handler utility to act
  as a bridge between our components and application state.
tags:
  - Development
  - JavaScript
  - Tutorials
  - React
---
![Blog header image for the post on react redux and api data handling](/img/react-redux-api-s-and-the-data-hander-part-i-blog-post.png)

If you've been using React for a while, especially in a large, complex app, you'll have undoubtedly come across [Redux](https://react-redux.js.org/). Redux is a state container responsible for maintaining a centralised 'state' of various slices of data in your app. 

However, if you follow a lot of the tutorials out in the wild, Redux is often shown as being used directly within a component. Whilst this is fine and a perfectly valid way to call Redux's actions and dispatchers, when you mix in calls to an API, you can end up with really lengthy and ugly looking code. This becomes harder to maintain, more difficult for new team members to assimilate, and doesn't do as good a job of separating out the data handling concerns.

In this two part series, I'm going to show you the approach we use at [IAM Cloud](https://www.iamcloud.com/) to separate out our API calls into a centralised data handler utility that keeps in touch with our calling component and the Redux state management system.

In this first part, we're going to look at the overall concept of using the trio of React, Redux and an API. We'll look at a very common example of how you can use an API to fetch data, and how to dispatch Redux to update your app's state using reducers and Redux actions.

In part two, we'll look at a real-life, production-ready code example that shows how to implement a data handler pattern and how to shift your Redux state management into its capable hands. 

Sound good? Let's get to it.

## The typical React component, API, Redux mix

The common relationship between a React component, a data API and the Redux framework looks like this:

![A diagram showing how a component, an API and app state interact showing connecting lines between each part](/img/redux-data-handler-diagram.png)

The diagram illustrates the flow from a user interacting with the component, to state updating. An example of this might go something along these lines:

1. The user clicks a button to load a list of users
2. The React component calls the API using a GET request to something like '/users'
3. The API fetches the data and returns its Promise to the component
4. The component then dispatches a Redux action with the API payload (e.g the list of users) 
5. Redux updates app state with the list of users it has been passed
6. The state change is noticed by the component, which takes action to refresh, updating itself with the shiny list of users.

## React, API and Redux in practice

Theory's all good and well, but let's take a look at a real example. If you'd like to have a browse at the code right away, then you can [visit the Code Sandbox I've set up](https://codesandbox.io/s/bitter-bash-js30i?fontsize=14&hidenavigation=1&theme=dark) for this example and take a look.

(**Sidebar**: Now, I'm assuming you're at least a little familiar with Redux; if not in practice, then hopefully in theory. It can be quite a difficult concept to wrap your head around and I've certainly struggled in the early days of using it, but stick with it, as it makes your life really easy once the building blocks are in place. For this example app, I've wired up all the necessary reducers, action creators and state, following the [really clear guides and documentation found on the React-Redux site](https://react-redux.js.org/introduction/quick-start) itself.)

### First things first: creating the skeleton App component

What we're looking for here is a simple button that when you click it, will call an API that returns some user data which is pushed into app state, then is displayed as a nice unordered list.

A bit like this:

![A screenshot of our working app, showing the button click that loads a list of users](/img/example-data-handler-app-flow.png)

To do that, first, we'll set out the building blocks of the App component.

```JavaScript
import React from "react";
    
import "./styles.css";
    
class App extends React.Component {
  handleLoadUsersClick = () => {
    // TODO - we'll handle loading the users from the 
    // API here and some Redux state management.
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
             <li>
               <strong>{user.name}</strong> | {user.email}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}
```

Nothing too fancy here. We've got some plain HTML with a simple button wired up to an internal click event handler `handleLoadUsersClick()` . Under that, we have some props values to show a loading message and display the list of users once we've loaded them and they're available.

### Now to add in the Redux operations

Of course, we'll need to populate these props values from our app state. The props, `loading` and `users` will be supplied from the central state by Redux. However, we need to get them using the [`connect()` function that Redux supplies](https://react-redux.js.org/introduction/quick-start#connect). 

We'll also need to add our Redux actions in and wire them up to our App component. 

To achieve these goals, we need to create two objects (or functions that return objects) which will both map our central state to our props, and map Redux's dispatch service to our props respectively. 

Let's add the `connect()` function to our App component and the two functions that wire up state and dispatch.

```JavaScript
// ...other imports

import { connect } from "react-redux";
import { getUsers, getUsersSuccess } from "./actions";

class App extends React.Component {
	// ...App implementation
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

The main imports section and App implementation remain the same, but we just add in our new imports

```JavaScript
import { connect } from "react-redux";
import { getUsers, getUsersSuccess } from "./actions";
```

To load in the `connect` function from React Redux, and to grab our reducer actions from another file — that's the `getUsers` and `getUsersSuccess` named imports above.

Now, we'll wire up elements of our app state into the App component's props:

```JavaScript
const mapStateToProps = state => ({
  users: state.users,
  loading: state.isLoading
});
```

This is a very typical setup where we create a function that returns an object whose properties map to a number of props that our component can use. In our case, we're using `this.props.users` to create our unordered list of users. 

Next, we create a similar function to map Redux's dispatch function to the component's props object:

```JavaScript
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
```

With this function, we're accepting the Redux dispatch method (which will act upon our actions) and we build and return an object that will also be passed into our App component's props. In this case, we're returning a bunch of functions that our App can call to dispatch Redux actions and, ultimately, update our state.

Finally, we wire up the state props, dispatch props, and our App component using the Redux connect function in this bit of code:

```JavaScript
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
```

### Wiring up the button handler and our API call

The final step in the puzzle to make everything hum is to make our button click handling event actually do something. 

Currently, whilst connected to the `onClick` event of our button, the handler method is looking a little sad and empty:

```JavaScript
handleLoadUsersClick = () => {
  // TODO - we'll handle loading the users from the 
  // API here and some Redux state management.
};
```

So let's populate it with some of our Redux actions and our API call:

```JavaScript
handleLoadUsersClick = () => {
  this.props.onLoadUsersClick();

  fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(json => this.props.onLoadUsersComplete(json));
};
```

The first thing we need to do is call our Redux dispatch method `onLoadUsersClick()`. If you follow the [Code Sandbox example code](https://codesandbox.io/s/bitter-bash-js30i?fontsize=14&hidenavigation=1&theme=dark) through, you'll see that this sets the 'isLoading' flag to 'true'. We're passing this piece of state into our App component's props, and it's being used to show and hide portions of the UI, such as a little 'loading...' message.

Next, we call our API. In this case, I'm using [a handy free tool called JSONPlaceholder](https://jsonplaceholder.typicode.com/). It has a bunch of endpoints that return dummy data, but it's effectively a live API out in the wild. In our case, we're calling the '`https://jsonplaceholder.typicode.com/users'` endpoint that will return a nice set of user data — name, email, address, that sort of thing.

Using the native JavaScript `fetch()` method for this, we call the API, format the response into some JSON, before finally passing this data to our other Redux dispatch function we set up earlier, `onLoadUsersComplete()`. The action it calls updates state by setting our list of users and switching the 'isLoading' flag to 'false'. 

## The complete example

Here is the complete, embedded example of all the code above in all it's working glory.

<iframe
     src="https://codesandbox.io/embed/bitter-bash-js30i?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="Redux data handler - example 1"
     allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
     sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
   ></iframe>

## Why is the above example bad?

It's not...

It's perfectly acceptable code that's relatively clean and tidy and can be followed nicely by a developer's eyes as to what it's doing. 

However (there's always a 'however')...

This example is quite small and very contrived. When you're dealing with real-world apps that are usually much larger and more complex and feature more moving parts, this sort of approach to integrating your API calls with your Redux actions and state management within your components can come with some drawbacks and some areas that can be improved:

* By using `fetch()` directly within our components, we're going to have to repeat a lot of code for things like formatting the response into a suitable form.
* Whilst a component might have to trigger an API call, it generally shouldn't be so closely tied to the API as to have it embedded within itself. From the component's point of view, it would be better for it to simply ask for some data and receive it, not caring from where that data is retrieved.
* Additionally, we're not handling any sort of API error here. If we did, the code would start to grow and it raises the question about whether we add API error handling to each component or abstract it to a more centralised place.
* We have multiple Redux action/dispatch calls to handle the common Redux action pattern of 'doing action', 'action has completed' and 'something went wrong during the action'.
  Take the `handleLoadUsersClick()` event. Here we start with a call to set a loading flag and then dispatch another once the data has come back.
* If we need to manipulate the data in any way before passing to our dispatch events (sometimes data received from an API is not in the exact shape we need) then this will add more code into our small component.
* The list of dispatch functions at the end of our component file is only small now, just two. It's easy to see though how this could grow quite unwieldy over time as we need to add more functions.
* The complexity of testing components built this way increases.

## Useful links

We've used a few services and frameworks across the span of this article, so here's a helpful list of them in once place for your convenience:

* [Redux JS](https://redux.js.org/) - the Redux framework built for JavaScript
* [React Redux](https://react-redux.js.org) - the same Redux framework, with a React focus
* [JSON Placeholder](https://jsonplaceholder.typicode.com/) - a super helpful online API that returns some common fake data

## Coming up in part II

In [part two](https://robkendal.co.uk/blog/2020-01-27-react-redux-components-apis-and-handler-utilities-part-two/), we'll be looking at how to improve this set up for more clarity, as well as abstracting the interactions with the API into a generic data handler utility. We'll even look at how you can create a reducer factory that will handle common state updates, such as updating a list, on your behalf, reducing code and creating a handy convention for your components to follow.

[Continue on to part two](https://robkendal.co.uk/blog/2020-01-27-react-redux-components-apis-and-handler-utilities-part-two/) now.
