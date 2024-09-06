---
layout: page
title: Hang In There Rubric
---

_[Back to Hang In There Home](./index)_


## Learning Goals

* Practice reading, understanding, and using existing code
* Write clean, DRY JavaScript
  * Build out functionality using functions that show trends toward SRP
  * Manipulate the page after it has loaded by adding, removing, and updating elements on the DOM
  * Use array prototype iterator methods to reformat data and display it on the DOM
* Use CSS and HTML to match styling and layout of provided comps

## Project Feedback

When projects are graded, we want you to view the evaluation + feedback as a means to inform your learning, rather than as static "grades". Feedback from instructors will focus on areas where you have an opportunity to deepen your understanding. 

The evaluation will provide feedback by answering this important question: **Does the project demonstrate student understanding of the learning goals & concepts?**   

Projects will answer that question, with each section of the rubric (see below) receiving a `yes`, `not yet`, or `wow` marking.

The overall project outcome is determined by "averaging" each rubric's outcome. 
<!-- You can think of a "yes" being worth a 1, a "not yet" being worth a 0, and a "wow" being worth a 2. For this project, an average of 0.5 is considered a passing project that demonstrates good student understanding! -->

## Rubric

This project has 4 evaluated concepts:


- Reading Code
- JavaScript
- HTML/CSS
- Functionality

The following examples of competency & understanding are illustrations to guide you as you develop this project and continue your learning. They are not the *only* ways to demonstrate competency.

<section class="dropdown">
### Reading Code

ON TRACK can look like:
- Developer takes time to thoroughly understand the existing code
- Existing code is used effectively (the provided createPoster function, the provided assets, the provided HTML & CSS classes and styles)

✨WOW✨ can look like:
- Leveraging existing classes and styles when adding code
- No code is added that makes the existing code redundant
</section>

<section class="dropdown">
### JavaScript

ON TRACK can look like:
- The main JS file is organized thoughtfully (DOM variables together, event listeners together, functions together)
- All queried elements are saved to variables at the top of the file. Query selectors are not used throughout the code. 
- Variable and function naming is meaningful, readable, and follow convention. (Arrays are plural, functions begin with present-tense verb, etc.) 
- Functions are DRY (Don't Repeat Yourself) and demonstrate SRP (Single Responsibility Principle)
- Only semantic/organizational comments remain in file (if any). No console logs remain in any files.
- Event Listeners cleanly and simply invoke one function.  No logic is present within the event listeners.

✨WOW✨ can look like:

- Data model logic is separate from the DOM logic. Data model is updated first then used to update the DOM. 
- Arguments/parameters are used to make functions dynamic and reusable where possible (without overengineering)
- JS is formatted according to the [Turing JS style guide](https://github.com/turingschool-examples/javascript/tree/main/es5)
</section>

<section class="dropdown">
### HTML/CSS

ON TRACK can look like:
- Application matches the provided comps in terms of layout, sizing, styles and small details.
- Added HTML code uses semantic elements, only using `<div>` elements for layout purposes.
- Added CSS is organized and not-redundant.
- Added code uses consistent naming for HTML classes and IDs, following existing conventions.

✨WOW✨ can look like:
- Microanimations have been added to button clicks.
- CSS is crafted according to the [Turing CSS style guide](https://github.com/turingschool-examples/css)
- HTML is crafted according to the [Turing HTML style guide](https://github.com/turingschool-examples/html)
</section>

<section class="dropdown">
### Functionality

Functionality is another benchmark to gauge proficiency (for example, we can’t grade your JS if there isn’t enough of it written!). However, you should not pursue functionality at the expense of code quality or your learning/growth.

This means, we DO NOT want to see:

* Code that completes iterations but is sloppy
* Failure to understand every single line of code you've written
* Skipping the problem solving process (pseudocoding, talking out the problem, articulating, planning) in the pursuit of completing functionality

**Well-refactored, thoughtful code is better than sloppy extra features.**

ON TRACK can look like:
- All of the expectations of iterations 0-6 are complete without bugs

✨WOW✨ can look like:
- All of the expectations of iterations 0-6 and an extension are complete without bugs
</section>


## Live Eval Instructions
 
When you meet with your instructor, you should be prepared to screenshare your front end application (UI) as well as your code.   

**First, you'll walk through the features of your application in the UI as a user:**
- Show a few random posters
- Save a few posters 
  - Try to save a duplicate
- Make a new poster
  - Save the new poster
- Show the unmotivational posters
- Delete a few unmotivational posters 
  - Show that you can double click anywhere on the poster to delete it (image, background, text)
  - Confirm that they remain deleted if you navigate away then back to that view

Along the way, your instructor may give you specific directions or have you log various parts of the data model in your console to confirm that the data model is aligned with what the UI is showing. 

**Then, you'll share your code.  Instructors will direct you to show and speak to various parts of the code. You can expect to show:**
- Event listeners
- Save functionality
  - How you added the html to the DOM
  - How you prevented duplicates
- Unmotivational posters 
  - How you added the html to the DOM
  - How you deleted the poster from both the DOM and your data model