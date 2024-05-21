---
title: Nested Collections
length: 60
tags: ruby, hashes, data structures
---

## Learning Goals

* Use multiple types of collections intermingled
* Apply common hash and array methods in Ruby
* Describe strategies for navigating nested data

## Vocabulary
* Key & Value: a paired combination of pieces of data that exist in a hash (think dictionary)
* Element/Item: a piece of data within an array
* Nested Array: an array that exists as an element within another (outer) array
* Nested Hash: a hash that exists as either an element in an array OR the value of a key within another hash
* Collection: a container for 0 or more pieces of data
* Data Structure: a data organization/storage format that allows for efficient retrieval and modification of pieces of data
* Object: a JavaScript data structure which pairs keys & values, similar to a Ruby hash

## WarmUp

Using [mod-1-be-exercises](https://github.com/turingschool-examples/mod-1-be-exercises/tree/main/lessons/nested_collections/Examples), find answers to the following: 

First, try to answer without using pry, then use pry to verify.

`animals = {"dogs" => 3, "cats" => 5, "iguanas" => 2}`
* Using the above animals hash, how would you do the following
   * return the amount of dogs
   * add 3 parakeets
   * increase the amount of cats by 2

`pet_names = ["Fela", "Spot", "Patch", "Willy"]`
* Using the above pet_names array, how would you do the following
   * add "Claude"
   * access which name is first in the list
   * access which name is last in the list
   * remove "Fela" from the list

### A Note on Data Structures

We're working in Ruby, so throughout this lesson we'll refer to `arrays` and `hashes`. These data structures might be called something else in other languages, though-- for example, this dictionary-like data structure is called an `Object` in JavaScript:

```javascript
const animals = {
  "dogs": 3,
  "cats": 5,
  "iguanas": 2
};
```

### Hash and Array Nesting

As our programs get more complex, we'll sometimes encounter more sophisticated combinations of these structures. Consider the following scenarios:

#### Array within an Array

```ruby
numbers = [[1, 2, 3], [4, 5, 6]]
```
**Reflection**
* what is `numbers.count`
* what is `numbers.first.count`
* how can I access the element `5`
* how can I add `[7,8,9]` to the numbers array

#### Hashes within an Array

```
food_feelings = [{:pizza => "tasty"}, {:calzone => "also tasty"}]
```
**Reflection**
* what is `food_feelings.count`
* what is `food_feelings.first.count`
* how can I access the element `"also tasty"`
* how can I change `also tasty` to `super delicious`

#### Hash within a Hash

```
pets = {:dog => {:name => "Chance", :weight => "45 pounds"},
        :cat => {:name => "Sassy", :weight => "15 pounds"}}
```
**Reflection**
* what is `pets.count`
* what is `pets.keys`
* what is `pets.values`
* how can I access the element `"15 pounds"`
* how can I add `:age => 3` to the value of the key `:dog`

#### Array within a Hash
```
pizza_toppings = {veggies: ["green peppers", "jalapeño", "mushrooms"],
                  protein: ["pepperoni", "sausage", "sardines"],
                  fruit: ["pineapple"]}
```

**Reflection**
* What is `pizza_toppings.count`
* What is `pizza_toppings.values`
* How can I access the element `"pineapple"`
* How can I add the element `"olives"` to the key `"veggies"`

## Nested Collections in the 'real world'

What about on the job? How often will you need to work with nested collections _really_? 

Take a look at [this documentation from ifixit.com](https://www.ifixit.com/api/2.0/doc/Stories#get-a-list-of-stories) (these docs are for working with an external API, which you'll learn about in a future module at Turing). We're specifically interested in the 'Response' section from the `GET /stories` dropdown.


<section class="call-to-action">
### Turn and Talk

* How could I describe the data in this section of the documentation?
* How can I return the 'id' value for an image?
</section>

Even outside of API responses, you will encounter deeply nested data. For example, this JavaScript object:

```javascript
var meals = {
  breakfast: { time: 9, dish: { name: 'scrambled eggs', ingredients: ['eggs', 'butter'] } },
  lunch: { time: 12, dish: { name: 'salad', ingredients: ['kale', 'cherry tomatoes'] } },
  dinner: { time: 6, dish: { name: 'burrito', ingredients: ['tortilla', 'tofu', 'salsa verde'] } }
}
```

We can use bracket notation like we do in Ruby, or we can use dot notation to <strong>chain</strong> multiple properties, to dig into the values we want.

```javascript
meals.breakfast.time
// 9

meals.dinner.dish.name
// 'burrito'
```

What would `meals` look like if we converted it into a nested collection in Ruby?

<section class="dropdown">
### Ruby version 

```ruby
meals = {
  breakfast: { time: 9, dish: { name: 'scrambled eggs', ingredients: ['eggs', 'butter'] } },
  lunch: { time: 12, dish: { name: 'salad', ingredients: ['kale', 'cherry tomatoes'] } },
  dinner: { time: 6, dish: { name: 'burrito', ingredients: ['tortilla', 'tofu', 'salsa verde'] } }
}
```

We could return the same values from the JavaScript example above like so:

```ruby
meals[:breakfast][:time]
# => 9

meals[:dinner][:dish][:name]
# => 'burrito'
```
</section>

There’s no limit to how nested this data can get! Gnarly!


<section class="checks-for-understanding">
### Checks for Understanding

1. Name one common hash method and one common array method
2. What can you ask yourself while working on nested collections to help you strategize navigating nested collections? 
</section>


## Challenge

Using the [mod-1-be-exercises](https://github.com/turingschool-examples/mod-1-be-exercises/tree/main/lessons/nested_collections) repo, navigate to the `challenges` directory. Follow the instructions and work through the Denver Biscuit Company API response.


## Extra Practice

### 1: State Capitals

You have 2 hashes, one which maps state names to state abbreviations,
and one which maps state abbreviations to their capital:

```ruby
states = {"Oregon" => "OR",
          "Alabama" => "AL",
          "New Jersey" => "NJ",
          "Colorado" => "CO"}

capitals = {"OR" => "Salem",
            "AL" => "Montgomery",
            "NJ" => "Trenton",
            "CO" => "Denver"}
```

* Level 1: Write some code which given a state name ("Alabama") outputs the state abbreviation
* Level 2: Write some code which given a state name ("Oregon") outputs
  its capital ("Salem")
* Level 3: Handle the case when a state's information is not known by
  returning "Unknown"
* Level 4: Let's go the other way. Given a capital name ("Denver"),
  return the state name for which it is the capital ("Colorado")
* Level 5: Write some code to turn these two hashes into one nested hash which looks like this:

    ```ruby
    state_info = {
       "Oregon" => {abbreviation: "OR", capital: "Salem"},
       "Alabama" => {abbreviation: "AL", capital: "Montgomery"},
       "New Jersey" => {abbreviation: "NJ", capital: "Trenton"},
       "Colorado" => {abbreviation: "CO", capital: "Denver"}
      }
    ```

### 2: Age Ordering

You have age data for a group of people:

```ruby
ages = [
  ['Frank', 33],
  ['Stacy', 15],
  ['Juan', 24],
  ['Dom', 32],
  ['Steve', 24],
  ['Jill', 24]
]
```

* Level 1: Write code that'll output the ages (and only the ages) for the data set
* Level 2: Write code that'll output the names (and only the names) in order by
ascending age
* Level 3: Output the name with the age, like `Juan (24)`
* Level 4: Write code to automatically build a hash with the age as the key and
an array of names as the value (all the people who are that age).
e.g. `{24 => ['Juan', 'Steve', 'Jill']...}`

## More Practice

You can also work through the `data-types/collections` exercises in [ruby-exercises](https://github.com/turingschool/ruby-exercises)
