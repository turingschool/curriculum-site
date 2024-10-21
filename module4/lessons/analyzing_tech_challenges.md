---
title: Analyzing Tech Challenges
layout: page
---

## Learning Goals
* Understand how interviewers generally evaluate technical challenges
* Identify how to focus your time for technical challenges
* Learn and practice a method for breaking down technical challenges


## Warm Up
Let’s assume that we will never be given a technical interview problem that we have seen before.

What can we do to feel prepared going into the interview? Think about what you would do before, during, and after an interview.

<section class="dropdown">
### Prep Ideas (don't peak yet!)
#### Much Before
  * Reviewing fundamentals, especially if there are fundamentals specific for that position
  * What can you assume or find out about the type of problem you might get for a particular interview? Ask connections that you might have at that company.
  * Record yourself talking through a practice tech challenge
  * Practice with a mentor or classmate

#### Right Before
  * Practice some wellness exercises before the interview - whatever you need to help yourself relax a bit
  * Get a good night's sleep, hydrate, eat something, resist the urge to over-caffeinate

#### During
  * Restate the problem/challenge (writing it down on paper, typing it out) in your owns words, make a drawing/diagram if that helps
  * Pseudocode
  * COMMUNICATE
  * Ask clarifying questions to ensure you understand what is being asked of you
  * Talk through your process
  * Ask questions along the way - they will give you hints and help more than you would think
  * Remember, it’s ok if you don’t finish the problem

#### After
  * Ask for feedback when it’s done (you can tell them how you felt about the problem, doing a quick self reflection)
  * Acknowledge something you didn’t understand during the interview, and follow up on that concept saying how you learned more about it/researched it
  * Continue working on the problem and follow up

</section>

## So what is a Live Coding Interview anyways?
* One of many types of tech interviews: pairing interview, presentation interview, take home assessment, etc…
* A 45-60 minute [sometimes language agnostic] challenge
* A typical interview process might go something like:
  * HR Phone Screen → Technical Phone Screen → Technical Challenge → Take Home Challenge → Onsite Interview
* Oftentimes the question is solvable in the amount of time given, but not always
* Besides your standard Leetcode-style problem, alternatively, you could also be asked to build on top of an existing app feature, which we won’t go over today
* Example: “Given an integer, give me the English human-readable string.”  e.g. 45 returns “forty-five”  101 returns “one hundred one”

Not all companies use the same kind of technical interview, but technical challenges are still common. Different companies have different levels of difficulty and types of questions. Technical interviewing will likely be a career-long endeavor. Practice will pay off! 
<section class="call-to-action">
What do you think interviewers want to see from candidates during tech challenges?

Putting yourself in the interviewer’s shoes – what would you notice? What would you look for?
</section>

## What are they looking for?
### Reaction
Your interviewer will be looking for your initial reaction to the problem itself, e.g. do you comprehend the question? Ask clarifying questions - they are probably expecting you to!

### Thought Processes
How do you break down this problem? Have you considered edge cases? 

### Passion
Are you energized by this kind of thing?

### Communication
How are you conveying your thought processes and approach to your interviewer? The interviewer will discern very quickly how well you can code. The rest of the time is them evaluating your communication and thought process.

### Decision-Making
There are trade-offs in solving a problem one way or another, so how and why did you choose your methodology? Is the solution performant? What trade-offs are you making? (Big O Notation)

### Can you code?
Are you writing conventional code for the language? You do not need to solve 100% of every problem they give you.

## Framework for Solving Technical Challenges

<section class="call-to-action">
### Let's Try It!
Given two strings, can you rearrange the letters from one to make another?
```
“listen”, “silent” => true
“debit card”, “bad credit” => true
“fish”, “cows” => false
```
</section>

### 1. Understand
Ask questions to make sure you understand the challenge, and its edge cases. Read the problem! Read the problem again. After you have read the problem:
* Take a minute to collect your thoughts
* Ask clarifying questions! 
* Think about edge-cases
* Identify some simple test cases

<section class="dropdown">
### What clarifying questions should you ask the interviewer?
* What happens if there’s an empty string/data structure? 
* What if there are no cases that match what we’re looking for? 
* What if there are two of what we’re looking for?
* Does capitalization matter? Do spaces matter? 
* Will there be more data to test? Will it include any nesting? Will there be any other data types as inputs (this is rare)? 
* Will there be negative numbers? What about 0?   
</section>


