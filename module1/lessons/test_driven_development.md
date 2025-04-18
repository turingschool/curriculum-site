---
layout: page
title: Test Driven Development
---

## Learning Goals

* Understand that TDD is about asking questions and making decisions
* Understand the role of TDD in streamlining the problem-solving and design process
* Be able to name and explain the differences between unit and integration tests

## Vocabulary

* Unit Tests
* Integration Tests
* Feature Tests
* Acceptance Tests


### Overview

It can be especially difficult to get started on a new project or even a new iteration of a project. The essence of testing is asking questions and coming up with difficult answers.

* Testing compels you to make hard decisions early, and up front.
* This is scary because you are making decisions in a context you don't understand.
* Testing (especially in the context of TDD) is a discipline tool -- forces you to a) be **specific** about what you are trying to do and b) stay **focused** on that objective

### Why do we write tests?

Having a robust test suite is a way for us to be good to our future selves; and provides us with several advantages:

* *Refactor with Confidence:* When we decide we want to make a change to how we've implemented our code, we can make that change making sure that we know that the code as a whole still works.
* *Add new features with confidence:* This also allows us to add new features with confidence. Sometimes it's difficult to know how code we add may impact functionality that we've already provided. A test suite tells us when something new we've done has broken something else we did before.
* *Roadmap to future collaborators:* It's very rare that someone will work on code alone - and if they do, they may be doing it over time. Your test suite serves as a roadmap of the codebase; another developer or future-you should be able to skim through the code base and get a feel for what the code does, and where to find certain things in it.

### Okay, sure, but why do we write tests first?

Sometimes it can feel a little bit difficult to come up with a test for something before we've decided exactly how it's going to work. That's fine. However, writing our tests first provides some additional advantages:

* *Integrates writing tests into our process for creating new code:* This means we don't have to go back and fill-in our test suite later. Testing becomes an integral part of writing code and note a chore to be completed at some later date.
* *Forces us to think about what it is we actually want:* Part of the reason testing is so hard is that we have to make decisions early. Programming is hard. It can be helpful to separate the process of determining *what* we want the program to do from how we're actually going to accomplish it. In some ways, this also allows us to ask the question: 'in my dream world, how would this work?' It gives us permission to really think about what we *want* rather than what we think will be easiest to implement.
* *Breaking down problems:* Similar to the point above, making decisions about our code will help us to break our problem down into smaller problems. If we think first of the inputs and outputs for one method, we can then also think about the inputs and outputs for some of our helper methods.
* *Only write the code you need:* It's surprisingly easy to get distracted when you're programming. We can start writing code that we think will help us at some point in the future without really knowing how. We can't completely ignore this possibility when we have a test, but it can help to tell us when we've actually solved a problem. This also let's us know that we don't need to write any more code.

### Types of Tests

When writing a program, you will likely have smaller methods that support each other to create greater functionality. Often these might be wrapped in some kind of runner method, or chained together for a grand result. We saw this in the discussion above regarding both Top-Down and Bottom-Up strategies. The tests for these methods are actually different kinds of tests. There are four commonly referred to types of tests which build upon each other:

* Programmer-centric:
  * **Unit Test** - tests one component in isolation.
  * **Integration Test** - tests multiple interdependencies or coordinating components.
* Customer-centric:
  * **Feature Test** - a single feature as experienced by a user.
  * **Acceptance Test** - a collection of user functionalities that delivers business value.

Especially when you move into web development projects in later modules you'll rely more heavily on Acceptance and Feature tests to verify the behavior of your application as it will eventually be experienced by a user.

In Module 1, on the other hand, we will rely much more heavily on **Unit** and **Integration** tests -- and it's very
important to have a good mix of both!

### Ensuring Dynamic Functionality

We should make sure that all of our methods can handle different cases, ensuring that our implementation code is dynamic, e.g.:

```ruby
class Round
  def initialize(deck)
    @deck = deck
  end

  def current_card
    @deck.cards.first
  end
end
```

```ruby
# round_spec.rb
require 'rspec'

describe Round do
  describe '#current_card' do
    it 'can get back current card' do
      card1 = Card.new(2, "Hearts")
      cards = [card1]
      deck = Deck.new(cards)
      round = Round.new(deck)

      expect(round.current_card).to eq(deck.cards.first)
    end
  end
end
```

<section class="call-to-action">
### What might be the pitfalls in a test like this?  How could we improve the test (and thus the behavior of our Round?)

