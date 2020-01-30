
In the last lesson, we learned how to use `Immutable.js` to normalize our articles. Today we are going to do the same with **comments**.  
In the last article when we passed the normalized form of article list, we were passing `id` instead of an actual comment. You can see this by opening any comment.   
To make them visible, we need to create a separate reducer responsible for comments and take the needed comments from there. Just like what we’ve done to the articles, we need to do the same with our comments. Let's start.

## Step 1: Create a `comments.js` reducer inside reducers directory
Let's recall what we did in the previous lesson. We used `normalisedArticle` with `Record` from Immutable.js to create an `OrderedMap`. Then we used this inside reducer. We are going to do the same with comments. 
But first, let's extract out the reduce function we used earlier in a separate file. It's always a good idea to reuse code wherever possible.
```js
//reducers/utils.js
import { OrderedMap } from "immutable";

export function recordsFromArray(RecordType, array) {
  return array.reduce((acc, el) => {
    return acc.set(el.id, new RecordType(el));
  }, new OrderedMap({}));
}
```
Then `articles.js` reducer will change like this:
```js
//... imports
import { recordsFromArray } from "./utils";

const Article = Record({
  id: "",
  date: "",
  title: "",
  text: "",
  comments: []
});

const defaultArticles = recordsFromArray(Article, normalizedArticles);
```
Looks good. Let's move on and create a `comments.js` reducer.
```js
//reducers/comments.js

import {} from "../types";
import { normalizedComments } from "../fixtures";
import { Record } from "immutable";
import { recordsFromArray } from "./utils";

// define comment structure
const Comment = Record({
  id: null,
  user: "",
  text: ""
});

//create OrderedMap of comments
const defaultComments = recordsFromArray(Comment, normalizedComments);

// define initial comments
const INITIAL_STATE = {
  comments: defaultComments
};

// define reducer to return comments
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

## Step 2: Combine `comments.js` reducer with store
Now let's combine this reducer with others in `reducers/index.js`
```js
import { combineReducers } from "redux";
import article from "./articles";
import counter from "./counter";
import filters from "./filters";
//import comments reducer
import comments from "./comments";

export default combineReducers({
  article,
  counter,
  filters,
  comments
});
```

## Step 3: Update usage
We are using the `CommentList.js` component to render a list of comments. Let's connect it with the store and render the normalized comments. Go to `components/CommentList.js`:  

Fist import `connect` function from "react-redux";
```js
//... other imports
import { connect } from "react-redux";
```
Now change the export function and connect it with the store.

```js
// get comments based on id from store
const mapStateToProps = (state, props) => {
  console.log({ props, state });
  return {
    commentObj: props.comments.map(id => state.comments.comments.get(id))
  };
};

//Connect a component with store
export default connect(
  mapStateToProps,
  {}
)(toggleOpen(CommentList));
```
Note that we are going to use `commentObj` as props inside component. In `mapStateToProps`, we will go through the comment array and using the immutable map we will extract our comments (i.e. the comment records) out of state according to their id’s.

Let's update the render function to use `commentObj` from props as follows:
```js
const { commentObj, isOpen, toggleOpen } = this.props;
if (!commentObj || !commentObj.length) return <h3>no comment yet</h3>;

const commentItems = commentObj.map(comment => (
    <li key={comment.id}>
    <Comment comment={comment} />
    </li>
));
```
And we are done. One of the key benefits of using `Immutable.js` is all the operations done on data are immutable by default. This means we can update our filter method inside `reducers/articles.js` like this:
```js
case DELETE_ARTICLE:
    return { ...state, articles: state.articles.delete(action.payload) };
```
We only describe what article should be deleted from the object. If something needs to be added, you use `set()`, and for updates, you use `update()`.
```js
articles.set()
articles.update()
```
You will need it in your future home task. Moreover, `Immutable.js` perfectly works with deep nesting. If you need to update the comments from the article inside the object with all articles, and this object may be inside another object keeping other data, it will be too complicated to write multiple wrapping functions. For such cases Immutable.js has this:
```js
articles.updateIn([id, 'comments'], comments => ...)
```
Let us check. Everything perfectly works!

Visit the codesandbox below to see today's lesson in action.

<a href="https://codesandbox.io/s/reactlessonlesson11-ix31u?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit React_lesson_lesson11" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

We’ve already normalized the data and store articles and comments separately. It will be a great advantage, when we will read data from API as quite often REST API return data in this form. It means, endpoints are responsible for some resources – for example, for an article or comment – and you may not have an API that will be ready to give you a tree-like structure of the article with all comments immediately. This problem can be solved by GraphQL, for example. Relay and GraphQL are React structures – the things Facebook uses for data fetching, but these are quite complicated themes. In general, our API will look like:
```
http://localhost:8080/api/article
```
There will be a separate API for comments:
```
http://localhost:8080/api/comment
```
And we will need to make them work together. So, it will be our upcoming task, when we’ll get all the articles and comments from the real API.  

Further, we will continue to explore Redux API and see what Middleware is. Everything we’ve previously done used to be perfectly described with pure functions. You should do everything with pure functions in Redux – both `action creators` and `reducers`. They receive old data and `action` at the input and return a new object with new articles at the output, without changing anything outside.  

On the other hand, not everything can be described with pure functions, sometimes we may need `side-effects`, which can be any access to API, Logging, Reporting, etc. All these are brought to `middleware `. These are the objects that may be in between the executed `dispatch` for `action` and the moment when it came to your `reducers`.
