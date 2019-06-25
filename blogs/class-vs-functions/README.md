![cover](https://raw.githubusercontent.com/iamshadmirza/Blogs-by-Shad/master/blogs/class-vs-functions/cover.jpg)
# Class vs Function based programming simplified
This question is often asked in interviews that *What do you understand by functional programming or Object Oriented Programming?* and this blog is going to answer that but in a more simplified and beginner friendly manner.  
I'll be sharing links for some in-depth read about these two topics at the end but right now this post will only give you an insight and clear idea to distinguish between these two.

## Why the debate?
If you are a developer who is working or going to work on a huge application with a few thousand lines of code, you will instantly realize that you need to manage your code effectively to make it scalable and bug-free or you will be lost.
And for that, you have to pick one of the programming paradigms.
> A programming paradigm is a style or “way” of programming to approach a problem and design a solution.  

We will be talking about the two most talked paradigms in JavaScript.
* Object Oriented Programming / Class based Programming.
* Functional Programming / Function based Programming. 

Some languages support multiple paradigms but different developers have a different mindsets and they usually prefer a particular kind to work with.

## What is functional programming?
Let's hear what Wikipedia says:-
>Functional programming is a programming paradigm — a style of building the structure and elements of computer programs — that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

***Wait, you said simplified and beginner friendly?***  
Yes, I'm getting at it.  
In simple terms, you can say that  
>It is a programming paradigm which suggests writing program entirely out of function. Pure functions to be specific.

### What's a Pure function?
Functions are basically a block of code that takes some input and gives some output. The important thing to note here is that ***the output of the function will depend on the parameters passed as input entirely*** i.e., 
>It returns the same result if given the same arguments

A Pure function is a function which uses only those parameters which are passed on to it and calculates the result.  
If the function is using any other parameter that is outside the function then the function is not pure.

#### Example of Impure function
Imagine a function that is calculating the area of a circle and receiving *radius* as the parameter.
```
function areaOfCircle(radius){ 
    var area = radius * radius * PI;
    return area;
}
```
Why is this an impure function? Simply because it uses a global object *PI* that was not passed as a parameter to the function.  
Hence, here the output of the function is not dependent on the input served (only).
>PI is an external variable whose value can change which will give different output upon passing the same input.

If PI = 50, radius = 10 then output is 500.  
Take the same radius = 10 but now PI = 40 then output is 400.  

#### Example of Pure function
Imagine the same function with a slight change. Now we are calculating the area of a circle and the function is receiving *radius* with *PI* as the parameter.
```
function areaOfCircle(radius, PI){ 
    var area = radius * radius * PI;
    return area;
}
```
This function is indeed a Pure function because it is not accessing any outside variable and output is solely dependent on the parameters passed to the function.

* For the parameters radius = 10 & PI = 3.14, we will always have the same the result: 314.0
* For the parameters radius = 10 & PI = 42, we will always have the same the result: 4200

Another concept which functional programming follows is *Immutability*.
### What's Immutability?

Definition of **immutable** is  
: *not capable of or susceptible to change.*  
In functional programming, we treat data as immutable.  
>When data is immutable, its state cannot change after it’s created. If you want to change an immutable object, you can’t.

Instead what you can do is create a new object with the new value and replace it with the older one.  
So, our function is totally dependent on parameters and the data passed as parameter is *immutable* i.e, it cannot be changed. By this what we can conclude is:-  
* Given a parameter A → the function will always  return a value B
* Given a parameter C → the function will always return a value D

The code’s definitely easier to test and thus it is better protected against bugs.
Moreover, it is easier to understand and because it does just one thing, it is easier to maintain.  
Sometimes, we have to do some calculations in our application which require us to treat functions as entities.  
>The idea is to treat functions as values and pass functions like data. This way we can combine different functions to create new functions with new behavior.

Here comes the concept of Higher-Order Function. I really expect your interviewer to ask *What is Hight-Order Function*. So,
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
Here, we can see that `Array.filter` function is accepting array of numbers and a function as arguments and is returning array of even numbers.
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
Here, we can see that `Array.map` function is accepting array of numbers and a function as arguments and is returning array with each number incremented by 1.
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

## What is Object Oriented programming?
It is class based programming paradigm in which everything revolves around classes and its properties.
### What is a Class?
It is a design of an entity which defines the core properties and functions
>A class is just a **DESIGN** where everything is defined, that's it.

Let's look at a real-life example of a class.
#### Humans
If we take an example of a Human, we can say that it contains:-
* Body Parts: eyes, mouth, ears, hands, legs, etc.
* Body functions: walk, talk, eat, see, etc.

Now assume Human as a class/type (I am using type to make the use of classes clearer).  
We can be categorized as a **type** of *Human*.
The human class has a design in which all the body parts and functions are defined. It means that all who belong to this *Human* class will have these properties (body parts and functions). Let's hear it again.
> Class is just a **DESIGN** to define its properties.

Now, let's move on to subcategory of Humans - Male and Female.
Here comes the concept of Inheritance.
### What is Inheritance?
Consider the *Human* class, it has all body parts and functions already defined which is common to Male and Female. But we need the design of Male and Female class anyway. 
What we can do is create two new classes as Male and Female and as Male and Female are also classes, they can inherit everything from the Human class using the concept of *Inheritance*.  
>Male and Female are classes which can contain its own properties i.e., properties specific to Male and Female.

In this way, we now have two new classes Male and Female, that contains all the properties of Human class and the properties specific to them.  
>Classes are just a design/blueprint, nothing else. They don't have a physical existence.

Then how do we use these classes? The answer is *Objects*
### What is an Object?
Consider a particular Human now. You, me or anyone else. We can say that we belong to a Male or Female class. Hence, we are the Objects in this reference. We possess all the properties of Male or Female class and that of Human class (because of inheritance).
We are the physical existence, the *Object*.
>An Object is an instance of a class which has a physical existence.
By Human, we just mean a *type/kind*.

I am Shad and I am an object of class Male. I have a physical existence while class is just a logical definition which defines our *type/kind*. You can say:-
>Shad is an object of class Male

There are some other concepts like *abstraction*, *encapsulation* and *polymorphism* which comes under Object Oriented programming.  
All these features together help to define the structure of a program.  
As a result, the OOP code is very easy to understand. What is not so easy is deciding how to break an application into these small objects in the first place. Over time, you will gain experience and align more of your code with this theoretical concept.

## Let's dive deeper
I hope you already have a basic idea about Object Oriented programming or say class-based programming. For me, it was a little hard to grasp everything at first. So just to make things crystal clear,  we will discuss one more real-world example but now with `code`.  

Consider a shopping use case in which you put products into your basket and then calculate the total price you must pay. If you take your JavaScript knowledge and code the use case without OOP, it would look like this:

```
const bread = new Product('bread', 1);
const water = new Product('water', 0.25);
const basket = new Basket();
basket.addProduct(2, bread);
basket.addProduct(3, water);
basket.printShoppingInfo();
```
Let's break the code according to the things we have just learnt.  
* product is class which defines the properties of a product. 
* `new` keyword is used to create objects (the actual term is instantiated).
* bread and water are two objects of the Product class. They have all the properties of a *Product*.
* `Basket()` is another class which returns an object that we store to the variable `basket` (lowercase).
* With this `basket` object we can use the functions defined in `Basket()` class. `addProduct()` is one of those functions.
* Fourth and Fifth line of code is adding the product into the basket by calling the function with quantity and name as parameters.
* At the end we are printing what's in the basket by calling `printShoppingInfo()` function defined in `Basket()` class.

The benefit here is you can almost read the code like real English sentences and you can easily tell what’s going on.  
Let's take a better look at classes we just used:-  
1. Product class
```
class Product {
    constructor(_name, _price) {  
        this.name = _name;  
        this.price = _price;
    }
    getName() {    
        return this.name;  
    }
    getPrice() {    
        return this.price;  
    }
}
```
2. Basket class
```
class Basket {
    constructor() {
        this.products = [];
    }
    addProduct(amount, product) {
        this.products.push(...Array(amount).fill(product)); 
    }
    calculateTotal() {
        return products.map(function(product){
            return product.getPrice();
            })
            .reduce(function(a, b){ 
            return a + b;
        }, 0);  
    }
    printShoppingInfo() {    
        let total = this.calculateTotal();
        console.log('one has to pay in total: ' + total);  
    }
}
```
>The `constructor` inside each class is a function which executes each time an object is instantiated.

**Product** has the parameters _name and _price. Each new object stores these values inside it.  
Class **Basket** doesn’t require any arguments to create a new object. Instantiating a new Basket object simply generates an empty list of products that the program can fill afterward.  
Let's move on to the other concepts we left earlier.
### Encapsulation
In simple words, Encapsulation prevents access to data except through the object’s functions.
>It is a protective shield that prevents the data from being accessed by the code outside this shield.

The code we wrote earlier has one drawback (I wrote like that on purpose). By adding the *this* keyword, we have given full access to the properties from the outside. So everybody could access and modify it:
```
const bread = new Product('bread', 1);
bread.price = -10;
```
This is something you would want to avoid because prices less than zero doesn't make sense, does it?  
Objects should have exclusive control over their data. In other words, the objects “encapsulate” their data and prevent other objects from accessing the data directly. The only way to access the data is indirect via the functions written into the objects.
The code will look like this now:- 
```
function Product(_name, _price) {  
    const name = _name;  const price = _price;
    this.getName = function() { return name;  };
    this.getPrice = function() { return price;  };
}
```
>Note: Classes in JavaScript is facade, it was added later in the development. JavaScript was originally a prototype-based language. You can prevent the same issue by defining price as final in a static object oriented language like Java.

In JavaScript, one way to prevent this is to freeze the object.
```
const bread = new Product('bread', 10);
Object.freeze(bread)
bread.price = 20; // this will not change the price of bread to 20
```
> Note: It is not recommended in production.

### Abstraction
Abstraction is a process of hiding the implementation details from the user. Оnly the functionality will be provided to the user.  
Another way, it shows only essential things to the user and hides the internal details, for example, sending SMS where you type the text and send the message. You don't know the internal processing about the message delivery.
Let's see an example in our code:-
```
basket.printShoppingInfo();
```
This code is printing the total amount of the products added. The user who is calling this function doesn't know about the details of how the total value is calculated. This is a form of *abstraction*. The inner details are completely hidden from the user.

### Polymorphism
It is defined as
>the condition of occurring in several different forms

*JavaScript is a dynamically-typed language and this feature is more suitable to illustrate on a statically-typed language like Java.*  
In simple terms, we can say that one function can take multiple forms. Let's look at an example:-  
```
function Dog(name) {
  this.name = name;
}

var dog1 = new Dog('Gabby');
console.log(dog1.toString()); //// returns [object Object]
```
By default, the *toString()* method is inherited by every object descended from Object.
>The toString() returns "[object type]", where type is the object type.

Now, let's try to give one more form to this *toString()* function to achieve polymorphism.
```
function Dog(name) {
  this.name = name;
}

var dog1 = new Dog('Gabby');
Dog.prototype.toString = function dogToString() {
  return 'Name of your doggo is ' + this.name;
}
console.log(dog1.toString()); //// returns "Name of your doggo is Gabby"
```
See, now implementation of *toString()* method is changed, we have overridden this method basically.

We have covered all the four pillars of Object Oriented Programming namely:-
* Inheritance
* Encapsulation
* Abstraction
* Polymorphism


## Which one is better?
The choice is totally yours though I'm going to suggest what I think.
If something is making your system complex, it's probably not good. Complexity?
> "Complexity is anything that makes software hard to understand or to modify." — John Outerhout  

In simple words, a paradigm is better if it has these features: -
* Reduces the complexity of the code
* Easier to maintain
* Easier to modify
* Reduces the chances of the bugs occurring.

Some Pros and Cons of Object-Oriented Programming are:-
1. Teams can work on different classes at the same time hence it provided parallel development.
2. Classes are reusable.
3. Easier to read and maintain.
4. Too scalable, a massive amount of bloated, unnecessary code.
5. It can cause duplication. 

Some Pros and Cons of Functional Programming are:-
1. Allows you to write a more compressed and predictable code.
2. Programmers avoid any shared state or side-effects, which eliminates bugs caused by multiple functions competing for the same resources. 
3. One function does one thing which leads to fewer bugs.
4. It is easier to test.
5. Lesser boilerplate, unnecessary code is easily avoidable.
6. Reduced readability because resulting code is often more abstracted.
7. A steeper learning curve, learning from scratch is not easy.

It's a choice of developers after all. Choose what suits you best.  
Hope it was helpful.  
Shad
## Reference
* An introduction to the basic principles of Functional Programming - [@leandrotk_](https://twitter.com/LeandroTk_)  
link: [https://www.freecodecamp.org/news/an-introduction-to-the-basic-principles-of-functional-programming-a2c2a15c84/](https://www.freecodecamp.org/news/an-introduction-to-the-basic-principles-of-functional-programming-a2c2a15c84/)
* Objects and Classes - studytonight.com  
link: [https://www.studytonight.com/java/object-and-classes.php](https://www.studytonight.com/java/object-and-classes.php)
* Introduction to object oriented programming - freeCodeCamp.org  
link: [https://www.freecodecamp.org/news/an-introduction-to-object-oriented-programming-in-javascript-8900124e316a/](https://www.freecodecamp.org/news/an-introduction-to-object-oriented-programming-in-javascript-8900124e316a/)
* MDN Web Docs Glossary 
link: [https://developer.mozilla.org/en-US/docs/Glossary](https://developer.mozilla.org/en-US/docs/Glossary)