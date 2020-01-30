In this lesson, we will learn about middlewares in Redux. We will understand what are they, how we can create one and how to use it in our app.

## What is a middleware?
Middleware provides a way to interact with actions that have been dispatched to the store before they reach the store's reducer. Examples of different uses for middleware include logging actions, reporting errors, making asynchronous requests, and dispatching new actions.

We talked about `side-effect` in the previous lesson and the simplest example of side-effects is Logging.

We will create a logger middleware that logs before, after and when an action is dispatched. Let's get started:

## Step 1: Create a middleware
Create a folder `middlewares`  with a file `logger.js` inside:
```js
export default store => next => action => {
  console.log("---", "before: ", store.getState());
  console.log("---", "dispatching", action);
  next(action);
  console.log("---", "after", store.getState());
};
```
A `middleware` is function that receives `store` and returns a new function. This new function receives `next` (the function for further control delivery) which, in its turn, returns the function accepting action that does something.  
This scheme enables you to have access to the current value of your store, to next and action.  Our store will show immutable.js structures. (it is happening with the help of our `recordsFromArray` from `reducer/utils.js`). And what is more important is that the state of our store can change throughout the lifecycle of this middleware. We will see it right here, in our `logger.js`.

First, we will do **dispatch** of the “before” state and then we'll call next – the delivery of control further. Generally, the whole chain of middlewares exists, and it goes from one to another which means we've handled our action in this middleware and then we deliver management using next to the next one, and whenever middlewares are over, it gets to reducers for being handled there and go to store. Once we are done with the dispatch of this action, we return to our middleware and can get the current state of the store after it has been handled in reducers.

## Step 2: Connect middleware to store
Now we need to connect our middleware to store. Change `store/index.js`:
```js

import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";

//import logger
import logger from "../middlewares/logger";

//define enhancer
const enhancer = compose(
  applyMiddleware(logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

//update createStore
const store = createStore(reducer, {}, enhancer);

export default store;
```
`createStore` can accept three arguments.  
1. reducer
2. [preloadedState]
3. [enhancer]

We have to focus on **enhancer** for now. You may optionally specify it to enhance the store with third-party capabilities such as middleware, time travel, persistence, etc. The only store enhancer that ships with Redux is `applyMiddleware()`.

Now our logger has been added as middleware, look at the work results of our logger within the console in a browser by deleting one of the articles.  

There are many other third-party middlewares available created by developers like `redux-thunk`, `redux-saga`, etc. We can combine multiple middlewares using the `compose` function. Let's create a dummy middleware in `store/index.js` and see how we can use multiple middlewares:
```js
const dumbMiddleware = store => next => action =>
  next({ ...action, addition: "hello world" });

const enhancer = compose(
  applyMiddleware(dumbMiddleware, logger),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);
```
Remember, the order is important here. They are delivered by a chain from the first one to the last one, that’s why logger needs to be put in the very end, while technical middlewares – for example, random id generation – should be added in the beginning.

You can visit the codesandbox below to see Lesson 11 part 1 and part 2 in action.

<a href="https://codesandbox.io/s/reactlessonlesson11-ix31u?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit React_lesson_lesson11" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

## Home Task
Create the function of adding a comment to an article, i.e. the place where comments are added below every article should also contain a form with a button that will enable the user to add a comment to the article. You do not need to store it anywhere else, except for your store.