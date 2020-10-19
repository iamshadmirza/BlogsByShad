# Nodejs Lesson 8: Error Handeling

Hello everyone, today we are going to talk about error handling in Nodejs with the help of inheritance. We will see what are general problems that can arise and how to solve. We will also learn how to print the stack trace of an issue to provide a better debugging experience to the developer. Let's start.

## Let's understand the problem within the error handling

Inheritance of a built object from error is different in Nodejs. Let's look at this code snippet:

```js
const util = require('util');  
  
const phrases = {  
  "hello": "Hello",  
  "world": "World"  
};  
  

function getPhrase(name) {  
  if (!phrases[name]) {  
    throw new Error("There is no such pharase: " + name);  
  }  
  return phrases[name];  
}  
  
  
function makePage(url) {  
  if (url != 'index.html') {  
    throw new Error("There is no such page");  
  }  
  
  return util.format("%s, %s!", getPhrase("hello"), getPhrase("world"));  
}  
  
  
const page = makePage('index.html');  
console.log(page);
```

Here, we have two functions to emphasize. The first one is `getPhrase`. It's a dictionary-like function that takes a key and finds its value. If the key passed is not associated with any value then we simply throw an error than the requested phrase is not available.

In the second function `makePage`, we check if the page requested is `index.html`. If yes, we go ahead and execute. If not, we throw an error that there is no such page available.

If you try to run the program now, everything will work perfectly fine since the values for both the function is correct. We are more concerned about what happens when the error is thrown.

Both errors are of different kinds and need to be handled differently. The page not available error is a `404, page not found` error. You must have seen this type of error in the number of sites when you request a URL that is not available.  
The second type "Phrase not found" error is a system notification error. It tells us that the system lacks a vocabulary of the dictionary and needs to be updated. Something like a `500` error code is much better suited in this condition.

Since both of these errors happen at this particular line `const page = makePage('index.html');`, it's pretty difficult to differentiate them from one other and handle efficiently. Both of them belong to the `Error` class: `new Error("There is no such page");`.

The possible solution in this scenario is to separate the classes that are handling these two errors using object-oriented programming principles and let them handle. Let's see how we can do that.

## Creating two classes to handle both types of error

We just saw the problem with using the `Error` class to handle two types of errors. An approachable solution is to create two classes `PhraseError` and `HttpError` for both functions respectively.

For `getPhrase` function, we can do something like:

```js
function getPhrase(name) {  
  if (!phrases[name]) {  
    throw new PhraseError("There is no such phrase: " + name);  
  }  
  return phrases[name];  
}
```

Similarly, we can update `makePage` function like this: 

```js
function makePage(url) {  

  if (url != 'index.html') {  
    throw new HttpError(404, "There is no such a page");  
  }
  return util.format("%s, %s!", getPhrase("hello"), getPhrase("world"));  
}
```

Note that we have added error code `404` to the constructor. Now, we can use inheritance to create these two error classes. Remember `util.inherits` function we learned earlier? We are going to use that here.

First, create `PhraseError` class:

```js
function PhraseError(message) {  
  this.message = message;  
}  
util.inherits(PhraseError, Error);  
PhraseError.prototype.name = 'PhraseError';
```

Let's create `HttpError` in similar fasion:

```js
function HttpError(status, message) {  
  this.status = status;  
  this.message = message;  
}  
util.inherits(HttpError, Error);  
HttpError.prototype.name = 'HttpError';
```

These two classes are simply inheriting all the properties of the Error class while adding some extra functionality. I hope you're with me on this until here.

Let's look at what properties we might need in the class we just created. One thing we surely need is a message, we want to print the error message to the user. The next thing we might need is the error name. This info is also helpful for the developer to understand what type of error he is dealing and it's best to print that along with the error message. The third important thing is the stack, we will talk about it later in this article. Let's update our code to support these two error classes.

```js
const phrases = {
    "hello": "Hello",
    "world": "World"
};

// message name stack
function PhraseError(message) {
    this.message = message;
}
util.inherits(PhraseError, Error);
PhraseError.prototype.name = 'PhraseError';


function HttpError(status, message) {
    this.status = status;
    this.message = message;
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';


function getPhrase(name) {
    if (!phrases[name]) {
        throw new PhraseError("There is no such phrase: " + name);
    }
    return phrases[name];
}

function makePage(url) {
    if (url != 'index.html') {
        throw new HttpError(404, "There is no such page");
    }
    return util.format("%s, %s!", getPhrase("*****"), getPhrase("world"));
}

try {
    const page = makePage('index');
    console.log(page);
} catch (e) {
    if (e instanceof HttpError) {
        console.log(e.status, e.message);
    } else {
        console.error("Error %s\n message: %s\n stack: %s", e.name, e.message, e.stack);
    }
}
```

Here, we are intentionally passing the wrong phrase and file name to see what happens when we encounter an error. Now, let's talk about the stack.

## Add stack trace to know where the error occurred

So far, we got everything working fine. The only thing left is to print a stack trace. The error name and message alone are not enough to debug a problem, we also want to know where exactly the error occurred to pinpoint the issue. Luckily, the `Error` class comes in handy in this situation and provides us a function to print a stack trace. Let's see how:

```js
function PhraseError(message) {
    this.message = message;
    Error.captureStackTrace(this); // add this line to print stack trace
}
```

This command acquires the current stack, i.e. a consequence of requests put together that save it to `this` in the current code place, which means in the error object location. Let us take a look at what we’ve got now. Right now the system has outputted stack – the place, where it all occurred. But if we look carefully, the error happened exactly here:

```js
throw new PhraseError("There is no such a phrase: " + name);
```

We are not interested in what is happening inside `PhraseError`, we want to know how we reached this line and what went wrong in the process. 

`captureStackTrace()` comes with a second argument which we can use to get our desired stack trace.

```js
Error.captureStackTrace(this, HttpError);

// OR

Error.captureStackTrace(this, PhraseError);
```

This should work fine now. We learned how to use inherited error object to display appropriate error info as well as the stack trace. This is all for this article. See you in the next article.