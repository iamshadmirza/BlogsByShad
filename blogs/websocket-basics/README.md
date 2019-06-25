# WebSocket Simplified
![Cover Image](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/websocket-basics/cover.jpg)  

# What is a Websocket?
WebSocket allows a user to send and receive messages to a server.
So basically, this is a way of communication between Client and Server.
Let's understand this communication first, we will come back to WebSocket in a little while.
## Client and Server
Web browsers (Client) and servers communicate via TCP/IP. Hypertext Transfer Protocol (HTTP) is the standard application protocol *on top of* TCP/IP supporting requests (from web browser) and their responses (from server).  
### How does this work?
Let's go through these simple steps:-  
1. Client (browser) sends a request to the Server.
2. Connection is established.
3. Server sends back the response.
4. Client receives the response.
5. Connection is closed.

This is basically how the communication between Client and Server works. Now get a closer look on step no. 5.  
> Connection is closed.  

The http request has served its purpose and it is no longer needed, hence the connection is closed.

#### What if Server wants to send a message to Client?
Connection must be established successfully to start the communication. The solution here is that Client will have to send another request to establish a connection and receive the message.   

#### How will the client know that server wants to send a message?
Consider this example:-  
*Client is really hungary and has ordered some food online. He is making one request per second to check if the order is ready.*
> 0 sec: Is the food ready?  (Client)  
0 sec: No, wait.  (Server)  
1 sec: Is the food ready?  (Client)  
1 sec: No, wait.  (Server)  
2 sec: Is the food ready?  (Client)  
2 sec: No, wait.  (Server)  
3 sec: Is the food ready?  (Client)  
3 sec: Yes sir, here is your order.  (Server)

This is what you call **HTTP Polling**. 
>Client makes repeated request to the server and check if there is any message to receive. 

As you can see, this not very efficient. We are using unnecessary resources and number of failed request is also troublesome.  
#### Is there any way to overcome this issue?
Yup, there is variation of polling technique which is used to overcome this deficiency and it is called as ***Long-Polling***.
>Long Polling basically involves making an HTTP request to a server and then holding the connection open to allow the server to respond at a later time (as determined by the server).

Consider the **Long-Polling** version of above example:-
>0 sec: Is the food ready?  (Client)  
3 sec: Yes sir, here is your order.  (Server)

Yay, problem solved.   
Not exactly. Although Long Polling works, it is very expensive in terms of CPU, memory and bandwidth (*as we are blocking resources in holding the connection open*).  
Looks like things are getting out of hand now. Let's get back to the main topic: **WebSocket**.
## Why WebSocket?
As you can see, Polling and Long-Polling are both quite expensive options in order to emulate a real time communication between Client and Server. 
>This performance bottleneck is the reason why you would want to use WebSocket instead.   

WebSockets don’t need you to send a request in order to respond. They allow *bidirectional* data flow so you just have to listen for any data.
>You can just listen to the server and it will send you a message when it’s available.

Let's look at the performance side of the WebSocket.
### Resource Consumption
The chart below shows the bandwidth consumption differences between WebSockets vs Long Polling in a relatively common use case:  
![Resource graph](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/websocket-basics/resource_graph.png)  
The difference is huge (for relatively higher number of requests).
### Speed
Here are the results for 1, 10 and 50 requests served per connection in one second:  
![Speed Graph 1](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/websocket-basics/speed_graph.png)  
As you can see, making a single request per connection is about 50% slower using Socket.io since the connection has to be established first. This overhead is smaller but still noticeable for ten requests. At 50 requests from the same connection, Socket.io is already 50% faster. To get a better idea of the peak throughput let's look at the benchmark with a larger number (500, 1000 and 2000) of requests per connection:  
![Speed Graph 2](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/websocket-basics/speed_graph2.png)  

Here you can see that the HTTP benchmark peaks at about~950 requests per second while Socket.io serves about ~3900 requests per second. Effective, right?
>Note: Socket.io is a JavaScript library for realtime web applications. It implements WebSocket internally and provide a better **//Write about this** *(Next Blog post of this series explains Socket.io in detail)*.

## How does WebSocket work?
These are the steps involved in  establishing a WebSocket connection.
1. Client (browser) sends a HTTP request to the Server.
2. Connection is established via HTTP protocol.
3. If the server supports the WebSocket protocol, it agrees to upgrade the connection. *This is called handshake.*
4. Now that the handshake is complete the initial HTTP connection is replaced by a WebSocket connection that uses the same underlying TCP/IP protocol.
5. At this point, data can flow back and forth freely between Client and Server.

