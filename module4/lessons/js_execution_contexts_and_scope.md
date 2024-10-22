---
title: "JS: Execution Contexts & Scope"
length: 120
tags: javascript, execution, creation, hoisting, scope
module: 4
---

## Learning Goals

* Understand the order of execution for JavaScript code and why it matters
* Explain what an execution context is and describe what happens in both of its phases
* Describe the differences between `var`, `let` and `const` and when to use each
* Understand how the scope chain is initialized and utilized to resolve variables

## Vocab

- `JavaScript Engine/Interpreter` A program that executes JavaScript code. Most commonly used in web browsers
- `Hoisting` The process of implicitly moving the declaration of variables and functions to the top of their scope
- `Creation Phase` The phase where the interpreter sets aside some space in memory to store any variables and functions we might need access to.
- `Execution Phase` The phase where the interpreter executes Javascript code, line-by-line.
- `Execution Call Stack` A tool (data structure) for the interpreter to keep track of its place in a script that calls multiple functions
- `Scope` - The place in which a variable can be accessed.
- `Scope Chain` - A stack of currently accessible scopes, from the most immediate context to the global context.

# How JavaScript is Read

Having a good grasp on what is going on 'under the hood' - particularly how JavaScript is read by the browser - makes writing solid JavaScript code, debugging, and self-teaching new concepts much easier.

Each browser has what's called a 'JavaScript Engine' that translates (or interprets) your code line by line as it executes, which allows your application to perform the behaviors and interactions you've programmed. For example, if you've written the following code:

```js
const header = document.getElementById('header');
header.innerText = 'Lorem Ipsum Dolor'
```

The JavaScript engine will read and interpret these two lines in the order they've been written:  
- first the browser will find the header element,  
- then it will update its inner text.  

You can think of the JavaScript engine as a foreign language translator, who acts as an intermediary between two people who don't speak the same language. As developers, we understand how to write JavaScript, the JavaScript Engine knows how to read JavaScript, and can pass those instructions onto the rest of the browser.

## Understanding the Order of Execution

