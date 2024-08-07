---
layout: page
title: Intermediate Enumerables
---

## Learning Goals

* Understand Block Return Values
* Be able to use `max`, `max_by,` their opposites, and `sort_by` appropriately.


## Vocabulary
* Enumerable
* Iterate/Iteration
* Return Value
* Block

## Warm Up

Given the array `kardashians = ["Khloe", "Kim", "Kris", "Kourtney"]`, use `find`, `find_all`, or `map` to:

1. Find all the Kardashians with 3 or more letters
1. Find `"Kris"`
1. Create a new array with all the names upcased

## Exploration: Block Return Values

How do the enumerables we know so far work under the hood? Let's take a look with the following code examples.

Before you run each code snippet, try to predict the output.

#### map

Run each of the following examples and think about how map works.

```ruby
numbers = [1, 2, 3, 4]
doubled = numbers.map do |number|
  number * 2
end
p doubled
```

```ruby
numbers = [1, 2, 3, 4]
doubled = numbers.map do |number|
  number * 2
  0
end
p doubled
```

```ruby
numbers = [1, 2, 3, 4]
doubled = numbers.map do |number|
  0
  number * 2
end
p doubled
```

#### find_all

Run each of the following examples and think about how find_all works.

```ruby
numbers = [1, 2, 3, 4]
evens = numbers.find_all do |number|
  number.even?
end
p evens
```

```ruby
numbers = [1, 2, 3, 4]
evens = numbers.find_all do |number|
  number.even?
  true
end
p evens
```

```ruby
numbers = [1, 2, 3, 4]
evens = numbers.find_all do |number|
  true
  number.even?
end
p evens
```

```ruby
numbers = [1, 2, 3, 4]
evens = numbers.find_all do |number|
  false
end
p evens
```

```ruby
numbers = [1, 2, 3, 4]
evens = numbers.find_all do |number|
  1 + 1
  number.even?
  "This is a string"
  ["This", "is", "an", "array"]
  true
end
p evens
```

#### Check for Understanding

Discuss the following questions with a partner and answer in your notebooks:

