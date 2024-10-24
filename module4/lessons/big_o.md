---
title: Big O Notation
tags: big-o
module: 4
---

## Learning Goals

- Discuss the challenge of comparing multiple solutions to a problem
- Understand what Big O is and why it's valuable for both interviews as well as apps dealing with large amounts of data
- Discuss the differences between time and space complexity
- Discuss some common Big O Notation equations
- Practice calculating the Big O of a few high level solutions to a technical challenge

## Vocab

- **Algorithm** A set of rules and processes for solving a problem
- **Big-O Notation** A description of the worst-case performance of an algorithm

<section class="call-to-action">
### WarmUp Technical Challenge

Let's practice solving a problem at a high level.  Just focus on writing out pseudo code, **NOT** actual code.

**Problem:**
- You have an array which contains all numbers from 1 to 1 million.
- The numbers are randomly ordered/shuffled in the array.
- One number is in the array twice, also at some random location.
- How might you find the duplicate value?

<section class="note">
### Note

There are a couple of solutions to the problem above that have various pros and cons.  Don't worry about trying to get the perfect solution.  Instead, practice breaking down the problem and thinking about the approach you could take.
</section>
</section>



<section class="dropdown">
### Potential Solution A  

**Sort/Compare**
```
// sort numbers in ascending order
// iterate over numbers
  // look at neighbor.  If they are the same, return the value
```

One potential solution is to sort the array of numbers and then iterate over the numbers again, comparing each value to it's neighbor to see if they are the same.
</section>

<section class="dropdown">
### Potential Solution B  

**Nested Lookup**
```
// iterate over array of numbers
  // iterate over the array again and compare it to the rest of the array
    // If a match is found, return the value
```

Another potential solution is to iterate over the array of numbers, and for each iteration, compare it to the rest of the array to see if a duplicate is found.
</section>

<section class="dropdown">
### Potential Solution C  

**Hash/Obj Tracker**
```
// iterate over the array and add each value to a hash or object
  // As soon as the value of a key is 2, you've found the duplicate
```

A third solution might include iterating over an array and adding it as a key to an object/hash, counting the number of instances in the value.  As soon as a key already exists and is increased to 2, you've found your duplicate.
</section>

<section class="note">
### So which answer is "The Best"?

This is why we we can use something like Big O in order to help us understand the performance implications of each of these problems and compare each of these different solutions.

Although it is very possible that you may never get asked about Big O Notation in an interview, if you attempt to speak to it, even a little, it can make you stand out from other candidates.  Also if you apply to bigger companies like Google, Apple, Twitter, etc. it is much more likely that you'll run into more computer science topics due to the amount of data those companies need to track.
</section>

## Okay, so what is Big O?
Big O notation is used in Computer Science to describe the performance or complexity of an algorithm. Big O specifically describes the **worst-case scenario**, and can be used to describe the execution time required or the space used (e.g. in memory or on disk) by an algorithm.

<section class="dropdown">
### Another way of saying that is:

We're describing the **time complexity** and **space complexity** of an algorithm.
- The *time complexity* of an algorithm quantifies the amount of time taken by an algorithm to run **as a function of the length of the input**. The length of the input is typically represented as the variable `"n"`
- The *space complexity* of an algorithm quantifies the amount of space or memory taken by an algorithm to run as a function of the length of the input.

Which optimization should be prioritized?
- There is rarely a perfect solution as there may often be trade offs between time and space complexity.  Most of the time you will want to optimize for time complexity, but it is something to confirm especially during an interview.
</section>

<section class="note">
### An Analogy for Big-O

A good analogy is "horsepower", a term coined by James Watt in Scotland in the 1800's to teach a comparison of power between draft horses and steam engines (and later other types of engines and machines). In today's society, while we may not understand the intricacies of how an automobile works, we generally know that a 200-horsepower engine is twice as good as a 100-horsepower engine.

Likewise, with Big O Notation, we can get a sense of EFFICIENCY of an algorithm, instead of the POWER of an engine as in the previous example.
</section>

<section class="note">
### A Common Misconception

Because Big O attempts to quantify the amount of time an algorithm will take, it may be tempting to think about this in terms of seconds or milliseconds. However, with Big O we are not going to measure that actual amount of time an algorithm takes. Instead, we are going to describe the amount of time an algorithm will take **compared to the size of the input**. This why Big O notation uses terms of `n` rather than a measure of time.

