---
title: Hashes
layout: page
---

### Learning Goals
- Identify the differences between Hashes and Arrays. 
- Practice building, accessing, and updating Hashes.
<section class="dropdown">

### Javascript <h3>
In JavaScript, the equivalent data structure is called an "object." While the syntax and some behaviors may differ, both are used to store and manage data in a similar way.
</section>

### Vocabulary
- Hash
- Symbol
- Key
- Value

### Warm-up
Say we have an array named `grocery_list` that looks like this:
```ruby
grocery_list = ["milk", "eggs", "eggs", "eggs", "eggs", "eggs", "eggs", "avocado", "avocado", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla"]
```
<section class="dropdown">

### Javascript <h3>
```js
var groceryList = ["milk", "eggs", "eggs", "eggs", "eggs", "eggs", "eggs", "avocado", "avocado", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla", "tortilla"]
```

</section>

Answer these questions with your group:
1. What is problematic about this data being in this array?
1. How would you prefer this data be stored?


## Part 1: Student Exploration

With our groups, we will be working through [this repository](https://github.com/turingschool-examples/se-mod1-exercises/blob/main/ruby_exercises/data-types/collections/spec/hashes_spec.rb)

If you have already completed these exercises, delete your work and let's do it again! Repetition is key to learning. 

While working through these exercises, write down any important information you come across. 
Take note of:
  - What was challenging? 
  - What patterns did you observe?
  - What rules did you discover about how hashes work?
  - What syntax did you learn for hashes ?
  - What questions came up while you were working and how did you get those answered?
  - What questions do you still have?
  - Anything else that seems important.

Resources to use while working through the exercises:
  - Your breakout room mates!
  - Google (ex: Ruby how to make a new hash with a default value, JavaScript how to make a new object with a default value)
  - [Ruby Docs](https://ruby-doc.org/core-3.0.0/Hash.html)
  - [Javascript-MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

 
 

## Part 2: Discussion

Take a minute to look through your notes about Hashes. Add your key takeaways (or AHA! moments) to page 1 of [this Jamboard](https://jamboard.google.com/d/1gTGQjw3TpdqQImTqSJtWE25Z9W00I2xIagwHLFSSpN0/viewer) 

Take a minute to look through the questions you still have about Hashes. Add them to page 2 of the same Jamboard.

###  Discussion Questions

### When does it make sense to use a Hash? (As opposed to an array?)
  
Hashes (or Objects, also called Dictionaries in some languages) are great at keeping track of quantities. 
They are great when your data can be grouped into key/value pairs.  

### How should we name our Hashes?
  
Hashes represent a _collection_ of data. It is usually appropriate to call the hash the plural form of what that data represents. 
  
Ex:
```ruby
  toppings: {
      pepperoni: 5,
      sausage: 3,
      pineapple: 500
 }

  pets: {
      cats: 6,
      dogs: 9
 }
```  
<section class="dropdown">

### Javascript <h3>
```js
var toppings = {
    pepperoni: 5,
    sausage: 3,
    pineapple: 500
};

var pets = {
    cats: 6,
    dogs: 9
};
```

</section>


### What data type can a key be?
  
Keys of a hash can be any data type. 
Often, we see them as symbols (in Ruby) or strings (in Javascript). However, they can be integers as well.
```ruby
my_hash = { symbol_key: "value", "string_key" => "value", 1 => "value" }
```
<section class="dropdown">

### Javascript <h3>
```js
var myObject = { "stringKey": "value", 1: "value" };
```
</section>

------------------

For the following questions, let's refer to this code snippet:

```ruby

  grocery_items = {
        eggs: 4,
        bread: 2,
        milk: 3,
        cookies: 4  
  }
```

<section class="dropdown">

### Javascript <h3>
```js
var groceryItems = { 
  eggs: 4,
  bread: 2,
  milk: 3,
  cookies: 4  
};
```

</section>


### How would we find out how many cookies we have?
  
```ruby
  grocery_items[:cookies]
```
<section class="dropdown">

### Javascript <h3>
```js
groceryItems["cookies"];
```

</section>
We call the name of the hash and then use bracket notation to query the key we want. The return value of the above expression will be the value of the key, so in this case: `4`.



### How would we add a new key of `apples` set to a value of 9?
  
```ruby
    grocery_items[:apples] = 9
```
<section class="dropdown">

### Javascript <h3>
```js
groceryItems["apples"] = 9;
```

</section>
We call the name of the hash, then use bracket notation to denote the key, then use the assignment operator `=` to set the value of our key to 9. 



## Practice

Work with your group to write code to complete the following:

1. Create a Hash called `office_supplies`.
1. Add the key `staples` with a value of `9000`.
1. Add the key `paper` with a value of `45050`.
1. Add the key `chairs` with a value of `5`.
1. Add the key `desks` with a value of `2`.
1. Access the value of `staples`.
1. Increase the value of `paper` by 2000. (With code, not manually changing the value in the hash.)
1. Get a list of all your keys. (What data type does the word 'list' usually indicate?)
1. Get a list of all the values of your hash.
1. Write code to list out all your keys and values in a string like this: `"Office Supplies: 9000 staples, 45050 paper, 5 chairs, 2 desks."`

## Check Your Understanding
How would you answer these questions if you were asked about this in an interview? 

1. What is a hash ?
1. What situations would you use a hash  for?
1. What are the similarities and differences between Arrays and Hashes? 
1. What are a few methods you could call on a hash and what do they do?