Just like we might read a book, we must completely finish reading one line before we move onto the next (otherwise that book wouldn't make much sense to us)! In programming languages, this is what we call **single-threaded**.

JavaScript is a **single-threaded** language, which means **each line of code must fully finish executing before it can move onto the next -- only one task can be executed at a time.**

<section class="call-to-action">
### In Your Notebook

```js
var modTwoTeachers = ['Hannah', 'Nik', 'Leta'];

function calculateEvals (teachers, classSize) {
  return classSize / teachers.length;
}

var numEvals = calculateEvals(modTwoTeachers, currentCohort);

var currentCohort = 33;
console.log(numEvals);
```

Looking at the example above, what would you expect to be logged when we get to line 10? Why?
</section>

Let's do a quick breakdown of what the interpreter did here to read this code:

<section class="dropdown">
### Breakdown of what the interpreter is doing  

1. **Line 1:** The `modTwoTeachers` variable is assigned the value of an array of instructor names.
2. **Line 7:** We then skip down to line 7, because we are not currently invoking the function that's been declared, so we skip over that for now. On line 7, the `numEvals` variable is assigned to the value of the function expression (the invoking of) `calculateEvals`.
    - _Technically, lines 2-6 are still being read and understood by the interpreter as a function declaration. It just doesn't EXECUTE this code._
3. **Line 3:** Because line 7 told us to invoke `calculateEvals`, the interpreter will jump back up to line 3 and begin executing that function.
4. **Line 4:** return `classSize / teachers.length` - the function expression evaluates to the calculated value.
5. **Line 9:** Our function has finished executing, so we're going to pop out of that and pick up where we left off, which is on line 9, where the `currentCohort` variable is assigned the value 33.
6. **Line 10:** We log the value of our `numEvals` variable to the console, which gives us NaN.

Based on this order of execution, we ultimately receive NaN as our result because the value of our `currentCohort` is not assigned until **after** we already do the math within `calculateEvals`. At the time `calculateEvals` executes, the value of our `currentCohort` variable is `undefined`. So what our function is really doing is trying to return `undefined / 3` -- which will always result in NaN. NOTE: You will get a different error message instead of `NaN` if declaring variables with `const` instead of `var`.
</section>

<section class="call-to-action">
### Looking at another example

```js
const moo = mooLikeACow();

function mooLikeACow() {
  return 'Moooo!';
}

console.log('Animal Sound: ', moo);
```

What would we expect to be logged when line 7 executes? Why? Is the actual behavior different than you expected?
</section>

### Hoisting & The Creation Phase

In order to understand what's happening here, we must explore another step the interpreter takes before executing our code.

The interpreter takes a first pass to skim over our code and get a general idea of what we're doing and what variables and functions we'll be using. This is called the **creation phase**. In the creation phase, the interpreter sets aside some space in memory to store any variables and functions we might need access to.

Using the first code example, the interpreter recognizes that we're going to be working with a function called `calculateEvals` and some variables - `modTwoTeachers`, `numEvals`, and `currentCohort`. In trying to be helpful, the interpreter **hoists** these functions and variables to the top of our scope. Behind the scenes, the interpreter would essentially be changing our code to look something like this:

```js
var modTwoTeachers, numEvals, currentCohort;
function calculateEvals(teachers, classSize) {
  return classSize / teachers.length;
}

modTwoTeachers = ['Hannah', 'Nik', 'Leta'];

numEvals = calculateEvals(modTwoTeachers, currentCohort);

currentCohort = 33;
console.log(numEvals);
```

Our variable **declarations** are hoisted to the top of our code block, but their **initialization** or **assignment** remains on the original line it was written. Therefore, all three of our variables are `undefined` until the **execution phase** when the interpreter reaches the lines where we assign them values.

Our function is also hoisted to the top of our code block, with its entire definition alongside it. This gives us insight into why our second example still worked without throwing an error:

```js
function mooLikeACow() {
  return 'Moooo!';
}

const moo = mooLikeACow();

console.log('Animal Sound: ', moo);
```

When functions are hoisted to the top of our code block, it hoists not just the function name, but the code inside of it as well. This means we can invoke functions before we've declared them without running into errors.

This hoisting behavior adds some complexity to the JavaScript language, and is important to understand thoroughly in order to anticipate the values of your variables at any given time.


<section class="call-to-action">
### Turn and Talk

With a partner, take turns explaining how the following JavaScript code would be translated by the interpreter. We will come back together as a class to discuss:


```js
const hungriestDog = 'Tess';

function begForTreats(seconds) {
  const result = seconds * 2;

  if (result > 5) {
    return 'This human is rude, not giving me treats. Onto the next one.';
  } else {
    return 'Yum, human food!';
  }
}

let beggingTime = 1;

let beg = begForTreats(beggingTime);

beggingTime = 4;
console.log(beg)
```
</section>

## Execution Call Stack

Chances are good that you have come across information that references `The stack`, `The call stack`, or the `Execution Call Stack`. A [call stack](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack) is a way for the JavaScript interpreter to keep track of its place (its current execution context) in a script that calls multiple functions — what function is currently being run, what functions are called from within that function and should be called next, etc.
A stack is a fundamental data structure in Computer Science that follows "First-In-Last-Out" (FILO) semantics. Any time a new function is invoked (and a new execution context is created) this execution context is pushed to the stack. Once a function has returned, the call is popped off the stack. The stack is used to determine in what order the code runs. Let's look at this example:  

```js  
function buildLaser () {  
  var message = 'Laser Built';  
  console.log(message);
}

function buildMoonBase () {  
  var message = 'Moon Base Built';  
  buildLaser();
  console.log(message);
}

function ransomTheWorld () {
  buildMoonBase();  
}

ransomTheWorld();  
```

<section class="dropdown">
### What's happening here?  

As the call stack builds up, each function has its own execution context.  
1. We start in the global execution context  
1. `ransomTheWorld` is called, creating a new call on the stack
1. `buildMoonBase` is called creating a new call on the stack. Within this function, a variable is declared and `buildLaser` is called  
1. `buildLaser` being invoked creates a new call on the stack
1. `buildLaser` declares a variable, prints the variable to the console, and is returned and popped off the call stack... bringing us back to the context of `buildMoonBase`  
1. `buildMoonBase` prints the previously declared variable to the console and is returned and popped off the call stack... bringing us back to the context of `ransomTheWorld`
1. `ransomTheWorld` returns and is popped off. Our stack frame is empty and we are back in the global execution context.  

![callstack building up](https://media.giphy.com/media/3ohs4rkYvzISB83cqY/giphy.gif)
</section>


## Scope

Now that we understand the order of execution a bit, we can dive deeper into the concept of scope. **Scope** is how we describe where a variable or value can be accessed.

<section class="call-to-action">
Pre-ES6 variables often are described as having either global scope or local (function) scope.

* Looking at the below example, does our `makeNoise` function have access to the `cowNoise` and `catNoise` variables?
* What about outside of our function?  Do we have access to `cowNoise` and `catNoise` here as well?   
* How would you describe the differences between a *globally* vs *locally* scoped variable?

```js
var cowNoise = 'moo';

function makeNoise() {
  var catNoise = 'meow';
  console.log('Cow Noise inside of Function: ', cowNoise);
  console.log('Cat Noise inside of Function: ', catNoise);
}

makeNoise();

console.log('Cow Noise outside of Function: ', cowNoise);
console.log('Cat Noise outside of Function: ', catNoise);
```
</section>

### Global, Function/Local, and Block Scope

We have several scopes available to us: global, local (also known as function), and block scope.

<section class="call-to-action">
### Global scope

Here is an example that uses *globally* scoped variables. They're declared at the top level of our file, not tucked inside a function or other block of code. 

```js
var one = "one";
let two = "two";
const three = "three";

showNumbers();

function showNumbers () {
  console.log("In function: ", one, two, three);
  if (one && two && three) {
    console.log("In if block: ", one, two, three);
  }
}
```
</section>

<section class="dropdown">
### Global Scope Takeaways  

- Global scope is the default.
- Everyone and everything has access to the global scope.
- Functions and variables in the global scope are "vulnerable" because they can be accessed by everything and potentially mutated (changed).
- `var`, `let`, and `const` can be globally scoped.
</section>

<section class="call-to-action">
### Function/Local Scope

Here is an example that uses *locally* (or *function*) scoped variables.  We can see that they are declared within a function.

```js
function readWords() {
  var greeting = "Hello, friend, ";
  let question = "how are you? ";
  const response = "I am fine."

  if (true) {
    console.log('Sentence in the if block: ', greeting, question, response);
  }

  console.log(greeting + question + response);
}

readWords();

// Am I able to access the variables here?
console.log(greeting + question + response);
```
</section>

<section class="dropdown">
### Function/Local Scope Takeaways  

- Variables declared in the function (using `var`, `let`, or `const`) can only be accessed by the other code inside the function.
- Because these variables are only used and accessible within the function, it is clearer for another developer to understand the impact of changing them and is less likely to result in issues when compared to globally scoped variables.
- The global scope cannot access function scope.
</section>


<section class="call-to-action">
### Block Scope

Here is an example that uses *block* scoped variables.  We can see that they are declared with in the `if` *block* of code.

```js
function readWords() {
  var greeting = "Hello, friend, ";
  let question = "how are you? ";
  const response = "I am fine."

  if (true) {
     var greeting = "Sup dawg, ";
     let question = "what's good?";
     const response = "Nm."
     console.log('Sentence in if block: ', greeting, question, response);
  }

  console.log(greeting + question + response);
}

readWords();
```
</section>

<section class="dropdown">
### Block Scope Takeaways  

- Variables declared in the [block statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block) (`if` blocks, `for` loops, etc) using `let` or `const` can only be accessed by other code inside the block.
- Variables declared in block statements using `var` will not be scoped within the block (as this is a special feature of `let` and `const`). Variables declared with `var` will "leak out" of the block to the block's parent scope.
</section>

## Scope & Scope Execution Practice

#### Parent vs. Child Scopes

Let's look at another example and compare how scopes work between the parent and child.

<section class="call-to-action">
### Problem #1

Review the example below and answer the following questions:

```js
const array = [5, 4, 3, 2, 1];
const secondNumber = array[1];

function getFirstNumber() {
  const firstNumber = array[0];
  return firstNumber;
}

function getSecondNumber() {
  return secondNumber;
}

console.log('getFirstNumber(): ', getFirstNumber())
// console.log('getSecondNumber(): ', getSecondNumber())

// console.log('secondNumber: ', secondNumber);
// console.log('firstNumber: ', firstNumber);
```

* Run the `getFirstNumber` either in a sandbox or your console.  What happens & why?
* Do the same for `getSecondNumber` and discuss similarly what happens & why.
* Finally, log `secondNumber` and `firstNumber`.  Note what happens when doing one vs the other.  Why?
</section>

<section class="note">
### Review Note:

Parent scopes do not have access to child scopes BUT child scopes do have access to their parent scope.  
</section>

#### Block Scoped Variable Practice

As we discussed earlier, variables declared with the keyword `let` or `const` will be block scoped if declared within a block. This means that they are scoped to the block statement (`if`, `for`...) in which they are declared. When you see `{` and `}`, those curly brackets are likely creating a scope, - as with `function`, `if`, and `for`.

<section class="call-to-action">
### Problem #2

Run the following examples in your sandbox or console:

```js
// Example #1:
let message = 'You are doing great!';

if (message.length > 0) {
  let message = 'I think you are amazing!';

  console.log('Inside of conditional:', message);
}

console.log('Outside of conditional:', message);
```

```js
// Example #2
function getIndex(searchQuery) {
  const names = ["Nik", "Travis", "Hannah"];

  for (let i = 0; i < names.length; i++) {
    if (names[i] === searchQuery) {
      console.log ('The index is: ', i);
      break; //break just stops the for loop execution
    }
  }
  return i;
}

console.log('getIndex(): ', getIndex("Hannah")); // What will happen?
```

* Run this code in a sandbox or console.  What happens?
* Be prepared to try to explain what is happening and why.  Guesses are fine!
* Then replace `let` with `var` in **Example #2** and note what happens!
</section>

<section class="checks-for-understanding">
### In Your Notebook

- Describe "scope" in your own words.
- What are the similarities and differences between `var`, `let`, and `const`?
- What might be a metaphor or analogy for scope? Draw or diagram it out.
</section>

-------------------------------------------------------------

## Scope Chain

Whenever a variable is used, the JavaScript interpreter traverses the `scope chain` until it finds an entry for that variable. Traversal on the scope chain always starts in the most immediate scope and moves towards the global space. Note that the scope chain is initialized during the "creation phase" of the interpreter running through the code.  Let's see an example of this in action!

<section class="call-to-action">
### In Breakout Groups

Consider the following example and explain what is happening:

```js
let number = 10;

function logNumber() {
  number = 20;
  console.log('A', number);
}

console.log('B', number);

logNumber()

console.log('C', number);
```

* Before running the code, what do you think the value of `number` is in each of the logs?
* Now run it and take note of what happens.  Allow each person in the group to explain what they think is happening.
</section>

<section class="dropdown">
### What is happening here?  

1. `logNumber` and its definition as well as the declaration `number` are stored in global memory
2. Line 1 - `number` is assigned the value of 10
3. Line 8 - prints `B 10` to the console
4. Line 10 - `logNumber` is invoked, creating a new execution context
5. Line 4 - A variable is declared without the keyword `var` and assigned a value. The interpreter searches in the current execution context to see where this variable was defined. Because it doesn't find it declared in the current scope, it looks up the scope chain to the parent scope, which happens to be the global scope. The interpreter understands that this is to be treated as a re-assignment and assigned the value of `number` to 20, both locally and globally.
6. Line 5 - prints `A 20` to the console
7. Line 12 - prints `C 20` to the console
</section>

<section class="note">
### Major Takeaways

* The scope chain (e.g. "What is the parent scope for this variable? The grandparent scope?") is determined by where functions are _defined_ in the code base.... not where functions are _invoked_.

* Every time a variable is initialized, the interpreter will first look in its own scope to see if the label can be found. If it is not found, it will look "up" the scope chain to the parent scope to try to resolve the variable in the parent context.

* If that label is never found, the interpreter will declare it globally on the window and the variable will be scoped as such.
</section>

<section class="note">
### Clarification between Scope Chain & Hoisting

It is important to note that the interpreter moving up the scope chain to resolve variable values is *NOT* hoisting.  Remember that the JS interpreter hoists declarations (storing them in memory) during the creation phase, not when the code itself is being executed.
</section>

<section class="dropdown">
### More Practice

<section class="call-to-action">
With a partner, take turns walking through the following code examples:

Example 1:

```js
function logLocalNumber () {
  var localNumber = 20;
  number = localNumber;  
}

logLocalNumber()

console.log(number);  // what will log here?
```
</section>
<section class="call-to-action">

Example 2:

```js
var givenName = 'Amon Williams';

function printGreeting() {
  console.log(`Hello ${givenName}`);
}

printGreeting('Khalid') // what will log here?
printGreeting()      // what will log here?
```
</section>
<section class="call-to-action">

Example 3:

```js
var givenName = 'Amon Williams';

function printGreeting() {
  let givenName = "Khalid"
  console.log(`A: Hello ${givenName}`);

  if( givenName.split(" ").length < 2) {
    givenName = "Khalid Williams";
    console.log(`B: Hello ${givenName}`);
  }

  console.log(`C: Hello ${givenName}`);
}

printGreeting()

console.log(`D: Hello ${givenName}`);

// What logs at each letter?
```
</section>

<section class="call-to-action">
Example 4

```js  
const myNum = 21;

function addTwo(num) {
  hello();  
  return num + 2;
}

function hello() {
  console.log('hello');
}

const sum = addTwo(myNum);
console.log(sum);
```
</section>
</section>



<section class="checks-for-understanding">
### Final Reflections

Using your journal, take a few minutes to answer the following:

- What is hoisting?  
- What is an execution context?
- Why is it important to understand scope?
- What is the scope chain? What does it do?
</section>

### Additional Resources

* [Ultimate Guide to Execution Contexts, Hoisting, Scopes and Closures](https://www.youtube.com/watch?v=Nt-qa_LlUH0)
* [Var, Let and Const - What's the Difference?](https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/)
* [How JavaScript variable scoping is just like multiple levels of government](https://blog.codeanalogies.com/2017/11/22/how-javascript-variable-scoping-is-just-like-multiple-levels-of-government/)
* [JavaScript Visualizer](https://tylermcginnis.com/javascript-visualizer/)