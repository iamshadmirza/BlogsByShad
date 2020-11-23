---
description: In this lesson, we will learn how to build Echo server. We will ping a certain site and get the response in form of echo. By echo, I mean that we will be able to receive message whatever we send. It will be like reflection of our request message just like an echo. We will also learn about status code and headers that are associated with any request.

- create a server
- , if no clear command is given or no response is written, will do nothing. Browser will wait. Explain how req and res works.  If you don’t tell the server “send back a response it will send nothing back. 
- How to receive a message i.e. parse message as query from url
- what is pathname and query
- second parameter of url.parse(req.url, true) makes it object
- what are headers
- talk about 'Cache-control', 'no-cache'
- what are different types of headers we can use

---
# Node.js Lesson 11: Echo Server

![cover](./nodejs-l11.png)

Hello everyone, today we are going to learn about Echo Server. We will go through what are they and how to build them. We will also use this little project to learn about status code and header of a nodejs request.

## What is an Echo Server

Echos are reflection of the sounds. In a similar way, Echo Server is something that returns reflections of the sent message. If we send a message say "Soshace", we will recieve the same message, just like an echo. 

```js
// GET request: http://localhost:3000/echo?message=Soshace
// response: "Soshace"
```

In the above example, client is sending a message to the server. The server then receives the message and send back the same message back to client, hence the name Echo. We can use this type of Echo Server to check if our application is working properly.

Now, when you have a clear idea of what is an Echo Server, lets create one.

## Create Echo Server

This involves 3 simple steps:

1. Create a server
2. Accept the message
3. Return the message back to client.

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

`req` parameter has bunch of properties which we can use to inspect the type and other info of the request.

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

We have created a server, now we just have to make a request. Go to browser and visit this link:

```text
http://localhost:3000/echo?message=Soshace
```

It will log the method as `GET` and url what we passed in browser. But browser will not return anything. We have not added any code to tell broswer what to do when we receive a request, so it will simply wait and do nothing.

This state can be confusing when we have added code to send back a response but received nothing. We might think that connection has not been established yet. For a workaround. We will return the message if the url has a message. Otherwise, we will simply return a 404 error with a message "Page not found". This way, we can be assured that our connection is established but something is wrong with the url.

So, let's add code to accept and parse message.

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

Here, we are using `url` module to parse the requested url. Right now, we are getting the url as string but we need more control to actually able to access the `message` query. Hopefully, there is a simple solution.

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

We have the query parameter which can be used to get the message query. Let's move on to last step and return the message.

### Step 3: Return the Message back to Client

We are going to check if the url has message query property and pathname is correct. If yes, we will return the message.

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

We also added an else block which will take care of requests when the page url is wrong or message query parameter is not present. You can check this by entering a wrong url.

