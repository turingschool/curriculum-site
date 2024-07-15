---
title: "JS: Array Prototype Methods"
length: 90
tags: javascript, arrays, prototypes, mutator, accessor, callback functions
---

## Learning Goals

* Be able to describe prototype methods, mutators and accessors
* Practice using MDN documentation
* Practice using array prototype methods for data manipulaton and problem solving
* Understand the use-cases for different prototype methods

## Vocabulary

- `Array Prototype` - methods that are built specifically for arrays. They help us change the arrays themselves or get certain information from or about the array.
- `Mutator` - methods that mutate, or change, the original array
- `Accessor` - methods that do not mutate the original array, rather just give us some information from or about the array
- `callback function` A function passed into another function as an argument, which is then invoked inside the outer function

<section class="call-to-action">
### Warm Up

<div class="dropdown">

### Exploration

In your notebook, brainstorm how you might complete the following challenges. Don't use any code. Pseudocode your thought process as a set of instructions; as step-by-step as possible. 

```javascript
var instructors = ["Erin", "Heather", "Abdul"];
```

For the array above,
- Oops! We're missing an instructor in this array. We need to add "Kayla" to the list. What are the **instructions** you would want to tell the computer to take in order to add a new instructor to the array? 
- I need to know if a certain instructor named "Heather" is in the instructors array. What are the **instructions** you would want to tell the computer to take in order to find out if "Heather" is included in the array?
- Extra: How would you programmatically find the number of elements in the array above? 
</div>

<div class="dropdown">
### Discuss

- Consider the processes you just thought through. Both of the challenges above are based on array prototype methods. One is based on a mutator method and one is based on an accessor method. Which do you think was which? Why? (Refer to the vocabulary terms above for a reminder on what `Mutator` and `Accessor` mean.)

</div>
</section>








<!-- 



lots of hands on practice
look at documentation
mention context and other protoype methods at the end, not at the beginning
not just arrays - includes split are string methods

 -->

## Prototype Methods
When working with data, we often want to do something _with_ that data, or do something _to_ that data.  Programming languages have built in methods that help us do this.  You've already worked with built-in Ruby methods like each, join, split, filter, map and more.  Just like Ruby, JavaScript has built-in prototype methods that let us access or mutate data.  

As we use prototype methods, it's important to know if the method is, or isn't, modifying our original data.  

For example:  
The **accessor method** [includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) lets us check if an element exists within an array.  It doesn't modify or mutate the original array, it simply returns the information we're seeking about the array as `true` or `false`.  

```js
var instructors = ["Erin", "Heather", "Abdul"];

var instructorExists = instructors.includes('Heather');

console.log(instructorExists); // logs true
```

The **mutator method** [push()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) changes (mutates) the original array by adding an additional element to it at the end.  


```js
var instructors = ["Erin", "Heather", "Abdul"];

instructors.push('Kayla');

console.log(instructors) // logs ["Erin", "Heather", "Abdul", "Kayla"];
```  
<br>

## Array Iteration Prototype Methods

Some of the most useful array prototype methods in JavaScript are the ones we can use to iterate over arrays.   These iterator methods are a simpler, modern and more sophisticated option than reaching for a `for loop`.  

They allow us to loop through an existing array, looking at each element one at a time and applying a `callback function` to that element to do something _to_ or _with_ that element.


### Callback Functions

Iteration prototype methods (such as forEach, filter, etc.) **take in a callback function as an argument**. The callback function is what takes in the mandatory and optional parameters!

```js
someArrayData.somePrototypeMethod(function callBack (/* parameter(s) */) {
  // some statements
  // often a return statement
})
```

Since these prototype methods were introduced as part of ES6, the document will show them written using a fat arrow like below.  You are encouraged to use this same syntax for your iterator callbacks.
```js
someArrayData.somePrototypeMethod((/* parameter(s) */) => {
  // some statements
  // often a return statement
})
```

<section class="note">
### More on these callbacks

Many callbacks require a return statement in order to work. When working with iterators (or really any code), we'll be putting that code within a well-named, reusable function so we can control exactly when that code is run.  

**You will often need *TWO* return statements in a function that has an iterator method inside it!** One return value will determine what the CALLBACK of the iterator return.  This value may need to be captured in a variable.  The other return value will determine what the METHOD returns which would be the 'final answer' or value you want to get back when running that function. 



Note that ES6 arrow functions have a "shortcut" syntax option that allows for *implicit return* - meaning that the function IS returning a value without having to use the `return` keyword.  This is only possible in one-line arrow functions that do not open up curly braces.  More on this later.
</section>


We are going to focus on:
* `filter()`
* `map()`
* `reduce()`
* `sort()`
* `forEach()`

## How to use `Array.filter(callbackFunction)`

