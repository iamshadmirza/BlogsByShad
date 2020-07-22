# Homework

Hey everyone, this is the 15th and the last lesson of this React course and I hope you had fun learning along with me. Today, we are going to cover homework from Lesson 14 and add comment API to load comments. We will go through 4 simple steps:

1. Create action types
2. Add action to fetch comments from API
3. Update reducer to receives these comments
4. Update View to render the comments

Let's start 🤩

## Step 1: Create action types

As you may recall from Lesson 13, we need 3 types of action creator to handle 3 phases of request: start, fail and success. Let's create then:

```js
// src/types.js
export const FETCH_COMMENT_REQUEST = "fetch_comment_request";
export const FETCH_COMMENT_SUCCESS = "fetch_comment_success";
export const FETCH_COMMENT_FAILURE = "fetch_comment_failure";
```

## Step 2: Add action to fetch comments from API

We are using `redux-thunk` to handle async requests just like we did with articles.

```js
import { ADD_COMMENT, FETCH_COMMENT_REQUEST, FETCH_COMMENT_SUCCESS, FETCH_COMMENT_FAILURE } from "../types"; // import types

// add three action creators
const requestStart = () => {
    return {
        type: FETCH_COMMENT_REQUEST,
    };
};

const requestSuccess = (data) => {
    return {
        type: FETCH_COMMENT_SUCCESS,
        payload: data,
    };
};

const requestFailed = (error) => {
    return {
        type: FETCH_COMMENT_FAILURE,
        error: error,
    };
};

// add thunk to handle request
export const fetchCommentRequest = (articleId) => {
    return function (dispatch) {
        dispatch(requestStart());

        return fetch(`http://localhost:3001/api/comment?article=${articleId}`)
            .then(
                response => response.json()
            )
            .then(json =>
                dispatch(requestSuccess(json))
            )
            .catch(error =>
                dispatch(requestFailed(error))
            );
    }
};

```

Our comments are coming from `http://localhost:3001/api/comment?article=${articleId}` where we pass `articleId` and get the relevant comments. We will call this action once the user presses the "SHOW COMMENTS" button. Let's move on to the 3rd step and update our reducer.

## Step 3: Update reducer to receives these comments

Now, we are not getting all the comments from `fixtures.js`. That means our `defaultComments` will be an empty array and we will load comments only for those article which the user requests:

```js
// replace normalizedComments with empty array []
const defaultComments = recordsFromArray(Comment, []);
```

Also, the `INITIAL_STATE` will be changes like this:

```js
const INITIAL_STATE = {
  comments: defaultComments,
  isFetching: false, // add flag to know the status of request
  errors: [], // store error if API fails
};
```

Finally, let's update the reducer to support the 3 action creators we wrote above:

```js
export default (state = INITIAL_STATE, action) => {
    //other cases
    case FETCH_COMMENT_REQUEST:
      return { ...state, isFetching: true };
    case FETCH_COMMENT_FAILURE:
      return { ...state, isFetching: false, errors: state.errors.push(action.error) };
    case FETCH_COMMENT_SUCCESS:
      return { ...state, isFetching: false, comments: recordsFromArray(Comment, action.payload) };
    default:
      return state;
}
```

Now, we just have to call the action and get comments from API

## Step 4: Update View to render the comments

`CommentList.js` component is responsible to render all the comments. We are going to dispatch `fetchCommentRequest` action creator from this component and wire it with the "SHOW COMMENTS" button.

```js
import { addComment, fetchCommentRequest } from "../actions"; //import action

class CommentList extends Component {
    // get the comments when users this component is rendered
    componentDidMount(){
        this.props.fetchCommentRequest(this.props.article.id);
    }

    //update render method
    render() {
        // get comments and isFetching from updated INITIAL_STATE
        const { comments, isOpen, toggleOpen, article, addComment, isFetching } = this.props;

        //show loading text request is in progress
        if (isFetching) return <h3>loading...</h3>;

        // show this text if comments are not present
        if (!comments.length) return <h3>no comments yet</h3>;

        const commentItems = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <Comment comment={comment} />
                </li>
            );
        });

        const body = isOpen
            ? (
                <div>
                    <ul>{commentItems}</ul>
                    <CommentForm articleId={article.id} addComment={addComment} />
                </div>
            )
            : null;

        const linkText = isOpen ? "close comments" : "show comments";
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

// directly get comments from state, we are loading comments for one article at a time
// we need isFetching state to show loading text

const mapStateToProps = (state, props) => {
  return {
    comments: state.comments.comments.valueSeq(),
    isFetching: state.comments.isFetching,
  };
};

export default connect(
  mapStateToProps,
  { addComment, fetchCommentRequest } // map action to props
)(toggleOpen(CommentList));

```

We are showing a `loading...` text while the request is in progress. It's a good practice to let the user know that we are fetching something. Once the request is complete, the `isFetching` flag will be false and comments will be rendered. At last, go to `src/components/Article/index.js` and update `CommentList.js` usage:

```js
//...above code
<CSSTransition
    in={isOpen}
    timeout={500}
    classNames="article"
    unmountOnExit
>
    <section>
    {text} <CommentList article={article} />
    </section>
</CSSTransition>
```

Here, we removed props `comments` in `CommentList` as it will be fetched directly when the component mounts for a given article.

Run the app and see if everything is working as expected.  
This is the end of this lesson as well as this course. I hope you had fun while building this app and learning the react concepts. We can't wait to see you on [sochace.com](https://soshace.com). Goodbye until we meet again 🙂.
