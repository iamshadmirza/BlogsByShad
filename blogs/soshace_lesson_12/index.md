In this lesson, we will go through our home task and learn how it is effective to connect store to any component. Our home task was to create a form that takes input and add a comment. Let's start.

## Step 1: Create a form that takes user input

Let's go to `component` directory and add a `CommentForm.js` file. This file will include a form with text input and a button to add comment. We will pass `addComment` function and `articleId` from parent component. We will see that in a minute.

```js
import React, { Component } from "react";
import PropTypes from "prop-types";

class CommentForm extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired,
    articleId: PropTypes.string.isRequired
  };

  state = {
    user: "",
    text: ""
  };

  handleSubmit = e => {
    const { addComment, articleId } = this.props;
    e.preventDefault();
    addComment(this.state, articleId);
    this.setState({
      user: "",
      text: ""
    });
  };

  render() {
    const { text, user } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Comment:</label>
        <input
          value={text}
          onChange={e => this.setState({ text: e.target.value })}
        />
        <label>By:</label>
        <input
          value={user}
          onChange={e => this.setState({ user: e.target.value })}
        />
        <button type="submit">Add comment</button>
      </form>
    );
  }
}

export default CommentForm;
```

### How does the form works?

Let's go into further details of how the form is working. You can see that we are storing `user` and `text` info in store. Whenever user types something in `input`, we take change via `onChange` handler and update the state using `setState`. This state is being passed as the `value` of `input` which we can use later. 

```js
<input
    value={text}
    onChange={e => this.setState({ text: e.target.value })}
/>
```

When the user hits submit button, we call `handleSubmit` function which takes the values from state and dispatches an action to `addComment`. It then resets the state back to it's default state. 

```js
this.setState({
    user: "",
    text: ""
});
```

## Step 2: Include form in CommentList component

Next step is to add this form in `CommentList` component where user will type and add comment. But first, we will restruture our project. CommentList will be connected to store now because will contain the form. Let's move it to `/containers` directory and correct the import paths. After that, let's import the `CommentForm` we just created and use it. I have added comments to you what we are updating.

```js
import React, { Component } from "react";
import Comment from "./../components/Comment"; //update import
import CommentForm from "./../components/CommentForm"; //import CommentForm
import toggleOpen from "../decorators/toggleOpen";
import { addComment } from "../actions"; // action creator that we will create next
import { connect } from "react-redux";

@toggleOpen
class CommentList extends Component {

  render() {
    const { commentObj, isOpen, toggleOpen, article } = this.props; // get article from props passed via parent component
    if (!commentObj || !commentObj.length) return <h3>no comment yet</h3>;

    const commentItems = commentObj.map(comment => (
      <li key={comment.id}>
        <Comment comment={comment} />
      </li>
    ));

    // update body and add CommentForm
    const body = isOpen ? (
      <div>
        <ul>{commentItems}</ul>
        <CommentForm articleId={article.id} addComment={addComment} />
      </div>
    ) : null;

    const linkText = isOpen ? "close comment" : "show comments";
    return (
      <div>
        <button onClick={toggleOpen} ref="toggler">
          {linkText}
        </button>
        {body}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log({ props, state });
  return {
    commentObj: props.comments.map(id => state.comments.comments.get(id))
  };
};

export default connect(
  mapStateToProps,
  {}
)(CommentList);
```

## Step 3: Create addComment action

Let's quickly add a type for action creator and add an action that takes user and comment id then updates the store. Go to `/types.js` and add following line:

```js
export const ADD_COMMENT = "add_comment";
```

Now go to `/actions` directory and add a new file `comments.js`

```js
import { ADD_COMMENT } from "../types";

export const addComment = (comment, articleId) => {
  return {
    type: ADD_COMMENT,
    payload: { ...comment, articleId },
    withRandomId: true
  };
};
```

export this action from root file `actions/index.js`

```js
//other exports
export * from "./comments";
```

We are passing `withRandomId: true` to generate a random id whenever this action is called to differentiate between comments. We can easily do this by adding a middle where that performs this task for us.

### Adding middleware to generate random id for comments

Go to `/middlewares` directory and add a file `randomID.js`

```js
export default store => next => action => {
  const { withRandomId, ...rest } = action;
  if (!withRandomId) return next(action); // if withRandom is false, continue as usual

  next({
    ...rest,
    randomId: Date.now() + Math.random() // generate and append random id with the rest of the payload if withRandom is true
  });
};
```

Now, add this in `store`

```js
//...imports
import randomId from "../middlewares/randomID"; //import randomID middleware

const enhancer = compose(
  applyMiddleware(dumbMiddleware, logger, randomId), // apply middleware
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducer, {}, enhancer);

export default store;
```

We are good to go now 👍🏼

## Step 4: Update reducer to add comments

Go to `reducers/article.js` and add a switch case for `addComment` action.

```js
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //add the below case
    case ADD_COMMENT:
      return state.articles.updateIn(
        [action.payload.articleId, "comments"],
        comments => comments.concat(action.randomId)
      );
    default:
      return state;
  }
};
```

And the last thing. Take a look at `reducer/articles.js`, in particular at Record :

```js
const Article = Record({
    "id": "",
    "date": "",
    "title": "",
    "text": "",
    "comments": []
})
```

It is an immutable structure. And while you won’t do anything with the primitives, it is quite possible to do with comments. For example, by using push for comments you mutate them with this method, since it is a simple array. With this action you lose everything that  immutable structures bring to you. When you change something inside, Immutable.js thinks nothing has really changed. So we have to take care about that.

Now we have to do is pass `article` to `CommentList` component. Go to `components/Article/index.js` and  pass article:

```html
//...
<section>
    {text} <CommentList article={article} comments={comments} />
</section>
//...
```

We are done with your home task. One thing can do in add a helper in `component/Article.js` comment that filters data and connect it with store.

```js
const mapStateToProps = state => {
  return {
    articles: filterArticles(state.article.articles, state.filters)
  };
};

export default connect(
  mapStateToProps,
  {}
)(Articles);
```

Here, `filterArticle` is a helper function that filters our data and makes our component "smart" in choosing when to re-render. Let's quickly write that helper:

```js
function filterArticles(articles, { from, to, selectedArticles }) {
  return articles
    .valueSeq()
    .filter(article =>
      selectedArticles.length ? selectedArticles.includes(article.id) : true
    )
    .filter(
      article =>
        (!from || Date.parse(article.date) > from) &&
        (!to || Date.parse(article.date) < to)
    );
}
```

Redux will check whether the list of filtered articles corresponds to the previous one and will conclude that nothing needs to be updated. That’s why we add connect whenever we need to refer to the data we lack at the moment. We need to choose: to take the data at a higher level or add connect at a lower level.

That's it for today's lesson. I hope you understand how to work forms and use connect function better. Carefully learn and analyze everything we’ve done in frames of your home task and we will move on. Good luck, see you later!
