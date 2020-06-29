# Lesson 13.1: Asynchronous Actions

Hey everyone, we are going to learn asynchronous actions in this lesson. Up until now, we were using `fixtures.js` to get the articles and comments and our actions were pure functions, which worked fine. But now we will get our data from an API endpoint just like what happens in the real world.  
API calls are asynchronous, it means that there will be a small delay followed by success or failure of an API request. We are going to learn how to handle all these cases. Let's start.

## Setup

If you go to the repo, you will see a simple API already setup. Go into `simple_api` directory and run:

```shell
yarn
```

OR

```shell
npm install
```

This will install all the required packages and you will see a `node_modules` folder created for you.  
Now, we have run the server and development server simultaneously as one will serve the requests `yarn run API` and the other one launches dev server for our app `yarn start`.  
API and dev server both are running on different ports. We have to set up redirection to avoid any сrossdomain requests. Everything that goes to /API will be proxied to your API. It is now localhost:3001, but later it can be some remote address. You set up redirection and will have access to the article from both addresses:

`http://localhost:3001/api/article`

`http://localhost:8080/api/article`

Let's start working on the implementation of API, we don't want to keep using `fixtures.js` with static data.  
At the moment, `API/article` is returning all the articles. We need to limit the number of articles returned in one request as the number can be huge and we might not need everything at first. Moreover, we will make additional requests to get comments separately.  

## The Concept: How it works?

First, let us get a list of articles from API and get them displayed at our traditional address:

`http://localhost:8080`

We will use `fetch` to call request API for articles. Any asynchronous API call can include three important phases that we need to address. We will see what are those and how to handle them using plain old synchronous action creators:

* ### Start of request

    The first phase is when we start fetching data. We need to tell UI that data fetching has been started. We can do this by dispatching an action with a flag `isFetching: true` and then showing a loader/spinner based on this state.

* ### Request finished successfully

    The second phase occurs when the request is completed successfully and we have the desired data in API response. We can then dispatch an action with data as payload and reset the flag `isFetching` to `false`. This will hide the spinner and render the data.

* ### Request failed

    The third phase occurs when the request is failed and we don't have the data to render. In this case, we have to inform the user that something bad has happened and we have met an error. We can dispatch an action with an `error` message and reset the flag `isFetching` to `false`. This will hide the spinner and show the error message.

> Note: Only one phase from phase 2 or 3 happens in any API call. Requests will either be successful or failed.

## Let's code

We have already seen that we will need three types of action creator to handle all 3 cases. These can be defined in `types.js` as:

```js
export const FETCH_ARTICLE_REQUEST = "fetch_article_request";
export const FETCH_ARTICLE_SUCCESS = "fetch_article_success";
export const FETCH_ARTICLE_FAILURE = "fetch_article_failure";
```

We will use `fetch API` in the examples. Because most browsers don't yet support it natively, we have to install `cross-fetch` module first:

```sh
yarn add cross-fetch
```

Let's create the three action creators now:

```js
import { FETCH_ARTICLE_REQUEST, FETCH_ARTICLE_SUCCESS, FETCH_ARTICLE_FAILURE } from "../types";
import fetch from 'cross-fetch';

const requestStart = () => {
  return {
    type: FETCH_ARTICLE_REQUEST,
  };
};

const requestSuccess = (data) => {
  return {
    type: FETCH_ARTICLE_SUCCESS,
    payload: data,
  };
};

const requestFailed = (err) => {
  return {
    type: FETCH_ARTICLE_FAILURE,
    err: err,
  };
};

export const fetchArticleRequest = () => {
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(requestStart());

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`api/articles`)
      .then(
        response => response.json()
      )
      .then(json =>
        dispatch(requestSuccess(json))
      )
      .catch(err =>
        dispatch(requestFailed(err))
      );
  }
};
```

We can dispatch as many times as we want. As you can see from the code above, we are sending flags in the form of `types`. We will update the `isFetching` state as `true` or `false` based on the type we receive at reducer which will inform the view about the three phases on API call discussed earlier.

Finally, we have to handle these actions on the reducer side and then dispatch actions from the view. We will continue with that in the next lesson.

We are looking forward to meeting you on our website soshace.com.