# Let's code
We are going to create two files: one server and one client.  
First create a simple `<html>` document named as `client.html` containing a `<script>` tag. Let's see how it looks:-  
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
Now create another another file `server.js`. Now import http module and create a server. Make it listen to `port 8000`.  
This will work as a simple `http` server listening to `port 8000`. Let's look at that too:-  
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

Our basic setup of client and server is done now. That was simple, right? Let's get to the good stuff now.

### Client setup
To construct a **WebSocket**, use the `WebSocket()` constructor which returns the websocket object. This object provides the API for creating and managing a WebSocket connection to the **Server**.  
In simple words, this websocket object will help us establish the connection with server and send & receive data. Let us see how:- 
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
The `WebSocket` constructor expects a url to listen to. Which in our case, is `'ws://localhost:8000'` because that's where our server is running.  
Now this is something different from what you are used to see. We are not using `HTTP` protocal, we are using `WebSocket` protocol. This will tell the client that 'Hey, we are using websocket protocol'. Simple enough? Now let's actually create a WebSocket server in `server.js`.
### Server setup
We are gonna need a third party module `ws` in our node server to use the setup the `WebSocket` server.  
First we will import the `ws` module. Then we will create a websocket server and hand it the `http` server listening to `port 8000`.
>HTTP server is listening to port 8000 and WebSocket server is listening to this HTTP server. Basically, it is listening the listener.

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

Here, the `wss` object will help us listen to the `Event` emitted when the certain thing happens. Like the connection is established or handshake is complete or connection is closed.  
Let's see how to listen to the messages:-
```javascript
const http = require('http');
const websocket = require('ws');

const server = http.createServer((req, res) => {
    res.end("I am connected");
});
const wss = new websocket.Server({ server });
//calling a method on which is available on websocket object
wss.on('headers', (headers, req) => {
    //logging the header
    console.log(headers);
});

server.listen(8000);
```
The method `on` expects two arguments: Event name and callback. Event name to recognize which Event to listen/emit and callback specifies what to do with it. Here, we are just logging the `headers` Event. Let's see what we got:-  
![header log](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/websocket-basics/header.png)  
This is our HTTP header and this is exactly what's going on behind the scenes. Let's break it down to better understand this.  
* First things you will notice is that we got the status code `101`. You may have seen `200`, `201`, `404` status code but this is looks different. `101` is actually the Switching Protocols status code. It says **"Hey, I wanna upgarde"**.
* Second line shows the Upgrade information. It specifies that it wants to upgrade to `websocket` protocol.
* This is actually what happens during the handshake. Browser uses the `HTTP` connection to establish the connection using `HTTP/1.1` protocol and then it `Upgrade` it to `websocket` protocol.

Now this will make more sense.
> `Headers` Event is emitted before the response headers are written to the socket as part of the handshake. This allows you to inspect/modify the headers before they are sent.

>Which means you can modify the Header to accept, reject or anything else as you like. By default, it accepts the request.  

Similarly we can add one more event `connection` which is emitted when the handshake is complete. We will send a message to Client upon successfully establishing a connection. Let's see how :-
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
We are also listening for the event `message` coming from Client. Let's create that: -
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
This is how it looks in browser:-  
!['browser screenshot](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/websocket-basics/client.png)  
The first log is `WebSocket` listing all the properties on websocket object and the second log is `MessageEvent` which has `data` property if you look closely and there we got our message from server.  
The server part will look something like this:-  
!['server log'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/websocket-basics/server.png)  
We got the client's message correctly. Looks like our connection has established successfully. Cheers!  

## Conclusion
Let's get through what we learnt in this post:-
* We have covered how HTTP server works, what is Polling, Long Polling.
* What are WebSockets and why we need them. 
* We covered how they work behind the scene and understood the header a little better. 
* We created our own Client and Server and successfully established the connection between them.

This is the basics of WebSockets and how they work. The next post in series will be cover `socket.io` and the working in more detail. We will also see why exactly we need `socket.io` when things are working just fine with only native `WebSocket()`. Why use a heavy bloated library when we can successfully send and recieve messages just fine?  
Stay tuned for the next post. Do share the post if you find it helpful.  
Shad.

## Reference
* `ws` module for Node server | Docs: https://github.com/websockets/ws/blob/HEAD/doc/ws.md#event-headers
* WebSocket - Web APIs | MDN: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket


