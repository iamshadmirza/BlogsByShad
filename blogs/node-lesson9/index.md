# Nodejs Lesson 9: Events, Event Emitter, and Memory Leaks

Hello everyone, today we are going to talk about events, what exactly are they. They will move on to understand what are EventEmitters and how to use them. We will also learn about memory leaks and learn about ways of dealing with it.

## What are Events

Whenever something happens, we say that it's an event. For example, if a file is opened, we call it an event or if a file is read we call it an event.  
Nodejs comes with a bundled module **"Events"**, which can be used to create or listen for events. We can use this module to emit events and listen to them. These can be used to perform different actions based on the name and payload of any event that occurred. You can require this module simplify by:

```js
const events = require('events);
```

This events module gives us **EventEmitter** which helps us which bunch of operations like emitting events, listening events and capturing event data, etc. Let's learn more about EventEmitters.

## EventEmitter

EventEmitter is an object provided by the events module. It binds a function which is used to handle events. We can emit events in any part of the application and have a function setup that listens to it

Example: Suppose you have an application where you want to notify the admins whenever a new user signs up. You can fire an event whenever a user joins and have an event handler set up that sends a notification when this event occurs. You will have to bind this handler to an event listener which will get invoked as soon the new user event is emitted.

Let's talk about how we can create such an event handler.

## How to setup EventEmitter

### Step 1: Emit Events

First, we will require EventEmitter and instantiate it. This will provide us with a bunch of methods.

We can use `EventEmitter.emit()` method to emit events. It takes the event name as the first argument and then passes some other data in the next argument. 

```js
const EventEmitter = require('events').EventEmitter;

const ee = new EventEmitter();

ee.emit("Boop", "An event has occured");
```

### Step 2: Listen for Events

Then we can either add an event listener or use the `on` method to listen to these events.

```js
const EventEmitter = require('events').EventEmitter;

const ee = new EventEmitter();

ee.addListener('Boop', function (data){
  console.log(data);
});

// OR

ee.on('Boop', function (data){
  console.log(data);
});

ee.emit("Boop", "An event has occured");
```

### Step 3: Capture Event Data

Any payload passed while emitting the event will be received as the first argument of the callback passed with `EventEmitter.on()`. Remember the example we discussed above? This is how we can pass the user information and it will notify who joined with name and email property.

```js
const EventEmitter = require('events').EventEmitter;

const ee = new EventEmitter();

ee.on('New User', function (data){
  console.log(`A new user has joined with username ${data.username} and email ${data.email}`);
});
// A new user has joined with username Shad and email something@example.com

ee.emit("New User", { username: "Shad", email: "something@example.com"});
```

Don't forget to call `removeLister()` when you're done with the event to avoid memory leak when you're using `addListener()`.

### Step 4: Handle Errors

There is a certain scenario where an error might occur. One such case is when you emit an event that has no handler. This will make EventEmitter generate an exclusion that must be handled or the process will fail altogether. 

Luckily, we can add an event handler for error before emitting any events and it will take care of all the errors. Let's see how:

```js
ee.on('error', function (){
  console.log(`Something went wrong`);
});
```

That's pretty much it. Next, we will talk about memory leaks and listener counts.

## Memory Leaks

EventListener has a limit of adding 10 listeners per event by default. When more than 10 listeners are added, it will start showing us a warning for a possible memory leak.  

The `emitter.listenerCount(eventName)` method can be used to keep a check on how many listeners have been added to the event. This method will return the integer count for the event name passed as an argument.

The `emitter.listeners(eventName)` method can be used to know the details of listeners it is subscribed to. This method will return an array of listeners for the event name passed in the argument.

**EventEmitter** instance provides us a method `emitter.setMaxListener(n)` which can be used to modify the limit for a particular instance. We can pass any value of n for the number of events we want to allow. The value can also be set to Infinity or 0 to allow unlimited numbers of listeners.

Once the limit is set, we can use `emitter.getMaxListeners()` to get the current maximum listener value for the current emitter instance. This will return the default value if the limit has not been set.