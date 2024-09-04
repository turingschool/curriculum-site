---
layout: page
title: Coupon Codes FE Requirements
type: project
---

_[Back to Coupon Codes Home](./index)_


Now that we have all this coupon data, we can update our frontend to display that, too! Your goal is to complete the following user stories:

**As a user...**
- **When viewing all merchants, I should see an option on each Merchant to view their coupons.**
- **When I click on the View Coupons button for any given Merchant, I should see a list of that Merchant's coupons.**

First, we need to get access to that data. We will learn **a lot** about network requests in Mod 3, so let's walk through this together. 

<section class="dropdown">
### Step 1 - Explore Our Endpoints

Let's get acquainted with the network requests we already have set up from Little Shop.

If you look at the function `fetchData` in your `apiCalls.js` file, you'll see that it is set up to handle any GET request. We will use that function to get the coupon data! Notice that the function takes in one argument that represents the endpoint AFTER the `'http://localhost:3000/api/v1/'` base. 

Now, look at the way we are invoking `fetchData` twice in the `Promise.all` in the `main.js` file. We are passing the arguments "merchants" and "items" to hit those individual endpoints. (Don't worry about what `Promise.all` is doing - we'll get to that next mod!) 

**Consider these questions:**  
<section class="dropdown">
<p class="dropdown-header">A. What endpoint is being hit when you invoke `fetchData("merchants")`?</p>

 The endpoint becomes `'http://localhost:3000/api/v1/merchants'` because `fetchData` creates a string with `'http://localhost:3000/api/v1/'` + the argument passed into the function.
</section>
<section class="dropdown">
<p class="dropdown-header">Thinking about the backend code you just wrote, what is the endpoint we want to hit to get the coupon data?</p>

Most likely, we're going to want to hit `'http://localhost:3000/api/v1/merchants/:merchant_id'` where `merchant_id` is an actual value like `15` or `36`. This may differ if you made different choices with your backend. 
</section>
<section class="dropdown">
<p class="dropdown-header">If we want to fetch coupons for the merchant with an ID of 5, what argument would we want to pass through when we invoke `fetchData`?</p>

`fetchData("merchants/5")` which would result in hitting the endpoint `'http://localhost:3000/api/v1/merchants/5'`.
</section>
</section>

<section class="dropdown">
### Step 2 - Testing Our GET Request

Let's start by having the GET request occur on page load. Later, you will adjust our code so that the fetch runs at a more appropriate time. Right now, we just want to make sure we can access the data. Make sure your backend is running - we're going to start fetching data from it!

**1.** Paste this code into your `main.js` file (anywhere, as long as it's under your imports!):

```js
window.addEventListener("load", (event) => {
  fetchData("merchants/1")
  .then(data => {
    console.log("JavaScript is cool! 😎")
    console.log(data)
  })
  console.log("Hello 👋")
});
```

**2.** Notice that we are fetching the coupons for a merchant with an ID of 1. Check your database to make sure that merchant exists. If it doesn't, change that `1` to an ID that matches an existing merchant.

**3.** Before going any further, look at the code block carefully and make a prediction: What order will the `console.logs` print?

**4.** Reload the frontend in your browser and check the console (`option` + `command` + `i`). Boom! You should see your data there along with your `console.logs`!
<section class="dropdown">
<p class="dropdown-header">Not seeing the data in the console?</p>

- Check that you've replaced `:merchant_id` to an actual ID of a merchant you know exists in your database (i.e. `"merchants/5"`)
- Check that this block of code is BELOW your imports in the `main.js` file
- Read the error and post in your Slack channel for support!
</section>

**5.** Let's go back to your prediction from #3. Were you correct? It may seem strange that the statements printed out of order, with `Hello 👋` printing first. This is because fetching is an **asynchronous action**. When we fetch data, JavaScript starts doing things out of order. This is why we rely heavily on `.then` statements. The `.then` blocks allow us to time our actions so that the code waits for the fetched data to arrive before moving onto the next step. **The `.then` will only run AFTER the fetch has successfully finished.** 

**Consider these questions:**  
<section class="dropdown">
<p class="dropdown-header">Looking at the `deleteMerchant` function, why do you think so much of the code is written in the `.then` block?</p>

We don't want any of those actions to occur until we know the DELETE request has successfull occurred. By putting that code in the `.then` block, we know it won't run until the fetch has successfully finished. Without the `.then`, that code would run asynchronously and might occurr before we want it to.
</section>
<section class="dropdown">
<p class="dropdown-header">Find at least 2 more examples in the existing JS files where a .then block is being used.</p>

`submitMerchantEdits`, `submitMerchant`, `Promise.all`, and lots of examples in the `apiCalls.js` file.
</section>
</section>

<section class="dropdown">
### Step 3 - Show the User

Now that you know how to make the GET request, it's time to work on your user stories above! 

Here are some helpful tips:
- Obviously, we don't want the GET request to happen on page load. You'll want to move that fetch into a more appropriate place.
- If you want an example of how to make a fetch dynamically for different merchants, check out the `deleteMerchant` function in `main.js`.
</section>

<section class="call-to-action">
### Important Note! 

While we do want your frontend to look complete and polished, don't get too bogged down with the styling on this project. You got lots of good styling practice last project - let's focus on JavaScript here. We recommend reusing as much styling as you can from your work with Little Shop. 
</section>