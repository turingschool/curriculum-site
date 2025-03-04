---
layout: page
title: Conditionals
---

## Learning Goals

- Use comparison and logical operators
- Write if/elsif/else statements for conditional logic

## Vocabulary

- ***comparison operators***
- ***conditionals***
- ***if statements***
- ***logical operators***

## Comparison Operators

_This will connect to Booleans, which you learned about in the Data Types lesson._

Conditional statements, or ***conditionals***, are Ruby statements that evaluate to `true` or `false`. The most common operators used for conditions are ***comparison operators***:

- `==` (equal)
- `!=` (not equal)
- `>` (greater than)
- `>=` (greater than or equal to)
- `<` (less than)
- `<=` (less than or equal to)

```ruby
# Does the Integer 5 have the exact same value as the Integer 5?
5 == 5
# --> true

# Is Integer 5 less than the Integer 3?
5 < 3
# --> false

age = 18
# Is the age greater than 12?
age > 12
# --> true

# reassign age variable to 9
age = 9
# Is the age greater than 12?
age > 12
# --> false
```

<div>
  <h3>Equality vs. Assignment</h3>
  <p>The most common mistake people encounter when writing conditional statements is related to the difference between <code>=</code> and <code>==</code>.</p>
  <ul>
    <li><code>=</code> is an assignment. It instructs, "take the value on the right side and store it into whatever is on the left side" – it’s telling, not asking.</li>
    <li><code>==</code> is a question. It asks, "is the value on the right the exact same as the value on the left?" – it’s asking, not telling.</li>
  </ul>
</div>

<em>Optional:</em> <a href="http://ruby-for-beginners.rubymonstas.org/operators/comparison.html" target="_blank">Read more about comparison operators.</a>

<br>

<div>
  <h3>Comparisons</h3> 
  <p>Complete the following work in an <code>irb</code> session:</p>
  <ul>
    <li>Check if 3 is less than or equal to 6.</li>
    <li>Check if "T" is equal to "t".</li>
    <li>Check if "P" is equal to " P".</li>
    <li>Check if 10 is not equal to 10.</li>
    <li>Declare a variable that store your name in a String.</li>
    <li>Check if the length of your name is greater than or equal to 10. Not sure how to do that programmatically? Google!</li>
  </ul>
</div>
<br>

<section class="note">
For the remaining practice activities in this assignment, you can use `irb`, create a Ruby file in your Terminal and edit it in VS Code, or use your <a href="https://replit.com/@turingschool/m0lessonsrepl#main.rb" target="blank">Mod 0 Lessons Repl </a> from previous lessons - it's your preference!
</section>

## If Statements

***If statements*** are the most common form of conditionals. The logic of an <code>if statement</code> in Ruby follows the same logic in other programming languages.

### `if`

All of our conditional branches will begin with the keyword `if`. To communicate to the Ruby program that the `if statement` should end, the keyword `end` must be used. Any code between the `if` and `end` keywords will run only **if** the condition is true.

```ruby
if condition
  # code to execute if condition evaluates to true
end
```

The following example checks if a store is open, and prints out a statment if the store is indeed open:

```ruby
greeting = "Hello"

if greeting == "Hello"
  puts "Let's go!"
end
```

<div>
  <h3>Try It: <code>if</code> statements</h3>
  <p>Define an <code>age</code> variable and assign it to an Integer. Then, write code that will print out the String "Welcome to the Website" only if the user is 21 or older.</p>
</div>
<br>

### `else`

In the previous exercises, when the condition evaluates to false, we don't see any output. In order to have a default response that runs when the condition is false, we need an `else` statement. Here's an example with the `greeting` variable for the store. 

```ruby
greeting = "Hello"

if greeting == "Hello"
  puts "Let's go!"
else
  puts "Goodbye then."
end
```

<div>
  <h3>Try It: <code>else</code> statements</h3>
  <p>Go back to your previous exercise with the <code>age</code> variable. Use an <code>else</code> statement that prints out a different message if the user is not 21 or older.</p>
</div>
<br>

### `elsif`

Use the keyword `elsif` to create more branches with additional conditions to check. 

```ruby
if condition1
  # code to execute if above condition1 evaluates to true
elsif condition2
  # code to execute if above condition2 evaluates to true
elsif condition3
  # code to execute if above condition3 evaluates to true
else 
  # default code to execute if none of the other conditions evaluate to true
end
```

Notice that code inside the `else` statement will only run when none of the previous conditions evaluate to true.

