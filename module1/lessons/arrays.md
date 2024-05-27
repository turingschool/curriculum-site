---
layout: page
title: Arrays
---

## Learning Goals

- Understand how to declare variables that store Arrays
- Understand how to access elements within an Array
- Use basic Array methods to manipulate data in Arrays

## Vocabulary

- <span class="vocab">**Array:** a Data Type that allows us to store multiple pieces of data in _one_ variable</span>
- <span class="vocab">**bracket notation:** the syntax for accessing elements in an Array</span>
- <span class="vocab">**element:** a piece of data in an Array</span>
- <span class="vocab">**index position:** the location of an element in an Array</span>
- <span class="vocab">**method:** a piece of functionality that is built into the Ruby language</span>
- <span class="vocab">**square brackets `[]`:** the syntax for accessing elements in an Array</span>

## Arrays

Let's consider a list of students in a class, using the programming tools we've learned thus far:

```ruby
student1 = "Josiah"
student2 = "Cindy"
student3 = "Violet"
student4 = "Jhun"
# on and on.
```

As the list of students inevitably changes and grows, this is difficult to maintain programmatically. If we wanted to send an email to every student or perform any other task for every student, we would have to write code for each, individual student, which defeats the purpose of having a computer program automate tasks.

An <span class="vocab">Array</span> is a Data Type that allows us to store multiple pieces of data in _one_ variable. They can be compared to lists. The Array is an incredibly powerful and necessary Data Type for building web applications.

Thinking back to the Populi platform that helped you enroll at Turing, many Arrays are used to power its functionality:

- **student roster** - list of *all names* in a given cohort
- **course catalog** - list of *all courses* we offer

Notice that in the previous examples, the items in a given list are all of the _same type_.

### Array Syntax

- An Array is declared with the <span class="vocab">square brackets</span> (they can be typed with the keys to the right of the `p` character on your keyboard).
- Each piece of data in an Array is referred to as an <span class="vocab">element</span>.
- Elements should be separated with a comma and space.
- An Array can hold any number of elements.

```ruby
students = ["Cindy", "Josiah", "Rigo"]
```

>To describe what the previous line of code does, one might say, "The `students` variable stores an Array of Strings representing student names. This array has 3 elements."

<section class="dropdown">
### Looking at Arrays in JavaScript

Here's an example of that same `students` array in JavaScript:
```js
var students = ["Cindy", "Josiah", "Rigo"]
```

Note the similarities between JavaScript and Ruby. Both languages have Arrays and are declared very similarly. The main difference is that JavaScript uses `var` to declare a variable.
</section>


<section class="call-to-action">
### Talking and Writing about Code

In your notebook, write down the code that follows, then write a sentence that describes what that line of code does:

```ruby
  ticket_prices = [87, 67, 99, 90, 87]
```
</section>

### Best Practices for Arrays
Here are some best practices for Arrays in software development:

1. The name of a variable that stores an Array should usually be plural to indicate that it has the potential to hold <em>many</em> elements of that type.
2. While Ruby technically allows an Array to hold multiple Data Types, it is not best practice and in any real-world application, will usually be unhelpful anyways.

### Accessing Elements within an Array

