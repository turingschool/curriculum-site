---
layout: page
title: JS Party
---

## Learning Goals

- Get exposure to JavaScript syntax
- Get your hands dirty with unfamiliar code
- Just have a little fun!

## Party Plans

We'll use this time to get our hands dirty actually *writing* some code in JavaScript.   This is important practice but should feel like it is low stakes, no pressure, and dare we say....fun!  Be confident, be reckless, do something weird, break stuff.   

Google and the [MDN docs](https://developer.mozilla.org/en-US/) will be your friends as you're trying to work with JavaScript.  You might even leverage chatGPT for help if you're stuck and can't find solutions through google and MDN.  Just be sure to struggle through a bit on your own before turning to chatGPT.  And remember, chatGPT often provides info that is very much *not* correct. Ask it for help, not for the answers.

## Set Up

**Create a Replit Account**
[Replit](https://replit.com/~) provides an online platform that allows us to write code and see the results almost immediately - all inside of one browser tab! There are many other similar (and awesome) tools available but replit is used regularly in Mods 1 and 2, so Mod 0 provides an introduction and some exposure.

Follow the steps below (if they are not necessary because you have already done them or have experience with replit, you can skip this):

- Create a free account.
- [Bookmark the Replit webpage on Chrome](https://support.google.com/chrome/answer/188842?hl=en&co=GENIE.Platform%3DDesktop), so that you can easily find it again later.
- Watch [this video](https://www.youtube.com/watch?v=cnLE3bH6fHE) to learn how to navigate the interface and create new projects. Feel free to speed up the video as you watch.

A few notes: 
 - When using Replit for Javascript exercises, we will use Node.js.  
 - When opening up the practice Repl's below, you'll need fork each one to create your own copy to play around in.
 - *Important:*  Along the bottom toolbar in each Repl you'll see an AI option.  You do *NOT* want to have AI autocomplete enabled.  Having this enabled will provide you with the code solutions you're supposed to be figuring out on your own.  Having this enable renders your practice an big ol' waste of time.  

## Data Types & Variables

JavaScript has 6 primitive (simple) data types but for now we really only care about 5 of them: Boolean, Undefined, Null, Number, String (BUNNS).  JS also has Object and Array as it's 2 non-primitive (reference) data types. 

Just like in Ruby, JS lets us store values in variables.  We can declare variables and assign, and re-assign values to them.


Here's some examples: 
```js
var boolean = true
var number = 5
var string = "potato"

var object: {
  firstKey: 1,
  secondKey: 2,
  thirdKey: 3
}

var array = ['one', 'two', 'three']
```

Note that strings in JavaScript require quotation marks (or backticks).  But you can choose to use single or double quotes - its the wild west over here.

**What about undefined and null?**
Well, both mean “nothing”.
**Null** is like a placeholder where someone proactively decided to specifically declare “nothing”.
**Undefined** is kind of unintentional. Like, it’s nothing because no one got around to declaring or assigning anything yet so it defaults to “nothing”.

A use case for **null** might be creating a userEmail variable and assigning it to null in case the user does not provide an email.

You aren’t likely to specifically assign a value of **undefined** so there’s not a great use case to use as an example.

### Data Types & Variables Party Exercises

Use this repl to practice working variables and data types in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.  Be sure to disable AI Autocomplete at the bottom (towards the left).

[Data Types and Variables Playground repl](https://replit.com/@replit1369/Data-Types-and-Variables-playground#index.js)

A few things you might want to google or check out in the MDN docs as you party:
[concatenation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings#concatenation_using)
[string interpolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation)
[type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)

<br>

## Functions

Functions in JavaScript are just like methods in Ruby - they let us capture code in a reusable way.  In JavaScript, functions can stand alone and don't *have* to be part of an object or class.  If we do declare a function as part of an object or class in JavaScript, we would call that function a "method" - just like in Ruby.

Here are some examples of functions in JavaScript:
```js
function printGreeting(greeting) {
  console.log(greeting)
}

printGreeting('hi')  
//  prints "hi" to the console

printGreeting('sup')
//  prints "sup" to the console

printGreeting('oh hello there darling!')
//  prints "oh hello there darling!" to the console
```

Note that we can invoke the printGreeting function many times and pass different data to it as an argument each time.  This function just takes in data as an argument, then prints it to the console.  If we wanted to capture and store that data rather than just printing it, we would need to use the return keyword to get a value from the invocation of that function.  See this in the example below.

```js
function captureGreeting(greeting) {
  return greeting
}

var hiGreeting = captureGreeting('hi')  
//  nothing would print to the console now but "hi" would be stored in the hiGreeting variable

var supGreeting = captureGreeting('sup')
//  nothing prints to the console but 'sup' is stored in the variable

var fancyGreeting = captureGreeting('oh hello there darling!')
//  nothing prints to the console but 'oh hello there darling!' is stored in the variable
```

The syntax above is from ES5, a previous version of JavaScript that uses the "function" keyword.  Its very common and you will see this and use this syntax.  An update to JavaScript (ES6) provided a new syntax option for writing functions.  We often call this syntax "arrow functions".  See the captureGreeting function written in ES6 arrow function syntax below. 

```js
var captureGreeting = (greeting) => {
  return greeting
}

var hiGreeting = captureGreeting('hi')  
//  nothing would print to the console now but "hi" would be stored in the hiGreeting variable

```

You'll eventually need to understand and use both options but don't stress that now, it will come with time.  We recommend starting with the ES5 version using the "function" keyword.

### Functions Party Exercises

Use this repl to practice writing functions in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.   Be sure to disable AI Autocomplete at the bottom (towards the left).

[Functions Playground repl](https://replit.com/@replit1369/Functions-Playground)

<br>

## Conditionals

JavaScript lets us use `if / else if / else` statements to handle conditional logic.  You can use just an `if`.  You can use `if / else`.  Or you can use `if / else if / else` with as many `else if` conditions as you need.

Here's an example of an if/else conditionals in JavaScript:
```js
function evaluateSleep(hoursOfSleep) {  
  if (hoursOfSleep < 6) {
    console.log("I am groggy.");
  } else {
    console.log("I feel fantastic!");
  }
}

evaluateSleep(8);
// "I feel fantastic!" would print to the console


evaluateSleep(5);
// "I am groggy." would print to the console
```

Here's an example of an if/else if/else conditionals in JavaScript:
```js
function findLocation(nextLocation) {  
  if (nextLocation === "home") {
    console.log("It's been a long day, let's go home!");
  } else if (nextLocation === "work") {
    console.log("Good morning, finding the fastest route to work!");
  } else {
    console.log("Finding location.  Found it!  Let's go!");
  }
}

findLocation("home");
// "It's been a long day, let's go home!" would print to the console

findLocation("work");
// "Good morning, finding the fastest route to work!" would print to the console

findLocation("taco bell");
// "Finding location.  Found it!  Let's go!" would print to the console
```

### Conditionals Party Exercises

Use this repl to practice working with conditionals in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.   Be sure to disable AI Autocomplete at the bottom (towards the left).

[Conditionals Playground repl](https://replit.com/@replit1369/Conditionals-Playground#index.js)


<br>

## Objects (hashes)

Ruby call 'em hashes, JavaScript calls 'em **Objects.**  Just like hashes, an object is a data type that allows us to group related data in various key-value pairs.

Here's an example of a few objects in JavaScript:
```js
var student = {
  name: "Mark", 
  age: 34, 
  isSmart: true, 
  cohort: "SE 2407"
  instructors: ["Juliet", "Heather", "Kayla"]
}
```

Objects in JS can hold any other data type within it's key-value pairs.  You can even declare methods within an object in JS (without having to build an entire Class). 

### Object Party Exercises

Use this repl to practice working with objects in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.   Be sure to disable AI Autocomplete at the bottom (towards the left).

[Object Playground repl](https://replit.com/@replit1369/Object-Play)

<br>


## Arrays

Just like Ruby, in JavaScript an **Array** is a data type that allows us to store multiple pieces of data in _one_ variable

Here's an example of an array in JavaScript:
```js
var students = ["Cindy", "Josiah", "Rigo"]
```

Note the similarities between JavaScript and Ruby. Both languages have Arrays and are declared very similarly. The main difference is that JavaScript uses `var` to declare a variable.

Arrays in JS can hold any other data type.  You could have an array of strings, numbers, objects (like hashes in Ruby), or even an array of other arrays.

### Array Party Exercises

Use this repl to practice working with arrays in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.    Be sure to disable AI Autocomplete at the bottom (towards the left).

[Array Playground repl](https://replit.com/@replit1369/Array-play#index.js)

A few things you might want to google or check out in the MDN docs as you party:
[string interpolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation)
[for loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
[forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
[map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
[toUpperCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)


<br>


## For Loops and Iterator Methods

In any programming language, we will find outselves needing to "loop through" or "iterate over" collections of data stored in arrays.  Javascript lets us do this with a `for loop` and with various built in iterator methods like [forEach()](), [map()](), [filter()](), [find()](), and [reduce()]().  

For now, lets focus on for loops.

Here's an example of a basic for loop in JavaScript:
```js
for (var i = 0; i < 10; i++) {
  console.log(i);
}

//This for loop iterates 10 times because of the condition `i < 10` and simply logs the value of `i` each loop.
```

When used to iterate over an array, a for loop lets us use the `i` variable to access each element in an array, one at a time, and perform some action on or with that element.  

Here's an example of a for loop used with an array in JavaScript:
```js
var fruits = ['apples', 'oranges', 'bananas'];

for (var i = 0; i < fruits.length; i++) {
  console.log(`I have some ${fruits[i]}`);
}

//This for loop iterates based on the length of the array to ensure it can access every element.  Then we use `i` in bracket notation to access the corresponding element on each loop.
```

### For Loops Party Exercises

Use this repl to practice iterating over arrays with a for loop.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.    Be sure to disable AI Autocomplete at the bottom (towards the left).

[For Loops Playground repl](https://replit.com/@replit1369/for-loop-Playground#index.js)

