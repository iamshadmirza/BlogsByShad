# Nodejs Lesson 6: Util and Inheritance

Hello everyone, today we are going to learn about the **util** module, a frequently used node.js core module. We will learn about what it is, why it is useful, and how to use it in node.js application development. We will also learn about inheritance in the Node.js JavaScript ecosystem. Let's start.

## Util Module

This lesson and the coming one will cover some of the modules that we generally use in development. One of the modules is **util** and it comes very handy to ease the developer work while debugging. Let's talk more about it by answering the following questions.

### What is the `util` module and why we use it

It's a Nodejs core module that provides helpful **utility** functions. This module helps us in debugging with a set of functions that helps us in tasks like string formatting, debugging, type checking, etc. It can be required in any file using:

```js
const util = require('util');
```

A common task like console logging can become troublesome when we try to print an object that has a link to itself. **Util** module provides a solution to such a problem by its utility function **inspect**. `util.inspect(object)` formats the string beautifully making our job easier. There are a lot of such cases where **util** modules save the day, we will learn about them in the next section.

### Utility functions provided by Util Module

Now, we are going through some of the commonly used utility functions and learn their benefits.

#### 1. util.inspect

As the name suggests, this function is used to inspect any javascript object. It takes an object as the first argument and options as the second argument. Then it returns a string representation of the object for debugging purpose. This also works for circular reference where an object has a link to itself. Example:

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

This function takes a string as the first argument which may contain a format specifier. These format specifier will be replaced by the value passed in the second and following arguments. It is very similar to `print` like format string.  Example:

```js
const util = require('util');  
const string = util.format("Hello %s", "Soshace");
  
console.log(string);

// print "Hello Soshace"
```

Here, `%s` is acting like a placeholder which is then replaced by **"Sochace"** provided in the second argument. There are a bunch of specifiers that includes `%s` for string, `%d` for numbers, `%j` for JSON, `%o` for objects.

#### 3. util.promisify

It takes a function following the common error-first callback style and returns a version that returns promises. By error=first callback styles, we mean the function which takes `(err, value) => {}` as last argument. Example:

```js
// suppose we have a function like this:
const util = require('util');
const fs = require('fs');

fs.readdir('./path-to-folder', (err, files) => {
  console.log(files);
});

// it can be changed into promise as

const readDirectory = util.promisify(fs.readdir);

// then we can use it as a promise, either if .then() approach or async approach

readDirectory('./path-to-folder')
  .then(files => {
    // do something
  })
  .catch(error => {
    // log error
  });
```

#### 4. util.callbackify

It is basically opposite of what we doing in *util.promisify* function. It takes an async function (or a function that returns a Promise) and returns a function following the error-first callback style. Example:

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

This can be used to check the type of different objects. Let's see how:

You can use `util.types.isAsyncFunction` to check if the passed function is async or not:

```js
util.types.isAsyncFunction(function foo() {});  // Returns false
util.types.isAsyncFunction(async function foo() {});  // Returns true
```

Similarly, to check if the passed argument is a date object, we can do this:

```js
util.types.isDate(new Date());  // Returns true
```

`util.types` provides a lot of helpful type check function. You can take a look at the [official documentation](https://nodejs.org/api/util.html#util_util_types).

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

> Learn more about them in the [official docs](https://nodejs.org/api/util.html).

## Inheritance

Inheritance is a concept that is object-oriented programming where we define a class based on what they are, for example, Human. This class then contains functionalities that can be **inherited** or borrowed by the child class, for example: male and female.

These **male** and **female** classes will have functionality specific to themselves whereas all the featured functionality will go under **human** class.

> Object-Oriented Programming a class-based programming paradigm in which everything revolves around classes and its properties. Class is something that defines the core properties and functions. We will read more about this later.

Let's take another example:

Suppose we want to create two different classes **Rabbit** and **Cat**. **Rabbit** has the functionality to walk, eat, drink and jump. While **Cat** has the functionality to walk, eat, drink and meow. You can notice that we have a lot of things in common.

Recall from above where we said **define a class based on what they are**. This means that we can create a class and call it **Animal**. This will contain all the shared functionalities.

```js
// add the shared functionality in Animal class

class Animal {
  constructor (_name){
    this.name = _name; // initialize name of variable
  }
  walk() {
    console.log(this.name, ' is walking');
  }
  eat() {
    console.log(this.name, ' is eating');
  }
  drink() {
    console.log(this.name, ' is drinking');
  }
}

// inherit this functionality in child class Rabbit and Cat

class Rabbit extends Animal {
  constructor() {
    super('rabbit'); // initialize parent class Animal and set name
  }
  jump() {
    console.log('rabbit is jumping');
  }
}

class Cat extends Animal {
  constructor() {
    super('cat'); // initialize parent class Animal and set name
  }
  meow() {
    console.log('cat is meowing');
  }
}
```

Don't get confused with the class and extends keywords. Assume **class** like an entity that binds functionalities together and **extends** is a keyword used to **extend** functionality of the current class to the parent class. We are inheriting all properties of the parent class we extend to. **constructor** is something that is used to initialize variables.

Now we call to use this method likes this:

```js
const cat = new Cat();

const rabbit = new Rabbit();

cat.eat();

cat.meow();

rabbit.jump();

rabbit.drink();

// prints
// cat  is eating
// cat is meowing
// rabbit is jumping
// rabbit  is drinking
```

Although JavaScript is a functional language, we can do object-oriented programming with the help of the class. Inheritance makes it possible to reuse methods without duplicating them and manage our project in a little better way. Don't worry if you haven't got everything yet, we will learn later about this in detail.

That's it for now, see you in the next lesson.