First, let's do `filter` together. The instructor will model how they would use documentation to research.

<section class="call-to-action">
### Exercises

#### Example #1
Return a new array of the names that are 4 letters or less using the `filter` prototype method.   

```js
const names = ['nick', 'ben', 'trisha', 'john', 'dustin'];
```  


#### Example #2
Create a new array of *living* beatles using the `filter` method and store them in a `livingBeatles` variable.
```js
var beatles = [
  { name: 'John', living: false, instruments: ['guitar', 'bass', 'piano'] },
  { name: 'Paul', living: true, instruments: ['bass', 'guitar', 'piano'] },
  { name: 'George', living: false, instruments: ['guitar', 'sitar'] },
  { name: 'Ringo', living: true, instruments: ['drums', 'bongos'] },
];
```  

#### Example #3
Create another array of beatles that play the guitar using the `filter` method and store them in a `guitarPlayingBeatles` variable. (*continue to use the data from above*)

</section>

<section class="dropdown">
### Important Takeaways  

Be sure to include these in your notes, if you haven't already!
* `filter` will return a new **array** with all elements that match a condition.
* Useful for when you need to find a subset of elements in an array that matches a given condition.
* The callback needs to return an express that evaluates to a **boolean** value of true or false. 
* The matching elements are returned as they are. You cannot modify the element(s) you're filtering for.
</section>

Note that depending on the syntax you use for your callback function, you may not need to explicitly write the `return` keyword.  You can leverage the *implicit return* available in certain arrow function syntax.

## How to use `Array.map(callbackFunction)`

<section class="call-to-action">
### Exercises

#### Example #1
Using `map`, iterate over the array of prices, increase the price by $1, and return a new array of increased prices.  Store them in a variable called `increasedPrices`.  

```js
const prices = [4.99, 5.50, 7.00, 10.25];
```  

