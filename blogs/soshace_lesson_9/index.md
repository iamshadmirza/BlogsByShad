Hey everyone! Today we will start our lesson with your home task and do it together. Our main goal of these lessons is to learn how to keep data. When data should be kept in store and when in the local state of the components. So, let us discuss it now.

Theoretically, the store should contain all information needed to describe your app meaning that your state components are empty, but in practice it is different and there is no sense to move some elements from state to store.  
For example, while working with forms every click changes get registered in the state, which is too much.  
Working with standard apps you should keep in store the data that will be enough for full restoring of your app. It gives an understanding of what can be sacrificed when writing an app. For instance, if a user reloads a page and a calendar gets closed, which is not that important, it can be added to the state. 
>The things you won’t regret to lose should be stored in the local state. 

For example, the number of articles is essential for you, which means if some articles get deleted, you need to know about this. 

> You would like to knows this information even when the page reloads– so, it should be kept in store.  

So, we’ve come to an issue of filters and their creation. Let us make a reducer that will store filter values. Right now all our information is stored in the **ArticleList** component, and we will separate them into an independent component/container.

## Separation of concerns
We want our filter feature separate in a container. We want functionality associated with `Select` and `DayPicker` currently present in `ArticleList` in a separate container.  

Let's get back to our agenda for this lesson and think about the state. Filter info like `"from"` and `"to"` constraints are needed to filter out articles which are present in Redux. This means that we will have to access the Redux store to filter articles.  
We would want to know which articles we filtered even when the app reloads. So based on these facts, storing filter information in redux is better in our case. Let's code:

## Step 1: Create filters.js reducer
Let's add an action type inside types.js

```js
// types.js

//...
export const CHANGE_FILTERS = "change_filters";
```
Now, create a file `filters.js` inside reducers directory
```js
//import action type
import { CHANGE_FILTERS } from "../types";

// define initial state which we used in ArticleList component
const INITIAL_STATE = {
  selectedArticles: null,
  from: null,
  to: null
};

// define reducer function
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_FILTERS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};
```

Finally, import this reducer inside `/reducers/index.js`
```js
import { combineReducers } from "redux";
import article from "./articles";
import counter from "./counter";
import filters from "./filters";

export default combineReducers({
  article,
  counter,
  filters
});
```

## Step 2: Create `filters.js` action
We have to pass `id` when we dispatch an action to the reducer. Let's write an action for that: 
```js
import { DELETE_ARTICLE } from "../types";

export const deleteArticle = id => {
  return {
    type: DELETE_ARTICLE,
    payload: id
  };
};
```

## Step 3: Create a View and connect with the store
Let us create Filters.js in the Containers folder. We will add everything we need for filters right here:

```js
// container/Filters.js

import React, { Component } from "react";
import Select from "react-select";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";

//import connect and action
import { connect } from "react-redux";
import { changeFilters } from "../actions";

class Filters extends Component {
  handleSelectChange = selectedArticles => {
    const { changeFilters } = this.props;

    // pass selected article id to action
    changeFilters({
      selectedArticles
    });
  };

  getRangeTitle() {
    // use values from props instead of state
    const { from, to } = this.props.filters;
    return (
      <p>
        {!from && !to && "Please select the first day."}
        {from && !to && "Please select the last day."}
        {from &&
          to &&
          `Selected from ${from.toLocaleDateString()} to
                ${to.toLocaleDateString()}`}{" "}
        {from && to && (
          <button className="link" onClick={this.handleResetClick}>
            Reset
          </button>
        )}
      </p>
    );
  }

  handleDayClick = day => {
    const { filters, changeFilters } = this.props;
    const range = DateUtils.addDayToRange(day, filters);
    changeFilters(range);
  };

  handleResetClick = () => {
    const { changeFilters } = this.props;
    changeFilters({ from: undefined, to: undefined });
  };

  render() {
    const { articles, filters } = this.props;
    // import from filter prop instead of local state 
    const { from, to, selectedArticles } = filters;
    const modifiers = { start: from, end: to };
    const options = articles.map(article => ({
      label: article.title,
      value: article.id
    }));
    return (
      <div>
        {this.getRangeTitle()}
        <Select
          options={options}
          isMulti={true}
          value={selectedArticles}
          onChange={this.handleSelectChange}
        />
        <DayPicker
          className="Selectable"
          selectedDays={{ from, to }}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    articles: state.article.articles,
    filters: state.filters
  };
};

export default connect(
  mapStateToProps,
  {
    changeFilters
  }
)(Filters);
```
Here, we using `articles` and `filters` from reducer with the help of `mapStateToProps` argument of `connect` function. 

We have extracted filter info associated with `Select` and `DayPicker` in a seperate file `Filter.js`. Let's import this Filter inside `ArticleList`:

```js
import React, { Component } from "react";
import Article from "./Article";
import oneOpen from "../decorators/oneOpen";

//import Filters
import Filters from "../containers/Filters";

class ArticleList extends Component {
  renderListItem = () => {
    const { articles, isItemOpen, toggleOpenItem } = this.props;
    return articles.map(article => (
      <li key={article.id}>
        <Article
          article={article}
          isOpen={isItemOpen(article.id)}
          openArticle={toggleOpenItem(article.id)}
        />
      </li>
    ));
  };

  render() {
    return (
      <div>
        <h1>Article list</h1>
        <Filters /> // replace old DayPicker component with Filter
        <ul>{this.renderListItem()}</ul>
      </div>
    );
  }
}

export default oneOpen(ArticleList);
```
Our `ArticleList` component looks much more organized and readable. Yay 🎉

So, in this way, we can store the article's data and filter information separately. Whenever we need it, we take information from both sources – filters, and articles – and filter it. 
As we have filter separated, it works even when we get new articles in the app, the old filter will continue to work until we intentionally change it.

You can visit this codesandbox below to see today's lesson in action.

<a href="https://codesandbox.io/s/reactlessonlesson9-jr586?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit React_lesson_lesson9" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>
