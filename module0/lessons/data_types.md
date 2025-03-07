---
layout: page
title: Data Types
---

## Learning Goals

- Identify and use 4 basic Data Types
- Assign and reassign variables in Ruby
- Comfortably use `irb` within the Terminal

## Vocabulary

- ***assignment operator***
- ***Boolean***
- ***Data Type***
- ***Float***
- ***Integer***
- ***irb*** (interactive Ruby)
- ***String***
- ***variable***

## Where To Run Code

By the end of this lesson, you'll be able to use the Terminal, specifically a tool called ***<code>irb</code>***, to run and check your code. This is a great tool for a beginner, as well as a seasoned software developer, to have. `irb` will allow you to explore and learn Ruby and test out code you've written in a low-stakes environment. It is quick and easy to open up the Terminal and run your code immediately.

### `irb`: Tips & Tricks

- Open the Terminal quickly with keyboard shortcut `cmd + space` to open Spotlight. Then start typing "terminal" and it should auto-fill. Press `return`. _Note: there are other ways to open your Terminal but keyboard shortcuts are most efficient and the norm in the industry_.
- Regardless of your working directory, you can type `irb` then press `return` to open up what is referred to as an "irb session". A prompt that looks something like `irb(main):001:0>` will appear; you'll eventually type code to the right of that.
- The font size of your terminal can be increased or decreased with shortcuts `cmd + +` or `cmd + -`.
- To exit the `irb` session, type `exit` in all lowercase, then press `return`.

<div>
  <h3>Practice: <code>irb</code></h3>
  <ul>
    <li>Open the Terminal using Spotlight.</li>
    <li>Open an <code>irb</code> session.</li>
    <li>Increase the size of your font.</li>
    <li>Exit the <code>irb</code> session.</li>
  </ul>
</div>

## Data Types

In this lesson, we will use 4 of Ruby's Data Types. A ***Data Type*** classifies each piece of data in a Ruby program.
- ***String*** - Any series of characters (alpha, numeric, or symbol) between quotation marks
- ***Integer*** - Any whole positive or negative number, including 0
- ***Float*** - Any positive or negative number that involves a decimal
- ***Boolean*** - `true` or `false`

To connect to how these data types are used in an application we all have some experience with, consider the steps you took to enroll at Turing in the Populi application:
- **String** - You provided your email address and it was stored as a string, for example: `"helloworld@gmail.com"`
- **Integer** - You provided your date of birth and the program calculated your age, for example: `37`
- **Float** - You paid your deposit and that amount was stored as `1200.00`
- **Boolean** - Once you paid your deposit, the "paid deposit" field said `true`

<div>
  <h3>Deciding on a Data Type</h3>
  <p>For each of the items listed below, determine which Data Type seems most appropriate to store it as. If you are unsure of any, start a discussion in your Slack group.</p>
  <ul>
    <li>Username/handle</li>
    <li>Date of Birth</li>
    <li>Age</li>
    <li>Number of Likes</li>
    <li>Balance on a bank account</li>
    <li>Zip Code</li>
    <li>Currently online</li>
    <li>Daily countdown to a big event</li>
    <li>Caption for an image</li>
  </ul>
</div>

## Variables

Pieces of data in the various types we've discussed so far are valid Ruby code just as they are. We can demonstrate that by typing `"helloworld@gmail.com"` or `37` or `false` into `irb`. We know they are valid because we don't get an error. If `helloworld@gmail.com` is typed in, we _will_ get an error, and possibly a helpful suggestion, because we didn't include quotations around that string data! 

However, if we ever want to reference that email address ever again in our code, the only way would be to read that part of the screen and manually type it out again - and that's not going to make for a very efficient application.

***Variables*** are what allow us to store data in a Ruby program. We can think of them as storage containers that hold items we care about and want to keep track of. The label on top of that container is what we can compare to a variable _name_. Variables can store any of the Data Types we've learned today as well as others that you'll learn about in upcoming lessons.

### Variable Syntax

In Ruby, we define variables by typing the name of the variable we wish to create, the ***assignment operator***, then the value being stored.

```ruby
email = "helloworld@gmail.com"
starting_age = 37
amount_paid = 1200.00
deposit_paid = true
```

<section class="note">
To describe the first line of code in the previous example, one might say "This line of code declares a variable named `email` and assigns it to the String of `helloworld@gmail.com`".
</section>

If our Ruby program has data stored in variables, we are able to reference those variables at any time to access the data. This can be demonstrated in `irb`.

### Best Practices for Naming Variables

