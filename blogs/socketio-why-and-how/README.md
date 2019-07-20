# Socket<span>.io: What, Why and How?
!['cover'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/socketio-why-and-how/cover.jpg)
This is the second blog post in continuation of the series **WebSocket Simplified**. If you haven't read the first part, check it out [here](https://iamshadmirza.hashnode.dev/websocket-simplified-cjxjzcu0m002i3hs1eewt2p80). I insist that you go through the first part to understand this one better. Again, the goal is to keep things as simple as possible. So I'm going to approach this topic a little differently. Let's start.

## Why Socket<span>.io?
In the previous post, we successfully built our basic WebSocket server and client and it was working pretty fine. So, you might be wondering why to use socket.io? why use a heavy bloated library when things are working just fine without it? Let's consider this scenario:-  

Suppose your boss tells you to add real-time communication on the website and you decided to use native WebSocket and not any library whatsoever.  
You coded the WebSockets correctly and it's working fine *EXCEPT* the testing reveals that there are some issues. It's not working properly every time for some reason.  
After some debugging, you found that it's not working when the person is behind a *firewall* or an *antivirus*. So you got to know that: -
> WebSocket doesn't work ideally in presence of Firewall and Antivirus. 

You also found that if the client is behind a proxy or load balancer, then also websocket will not work.
>WebSocket doesn't work ideally in presence of Proxy and Load Balancer either. 

It means you have to deal with all these issues yourself. You worked for a few hours and added extra code to solve all these problems and your WebSocket connection is finally working properly. See the visual representation of what we did so far:-  
!['demo1'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/socketio-why-and-how/demo1.jpg)

Now, suppose the server goes down for some reason and the connection got disconnected. In this situation, the browser is now sitting ideally not doing anything because the handshaking is again necessary to establish the connection. So you have one more thing to do now:-
>Websocket should reconnect automatically in case of disconnection due to server failure or some other reason.

So now you added more code and tackled this problem too. Pretty good, you're a very good developer.  
!['you're awesome'](https://media.giphy.com/media/5C0b4tU550kNGRmJrU/giphy.gif)  
Your boss appreciated your efforts but now he tells you to add support for images (blobs) too.
>Note: We were sending JSON data so far (plain text).

Not only this, you have to add chatroom for group chats, multiple endpoints so that you can connect multiple WebSocket. Also, there might be some old browsers which just doesn't support WebSocket so you have to take care of that too.  
This seems like a lot now, doesn't it?  
!['please save me'](https://media.giphy.com/media/3o7TKEP6YngkCKFofC/giphy.gif)  
With some more code and hard work, you tackled these too. Now your WebSocket implementation looks something like this:-  
!['demo2'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/socketio-why-and-how/demo2.jpg)
>Guess what, this whole collection is actually what you call Socket.io. Check out the image below just to make things crystal clear.

!['demo3'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/socketio-why-and-how/demo3.jpg)

## What is Socket<span>.io?
*Socket<span>.io* uses WebSocket behind the scenes and takes care of all these problems so that we don't have to deal with them ourselves. It's just a wrapper over native WebSocket which provides a bunch of other cool features which makes our job easy as a developer.  
!['phew'](https://media.giphy.com/media/JMV7IKoqzxlrW/giphy.gif)
### By definition
> Socket<span>.IO is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers.  

Socket<span>.IO primarily uses the WebSocket protocol with ***polling as a fallback option***, while providing the same interface. Although it can be used as ***simply a wrapper for WebSocket***, it ***provides many more features***, including broadcasting to multiple sockets, storing data associated with each client, and asynchronous I/O.

>Note: Read that again and give extra attention on the text in bold. We've been talking just that in the Why section. Now it makes sense right?

We'll learn about the core features of Socket<span>.IO in the third part of this series. Let's convert our WebSocket client and server files (created in the [first part](https://iamshadmirza.hashnode.dev/websocket-simplified-cjxjzcu0m002i3hs1eewt2p80)) to use Socket<span>.IO quickly.

## How?
I'm assuming you've read the [first part](https://iamshadmirza.hashnode.dev/websocket-simplified-cjxjzcu0m002i3hs1eewt2p80) and know the working of native WebSockets. Let's quickly upgrade that to Socket<span>.io.  
> Commented code is WebSocket usage. I've added it for comparison.
### Server

!['server'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/socketio-why-and-how/server.png)  
**Explanation**   

1. Instead of importing websocket from 'ws', we're importing socketio from 'socket.io' library.
2. Creating a server and handing it to socketio instead of websocket.
3. Instead of 'send', we're now using 'emit' function on 'io' object. The only difference is we have added *event name* as the first argument.
We'll use this *event name* to retrieve the message at the client's end.
4. Method 'on' still works the same, the only difference is the addition of *event name*. Simple enough?


### Client
!['client'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/socketio-why-and-how/client.png)

**Explanation**   
1. Importing 'socket.io' library as it is not provided by JavaScript out of the box. This will expose 'io' namespace.
2. Providing url for io to connect. (We are not using new keyboard unlike WebSocket usage because it is optional. It's up to you if you wanna use it or not.)
3. Again 'send' is replaced by 'emit' and we have added event name (check line 21 of Server part).
4. Method 'on' is still the same with the addition of *event name* (check line 20 of Server part). Makes sense?

Cheers! We have created our simple Socket.IO Server and Client.  
!['spongebob](https://media.giphy.com/media/26u4lOMA8JKSnL9Uk/giphy.gif)  

I've tried to keep things as simple as possible. We'll dig deeper into Socket<span>.IO in the third part of this series. Let me know if this was helpful.  
Shad

## Reference
* Socket<span>.IO Server API - https://socket.io/docs/server-api/
* Socket<span>.IO Client API - https://socket.io/docs/client-api/