---
title: "JS: Network Requests - Fetch"
length: 3 hours
module: 3
tags: network request, fetch, get, post, async
---

### Learning Goals

* Understand the difference between synchronous and asynchronous operations
* Get familiar with the `Promise` object and the fetch API
* Know what a `GET` request does and how to use it
* Know what `POST` requests do and how to use them

### Vocab

* `Async` / `Asynchronous` Executing code without blocking the execution of code after it
* `AJAX` Updating a webpage based on data from the network without reloading the whole thing
* The `Promise` Object - represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

## What is a network request?
Let's start by reviewing what a network request is and see it in action!

<section class="call-to-action">
### Warmup

Open up your dev tools and navigate to the **Network** tab. Refresh the page and watch what happens.  You should see something like this:

![network dev tool example](../../../assets/images/lessons/fe_network_requests/network_tab.png)

* In your notebook, write down what a network request is in your own words.
* Based on the data that shows up in the Network tab, what are each of the columns referring to?  (totally okay to take an educated guess)

<section class="dropdown">
### What's happening here?

Each item listed is a request for a file from some server somewhere. The one on the top is the initial HTML file, and then the link tags in your HTML prompt network requests for the stylesheets and JavaScript files necessary.  Cool!
</section>
</section>

## Making a Request

Each network request takes time - they're *expensive*. Imagine if you had to wait for a webpage to load one thing at a time! It would not make for a great user experience.

Network requests are expensive no matter what we do. However, we can run them *asynchronously*, saving some time.

`Asynchronous` operations refer to things that can happen outside the normal order of execution. Network requests can be `synchronous` or `asynchronous`, but most modern applications do them `asynchronously` to improve performance / the user experience.

<section class="note">
### Multiple Ways of Making Requests

Note that there are a few ways to make a request.  One way you might see is through a process called AJAX, or [**A**synchronous **J**avaScript **A**nd **X**ML](https://developer.mozilla.org/en-US/docs/AJAX){:target='blank'}. AJAX was a huge advancement for the web, as it allowed developers to update part of a webpage without reloading the entire thing.

Traditionally, AJAX requests have been made via the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest){:target='blank'} object. However, the process is a little clunky, with developers transitioning over to a more streamlined way using the **fetch API**.  This is much more commonly used by developers nowadays and will be the primary way we make network requests at Turing.

The great thing about using the fetch API is that we can use it "for free" with ES6 (as opposed to needing a separate npm package)!
</section>

## ES6: fetch()

Speaking of using the fetch API, let's take a look at the docs on what it is!

<section class="call-to-action">
### In Breakout Groups

Using the [fetch API docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API){:target='blank'}, answer the following questions.

* What arguments does the `fetch` method take?  Clarify which ones are mandatory and optional.
* What does `fetch` always return?  If the term is new to you, read further on what it is.
</section>

<section class="answer">
### Key Takeaways  

- The `fetch()` method takes one mandatory argument, the path to the resource you want to fetch.
- It can take an optional options object to get more specific about the `method`, `body`, and `headers`.

```js
fetch(resourceUrl, {/* object with `method`, `body`, and other optional properties */});
```

- `fetch` will *always* return a promise that either *resolves* or *rejects*.
</section>

### GET with Fetch

By default, fetch performs a `GET` request. This means that if we only add a resource url to the fetch call, we'll try and `GET` information from that resource.

<section class="call-to-action">
### Try it out!

Try typing this in your console and see what you get back:

```js
fetch("https://opentdb.com/api.php?amount=1&category=27&type=multiple");
```

