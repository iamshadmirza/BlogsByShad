# Nodejs Lesson 17: Timers and Refs

Hello everyone, this lesson will talk about different timers that we can use in Nodejs. We will also talk about what a ref is and how we can use them. Let us start.

## What are timers in Nodejs

Timer functions in Nodejs are similar to what we get in the browser, but there are slight differences. The browser provides us a `window` object which gives us the timer functions. Nodejs bundles all the functionalities in the Nodejs itself and emulates the behavior of the browser. Since Nodejs bundles this functionality out of the box, you don't have to require anything to use it inside a project.

We will talk about three types of timers mainly:

1. setTimeout
2. setInterval
3. setImmediate

## 1. Set Timeout

Set timeout allows us to run a piece of code after a certain amount of time. We pass this 'piece of code' as a callback function in the first argument. While the second argument receives a number, this number denotes milliseconds, after which the callback gets called.

```js
setTimeout(function () {
    console.log('5 seconds have passed');
}, 5000);
```

If we see the above code, the callback function logs a statement after 5 seconds since we passed `5000` as the second argument. **While this looks very similar to what happens on the web, it's not.**

Nodejs used Event Loop to queue async callback and only calls the pending callback once the current execution completes and the call stack is empty. You can read the previous article, which covers Event Loop and Call Stack, in detail. Because of this non-blocking async behavior of Nodejs, we can't guarantee that the callback will run after exact 5 seconds. 

Yes, it will be approx 5 seconds. Still, the actual time will depend upon the callbacks present in the queue during the time of execution. Any callback that comes can push back the setTimeout call further away, which can delay execution time. Let's look at this example:

```js
console.log('Before timeout');

setTimeout(function () {
    console.log('Set timeout over');
}, 0);

console.log('After timeout');
```

What do you think will be logged by the above code? The `Set timeout over` log will come last even though the wait time is 0 seconds. The reason is the same as what we talked about in the above para. Any asynchronous callback is handled by Event Loop, which runs the callback when the current stack is empty, i.e., the other two logs are printed. This is why the timeout duration is not guaranteed to be accurate in Nodejs.

## 2. Set Interval

I hope you understood the set timeout we just discussed above. A set interval is pretty similar to that, but instead of running the function once after the timeout, it runs it again and again until you stop it. Let's see an example:

```js
setInterval(function () {
    console.log('1 second has passed');
}, 1000);
```

The above code will print the log every second throughout the process lifecycle unless we stop it ourselves. Now when to use it?

Suppose you are building a countdown where you have to show count each second; setInterval will be very handy in this situation.

We will learn about how to stop it in a while, but first, let's look at the third timer function.

## 3. Set Immediate

Remember how we differentiated the timer functions of Node from the one present in the browser? Every callback passes to setTimeout goes to the Event Loop and call stack before it gets executed. Set Immediate helps us in that situation. It is very similar to setTimeout with 0ms timeout but not so much. Let's see how:

```js
console.log('Before timeout');

setTimeout(function () {
    console.log('Set timeout over');
}, 0);

setImmediate(function () {
    console.log('Run Immediate call'); // look this closely
});

console.log('After set immediate');
```

I'll share the log to explain what's happening:

```
Before timeout
After set immediate
Set timeout over
Run Immediate call
```

Any function passed as the `setImmediate()` argument is a callback executed in the next iteration of the event loop. When we execute the above code, setTimeout will enter the loop and then setImmediate(). Since we said that setImmediate would run in **next iteration**, it gets executed after the timeout. Let's see one more example:

```js
console.log('Before timeout');

setTimeout(function () {
    console.log('Set timeout over');
}, 0);

setImmediate(function () {
    console.log('Run Immediate call'); // look this closely
});

setTimeout(function () {
    console.log('Another timeout over');
}, 0);

console.log('After set immediate');

// logs 
// Before timeout
// After set immediate
// Set timeout over
// Another timeout over
// Run Immediate call
```

Even though setImmediate enter the loop in the second position, it gets executed last. This is what we meant when we read **"callback that's executed in the next iteration of the event loop"**.

**So when to use it?** You can use `setImmediate()` whenever you want to queue a callback after everything in the callback is executed. Consider it as saying, "Run this callback when you're done with all the I/O or async work."

Now that we understand all three types of the timer and how to start them. Let's look at how to stop them.

## How to stop timer functions

All the timers we talked about scheduling some action to be executed in the future. So we should also learn to cancel that future execution if we want to. For this, we will have to understand **' refs'**.

Whenever you create a timer, it returns a reference to the timer we can use to update its behavior. Consider this reference as a unique ID that lets us get a hand on the timer. Let's see the code below:

```js
const interval = setInterval(() => {
    console.log('tik');
}, 1000);

setTimeout(() => {
    clearInterval(interval);
}, 4000);

// logs
// tik
// tik
// tik
```

The above code creates an interval that prints 'tik' every second. We are storing the reference to a variable 'ref.'

Then pass that ref to a function `clearInterval()` after 4 seconds. Since the interval was canceled at the 4th second, we see only 3 logs of 'tik.'

Similarly, we get functions to clear the 3 timers respectively. They are:

1. clearTimeout()
2. clearInterval()
3. clearImmediate()

The usage is similar in all 3 cases. You store a ref in a variable then pass it to the clear function to cancel the execution.

By default, Nodejs keeps the event loop running as long as the timer is active. This lets the timer be executed in the future and keeps the process from exiting. `interval.ref()` and `interval.unref()` functions that can control this default behavior.

`timeout.ref()` or `interval.ref()` will keep the event loop active as long as the timer is active. It is always called by default, so it's not needed to be called again.

`timeout.unref()` or `interval.unref()` will prevent the timer to be active if there is no event loop activity in progress. This will prevent side effects from happening. Process exiting while a timer is active will have no side effect.