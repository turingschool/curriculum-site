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

Use this repl to practice working variables and data types in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.

[Data Types and Variables Playground repl](https://replit.com/@replit1369/Data-Types-and-Variables-playground#index.js)

A few things you might want to google or check out in the MDN docs as you party:
[concatenation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Strings#concatenation_using)
[string interpolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation)
[type coercion](https://developer.mozilla.org/en-US/docs/Glossary/Type_coercion)

<br>

## Functions

<!-- Ruby call 'em hashes, JavaScript calls 'em **Objects.**  Just like hashes, an object is a data type that allows us to group related data in various key-value pairs. -->

Here's an example of some functions in JavaScript:
```js

```

<!-- Objects in JS can hold any other data type within it's key-value pairs.  You can even declare methods within an object in JS (without having to build an entire Class).  -->

### Functions Party Exercises

Use this repl to practice working with functions in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.

[Functions Playground repl]( )

## Conditionals

<!-- Ruby call 'em hashes, JavaScript calls 'em **Objects.**  Just like hashes, an object is a data type that allows us to group related data in various key-value pairs. -->

Here's an example of some conditionals in JavaScript:
```js

```

<!-- Objects in JS can hold any other data type within it's key-value pairs.  You can even declare methods within an object in JS (without having to build an entire Class).  -->

### Conditionals Party Exercises

Use this repl to practice working with conditionals in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.

[Conditionals Playground repl]( )


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

Use this repl to practice working with objects in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.

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

Use this repl to practice working with arrays in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.

[Array Playground repl](https://replit.com/@replit1369/Array-play#index.js)

A few things you might want to google or check out in the MDN docs as you party:
[string interpolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation)
[for loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)
[forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
[map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
[toUpperCase()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)


<br>


## For Loops and Iterator Methods

Ruby call 'em hashes, JavaScript calls 'em **Objects.**  Just like hashes, an object is a data type that allows us to group related data in various key-value pairs.

Here's an example  in JavaScript:
```js

```

Objects in JS can hold any other data type within it's key-value pairs.  You can even declare methods within an object in JS (without having to build an entire Class). 

### For Loops and Iterators Party Exercises

Use this repl to practice working with objects in JavaScript.  Use google, MDN and each other when you get stuck. You're not suppose to know this, so just have a little fun trying to figure it out.

[Loops and Iterators Playground repl]( )

<br>

## HTML

<br>

## CSS

<br>

## The DOM