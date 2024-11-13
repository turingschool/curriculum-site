---
title: JSFunk
module: 2
length: 5 weeks
---

## Abstract

jsFunk will focus on practicing complex problem solving, data manipulation and prototype methods.  

As you are practicing, stay focused on breaking down and working through each problem step-by-step. You are defining a strong problem solving process that you will be able to apply to any code challenge placed in front of you, even if its unfamiliar.

There are two ways we'd like you to demonstrate mastery. Both are essential for technical job interviews.

* **Accurate implementation/problem-solving**
* **Eloquent articulation of your thought process**

🚨 You should expect to need the following methods on your midmod and final assessments:
- forEach
- filter
- reduce
- map
- sort
- includes
- split 
- join

Object.keys() **will not** be needed for your midmod or final assessments.


## Set Up

**Fork** this [jsFunk repo](https://github.com/turingschool-examples/jsFunk) of practice exercises.  

Read through the entire **README** for details and set up instructions.  

The prototypes folder holds the practice exercises you will be using.
- **prototypes/datasets** holds the datasets that correspond with each practice exercise
- **prototypes/problem-sets** is where you will find the prompts for each exercise and where you will write your implementation code  
- **prototypes/spicy-problem-sets** holds advanced "spicy" prompts to try after working through all the regular prompts. These are spicier than what you'll see on your assessment

The test folder holds the corresponding tests for each exercise.  
- Running the tests will be the last level for each problem set and will require you to complete all the levels leading up to it first.
- You can unskip the corresponding tests as you go.  
- Sometimes it's helpful to collapse down the imports and the different describe blocks so you can just focus on one describe block at a time.

## Understanding Prototype Methods

Understanding how to use prototype methods is an important step in learning how to work with application data. As you build more complex applications, you'll find yourself working with very large datasets. These datasets might need to be massaged into new formats or connect to other sources of data. A solid problem solving process and fluency using prototype methods will allow you to accomplish these tasks.

In order to be successful when working with prototype methods, you'll need to have a solid understanding of the following concepts:

* dot vs. bracket notation - when, why, and how to use each
* mutator vs. accessor vs. iterator methods
* the main characteristics of each prototype method:
  * what it does
  * what arguments it takes in
  * what it returns
* iteration - how do iterator methods let us look at each element one at a time and take neccesary action iteratively
* scope - how JS runs each line of code, in what order, where to place returns and console.logs, etc

### Notes

- This requires **consistent daily practice**. These are not skills you can cram for before the assessment.
- jsFunk problems are ***not*** in order of difficulty.  If one feels way too hard, try it, but know when to pause, post a question in codehelp and move onto a different problem in the meantime.  Come back to it as your skills and confidence improve.
- Do not stress about completing *all* of the problems. Focus more on being able to thoroughly understand and articulate the process and solution to the problems you do make it through.  
- After you solve each problem, **pause and add an annotation** for how you would walk someone through arriving at that solution. It will help you more deeply understand your solution as well as help with your articulation during assessments (and future interviews).
- We recommend spending some time solving the same problem using different iterators. For example, if you first solve a problem using a `filter` and `map`, try solving it again with a `forEach` and then again with a `reduce`. This will deepen your skillset greatly. 
- jsFunk problems practice the skills you need for your M2 assessment but they are not necessarily structured exactly like the assessments.  You are honing these problem solving and technical skills so that you can be a strong developer, not just so that you can pass the M2 assessment.


## Solidifying a Problem Solving Process

A benefit of this type of practice is that it can help you build a solid problem solving process that you can apply to any code challenge you encounter whether its ruby, JavaScript, familiar or unfamiliar.  Often, the biggest challenge in this type of work is not that you don't understand the prototype methods, but rather your problem solving process isn't polished enough for you to break down complex data and problems into small solvable steps.

<section class="dropdown">

### Problem Solving Process

1. **Restate the goal** in your own words. Take note of EXACTLY what the final output(s) should be.
1. **Consider the data** that you’re working with. What data types are you working with? Are there any parameters/arguments? What particular parts of the data do you need access to?
1. **Ask clarifying questions** that you have about the goal and/or the data. Is there anything that still unclear? It is critical that you have a complete and accurate idea of the goal and data before you move on.
1. **Pseudocode the steps** needed to get to the goal. Write out your plan, with specific steps, in plain English. What will you need to do first? Then what?… Note: You may only be able to pseudocode out the first couple of steps - that’s okay! Plan out as much as possible now.
1. **Research** what you don’t know. Is there something you’ve noted in your pseudocode that you don’t know how to do? Take note of that and google.
Start coding by referencing the pseudocode you’ve written.
1. **Stuck?** Go back to step 4 and repeat steps 4-6 until you’ve reached your goal.
1. **Refactor** your code, if necessary. You should not be worried about writing the “best” code possible while solving the problem. Get it to work, then you can work on improving the code.
1. Make note of your approach and **key learnings** you encountered
</section >

<section class="dropdown">

### Sample Approach

1. Read the prompt and examples twice (at least once **out loud**). Call out parameters/arguments
1. Build the function skeleton with args and params.
1. Access the data you need in a console log first. 
  - Console log the parameter(s)
  - Do you need to get into the dataset to access an array?  Access it in a console log.
  - *Do not write out an iterator when you dont even have the array yet.*
1. Figure out what you want to do to/with the data. Can you break it down into separate steps to complete one at a time?
  - Do you want to iterate? 
  - What are you trying to get back from this iteration overall?
  - Which iterator helps you get closer to your goal?
1. What is it that you want to do on EACH iteration? 
  - "As it's looking at each element one at a time, I want to....."
  - Console log the callback's parameter to see what element you're looking at on each iteration.
  - What do you need to return within the iterator's callback function?
1. Console log each piece of data along the way as needed
1. Console log to check that your iteration gave you the result you want. Put this AFTER the iteration is done.
1. Is there more you need to do to get to you final answer?
1. What do you want to return from the function?
</section >

<!-- ### Extra Practice -->

<!-- A group of former students created this wild and unruly [bank of practice exercises](https://docs.google.com/spreadsheets/d/1R8imTyYD64FPWJ_mD5QlZI0ybyU1QNkm1ntJqRT7r7k/edit#gid=2076278354) called iron-FE.  Some students find these prompts helpful but they are not managed by Turing instructors in any way.  -->