To access one element from an array we use bracket notation and a number that corresponds with that element. That number is referred to as an <span class="vocab">index position</span>. As weird as it may seem, [counting starts with 0 in most programming languages](https://skillcrush.com/blog/why-programmers-start-counting-at-zero/){:target="_blank"}. 

Through reading the code snippets below, one can infer that the first element is in index position 0, and counting increments by 1.

```ruby
# in irb
students = ["Cindy", "Josiah", "Rigo"]

students[0]
# --> "Cindy"

students[2]
# --> "Rigo"
```

```ruby
# in VS Code, when running the file in the command line
students = ["Cindy", "Josiah", "Rigo"]

puts students[0]
# --> "Cindy"

puts students[2]
# --> "Rigo"
```

<section class="dropdown">
### Indexing in JavaScript

In JavaScript, the syntax for accessing elements is the same because it follows the same rules of indexing as Ruby, starting at 0.  You would access the same students in JavaScript like this:

```js
var students = ["Cindy", "Josiah", "Rigo"]

console.log(students[0])
// --> "Cindy"

console.log(students[2])
// --> "Rigo"
```
</section>


### Storing Arrays, Accessing Elements

<section class="call-to-action">
### Part 1: 

Given the following array, answer each question. Notice the way technical vocabulary is used to describe these things, and use this as a guide to practice articulating your responses, and how you talk about Arrays in the future.

```ruby
ticket_prices = [87, 67, 99, 90, 87]
```
* How many elements are in this Array?
* What is the index position of the Integer <code>99</code>?
* What is the value of the element in index position 3?
* What is the value of the element in index position 0?
* What is the index position of the last element in this Array?

### Part 2

After you have completed the first part, complete the following work in an `irb` session:

* Declare a variable named `friends` that stores an Array of 5 Strings, each a friend's name.
* Access the third element.
* Access the last element.
* Access the first element.
</section>

## Additional Practice

<section class="call-to-action">
Create a new project (aka directory). Make 1 file - `arrays.rb`. In that file:

* Declare a variable that stores an Array of at least 4 Strings.
* Declare a variable that stores an Array of at least 4 Integers.
* Declare a variable that stores an Array of at least 4 Floats.
* Declare a variable that stores an Array of at least 4 Booleans.
* [_Intentionally open-ended_] Demonstrate your understanding of index positions in this file. You can write an explanation, provide some examples with the Arrays you've created, or anything else.
</section>

<section class="note">
### Note: How to run a File in the Terminal

In order to run a file in the terminal, follow these steps:
* Open the terminal using your shortcut command.
* Make sure you are in the directory where you made your file, or `cd` into it.
* Run the command `ruby file_name.rb`.
* For example, to run the code in our `arrays.rb` file, we would run `ruby arrays.rb` in the terminal.
</section>

<section class="checks-for-understanding">
### Check For Understanding

In your notebook, answer the following questions:

* How confident do you feel with the content on Arrays so far?
* Is there any additional learning you need or want to do before moving to the next lesson?
* What questions do you have about Arrays?
</section>

## Extension
It is highly recommended that you complete the work below later this evening.  Although there are no deliverables, please reach out if you do have any questions about Array methods.

### Array Methods

Developers often need to modify data in an Array. Today, we'll explore several Array <span class="vocab">methods</span> in Ruby. These methods are built-in functionalities designed for Arrays, each performing a specific task. While you will memorize some commonly used methods, others can be referenced in documentation as needed.

### Array Methods Syntax

To use an Array method in Ruby, we first must tell Ruby which Array we want to perform the method on. After that, a dot or period (called *dot syntax*), followed by the name of the method.

```ruby
students = ["Cindy", "Josiah", "Rigo"]
students.pop

p students
```

>To describe what the previous line of code does, one might say, "This line of code calls the `pop` method on the `students` Array."

<section class="dropdown">
### Note The Similarities in JavaScript

In JavaScript, there are many similar methods for working with Arrays. JavaScript also has a `pop` method that performs a similar task. Here's how the above code would look in JavaScript:

```js
var students = ["Cindy", "Josiah", "Rigo"]

students.pop()

console.log(students)
```
</section>

### Learning From Reading Code You Don't Know

As a developer, an important skillset is researching and reading documentation (and to note, in many cases, documentation is not always current, rarely perfect, and usually quite dense).

Since researching and reading documentation can sometimes be time-consuming, another skill is to be able to make the decision about when it's time to go to Google. In this activity, you will be provided with some structure to teach yourself a few technical concepts. The main goal is **not** to learn the technical concepts, it's to practice and explore _strategies to learn_ in an environment such as this, and how to make the decision about what to do when you need to learn something.

<section class="call-to-action">
### Array Methods & Learning Strategies:

You've seen the syntax for the `pop` method but its utility was not explained. Follow these steps to understand it:

1. Open `irb`.
2. Declare an Array with 3 elements.
3. Use the `pop` method on the Array.
4. Observe the change.
5. Repeat step 3 and observe again.
6. Infer what `pop` does and confirm with [ruby-docs](https://ruby-doc.org/core-3.1.2/Array.html#method-i-pop){:target="_blank"}.

Next, learn about the `push`, `shift`, and `unshift` methods. Decide whether to follow the same steps as above or go directly to ruby documentation. Be sure to write down your findings!
</section>

<section class="checks-for-understanding">
### Talking and Writing about Code 

In your notebook, write down the code that follows.  Then write a sentence that describes what each line of code does:

* `ticket_prices = [87, 67, 99, 90, 87]`
* `ticket_prices.length`
</section>
