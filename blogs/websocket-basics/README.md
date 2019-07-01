# WebSocket Simplified
![Cover Image](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/websocket-basics/cover.jpg)  

# What is a Websocket?
WebSocket allows a user to send and receive messages to a server.
So basically, this is a way of communication between **Client** and **Server**.
Let's understand this communication first, we will return to WebSocket in a while.
## Client and Server
Web browsers (Client) and servers communicate via TCP/IP. Hypertext Transfer Protocol (HTTP) is the standard application protocol *on top of* TCP/IP supporting requests (from the web browser) and their responses (from server).  
### How does this work?
Let's go through these simple steps:-  
1. Client (browser) sends a request to the Server.
2. A connection is established.
3. The server sends back the response.
4. A client receives the response.
5. The connection is closed.

This is basically how the communication between Client and Server works. Now get a closer look at step no. 5.  
> Connection is closed.  

The HTTP request has served its purpose and it is no longer needed, hence the connection is closed.

#### What if Server wants to send a message to Client?
The connection must be established successfully to start communicating. The solution here is that the Client will have to send another request to establish a connection and receive the message.   

#### How will the client know that the server wants to send a message?
Consider this example:-  
*Client is starving and has ordered some food online. He is making one request per second to check if the order is ready.*
> 0 sec: Is the food ready?  (Client)  
0 sec: No, wait.  (Server)  
1 sec: Is the food ready?  (Client)  
1 sec: No, wait.  (Server)  
2 sec: Is the food ready?  (Client)  
2 sec: No, wait.  (Server)  
3 sec: Is the food ready?  (Client)  
3 sec: Yes sir, here is your order.  (Server)

This is what you call **HTTP Polling**. 
>Client makes repeated requests to the server and checks if there is any message to receive. 

As you can see, this not very efficient. We are using unnecessary resources and the number of failed requests is also troublesome.  
#### Is there any way to overcome this issue?
Yup, there is a variation of polling technique that is used to overcome this deficiency and it is called as ***Long-Polling***.
>Long Polling basically involves making an HTTP request to a server and then holding the connection open to allow the server to respond at a later time (as determined by the server).

Consider the **Long-Polling** version of the above example:-
>0 sec: Is the food ready?  (Client)  
3 sec: Yes sir, here is your order.  (Server)

Yay, problem solved.   
Not exactly. Although Long Polling works, it is very expensive in terms of CPU, memory, and bandwidth (*as we are blocking resources in holding the connection open*).  
What to do now? It looks like things are getting out of hand. Let's reach back to our savior: **WebSocket**.
## Why WebSocket?
As you can see, Polling and Long-Polling are both quite expensive options in order to emulate real-time communication between Client and Server. 
>This performance bottleneck is the reason why you would want to use WebSocket instead.   

WebSockets don’t need you to send a request in order to respond. They allow *bidirectional* data flow so you just have to listen for any data.
>You can just listen to the server and it will send you a message when it’s available.

Let's look at the performance side of the WebSocket.
### Resource Consumption
The chart below shows the bandwidth consumption differences between WebSockets vs Long Polling in a relatively common use case:  
![Resource graph](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/websocket-basics/resource_graph.png)  
The difference is huge (for a relatively higher number of requests).
### Speed
Here are the results for 1, 10 and 50 requests served per connection in one second:  
![Speed Graph 1](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/websocket-basics/speed_graph.png)  
As you can see, making a single request per connection is about 50% slower using Socket.io since the connection has to be established first. This overhead is smaller but still noticeable for ten requests. At 50 requests from the same connection, Socket.io is already 50% faster. To get a better idea of the peak throughput we will look at the benchmark with a more extensive number (500, 1000 and 2000) of requests per connection:  
![Speed Graph 2](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/websocket-basics/speed_graph2.png)  

Here you can see that the HTTP benchmark peaks at about~950 requests per second while Socket.io serves about ~3900 requests per second. Effective, right?
>Note: Socket.io is a JavaScript library for real-time web applications. It implements WebSocket internally. Consider this as a wrapper for WebSocket which provides many more features *(Next Blog post of this series explains Socket.io in detail)*.

## How does WebSocket work?
These are the steps involved in establishing a WebSocket connection.
1. The client (browser) sends an HTTP request to the Server.
2. A connection is established via the HTTP protocol.
3. If the server supports the WebSocket protocol, it agrees to upgrade the connection. *This is called handshake.*
4. Now that the handshake is complete the initial HTTP connection is replaced by a WebSocket connection that uses the same underlying TCP/IP protocol.
5. At this point, data can flow back and forth freely between Client and Server.

# Let's code
We are going to create two files: one server and one client.  
First create a simple `<html>` document named as `client.html` containing a `<script>` tag. Let's see how it looks:-  
### Client.html
```html
<html>

<script>
    // Our code goes here
</script>

<body>
    <h1>This is a client page</h1>
</body>

</html>
```
Now create another file `server.js`. Now import HTTP module and create a server. Make it listen to `port 8000`.  
This will work as a simple `http` server listening to `port 8000`. Let's look at that too:-  
### Server.js
```javascript
//importing http module
const http = require('http');

//creating a http server
const server = http.createServer((req, res) => {
    res.end("I am connected");
});

//making it listen to port 8000
server.listen(8000);
```
> run command `node server.js` to start the listening to `port 8000`.  
*Note:- You can choose any port as you like, I just chose 8000 for no specific reason.*

