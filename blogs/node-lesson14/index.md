# Nodejs Lesson 15: Async Development

Hello everyone, we are going to learn about async development in this lesson. First, we will learn about what are async tasks and then learn how to handle them. Let's start.

## What is Asynchronous Operation

Asynchronous Operation refers to the flow of execution when something doesn't follow the line by line execution of code but waits for some time. Set timeout is a general of an asynchronous task. What happens when you create a timeout task? JavaScript doesn't wait for it to resolve, the whole flow of execution will be blocked if that happened. JavaScript continues to the next line and sends the timeout call-in event loop. Once the timeout is resolved, it runs that function. Here, two different are happening without blocking resources for the other one.

Let's look at another example: API requests. When you call an API, it doesn't resolve instantly. It takes a little time for it to resolve and JavaScript can continue doing other tasks while the request is in progress. This asynchronous behavior of JavaScript is what makes it so powerful. Now one thing to note here is, the JavaScript won't end the execution of code until the requests resolve either in success or failure. JavaScript will wait for it to resolve even if there is nothing to execute further, at least for a specific time of waiting. Let's talk some more about this with the help of callbacks.

## Callbacks in JavaScript

We can pass a function to any asynchronous function and call it when the request is complete. That passed will be called as callback in javascript. It means that I will call you back later. Let's see how:

```js
setTimeout(() => {
    console.log('timeout');
}, 1000);
```

Here, the setTimeout function takes two arguments: a callback and a timeout interval. The function passed in the first arguments serves as a callback as it will only be called after the delay. We can use such usage of the callback function to handle asynchronous tasks. There are other ways of handling asynchronous tasks. Let's look at promises.

## Promises in JavaScript

JavaScript deals with asynchronous tasks with the help of promises. What is a promise?  
You can understand it as the literal meaning of the term promise. When we say we created a promise, we mean that this function promises us to return some data after some time. Promises will either resolve in success or failure but we can use it to add instructions about what happens when then promise results in success and failure. Let's look at the code.

```js
const promise = new Promise(function(resolve, reject) {
  if(success){
      resolve();
  } else {
      reject();
  }
});
```

The above code is how you create a promise in JavaScript. It takes a function with two arguments: `resolve` and `reject`. We use resolve to end the promise if the request was successful and reject if the request has failed for some reason. Now how to use it?

```js
promise.then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
```

Promises can be chained with `.then()` call which will only be called if the promise was successfully resolved. Similarly, we can chain it with a `.catch()` call which will only be called the promise is failed. We can use these to handle success and failure.

There is one other way to use promises and that is `async/await` syntax. It's just a sugar coat over promises and makes it easy to use as well as provide more readability.

```js
async function (){
    try {
      const result = await promise();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
}
```

the function must be marked with the `async` keyword to use `await` syntax inside it. Code marked with `await` syntax will stop the normal flow of javascript execution and wait for the promise to resolve instead. We wrap the call with a `trycatch` block to handle the case of failure. Let's talk about the usage of promises in the Nodejs environment.

## Handling Promises in Nodejs

In any real-life scenario, it hardly ever happens that we get a response immediately. That means dealing with a lot of asynchronous tasks in production app. Let's consider this example where we try to read file content:

```js
const http = require('http');
const fs = require('fs');
const port = 1337;
const host = 'localhost';
 
const server = http.createServer(function (req, res) {
    const data = fs.readFileSync('index.html');
    res.end(data);
});
 
server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

Here, we are calling `readFileSync` which reads the file synchronously without any delay. Imagine what will happen if the file is present in another location and it gets a little delay to read the file. This won't work. We will have to use callback instead.

```js
const http = require('http');
const fs = require('fs');
const port = 1337;
const host = 'localhost';
 
const server = http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) => {
        if(err){
            return res.status(500).end();
        }
        res.end(data);
    });
});
 
server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

We changed the `readFileSync` method to `readFile`, it's no longer an asynchronous operation. We passed another function after the filename. This function will run after the read file operation is complete. This callback function receives two arguments: error and data. We can use these two to handle both success and failure cases.

Usually using callbacks is not so great because you might stumble upon a problem called **Callback Hell**. Callback Hell is a situation where you keep adding callbacks to other callbacks to handle a series of asynchronous tasks. For this reason, it is preferred to use promises instead.

Now the function `readFile` is callback based function and doesn't support promises so you will have to convert it into a promise first. We can use our good old `util` module for this purpose. Let's see how:

```js
const http = require('http');
const fs = require('fs');
const util = require('util');
const port = 1337;
const host = 'localhost';
 
const server = http.createServer(function (req, res) {
    // convert readFile into a promise based method
    const readFilePromise = util.promisify(fs.readFile);

    // use promise instead
    fs.readFilePromise('index.html').then(data => {
        res.end(data);
    }).catch(error => {
        res.status(500).end();
    })
});
 
server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

We used `util. promisify()` to convert `fs.readFile` into a promise and then used the `.then` chaining method over it. When you have to deal with multiple async tasks, you can keep adding `.then` one after another and avoid the callback hell problem.

Now when we are using promises, we can also use `async/await` syntax to make our code a little more readable.

```js
const http = require('http');
const fs = require('fs');
const util = require('util');
const port = 1337;
const host = 'localhost';
 
// add async to parent function
const server = http.createServer(async function (req, res) {
    // convert readFile into a promise based method
    const readFilePromise = util.promisify(fs.readFile);

    try {
        // wait for promise to resolve
        const data = await fs.readFilePromise('index.html');
        res.end(data);
    } catch (error) {
         res.status(500).end();
    }
});
 
server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

It looks much better and easy to read, don't you agree? So today we learned what is an asynchronous operation. How to handle them using callbacks and promises. We also saw how to use async/await syntax. We learned why using callbacks is not the best option because of callback hell. We looked at a real-life example of how to read files asynchronously with callback, promise and async/await. That's all for today. I hope this lesson was helpful to resolve all your doubts regarding asynchronous operation.