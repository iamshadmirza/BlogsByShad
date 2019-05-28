# Class vs Function based programming simplified
This question is often asked in interviews that *what do you understand by functional programming or Object Oriented Programming ?* and this blog is going to answer that but in a more simplified and beginner friendly manner.  
I'll be sharing links for some in-depth read about these two topics at the end but right now this post will only give you an insight and clear idea to distinguish between these two.

## Why the debate?
If you are a developer who is working or going to work on a huge application with few thousands of lines of code, you will instantly realise that you need to manage to code effectively to make it scalable and bug free or you will be lost totally.
And for that you have to pick one of the programming paradigms.
> A programming paradigm is a style or “way” of programming to approach a problem and design a solution.  

We will be talking about two most talked paradigm in JavaScript.
* Object Oriented Programming / Class based Programming.
* Functional Programming / Function based Programming. 

Some languages support multiple paradigm but different developers have different mindset and they usually prefer some particular kind to work with.

## What is functional programming?
Let's hear what the Wikipedia says:-
>Functional programming is a programming paradigm — a style of building the structure and elements of computer programs — that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

***Wait, you said simplified and beginner friendly?***  
In simple terms, you can say that  
>It is programming paradigm which suggests writing program entirely out of function. Pure functions to be specific.

### What's a Pure function?
Functions are basically a block of code that takes some input and give some output. The important thing to note here is that ***the output of function will depend on the input served entirely*** i.e., 
>It returns the same result if given the same arguments

A Pure function is a function which uses only those parameter which are passed on to it and calculate result.  
If the function is using any other parameter that is outside the function then the function is not pure.

#### Example of Impure function
Imagine a function that is calculating area of circle and receiving *radius* as the parameter.
```
function areaOfCircle(radius){ 
    var area = radius * radius * PI;
    return area;
}
```
Why is this an impure function? Simply because it uses a global object *PI* that was not passed as a parameter to the function.  
Hence, here the output of the function is not dependent on the input served.
>PI is an external variable whose value can change which will give different output upon passing same input.

If PI = 50, radius = 10 then output is 500.  
Take the same radius = 10 but now PI = 40 then output is 400.  

#### Example of Pure function
Imagine the same function with a slight change. Now we are calculating area of circle and the function is receiving *radius* with *PI* as the parameter.
```
function areaOfCircle(radius, PI){ 
    var area = radius * radius * PI;
    return area;
}
```
This function is indeed a Pure function because it is not accessing any outside variable and output is solely dependent on the parameters passed to the function.

* For the parameters radius = 10 & PI = 3.14, we will always have the same the result: 314.0
* For the parameters radius = 10 & PI = 42, we will always have the same the result: 4200

Another concept which a functional programming follows is *Immutability*.
### What's Immutability?

Definition of **immutable** is  
: *not capable of or susceptible to change.*  
In functional programming, we treat data as immutable.  
>When data is immutable, its state cannot change after it’s created. If you want to change an immutable object, you can’t.

Instead what you can do is create a new object with the new value and replace it with the older one.  
So, our function is totally dependent on parameters and the data passed as parameter is *immutable* i.e, it cannot be changed. By this what we can conclude is :-  
* Given a parameter A → the function will always  return a value B
* Given a parameter C → the function will always return a value D

The code’s definitely easier to test and thus it is better protected against bugs.
Moreover, it is easier to understand and because it does just one thing, it is easier to maintain.  
Sometimes, we have to do some calculations in our application which requires to treat functions as entities.  
>The idea is to treat functions as values and pass functions like data. This way we can combine different functions to create new functions with new behavior.

Here, comes the concept of Higher-Order Function. I really expect your interviewer to ask what is Hight-Order Function. So,
### What's Higher-Order Function?
When we talk about higher-order functions, we mean a function that either:
* takes one or more functions as arguments, or
* returns a function as its result

You’ve probably already heard about filter, map, and reduce. Let's take a look at these:-
#### Filter
Given a collection, we want to filter by an attribute. The filter function expects a true or false value to determine if the element should or should not be included in the result collection.
**Return value:** new array consisting only of items that passed a condition.
Let's take an example of filtering even numbers:-  
```
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let even = numbers.filter(function(num) {
    return num % 2 === 0;
});
console.log(even);
// expected output: [0, 2, 4, 6, 8, 10]
```
Here, we can see that `Array.filter` function is accepting array of numbers and a function as arguments and returning array of even numbers.
#### Map
The map method transforms a collection by applying a function to all of its elements and building a new collection from the returned values.  
**Return value:** a copy of original array with modified values (if any)
```
let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let incremented = numbers.map(function(num) {
    num = num + 1;
    return num;
});
console.log(incremented);
// expected output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
```
Here, we can see that `Array.map` function is accepting array of numbers and a function as arguments and returning array with each number incremented by 1.
#### Reduce
The idea of reduce is to receive a function and a collection, and return a value created by combining the items.  
**Return value:** accumulator
```
let numbers = [1, 2, 3, 4];
let sum = numbers.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
});
console.log(sum);
// expected output: 10
```
## Which one is better?
Choice is totally yours although I'm going to suggest what I think.
If something is making your system complex, it's probably not good. Complexity ?
> "Complexity is anything that makes software hard to understand or to modify." — John Outerhout  

In simple words, a paradigm is better if it has these features: -
* Reduces the complexity of code
* Easier to maintain
* Easier to modify
* Reduces the chances of occuring bugs
## Reference
* An introduction to the basic principles of Functional Programming - [@leandrotk_](https://twitter.com/LeandroTk_)  
link: https://www.freecodecamp.org/news/an-introduction-to-the-basic-principles-of-functional-programming-a2c2a15c84/