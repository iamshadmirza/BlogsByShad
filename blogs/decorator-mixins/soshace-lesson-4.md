# Decorators and Mixins
As we saw in the previous article that decorators are a higher-order component that adds extra functionality to the passed component and returns a new enhanced component.   
Before we get to our homework, let's dive deep and understand how decorators and mixins work.  

## What are decorators?
Decorators provide a way of calling Higher-Order functions. **What are Higher-Order functions?** They simply take a function, modify it and return a new function with added functionality. The key here is that they don't modify the original function, they simply add some extra functionality which means they can be reused at multiple places. This special feature makes decorators so powerful.

## Homework
Let's continue with our homework now and create a decorator that adds functionality to open one article and close the rest.
Let's create a file `src/decorators/oneOpen.js`

```js
import React, { Component as ReactComponent} from 'react'
 
export default (Component) => class OneOpen extends ReactComponent {
  state = {
      openItemId: null,
  };

  openItem = openItemId => ev => {
    if (ev) ev.preventDefault();
    this.setState({ openItemId });
  }

  toggleOpenItem = id => ev => {
    if (ev) ev.preventDefault()
    this.setState({
        openItemId: id === this.state.openItemId ? null : id
    });
  }

  isItemOpen = id => this.state.openItemId === id

  render() {
    return (
      <Component
        {...this.props}
        isItemOpen={this.isItemOpen}
        openItem={this.openItem}
        toggleOpenItem={this.toggleOpenItem}
      />
    );
  }
}

```

As we discussed earlier in the decorator example, we wrap can any component and decorate it with new functionality which allows us to reuse our code. For example, toggleOpen functionality can be used with comments, authors and other places too. Let's add this decorator to the `ArticleList` component. 
## Using ES7 Decorators
Let's use the latest ES7 decorators in the `ArticleList` component.

## 1. First, install babel-plugin-transform-decorators-legacy:

```sh
npm install --save-dev babel-plugin-transform-decorators-legacy
```

## 2. Modify `ArticleList`:
```js
import React, { Component }  from 'react';
import Article from './Article';
import oneOpen from './decorators/oneOpen';

//adding decorator
@openOpen
class ArticleList extends Component {

    renderListItem = () => {
      const { articles, isItemOpen, toggleOpenItem } = this.props;
      return articles.map((article) => (
          <li key={article.id}>
              <Article
                article={article}
                isOpen={isItemOpen(article.id)}
                openArticle={toggleOpenItem(article.id)}
              />
          </li>
        );
      });
    }

    render() {
        return (
          <div>
              <h1>Article list</h1>
              <ul>
                {this.renderListItem()}
              </ul>
          </div>
        )
    }
}
 
export default ArticleList;

```


The commons functionalities like `openItem`, `toggleOpenItem`, etc can be extracted to mixins and reused at different places.

Create a file `src/mixins/oneOpen.js`

```js
export default {
    getInitialState() {
      return {
        openItemId: false
      }
    },
    openItem(openItemId) {
      return ev => {
        if (ev) ev.preventDefault()
        this.setState({openItemId});
      }
    },
 
    toggleOpenItem(id) {
      return ev => {
        if (ev) ev.preventDefault();
        this.setState({
          openItemId: id === this.state.openItemId ? null : id
        });
      }
    },
 
    isItemOpen(id) {
      return this.state.openItemId === id;
    }
}
```
Let's update the `ArticleListOld` with the mixin we just created:

```js 
import React, { Component }  from 'react';
import Article from './Article';
import oneOpen from './mixins/on;eOpen'
 
const ArticleList = React.createClass({
    mixins: [oneOpen],
    render() {
        const { articles } = this.props
 
        const listItems = articles.map((article) => <li key={article.id}>
            <Article article = {article}
                isOpen = {this.isItemOpen(article.id)}
                openArticle = {this.toggleOpenItem(article.id)}
            />
        </li>)
        return (
            <div>
                <h1>Article list</h1>
                <ul>
                    {listItems}
                </ul>
            </div>
        )
    }
});
 
export default ArticleList;
```
> Note: Mixins are only compatible with `React.createClass` and not with the new ES6 class constructor. These are deprecated and replaced with better and more powerful Higher-Order components which are basically decorators. React community encourages that you use HOC instead of mixins. https://reactjs.org/blog/2015/01/27/react-v0.13.0-beta-1.html#mixins

If you still want to use mixins in a React components written in ES6 then this can by acheived by following approach: 

```js
import React, { Component }  from 'react';
import Article from './Article';
import oneOpen from './mixins/oneOpen';

class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = React.addons.oneOpen.shouldComponentUpdate.bind(this);
   }
  //component code here
}
```

To conclude, Higher-Order Component and decorator patterns are powerful methods to reuse code at different places. Currently, they are widely used and are a replacement for old mixin syntax. You can still create your mechanism for dealing with mixing functionality between components.
