# Nodejs Lesson 12: http module and development

Hey everyone, today we will dive deeper into the http module and learn it's functionality. We will learn about what are the function provided that can be helpful and how to use them. We will also learn about nodemon and improve our development process. Let's start.

http module provides us with a bunch of functions, lets take a look at each one by one

## createServer

After loading the http module with the required function, we can use `http.createServer()` to create a new object of the Server class.

```js
const server = http.createServer();
```

This server object is an event emitter so all the methods available to event emitter is available on this object, example: `server.on()`, `server.addListener()`, `server.listen()`, etc. If you remember from earlier lessons, we were using `server.listen(port)` to listens to requests to a particular port.

`http.createServer()` also takes a functions with arguments `request` and `response`. Let's talk more about request and response.

## Request and Response

They are emitted whenever a new request comes to the server. request and response objects are the first and second arguments of the callback function passes the createServer method respectively.  
request is an instance of IncomingMessage class and is used to get info about the incoming requests like url, query params, etc.  
response is an instance of ServerResponse class and has multiple methods associated with response like setHeader, send, end(), etc. We can use these methods to curate an outgoing response before sending.

Whenever a request is received, the `request` event happens and control is delivered to the handler function which we just talked about in the above paragraph. An IncomingMessage object is created by http.Server or http.ClientRequest and passed as the first argument to the 'request' and 'response' event respectively. It may be used to access response status, headers, and data.

When you are aware of the type of request, we move on to dealing with how to serve it. Here comes the `ServerResponse` class instance passes as a response object. It enables us with functionalities like setting status code, headers, adding a message, etc, and send the response. We prepare the response and send it back to the client. This is what we generally refer to as nodejs lifecycle. Let's talk about that with more clarity.

## Nodejs lifecycle

Nodejs is an event-based platform, everything that happens is in reaction to an event. Keep this in mind and let's understand how the node lifecycle works. Javascript is single-threaded means everything runs on a single thread. Nodejs can execute this many requests asynchronously because of a concept called EventLoop. We will learn about the event loop in detail in further lessons but for now, you can consider it juggling through various phases of operations needed to serve a request in a loop fashion. All requests don't have to be in one phase at a time and they all can be served separately. Nodejs uses a callback mechanism where one request calls the operation back to it once it is done processing while other requests are ready to be served.

In short, the whole lifecycle looks like this: Node app boots up and starts executing the script. It starts listening to a port and registers the event. Since we are using event emitter, we instantly get to know whenever a request arrives. The requests enter the event loop and it keeps running until the request is complete. We can exit this loop by calling `process.exit()` and the node will stop running. But we don't often do that because we want to keep listening to the requests. I hope you're able to get some idea about how the whole thing is working. If you're not, don't worry. We will learn the whole EventLoop concept again in the upcoming lessons.

To learn more about http module, visit [nodejs documentation.](https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_http)

## Improve Nodejs development experience

Right now, the node server stops running as soon as it encounters an error. We have to start the server again whenever we do some changes to our code. This looks okay but it is not very productive. Luckily, there is a package that helps us restart the server automatically as soon as we change the code. This improves the whole development experience and reduces our development time by a lot. The package is **nodemon**. Let's install nodemon and learn how to set up it.

## How to setup nodemon

Nodemon is a CLI utility that we can install globally and use with any project locally. It simplifies the whole development workflow so that we don't have to start the server every time we make any change to the source code. To install nodemon, enter this command in the terminal.

```sh
npm install -g nodemon
```

if you're using yarn

```sh
yarn global add nodemon
```

You can also install locally, you will have to install it as dev dependency by adding `--save-dev` instead of `-g`. For yarn, it's `-dev` instead of `global`.

You have all the powers of nodemon now and you can start the server by using this command

```sh
nodemon server.js
```

nodemon is like a wrapper to your node application. It means you can do everything that you will eventually do with node cli only. This also includes passing arguments while running your app.

```sh
nodemon server.js localhost 3000
```

That's it. You have completed the nodemon setup and this will eventually save a lot of development time.