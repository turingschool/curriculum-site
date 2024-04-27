---
layout: page
title: Stacks, Methods, and Flow Control
tags: stacks, queue, flow-control, filo
length: 60
---

## Learning Goals

* Understand the idea of a Stack as a general-purpose FILO data structure
* Review the standard method and control-flow patterns we've encountered in programs
* Understand the "inside-out" model of evaluating program arguments
* Understand how Ruby uses a stack to model flow-of-control between methods
* Understand how Ruby's stack and bindings collaborate to control local scope

## Slides

Available [here](../slides/stacks_methods_flow_control)

## Vocabulary

* Stack
* LIFO
* Queue
* Top
* Pushing / Popping
* Frame
* Winding / Unwinding

### Pre-work

* Watch [this video](https://www.youtube.com/watch?v=beqqGIdabrE)

## Section 1 - The "Stack" Data Structure

* Stack -- a fundamental Data Structure in computer science
* Stacks are a type of **Queue**
* Follows "first-in-last-out" semantics
* Important point about a stack: Things on top of the stack cover
or hide things on the bottom -- you can't see or access lower elements
while there is a top element
* Great for modeling processes that "nest", such
that the inner (or top-most, depending how you look at it) portions
have to complete before the outer/bottom portions

Terminology

* __Top__ - Most recently added element (sometimes people will say "bottom" if they are envisioning the stack growing from top down)
* __Pushing__ - adding a new element to the top of the stack
* __Popping__ - removing the top element from the stack

__Exercise (Optional) (Hard)__

Here's a common programming challenge that lends itself to
an elegant solution with a stack: [Well-Formed Strings](https://github.com/turingschool/challenges/blob/master/well_formed_strings.markdown)

## Section 2 - The "Stack" as Program Execution Model

* Another ubiquitous application of stacks: managing flow of execution and context within a computer program
* A Stack vs. __The Stack__ -- The program stack is so omnipresent we often refer to is as The Stack
* What are Stacks good at? Problems that require nesting or ordered execution
* Programs "nest" from one method call or line of code into another
* Interpreter uses a Stack to model and manage this process

Let's kick off with a basic example. Open pry and execute the following code snippet:

```ruby
def module_one
  puts "projects are:"
  puts projects
end

def projects
  "enigma, complete me, headcount"
end

module_one
```

__Discussion:__ What happens when we evaluate this code?

Series of steps:

1. Define each method (ruby evaluates the definitions)
2. Ruby invokes `module_one`
3. `module_one` calls `puts`, passing to it a new string (`"projects are:"`)
4. `puts` evaluates, printing some text and then **RETURNING** a value back to the place from which it was called (**Q:** What is the return value of puts)
5. `module_one` wants to call `puts` again, **but** this time it needs to call `projects` first in order to get the value to provide to `puts`, so it first calls `projects`
6. `module_one` now calls `puts` again, passing it the value it got from `projects`
7. `puts` evaluates, printing some text and again returning a value back to the place from which it was called

This small example illustrates 2 fundamental rules of program
execution:

1. An outer method is able to "call into" another method, and it will
wait until the inner method completes before continuing its
execution
2. The inner method is able to generate a value and __return__ it back
to the outer method, which can then access and use it.

## Exercise: Thinking About Return Values

In your notebook, write down the answers to these 2 questions:

1. What does it mean for a method to *return* a value to another method
2. What are some of the things that can happen to a returned value (try to come up with at least 2)

## Illustrating the Stack

__Additional Terminology__

* __Frame__ - When discussing the Stack in the context of program
execution, we refer to each "element" on the stack as a Frame.
* __Winding / Unwinding__ - Synonyms for Pushing / Popping

With these ideas in mind, let's dig into the previous example and illustrate
what's happening.

__Materials__

(Instructor should provide arts & crafts materials)

* Index cards
* Markers or Colored Pencils

### Visualizing Stack Exercise 1 - Module One

Let's walk through tracking the stack in the previous example. For now, we're going to focus only on:

* Which methods are called
* In what order

As we walk through the code, each time a method is invoked, put an index card for it onto the stack.

When the method is finished, remove its card from the stack.

**Question:** From a Stack perspective, how do you know when a program is "done"?

## Section 3 - The Stack and Execution Context

### Ruby Metaphysics: What Things Are There?

When we think about evaluating Ruby code, especially from a perspective of reading a chunk of code and trying to mentally evaluate it in our head, we can generally boil it down to the idea of performing operations of values.

"Operations" generally come in the form of methods (defining some chunk of behavior we want to perform).

So what are "values"? As we have seen, all values in Ruby are Objects of some sort. But where do they live? It turns out at any given time there are really a handful of places where values can be found. We will focus on 2:

1. Local Variables (`x = 7`, etc)
2. The **Current Object** (i.e. `self`)

From a structural perspective, evaluating a Ruby program requires us to do 2 things:

1. Track the sequential execution of methods in the order listed in the program (as we did in the previous stack example)
2. Track which objects are currently available to our program: What **local variables** are defined and what is **self**.

### Stack Visualization With Local Context

It turns out the stack is also used to manage these pieces of information. In the previous examples we showed the stack managing flow / progress through the program. Now let's walk through an example that adds in these 2 important concepts of Local State and Current Object.

__Local Variable Definitions__

* Local variables can be defined anywhere in a ruby program
* Variables are defined within a given "scope"
* Common scopes we encounter: methods and blocks (each creates its own independent scope)
* Passing a method argument creates a new local variable with the name of the argument

__Self__

* `self` is ruby's way to identify the current object
* In reality there are 2 things we need to know about `self`
* 1. What is its __Class__ (since this gives it methods)
* 2. What are its __Instance Variables__ (since this gives it state)

When thinking about how the stack tracks `self`, we'll show this by tracking
self as a reference to a Class and a collection of instance variables

### Exercise: Visualizing the Stack with State Mixed In

Let's use our index cards to look at another example.

This time, we'll use the cards to track 3 things:

1. What is the order of execution (shown by stacking cards)
2. What are the current local variables (list these on each card)
3. What is the current object (`self`) (list this on each card. include the object's Class and any ivars it contains)

__Setup__

On your desk, create space for 3 independent stacks of index cards. It would be ideal to label each space using a post-it note or something similar. It might come out looking somthing like this:

```
                       Current
 Locals      self      Method
--------   --------   --------
|      |   |      |   |      |
|      |   |      |   |      |
--------   --------   --------
```

As we step through the next simple program, we're going to place a card on *each* Stack, representing the current state of that column.

```ruby
class Dog
  attr_reader :name

  def initialize(name)
    @name = name
  end

  def chase(cat)
    dog_reaction = "woof"
    cat.be_chased(self)
    puts dog_reaction
  end
end

class Cat
  def initialize(breed)
    @breed = breed
  end

  def be_chased(dog)
    puts "oh no being chased by this dog:"
    puts dog.name
  end
end

sassy = Cat.new("Siamese")
chance = Dog.new("Chance")
chance.chase(sassy)
```

### Practice

Clone this repo: https://github.com/turingschool-examples/lion_king.

Run the code with `ruby runner.rb`.

Model the call stack for this code using index cards.

Each index card represents a method call.

Use sticky notes to show a return value moving from the method on top of the stack back to the calling method.

Write the arguments passed in to the method on the top of the card.

### Group Time Wrapup -- Why Bother

* Most essential challenge in starting programming: Getting over the "Mental Model" hump
* As beginners we tend to view a program in the way that we initially interact with it -- **As Text**
* However the actual operation is much richer -- applying a series of complex but elegant rules to properly evaluate our instructions
* Experiences programmers learn to see behind the text and work with the underlying **Mental Model**
* This is largely what accounts for the perceived gulf between a novice and even an intermediate developer
* Once we get over the hump of modeling how the program works in our mind, the manipulations we can perform become vastly more sophisticated

## Paired Exercises - Stack Visualization:

Now that we've seen how this all works, let's get some more practice in. For this section, you'll pair up with another student and walk through the remaining examples together, visualizing the 3 pieces of stack information as we looked at in the previous example.

However, this time, we have a tool to make things a bit easier. The inimitable Josh Cheek has made a sweet tool that can perform similar visualizations in the terminal. Run the following steps in your terminal:

```
gem install hub
hub clone turingschool-examples/spelunk
cd spelunk
gem install rouge --no-rdoc --no-ri
./bin/spelunk examples/cook_pizza.rb
```

This will launch you into a simple interactive ruby program that will
allow you to step through the stack as the program executes.

Use the following keybindings:

* `Return` - step to the next method / line
* `Up Arrow` - go back up the stack one step
* `Down Arrow` - go back down the stack one step

You'll use this program in the following exercises to evaluate your interpretation of the program's execution **AFTER** you have walked through it once using Index Cards.

### Exercise 1 - Making Pizza

Do each exercise twice: Once with index cards and once using the `spelunk` program you cloned earlier.

Each time, pay attention to:

1. Order of execution (what things go onto the stack and in what order)
2. Local variable assignments (what are the values of local variables in each case)
3. `Class` and `ivars` of current `self` value

```ruby
class Pizza
  attr_reader :toppings, :cooked

  def initialize(toppings)
    @toppings = toppings
    @cooked = false
  end

  def cook!
    @cooked = true
  end

  def description
    if @cooked
      "Pizza with #{toppings} that has been cooked."
    else
      "Pizza with #{toppings} that has NOT been cooked."
    end
  end
end

class PizzaOven
  def cook_pizza(pizza)
    pizza.cook!
    pizza.description
  end
end

za = Pizza.new("anchovies")
oven = PizzaOven.new
puts oven.cook_pizza(za)
```

### Exercise 2a - Cooking Spaghetti

**For this section, choose one of 2a or 2b**

From the example file [here](https://github.com/JoshCheek/object-model-with-lovisa/blob/master/examples/cook_spaghetti.rb)

Once you've gone through with index cards, try it with:
`bin/spelunk examples/cook_spaghetti.rb`

```ruby
def cook_dinner(ingredients, guests)
  prepared_ingredients = get_ingredients(ingredients)
  dish = mix(prepared_ingredients)
  serve(dish, guests)
end

def get_ingredients(ingredients)
  ingredients.each do |ingredient|
    prepare(ingredient)
  end
end

def prepare(ingredient)
  "Preparing #{ingredient}!"
end

def mix(prepared_ingredients)
  prepared_ingredients.map do |prepared_ingredient|
    add_to_dish(prepared_ingredient)
  end
end

def add_to_dish(prepared_ingredient)
  "Adding #{prepared_ingredient} to the dish!"
end

def serve(dish, guests)
  pretty_preparations = dish.join(", ")
  pretty_guests = guests.join(", ")
  "To serve #{pretty_guests} " <<
    "I had to #{pretty_preparations}."
end

ingredients = ["spaghetti", "onion",
               "olive oil", "tomatoes",
               "garlic", "basil"]
guests      = ["Deborah", "Scott",
               "Kimmie", "Marina", "Brennan"]
puts cook_dinner(ingredients, guests)
```

### Exercise 2b - Recursive Doubling

From the example file [here](https://github.com/JoshCheek/object-model-with-lovisa/blob/master/examples/double.rb)

Once you've gone through with index cards, try it with: `bin/spelunk examples/double.rb`

```pry
def double(n)
  if n == 0
    0
  elsif n < 0
    -2 + double(n+1)
  else
    2 + double(n-1)
  end
end

puts double 6
```

### Advanced usage: Ruby's `Binding` Class (Optional)

The role of managing local scope and variable lookup is partly
managed by ruby's `Binding` class. What is a binding?

* `Binding` is a class
* `Binding` is ruby's abstraction around local scopes within programs
* `Binding` unifys 2 key ideas: `local_variables` and a `self` reference
* We can retrieve the current one using the special `binding` method

Try the following examples in pry. We're going to illustrate 3 points:

* `binding` stores local variables
* `binding` can evaluate values within its context using `eval`
* `binding` stores a reference to the current `self` context

```ruby
[1] pry(main)> binding
=> #<Binding:0x007f86dd9c61c8>
[2] pry(main)> binding.class
=> Binding
```

```ruby
pry(main)> binding.local_variables
=> [:__, :_, :_dir_, :_file_, :_ex_, :_pry_, :_out_, :_in_]
pry(main)> x = 10
=> 10
pry(main)> a = "pizza"
=> "pizza"
pry(main)> binding.local_variables
=> [:a, :x, :__, :_, :_dir_, :_file_, :_ex_, :_pry_, :_out_, :_in_]
pry(main)> binding.eval("a")
=> "pizza"
pry(main)> binding.eval("x")
=> 10
```

```ruby
pry(main)> binding.eval("self")
=> main
pry(main)> @a = "calzone"
pry(main)> binding.instance_variables
=> []
pry(main)> binding.eval("self").instance_variables
=> [:@pizza, :@a]
```
