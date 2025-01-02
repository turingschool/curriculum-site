---
title: "Approaching Problems Many Ways"
length: 60
tags: prototype methods
---

## Learning Goals
- Develop a deeper understanding of iterator methods
- Reduce the risk of being too attached to one iterator method OR avoiding an iterator method
- Compare and contrast iterator methods by using different iterators to achieve the same output
- Practice using console logs effectively as part of your workflow
- Take note as scope issues arise

## Activity

### Set Up
- In VS Code, open up the [approaching problems many ways file](https://github.com/turingschool-examples/mod2-sandbox/blob/main/lessons/approaching_problems_many_ways.js) in the lessons folder of your Mod2 Sandbox repo. 
- You'll see the following data and prompt in the file:
```js
const ninetiesToys = [
    {
        name: "Tamagotchi",
        releaseYear: 1996,
        price: 15.99
    },
    {
        name: "Furby",
        releaseYear: 1998,
        price: 29.99
    },
    {
        name: "Super Soaker",
        releaseYear: 1989,
        price: 19.99
    },
    {
        name: "Pogs",
        releaseYear: 1991,
        price: 5.99
    },
    {
        name: "Game Boy",
        releaseYear: 1989,
        price: 89.99
    }
];
```
- We will be solving the same challenge three times today. Each time, you will be told which iterator method(s) you're allowed to use.

<section class="note">
### The Prompt!

Write a function `findCheapToys` that returns an array of toy names that cost less than $20.

Expected output => `[ 'Tamagotchi', 'Super Soaker', 'Pogs' ]`
</section>

### Round 1: `forEach`
- Solve the prompt using a `forEach`. You may not use any other iterator methods. 

<section class="call-to-action">
### Round 1 Reflection

- List out all the steps your solution is doing. Be as granular as possible.
- What are some pros and cons of using `forEach`?
- Can you think of any prompt/scenario where a `forEach` would not work?
- When throughout this solution did it make sense to console log a piece of data?
</section>

### Round 2: `filter` and `map`
- Solve the prompt using a `filter` and `map`. You may not use any other iterator methods. 

<section class="call-to-action">
### Round 2 Reflection

- What are some pros and cons of this approach?
- Why couldn't we use only a `filter` or only a `map`? Why did we need to use both?
- List out all the steps your solution is doing. Be as granular as possible.
- When throughout this solution did it make sense to console log a piece of data?
</section>

### Round 3: `reduce`
- Solve the prompt using a `reduce`. You may not use any other iterator methods. 

<section class="call-to-action">
### Round 3 Reflection

- What are some pros and cons of using `reduce`?
- Can you think of any prompt/scenario where a `reduce` would not work?
- Look at your code from the `forEach` and `reduce`. How do they compare?
- List out all the steps your solution is doing. Be as granular as possible.
- When throughout this solution did it make sense to console log a piece of data?
- Out of all 3 rounds, which approach did you prefer? Why?
</section>

<section class="dropdown">
### Sample Solutions (don't peek!)
 
If you're looking at one of these solutions without having already solved it yourself, you should stop and ask a question instead.  You could ask an instructor in class or in office hours.  You could post your questions in your codehelp channel. You could ask a mentor or your rock.

Only look at the solutions to compare your solved code.  And even then, remember that there are _many_ valid ways to solve any given problem.

<section class="dropdown">

### Round One - forEach

```js
function findCheapToys() {
  let cheapToyNames = [];

  ninetiesToys.forEach(toy => {
    if (toy.price < 20) {
      cheapToyNames.push(toy.name)
    }
  });

  return cheapToyNames;
}
```

Steps in the solution:
- Declaring a variable with an empty array to eventually hold the cheap toy names.
- Use forEach to look at each toy object one at a time
  - While looking at each toy object:
  - Check if it's price is less than 20
  - If it is, push that toy's name into the empty array variable "cheapToyNames"
  - Keep iterating to next toy object
- After iterating over every toy object, return the cheapToyNames variable as the final answer

</section>

<section class="dropdown">

### Round Two - filter/map

```js
function findCheapToys() {
  let cheapToys = ninetiesToys.filter(toy => {
    return toy.price < 20
  });
  let cheapToyNames = cheapToys.map(toy => {
    return toy.name
  });

  return cheapToyNames;
}
```

Steps in the solution:
- Filter to keep only the toys that have a price that is less than 20. Saving to a variable.
  - Use filter to look at each toy object one at a time.
  - If that toy's price is less than 20, return it so it saved in our filtered array
  - Move onto the next toy object, repeat until all the iterations are done
- Map over the filtered toys array 
  - Use map to look at each toy object one at a time
  - Return just the toy name so the map's array just holds the names
  - Move onto the next toy object, repeat until all the iterations are done
- Return the final result - array of just names.
</section>

<section class="dropdown">

### Round Three - reduce

```js
function findCheapToys() {
  return ninetiesToys.reduce((acc, toy) => {
    if (toy.price < 20) {
      acc.push(toy.name);
    }
    return acc;
  }, []);
}
```

Steps in the solution:
- Use reduce to look at each toy object one at a time
- While looking at each toy object, check if it's price is less then 20
- If it is, push the toy's name into the accumulator array
- Return the accumulator at the end of each iteration, go onto the next toy object, do the same
- Once we've iterated over every toy object, return the final result - the array of just the names of the cheap toys

</section>

</section>

## Plot Twist

One by one, go back to each round's solution and refactor it so that the ninetiesToys data set is passed as an argument when you invoke the function.  This allows the same function to be used with multiple data sets.  

Ensure it still works for your ninetiesToys data.  Then, copy/paste the eightiesToys dataset below at the top of your file and invoke the refactored solution with the eightiesToys data passed as the argument.  Ensure the function gives the correct result. Consider how this changed the steps of that solution.

```js
const eightiesToys = [
  {
    name: "Rubik's Cube",
    releaseYear: 1980,
    price: 9.99
  },
  {
    name: "Transformers",
    releaseYear: 1984,
    price: 19.99
  },
  {
    name: "My Little Pony",
    releaseYear: 1983,
    price: 12.99
  },
  {
    name: "Cabbage Patch Kids",
    releaseYear: 1982,
    price: 24.99
  },
  {
    name: "Nintendo Entertainment System",
    releaseYear: 1985,
    price: 89.99
  },
  {
    name: "He-Man and the Masters of the Universe",
    releaseYear: 1982,
    price: 14.99
  }
];
```

<section class="note">

### Notice
Scope works a little differently in JavaScript compared to Ruby.  In Ruby, you would _have_ to pass the data as an argument in order to access it within the function.  In JavaScript, we were able to write functions that accessed the data successfully with _or without_ passing that data through as an argument.  

We can do this because the data is living in a **global variable** (or a "globally scoped variable"). A global variable can be accessed from anywhere within that file, including inside a function. 
</section>

<section class="dropdown">
### Solutions with Args/Params (don't peek!)

<section class="dropdown">

### Round One - forEach

```js
function findCheapToys(toys) {
  let cheapToyNames = [];

  toys.forEach(toy => {
    if (toy.price < 20) {
      cheapToyNames.push(toy.name)
    }
  });

  return cheapToyNames;
}
```

Steps in the solution:
- Declares a variable with an empty array to eventually hold the cheap toy names.
- Runs forEach **on the "toys" parameter** to look at each toy object one at a time
  - While looking at each toy object:
  - Checks if it's price is less than 20
  - If it is, pushes that toy's name into the empty array variable "cheapToyNames"
  - Keeps iterating to next toy object
- After iterating over every toy object, returns the cheapToyNames variable as the final answer

</section>

<section class="dropdown">

### Round Two - filter/map

```js
function findCheapToys(toys) {
  let cheapToys = toys.filter(toy => {
    return toy.price < 20
  });
  let cheapToyNames = cheapToys.map(toy => {
    return toy.name
  });

  return cheapToyNames;
}
```

Steps in the solution:
- Filters to keep only the toys that have a price that is less than 20. Saving to a variable.
  - Runs filter **on the "toys" parameter** to look at each toy object one at a time.
  - If that toy's price is less than 20, returns it so it saved in our filtered array
  - Moves onto the next toy object, repeats until all the iterations are done
- Maps over the filtered toys array 
  - Runs map on the filtered array to look at each toy object one at a time
  - Returns just the toy name so the map's array just holds the names
  - Moves onto the next toy object, repeats until all the iterations are done
- Returns the final result - array of just names.
</section>

<section class="dropdown">

### Round Three - reduce

```js
function findCheapToys(toys) {
  return toys.reduce((acc, toy) => {
    if (toy.price < 20) {
      acc.push(toy.name);
    }
    return acc;
  }, []);
}
```

Steps in the solution:
- Runs reduce **on the "toys" parameter** to look at each toy object one at a time
- While looking at each toy object, checks if it's price is less then 20
- If it is, pushes the toy's name into the accumulator array
- Returns the accumulator at the end of each iteration, goes onto the next toy object, does the same
- Once it iterates over every toy object, returns the final result - the array of just the names of the cheap toys

</section>

</section>


## Looking Ahead
While you are working on jsFunk, **take the time to solve the same problem multiple ways**. This will reduce the likelihood that you become too attached or too afraid of an iterator method. It can also help to understand each method better if you are comparing them to each other. Remember that jsFunk is there to help you learn - finishing the problems as fast as you can is not the goal!