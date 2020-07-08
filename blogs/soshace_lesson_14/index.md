# Introduction

Hey everyone, we learned how to make async calls via Redux Thunk middleware in the previous lesson. We also learned how to make simple API calls to the server. This knowledge will be enough for 80% of the cases for executing standard tasks.  
In this lesson, we will understand the internals of Redux Thunk and the use cases where we should use it.

## What is thunk and why it is needed

Let's recall what action is. It's just a plain object which tells the reducer about how to update the state. It usually has a `type` property and a `payload` with data in it. Something like this:

```js
{
  type: "ADD_ARTICLE",
  payload: "Text to add"
}
```

The action creators creates this object whenever we need to dispatch an action:

```js
const addArticle = () => {
    return {
        type: "ADD_ARTICLE",
        payload: "Text to add"
    }
}

```

That's it for the action creators and thus comes the limitations with it. An action can only be a plain object and nothing else. Also, the action creator instantly dispatches the action whenever it is called.  

Thunk allows us to return a **function** from this action creator instead of a **plain object** which gives us more control over when to dispatch them and also perform some other operations before dispatching the action. For our case, that other action is **fetching the articles from the server.** You might be already familiar with this functionality as higher-order functions:

```js
const addArticle = () => {
    return {
        type: "ADD_ARTICLE",
        payload: "Text to add"
    }
}

const fetchArticle = () => {
    //return a function instead of plain object
    return function(dispatch, getState){
        //perform some operation before dispatching the action
        dispatch(addArticle);
    }
}
```

The inner function receives two arguments: **dispatch** and **getState**

1. **dispatch:** Dispatches an action to trigger a state change
2. **getState():** Returns the current state tree of your application.

By using these two, we can cover all the complicated cases where a plain object action might fall short. These two come handy when making async API calls as we have already seen in the previous article. Let's see what's happening inside this Redux Thunk middleware.

## Redux Thunk in a nutshell

After installing `redux-thunk`, every action goes through the middleware which looks something like:

```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

Let's see what's happening here. First, we check the dispatched action is a function. If true, it calls the dispatched function and returns whatever it returns.

```js
return action(dispatch, getState, extraArgument);
```

If not, it passes the action to the next middleware or to the Redux.

```js
return next(action);
```

This simple piece of code takes care of all our worrisome tasks. Isn't that amazing?

I hope this article was helpful and you understood the internals of Redux Thunk.

Your Home Task is to do the uploading of comments in a certain way that the comments are to be uploaded from the server upon a show comments click. Thus, the comments uploading will be executed from the address (for example), where the article’s id is contained at the very end:

`http://localhost:8080/api/comment?article=56c782f18990ecf954f6e027`