### 2. Match
There are a handful of types of technical challenges. If you can identify common patterns among challenges, you can recall how you solved similar problems and quickly evaluate whether or not that same approach will be effective. Some problems fall into a single category, other problems will involve a mix of different categories. Identify the type of problem and any algorithms that might be helpful. Take a moment to consider if you’ve solved this problem, a part of this problem, or something similar in the past. 

Does the problem require some kind of algorithm that you’re familiar with? For example, maybe you need to sort. Maybe you’ll need to use recursion. Maybe you’ll need some math.

<section class="call-to-action">
**What algorithms, methods, syntax, tools, etc. might help you solve this problem?**

See examples at the bottom of this lesson for common types of problems, data structures, and algorithms.
</section>



### 3. Plan
Write down the steps needed to solve the problem and pseudo-code a solution. If interview is 45 minutes, ~10 minutes can be spent pseudocoding! Once you understand the problem, spend time on the mid-level design.
*  Start by writing out simple steps in a “code-like” structure. This helps prove out your design before you start coding, and allows the interviewer to intervene if your design is flawed.
* Try to keep your pseudocode in spoken language as much as possible. Avoid “fake code” which is harder to follow later.
* Communicate out loud what you’re thinking and why you’re thinking it.
* You don’t need to come up with the most flashy solution, especially in the planning phase. 
* **Pseudocoding is about strategy, not syntax**

<section class="call-to-action">
**Take 5 minutes to match this problem to any of your past knowledge and write out some pseudocode. It’s ok if this is your first time seeing this type of problem, give it a shot!**
</section>

### 4. Implement
Code out your solution. If the only ideas that are coming to mind are the “brute force” solution, that’s okay! Plan and execute, and if you come up with a better solution, you can revisit the plan. Get it working first.


### 5. Reflect
Talk through an example out loud to validate that your code will do what you think it should.

### 6. Evaluate
Evaluate the time complexity of your solution (Big O) and any ways you might optimize your solution further.


<section class="call-to-action">
### Tips for Effective Practice
* Use a plain text editor (sometimes) 
* Work toward exposure to major concepts, then be organized and study one type of problem at a time
* Practice regularly - 30 min/day!
* Practice talking out loud as your practice
* Vary the difficulty level of your practice - don’t do all easy or all hard!
* Keep coming back to problems you’ve solved before
* Record yourself. No, SERIOUSLY.

</section>

## Practice

### Instructions
You will be given a technical challenge and asked to analyze it in your breakout room.

1. Understand: brainstorm edge cases & alternative inputs
2. Match: Identify the type of problem
3. Break the problem down into small steps
4. Plan: Write out some pseudo code



<section class="dropdown">
### Demo Problem

Given a string, determine if it is a palindrome (reads the same forwards and backwards) without using a built-in reverse method.
```
“abba” => true
“Racecar” => true
Nurses run! => true (depending on if you consider punctuation and spacing)
```

#### Understand
* What is a palindrome?
* What is a built-in reverse method?
* Should we consider punctuation and spacing?
  * Is it case sensitive? 
  * How to handle spaces and special characters?
  * Can I expect a sentence with punctuation?
* Single letter automatically true? Empty string automatically true?


#### Match
* String Manipulation Problem

#### Break the Problem down
* Iterate through the string
* Check if the string is the same forwards and backwards
* Return true if it is, false if it isn't

#### Plan
* If length less than or equal to 1 => true
* Create a second string / array that reverses the string one letter at a time
* Compare first char of string to first char of reverse string
* Repeat until end or the chars don't match => false
* If all characters match => true


</section>


<section class="dropdown">
### Practice Problem 1

You are given a large integer represented as an integer array digits, where each digits[i] is the _i_th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits. For example:
```
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123
Incrementing by one gives 123 + 1 = 124
Thus, the result should be [1,2,4]
```
</section>

<section class="dropdown">
### Practice Problem 2

Given an integer, give me the English human readable string. For example:
```
45 => “forty five”
101 => “one hundred one”
```
Consider all numbers between zero and one million.
</section>

<section class="dropdown">
### Practice Problem 3

You are given an array that represents the price of a stock throughout the day. The array is in chronological order, so the first element is the stock’s price at the start of the day, and the last element is the price at the end of the day.

Write some code that could tell me the best profit possible if I had bought and sold stock during the day. For example, if given:

`stock_prices_yesterday = [10, 7, 5, 8, 11, 9, 4]`

the function should return 6 (Buy: $5, Sell: $11, Profit: $11 - $5 = $6)

</section>

