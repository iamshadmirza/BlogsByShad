---
description: talk about frequenty used module in nodejs application development. we will talk about and how to acheive inheritance.

- util
  - what is util why it is used
  - how it is used, what are placeholders
  - what are the helper function it provides that we can generally use
- inheritance
  - talk about that javascript is a functional but we can make it behave like OOP and acheive inheritance
  - talk about how we can acheive inheritance 
  - take help from FFF and give an example on how part
---
# Nodejs Lesson 6: Util and Inheritance

Hello everyone, today we are going to learn about **util** module, a frequently used nodejs core module. We will learn about what it is, why it is useful and how to use it in nodejs applicatio development. We will also learn about inheritance in Nodejs JavaScript ecosystem. Let's start.

## Util Module

This lesson and the coming one will cover some of the modules that we generally use in development. One of the module is **util** and it comes very handy to ease the developer work while debugging. Let's talk more about it by answering the following questions.

### What is `util` module and why we use it

It's a Nodejs core module which provides helpful **utility** functions. This module helps us in debugging with a set of functions that helps us in tasks like string formatting, debugging, type checking, etc. It can be required in any file using:

```js
const util = require('util');
```

A common task like console logging can become troublesome when we try to print an object that has a link to itself. **Util** module provide a solution to such a problem by it's utility function **inspect**. `util.inspect(object)` formats the string beautifully making our job easier. There are lot of such cases where **util** modules saves the day, we will learn about them in the next section.

### Utility functions provided by Util Module

Now, we are going to through some of commonly used utility functions and learn their benefits.

#### 1. util.inspect

As the name suggests, this function is used to inspect any javascript object. It takes an object as first argument and options as second argument. Then it returns a string representation of object for debugging purpose. This also works for circular reference where and object has a link to itself. Example:

```js
const util = require('util');  
  
const obj = {
  a: 5,
  b: 6,
};
obj.self = obj;
  
console.log(util.inspect(obj));

// prints { a: 5, b: 6, self: [Circular] }
```

We can see it also mentions that we have a circular dependency which will be very helpful in debugging.

The **options** paramenter takes an object with bunch of property. Some of the properties are **showHidden**, **depth**, **colors**, **sorted**, etc. You can learn about them in the [documentation](https://nodejs.org/api/util.html#util_util_inspect_object_options).

#### 2. util.format

This function takes a string as first argument which may contain format specifier. These format specifier will be replaced by the value passed in the second and following arguments. It is very similar to `printf` like format string.  Example:

```js
const util = require('util');  
const string = util.format("Hello %s", "Soshace");
  
console.log(string);

// print "Hello Soshace"
```

Here, `%s` is acting like a placeholder which is then replaced by **"Sochace"** provided in second argument. There are bunch of specifiers which includes `%s` for string, `%d` for numbers, `%j` for JSON, `%o` for objects.

#### 3. util.promisify

It takes a function following the common error-first callback style and returns a version that returns promises. By error=first callback styles, we mean the function which takes `(err, value) => {}` as last argument. Example:

```js
// suppose we have a function like this:
const util = require('util');
const fs = require('fs');

fs.readdir('./path-to-folder', (err, files) => {
  console.log(files);
});

// it can be changes into promise as

const readDirectory = util.promisify(fs.readdir);

// then we can use it like a promise, either if .then() approach or async approach

readDirectory('./path-to-folder')
  .then(files => {
    // do something
  })
  .catch(error => {
    // log error
  });
```

#### 4. util.callbackify

It takes an async function (or a function that returns a Promise) and returns a function following the error-first callback style. Example:

```js
const util = require('util');

async function fn() {
  return 'hello world';
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, string) => {
  if (err) {
    // log error
  };
  // do something
  console.log(string);
});

```

#### 5. util.types

This an be used to check type of different object. Let's see how:

You can use `util.types.isAsyncFunction` to check if the passed function is async or not:

```js
util.types.isAsyncFunction(function foo() {});  // Returns false
util.types.isAsyncFunction(async function foo() {});  // Returns true
```

Similarly, to check if the passed argument is a date object, we can do this:

```js
util.types.isDate(new Date());  // Returns true
```

#### 6. util.getSystemErrorName(err)

This functions return error string for numeric error code in Node.js.  Example:

```js
const util = require('util');
const fs = require('fs');
fs.access('file/that/does/not/exist', (err) => {
    const name = util.getSystemErrorName(err.errno);
    console.error(name);
    // print ENOENT
});
```

`util.types` provides a lot of helpful type check function. You can take a look at the [official documentation](https://nodejs.org/api/util.html#util_util_types).

> Learn more about them in the [official docs](https://nodejs.org/api/util.html).

## Inheritance
