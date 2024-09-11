---
title: "React: Network Requests"
length: 3 hours
module: 3
tags: react, hooks, useEffect, Network request 
---

***********

### Learning Goals

* Understand the difference between synchronous and asynchronous operations
* Be familiar with the fetch API
* Understand how network requests work
* Understand the various levels of HTTP status codes
* Know what a `GET` request does and how to use it

### Vocab

* `Async` / `Asynchronous` Executing code without blocking the execution of code after it
* `AJAX` Updating a webpage based on data from the network without reloading the whole thing

## What is a network request?
Let's start by reviewing what a network request is and see it in action!

<section class="call-to-action">
### Warmup

Open up your dev tools and navigate to the Network tab. Refresh the page and watch what happens.  You should see something like this:

![network dev tool example](https://i.imgur.com/C5brbyU.png)

* In your notebook, write down what a network request is in your own words.
* Based on the data that shows up in the Network tab, what are each of the columns referring to?  (totally okay to take an educated guess)
</section>

<section class="note">
### What is happening here?

Each item listed is a request for a file from some server somewhere. The one on the top is the initial HTML file, and then the link tags in your HTML prompt network requests for the stylesheets and JavaScript files necessary.  Cool!
</section>

### Types of Requests

Network requests can be made to **GET** information from a server, but it's not the only use.

The HTTP protocol defines a variety of types of requests we can make. These include:

* `GET` - retrieve information from a server
* `POST` - send information to a server, creating resources
* `PUT` - send information to a server, updating entire resources
* `PATCH` - send information to a server, updating partial resources
* `DELETE` - remove information from a server
* And [many others](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods){:target='blank'}

Today we'll be focusing on how to do a **GET** request on the frontend side.

### Responses

Every request we make, successful or not, will receive a response.  When looking at the **Network** tab in the dev tools, you might have noticed some requests had different response codes. The HTTP protocol lays a series of [Response Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status){:target='blank'} to give more information on the status of a request.

<section class="call-to-action">
### Reviewing Status Code Levels

What do each of the status codes mean on a high level?
- 1XX
- 2XX
- 3XX
- 4XX
- 5XX
</section>

<section class="answer">
### Common Status Codes

* `200 OK` -- successful request
* `201 Created`-- successful POST request
* `400 Bad Request` -- The request failed due to some error in its structure
* `404 Not Found` -- The request was correctly structured, but specified a non-existent resource
* `500 Internal Server Error` -- Something wrong happened on the server's side of things

![google 500 error](https://i0.wp.com/s3.amazonaws.com/production-wordpress-assets/blog/wp-content/uploads/2016/11/29074529/500-internal-server-error.png?fit=604%2C237&ssl=1)
</section>

## Making a Request

Each network request takes time - they're *expensive*. Imagine if you had to wait for a webpage to load one thing at a time! It would not make for a great user experience.

Network requests are expensive no matter what we do. However, we can run them *asynchronously*, saving some time.

`Asynchronous` operations refer to things that can happen outside the normal order of execution. Network requests can be `synchronous` or `asynchronous`, but most modern applications do them `asynchronously` to improve performance / the user experience.

<section class="note">
### Multiple Ways of Making Requests

Note that there are a few ways to make a request.  One way you might see is through a process called AJAX, or [**A**synchronous **J**avaScript **A**nd **X**ML](https://developer.mozilla.org/en-US/docs/AJAX){:target='blank'}. AJAX was a huge advancement for the web, as it allowed developers to update part of a webpage without reloading the entire thing.

Traditionally, AJAX requests have been made via the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest){:target='blank'} object. However, the process is a little clunky, with developers transitioning over to a more streamlined way using the **fetch API**.  This is much more commonly used by developers nowadays and will be the primary way we make network requests at Turing.

The great thing about using the fetch API is that we can use it "for free" with ES6 (as opposed to `$.get` which requires us to bring in jQuery or *axios* which is a separate npm package)!
</section>

## ES6: fetch()

Speaking of using the fetch API, let's take a look at the docs on what it is!

<section class="call-to-action">
### In Breakout Groups

Using the [fetch API docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API){:target='blank'}, answer the following questions.

* What arguments does the `fetch` method take?  Clarify which ones are mandatory and optional.
* What does `fetch` always return?  If the term is new to you, read further on what it is.
</section>

<section class="note">
### Not All Browsers Support `fetch`

It's important to note that not every browser supports the fetch api; [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) (code used to provide modern functionality to older browsers that do not natively support it) are available, but many legacy codebases use other apis that are supported by older browsers, such as `Axios` or `Superagent`.  You can see what [browsers support fetch here](https://caniuse.com/#search=fetch){:target='blank'}!
</section>

<section class="answer">
### Key Takeaways  

- The `fetch()` method takes one mandatory argument, the path to the resource you want to fetch.
- It can take an optional options object to get more specific about the `method`, `body`, and `headers`.

```js
fetch(resourceUrl, {/*init object with `method`, `body`, and other optional properties*/});
// Returns a promise
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

We don't need to worry too much about them now. Just know that a Promise will either be resolved upon completion, or rejected upon failure. We can use special methods for promises to determine what needs to happen in either of those scenarios:

* `.then()` runs upon the resolution of a promise. Returns another promise
* `.catch()` runs upon the rejection of a failed promise. Used for error handling

<section class="note">
### `async/await`

The expectation for Mod 2 is that you will avoid using `async/await`. We know `async/await` is tempting, but it is important that you are able to work with the approaches that pre-date the introduction of `async/await`. Consider doing some research on [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
</section>

## What do I do with this "Promise {<pending>}"?

Diving into the returned promise reveals some information, such as its status and value, but nothing that's too immediately useful. Instead we have to resolve it:

```js
fetch("https://opentdb.com/api.php?amount=1&category=27&type=multiple")
  .then(response => console.log(response))
```

* What do you get when you log the response object?  Take note of the properties there.
* There's one problem: we can't seem to get the data we want from the Response.body.  How is data sent through requests and responses?

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

<section class="call-to-action">
### Practice with an Application

Head to <a href="https://github.com/turingschool-examples/fe2-fetch-practice" target="\__blank">this repo</a> for some practice with GETting.

Working with a partner, follow the setup instructions to get the server running.  Then follow the steps in order within the `client/index.js` file and test it out by opening the `client/index.html` file.

Note that this repo will be used for the GET and POST lessons. Be careful to only complete the GET practice today. We'll come back to this repo later when we <a href="https://frontend.turing.edu/lessons/module-2/network-requests-posts.html" target="\__blank">learn how to POST</a>!
</section>

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

*************
### Learning Goals

* Get more familiar with the `Promise` object and the fetch API
* Know what `POST` requests do and how to use them

### Vocab

* The `Promise` Object - represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

<section class="call-to-action">
### Warmup

Use this [Jamboard](https://jamboard.google.com/d/1yt9FfpGP1v4gtwbVPKG2lz60JtsBaMVO5HTOugIw0bA/viewer) to respond to the following questions:

- What do you already know about network requests?
- What questions do you have about working with network requests?
</section>


## POST with fetch

What if we want to add information to a database?

If we want to use fetch to make any other kind of request, we'll have to add an optional init object into the function call.

<section class="call-to-action">
### In Your Notebook

Reflecting on the [How the Web Works](https://frontend.turing.edu/lessons/module-2/how-the-web-works.html){:target='blank'}, what makes up the request?  What additional information might we need to send in our `fetch` request?
</section>

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
  body: JSON.stringify(someDataToSend), // remember how HTTP can only send and receive strings, just like localStorage?
  headers: {
  	'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(json => /*do something with json*/)
  .catch(err => /*do something with the error*/);
```

Remember, **fetch still returns a promise**. We've got to resolve it, regardless of what request type we're making.

Often times, if a `POST` is successful, you'll see a `201 created` status message in the response
</section>

<section class="call-to-action">
#### Practice

Head to <a href="https://github.com/turingschool-examples/fe2-fetch-practice" target="\__blank">this repo</a> for some practice with GETting and POSTing.

Working with a partner, follow the setup instructions to get the server running.  Then follow the steps in order within the `client/index.js` file and test it out by opening the `client/index.html` file.
</section>

### Nice to Know: Query Strings / URL Structure

![url anatomy diagram](https://sitechecker.pro/wp-content/uploads/2017/12/url-structure.jpg)

What's all that weird stuff in the URL we're fetching?

Fetch and XMLHttpRequest Objects take the url as one of their arguments. The URL itself can be thought of containing sub-arguments that give these request objects and methods more information. The entire anatomy of a URL can be broken down into a series of informative pieces, but the ones we're focused on today are queries.

Anything coming after the `?` in a url is part of a query. Queries can be broken down into categories and arguments. Each category / argument pair is separated by an `&`.

 In the example from above:
```
fetch("https://opentdb.com/api.php?amount=1&category=27&type=multiple")
```
we're querying information about the `amount`, `category`, and `type` of the trivia we want to receive.

<section class="call-to-action">
Take a look at the [trivia docs](https://opentdb.com/api_config.php), and figure out what each of the queries in our fetch request mean.
</section>

---

## [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

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
```
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


***************

## Learning Goals

* Be able to perform network requests and make use of the response data with the `useEffect` hook
* Understand how to perform side effect behavior in a functional component with `useEffect`
* Be able to conditionally render different views in a function component

## Vocab

* `useEffect` - A React Hook which enables us to add side effect behavior to a functional component.
* Side effect - Any action performed by a component that causes a change in the application state or interacts with the outside world. 

## React Hooks

React introduced hooks with v16.8 in February 2019.

Hooks are functions that let you "hook into" React state and lifecycle features from functional components. React gives us some built-in hooks, that we'll take a look at shortly, but we can also create our own custom hooks that will allow us to reuse/share stateful logic.

**What are some hooks you've seen already when working with React?**

There are a number of different motivations behind adding hooks to React, which you can read more about [here](https://reactjs.org/docs/hooks-intro.html#motivation). The most important take-away for you is that hooks allows us to streamline our applications and leverage the power of functional components.

### Some Important Rules

* Only call hooks from within React functions 
* Don't call hooks inside of loops, conditions, or nested functions 

### Benefits of Hooks

* Let you organize the logic inside a component into reasonable isolated units
* Allow you to reuse stateful logic without changing your component hierarchy
* Will likely reduce your bundle size because code using Hooks tends to minify better than equivalent code using classes
* No breaking changes

## Network Requests & React

### Review - Fetch

We will be using `fetch` today. Let's review what you already know about `fetch`. Take some time to look into the <a href="https://developer.mozilla.org/en-us/docs/web/api/fetch_api/using_fetch" target="_blank">fetch API documentation</a> and answer the following questions:
<section class="answer">
### What does `fetch` do?
`fetch` is a method provided by the Fetch API. It allows us to make a network request.     
</section>
<section class="answer">
### What does `fetch` return?
`fetch` returns a promise.
</section>
<section class="answer">
### What does `.then()` do? What is the method called on? What does it return?
`.then()` is a method of the Promise prototype that is called on a promise object. It is used to handle the successful resolution of a promise. When the promise resolves, the code inside the `.then()` block is executed. The `.then()` method itself returns a new promise object, allowing for chaining multiple asynchronous operations together.
</section>
<section class="answer">
### What does `.catch()` do? What is the method called on? What does it return?
`.catch()` is a method called on a Promise object (aka a Promise prototype method). It runs when the first promise it is chained to fails / rejects. It returns a promise object.
</section>

### Set Up

You'll need to clone down two repos for today:
- [FE Repo](https://github.com/turingschool-examples/advanced-data-management-hooks-fe/tree/main)
- [BE Repo](https://github.com/turingschool-examples/ideabox-api) - Do NOT clone inside your FE repository!

Follow the steps in each README to get both the FE and BE running on your local machine. Make a tab in Chrome for:
- `localhost:3000`: You should see the React app up and running here
- `http://localhost:3001/api/v1/ideas`: You should see your list of ideas here

Our goal is to refactor this codebase so that we are accessing and updating the data from our API!

### `GET` Request

We are going to start with the `GET` request. Let's start by thinking about a couple of things:
- What data do we want to GET?
- When do we need to GET that data?
- What are we going to do with the data we GET?

<section class="answer">
### Answers  
  
- What data do we need to GET? **All ideas**
- When do we need to run that GET? **On page load**
- What are we going to do with the data we GET? **Add the ideas to our App component's state**
</section>

Given that we are going to use the data to update the `App` component's state, we should probably put the `GET` there. 

<section class="call-to-action">
### Make the GET Request

Write a function in `App` that runs a fetch request to GET all ideas. 

Notes:
- Refer to the BE repo's README for endpoints and documentation. 
- For now, let's `console.log` the data that comes back.
- You're not immediately going to know where/when to invoke this function - that's okay! For now, only define the function, don't invoke it.

<section class="answer">
### Possible Solution  

```jsx
// App.js 

function getIdeas() {
  fetch('http://localhost:3001/api/v1/ideas')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error.message))
}
```
</section>
</section>

Okay, now's the fun part - where and when do we invoke this function?! We said earlier that we want to invoke the function on page load. Let's pause here for a second and talk about the **lifecycle of a React component**.

### The Component Lifecycle

Every component you create goes through several phases of existing:

* **Mounting:** The component is created! The mounting phase **occurs only once** when the component is first rendered and added to the DOM, and subsequent updates to the component do not trigger the mounting phase again. 
* **Updating:** Any time we update state values that are used in our JSX, the component updates itself and re-renders reflecting those changes on the DOM. This phase happens lots of times!
* **Unmounting:** The component is completely removed from the DOM, usually in response to some sort of user interaction or change in state.

<section class="call-to-action">
### Reflect

During which phase of the App component's lifecycle do we want our GET to run?

<section class="answer">
### Answer  

During the Mounting Phase!
</section>
</section>

### The Effect Hook

The Effect Hook, `useEffect`, allows us to perform side effects (data fetching, subscriptions, etc) from a functional component. So far in React, we've leveraged the `useState` hook to manage our application data. Another common hook that you'll want to get comfortable with is `useEffect`. This hook allows you to perform some logic during certain phases of the **component lifecycle**. 

Let's add `useEffect` to our code to invoke our `getIdeas` function:
```jsx
// App.js
import  { useState, useEffect } from 'react'; //make sure you import it!

// ...

function getIdeas() {
  fetch('http://localhost:3001/api/v1/ideas')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error.message))
}

useEffect(() => {
  getIdeas();
})
```

### `useEffect` Timing

The Effect Hook will fire during certain phases of the component life cycle, depending on the second argument:

```jsx
useEffect(/* callback function */, /* second argument */)
```

Let's update our code so that we aren't just console logging the data, but we're actually updating state:

```jsx
// App.js

function getIdeas() {
  fetch('http://localhost:3001/api/v1/ideas')
  .then(response => response.json())
  .then(data => setIdeas([...ideas, ...data]))
  .catch(error => console.log(error.message))
}

useEffect(() => {
  getIdeas();
})
```

Run your app. **What's happening?** :scream:

Oh no! Let's revisit the timing conversation. What we include in that second argument affects the timing like this:
- `no argument`: The Effect Hook will run for the mounting and updating phases
- `[]`: The Effect Hook will run for the mounting phase only
- `[<piece of state>]`: The Effect Hook will run when that specific piece of state is updated (i.e. `[ideas]`)

<section class="call-to-action">
### Reflect

- When is our `useEffect` hook currently firing? What issues is that causing?
- What should we change to our `useEffect` to get the timing right?

<section class="answer">
### Answer  

It's currently running when the component is mounted (good) AND when state is changed (not good). Since we are updating state in our `useEffect`, it's causing an infinite loop! We need to add an empty array as a second argument to make it only run during the mounting phase:
```jsx
useEffect(() => {
  getIdeas();
}, [])
```
</section>
</section>

We did it! We've got our first network request working in a React app! High five!

## `POST` Request

Now, let's talk about the `POST` request. Let's start by thinking about these questions:
- What data do we need to POST?
- When do we need to run that POST?
- Will our POST need to happen in a `useEffect`?

<section class="answer">
### Answers  

- What data do we need to POST? **New idea from form**
- When do we need to run that POST? **When "submit" is clicked**
- Will our POST need to happen in a `useEffect`? **No, because it's not tied to a specific lifecycle phase**
</section>

A common misconception is that all network requests need to happen in a `useEffect`. In the case of this `POST`, we want it to happen when a user event occurs - specifically, when the "Submit" button is clicked. We can do that directly in the event handler function. 

<section class="call-to-action">
### Make the POST Request

Update `addIdea` in `App` so that a new idea is POSTed to the API.

Notes:
- Refer to the BE repo's README for endpoints, necessary options, and documentation. 
- Think about what you want to happen after the POST resolves successfully.
- You can check that it's successfully being POSTed by going to 'http://localhost:3001/api/v1/ideas' in your browser.

<section class="answer">
### Possible Solution  

```jsx
// App.js 

  function addIdea(newIdea) {
    fetch('http://localhost:3001/api/v1/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIdea), 
    })
    .then(response => response.json())
    .then(data => setIdeas([...ideas, data]))
    .catch(error => console.log(error.message)) 
  }
```
</section>
</section>

We will not cover it in this class, but if you'd like an added challenge later - update `deleteIdea` so that it also updates the backend data, too!

## Error Handling & Conditional Rendering

**Note**: Turn off your server for this section so that we can force some errors!

So far in this lesson (and perhaps in your whole time at Turing), we've been console logging the error messages in our `.catch`es. That's not great because our users can't see that! Let's actually DO something with those error messages!

There are two things we want to do with errors:
- capture them somewhere
- let the user know what's going on

**Where can we capture the error message so that we can use it later?**

State! Great idea! Let's do that.

<section class="call-to-action">
### Add Error Messages to State

Update your `.catch`es so that rather than console logging the error, we are capturing the error in our state.

<section class="answer">
### Possible Solution

```jsx
// App.js 

const [error, setError] = useState('')

// ...

.catch(error => setError(error.message)) 
```
</section>
</section>

Great! We now have access to the errors when we need them! Now, let's actually show the error to the users. We'll do this through **conditional rendering**. Meaning, we will render certain elements to the DOM based on a condition. Let's look at what this looks like:

```jsx
  return (
    <main className="App">
      <h1>IdeaBox</h1>
      <Form addIdea={addIdea} />
      {error && <h2>{error}</h2>}
      <Ideas ideas={ideas} removeIdea={removeIdea} />
    </main>
  );
```

Wowwwww okay. What does that syntax even mean?

First of all, this is JavaScript (we can tell because of the curly brackets). The first statement of error will evaluate to a truthy or a falsy value (an empty string is falsy). The code after the double ampersand is what will render if we get past the first statement.

It’s a shorthand way of saying, “If there is an error in state, render the h2 element!” Neato!

Notice that we are only conditionally rendering the one part of the render that is contingent upon whether or not an error is in state. We’re not rendering two different versions of the App. We just have the one, and one line will show up only if there is an error stored in state.

Fun fact: You can conditionally render whole components:
```jsx
  return (
    <>
      {pieceOfState && <AWholeComponent />}
    </>
  );
```
Have fun exploring that!

### Error Messages for Your Users

As a frontend dev, you want to think about your users all the time. With that in mind, you will want to think about what errors are appropriate for your users. For example, would an error message like "WDGeneralNetworkError error 500;" be something you'd want to render to your app's screen? Maybe in some cases, maybe not.

When rendering error messages for your users, consider ways to present the information in an unintimidating way AND provide next steps for them. It's okay to display a different error than what the BE provides. For example, maybe you do something like this:

```jsx
// App.js 

.catch(error => {
  console.log(error)
  setError('Oops! Something went wrong! Please try again in a couple minutes.')
}) 
```

This way, the devs have access to the error via the console, but the users have a nice, friendly message!

<section class="note">
### Solution - Complete Branch

That was a lot of coding! If you want to see the full completed file, check out [the complete branch](https://github.com/turingschool-examples/advanced-data-management-hooks-fe/blob/complete/src/App.js) in that repo!
</section>

## Closing - Checks for Understanding

In your notebooks, respond to the following:

* What at the three phases of a component's lifecycle?
* What is the Effect Hook?
* How can we control when `useEffect` runs?
* Do all network requests need to occur in the Effect Hook?
* What is conditional rendering and when might we use it?

## Resources

* [React Docs on Hooks](https://react.dev/reference/react)
* [Making Sense of React Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) by Dan Abramov
* [React hooks: not magic, just arrays](https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e) by Rudi Yardley
* [Why React's new Hooks API is a game changer](https://itnext.io/why-reacts-hooks-api-is-a-game-changer-8731c2b0a8c) by Rudi Yardley
* [How to fetch data with React Hooks](https://www.robinwieruch.de/react-hooks-fetch-data/) by Robin Wieruch
* [How the useEffect Hook Works](https://daveceddia.com/useeffect-hook-examples/) by Dave Ceddia
* [LifeCycle methods - Data management using class component](https://frontend.turing.edu/lessons/module-3/react-3-advanced-data-management.html) 
