---
title: Frontend Error Handling
tags: javascript, fetch, error, catch
module: 2
---

## Introduction 

As front end developers, we should always be concerned about giving our users the best experience possible AND we want to protect our data as much as possible. We never want to store data that is incorrect or inconsistent. We also want our users to be informed about what is going on in the application. Today's lesson will focus on the responsibility of frontend developers when it comes to error handling.

## Preventing Errors

<section class="call-to-action">
### Activity

There are four codepens in **[this collection](https://codepen.io/collection/ExqLWp)**. Spend a few minutes with each codepen (in order, starting with #1!) and answer the questions below:

- Try to break it! As a user, are you able to send bad data to the backend?
  - Note: Open the codepen console (button is in bottom left corner) to see what data is being sent to the backend when you click "Sign Up".
- Is there anything about the input elements that prevent bad data from being entered?
- Is there anything preventing bad data from being sent to the backend on submit?
- Is the error messaging helpful?
</section>


## Preventing Errors - Key Points
**Whenever possible, we should prevent users from being able to make mistakes in the first place.**
  - We should make it as easy as possible for users to do the right thing. Here are some tips:
    - Use input types (like [date](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date) and [number](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number)) to restrict the user's input.
    - Use [dropdowns](https://www.w3schools.com/tags/tag_select.asp) or [radio buttons](https://www.w3schools.com/tags/att_input_type_radio.asp) to limit a user's options to a preselected list.
    - Give the user examples in the [placeholder](https://www.w3schools.com/tags/att_input_placeholder.asp) text to show them what you're expecting.
    - [Disable](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled) the form's submit button until all inputs are filled out.

**If a user makes a mistake, we should provide easy instructions for how to fix it.**
  - Make your message specific - tell them exactly what field is wrong and what they need to do to fix it.

**We should thoroughly check the data before we store it or send it to the backend.**
  - Pretend that the backend has zero error handling and it is going to accept whatever you send it. Do not rely on other people doing the error handling - we should be checking our data several times before it gets stored.
  - Simply checking that there is *something* there isn't enough. We need to check that the data is accurate and the correct data type (remember that input values always come back as strings!).

**Whether things go right or wrong, we should give the user feedback.**
  - Users should know that the action was successfully fulfilled.
  - Users should know if something went wrong (whether it was user error or not).
  - We should wait until after the Promise has successfully resolved from a fetch to confirm the outcome with the user. This is what we will talk about next!


## Handling Fetch Errors

### Set Up
We're going to use the same Ideabox FE and BE that we've used several times in previous lessons.

1. Re-open **[this react-ideabox FE](https://github.com/turingschool-examples/react-ideabox)** repo.  
  a. Navigate to that directory  
  b. Run `git fetch`  
  c. Run `git checkout error-handling`  
  d. Run `npm start`  
2. You'll also need the **[ideabox-api BE Repo](https://github.com/turingschool-examples/ideabox-api)** up and running.  
  a. Navigate to that directory 
  b. Run `node server.js`
3. Make a tab in Chrome for:  
  a. `localhost:3000`: You should see the React app up and running here  
  b. `http://localhost:3001/api/v1/ideas`: You should see your list of ideas here

<section class="call-to-action">
### Explore

1. First, turn off the server. You should see a user-friendly error message in your Ideabox. Explore the React code and find the code that is responsible for making this happen.
2. Now, turn the server back on. The error message should disappear and the cards should correctly populate. Now, try to submit an idea with a missing field (leave either the title or description blank). Pay attention to the following:
  - What does the user see?
  - Look at the console. Is there an error there? What is the status code?
  - Go to `http://localhost:3001/api/v1/ideas`. Was that data POSTed?

Discuss: Do you think the `.catch()` was fired in the second scenario? What is your evidence? Why do you think this is happening?
</section>

### Triggering the catch

Hmm...it seems like not all errors trigger the `catch`. Which means we can't rely on the `catch` to let the user know if things have gone wrong. Let's dig into the response object. Let's add a console.log:

```js
  .then(response => {
    console.log(response)
    return response.json()
  })
```

Now, let's compare that response object in two scenarios:

1. The user fills everything out correctly:
```js
{
  type: 'cors', 
  url: 'http://localhost:3001/api/v1/ideas', 
  redirected: false, 
  status: 201, 
  ok: true, 
}
```

2. The user misses a field:
```js
{
  type: 'cors', 
  url: 'http://localhost:3001/api/v1/ideas', 
  redirected: false, 
  status: 422, 
  ok: false, 
}
```

Do we think we could use any of these properties to check if the network request was successful?

<section class="dropdown">
### Possible Solution

```js
  function addIdea(newIdea) {
    fetch('http://localhost:3001/api/v1/ideas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newIdea), 
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status); 
      }
      return response.json()
    })
    .then(data => setIdeas([...ideas, data]))
    .catch(error => {
      console.log(error)
      setError('Oops! Something went wrong! Please try again in a couple minutes.')
    })
```
</section>

By using the line `throw New Error()`, we are able to manually trigger the `catch`. Now, that error handling in our `catch` is firing for a 422 error! Yay! 

<section class="call-to-action">
### Discuss

Do you think we should send a POST request to the backend that has missing fields? What could we do to prevent this from happening?
</section>

## Handling Fetch Errors - Key Points

**We should add error handling to the `catch`.**
  - The `catch` will fire if the server is completely down. Users need to know that their action was not completed in this scenario.

**The `.catch` will NOT fire for all fetch errors. We ALSO need to check the `response.ok` property.**
  - If we only handle errors that are triggered in the `catch`, we will miss scenarios like `422`s or `404`s where the `catch` does not fire. 

**(Again) Whether things go right or wrong, we should give the user feedback.**
  - Users should know that the action was successfully fulfilled.
  - Users should know if something went wrong (whether it was user error or not).
  - We should wait until after the Promise has successfully resolved from a fetch to confirm the outcome with the user. 
  - The messaging should be user-appropriate. (Do they need to know it's a 500 error or do they just need to know something went wrong and they should try again later?)
