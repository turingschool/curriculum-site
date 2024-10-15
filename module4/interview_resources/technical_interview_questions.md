---
title: Technical Interview Questions
layout: page
---

## Interview Prep
To practice and become more fluid with your responses to these questions, **write** down your responses in your notebook - do not type them on your computer. After you're done writing them down, you can type them into your computer if you'd like. Practice your answers outloud as well.

Practice your answers using the correct, precise terminology as if you were talking to an interviewer.

<section class="note">
  Some of the questions below pertain to technology or processes that you may not have learned at Turing. These questions will be marked with an asterisk (*). These questions are particularly good questions to practice gracefully exiting or could be good starting points for further learning.
</section>

## Questions

### Fullstack Development Questions

* Define the term ‘MVC’ and explain how an application is architected when following MVC patterns.
* Describe each of the four fundamental concepts of object-oriented programming. How would you implement each of these in your code?
* What can you tell me about RESTful APIs?
* What are some tools and strategies you use to prevent shipping unstable code to production?
* What factors influence whether you’ll take a progressive enhancement vs. graceful degradation approach to building an application?*
* Describe the purpose of a JSON Web Token*
* How does JSON work?
* What are libraries you have used?
* What are frameworks you have used?
* What is CORS?
* In as much detail as possible, describe the HTTP request-response cycle.
* What does a 200 status code mean?
* What does a 400 status code mean?
* Why use cookies?*
* What’s the difference between a session and a cookie?
* Have you used local storage?
* Explain how a GET request works.
* What is TDD and what benefits does it provide? 
* What is the difference between unit, integration, and acceptance-level testing? Can you talk about times when you've done either?
* Tell me two advantages of testing your code.
* What is your code review process?
* What are the benefits of using a version control system like Git?
* How do you resolve a merge conflict?
* Explain how a branch works in git.
* How do you make sure your project meets the requirements you have received?
* What IDE do you use?
* Do you know the concept of SCRUM?*
* Explain what Agile is.
* What is HTTP and give a brief definition?
* Explain a git merge workflow vs a git rebase workflow
* What's a background worker? When would we want to use a background worker?*
* What’s the difference between authentication and authorization? What tools have you used to set up either of these in the past?
* What does API stand for and how do you define it?
* What does it mean to compile code?*
* Tell me two advantages of testing your code.
* My production and development environments are using large sets of data. What are some ways to optimize my tests to run quickly, but be thorough?
* What is a Mock vs. a Stub in testing? When would you use each?
* In as much detail as possible, describe DNS.*
* Describe what an SOA (Service Oriented Archicture) application is and looks like? What are the benefits and drawbacks?
* Explain to me the general meaning behind each series of error codes (ex. 200's, 300's, 400's, 500's).
* Describe how you've built error-handling into one of your applications in order to gracefully handle exceptions. 



### FE-specific Technical Questions

* What are some core principles of functional programming? 
* What makes a function pure? 
* What is immutability?
* What is a higher order function? 
* What is the purpose of a return statment in a function? 
* What is function composition?*
* What is currying?*
* What are some benefits of functional programming?
* What is a closure, and how/why would you use one?
* What is memoization and how can it improve the performance of a function?*
* Explain the concept of hoisting. 
* What is the 'this' keyword in JavaScript?
* Explain the concept of event delegation.
* What is a promise and why is it helpful?
* What is block scope and how is it different from global and local scope?
* Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?
* What’s the difference between `undefined` and `null`.
* What's the difference between let and const?
* What is the event loop?
* What does event bubbling or event propagation mean?
* What is `"use strict";`? What are the advantages and disadvantages to using it?
* How is an array different from a JavaScript object?
* What function would you use to search an array and return a value?
* How would you find all the values for a specific key in an array of objects?
* How do you interact with APIs on the front end?
* What is chaining in javascript? 
* How do you stay up-to-date on JS and React news/improvements?
* Name three strategies for fixing cross-browser inconsistencies*
* What does CORS stand for and what issue does it address?
* In as much detail as possible, describe the request-response cycle.
* What are some popular NodeJS Modules?*
* What does npm eject do?*
* What does npm build do?
* What's the difference between ES5 and ES6?
* What is the DOM? How is the virtual DOM different?
* What advantages does React offer? What about disadvantages?
* What is the concept of state in React?
* What is a React component?
* What problems does Redux solve?*
* What is JSX? How is JSX different from HTML?
* How are props different from state?
* Whats your experience with React Hooks? Why use them?
* What is Flexbox and why is it important for creating layouts? 
* What is Grid and why is it important for creating layouts? 
* In as much detail as possible, explain how you would localize an application.*
* Can you describe what responsive design is to you and how you would implement it?
* What's the difference between display: inline and display: inline-block?
* What is a pseudo class? What are they used for?
* Describe z-index and how stacking context is formed.
* If you have two elements inside of an outer containing element, one with float: left; and the other with float: right, how can you ensure that the containing element expands around the floated elements and does not collapse?
* Explain why the following doesn't work as an IIFE: `function foo(){ }();`. What needs to be changed to properly make it an IIFE? Why?*
* Why is it generally a good idea to position CSS `<link>`s between `<head></head>` and JS `<script>`s just before `</body>`? Do you know any exceptions?
* In an HTML file, what does the 'doctype' keyword do?
* Give an example of a self-closing HTML tag.
* What’s the difference between `window.onload` and `onDocumentReady`
* Give an example of an element that is considered a 'block-level' element? An example of an inline element? What's the difference between block-level and inline elements?
* What could we use instead of `<b>` tags for bold and `<i>` tags for italics to make our HTML more semantic?
* What is the purpose of article, section, header and footer tags? Please explain with an example and why we should not use divs.
* What are HTML data attributes?
* What steps do you take to make a website accessible?


### BE-specific Technical Questions

* What is the difference between Array#map and Array#each?
* Name 4 ruby enumerables excluding each and map and give a brief example of what’s unique about each.
* What's a module in Ruby? What's the difference between a class and a module? What are some good use cases for modules?
* What are a few ways to optimize a Rails application?*
* Where have you seen Object-Oriented Programming principles put to use in a Rails application?
* What is the purpose of a controller?
* How do you represent a many-to-many relationship in a database?
* What is the purpose of a foreign key?
* What is an Object Relational Mapper? What is the ORM for Rails?
* What does the "fix forward" principle in database management mean?
* How might you apply the DRY principle to a Rails controller?
* Why might you build a Rails serializer? What is its responsibility within the MVC framework?
* What is yield in Ruby? What is it useful for? Give an example of where you would put it.*
* An enumerable by any other name still behaves the same. Give the other name for these 3 Ruby enumerables Detect, Select, Collect.
* There are only 2 values in Ruby that evaluate to false - what are they? 
* What is Rails?