In programming, you can make use of "Benchmarking", or measuring the amount of time your code takes to run. However, we won't be using that as a tool today. While it can be enlightening to see the actual amount of time different algorithms take, it is not necessary for calculating Big O.
</section>

## Notation for Time Complexity
The notation for time complexity is written as a math formula.  `"n"` is typically used to signify the amount of data. The most common examples you might see include:

- O(1)
- O(log n)
- O(n)
- O(n log n)
- O(n^2) (aka, n-squared)

We'll discuss each of these in order from least complex (best performance) to most complex (worst performance).

<section class="dropdown">
### Constant Time - O(1)

**Description:**
- No matter how much data there is, it only takes one operation.

**Examples:**
- Simple math operations and assignment operators
- Invoking a function
- Accessing an array by index position
- Accessing a property in an object/hash by its attribute/key
</section>

<section class="dropdown">
### Logarithmic Time - O(log n)

**Description:**
- Every step/action you take, you cut out half of the work.

**Examples:**
- "Binary search" using a binary tree.  An example of doing this might include looking up a word in a dictionary.
</section>

<section class="dropdown">
### Linear Time - O(n)

**Description:**
- Complexity grows in direct proportion to the size of the input data.

**Examples:**
- Iteration over an array or the keys of an object/hash with a `for` loop or `while` loop
- Using array prototype methods/enumerables such as `map` or `reduce`
- Anything that looks at, or processes, every element in a data structure.
</section>

<section class="dropdown">
### Linearithmic Time - O(n log n)

**Description:**
- Often is a nested iteration where within each operation done in linear time, there are actions being done in logarithmic time over the same size of data

**Examples:**
- Efficient sorting algorithms such as `merge sort`
- Some searching algorithms
</section>

<section class="dropdown">
### Quadratic Time - O(n^2)

**Description:**
- Nested loops over the same or similarly sized dataset

**Examples:**
- Some inefficient sorting algorithms such as `bubble sort`
- Anytime you have nested loops or iteration methods
</section>

<section class="note">
### Put em all together and what do you get?

