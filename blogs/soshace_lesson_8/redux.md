In the previous lesson, we understood the working of Redux by building a Counter app. Now we will apply that knowledge in the current article listing app and go in-depth with React-Redux library. Let's start.

First, we will make some changes to our folder structure. The components including Provider are called container that contains store. Let's create a new folder and add a Root container.
```js
///container/Root.js
import React from "react";
import Articles from "./Articles";
import Counter from "./Counter";
import { Provider } from "react-redux";
import store from "../store";

function Root() {
  return (
    <Provider store={store}>
      {/* <Counter /> */}
      <Articles />
    </Provider>
  );
}

export default Root;
```
Now, change our index file to import the root container
```js
//index.js

import React from "react";
import ReactDOM from "react-dom";
import Root from "./container/Root"; //import Root

const rootElement = document.getElementById("root");
ReactDOM.render(<Root />, rootElement);
```
That's good enough. Let's move on to React-Redux in our main application.

## Use Redux to serve our articles
Redux divides objects into “containers” and “components.” “Smart” components are those connected with “Store” – such as Counter, for example. And some components simply receive data and render them. Now we’ll have two containers – `Counter` and `ArticleList`.
Now we will add Redux with ArticleList. Let's get a quick idea of how we are gonna do it:  
1. Create a reducer to serve all the articles.
2. Connect ArticleList to store which will render the article list.
3. Write an action to delete any article.
4. Dispatch the action to filter out an article from the article list.

Let's dive into code

## 1. Create a reducer to serve all the articles
We already created a `counter` reducer inside the "reducers" folder in the previous. Similarly, we will create an "articles" reducer and export it.
```js
//reducers/articles.js

//import the article array
import { articles as defaultArticles } from "../fixtures";

//define initial state
const INITIAL_STATE = {
  articles: defaultArticles
};

//create a basic reducer function to return state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```
Let's recall reducers from the previous lesson, "Reducers are just pure functions that return a new state every time we dispatch an action which in turn re-render the View."

Previously we had just a single reducer "index.js" which we split into two separate reducers "articles.js" and "counter.js". We will "combineReducers" from the "redux" library to combine and export them to the store.

```js
//reducers/index.js

import { combineReducers } from "redux";
import article from "./articles";
import counter from "./counter";
export default combineReducers({
  article,
  counter
});

```

## 2. Connect ArticleList to store which will render the article list.
Components that are connected to the store are called containers. We are going to create an "Articles" component inside the "container" folder and connect it with the store.
```js
//container/Articles.js

import React from "react";
import { connect } from "react-redux";
import ArticleList from "../components/ArticleList";

function Articles(props) {
  const { articles } = props;
  return <ArticleList articles={articles} />;
}

const mapStateToProps = state => {
  return {
    articles: state.article.articles
  };
};

export default connect(
  mapStateToProps,
  {}
)(Articles);

```
We are using the "connect" function from the "react-redux" library to connect the "Articles" component with the store. As we learned in the previous lesson, `connect` in a Higher-Order function that receives two arguments:  
* mapStateToProps
* mapDispatchToProps

`mapStateToProps` enables us to use state from reducer inside our component. We used "articles" from the reducer state and passed it as props above. We are using actions here so we will leave the second argument empty for now.

# 3. Write an action to delete any article
We wrote two actions "increment" and "decrement" in the previous lesson. Similarly, we will write a "deleteArticle" action to delete any article from article array. Let's create an  action type first:
```js
//types.js
export const DELETE_ARTICLE = "delete_article";
```
Action types are defined to avoid spelling mistakes while writing them inside actions and reducers. Now we will create an articles file inside actions folder:
```js
//actions/articles.js

//import action type
import { DELETE_ARTICLE } from "../types";

//define action
export const deleteArticle = id => {
  return {
    type: DELETE_ARTICLE,
    payload: id
  };
};
```
Let's recall actions from the previous lesson, "Actions are a piece of code that tells how to change state.". Here, our `deleteArticle` action is getting "id" and passing it to the reducer to filter out the article with that particular "id".  
Previously we had only one action creator as "actions/index.js" which we split them into two separate action creators "articles.js" and "counter.js". They can be exported as:
```js
export * from "./counter";
export * from "./articles";
```
Then the reducer will be updated like this:
```js
//reducers/articles.js

//import type
import { DELETE_ARTICLE } from "../types";
import { articles as defaultArticles } from "../fixtures";

const INITIAL_STATE = {
  articles: defaultArticles
};

//get id from action.payload and return the filtered state
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_ARTICLE:
      const filteredArticles = state.articles.filter(
        article => article.id !== action.payload
      );
      return { ...state, articles: filteredArticles };

    default:
      return state;
  }
};
```
Now we just have to dispatch the action from view.

## 4. Dispatch the action to filter out an article from the article list.
The best place to dispatch the `deleteArticle` action is when a user clicks any article. Let's connect the `Article` component which is rendering each article to store.
```js
//components/Article/index.js

import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentList from "../CommentList";
import "./style.css";
import { CSSTransition } from "react-transition-group";

//import connect and action 
import { connect } from "react-redux";
import { deleteArticle } from "../../actions";

class Article extends Component {
  static propTypes = {
    article: PropTypes.object.isRequired
  };

  handleDelete = event => {
    event.preventDefault();
    // get action from props
    const { article, deleteArticle } = this.props;
    deleteArticle(article.id);
  };

  render() {
    const {
      isOpen,
      openArticle,
      article: { title, text, comments }
    } = this.props;
    return (
      <div className="article">
        <h1 onClick={openArticle}>{title}</h1>

        //call deleteAction on button click
        <a href="#" onClick={this.handleDelete}>
          delete me
        </a>
        <CSSTransition
          in={isOpen}
          timeout={500}
          classNames="article"
          unmountOnExit
        >
          <section>
            {text} <CommentList comments={comments} />
          </section>
        </CSSTransition>
      </div>
    );
  }
}

//connect the article to store
export default connect(
  null,
  { deleteArticle }
)(Article);
```
Here our first argument of "connect" is `null` because we are not using anything from reducer state. The second argument "mapDispatchToProps" takes actions and maps them to props. This will make sure `deleteArticle` action is provided as a prop to the component.

Our Article container with delete functionality is ready. You can visit this codesandbox below to see it in action.

<a href="https://codesandbox.io/s/reactlessonlesson8-sbpn3?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit React_lesson_lesson8" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

# Your home task:

Do Reducer and a part of Store for filters, as well as create the filtering functionality for the articles. It means, in the end, upon choosing a time in the calendar, only those articles added during this time should be displayed. And transmit all these filters from ArticleList to the “filters” component. Handle these filters through Redux – so, ArticleList will display only the filtered data.