* This is a basic `GET` request to the [Trivia API](https://opentdb.com/api_config.php){:target='blank'} to send us back a random trivia question.  Does it return what you expect?
</section>

## Promises - The Quick Version

A `Promise` is an object that represents the eventual completion of an action.

A Promise will either be resolved upon completion, or rejected upon failure. We can use special methods for promises to determine what needs to happen in either of those scenarios:

* `.then()` runs upon the resolution of a promise and returns another promise
* `.catch()` runs upon the rejection of a failed promise and is used for error handling

<section class="note">
### `async/await``

You may see `async/await` syntax when researching online. We know `async/await` is tempting, but it is important that you are able to work with the approaches that pre-date the introduction of `async/await`, like `.then()`. We find that beginning with `.then()` syntax is a much easier way to learn, and a perfectly acceptable way to write code.    
</section>

## What do I do with this "Promise {<pending>}"?

Diving into the returned promise reveals some information, such as its status and value, but nothing that's too immediately useful. Instead we have to resolve it:

```js
fetch("https://opentdb.com/api.php?amount=1&category=27&type=multiple")
  .then(response => console.log(response))
```

* What do you get when you log the response object?  Take note of the properties there.
* There's one problem: we can't seem to get the data we want from the `Response.body`.  How is data sent through requests and responses?

## Parsing Our Response  

Similar to what you did with localStorage, we'll need to parse our response!  We'll need to use the **`Body.json()`** method that comes with fetch to parse it and call another `.then()`.

From the docs, the `.json()` method returns "A promise that resolves with the result of parsing the body text as JSON. This could be anything that can be represented by JSON — an object, an array, a string, a number.

Let's try it out!

```js
fetch("https://opentdb.com/api.php?amount=1&category=27&type=multiple")
  .then(response => response.json())
  .then(data => console.log(data));
```

Lastly, we can add in a `.catch()` to account for any errors we may run into.

```js
fetch("https://opentdb.com/api.php?amount=1&category=27&type=multiple")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => /* do something else */);
```
<section class="call-to-action">
### Practice in the Console

Using the [Trivia API](https://opentdb.com/api_config.php){:target='blank'}, do the following in your console:

- Fetch 10 science questions using fetch and console.log the entire response
- Fetch 20 geography questions and for each trivia object console.log the answer only
- Fetch 20 geography questions and console.log the response status code.
</section>

<!-- <section class="call-to-action">
### Practice with an Application

Head to <a href="https://github.com/turingschool-examples/fe2-fetch-practice" target="\__blank">this repo</a> for some practice with GETting.

Working with a partner, follow the setup instructions to get the server running.  Then follow the steps in order within the `client/index.js` file and test it out by opening the `client/index.html` file.

Note that this repo will be used for the GET and POST lessons. Be careful to only complete the GET practice today. We'll come back to this repo later when we <a href="https://frontend.turing.edu/lessons/module-2/network-requests-posts.html" target="\__blank">learn how to POST</a>!
</section> -->

## Common Misconceptions

Let's look at this code:  
```js
fetch('some_url')
.then(res => res.json())
.then(data => console.log(data))
.then(data => /* do something with data */) /* <--- this line won't work! */
```

Let's think about these questions:  
<section class="answer">
### Why doesn't data in line 4 refer to the same data in line 3?

Explanation: Parameters are scoped to their function, so you cannot reference a parameter from one function in another. Each callback function defines their own scope (i.e. creates their own execution context).
</section>
<section class="answer">
### Why is data in line 4 undefined?

Explanation: `.then` always returns a Promise, and when that promise resolves, it evaluates to whatever the callback returns and hands it off to the next `.then`. The callback function on line 3 does not return anything, so `undefined` is the value handed off to the `.then` in line 4, stored in the `data` parameter.
</section>

**Big takeaways:** 
1. Its important to be aware of what each step is returning.  Fetch returns a promise.  Each .then() returns a promise.  The callback function of the first .then() must return the json'd response object. Often this is happening implicitly as a one-line arrow function.  However, if you open up curly braces to include a console log, that return is no longer happening implicitly so you need to explictly return the `response.json()` using the `return` keyword.
2. Console logs are great as you're coding as a way to see what the data looks like that is coming through. BUT! Once you're ready to actually do things with that data, you'll want to remove your console logs OR have the console log in the same callback function as your logic, like this:  

```js
fetch('some_url')
.then(res => res.json())
.then(data => {
  console.log(data);
  /* do something with data */
})
```

<!-- You may want to do some research on [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) if you are ever wanting to wait for multitple promises to resolve before performing an action! -->

<!-- Review Session for the following morning:

  Interview-style questions:

  * In as much detail as possible, describe the request-response cycle when attempting to retrieve a network resource from a server.
  * Describe the difference between synchronous and asynchronous code.
  * What are 4 different levels of HTTP status codes and what does each level mean?

  Write out another fetch call in Chrome DevTools (Trivia Database API is fine):
    * Assign the whole fetch call to a variable
    * Console log the response object in the first .then()
    * Console log the parsed data in the second .then()
    * Inspect the response object & the parsed data
    * Log the variable you created for the entire fetch call to the console, see that it
      returns a Promise object and inspect it to solidify that Promise syntax

-->

---

## POST with fetch

What if we want to add information to a database?

If we want to use fetch to make any other kind of request, we'll have to add an optional init object into the function call.

<section class="answer">
### Implementing a POST Request  

Given that the default behavior of `fetch` is to GET data, we need to utilize the `options` object and update the method to be a POST.

```js
fetch(url, {
  method:"POST",
})
```

From here, the implementation may look different based on the API you're communicating with. Some good init object properties to be aware of:

* `method` - whatever kind of request we'll be making; "GET", "POST", "DELETE", etc...
* `body` - the body of whatever we want to send to the server
* `headers` - extra information needed about the request. Takes an object. An **important** header property to know:
  * `Content-Type` - specify what format the body will be in

Here's a typical POST request structure:

```js
fetch(url, {
  method: 'POST',
  body: JSON.stringify(someDataToSend), // HTTP can only send and receive strings
  headers: {
  	'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => /* do something with data */)
  .catch(err => /* do something with the error */);
```

Remember, **fetch still returns a promise**. We've got to resolve it, regardless of what request type we're making.

Often times, if a `POST` is successful, you'll see a `201 created` status message in the response
</section>

<!-- <section class="call-to-action">
#### Practice

Head to <a href="https://github.com/turingschool-examples/fe2-fetch-practice" target="\__blank">this repo</a> for some practice with GETting and POSTing.

Working with a partner, follow the setup instructions to get the server running.  Then follow the steps in order within the `client/index.js` file and test it out by opening the `client/index.html` file.
</section> -->

---

<!-- ## [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

"A Promise is an object representing the eventual completion or failure of an asynchronous operation"

In our case, we can think of Promises as a placeholder that will do something once it receives a response back from the trivia server.

The great thing about promises is that since they are just objects we can move them around like an object and can return them from functions.

```js
function getTrivia(number, categoryId) {
  const root = 'https://opentdb.com/api.php';
  const url = `${root}?amount=${number}&category=${categoryId}&type=multiple`;
  const promise = fetch(url)
                  .then(response => response.json());

  return promise;
}

getTrivia(10, 27)
  .then(data => console.log(data))
  .catch(err => /* do something else */);
``` -->
---

### What is this asynchronous thing all about?

Let's say we're at a restaurant for a night out on the town...Here's how the experience would go in each scenario:

* **Synchronous:** I order my food, everyone in the restaurant has to wait until I get my food before the next person can order.

* **Asynchronous:** I order my food, the order is put into a queue, other food is made in the meantime, my food is ready, and the server brings it to me.


#### A Non-AJAX Example: `setTimeout()`

```js
console.log("Legen...");

setTimeout(() => {
  console.log("DARY!");
}, 2000);

console.log("Wait for it...");
```

`setTimeout()` is actually an asynchronous function, which executes its callback after waiting for the allotted time to expire.

<section class="call-to-action">
#### Questions:

* Why are async operations necessary?
* Have you run into a situation on past projects where you needed async operations to accomplish it?
</section>

---

##### Further Reading:

* [The Evolution of Asynchronous JavaScript](https://blog.risingstack.com/asynchronous-javascript/)
* [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
* [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [Postman](https://www.postman.com/downloads/) -- good tool for testing out APIs
* [GETs, POSTs and DELETEs, man! Intro to Postman](https://www.youtube.com/watch?v=MRw07FQRscI) - Instructor video for getting started with Postman