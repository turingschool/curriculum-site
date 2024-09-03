---
layout: page
title: Coupon Codes FE Requirements
type: project
---

_[Back to Coupon Codes Home](./index)_


Now that we have all this coupon data, we can update our frontend to display that, too! Your goal is to complete the following user stories:

**As a user...**
- **When I am on the merchant page, I should see an option to view each Merchant's coupons.**
- **When I click the "View Merchant Coupons" button, I should see a list of all merchant coupons.**

First, we need to get access to that data. We will learn **a lot** about network requests in Mod 3, so let's walk through this together. 

<section class="dropdown">
### Step 1 - Explore

Let's get acquainted with the network requests we already have set up from Little Shop.

If you look at the function `fetchData` in your `apiCalls.js` file, you'll see that it is set up to handle any GET request. We will use that function to get the coupon data! Notice that the function takes in one argument that represents the endpoint AFTER the `'http://localhost:3000/api/v1/'` base. 

Now, look at the way we are invoking `fetchData` twice in the `Promise.all` in the `main.js` file. We are passing the arguments "merchants" and "items" to hit those individual endpoints. (Don't worry about what `Promise.all` is doing - we'll get to that next mod!) 

Consider these questions:
- Thinking about the backend code you just wrote, what is the endpoint we want to hit to get the coupon data?
- On what user action, do we want to actually trigger the fetch?
- Once we have the data back, what do we want to do with it?
</section>

<section class="dropdown">
### Step 2 - Make the GET Request

Let's start by having the GET request occur on page load. Later, you will adjust our code so that the fetch runs at a more appropriate time. Right now, we just want to make sure we can access the data. 

Paste this code into your `main.js` file (anywhere, as long as it's under your imports!):

```js
window.addEventListener("load", (event) => {
  fetchData("merchants/:merchant_id")
  .then(data => {
    console.log(data)
  })
});
```

Change the `:merchant_id` to an actual ID of a merchant you know exists in your database. Reload the frontend in your browser and check the console (`option` + `command` + `i`). Boom! You should see your data there!

Not seeing the data in the console?
- Check that you've replaced `:merchant_id` to an actual ID of a merchant you know exists in your database (i.e. `"merchants/5"`)
- Check that this block of code is BELOW your imports in the `main.js` file
- Read the error and post in your Slack channel for support!
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