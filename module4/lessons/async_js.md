---
title: Asynchronous JavaScript
length: 90
tags: javascript, asynchronous, fetch, promises
module: 4
---

## Lesson Pre-work
<section class="call-to-action">
### Pre-Work

Prior to this live lesson: 
- Read [this article](https://dev.to/steelvoltage/if-javascript-is-single-threaded-how-is-it-asynchronous-56gd){:target='blank'} about how JavaScript is asynchronous and also single threaded. (5 mins)

- Watch the video in the intro of [this site](http://latentflip.com/loupe){:target='blank'}.  Note the **call stack**  as well as the **Web API** the article discusses. (26 mins)

- Then, explore [the site](http://latentflip.com/loupe){:target='blank'} to see the nice visualization of how asynchronous code runs in the browser. (10 mins)
  - When running the code, note where the `console.logs` are moved.  What about the `event listener` or `setTimeout`?
  - Where does the `setTimeout` move to before going back to the **call stack**?  What do you think this **callback queue** is?
  - Click on the *Click Me!* button on the bottom left-hand corner.  Consider the order of events.
</section>


## Learning goals
* Understand why we need asynchronous javascript
* Understand what happens behind the scenes when asynchronous javascript runs and the steps it goes through

## Vocab

- `Execution Call Stack` A data structure for the interpreter to keep track of its place in a script that calls multiple functions. It is single threaded and LIFO (Last In First Out)
- `Web APIs` Built in APIs that have a separate execution context from your code (They act as separate threads) examples include `setTimeout` and `fetch`
- `Callback Queue` A data structure that holds functions returned from Browser APIs that are ready to go back on the stack. It is FIFO (First In First Out)
- `Event Loop` Middleman between callback queue and call stack. Checks if call stack is empty and adds functions from the callback queue

Let's talk more about JavaScript and it's ability to be asynchronous. What does that mean, and how can we wrangle or take advantage of that fact?

<section class="call-to-action">
### Review

- What is an **API**?
- What is **asynchronous code**?
- What do you know about **fetch**?
- How would you describe **execution contexts & the call stack**?
</section>

## Introduction

When we say **single-threaded**, that could be read as doing one thing at a time, one-by-one until the code is done. When we say **asynchronous**, that could mean that multiple things are being done at different times. How can JavaScript do both? They seem to be in conflict with one another.

<section class="call-to-action">
### To The Docs!

Spend 15 minutes reading through and taking notes on this [Introduction to Asynchronous JS](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing) of the MDN Docs.

As you read, take notes on key points, new vocabulary, questions you have and concepts you need to dig into further.

* How were asynchronous operations handled in JS in the past?  Why was this not ideal?
* What is the more modern approach to handling asynchronous operations? 

</section>

What would it be like if we _didn't_ have a way to run code asychronously?  What if all code blocked the code after it?  And we had to wait for each thing to happen before the next thing could happen?  Can you IMAGINE??

<section class="call-to-action">
### With A Partner

We've used .then and promises as a way to deal with asynchronous JavaScript when using `fetch`.

Given the following code snippet:
```javascript
console.log('ramen');

fetch("https://opentdb.com/api.php?amount=1&category=27&type=multiple")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));

console.log('burrito');
```

* How does `fetch` fit in with the code above and below it?
* What order will the console logs show up in and why?
* Using terms like the call stack, Web API, & callback queue, explain this is working behind the scenes.
* How are promises being utilized in this code?
</section>


## Call Stack and Event Loop

How can JavaScript keep track of what code or function is running at any given time? How can we keep track or visualize how to expect the code to behave? JavaScript handles this using a few tools: the call stack, event loop, and a queue.

<section class="call-to-action">
### Video Time

The [video from the prework](https://www.youtube.com/watch?v=8aGhZQkoFbQ){:target='blank'} has some great visualizations for the call stack, event loop, and queue. Pay close attention during the following points:

* ***4:15-6:00*** (call stack with synchronous functions)
* ***6:40*** (stack overflow example)
* ***7:20-8:50*** (imagine if `fetch` were synchronous - we would have to wait for each request to complete before moving on)
* ***10:23-11:46*** (asynchronous callbacks - `setTimeout`, what happens to the `setTimeout` on the stack?)
* ***11:47-14:50*** (intro to the event loop)

Please take notes and pay special attention to the vocab words at the top of this lesson as you watch
</section>

## Interview Prep

It is important that you're able to speak on these concepts in a technical interview. Let's spend some time practicing common interview questions:
* What does it mean that JavaScript is "single threaded"? With that - how is it possible that we can run asynchronous code in JavaScript?
* Tell me about a time you needed to use asynchronous code to solve a problem in a project you built.
* Describe the relationship between the event loop, callback queue, and call stack. 

<section class="checks-for-understanding">
### Check for Understanding

* Review how the call stack works with synchronous events?
* What is involved with asynchronous events such as setTimeout or fetch?
* Describe the relationship the event loop has with the callback queue and call stack.
</section>

### Additional Resources
* [event loop article](https://www.educative.io/edpresso/what-is-an-event-loop-in-javascript){:target="\__blank"}
* [Loupe](http://latentflip.com/loupe){:target="\__blank"}
* [mdn async deep dive](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous){:target="\__blank"}
* [single threaded/async JS article](https://dev.to/bbarbour/if-javascript-is-single-threaded-how-is-it-asynchronous-56gd)