Our basic setup of the client and server is done now. That was simple, right? Let's get to the good stuff now.

### Client setup
To construct a **WebSocket**, use the `WebSocket()` constructor which returns the websocket object. This object provides the API for creating and managing a WebSocket connection to the **Server**.  
In simple words, this websocket object will help us establish a connection with the server and create a bi-directional data flow i.e. *send and receive data from both ends*.  
Let us see how:- 
```html
<html>

<script>
    //calling the constructor which gives us the websocket object: ws
    let ws = new WebSocket('url'); 
</script>

<body>
    <h1>This is a client page</h1>
</body>

</html>
```
The `WebSocket` constructor expects a URL to listen to. Which in our case, is `'ws://localhost:8000'` because that's where our server is running.  
Now, this is might be a little different from what you are used to. We are not using the `HTTP` protocol, we are using `WebSocket` protocol. This will tell the client that **'Hey, we are using websocket protocol'** hence `'ws://'` instead of `'http://'`. Simple enough? Now let's actually create a WebSocket server in `server.js`.
### Server setup
We are gonna need a third-party module `ws` in our node server to use the setup the `WebSocket` server.  
First, we will import the `ws` module. Then we will create a websocket server and hand it the `HTTP` server listening to `port 8000`.
>HTTP server is listening to port 8000 and WebSocket server is listening to this HTTP server. Basically, it is listening to the listener.

Now our websocket is watching for traffic on `port 8000`. It means that it will try to establish the connection as soon as the client is available. Our `server.js` file will look like this: -
```javascript
const http = require('http');
//importing ws module
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end("I am connected");
});
//creating websocket server
const wss = new websocket.Server({ server });

server.listen(8000);
```

As we have discussed before:
> `WebSocket()` constructor returns a websocket object provides the API for creating and managing a WebSocket connection to the **Server**.

Here, the `wss` object will help us listen to the `Event` emitted when a certain thing happens. Like the connection is established or handshake is complete or the connection is closed, etc.  
Let's see how to listen to the messages:-
```javascript
const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end("I am connected");
});
const wss = new websocket.Server({ server });
//calling a method 'on' which is available on websocket object
wss.on('headers', (headers, req) => {
    //logging the header
    console.log(headers);
});

server.listen(8000);
```
The method `'on'` expects two arguments: Event name and callback. Event name to recognize which Event to listen/emit and callback specifies what to do with it. Here, we are just logging the `headers` Event. Let's see what we got:-  
![header log](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/websocket-basics/header.png)  
This is our HTTP header and I want you to be inquisitive about it because this is exactly what's going on behind the scenes. Let's break it down to understand better.  
* First things you will notice is that we got the status code `101`. You may have seen `200`, `201`, `404` status code but this looks different. `101` is actually the Switching Protocols status code. It says **"Hey, I wanna upgrade"**.
* Second line shows the Upgrade information. It specifies that it wants to upgrade to `websocket` protocol.
* This is actually what happens during the handshake. The browser uses the `HTTP` connection to establish the connection using `HTTP/1.1` protocol and then it `Upgrade` it to `websocket` protocol.

Now this will make more sense.
> `Headers` Event is emitted before the response headers are written to the socket as part of the handshake. This allows you to inspect/modify the headers before they are sent.

> This means you can modify the Header to accept, reject or anything else as you like. By default, it accepts the request.  

Similarly, we can add one more event `connection` which is emitted when the handshake is complete. We will send a message to the Client upon successfully establishing a connection. Let's see how:-
```javascript
const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end("I am connected");
});
const wss = new websocket.Server({ server });

wss.on('headers', (headers, req) => {
    //console.log(headers); Not logging the header anymore
});

//Event: 'connection'
wss.on('connection', (ws, req) => {
    ws.send('This is a message from server, connection is established');
    //receive the message from client on Event: 'message'
    ws.on('message', (msg) => {
        console.log(msg);
    });
});

server.listen(8000);
```
We are also listening for the event `message` coming from Client. Let's create that:-
```html
<html>

<script>
    let ws = new WebSocket('url'); 
    //logging the websocket property properties
    console.log(ws);
    //sending a message when connection opens
    ws.onopen = (event) => ws.send("This is a message from client");
    //receiving the message from server
    ws.onmessage = (message) => console.log(message);
</script>

<body>
    <h1>This is a client page</h1>
</body>

</html>
```
This is how it looks in the browser:-  
![browser screenshot](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/websocket-basics/client.png)  
The first log is `WebSocket` listing all the properties on websocket object and the second log is `MessageEvent` which has `data` property. If you look closely, you will see that we got our message from the server.  
The server log will look something like this:-  
!['server log'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/websocket-basics/server.png)  
We got the client's message correctly. This marks that our connection was established successfully. Cheers!  

## Conclusion
To sum up, let's go through what we learned:-
* We have covered how HTTP server works, what is Polling, Long Polling.
* What are WebSockets and why we need them. 
* We covered how they work behind the scene and got a better understanding of the header. 
* We created our own Client and Server and successfully established the connection between them.

This is the basics of WebSockets and how they work. The next post in the series will cover `socket.io` and the working in more detail. We will also see why exactly we need `socket.io` when things are working just fine with only native `WebSocket()`. Why use a heavy bloated library when we can successfully send and receive messages just fine?  
Do share the post if you find it helpful and stay tuned for the next one.  
Shad.

## Reference

* WebSocket - Web APIs | MDN: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
* `ws` module for Node server | Docs: https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-headers