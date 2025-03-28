---
layout: page
title: Methods and Return Values
length: 90
tags: ruby, methods, return, argument
---

## Learning Goals

* Define the terms Variable, Method, Argument, Parameter and Return Value
* Explain why we use methods
* Define methods
* Explain where Ruby looks for methods
* Understand how abstraction helps us program

## Vocabulary

* Variable
* Method
* Return
* Argument/Parameter
* Parse
* Execute
* Abstraction

## Warmup

Define the following terms in your own words:

* Variable
* Method
* Argument
* Return Value
* Object

Then, for each of the terms above, identify examples in the pry snippets below (these snippets will also work in irb):

* To install pry, type `gem install pry` in your terminal. 
* To use pry, type `pry` into your terminal to open up a _pry session_. 
* You can then use this to type Ruby code.

```ruby
pry(main)> "Hello World".upcase
=> "HELLO WORLD"
```

``` ruby
pry(main)> "Hello World".include?("Hello")
=> true
```

```ruby
pry(main)> greeting = "Hello World".downcase
=> "hello world"

pry(main)> greeting
=> "hello world"
```

<br>

## Define and Identify

## Methods

A **Method** is a group of related instructions that achieves some purpose. If you open up pry (or irb) and type:

```ruby
pry(main)> "Hello World".upcase
=> "HELLO WORLD"
```

You are calling the `upcase` method. It's job is to create a version of the String with all capital letters.

<br>

One of the most important reasons we need methods is to **reuse code**. Instead of rewriting all those lines of code for creating an upcased string, we simply **invoke** the `upcase` method.

The example illustrates another key point: **methods run on objects**. In the example above, the `upcase` method is running on `"Hello World"`, which is a **String object**. You can think of methods like they are messages to an object. The above code is saying, "Hey string, give me an upcased version of yourself."

<br>

## Return Values

A **Return Value** is the output of a **Method**.

Every **Method** has *exactly one* **Return Value**.

A **Return Value** can be any type, for example `4`, `"Hello World"`, `true`, `[1,2,3]`, `nil`.

If you open a pry session and type

```ruby
pry(main)> "Hello World".upcase
=> "HELLO WORLD"
```

You are invoking the `upcase` **Method** on the string`"Hello World"`. The **Return Value**, denoted by the `=>`, is `"HELLO WORLD"`.

<section class="dropdown">
### Let's see it in JavaScript

Feel free to copy paste these lines of code into the dev console in your browser. You can open the dev console in Chrome with `command+option+i`.
```js
var greeting = "Hello World"

greeting.toUpperCase()

// expected return value >>>  "HELLO WORLD"
```
</section>

Fun Fact: In Ruby, the terms **function** and **method** mean the same thing - because everything in Ruby is an object.  In JavaScript, *technically* **method** is specific term for a **function** that is defined *on an object*.  However the two terms are often used interchangeably.  

<section class="call-to-action">

### Key Points

To recap the Key Points from this section:
- We use methods so we can reuse code
- Methods run on objects
- A method can only return **one** value
</section>

<br>

## Arguments and Parameters

**Arguments** are the input(s) to a method. When you define a method, they are known as **Parameters**. (In other words, a parameter is a generic placeholder for a specific argument).

If you open a pry session and type

```ruby
pry(main)> "Hello World".include?("Hello")
=> true
```

You are calling the `include?` method on the string `"Hello World"`. You are passing the **Argument** `"Hello"` to the `include?` method. The **Return Value** is `true`.

**Note**: Parenthesis are optional when passing arguments. The previous code snippet could also be written as:

```ruby
pry(main)> "Hello World".include? "Hello"
=> true
```

Some methods take multiple **Arguments**. For example:

```ruby
pry(main)> "Hello World".gsub("World", "Turing")
=> "Hello Turing"
```

This is the same as:

```ruby
pry(main)> "Hello World".gsub "World", "Turing"
=> "Hello Turing"
```

<section class="dropdown">
### Let's see it in JavaScript

Note: Parenthesis are *not* optional when passing arguments to a method in JavaScript

Feel free to copy paste these lines of code into the dev console in your browser. You can open the dev console in Chrome with `command+option+i`.
```js
var greeting = "Hello World"

greeting.includes("Hello")
// expected return value >>> true
```
</section>

<br>

## Variables

Variables are keywords that we create to hold or point to return values that we want to maintain and re-use.  In the example above, if we want to re-use the return value `"hello world"`, instead of calling `"Hello World".downcase` over and over again, we can assign the return value to a `variable` to be used at later points in our code.

