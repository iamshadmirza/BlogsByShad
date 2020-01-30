In this lesson, we are going to explore how we work with data. As you can see in `fixtures.js`, the data structure we have used so far to display articles is not normalized. Every article contains information about it, it resembles a tree-like structure.
```json
[
  {
  "id": "some_id_here",
  "date": "2016-06-09T15:03:23.000Z",
  "title": "random_title",
  "text": "Text...",
  "comments": [
      {
        "id": 0,
        "user": "User name",
        "text": "comment added ..."
      },
      ...
    ]
  },
  {...similar object},
  ...
]
```
This kind of structure is readable, but it will become two overwhelming once you start changing the data. If you’ve got a pretty complicated structure, where all the dependencies connect – **for example, the article has an author, the comment has an author, and the author has his own page.**  
If you store it in a current state, whenever you want to change the author’s name, you will have to look through all the places where it can theoretically be used and change the data.   

That’s why, before storing the data in stores they get normalized. Normalizing data simply means to store comments, articles, authors, etc separately and store the connections separately as `id`.  
For example, if you’ve got a lot of comments, you can initially store an array with the `id` of these comments.

## Normalize articles
Let us first introduce normalized data structure in rendering articles then we will do the same with comments. We will also change the way we store the data a little bit. Right now the data are stored in the form of a usual array, which is not that handy. If we want to work with the data. We will need to appeal a certain element, so it will be much more convenient to store the data as objects, where id’s of articles are the keys and the article itself is value.

### Step 1: Install Immutable.js
Let us continue our lesson by using the library immutable.js by running this command:
```sh
yarn add immutable
```
or
```sh
npm install immutable
```
`Immutable.js` has various data structures. Few of the most popular are: 
* List is an array analog but immutable. 
* Map is an immutable object analog. 
* OrderedMap is a variation of Map, where you save the sequence of the added elements. 
* Record enables you to describe the structure your element has. 

Let us use Record and OrderedMap in our project.

## Step 2: Normalise Articles with Record and OrderedMap
A record is similar to a JS object, but enforces a specific set of allowed string keys, and has default values. Go to `reducers/articles.js` and define structure like this:
```js
import { DELETE_ARTICLE } from "../types";
//import normalised articles
import { normalizedArticles } from "../fixtures";
//immutable data structure
import { OrderedMap, Record } from "immutable";

//define article record
const Article = Record({
  id: "",
  date: "",
  title: "",
  text: "",
  comments: []
});
```
`Records` always have a value for the keys they define. removing a key from a record simply resets it to the default value for that key. By this, we get a guaranteed structure of your data (articles), and it will always be specially arranged.

`OrderedMap` is a type of Map that has the additional guarantee that the iteration order of entries will be the order in which they were set(). Let us create OrderedMap using this `Article` record.

``` js
import { DELETE_ARTICLE } from "../types";
import { normalizedArticles } from "../fixtures";
import { OrderedMap, Record } from "immutable";

const Article = Record({
  id: "",
  date: "",
  title: "",
  text: "",
  comments: []
});

//create OrderedMap of articles
const defaultArticles = normalizedArticles.reduce((acc, el) => {
  return acc.set(el.id, new Article(el));
}, new OrderedMap({}));

// use it as an initial list of articles to render
const INITIAL_STATE = {
  articles: defaultArticles
};
```
Using the reduce method, we move from the first to the last element of the array by collecting them into another structure – in our case, into immutable object `acc`. Also, there is `el` – an element we’ve been using (the first and the second articles, etc.). And the initial value of acc we start with is a new OrderedMap({})).

## Step 3: Change usage in component
Next, we will need to change our API a little bit, so let us go to `containers/Filters.js` and do the following changes:
```js
const mapStateToProps = state => {
  return {
    articles: state.article.articles.valueSeq(),
    filters: state.filters
  };
};
```
Earlier we thought we would work with the array, and now we receive an object. That’s why we transform it inside the connect. To turn OrderedMap structure into Listarray we call the method `valueSeq()`  – in this case, we’ll get just an article array. 

We can also have some problems within our `Select` component, as we’ve expected to see an array and we get a custom structure.  To avoid any errors, you need to go to  options attribute and modify them into `toJS()`:

```js
<Select
  options={options.toJS()}
  isMulti={true}
  value={selectedArticles}
  onChange={this.handleSelectChange}
/>
```
We will also need to correct `containers/Articles.js` and add `valueSeq()`:
```js
const mapStateToProps = state => {
  return {
    articles: state.article.articles.valueSeq()
  };
};
```
**Why do we call `valueSeq()`?**  

Just because `articles` is an object `(key: value)`, and we want to get values out of it and move them into the array. Following the same steps, you’ve got `keySeq`, to get keys. You do not need to modify anything else, as React perfectly understands `immutable.js`, and its structures. That’s why you do not need to transfer them into the native JS structures.

Our articles are perfectly normalized and in the next lesson, we will extract out comments and normalize that too.  
You can visit this codesandbox below to see this lesson in action.

<a href="https://codesandbox.io/s/reactlessonlesson10-3mugu?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit React_lesson_lesson10" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>
