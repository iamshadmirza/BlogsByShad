# Nodejs Lesson 15: Internals of Nodejs: LibUV

Hello everyone, today we are going to talk about the internals of Nodejs. This article will guide how node js works and how it can handle async tasks. What will happen if ten requests come at once? Will it handle one request and discard the other 9? or will it create a queue and serve each one by one. We will answer all these questions in this and coming lesson. Let's start

## Main engine behind Nodejs: LibUV

LibUV is the core engine that powers Nodejs. LibUV provides support for asynchronous I/O operations. It's a C based library primarily created for Nodejs and used by Luvit, Julia, pyuv, and some other software.

LibUV enforces an asynchronous, event-driven style of programming. It uses event loops to handle asynchronous tasks effectively. It also supports non-blocking network support, asynchronous file system access, etc.

By "event-driven" programming, we mean it watches for events to occur and then handle them when they occur. As we saw in the Event Emitter lesson earlier, we created an event listener who was "listening" to the event. We then wrote a handler function, which got called when that particular event occurs. The monitoring of events happening in the system is managed by LibUV using something that we call Event Loop. This Event Loop usually keeps running forever.

The responsibilities of LibUV are cross-platform input-output operations, handling files & networks, and support the event loop. You're not going to interact with these yourself. Still, this knowledge is good to have to understand the working of Nodejs better. We will learn about Event Loops in the next lesson so let's know the other now.

## A few essential concepts in LibUV

To understand LibUV better, we will have to understand the following three concepts first and then about more on LibUV by keeping these three in mind.

LibUV provides two abstractions to work with: handles and requests. 

1. **Handles:** Handles represent long-lived objects capable of performing certain operations while active.  When it completes the job, handles will invoke the corresponding callbacks. As long as a handle is active, the event loop will continue running. Some examples of handles are TCP servers that get their connection callback called every time there is a new connection, timers, signals, and child processes.
2. **Requests:** Abstractions for short-lived operations. In contrast to handles that are considered as objects, requests can be thought of as functions or methods. Requests are used to write data on handles. Like handles, active requests will also keep the event loop alive.

Another essential concept in LibUV is thread pool. LibUV delegates all the heavy work to a pool of worker threads.

3. **Thread pool:** The thread pool takes care of the file I/O and DNS lookup. All the callbacks, however, are executed on the main thread. Since Node 10.5, worker threads can also be used by the programmer to run Javascript in parallel.

## More on working with threads in LibUV

The libuv module has a responsibility that is relevant for some particular functions in the standard library. For some standard library function calls, the node C++ side and libuv decide to do expensive calculations outside of the event loop entirely. LibUV creates something called a thread pool. This thread pool consists of four threads by default. These threads can be used for running computationally intensive tasks such as hashing functions. Many of the functions included in the standard node library will automatically make use of this thread pool.

If you have too many function calls, It will use all of the cores. CPU cores do not actually speed up the processing function calls. They allow for some amount of concurrency inside of the work that you are doing.

libuv doesn't use thread for asynchronous tasks, but for those that aren't asynchronous by nature.
As an example, it doesn't use threads to deal with sockets. It uses threads to make synchronous fs calls asynchronous.

The I/O (or event) loop is the central part of libuv. It establishes the content for all I/O operations, and it's meant to be tied to a single thread. One can run multiple event loops as long as each runs in a different thread.

LibUV helps in handling:
1. File I/O includes file watching, file system operations, etc
2. Child processes (the child-process module in Node)
3. A pool of worker threads to handle blocking I/O tasks
4. Synchronization primitives for threads.

Let us look at what's happening at launching a server of this kind as an example:

```js
const http = require('http');
const fs = require('fs');
 
const server = new http.Server();

server.on('request', function(req, info) {
 if (req.url == '/') {
     fs.readFile('index.html', function(err, info) {
         if(err) {
             console.error(err);
             res.statusCode = 500;
             res.end("A server error occurred ");
             return
         }

         res.end("info");
     });

 } else { /*404 */ }
});
 
server.listen(3000);
```

First JavaScript gets active. It connects the modules:

```js
const http = require('http');  
const fs = require('fs');
```

and it creates an object

```js
const server = new http.createServer();
```

It gives a handler:

```js
server.on('request', (err, info) => {});
```

At this point, it doesn't matter what is inside the function because a handler hasn't been activated yet. The last string is a call for the "listen" command.

```js
server.listen(3000);
```

Getting to Node.js, the command goes through its C++ code and becomes an internal method call `TCPWrap::listen`. This internal method calls `uv__listen`, which executes the whole work.

Depending on an operational system, it hangs a connection handler on this port. For instance, the Unix system requires a system call "listen." So, LibUV appoints a connection handler for this port. This action's result gets upwards in the chain. That's it for today. We will learn about Event Loops in the next lesson.
