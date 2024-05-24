---
layout: page
title: Reaching Through Objects Workshop
length: 180 min
tags: ruby, OOP, CS, design
---

## Learning Goals

- Analyze object-oriented design and be able to describe how objects relate to each other
- Develop and share strategies for transforming interaction patterns to tests, and tests to implementation code. 
- Describe the benefits of using classes and object-oriented design
- Idenify common pitfalls in object-oriented design that make implementation more difficult, like scope creep and tight coupling. 

## Vocabulary

* Nested objects
* Scope Creep
* Tight Coupling

## Warm Up

- What are some benefits to using classes? What would the code look like if we ___didn't___ separate functionality and responsibilities into classes?
- Based on what you've seen so far, do you have any ideas about what some possible pitfalls could be within object-oriented design?

# Workshop

## Warm Up Exercise

Using this `warmup` directory in our [Big Repo](https://github.com/turingschool-examples/se-mod1-exercises) (under the `reaching_through_objects` directory), we are going to work through all four classes involved in this Trick or Treating exercise: `Candy`, `Bag`, `Costume` and `TrickOrTreater`. Tests have been written for you, so your job is to make the tests pass. 

We will work on the `Candy` class together. Unskipping one test at a time, let's make the tests pass.

<section class="dropdown">

### Making Tests Pass for Candy
If your `candy_spec` tests are passing, your code probably looks something like this:

```ruby
class Candy
  attr_reader :type
  def initialize(name)
    @type = name
  end
end
```
</section>

In breakout rooms, work through all the remaining files. Remember to make *incremental progress* by doing the simplest thing to make the tests pass first. You can always return back to your implementation and refactor it to be more dynamic and handle other test cases. 

## Warm Up Debrief

In your groups, create a list of the attributes and responsibilities of each of the four classes in the exercise. 

### Object Design Analysis
* Are there any areas where you see responsibilities "leak" into other classes? (This is called scope creep!)
* If you were to refactor this design, would you change any of these responsibilities?

<section class="dropdown">

### Scope Creep 

You might have noticed some scope creep between the `TrickOrTreater` class and the `Bag` class! Depending on the context, there might not need to be a `candy_count` method in the `TrickOrTreater` class as long as you can call `trick_or_treater.bag.count`. 

If we assume there *is* a need to have this method on the `trick_or_treater` object, we can at the very least make sure we are delegating the count logic to the existing bag method in our `TrickOrTreater` method instead of duplicating this logic. 
```ruby
  def candy_count # in the TrickOrTreater class
    @bag.count
    # we should NOT create a @count attribute in TrickOrTreater, but delegate to the existing Bag method
  end
```
</section>

## Adlington Road Exercise

The next level of exercises will involve transforming interaction patterns into specs of your own, and then following TDD to make the tests pass. Take a look at the `exercise_1` directory in the same lesson directory to find the `README` for the Adlington Road Exercise. 

## Additional Exercises

Once you feel comfortable building tests and classes from an interaction pattern, try out some of the exercises in the `scenarios` directory! These are more advanced, as they don't have interaction patterns but rather a list of requirements. Try to get through as many as you can, and you can always come back to these for additional practice. 

