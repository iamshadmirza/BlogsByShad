# WebSocket Simplified
![Cover Image](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/websocket-basics/cover.jpg)
This is a series blog post consisting of two blogs.
First we will learn about the native WebSocket and then Socket.io. Both blogs will detailed and beginner friendly. Let's start.
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