![Big-O Complexity](https://i.imgur.com/ICbvatT.png)

**Key Differences:**

| Big O Notation Equation | Name | Explanation | Use Cases |
|-------------------------|------|-------------|-----------|
| O(1) | Constant Time | No matter how much data there is, it only takes one operation.  | - Simple math operations <br /> - Invoking a function <br /> - Accessing a value in an array by index position <br /> - Accessing a property in an object/hash by its attribute/key |
| O(log n) | Logarithmic Time | Every step/action you take, you cut out half of the work. | - A common example of this is a binary tree |
| O(n) | Linear Time | Complexity grows in direct proportion to the size of the input data.  | - Iteration over an array or the keys of an object/hash with a `for` loop, `while` loop, or methods like `map` or `forEach` |
| O(n log n) | Linearithmic Time | Often is a nested iteration where within each operation done in linear time, there are actions being done in logarithmic time over the same size of data | - Efficient sorting algorithms such as `merge sort` <br /> - Some searching algorithms |
| O(n^2) | Quadratic Time | Nested loops over the same or similarly sized dataset | - Some inefficient sorting algorithms such as `bubble sort` <br /> - Anytime you have nested loops or iteration methods |

</section>


### Other Key Considerations

Usually when calculating Big O notation, an algorithm doesn't fall nicely into one of the categories above. It's more likely that an algorithm combines some of the given strategies. Here are some key things to keep in mind:

* When operations are sequential, their complexities add together
* When operations are nested (within loops for example), their complexities multiply
* When calculating Big O, we don't care about *constants* or *coefficients*. For example `O(2n + 1)` is simplified to `O(n)`
* When calculating Big O, if your algorithm requires several sequential steps, your Big O notation would only list the worst of those complexities. For example, `O(n + n^2)` would be simplified to `O(n^2)`.

## Notation for Space Complexity
Generally you will use a "modifier" notation like `1x` or `2x` where `1x` represents that we did not use any more memory than the data structure provided to us. `2X` would indicate that we’ve added a second data structure of some kind. Which data structure, and what it holds, is less relevant.

**Note:** This is *NOT* impacted by variables or "transient" data structures like array slices, but rather when you intentionally build a new data structure like an object/hash or an array.  An example of this might include duplicating an array to track a result.  This would result in `2x` memory usage.

## Taking a look at our previous problem
<section class="call-to-action">

Taking a look at our previous solutions, as a group let's calculate the Big O for the first algorithm

**Sort/Compare**
```
// sort numbers in ascending order
// iterate over numbers
  // look at neighbor.  If they are the same, return the value
```

</section>
<section class="dropdown">
### Performing the Calculation

Looking at our cheat sheet above, we can see that efficient sorting algorithms have `n log n` complexity. We can also see that iterating over the data set adds `n` complexity.

The line `look at neighbor...` is a little trickier. This would involve accessing two values from the array by index. Looking at the cheat sheet, accessing an array by index is constant time complexity `O(1)`. You might think that because we are accessing two values it would be `O(2)`, but remember we drop coefficients so `O(2)` simplifies to `O(1)`.

We can summarize what we've learned so far:

```
// sort numbers in ascending order O(n log n)
// iterate over numbers O(n)
  // look at neighbor.  If they are the same, return the value O(1)
```

Keep in mind these rules from earlier:

* When operations are sequential, their complexities add together
* When operations are nested (within loops for example), their complexities multiply

Applying these rules, we would get `O(n log n + n * 1)` which can be simplified as `O(n log n + n)`.

Now let's apply another rule from earlier:

* When calculating Big O, if your algorithm requires several sequential steps, your Big O notation would only list the worst of those complexities.

`n log n` is the more complex of the two sequential steps, so our final answer for this problem's Big O time complexity is:

**`O(n log n)`**

What about space complexity? We didn't create any additional data structures, so the space complexity is

**`1x`**
</section>


### Now you try!

In breakout groups, try calculating the Big O for the **Nested Lookup** and **Hash/Obj Tracker** solutions.

<section class="dropdown">
### No Peeking Until Afterwards!

**Nested Lookup**
```
// iterate over array of numbers O(n)
  // iterate over the array again and compare it to the rest of the array O(n)
    // If a match is found, return the value O(1)

time: O(n^2)
space: 1x
```

**Hash/Obj Tracker**
```
// iterate over the array and add each value to a hash O(n)
  // As soon as the value of a key is 2, you've found the duplicate O(1)

time: O(n)
space: 2x
```
</section>


<section class="note">
### So now that we've calculated Big O, which answer is "The Best"?

As usual, the answer is it depends! We can see that the Hash/Object tracker has the best time complexity but the worst space complexity. The Sort/Compare approach has better space complexity but worse time complexity. The Nested Iteration strategy also has good space complexity but the worst time complexity.

So if you are optimizing for space, you would probably prefer the Sort/Compare approach. An example would be if you are writing code to run on a very small computer, for instance a chip embedded in a thermostat. However this is not going to be a very common consideration for web developers.

If you are optimizing for time (and remember, usually we are), then you would prefer the Hash/Obj tracker approach.

We can safely say that the Nested Iteration strategy is the worst of the 3. In general, nested loops are the least efficient way to develop an algorithm.
</section>

<section class="note">
### Okay, but does this really matter?

Again, it depends! On a small scale, no this doesn't matter a lot. For example, let's say we use each algorithm on an array of 10 numbers.

```
n = 10
n^2 = 100
n log n = 10
```

`n` and `n log n` actually end up taking the same amount of time. We can see that the `n^2` solution will take 100 "units of time" which is quite a bit higher, but would still be very quick work for a computer to calculate.

But what about a million numbers?

```
n = 1,000,000
n^2 = 1,000,000,000,000
n log n = 6,000,000
```

`n^2` will take 1 quadrillion units of time which is infeasible for a computer to finish in a reasonable amount of time. `n log n` and `n` both stay in the millions which is much more reasonable, but we can see that at this scale the `n log n` solution will take 6 times longer to run.

Using Big O, we can go a step beyond "does this work?". With Big O we can determine if something will work, **and** if it will continue to work at a larger scale.
</section>

<section class="checks-for-understanding">
### Checks For Understanding

- What is Big O?  What is it describing?
- Explain the differences between "time complexity" and "space complexity".
- Which optimization should be priotized?
- What should you try to avoid in order to optimize for better "time complexity"?  "Space complexity"?
</section>

<section class="note">
### Nice to Know (NOT Need to Know)

There is also Big Ω (Omega) to describe the best performance and Big Θ (Theta) the describe the average performance.  While these can be valuable pieces of information, in most real world scenarios, we are often focused on the worst-case scenarios because we often don't have control over the data we're receiving.  (Be it data from the FE to the BE or vice versa)  
</section>

#### Resources
- [Big-O Cheat Sheet](http://bigocheatsheet.com/)
- [Beginners Guide to Big-O](https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/)
- [Big-O Misconceptions](http://ssp.impulsetrain.com/big-o.html)