<div>
  <h3>Try It: <code>elsif</code> statements</h3>
  <p>Continue building on the previous work you've done with the <code>age</code> variable. Write code that will print out the String "Welcome to the Website" only if the user is 21 or older. If the user is under the age of 2, print out "How are you even on this device?". If the user is any other age, print out "You aren't quite old enough to visit, sorry!".</p>
</div>
<br>

Notice that each of the previous examples have **one** `end` keyword. That is paired with the opening `if` keyword, and is required. <a href="https://teamtreehouse.com/community/syntax-error-unexpected-endofinput-expecting-keywordend" target="_blank">What happens if you forget the `end` keyword?</a>

<section class="note">
_Optional:_ Read the <a href="http://tutorials.jumpstartlab.com/projects/ruby_in_100_minutes.html#9.-conditionals" target="_blank">Conditionals section</a> from Ruby in 100 Minutes for a different explanation.
</section>

<br>
<div>
  <h3>More Practice</h3>
  <ul>
    <li>Declare a variable that stores your name in a String.</li>
    <li>Write an if/else statement - if your name is "Oscar", print "Hello, Oscar!". If not, print "Nice to meet you, Stranger!".</li>
    <li>Challenge: Use string interpolation to interpolate any non-Oscar name instead of the word "Stranger".</li>
  </ul>
</div>

## Self-Teach
Part of what you'll experience at Turing is learning a technical topic on your own. Practicing this skill at Turing will get you prepared for the job where you will do this often.

Take time between now and your next session to self-teach the following section.

## Logical Operators

There are three ***logical operators*** in Ruby; we will learn two today:
- `&&` (Logical And Operator)
- `||` (Logical Or Operator)

### `&&` 

This logical operator will check two values, and both **must** be true in order for it to return `true`. Examples follow:

```ruby
age = 34
time = 2.05

age < 40 && time < 3.0
# true (both meet requirement)

age < 30 && time < 3.0
# false (age is not less than 30)

age < 40 && time < 2.0
# false (time is not less than 2.0)

age < 30 && time < 2.0
# false (neither meet requirement)
```

### `||`
This logical operator will check two values, and _one_ or _both_ must be true in order for it to return true. Examples follow:

```ruby
age = 34
time = 2.05

age < 40 || time < 3.0
# true (both meet requirement)

age < 30 || time < 3.0
# true (time meets requirement)

age < 40 || time < 2.0
# true (age meets requirement)

age < 30 || time < 2.0
# false (neither meet requirement)
```

<div>
  <h3>Logical Operators</h3> 
  <p>Complete the following work in an <code>irb</code> session:</p>
  <ul>
    <li>Declare two variables - one that stores your age and another person's age.</li>
    <li>Check if both ages are under 100.</li>
    <li>Check if at least one age is under 78.</li>
    <li>Check if your age is over 18 and the other age is under 60.</li>
    <li>Check if your age is over 21 or if the other age is over 25.</li>
    <li>Check if your age is under 20 or if the other age is over 40.</li>
  </ul>
</div>

Now that you know about logical operators and `if statements`, let's combine that new knowledge to complete a final exercise.

<div>
  <h3>More Practice: Logical Operators with Conditions</h3>
  <ul>
    <li>Declare a variable that stores a password.</li>
    <li>In order for a password to be valid, it needs to have 8 characters or more and include the symbol <code>#</code>.</li>
    <li>Use logical operators and conditions to give the user feedback based on their password.</li>
    <li>If the user enters a password that is both 8 characters or more <em>and</em> includes the symbol <code>#</code>, print the statement, "Got it. Your password is: XXXXXXXX" using interpolation to confirm their password.</li>
  </ul>
</div>

<!-- ## Check For Understanding

- <a href="https://github.com/turingschool/m0_be_conditionals" target="_blank">Follow the directions in the README of this GitHub repository</a>.
- Add the link to your repository to your Mod 0 Gist in a section called `Conditionals`.

<br><br><br> -->

<section class="dropdown">

### If Statements in JavaScript

Nearly all programming languages implement some flavor of an `if statement`.  If you're curious, take a look at the JavaSript example below!

```javascript
// Define a variable
var number = 10;

// If-else statement
if (number > 15) {
  console.log("The number is greater than 15.");
} else if (number > 5) {
  console.log("The number is greater than 5 but less than or equal to 15.");
} else {
  console.log("The number is 5 or less.");
}

// Output: The number is greater than 5 but less than or equal to 15.
```

In this example, you can see that JavaScript uses a lot of curly braces!  But, other than syntax differences, the if statement should feel a little bit familiar, based on the ruby if-statements we just learned.

</section>