Naming can be hard, but is important to be thoughtful about and follow conventions of the language you are working with so that your code is easily accessible and readable for those you are collaborating with. A few key points:
- All Ruby variables should use `snake_case` - all characters should be lowercase; in multi-word variables, words should be separated with an underscore.
- Variable names should describe the type of data they hold without being overly verbose or specific (examples: `name`, `email`, etc. non-examples: `x`, `ftga23`, `name_of_incoming_mod_1_back_end_student`).

<div>
  <h3>Naming Conventions</h3>
  <p>Wherever you take notes, write down each of the following variable names and classify it as a strong variable name that follows Ruby conventions <em>or</em> a poor variable name. Explain why you deemed any variable name a poor one.</p>
  <ul>
    <li><code>isHungry</code></li>
    <li><code>z</code></li>
    <li><code>user_id</code></li>
    <li><code>is_hungry</code></li>
    <li><code>lastdateofcontact</code></li>
    <li><code>deposit_has_been_paid</code></li>
    <li><code>status</code></li>
    <li><code>1st_class</code></li>
  </ul>
</div>
<br>

### Reassigning Variables

We often need to write code that changes the data stored in a variable. Consider this Populi example:
- When a student first creates a profile, the `deposit_paid` variable is automatically assigned to `false`.
- Once the student pays their deposit, some code is triggered to change that value to `true`.

To do that, we use the exact same syntax that we used to make the original assignment. 

Run the code that follows in `irb` to demonstrate that the value has changed.

```ruby
# the deposit_paid variable is declared and assigned to the boolean value false
deposit_paid = false
# if you call the variable, the value stored in the variable (false) will be returned
deposit_paid 

# the deposit_paid variable is reassigned to the boolean value true
deposit_paid = true
# if you call deposit_paid, the new value stored in that variable will be returned (true)
deposit_paid
```

<div>
  <h3>Variables Practice</h3>
  <ul>
    <li>Open an <code>irb</code> session.</li>
    <li>Declare 4 variables; a String, Integer, Float, and Boolean.</li>
    <li>Call each variable to confirm it was stored correctly.</li>
    <li>Reassign each variable to a new value, then call it again to confirm it does indeed store the new value.</li>
    <li>Exit the <code>irb</code> session.</li>
  </ul>
</div>

### <code>puts</code> vs <code>print</code>
In an irb session, simply calling a variable returns the value stored in that variable and irb shows you that return value in the terminal. The value after the `=>` symbol is the return value. However, when you start working in a ruby file, the return value does not show! It's there, but it doesn't visually show on the screen.

In order to visually see the return value of a variable, we can use the `puts` or `print` command before any variable or even data to see that value printed to the console. 

Take a look at <a href="https://replit.com/@turingschool/m0lessonsrepl#main.rb" target="blank">this Mod 0 Lessons Repl</a> to see those commands in action.  _Note: Due to replit's limits, you may need to delete a previous repl in order to fork this one.  You'll use this repl in future Mod 0 lessons as well so bookmark it for easy access._

The difference between the two is that <code>puts</code> will log each statement to the console on a new line, while <code>print</code> will log statements side by side, without any spacing in between. 

## Practice

*Note:* If at anytime you have questions, please ask them in your Slack channel. This is the main resource we will use for asking questions at Turing.

1. Create a new directory called `variable_practice` and `cd` into it.
1. Inside that directory, create a file called `variables.rb`.
1. In your `variables.rb` file, add a few variables that are assigned to Strings.
1. In your `variables.rb` file, add a few variables that are assigned to Integers.
1. In your `variables.rb` file, add a few variables that are assigned to Floats.
1. In your `variables.rb` file, add a few variables that are assigned to Booleans.
1. In your `variables.rb` file, leave the original String variables as declared, but add some code to _reassign_ them to different values.
1. Write several `puts` statements.
1. `NEW` Run your code by going to the Terminal and typing `ruby variables.rb` - make sure you are inside the `variable_practice` directory when doing so. You should see the output of your ruby file in the terminal. If done correctly, where ever you have a `puts` or `print` statement, what follows should print to your terminal. 

## Check For Understanding

Please create a section in your Mod 0 Gist for **Data Types** and record your answers to these questions. (Including the question is very helpful!)
- How confident do you feel with the content on Data Types so far?
- Is there any additional learning you need or want to do before moving to the next lesson?
- What questions do you have about Data Types?

<br>
<br>


<section class="dropdown">

### A Peek at JavaScript

Datatypes and variables are very common programming concepts - all languages have some way to implement them.  We are focusing on ruby, but take a look below at what a variable might look like in JavaScript.  You should see some similarities!

```javascript
var name = "Megan";
var homeTown = "Fairfield, IA"
var age = 36;
```

We do not expect you to learn ruby AND JavaSript (at least not yet!), but it is fun to see how some languages are similar to each other.  We will sprinkle in these JavaScript "peeks" throughout your Mod0 and Mod1 curriculum!

</section>
