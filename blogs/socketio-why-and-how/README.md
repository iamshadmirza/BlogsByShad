# Socket<span>.io: What, Why and How?

This is second blog post in continuation of the series **WebSocket Simplified**. If you haven't read the first part, check it out here. I insist that you go through the first part to understand this one better. Again, the goal is to keep things as simple as possible. So I'm going to approach this topic a little differently. Let's start.

## Why Socket<span>.io
In previous post, we successfully built over basic WebSocket server and client and it was working pretty fine. So, you might be wondering why use socket.io ? why use a heavy bloated library when things are working just fine without it? Let's consider this scenario:-  

Suppose your boss tells you to add real-time communication in the website and you decided to use native WebSocket and not any library whatsoever.  
You coded the WebSockets correctly and it's working fine *EXCEPT* the testing reveals that there are some issues. It's not working properly everytime for some reason.  
After some debugging you found that it's not working when the person is behind a *firewall* or an *antivirus*. So you got to know that: -
> WebSocket doesn't work ideally in presence of Firewall and Antivirus. 

You also found that if the client is behind a proxy or load balancer, then also websocket will not work.
>WebSocket doesn't work ideally in presence of Proxy and Load Balancer either. 

It means you have to deal with all these issues yourself. You worked for few hours of hardwork and added extra code to solve all these problems and your WebSocket connection is finally working properly. See the visual representation of what we did so far:-  
!['demo1'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/socketio-why-and-how/demo1.jpg)

Now, suppose the server goes down for some reason and the connection disconnected. In this situation, the browser is now sitting ideally not doing anything because the handshaking is again necessary to establish the connection. So you have one more thing to do now:-
>Websocket should reconnect automatically in case if disconnection happens due to server failure or some other reason.

So now you added more code and tackled this problem too. Pretty good, you're a very good developer.  
!['you're awesome'](https://media.giphy.com/media/5C0b4tU550kNGRmJrU/giphy.gif)  
Your boss appreciated your efforts but now he tells you to add support for images (blobs) too.
>Note: We were sending JSON data so far (plain text).

Not only this, you have to add chatroom for group chats, multiple endpoints so that you can connect multiple WebSocket. Also, there might be some old browsers which just doesn't support WebSocket so you have to take care of that too.  
This seems like a lot now, doesn't it?  
!['please save me'](https://media.giphy.com/media/3o7TKEP6YngkCKFofC/giphy.gif)  
With some more code and hard work, you tackeled these too. Now your WebSocket implementation looks something like this:-  
!['demo2'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/socketio-why-and-how/demo2.jpg)
>Guess what, this all collectively is actually Socket.io.  Check out the image below just to make things crystal clear.

!['demo3'](https://raw.githubusercontent.com/iamshadmirza/BlogsByShad/master/blogs/socketio-why-and-how/demo3.jpg)

Socket.io uses WebSocket behind the scenes and takes care of all these problems so that we don't have to deal with them ourselves. It's actually just a wrapper over native WebSocket which provides bunch of other cool features which makes our job easy as a developer.  
!['phew'](https://media.giphy.com/media/JMV7IKoqzxlrW/giphy.gif)
