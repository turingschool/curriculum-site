---
title: Intro to Class Methods (in Rails)
length: 45
layout: page
---

## Learning Goals

- Review Class Methods in Ruby
- Explore examples of Class Methods using Active Record

### Warm Up

1. Using your own words, write down a definition of 'class methods' in Ruby. How do they work?
2. The code example below defines a Ruby class with one instance method and one class method. Come up with one more instance method and one more class method on your own, and describe how each of the methods would be used.

```ruby
class Inventory

  def initialize(name)
    @name = name
    @equipment = []
  end

  def store(equipment)
    @equipment << equipment
    "This inventory now contains #{equipment}." 
  end

  def self.store
    "A person's inventory can store up to 10 pieces of equipment."
  end
end
```

## Set Up

This lesson uses the [Intro to Ruby on Rails repo](https://github.com/turingschool-examples/intro_to_ror_demo/tree/main) from your intermission work. Clone it now if you haven't already, and check out a new `class_methods` branch.

We'll need more data to work with for this lesson. Open the `db/seeds.rb` file and add the following lines:

```ruby
Subject.create!(title: 'Trigonometry', description: 'Angles and calculating them', difficulty: 4)
Subject.create!(title: 'Music History', description: 'Beyond the Beatles', difficulty: 1)
Subject.create!(title: 'Orientation', description: 'Learning about remote learning', difficulty: 1)
Subject.create!(title: 'Revisions 201', description: 'Drafting was the easy part', difficulty: 4)
```

Then run the following commands: 

```bash
bundle
rails db:{drop,create,migrate,seed}
```

## Exploration

Let's say we need to be able to return the easiest subjects from our database. "Easy" subjects have a difficulty of 3 or less, and this list should be ordered from easiest to most difficult.

This query is straightforward in Active Record. Open your rails console and try this query:

```ruby
Subject.where("difficulty <= ?", 3).order(:difficulty)
```

This should return 4 objects that meet the criteria described above. Great! How do you think this works?

### Using class methods in Rails models

We know that in Ruby, class methods are called on the class name itself (rather than on an instance). For example:

```ruby
my_inventory = Inventory.new("Marcille Donato")
my_inventory.store("Ambrosia") # instance method called on an instance of the Inventory class
Inventory.store # class method called on the Inventory class
```

You might have noticed that we called the Active Record query above on the `Subject` model-- that is, on the class name itself and not an instance. In order to look at all instances of `Subject` in the database and compare them to the criteria we provided, AR **has** to use class methods.

Add this method to the Subject class:

```ruby
def self.easy_subjects
  binding.pry
end
```

Now, go into `rails c` again and call `Subject.easy_subjects`. What does `self` return in your pry? (You may have to run `Subject.connection` first). Keep in mind that calling `self` inside of a method is very different from prepending `self.` to a method definition.

### What is going on with 'self' in instance and class methods?

The scope within Ruby methods work in such a way that `self` is __implied__. This means that anything we call within this method is called on whatever the `self` object is in that moment! 

Therefore, in this pry session, if we wanted to return all rows from the `subjects` table, we don't even need to use the class name `Subject`; it's already implied. Try running these in your pry session:

* `all`
* `first`
* `where(title: "Literature")`

To illustrate how `self` can behave differently, let's add an instance method and pry into it:

```ruby
def format_summary
  binding.pry
end
```

```ruby
# in rails console:
subject = Subject.first
subject.format_summary
```

In this pry session, `self` returns an `Subject` object, a single instance. Again, `self` is implied, and we don't need to write that in our method in order to call other methods on the object. Try running the following commands in your pry session:

* `id`
* `title`
* `created_at`

This means that we can call on a model instance's attributes directly from within an instance method.

```ruby
def format_summary
  "#{title} - #{description}"
end
```

### Putting it all together

Class methods are extremely valuable in Rails applications. One very common way to utilize them is to make SQL and AR queries reusable and DRY, encapsulating this data logic in a Model rather than writing the query every time it's needed in something like a Controller.

Back to our challenge: return the easiest subjects from our database ordered by ascending difficulty. Put the query we used earlier into a class method, so that it can be called on `Subject`.

```ruby
class Subject < ApplicationRecord

  def self.easy_subjects
    where("difficulty <= ?", 3).order(:difficulty)
  end
end
```

Then try it out in `rails c`:

```ruby
Subject.easy_subjects
```

## Checks for Understanding

Answer the following questions in your notebook or gist:

- What is the difference between using `self` as part of a method definition, and using `self` from within a method scope?
- What does the class of a model represent in our DB?
- What does an instance of a model represent in our DB?