```ruby
pry(main)> greeting = "Hello World".downcase
=> "hello world"

pry(main)> greeting
=> "hello world"

pry(main)> "This is our greeting: #{greeting}"
=> "This is our greeting: hello world"
# this is an example of string interpolation, which you learned about in Mod0
```

Since *we* define variables, we can also reassign them.  Once reassigned, the original return value is gone - it can not be recalled with that variable.

```ruby
pry(main)> greeting = "Hello World".downcase
=> "hello world"

pry(main)> greeting
=> "hello world"

pry(main)> greeting == "Hello World".downcase
=> true

pry(main)> greeting = "Hello Universe"
=> "Hello Universe"

pry(main)> greeting
=> "Hello Universe"

pry(main)> greeting == "Hello World".downcase
=> false
```

<section class="dropdown">
### Let's see it in JavaScript

Feel free to copy paste these lines of code into the dev console in your browser. You can open the dev console in Chrome with `command+option+i`.
```js
var greeting = "Hello World".toLowerCase()

console.log(greeting) 
//expected result >>> "hello world"

console.log(greeting == "Hello World".toLowerCase())  
//expected result >>> true

greeting = "Hello Universe" //reassigned the value of our initial greeting variable

console.log(greeting)
// expected result >>> "Hello Universe"

console.log(greeting == "Hello World".toLowerCase())  
//expected result >>> false
```
</section>

<br>

## <a name='define-method'></a>Defining our own Methods

`.upcase`, `.include?`, and `.gsub` are all **Methods** built to work on string objects. But, what if we want to create our own methods? Recall that in Ruby, methods must be called on **objects** like a string (`"hello world"`) or integer (`13`); so, in order to create our own methods, we need to create our own objects.  We do this with **classes**.  We will go into more detail on **classes** in a later lesson. 

Let's make a class that calculates values. In a new file called `calculator.rb`, we'll add the following lines of code and run this file from the command line using `ruby calculator.rb`.

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end
end
```

**Breakout Chat**: What will happen when this code runs? What will the return value be?

<br>

We didn't we see `Welcome` printed to the screen because the `class` and `def` keywords *define* the class and method, but our code does not *call* the method. Remember, methods run on objects, so the first thing we need to do is create an object using our class. Then we can invoke the method on it:


```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end
end

calculator = Calculator.new
calculator.print_welcome
```

<br>

## Defining methods that take Arguments

Let's now add a method that can add numbers.

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end

  def add

  end
end
```

We need to give this method numbers to add as an input. Therefore, we define a **Parameter** called `num1` and another called `num2`. Let's also call this method at the bottom of the file:

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end

  def add(num1, num2)

  end
end

calculator = Calculator.new
calculator.add
```

**Breakout Chat**: What will happen when we run this code?

<br>

The error we get is `ArgumentError: wrong number of arguments (given 0, expected 1)`. We defined our method to take 1 argument, but when we called it we didn't provide an argument. This is what it means by "given 0, expected 1".

Let's pass our method an argument:

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end

  def add(num1, num2)

  end
end

calculator = Calculator.new
calculator.add(1,3)
```

When we provide an argument to a method, we can reference it inside the method using the name we provided. For now, let's just print it:

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end

  def add(num1, num2)
    puts num1
    puts num2
  end
end

calculator = Calculator.new
calculator.add(1,3)
```

You can think of a parameter as a variable that is created right at the start of the method. You can use that variable anywhere INSIDE of the method.  For each parameter you create in the method definition, you must pass a corresponding argument in the method invocation.

<section class="dropdown">
### What about JavaScript?

Javascript as a language isn't strictly object oriented like Ruby.   This means that in JavaScript, you *can* create a class and define methods in it. Then you can invoke those methods on an object instance of that class, just like in Ruby.  *But* you also have the option to just define a function on its own without it being in a class and invoke it without having to do so on an object.  You may see some JS classes later in the program but its not likely that you'll have to write one. 

</section>

<br>

## Defining Return Values

We want this method to output, or **Return** the sum. How does Ruby know what value to return?

A return value is either:

1. defined *explicitly* using the `return` keyword OR
2. is the last line of code run, if no `return` keyword was used.

Let's create an **Implicit Return** like so:

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end

  def add(num1, num2)
    num1 + num2
  end
end

calculator = Calculator.new
calculator.add(1,3)
```

