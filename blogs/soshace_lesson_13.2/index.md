# Lesson 13.2: Wire async Actions

Hey everyone. In the previous article, we used Redux Thunk and learned how to structure actions for asynchronous calls. Now we will update reducer to handle them and then dispatch them from `Articles.js`. Let's update the reducer first.

We are not getting articles from `fixtures.js` now. That means we will initially have an empty array in articles and `defaultArticles` will look something like this:

```js
const defaultArticles = recordsFromArray(Article, []);
```

Now update the initial state:

```js
const defaultState = new Map({
    isFetching: false,
    errors: new [],
    entities: defaultArticles,
});
```

Having the articles added here, we receive a structure that can be reused from one reducer to another, which means entities will contain articles and comments . Our code below will also be changed:

```js
export default (state = defaultState, action) => {
    const { type, payload, response, randomId } = action;
    switch (type) {
        case ADD_COMMENT:
      return {
        ...state, entities: state.entities.updateIn(
          [action.payload.articleId, "comments"],
          comments => comments.concat(action.randomId)
        )};
    case DELETE_ARTICLE:
      return { ...state, entities: state.entities.delete(action.payload) };

    //Add the three cases below
    case FETCH_ARTICLE_REQUEST:
        return { ...state, isFetching: true };
    case FETCH_ARTICLE_FAILURE:
        return { ...state, isFetching: false, errors: state.errors.push(action.error) };
    case FETCH_ARTICLE_SUCCESS:
        return { ...state, isFetching: false, entities: recordsFromArray(Article, action.payload) };
    }
    return state
}
```

As you can see, we have slightly updated our `INITIAL_STATE` which means we have to update the containers where we are consuming this state. Let's start with `Filters.js`:

```js
//just update mapStateToProps

const mapStateToProps = state => {
  return {
    articles: state.article.entities.valueSeq(),
    filters: state.filters
  };
};
```

Now update `containers/Articles.js`. We are going to call action where we are fetching all the articles from the API and update state to get those articles from `entities`:

```js
// add import
import { fetchArticleRequest } from '../actions';

//update component
class Articles extends React.Component {
  componentDidMount(){
    this.props.fetchArticleRequest();
  }

  render(){
    const { articles, isFetching } = this.props;
    if(isFetching) return <p>Loading...</p>;
    return <ArticleList articles={articles} />;
  }
}

//update mapStateToProps
const mapStateToProps = state => {
  return {
    isFetching: state.article.isFetching,
    articles: filterArticles(state.article.entities, state.filters)
  };
};

export default connect(
  mapStateToProps,
  { fetchArticleRequest } //connect action to store
)(Articles);
```

That's it. We have successfully connected actions with reducer and can fetch articles from the API. I hope you understood how to use thunk for asynchronous calls in actions. Go ahead and check it. Lesson code can be found in the [GitHub repo](https://github.com/soshace/react_lessons/tree/Lesson_13).
