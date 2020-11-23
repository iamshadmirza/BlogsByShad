# Node.js Lesson 11: Echo Server

![cover](./nodejs-l11.png)

Hello everyone, today we are going to learn about Echo Server. We will go through what are they and how to build them. We will also use this little project to learn about the status code and header of a nodejs request.

## What is an Echo Server

Echos are a reflection of the sounds. Similarly, Echo Server is something that returns reflections of the sent message. If we send a message saying "Soshace", we will receive the same message, just like an echo. 

```js
// GET request: http://localhost:3000/echo?message=Soshace
// response: "Soshace"
```

In the above example, the client is sending a message to the server. The server then receives the message and sends the same message back to the client, hence the name Echo. We can use this type of Echo Server to check if our application is working properly.

Now, when you have a clear idea of what is an Echo Server, let's create one.

## Create Echo Server

This involves 3 simple steps:

1. Create a server
2. Accept the message
3. Return the message to the client.

### Step 1: Create a server

This is just a boilerplate to start the server. It's very similar to what we have been doing so far.

```js
const http = require('http');
const port = 1337;
const host = 'localhost';

const server = http.createServer(function (req, res) {
    // add code her
});

server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

### Step 2: Accept the message

The `req` parameter has a bunch of properties that we can use to inspect the type and other info of the request.

Let's inspect the method and url of the request.

```js
const http = require('http');
const port = 1337;
const host = 'localhost';

const server = http.createServer(function (req, res) {
    console.log("Method and URL", req.method, req.url);
});

server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

We have created a server, now we just have to make a request. Go to the browser and visit this link:

```text
http://localhost:3000/echo?message=Soshace
```

It will log the method as `GET` and url what we passed in the browser. But the browser will not return anything. We have not added any code to tell the browser what to do when we receive a request, so it will simply wait and do nothing.

This state can be confusing when we have added code to send back a response but received nothing. We might think that connection has not been established yet. For a workaround. We will return the message if the url has a message. Otherwise, we will simply return a 404 error with the message "Page not found". This way, we can be assured that our connection is established but something is wrong with the url.

So, let's add code to accept and parse the message.

```js
const http = require('http');
const url = require('url');
const port = 1337;
const host = 'localhost';

const server = http.createServer(function (req, res) {
    const parsedURL = url.parse(req.url);
    console.log('parsedURL', parsedURL);
});

server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

Here, we are using the `url` module to parse the requested url. Right now, we are getting the url as a string but we need more control to able to access the `message` query. Hopefully, there is a simple solution.

Just pass `true` in second argument to `url.parse()` and it will parse the url as object. We can then use it as object to get the disired properties. Let's see how:

```js
const http = require('http');
const url = require('url');
const port = 1337;
const host = 'localhost';

const server = http.createServer(function (req, res) {
    const parsedURL = url.parse(req.url, true);
    console.log(parsedURl.pathname, parsedURl.query);
    // logs "/echo", { message: "Soshace"}
});

server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

We have the query parameter which can be used to get the message query. Let's move on to the last step and return the message.

### Step 3: Return the Message to Client

We are going to check if the url has a message query property and pathname is correct. If yes, we will return the message.

```js
const http = require('http');
const url = require('url');
const port = 1337;
const host = 'localhost';

const server = http.createServer(function (req, res) {
    const parsedURL = url.parse(req.url, true);
    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
        res.end(urlParsed.query.message);
    } else {
        res.end("Page not found");
    }
});

server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

We also added an else block that will take care of requests when the page url is wrong or the message query parameter is not present. You can check this by entering a wrong url.

We finally created an echo server that accepts the message and returns them to the client. But we are not done yet. The response has a header and status code that provides info about the response. For example, a page not found response has a status code 404 and a successful request has a status code 200. We have to take care of that too.

## Add Status Code

A server categorizes the response with help of a status code. Successful request completion is 200 and a failure at the server side is often seen as status code 500. There are five types of status code that the server issues in response to a request.

- 1xx informational response – the request was received, continuing process
- 2xx successful – the request was successfully received, understood, and accepted
- 3xx redirection – further action needs to be taken to complete the request
- 4xx client error – the request contains bad syntax or cannot be fulfilled
- 5xx server error – the server failed to fulfill a valid request

We will add 2 of these to our server.

```js
const http = require('http');
const url = require('url');
const port = 1337;
const host = 'localhost';

const server = http.createServer(function (req, res) {
    const parsedURL = url.parse(req.url, true);
    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
        res.statusCode = 200; // when request is successful
        res.end(urlParsed.query.message);
    } else {
        res.statusCode = 404; // when request is failed due to wrong url
        res.end("Page not found");
    }
});

server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

I think it looks good enough. Let's take care of the `header` now.

## Add header

Headers are part of every HTTP request and response. They represent metadata about the request/response. They are very helpful when we run into issues and have to find what caused them. They contain information like connection type, cors allowance, authorization, content type, etc.

We can make the request cache-free by adding a cache control header.

```js
const http = require('http');
const url = require('url');
const port = 1337;
const host = 'localhost';

const server = http.createServer(function (req, res) {
    const parsedURL = url.parse(req.url, true);
    if (urlParsed.pathname == '/echo' && urlParsed.query.message) {
        res.statusCode = 200;
        res.setHeader('Cache-control', 'no-cache');
        res.end(urlParsed.query.message);
    } else {
        res.statusCode = 404;
        res.end("Page not found");
    }
});

server.listen(port, host, function () {
    console.log('Web server is running on port 1337');
});
```

Let's learn about what other header options are available.

Authorization: Carries credentials containing the authentication information of the client for the resource being requested.

WWW-Authenticate: This is sent by the server if it needs a form of authentication before it can respond with the actual resource being requested. Often sent along with a response code of 401, which means ‘unauthorized’.

Accept-Charset: This is a header that is set with the request and tells the server about which character sets are acceptable by the client.

Content-Type:  Indicates the media type (text/html or text/JSON) of the response sent to the client by the server, this will help the client in processing the response body correctly.

Cache-Control: This is the cache policy defined by the server for this response, a cached response can be stored by the client and re-used till the time defined by the Cache-Control header.

That's it for now. Will see you in the next article.