We could write the same method using an **Explicit Return**:

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end

  def add(num1, num2)
    sum = num1 + num2
    return sum
  end
end

calculator = Calculator.new
calculator.add(1,3)
```

Run either of these versions, and you won't see anything printed to the screen. We did everything else: we defined our class and method, we called it, and it returned the value we were looking for, but we didn't see it because we never told Ruby to print it. **THIS IS VERY IMPORTANT:** returning and printing are NOT the same!

If we want to see the return value, we can save it to a variable and then print it:

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end

  def add(num1, num2)
    num1 + num2
  end
end

calculator = Calculator.new
sum = calculator.add(1,3)
puts sum
```

Or we can skip saving to a variable and print the return value directly:

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end

  def add(num1, num2)
    num1 + num2
  end
end

calculator = Calculator.new
puts calculator.add(1,3)
```

<section class="dropdown">
### What about JavaScript?

In Javascript you can use the return keyword to return the desired value from your function.  Just like in Ruby, returning and printing are not the same.  In order to print the value returned from our JS function below, we need to log it to the console - either in a variable, or directly.

```js
function add(num1, num2) {
  return num1 + num2
}

add(1,3)  

console.log(add(1,3)) //logging the return value by logging the invocation of the function
//expected result >>> 4

let sum = add(1,3)
console.log(sum)  //logging the return value by storing it in a variable then logging the variable
//expected result >>> 4
```
</section>

<br>

## Practice

Following the directions in [this gist](https://gist.github.com/ameseee/c311860e9f6bc023036351f298907ccb), work with your partner through the activities.

You focus should be exploring to build a deep understanding of these concepts, NOT to race through the activity for the sake of finishing it. Whether you know this stuff or not, there should be plenty for you and your partner to talk about/dig into during this time.

<br>

## Method Lookup

Imagine you open a classmate's project and you stumble upon this code:

```ruby
thing = Thing.new
thing.some_random_method
```

**Breakout Chat**:

Where would you go to find out what the `some_random_method` method does?

<br>
<br>
<br>
<br>

Remember, methods run on objects. In order to find where a method is defined, we need to first ask ourselves what type of object it is being called on. Look in the class file for that object's class type, and you might find it there. We say *might* because there's actually a long list of places that Ruby can look for a method. For right now, what you need to know is that when looking for a method, the first thing Ruby will do is look in the class of the object it is being called on.

**Breakout Chat**:

Where would you look to figure out how the slice method works?
```ruby
nums = [1, 2, 3, 4]
nums.slice(1, 1)
```

<br>

## Calling Methods from Other Methods

We can also call methods from within other methods that are in the same class. Let's add a function that takes a number and then prints a more robust message.

```ruby
class Calculator
  def print_welcome
    puts "Welcome to Calculator!"
  end

  def add(num1, num2)
    num1 + num2
  end


  def print_sum(first_number, second_number)
    sum = add(first_number, second_number)
    puts "The sum of #{first_number} and #{second_number} is #{sum}."
  end
end

calculator = Calculator.new
calculator.print_sum(1,2)
```

<br>

## Layers of Abstraction


One of the advantages of using methods is that we can build methods that operate at higher levels of abstraction than other methods. Abstraction is a practice where less complex functionality is exposed in an interface and more complex functionality is suppressed. In some ways, this is like a pyramid where higher level methods rely on lower level methods to take care of the details.

Think about how you drive a car. You don't need to know how a combustion engine works in order to drive it. All you need to know is that when you put your foot down on the gas pedal, the car moves. The details of how the engine work are *abstracted* away from you. You only need to know how the gas pedal works, the *interface*.

If we look at our `calculator.rb` file, what we really want to do is take two numbers, print a welcome, and then print the sum of those two numbers. `print_sum` is a method that does exactly that. Bundling methods into more abstract methods can help us to create more complex programs.

Abstraction is an object-oriented programming concept that means that complexity is being hidden from the user.


A note on order: The way you define the order of your _methods_ does not matter.  The way you call them **does**. Ruby will **parse** each method in the class and then when a method is **called** Ruby will **execute** the parsed methods accordingly.


**Add to your calculator**:

Add an abstract method to your calculator (a method that calls at least one other method).

<br>

## Check for Understanding

1. What is a method? An argument? A parameter? A return value?
2. What keywords do we use to create methods?
3. How does Ruby know what to return from a method?
4. How do you call one method from within another method?
5. Why do we use methods?
6. What is abstraction?
