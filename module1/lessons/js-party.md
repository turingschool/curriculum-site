---
layout: page
title: JS Party
---

## Learning Goals

- Get exposure to JavaScript syntax
- Interact with and write unfamiliar code
- Just have a little fun!

## Party Plans

We'll use this time to get our hands dirty actually *writing* some code in JavaScript.   This is important practice but should feel like it is low stakes, no pressure, and dare we say....fun!  Be confident, be reckless, do something weird, break stuff.   

Google and the [MDN docs](https://developer.mozilla.org/en-US/) will be your friends as you're trying to work with JavaScript.  You might even leverage chatGPT for help if you're stuck and can't find solutions through google and MDN.  Just be sure to struggle through a bit on your own before turning to chatGPT.  And remember, chatGPT often provides info that is very much *not* correct. Ask it for help, not for "the answers".

## Set Up

**Follow the instructions in the README to fork and clone this [Mod2 Sandbox repo](https://github.com/turingschool-examples/mod2-sandbox)**.

Be sure to clone this repo into a directory where it will be easily accessible.  You will use this repo for all of your JS Party exercises as well as the exercises you'll do in front end lessons in Mod 2.  

*Important:*  VS Code offers packages and tools that can help you write your code. You should **NOT** be using any tools that will autocomplete or suggest autocompletion for your code as you work through these examples (and other Turing code).  Having this type of tool enabled will provide you with the code solutions you're supposed to be **figuring out** on your own.  This quickly renders your practice, and your tuition, to be a big ol' waste. 

<br>

## Data Types & Variables

JavaScript has 6 primitive (simple) data types but for now we really only care about 5 of them: Boolean, Undefined, Null, Number, String (BUNNS).  JS also has Objects and Arrays as its 2 non-primitive (reference) data types. 

Just like in Ruby, JS lets us store values in variables.  We can declare variables and assign, and re-assign values to them.


Here's some examples: 
```js
var boolean = true
var number = 5
var string = "potato"

var object = {
  firstKey: 1,
  secondKey: 2,
  thirdKey: 3
}

var array = ['one', 'two', 'three']
```

Note that strings in JavaScript require quotation marks (or backticks).  But you can choose to use single *or* double quotes - it's the wild west over here.

**What about undefined and null?**  
Well, both mean “nothing”.  
**Null** is like a placeholder where someone proactively decided to specifically declare “nothing”.  
**Undefined** is kind of unintentional. Like, it’s nothing because no one got around to declaring or assigning anything yet so it defaults to “nothing”.

A use case for **null** might be creating a userEmail variable and assigning it to null in case the user does not provide an email.

You aren’t likely to specifically assign a value of **undefined** so there’s not a great use case to use as an example.

### 🎉 Data Types & Variables Party Exercises

Use VSCode to open the [Data Types and Variables Playground file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/js_party/data_types_and_variables_playground.js) in the JS Party folder of your SE2 repo to practice working with variables and data types in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out. 

<br>

## Type Coercion, Concatenation, Interpolation

JavaScript lets us combines multiples pieces of data into one big string using concatenation or interpolation - essentially two different syntax options to accomplish the same goal.  Sometimes, JavaScript will use type coercion when it's trying to be helpful.  Whether developers actually appreciate these "helpful" efforts is debatable. 

### 🎉 Type Coercion, Concatenation & Interpolation Party Exercises

Use VSCode to open the [Type Coercion Concatenation Interpolation Playground file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/js_party/type_coercion_concatenation_interpolation_playground.js) in the JS Party folder of your Mod2 Sandbox repo to practice working with type coercion, concatenation & interpolation in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.  

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

<section class="note">
### JS vs Ruby - Key Differences

- To invoke a JS function, you write the function name followed by `()`.  You _must_ put the `()` to invoke the function.
- In Ruby, you have to pass data into the method as an argument in order to access that data in the method.  In JS, you can access data that is stored in a global variable even if you don't pass it into the function as an argument.
</section>

The syntax above is from ES5, a version of JavaScript that uses the "function" keyword.  It's very common and you will see and use this syntax.  An update to JavaScript (ES6) provided a new syntax option for writing functions.  We often call this syntax "arrow functions".  See the captureGreeting function written in ES6 arrow function syntax below. 

```js
var captureGreeting = (greeting) => {
  return greeting
}

var hiGreeting = captureGreeting('hi')  
//  nothing would print to the console now but "hi" would be stored in the hiGreeting variable

```

You'll eventually need to understand and use both options but don't stress that now, it will come with time.  We recommend starting with the ES5 version using the "function" keyword.

### 🎉 Functions Party Exercises

Use VSCode to open the [Functions Playground file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/js_party/functions_playground.js) in the JS Party folder of your Mod2 Sandbox repo to practice writing functions in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.   


<br>

## Conditionals

JavaScript lets us use `if / else if / else` statements to handle conditional logic.  You can use just an `if`.  You can use `if / else`.  Or you can use `if / else if / else` with as many `else if` conditions as you need.

Here's an example of an if/else conditional in JavaScript:
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

Here's an example of an if/else if/else conditional in JavaScript:
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

### 🎉 Conditionals Party Exercises

Use VSCode to open the [Conditionals Playground file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/js_party/conditionals_playground.js) in the JS Party folder of your SE2 repo to practice working with conditionals in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.   

<br>

## Objects (hashes)

Ruby call 'em hashes, JavaScript calls 'em **Objects.**  Just like hashes, an object is a data type that allows us to group related data in various key-value pairs.

Here's an example of an object in JavaScript:
```js
var student = {
  name: "Mark", 
  age: 34, 
  isSmart: true, 
  cohort: "SE 2407",
  instructors: ["Juliet", "Heather", "Kayla"],
  location: {
    city: "Denver",
    state: "Colorado",
    timezone: "Mountain"
  }
}
```

Objects in JS can hold any data type within it's key-value pairs.  You can even declare methods within an object in JS (without having to build an entire Class). 

<section class="note">
### JS vs Ruby - Key Differences

- To access data from within an object in JS, you can use dot or bracket notation.

Using the student object above, I can access the age value by:  

`student.age`  

`student['age']`

A common use case for using bracket notation to access data with a JS object is when the data point you care about is being passed into a function as an argument. You would then use the function's parameter within the bracket notation to access whichever data point is passed.

```js
function getStudentData(datapoint) {
  return student[datapoint]
}

getStudentData('age')  
  // passing 'age' as the arg means the bracket notation will be pulling the 'age' value from the object  


getStudentData('name')  
  // passing 'name' as the arg means the bracket notation will be pulling the 'name' value from the object
```
</section>

### 🎉 Object Party Exercises

Use VSCode to open the [Objects Playground file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/js_party/objects_playground.js) in the JS Party folder of your Mod2 Sandbox repo to practice working with objects in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.   


<br>


## Arrays

Just like Ruby, in JavaScript an **Array** is a data type that allows us to store multiple pieces of data in _one_ variable.  The data should be all the same data type and serve as a sort of "collection".  

Here's an example of an array in JavaScript:
```js
var students = ["Cindy", "Josiah", "Rigo"]
```

Note the similarities between JavaScript and Ruby. Both languages have Arrays and declare them very similarly. The main difference is that JavaScript uses `var` to declare a variable.

Arrays in JS can hold any other data type.  You could have an array of strings, numbers, objects (like hashes in Ruby), or even an array of other arrays.

### 🎉 Array Party Exercises

Use VSCode to open the [Array Playground file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/js_party/arrays_playground.js) in the JS Party folder of your Mod2 Sandbox repo to practice working with arrays in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.    


<br>


## For Loops and Iterator Methods

In any programming language, we will find ourselves needing to "loop through" or "iterate over" collections of data stored in arrays.  Javascript lets us do this with a `for loop` and with various built in iterator methods like forEach(), map(), filter(), find(), and reduce().  

For now, let's focus on for loops.

Here's an example of a basic for loop in JavaScript:
```js
for (var i = 0; i < 10; i++) {
  console.log(i);
}

//This for loop iterates 10 times because of the condition `i < 10` and simply logs the value of `i` each loop.
```

When used to iterate over an array, a for loop lets us use the `i` variable in bracket notation to access each element in an array, one at a time, and perform some action on or with that element.  

Here's an example of a for loop used with an array in JavaScript:
```js
var fruits = ['apples', 'oranges', 'bananas'];

for (var i = 0; i < fruits.length; i++) {
  console.log(`I have some ${fruits[i]}`);
}

//This for loop iterates based on the length of the array to ensure it can access every element.  Then we use `i` in bracket notation to access the corresponding element on each loop.
```

### 🎉 For Loops Party Exercises

Use VSCode to open the [For Loops Playground file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/js_party/for_loops_playground.js) in the JS Party folder of your SE2 repo to practice iterating over arrays with a for loop.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.    

Then, take a sneak peek at another, more sophisticated way to iterate over data in JavaScript - Array Prototype Iterator Methods!

Use VSCode to open the [Iterators Sneak Peek Playground file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/js_party/iterators_playground.js) and work through the exercises.

A few things you might want to google or check out in the docs as you party:    
    *[forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)*  
    *[map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)*  
    *[find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)*  
    *[filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)*  
    *[reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)*  
    *[toUpperCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)*


## Wrap Up

You can see that as developers, we will likely want to do similar data manipulation and logic regardless of what programming language we might be using.  The biggest difference, and biggest tripping point, is often syntax. When you realize that the work you're doing really applies to programming in general, not a specific language, it empowers you to feel confident in your ability to pick up and add *any* language to your skill set.  A little bit of practice, using your resources, asking questions and paying close attention to those details - especially syntax, will allow you to do so successfully. 

## More Practice (optional)

Use VS Code to practie more functions in the [More Functions Playground file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/js_party/more_functions_playground.js).

If you're looking for additional practice and elaboration on these JavaScript topics, you can check out our [legacy Front End curriculum lessons](https://frontend.turing.edu/lessons/) to learn more.

This [Extra Practice](https://frontend.turing.edu/lessons/module-1/extra-practice.html) resource from our legacy FE Curriculum may also be helpful.