#### Example #2
Using an array of temperature data in Fahrenheit, convert the date to degrees Celsius and store them in a variable called `degreesC`. [Here is the formula](http://www.rapidtables.com/convert/temperature/how-fahrenheit-to-celsius.htm){:target='blank'} to convert from Fahrenheit to Celsius.  

```js
const degreesF = [67, 32, 55, 102]

// console output
=> [19.44, 0, 12.77, 38.88]
 ```  
</section>

<section class="dropdown">
### Important Takeaways  

Be sure to include these in your notes, if you haven't already!
* Use `map` when you want a new array based on your original, with some modification to each item.
* Although similar to `forEach`, each time the callback is executed in `map`, whatever is returned from the callback is added to the new array
* `map` will *ALWAYS* return a **new array of the same length** as the original array.
</section>

## How to use `Array.reduce(callbackFunction)`

<section class="note">
### Helpful Tips

Note that the `reduce` method is slightly different than the previous iterator methods.  `reduce` takes two arguments:

_Callback Function_ - Within the callback, we have access to the accumulator, the current element in the iteration, the current element's index, and the original array we are looping over

_Initial Value_ - The initial value to be used as the accumulator (the first argument to the first call of the callback). The accumulator is the *single value* that will eventually be returned. It's called an accumulator because each iteration over the array will modify the accumulator value until the loop is complete.
</section>

<section class="call-to-action">
### Problem Set

#### Example #1
Using `reduce`, sum up all of the numbers.  

```js
const numbers = [1, 2, 3, 4, 5];

// console output
=> 15
```  

#### Example #2
Using `reduce`, create a new object the stores the lengths of each word.  

```js
const adjectives = ['fantastic', 'amazing', 'childish'];

// console output
=> { fantastic: 9, amazing: 7, childish: 8 }
```  
</section>

<section class="dropdown">
### Important Takeaways  

Be sure to include these in your notes, if you haven't already!
* Useful for turning an array into a single value, be it a number, string, object, or another array.
* Useful for returning one that is a combination / sum of values from an original array.
* Also useful for converting an array into another data type.
* REMEMBER...you must always return the *accumulator* in the callback function.
</section>

## How to use `Array.sort(callbackFunction)`

<section class="call-to-action">
### Exercises

#### Example #1
Find the first number that is greater than 20.  

```js
const numbers = [15, 6, 14, 2, 22, 9, 45];
```  


#### Example #2
Find the first pet that is three years old and store it in a `foundPet` variable.  
```js
let pets = [
  { name: 'harvey', age: 1 },
  { name: 'julius', age: 3 },
  { name: 'mishu', age: 3 },
];
```  
</section>

<section class="dropdown">
### Important Takeaways  

Be sure to include these in your notes, if you haven't already!
* Useful for when you need to find a specific item in an array that matches a given condition.
* Always will return the first element where the callback function returns *true*.  (even if there are other matches)
* The callback needs to return a **boolean**. You also cannot modify the element you're finding.
</section>


## How to use `Array.forEach(callbackFunction)`

`forEach` is the prototype method that is most similar to a `for` loop.  It simply iterates. It doesn't have additional built in functionality like some others (filter, map, etc).  

There are _occasional_ times when it makes more sense to use a for loop over something like a forEach. For example:

- If you need to run something a specific number of times, you would want to use a `for` loop.  `forEach` always iterates over every element in an array.
- If you want to stop (`break`) a `for` loop, you can do that.  There is no way to stop a `forEach` loop. 


<section class="call-to-action">
### Exercises

#### Example #1
Using `forEach`, iterate over the array of prices, increase the price by $1, and add new increased prices to the `increasedPrices` array.

```js
const prices = [4.99, 5.50, 7.00, 10.25];
const increasedPrices = [];
```

#### Example #2
- Using the dogs array above, log the dog's name and how many legs it has.  

```js
const dogs = [
  {name: "Fido", numLegs: 4},
  {name: "Greg", numLegs: 5}
];

// console output
=> 'Fido has 4 legs.'
   'Greg has 5 legs.'
```  

</section>  

<section class="dropdown">
### Important Takeaways

Be sure to include these in your notes, if you haven't already!
* `forEach` is useful when you want to perform an operation on every element in an array.
* It is the prototype method that is most similar to a `for` loop and doesn't have additional built in functionality like some others (filter, map, etc)
* `forEach` does **NOT** return anything (even if you have a return statement).  You can store element data into a variable, but the variable MUST exist outside of the `forEach`.
</section>  


<section class="note">
### Before we close out today...

Take some time this afternoon to review what some of the highlights were for each prototype method.  Often when trying to solve a problem, there isn't just one answer.  Sometimes problems can be solved through a combination of prototype methods!  We'll review these more tomorrow and continue working through a few more examples then!
</section>

## Reviewing Our Prototype Iterator Methods *(Day 2)*

Now that we've had a chance to go through each of these iterator methods, let's review the highlights.  Take a look at the activity below:

<section class="call-to-action">
### Exploration Activity

Take a few minutes to consider the following questions for each of the iterator methods (`forEach`, `map`, `find`, `filter`, & `reduce`)
- What does the callback function return?
- What are the mandatory parameters? Optional parameters?
- What are common use cases? When would I use this method?

As a class, let's go through these questions together in this [JamBoard](https://jamboard.google.com/d/1dMlfYlFx5alIyANQMLM8roC-cTy038c1iVfkg1o0hSk/edit?usp=sharing){:target='blank'}.
</section>

## Practice

<section class="call-to-action">
### More exercises

The only way to get better and more comfortable with these prototype methods is to continue practicing them. Here are a [few more examples](https://github.com/turingschool-examples/iterator-methods-stations){:target='blank'} to work through.  Focus on the prototype methods that are more challenging for you first! 
</section>

<section class="checks-for-understanding">
### Checks for Understanding

* What is a prototype method?
* Compare and contrast `filter` and `find`.
* Compare and contrast `forEach` and `map`.
* When might `reduce` be a useful method?
* Which prototype methods are the most confusing for you right now?
</section>

### Additional Resources
* [Why and when to use forEach, map, filter, reduce, and find in JavaScript](https://medium.com/@JeffLombardJr/understanding-foreach-map-filter-and-find-in-javascript-f91da93b9f2c){:target='blank'}
* [JavaScript Callback Functions - What are Callbacks in JS and How to Use Them](https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/){:target='blank'}
* [Callback Functions MDN](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function){:target='blank'}



Prototype methods exist for many data types, not just arrays. For example, [`split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) is a  string prototype method that breaks up a string into substrings and returns those substrings to us in an array.  There is also a string prototype method [`includes`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes) that acts similarly to the array prototype method `includes` used in an example previously. 

There are many array (and other data types) prototype methods we haven't touched in this lesson. Open the MDN documentation for the [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) method and skim the left sidebar to see the other array prototype methods available to you. Rather than trying to learn all of those methods, it's enough to just know you can use MDN or simply google something like "remove specific element from array javascript" to find additional methods to meet specific needs as they arise.  


To be prepared for final assessments (and interview code challenges), you should work towards fluency with the following methods:
- forEach
- filter
- map
- reduce
- sort
- push
- join
- includes
- split

* **join()** - It joins all elements of an array into a single string.
* **split()** - It splits a string into an array of substrings.
* **includes()** - checks if 
* **push()** - pushes a new element into an array (at the end)
* **forEach()** - pushes a new element into an array (at the end)
* **filter()** - pushes a new element into an array (at the end)
* **map()** - pushes a new element into an array (at the end)
* **reduce()** - pushes a new element into an array (at the end)
* **sort()** - pushes a new element into an array (at the end)