- We only have one card in our `cards` array, so even if the logic of this method didn't work, we wouldn't know because we don't have enough data in our setup to accurately test the logic. *The Fix:* adding more card objects to our `cards` array.
- The test is testing for `deck.cards.first`, but this is the same logic in the method, which can result in a false positive. Instead, we can test this more explictly and write `expect(round.current_card.name).to eq "2 of Hearts"` (this assumes a method in the Card class called #name that would string together the value and suit).
</section>



### Testing Edge Cases

Ensure that your implementation code can handle things we might not expect, for example:

```ruby
class Calculator
  def divide(num1, num2)
    num1 / num2
  end
end
```

```ruby
# calculator_spec.rb
require 'rspec'

describe Calculator do
  describe '#divide' do
    calculator = Calculator.new
    it 'can return the quotient' do
      expect(calculator.divide(8,4)).to eq 2
    end
  end
end
```


<section class="call-to-action">
### What might be the pitfalls in a test like this?  How could we improve the test (and thus the behavior of our calculator?)

- How would this code function if we called `calculator.divide(5,2)`? Our tests can help ensure we've thought about these different situations.
</section>

## Implementation

### Example

Given the following interaction pattern, I'll write a test file for this (not yet existent) class, `Car`.

```ruby
#open pry session in project directory

require './lib/car'
=> true

pry(main)> car = Car.new("Toyota", "Camry")
=> #<Car:0x007fa2e9acd738>
pry(main)> car.make
=> "Toyota"
pry(main)> car.model
=> "Camry"

pry(main)> car.drive
=> "The Camry is driving"
```

```ruby
# spec/car_spec.rb
require "./lib/car"

RSpec.describe Car do 
  describe "instantiation" do 
    it "has make and model" do 
      car = Car.new("Toyota", "Camry")
      expect(car).to be_a Car
      expect(car.make).to eq "Toyota"
      expect(car.model).to eq "Camry"
    end
  end

  describe "#drive" do 
    it "returns string confirming driving" do 
      car = Car.new("Toyota", "Camry")
      expect(car.drive).to eq "The Camry is driving."
    end
  end
end
```
From this example, we can see how the interaction pattern guides or test. We can see the name of the method and what it's return value should be which we can then translate into an RSpec test.

### Practice

Given the following interaction pattern, write a test file for this (not yet existent) class, Student.

```ruby
require './lib/student'
=> true

pry(main)> student = Student.new("Jesse", 1)
=> #<Student:0x007fa2e9acd738>

pry(main)> student.name
=> "Jesse"

pry(main)> student.mod
=> "1"

pry(main)> student.skills
=> []

pry(main)> student.say_mod
=> "I'm in Mod 1"
```

## Command vs. Query Methods

Methods either do one of two things for us:
- Give us information about an object (a Query Method, or a Getter Method)
- Change something about an object, (a Command Method, or a Setter Method)

When testing, it's really important to keep in mind what a method should be doing, to ensure we test it well. Stepping out of TDD just for a minute so we can illustrate this, let's look at this example:

```ruby
class Student
  attr_reader :name, :mod

  def initialize(name_parameter, mod_parameter)
    @name = name_parameter
    @mod = mod_parameter
  end

  def promote
    @mod += 1
  end
end
```

<section class="call-to-action">
### Write in Your Notebook

- What are all the methods we have on an instance of this class?
- Which methods give us information about a student object? (Query Methods)
- Which methods change something about a student object? (Command Methods)
- How would you go about testing that the `promote` method does what it is supposed to?
</section>

To make sure we're all the same page, let's write this test together.

```ruby
#spec/student_spec.rb
require "./lib/student"

RSpec.describe Student do 
  describe "instantiation" do 
    it "has a name and mod" do 
      student = Student.new("Janice Lite", 1)
      expect(student).to be_a Student
      expect(student.name).to eq "Janice Lite"
      expect(student.mod).to eq 1
    end
  end

  describe "#promote" do 
    it "can change mods" do 
      student = Student.new("Janice Lite", 1)
      
      expect(student.mod).to eq 1

      student.promote

      expect(student.mod).to eq 2
    end
  end
end

```

Notice the different in how we test Query vs Command Methods. 

*Query Methods*
- Tests the return value of a method.
- Tests the value of an attribute.

*Command Methods*
- Test the initial value of the attribute.
- Invoke the command method.
- Test that the attribute was changed as expected.

### Practice

Given the following interaction pattern, build on your test file for this class.

```ruby
require './lib/student'
=> true

pry(main)> student = Student.new("Sophocles", 1)
=> #<Student:0x007fa2e9acd738>

pry(main)> student.name
=> "Sophocles"

pry(main)> student.mod
=> "1"

pry(main)> student.skills
=> []

pry(main)> student.say_mod
=> "I'm in Mod 1"

pry(main)> student.learn("testing")

pry(main)> student.skills
=> ["testing"]

pry(main)> student.learn("mocks")

pry(main)> student.skills
=> ["testing", "mocks"]

pry(main)> student.promote

pry(main)> student.say_mod
=> "I'm in Mod 2"

```

Next, add to your code above by creating a Locker class that follows the following interaction pattern.

```ruby
require './lib/student'
require './lib/locker'

pry(main)> student1 = Student.new("Jerry", 1)
=> #<Student:0x007fa2e9acd711>

pry(main)> locker1 = Locker.new(233, student1)
=> #<Locker:0x007fa3e55a82372>

pry(main)> locker1.number
=> 233

pry(main)> locker1.student
=> #<Student:0x007fa2e9acd711>

pry(main)> locker1.student_name
=> "Jerry"
```



Be ready to share your code with the rest of class!

### More Practice

You will not always have interaction patterns to guide your testing. In these cases, you'll need to decide for yourself what you'll name the methods and how you'll decide to implement its functionality.

You are planning to create an `Instructor` class. The instructor has a name, a mod they teach, and a class of students. The primary responsibility of an instructor is to take a class of students and teach those students a skill.

Write a series of tests and THEN create an Instructor class.

*Extra Challenge:*

- An instructor's class could have students from different mods (why? I don't know, tbh...). An instructor should only be able to teach the students in _their_ mod a skill.

- For an instructor, calculate the percentage of students in their class who know a given skill.

* TESTS FIRST*

Share out with the class!


## Extra Exercise: TDD Calculator

- Build a calculator class from scratch using TDD
- Start with whiteboarding and pseudocode
- Write pseudocode in the test file first for a few methods
- Your calculator should be able to handle the following methods:
  - .new
  - #total
  - #add
  - #clear
  - #subtract

### Wrap Up

* Why is a thorough test suite important to have?
* How does letting tests drive your development lead you to stronger code?
* What tradeoffs do you face when working with unit vs integration tests?
