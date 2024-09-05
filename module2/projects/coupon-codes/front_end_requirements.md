---
layout: page
title: Coupon Codes FE Requirements
type: project
---

_[Back to Coupon Codes Home](./index)_


Now that we have all this coupon data, we can update our frontend to display that, too! Your goal is to complete the following user story:

**As a user, when I click on the View Coupons button for any given Merchant, I should see a list of that Merchant's coupons.**

There is some starter code written for you. Follow the following steps to complete your frontend goals.

<section class="dropdown">
### Iteration 0 - Explore

1. Get **[the frontend repo](https://github.com/turingschool-examples/little-shop-fe-final-starter)** cloned down and running. 
2. Run your backend too!
2. Open up the frontend code and poke around. Consider the following questions:
<section class="dropdown">
<p class="dropdown-header">What function is being invoked when a user clicks the "View Coupons" button?</p>

`getMerchantCoupons`
</section>
<section class="dropdown">
<p class="dropdown-header">What is being logged in the console when the "View Coupons" button is clicked? Where is that data coming from?</p>

First we see the merchant ID that matches the merchant that was clicked. This is available through the `event.target` object. We also see the data from our fetch request in the console, which is coming from the `console.log` in our `.then()` block.
</section>
<section class="dropdown">
<p class="dropdown-header">Spend some time looking at the data that is being returned from the fetch. What data type is it? What pieces of information are you getting back?</p>

This answer will depend on how you built your backend! But it should match the structure of the data your backend is sending when a GET hits the `'merchants/:id'` endpoint.
</section>
<section class="dropdown">
<p class="dropdown-header">What function is being invoked after the coupon data has been fetched? Why do you think that function is being invoked in a .then() block?</p>

`displayMerchantCoupons`; We aren't able to display the coupon data until the data has returned from the fetch. By using a `.then()` block, we can wait for the fetch to successfully complete before moving on to the next step in our functionality. We are essentially saying "fetch the data and wait until we have the data, THEN console log that data and display it to the user." 

Note: The `.then()` is necessary because fetching is an **asynchronous action**. We'll talk much more about that concept in mod 3, so don't worry too much about it now! 
</section>
<section class="dropdown">
<p class="dropdown-header">What HTML changes do you see on the screen when the "View Coupons" button is clicked? Find that functionality in the code.</p>

The Merchants View disappears and a new view appears. It's mostly blank with the words "Coupon data will go here." The function `displayMerchantCoupons` is showing and hiding various HTML elements and adding the text to the screen. 

Note: Don't worry about the "Showing: All Merchants" text or the "Add New Merchant" button on the coupons page for now. We'll fix that later.
</section>
</section>

<section class="dropdown">
### Iteration 1: Display Coupon Data

Now that we've explored a bit, let's actually write some code! 

Your goal is to get the coupon data to appear on the screen instead of the generic "Coupon data will go here." message. You can decide what data you show to the user and how, but be prepared to defend your choices with an instructor. At minimum, a user should see all available coupons for a merchant on this page.

Don't get too bogged down in the CSS here - we want your focus to be on JS. That said, try to reuse some of the existing styling so that the coupon page flows nicely with the rest of the application.
</section>

<section class="dropdown">
### Iteration 2: Update Display Options

You may have noticed that when you are on the coupons page, you can still see the "Showing: All Merchants" text and the "Add New Merchant" button. Those don't really make sense on this page. Update the code so that:
- On the Coupons view, we see the message "Showing: All Coupons for Merchant #_" with the appropriate merchant ID.
- On the Coupons view, the "Add New Merchant" button is hidden.
- When we navigate back to the Merchants view, the text should return to "Showing: All Merchants" text and the "Add New Merchant" button should reappear.
</section>