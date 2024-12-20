---
layout: page
title: Problem Solving
---

## Learning Goals

- Develop a strategy for breaking down multi-step problems
- Practice writing pseudocode to explain the process
- Identify programming concepts that can achieve the goal

## Problem Solving Process
With practice, you'll get faster at problem solving, but in the beginning it can be helpful to slow down the process and think through each step. We recommend using the following 8 steps to Problem Solving as a guide to help you get started.
1. **Restate the goal.** Reframe the end goal in your own words. Take note of *exactly* what you expect to happen.
1. **Consider the data.** What data types are you working with? Will you use parameters and arguments?
1. **Ask clarifying questions.** If anything is still unclear, pause for a moment to get clarification. You'll need to have a clear idea of both what you're hoping to accomplish and the data you're working with before you begin.
1. **Break it down.** Pseudocode the steps you might need to take. Write the steps in plain English, but you may use technical terms that reference data types or methods you think might be helpful.
1. **Research.** Is there anything in your pseudocode that you don't know how to do? Take note of that and use Google as a tool to find some things you might try.
1. **Start coding.** Use your pseudocode as a guide and start writing your code! Work in iterations, starting with the simplest possible output and slowly add layers of complexity.
1. **Stuck?** Go back to your pseudocode and rethink what you might be missing. You may need to reorder your steps to continue.
1. **Refactor.** After we've found one solution, it's always a good idea to go back and see if there's another simpler way to achieve the same result. Sometimes after solving a problem once, we are able to see it from a new perspective.

<br>

<div>
  <h3>Problem Solving Example</h3>
  <p>Pretend your assignment is to write a function or method that accepts an array as an argument and returns a number representing the number of elements in the array. Below is one way you might use the 8 steps to Problem Solving:</p>
  <ol>
    <li><b>Restate the goal.</b> 
      <br>
        <i>"Write a function/method that counts how many elements are in an array."</i>
    </li>
    <li><b>Consider the data.</b> 
      <br>
        <i>"The parameter is an array and the return value is a number."</i>
    </li>
    <li><b>Ask clarifying questions.</b> 
      <br>
        <i>"Are there any existing methods that can count the length of an array?"</i>
    </li>
    <li><b>Break it down.</b> 
      <br>
        <i>"Write a function/method. The parameter is an array. Call a method on the array to find its length. Return the length of the array. Call the function with a couple of test arrays to check the result."</i>
    </li>
    <li><b>Research.</b> 
      <br>
        You might Google something like <i>"JavaScript/Ruby method array length"</i>
    </li>
    <li><b>Start coding.</b> 
      <br>
      Remember to call your function/method using a couple of different values to confirm your solution is behaving as expected.
    </li>
    <li><b>Stuck?</b>
      <br>
        This is a great opportunity to use what you learned about Asking Technical Questions!
    </li>
    <li><b>Refactor.</b>
      <br>
      Try asking yourself, <i>"Can I solve this in a simpler way?"</i> or <i>"Is there a different method I can use to get the same result?"</i>
    </li>  
  </ol>
</div>

## A Note About Research
While we've all used Google a time or two, there are ways to make your search more effective. Follow the guidelines below to ensure you get the best possible results.
- Include the programming language
- Include the data type (if applicable)
- Use technical terms
- Choose reliable sources (MDN or Ruby docs)

If the solution you're looking for isn't in the first two pages of results, it's probably not there. You might try reframing your search terms or use another resource, like your Turing community!

## Problem Solving in Action
Find and open your <a href="https://replit.com/@turingschool/m0lessonsrepl#main.rb" target="blank">Mod 0 Lessons Repl </a> from previous lessons.  Comment out all the code from previous lessons.  Then, in that repl, complete the challenges below. Don't get too caught up in finding the solution - focus instead on your PROCESS. Push yourself to slow down and follow the process outlined above. And remember that you can post questions in Slack if you hit blockers!

<div>
  <h3>Challenge 1</h3>
  <p>Write a method or function that accepts a string. The method or function should return a boolean that describes whether or not the string has an even number of characters.</p>
</div>

<br>

<div>
  <h3>Challenge 2</h3>
  <p>Update your previous method or function so it accepts an array. The method or function should return a boolean that describes whether or not the array's length is an even number.</p>
</div>

### Reflect
Before continuing, take some time to reflect on the following questions. 
- What do you like about this process?
- What might make this process challenging?
- Are there any steps you would add or modify?

<div>
  <h3>Challenge 3</h3>
  <p>Write a method or function that accepts a number from 1-24 that represents the current time rounted to the closest hour in 24-hour military time. (i.e. 11 = 11:00 AM, 16 = 4:00 PM). The function should return a different greeting based on the time of day.</p>
  <ul>
    <li>4 AM - 11 AM: Good morning!</li>
    <li>12 PM - 4 PM: Good afternoon!</li>
    <li>5 PM - 8PM: Good evening!</li>
    <li>9 PM - 3 AM: Good night!</li>
  </ul>
</div>

<br>

<div>
  <h3>Challenge 4 - OPTIONAL! Spicy!</h3>
  <p>Write a method or function that accepts an array of 10 integers (between 0 and 9) and returns a string of those numbers in the form of a phone number. For example, if you were given <code>[5, 5, 5, 1, 2, 3, 4, 5, 6, 7]</code>, the method or function will return <code>555-123-4567</code>.</p>
</div>

<br>

<div>
  <h3>Challenge 5 - OPTIONAL! Super Spicy!</h3>
  <p>Start with the array of strings below. Print all of the words in the array, but change every <strong>t</strong> to an uppercase <strong>T</strong>.</p>
  <p>Starter array: <code>['cat', 'dog', 'parrot', 'turtle', 'bird']</code></p>
</div>

## Reflections
Add the URL to your replit AND your reflections to the questions below to your Mod 0 Gist under **Problem Solving**.
- This process is definitely slower than starting by writing code. Why might this be helpful, even though it takes more time? 
- Some pseudocoding is more helpful when we sit down to start writing the actual code. What are some characteristics of helpful pseudocode?