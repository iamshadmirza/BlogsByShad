# Nodejs Lesson 7: Console

![cover](./nodejs-l7.png)

Hello everyone, we will talk about another module which is by far the most commonly used module in nodejs javascript environment. We will learn all the powers we get with this mighty module that helps us in development and debugging. Let's start

## What is the console

**console** provide a way to print/output certain messages on to the console. It's very useful for testing and debugging. **console** is a globally present module that you can use anywhere in the project without requiring it. The console module provides a simple debugging console that is similar to the JavaScript console mechanism provided by web browsers. It provides us a bunch of functions that we can use to print text. Example usage:

```js
console.log("This is a message to print");

// This is a message to print
```

You can use this to print strings, arrays, objects, or any variable you like. It also supports string substitution just like `util.format` we studied in the previous lesson. Example:

```js
console.log("2 + 2 equals %d", 4);


// 2 + 2 equals 4
```

Other substitution strings are `%o` for object, `%d` for integer, `%f` for floating-point value and even `%c` for CSS styles. Example:

```js
console.log("%c this is red color log", "color: red");

// prints "this is red color" log but in red color
```

Of course, it doesn't have only `.log()` function. It does provide us a lot of helpful functions according to the message we want to print. Example `console.error()` for errors, `console.table()` for printing tables, etc. Let's look at all of the types in detail.

## Types of functions in the console

### 1. console.log

We already read about this method in the examples above. This is most commonly used among all the functions to print a normal stream of the message. The first parameter is string message and the next parament can include multiple arguments for substitution.

```js
console.log("%d + %d is equal to %d", 2, 5, 7);

// 2 + 5 is equal to 7
```

### 2. console.error

Apart from the normal stream, we have an error stream and that's where **console.error** comes handy. The usage is pretty similar to *console.log* but it is used to log errors mainly.

```js
console.error('error', 404);

// error 404
```

### 3. console.table

This is particularly helpful when you are working with objects or tabular data with some kind of relationship. The first argument is tabular data and the second argument is property. Let us see an example:

```js
console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);
```

This logs:

| (index) | a   | b   |
|---------|-----|-----|
| 0       | 1   | 'Y' |
| 1       | 'Z' | 2   |

Second argument can be used to include/exclude properties:

```js
console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ['b']);
```

This logs:
| (index) | b   |
|---------|-----|
| 0       | 'Y' |
| 1       |  2  |

### 4. console.dir

Consider this as sibling to **console.log** which takes object and logs object properties instead of string. **console.log** logs  (`toString()`) representation of object if passed, whereas **console.dir** recognizes that it's an object and treats it like that. Example:

```js
console.dir([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);

// [ { a: 1, b: 'Y' }, { a: 'Z', b: 2 } ]
```

### 5. console.assert

This checks if the value passed is truthy. The first argument takes a value and the second takes a message to log. This message is logged only when the value is not true.

```js
console.assert(true, 'truthy value');
// logs nothing

console.assert(false, 'whoopsy, this is false');
// Assertion failed: whoopsy, this is false
```

### 6. console.count

This takes a label as the first argument and logged the number of times it is called. It maintains an internal counter and associates it with the label passed. The default label is "default" if none passed.

```js
console.count();
console.count();
console.count();

console.count('wow');
console.count('wow');

// default: 1
// default: 2
// default: 3
// wow: 1
// wow: 2
```

### 7. console.time & console.timeEnd

These two methods come very handy when you have to know how much time it takes to run a certain function/task. Simply add **console.time()** before the task starts and **console.timeEnd()** after the task ends. This will print out the time it took to execute that particular tasks.  
They also take a label as the first argument and associate the timer with it. You can use these labels to log multiple time logs but remember that they should be unique. **.time()** starts the timer and **.timeEnd()** ends the timer. They both should be used together. Example:

```js
// timer starts
console.time();

// running a loop to mimic a long task
let a = 0;
while(a < 100000){
    a++;
}

// timer stops
console.timeEnd();

// default: 1.843ms
```

### 8. console.timeLog

This also works with the above two methods but is optional. You can use this to log elapsed time after the timer starts.

```js
// example for Nodejs docs

console.time('process');
const value = expensiveProcess1(); // Returns 42
console.timeLog('process', value);
// Prints "process: 365.227ms 42".
doExpensiveProcess2(value);
console.timeEnd('process');
```

### 9. console.debug

The **console.debug()** function is an alias for **console.log().**

### 10. console.clear

This simply clears old logs on the console.

```js
console.count();
console.count();
console.count();

console.clear();

// logs nothing
```

### 11. console.trace

Logs the stack trace and helps in debugging.

```js
console.trace('What happened when I logged this message');

// Trace: What happened when I logged this message
//     at Object.<anonymous> (/Users/mdshadmirza/personal/BlogsByShad/test.js:33:9)
//     at Module._compile (internal/modules/cjs/loader.js:1201:30)
//     at Object.Module._extensions..js (internal/modules/cjs/loader.js:1221:10)
//     at Module.load (internal/modules/cjs/loader.js:1050:32)
//     at Function.Module._load (internal/modules/cjs/loader.js:938:14)
//     at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
//     at internal/main/run_main_module.js:17:47
```

### 12. console.warn

The **console.warn()** function is an alias for **console.error().**

## Takeaways

- console is one of the most helpful modules that you will need more often
- console.log and console.error should be used for the normal stream and error stream of messages respectively.
- *console.table* helps us log tables in a beautiful format and thus helps us in debugging.