1. How does `map` know what value to map to?
1. How does `find_all` know which elements will be returned?
1. How do you think `find` knows which element to return?
1. Read the descriptions for `map`, `find`, and `find_all` in the [Ruby Docs Enumerables Page](https://ruby-doc.org/core-3.0.0/Enumerable.html). How are these descriptions similar/different to your answers to the first 3 questions?

## min / max

What would we do if we wanted to get the largest thing out of an array?

Let's think about how we would do that with .each.

```ruby
nums = [1,3,9,2,5]
greatest = nums.first
nums.each do |num|
  if num > greatest
    greatest = num
  end
end

puts greatest
```

That's cool. But there's a much easier way - we can make Ruby do the work for us.

```ruby
nums = [1,3,9,2,5]
puts nums.max
```

And what if we wanted to take the smallest? You'd just use `.min` instead.

**Consider This:** All the other enumerables have a do block; these don't, but are still considered enumerables - why?

## Comparing Strings

You can use these methods for strings as well as numbers. Letters have a sort of intrinsic values on their own.

What do I mean? open up a pry session in your terminal and type in,
`"a" > "b"`

We can see that the string, `"a"` is in fact, less than the string `"b"`.

Knowing this we can do some cool things like grabbing the "lowest" alphabetical string within an array.

```ruby
  ["Brian", "Mike", "Amy"].min
```

This code, here, it'll return us `"Amy"`. Be careful - this is NOT straight up comparing the length of the strings - it's comparing the value of each string! Try running this: `["hello", "hi", "hey"].min`

```Ruby
"zzz" > "aaaa"
true
```

If we swap out the `min` for a `max`, what will we get?


## min_by / max_by

Let's go back to our code to find the largest value using `each`. This time we'll use an array of Strings as the example:

```ruby
names = ["Khloe", "Kim", "Kris", "Kourtney"]
greatest = names.first
names.each do |name|
  if name > greatest
    greatest = name
  end
end

puts greatest
```

In this example, we use the greater than operator `>` to compare our Strings. We just saw that by default Ruby compares Strings by the letter value. What if we want it to do something different, for example, compare by the length of the String? We'd have to do this:

```ruby
names = ["Khloe", "Kim", "Kris", "Kourtney"]
greatest = names.first
names.each do |name|
  if name.length > greatest.length
    greatest = name
  end
end

puts greatest
```

The idea here is that we are overriding how we are comparing the elements in the array. We can do this even easier with `max_by`:

```ruby
names = ["Khloe", "Kim", "Kris", "Kourtney"]
greatest = names.max_by do |name|
  name.length
end
```

`max_by` takes whatever the last line of code executed in the block is and uses that to find the max element. In this case, it uses the length of each String to determine what the max should be.

This is quite handy when we make our own objects and we want to find the max/min based on some criteria. Imagine we have a class `Person` that stores a name and age:

```ruby
  class Person

    attr_reader :name,
                :age

    def initialize(name, age)
      @name = name
      @age  = age
    end

  end
```

 And let's store some instances of `Person` in an Array:

```ruby
people = []
people << Person.new("Sofia", 4)
people << Person.new("Scarlett", 9)
people << Person.new("Stella", 8)
```

What if we wanted to get the max Person by age (also known as the "oldest")? If you call `people.max`, Ruby will tell you it doesn't know how to compare two `Person` objects.

So let's walk this process out and look at how we would do this with .each. It's a lot like how we would implement .max or .min.

```ruby
  def max_by(people)
    oldest = people.first

    people.each do |person|
      if person.age > oldest.age
        oldest = person
      end
    end

    oldest
  end
```

This is very similar to our original implementation. The main difference is that instead of comparing the objects and determining which is "greater or lesser", we are comparing _their attributes_ to each other.

And so, the max_by enumerable works similarly.

```ruby
  greatest = people.max_by do |person|   # use the max_by enumerable to iterate
    person.age                # max_by will return the greatest person.age
  end
```

We are iterating over the array, looking at each item in the array, looking at the attribute and then returning the entire object that has the largest value that we want.

Another way to see it, to use this enumerable, we list our criteria for searching in the block, and the enumerable will simply give us the matching object.

We can also grab the first alphabetically here.

```ruby
  people.min_by do |person|
    person.name
  end
```

It doesn't have to be an array of objects, it can be an array of arrays. We're talking about a collection of things that might hold more than one piece of data.

So let's simplify the problem.

```ruby
  people = [
    ["Sofie", 4],
    ["Scarlett", 9],
    ["Stella", 8]
  ]

  people.max_by do |person|
    person[1]                # index 1 is the integer/age
  end
```

To find the youngest person, I would use the `min_by` method.

## sort

We've worked on grabbing the largest thing or smallest thing out of a collection, and that's great. But the next logical step is to sort them.

Essentially, it works very similarly to the enumerable methods that we've been talking about so far. The main difference is that instead of returning a single object, it returns an array of sorted objects, sorted by the criteria that you select IN ASCENDING ORDER.

Just like with `max`, ruby Arrays have a method `sort` that will sort based on the default comparison. For Integers, this is simply sorting based on value:

```ruby
[2,4,3,1].sort
=> [1,2,3,4]
```

For Strings, it will sort alphabetically:

```ruby
["Brian", "Mike", "Amy"].sort
=> ["Amy", "Brian", "Mike"]
```

## sort_by

Just like with `max` and `min`, sometimes the default comparison isn't good enough, and we want to override how ruby will compare our objects. For instance, if we want to sort Strings based on their length:

```ruby
names = ["Khloe", "Kim", "Kris", "Kourtney"]
sorted = names.sort_by do |name|
  name.length
end
```

## all?

And now, for something completely different.

We're going to look at one of the enumerables that returns a simple true or false. This is  indicated by the method ending with a `?`.

Let's look at the name of this enumerable, `all?`. Under the hood, it's an enumerable with a conditional in the block. If **every** item in a collection returns `true` when going through the block, the entire method returns `true`. Otherwise, it will return `false`.

Example:

```ruby
[1,1,1,1].all? do |num|
  num == 1
end
```

This returns `true`.

```ruby
["dog","cat","pig","hippopotamus"].all? do |word|
  word.length == 3
end
```

This would return false.

Given what you just learned about `all?` - can make an educated guess about what `any?`, `none?`, and `one?` do/return?

## Practice

[Mod 1 Exercises](https://github.com/turingschool-examples/se-mod1-exercises/tree/main/lessons/enumerables_2/exercises)
- Open your Mod 1 Exercises Repo and navigate to `lessons/enumerables_2/exercises`. 
- Follow the instructions in the Readme.


## Wrap Up

* Name all the enumerables you know. What do they each return?

### More Practice
In the Mod 1 Exercises repo, navigate to `ruby_exercises/enumerables/exercise_1`, complete the following:

* find_using_max_by_test.rb
* sort_by_test.rb
* all_pattern_test.rb
* all_test.rb
* any_pattern_test.rb
* any_test.rb
* none_pattern_test.rb
* none_test.rb
* one_pattern_test.rb
* one_test.rb
