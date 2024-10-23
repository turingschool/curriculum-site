---
title: Recursion
layout: page
---

## Learning Goals

- Understand the concept of recursion
- Understand the limitations of recursion in JS & Ruby
- Be able to solve problems using recursion
- Know the theory behind Tail Call Optimization

<section class="call-to-action">

### Prework

Complete this prework prior to the live lesson:  
- Read [this article](https://www.sitepoint.com/recursion-functional-javascript/) - 6 minutes
- Read [this article](https://www.geeksforgeeks.org/recursion-in-ruby/) - 6 minutes
- Watch [this video](https://www.youtube.com/watch?v=ozmE8G6YKww) - 12 minutes

## Discussion on Prework

Reflecting on the prework, discuss the following questions with a peer:

  * Describe what recursion is? How does it compare to loops?
  * What are some scenarios that recursion is best for?
  * What performance issues does recursion have in languages like JavaScript & Ruby?
</section>

## Reviewing Key Concepts

Recursion is an important programming technique in which **a function CALLS ITSELF**.  Yes, you read that right. 

More specifically, a recursive function is a function that calls itself *until* it arrives at a final result.

## The anatomy of a recursive function

Every recursive function (reminder, just a function that calls itself) must have these two pieces:

1. A simple **base case** (or cases): a terminating scenario that _does not use recursion_ to produce an answer
  * Often written as an `if` statement
  * Think of this as similar to the test condition in a for loop - under what condition do we want to STOP recursively calling the function?
  * Without a base case (like a loop without a valid test condition) we will end up recursively calling the function FOREVER... or until we get a stack overflow error. 

2. A **recursive case**: A set of instructions, moving closer towards the base case, that ends in a call to the same function

Let's see this in action with a function that takes a number as an argument and counts down to zero.


**Javascript Prompt**

 
 ```js
 countdown( 3 );
 // We want this function to countdown from the starting number until we get to 0
 // 3
 // 2
 // 1
 // 0
 ```

 **Psuedocode**

 ```js
 const countdown = number => {
   //base case - when do we want to stop?
     //stop when we get to zero (0)
   //recursive case
     //print the number we are currently on
     //call the countdown function again with the next number
 }
 ```
<section class="dropdown">

### JS Solution

 ```js
 const countdown = number => {
   // check our base case, if statement
   if (!number) {
     return 0;
   }
  
   console.log(number);

   // recursive case moving towards base case
   return countdown(number - 1)
 }

 countdown(3); // 3, 2, 1, 0
 ```
 </section>


**Ruby Prompt**
 
 ```ruby
countdown(3)
# We want this function to countdown from the starting number until we get to 0
# 3
# 2
# 1
# 0
```

**Psuedocode**
```ruby
def countdown(num)
  # base case - when do we want to stop?
    # stop when we get to zero (0)
  # recursive case
    # print the number we are currently on
    # call the countdown function again with the next number
end
```
<section class="dropdown">

### Ruby Solution

```ruby
def countdown(num)
  # check our base case, if statement
  if num < 0
    return
  end
  
  p num
  
  # recursive case moving towards base case
  countdown(num - 1)
end
```
</section>


### Advantages

* Allows you to break problems down into the smallest, most repeatable step and do that small step over and over! 
* Useful for iterative branching including:
  * fractal math
  * sorting
  * traversing nodes of complex/non-linear structures (binary or prefix tries)
* Recursion is more functional in that it doesn't keep track of state (no side effects)

### Disadvantages
* Recursion is not optimized in many languages including JS & Ruby
  * Execution contexts continue to get built on the callstack.
  * With bigger datasets, this can be a problem.
    * Memory consumption can lead to the `maximum call stack size being exceeded`.
    * Loops on the otherhand don't need to add functions to the call stack. (better memory management)

<br>

## Diving Deeper Into The Process

Let's work through one more together and write out a function that takes in an argument of an array of numbers and adds them together.


**Javascript Setup**

 
```js
let numbers = [ 1, 2, 3, 4 ];

getSum(numbers); // 10
```

 

**Ruby Setup**

 
 ```ruby
  numbers = [1,2,3,4]
  
  get_sum(numbers)
  # => 10
```

One of the most basic patterns of recursion is when you can reduce a problem to a smaller one and then keep reducing until you can't do it anymore. This is also known as natural recursion.

So, at the most basic level, we just want to add one number with another number! How might this look in psuedocode? (Try it on your own first, then check out the pseudocode below.)

<section class="answer">
 
### Psuedocode

```js

  //base case
    //if there are no more numbers to add, return 0
  //recursive case
    //take the first number from the nums array
    //add that number to the result of calling getSum with the remaining numbers

```
</section>

It can be helpful to break down what each step of this problem looks like. Here's one way to visualize the call stack:

![visualization of the recursive call stack](https://i.imgur.com/Ly55ggk.png)

<section class="dropdown">
 
### Solutions


**Javascript Solution**
<br>
 
```js
const getSum = nums => {
  // base case
  if (!nums.length) {
    return 0;
  }
  
  // get closer to base case
  let firstNumber = nums.shift();
  
  return firstNumber + getSum(nums);
}
```

 
**Ruby Solution**
<br>
 
 ```ruby
 def get_sum(nums)
  # base case
  if nums.empty?
    return 0
  end
  
  # get closer to base case
  first_number = nums.shift
  
  first_number + get_sum(nums)
 end
```
 
</section>

## Exercises

The best way to start understanding recursion is to just try doing it!  Feel free to work through these problems in either JavaScript or Ruby.

<section class="call-to-action">
### Exercise 1

**Factorial**

In mathematics, the factorial of a non-negative integer is the product of all positive integers less than or equal to n. For example, the factorial of 5 is 120.

```js
5 x 4 x 3 x 2 x 1 = 120
```

Write a recursive function that calculates the factorial of a number.

<!-- 
Possible Solution
const factorial = num => {
  if (num <= 1) {
    return 1
  }
  return num * factorial(num - 1)
}
 -->

</section>

<section class="call-to-action">
### Exercise 2

**Reverse a string.**

```js
// create a function which takes a string of characters and
// recursively calls itself to reverse the string

// e.g.

let reversedString = reverse('Ariel')

console.log(reversedString); // leirA
```

<!-- 
Possible Solutions
const reverse = word => {
  //base case
  if (!word.length) {
    return word
  }
  let splitUp = word.split('')
  let last = splitUp.pop()
  let remaining = splitUp.join('')
  return last + reverse(remaining)
}

const reverse = word => {
  if (!word.length) {
    return word
  }
  let last = word.charAt(0)
  let remaining = word.substring(1)
  return reverse(remaining) + last
} 
-->

</section>

<section class="call-to-action">

### Exercise 3

**Calculate a number to a specific power.**

```js
// create a function which takes a number and an exponent and
// recursively calls itself to calculate the product

// e.g.
let base = 2;
let exponent = 4;
let product = power(base, exponent)  // 2 to the 4th power

console.log(product);  // 16
```
<!-- 
Possible Solution
const power = (base, exponent) => {
  if (exponent < 1) {
    return 1
  }
  return base * power(base, exponent - 1)
}
 -->

</section>

<section class="call-to-action">

### Exercise 4

**Palindrome Checker**

A palindrome is word/number that reads the same forwards and backwards. Examples include `racecar`, `tacocat`, and `toot`. 

Write a recursive function that determines whether a given input is a palindrome!

**Hint:** An empty string AND a letter would technically be considered palindromes in this example.

```js
// create a function which takes a string
// and recursively calls itself to determine if the string is palindrome

// e.g.

console.log(isPalindrome('racecar'));  // true
console.log(isPalindrome('a')); //true
console.log(isPalindrome('library'));  // false
console.log(isPalindrome('dngojkafnghkoasng'));  // false
```

<!-- 
Possible Solutions
const isPalindrome = string => {
  if (string.length <= 1) {
    return true
  }
  const split = string.split('')
  const first = split.shift()
  const last = split.pop()
  const remaining = split.join('')
  if (first === last) {
    return isPalindrome(remaining)
  }
  return false
}

const isPalindrome = string => {
  if (string.length <= 1) {
    return true
  }
  let first = string[0]
  let last = string[string.length - 1]
  let remaining = string.substring(1, string.length -1)
  if (first === last) {
    return isPalindrome(remaining)
  }
  return false
}
 -->

</section>
<br>
<br>

## Tail Call Optimization

We won't work through this section in the lesson today. Tail Call Optimization is something to dig into yourself if you're curious.  Note that neither Ruby nor JavaScript natively supports tail call optimization (TCO) out of the box so this may be a nice-to-know more than something you'll actually be able to implement depending on the environment you're working in.

Great work on writing some recursive functions! As you read earlier, recursion isn't really optimized for JS or Ruby. By adding to the call stack with each recursive call, this can become too much to handle for recursive functions using large datasets! To get around the stack overflow issue, one can use *tail call optimization*.  A tail call refers to the last action that is **executed**. In this scenario, the recursive call must be the *last statement* of the recursive function.

Let's think back to our `getSum` function we wrote earlier...

```js
// Example:
// Create a getSum fn that adds all of the numbers in an array

// Example that is not optimized due to it returning an operation
return firstNumber + getSum(nums);

// Example suited for tail call optimization
return getSum(nums, sum + firstNumber);
```

Notice with the first example, we are returning an operation.  In this scenario, this would need to be added to the callstack because this cannot be executed until we know what `getSum(allNumbers)` returns.

In the second example, we are only returning the recursive function and passing what arguments we need to keep track of the sum, making this perfect for Tail Call Optimization so that it can execute immediately instead of stacking in memory. Taking what we understand from this, let's make some adjustments to the solution we just worked through!

<section class="answer">
### Tail Call Optimization Solution for `getSum`

```js
const getSum = (nums, sum=0) => {
  // base case
  if (!nums.length) {
    return sum;
  }
  
  // get closer to base case
  let firstNumber = nums.shift();
  
  return getSum(nums, sum + firstNumber);
}
```
</section>

Note that for Javascript, this optimization is only available in Safari.  (Chrome, FireFox, and other browsers are not optimized currently).  Read [here](https://stackoverflow.com/questions/54719548/tail-call-optimization-implementation-in-javascript-engines) to understand more of the history about this.

In Ruby, this optimization is not available by default.  You *can* configure the Ruby compiler to enable tail call optimization however.  If you're interested, follow the [article](https://nithinbekal.com/posts/ruby-tco/) here!


<!-- ### Exercise 4

The Collatz conjecture applies to positive numbers and speculates that it is always possible to `get back to 1` if you follow these steps:

- If `n` is 1, stop.
- Otherwise, if `n` is even, repeate this process on `n/2`
- Otherise, if `n` is odd, repeat this process on `3n + 1`

Write a recursive function that calculates how many steps it takes to get to 1

n | collatz(n) |Steps
--- | :---: | --- 
2 | 1 | 2 -> 1 
3 | 7 | 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1
4 | 2 | 4 -> 2 -> 1
5 | 5 | 5 -> 16 -> 8 -> 4 -> 2 -> 1
6 | 8 | 6 -> 3 -> 10 -> 5 -> 16 -> 8 -> 4 -> 2 -> 1 -->


### Bonus
Now try and solve these problems with tail call optimization!