## Common Patterns, Data Structures, and Algorithms
### Problem Types
<section class="dropdown">
### Sorting
* Key words: “organizing” (data in some way)
* Do you need to implement/use a sorting algorithm? Or do you need to put data into a new data structure?
* Good to be familiar with some common sorting algorithms. Can check out [Common Sorting Algorithms](https://www.freecodecamp.org/news/sorting-algorithms-explained/) for a quick look through.

Example: Given an array of birthdays in “mm/dd/yyyy” format, put them in order from oldest to youngest.
  * Most likely, you’d have to use sorting as part of a bigger problem - some problems are easier if you sort first.
</section>

<section class="dropdown">
### Searching
* Key words: “look for”, “find”
* Do you need to implement a searching algorithm? Or Is this just pattern recognition?
* Usually more of “find the values that meet this criteria” kind of problem.
</section>

<section class="dropdown">
### Pattern Recognition
* Key words: “find”
* Similar to “searching” problems, so deeper discernment is a necessary when trying to evaluate what the problem is really asking you to do.
* Usually come with many different examples and may utilize some elements of “searching” problems in order to determine if a pattern exists.
* Can utilize recursion, but not always

Example: Given a string, find the longest palindromic substring.
  * “banana” should return “anana”
  * “Balloon” should return “ll”
</section>

<section class="dropdown">
### Grid
* Key words: “2-dimensional space”, “grid”, “maze, “game”, “navigation”
* Rows/Columns, x/y coordinates
* Most commonly implemented using an array of arrays
* Recursion works great for mazes where you might have to backtrack and take a different route.

Examples:
  * Create a command line tic tac toe game
  * Navigate a robot through a maze
</section>

<section class="dropdown">
### Math
* Key words: “addition”, “multiplication”... other math operations.
* Quite common 
* Rarely will you be asked to do anything outside of middle school algebra. If you don’t know the math, ASK!
* If you have a math background (especially advanced degree) you might get more advanced math problems.

Example:
```
Given a non-negative integer x, compute and return the square root of x.
Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.
Note: You are not allowed to use any built-in exponent function or operator, such as pow(x, 0.5) or x ** 0.5.
```
</section>

<section class="dropdown">
### Language-Specific
* Testing your knowledge of a programming language. 
* Have you used it well enough to know the common quirks or things that your language doesn’t do particularly well?
* For example, if you needed to iterate over an array without using each/forEach, what other array methods/prototypes would you utilize?
</section>

<section class="dropdown">
### Optimization
Problems that include code or a working algorithm that you must enhance to:
  * Work faster 
  * More efficiently 
  * Use less memory
  * Some combination of the above
</section>

### Challenge Types
* Objects (Dictionaries/Hashes): Objects can be used to solve problems due to their ability to quickly look-up key-values.
* Arrays: Array traversal is a common pattern. You may iterate over each value one-by-one or use a two pointer technique to approach from both ends.
* Strings: These may include finding palindromes, reversal, and other patterns. String problems often incorporate using objects/arrays/etc.
* Dynamic Programming: DP is the process of breaking down a large problem into smaller subproblems and (usually) recursively finding a solution.
* Matrix (2D Arrays): Matrices can be used to represent a picture (arrays of pixel data) or any other 2D setup (like a geographical map).
* Heaps: Heaps are used for priority queues and other queue-like functionality in programming. They are fast at finding the min/max value of some set of values.

### Data Structures
Some challenges will explicitly state which data structures to use while others will be purposefully vague.
Interviewers will want to hear your thought process about:
* Which data structure you will choose
* How you evaluate the pros/cons of your choice
* How you implement your code based on that choice

#### Common Data Structures
* Array
* Hash/Object
* Linked List
* Stacks
* Queues
* Binary Tree
* Graphs

<section class="call-to-action">
Learn these three things about each data structure:
* What is this data structure really good for?
* What are drawbacks to this data structure?
* When/Where is the data structure most commonly used?

If you can answer these questions about each data structure, it will help you to solve the majority of the code challenges you will encounter during an interview. 
</section>



## Additional Resources
* Cracking the Coding Interview
* LeetCode, HackerRank, etc. 
* [github.com/turingschool/challenges](http://github.com/turingschool/challenges)
* [CS for Interviews Resource](../interview_resources/cs_for_interviews)
* [How to reduce the LeetCode grind w/ Ian Douglas](https://www.youtube.com/watch?v=QT0dS9C9uwo)
* [Grokking the Coding Interview: Patterns for Coding Questions](https://www.educative.io/courses/grokking-the-coding-interview)
