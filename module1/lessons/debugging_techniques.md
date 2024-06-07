---
title: Debugging Techniques
length: 120
tags: pry, debugging
layout: page
---

## Learning Goals

- Understand how to read a stack trace
- Understand common error messages
- Understand how to use `pry` to create breakpoints in code to help verify assumptions
- Develop a debugging process

## Tools & Repositories

To start, we need to make sure we have the appropriate tooling installed.

- [pry](https://github.com/pry/pry) - `gem install pry`
<section class="dropdown">
### Javascript debugging tools
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Built-in debugging tools
- [VSCode Debugger](https://code.visualstudio.com/docs/editor/debugging) - Integrated debugging tool
- JavaScript developers often use `console.log()` to get visibility into their code and the data they are working with. By logging variables and outputs at different points in the code, developers can understand how data is flowing through their application and identify where things might be going wrong. For more information on console.log(), you can refer to the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/console/log_static).
</section>

We'll also be using [Erroneous Creatures](https://github.com/turingschool-examples/se-mod1-exercises/tree/main/lessons/debugging/erroneous_creatures) which is in the Debugging Lesson directory of your mod-1-be-exercises repository.


## Warmup

- What do you do when you don't know what's going wrong with your application?
- What do you know about `pry`?
- What questions do you still have about `pry`?

## Debugging Process

There are two ways that programming can go wrong:

1. Your program doesn't run. You get an **Error**.
1. Your program runs, but it doesn't work the way you expect. You get a **Failure**.

Having a debugging process when things go wrong is crucial to being an effective developer. No matter how skilled you are at coding, you will always write bugs, so it is very important to know how to hunt them down and fix them.

The recommended series of steps you should take to debug your program are:

- Read your error (the WHOLE error)
- Read your stack trace (find the error).
- Verify your assumptions.
- Try things.

You might add `research` to that list, but generally research is something that you do so that you can try things.

## Stack Trace

A stack trace shows the line of code where an error occurred and all the method calls that led to that error.

### Reading a Stack Trace

Let's look at an example. If we run the `hobbit_spec.rb` test in our erroneous_creatures directory with `rspec spec/hobbit_spec.rb`, we will see something like this (you may need to scroll to find this):

```
4) Hobbit can get tired if play 3times
   Failure/Error: @agee >= 32

   NoMethodError:
     undefined method `>=' for nil:NilClass
   # ./lib/hobbit.rb:18:in `adult?'
   # ./lib/hobbit.rb:22:in `play'
   # ./spec/hobbit_spec.rb:79:in `block (3 levels) in <top (required)>'
   # ./spec/hobbit_spec.rb:78:in `times'
   # ./spec/hobbit_spec.rb:78:in `block (2 levels) in <top (required)>'
```

Let's break this down line by line:

- `4) Hobbit can get tired if play 3times`: This is RSpec telling us what test was running when this error occurred.
- `NoMethodError: undefined method '>=' for nil:NilClass`: This is the actual error that occurred
- All of the following lines are part of the **Stack Trace**:
  - `./lib/hobbit.rb:18:in 'adult?'`: This is the first line of the stack trace, and is the line where the error actually happened. This is telling us that the error occurred in the `hobbit.rb` file on line 18. The next part, `in 'adult?'` tells us that this error happened in the `adult?` method. `hobbit.rb:18` is the most important part of the whole stack trace. It tells us the exact location of the error.
  - `./lib/hobbit.rb:22:in 'play'`: The next line in the stack trace tells us where the `adult?` method was called from. Again, the most important part is the file and line number, `hobbit.rb` line 22. The last part, `in 'play'` is telling us that the `play` method was running when the `adult?` method was called.
  - `./spec/hobbit_spec.rb:79:in 'block (3 levels) in <top (required)>'`: The next line in the stack trace tells us where the `play` method was called from. It was called from the `hobbit_spec.rb` file on line 79 in a block.
  - `./spec/hobbit_spec.rb:78:in 'times'` and `./spec/hobbit_spec.rb:78:in 'block (2 levels) in <top (required)>'` are telling us that that block was part of a `times` loop that started on line `78`.

If we chart this out as a series of method calls, it looks something like this:

```
it 'Hobbit can get tired if play 3times' -> times -> play -> adult?
```
<section class="dropdown">
### Let's see it in JavaScript
```
Uncaught TypeError: Cannot read property 'push' of undefined
    at Array.push (<anonymous>)
    at addItem (script.js:10)
    at HTMLButtonElement.<anonymous> (script.js:20)
```
- `Uncaught TypeError`: Cannot read property 'push' of undefined: This is the actual error that occurred. It tells us that the push method was called on undefined, indicating that the array we're trying to push to does not exist or is not initialized.

- at `Array.push (<anonymous>)`: This line indicates that the error occurred during an anonymous call to the push method on an array. This is a built-in JavaScript method, so the error doesn't originate from user-defined code but from a misuse of this method.

- `at addItem (script.js:10)`: The next line in the stack trace shows the addItem function where the push method was called. The error occurred in the script.js file on line 10. This is where we should start our investigation.

- `at HTMLButtonElement`.<anonymous> (script.js:20): This final line indicates that the addItem function was called from an anonymous function attached to an HTML button element, which is defined in the script.js file on line 20.
</section>
### Tracing back through our Program

When using a stack trace, start at the top and work your way down. Identify the file and line number where the error occurred, and understand the sequence of method calls or function invocations that led to the error.


## Errors

When you see an error in your terminal, it can be tempting to read it as "blah blah blah something isn't working, let me open up my code and fix it". Instead, you should read the error, the **ENTIRE** error, maybe even read it twice, and really try to understand your problem before you try to fix it. Here are some common errors and how we can interpret them:

`NameError: uninitialized constant SomeClass::SomeConstant` - Ruby doesn't know what `SomeConstant` is.

`undefined local variable or method 'x' for SomeObject (NameError)` - Ruby doesn't know what `x` is. It looked for a local variable `x` but couldn't find one. It then looked for a method `x` and couldn't find one for `SomeObject`

`wrong number of arguments (given x, expected y) (ArgumentError)` - You called a method with `x` number of arguments, but the method definition specifies it needs `y` number of arguments. This often happens when we call `.new` on something. Remember, when you call `.new` it also calls `.initialize` so you need to make sure the number of arguments you pass to `.new` match the number of arguments defined in `.initialize`

`undefined method 'some_method' for SomeObject:SomeClass (NoMethodError)` - you tried to call `some_method` on `SomeObject`, but `SomeObject` doesn't respond to that method. This means that `some_method` is not defined in `SomeClass`. This error can take several forms:

1. If you didn't write `SomeClass`, you called a method that doesn't exist i.e. `"hello world".first`.
1. If you did write `SomeClass`, you misspelled the name of the method or you didn't define `some_method` for `SomeClass`
1. If `SomeObject:SomeClass` shows up as `nil:NilClass`, this means that something is nil that shouldn't be.
1. Sometimes `SomeObject:SomeClass` looks like `#<SomeClass:0x00007f7fa21d5410>`. You can read this as "you tried to call `some_method` on a `SomeClass` object".

`syntax error, unexpected end-of-input, expecting keyword_end` - You are missing an `end`. Indenting your code properly will make it MUCH easier to hunt down the missing end.

`syntax error, unexpected end-of-input, expecting keyword_end` - You have an extra `end` or an `end` in the wrong place. Indenting your code properly will make it MUCH easier to hunt down the offensive end.

`require': cannot load such file -- file_name (LoadError)` - Ruby cannot load the file `file_name`. Make sure `file_name` is spelled correctly, the path is written correctly i.e. `./lib/file_name`, and that you are running from the root directory of your project.
<section class="dropdown">
### Let's see it in JavaScript:
- `TypeError`: Cannot read property 'x' of undefined: You tried to access a property on an undefined object.
- `ReferenceError`: x is not defined: You tried to use a variable that hasn't been declared.
- `SyntaxError`: Unexpected token: There is a syntax error in your code.


</section>
## Verifying Your Assumptions

Not verifying your assumptions can be one of the costliest mistakes you make as a dev. It's possible to be *absolutely convinced* that you know exactly what's causing an error, spend hours working to resolve an issue that you're sure exists, only to later find that the error occurred long before the piece of code that held your focus so tightly.

While it's nice to drop into IRB or pry in terminal to see if there are methods that exist in Ruby that I can use to solve my problem, it's even better to put a `pry` *into my code* to see exactly what I can do given the other methods and variables I've defined.

Let's run the `hippogriff_spec.rb`, and review the errors that are generated there:

```
 2) Hippogriff when it flies it collects a unique moonrock
     Failure/Error: @moonrocks.push(rock)
     
     NoMethodError:
       undefined method `push' for nil:NilClass
     # ./lib/hippogriff.rb:14:in `fly'
     # ./spec/hippogriff_spec.rb:38:in `block (2 levels) in <top (required)>'
```



<section class="checks-for-understanding">

  <h4> Let's start by reading that stack trace, and then answer the following questions with a partner: </h4>
  <ul>
    <li> What test is generating this error?</li>
    <li> What line in that test is generating the error?</li>
    <li> Is there any setup involved before we hit that line?</li>
    <li> If so, can we use pry to confirm that the setup has been completed successfully? Do we have access to the variables that we think we do? Are they holding the objects we expect them to?</li>
    <li> What about in the Hippogriff class itself? What line is generating an error?</li>
    <li> Use pry to verify that the variables we are using in that method are holding the objects we expect them to.</li>
    <li> Can you identify the error?</li>
    <li> Can you make the test pass?</li>
  </ul>

</section>

### Trying Things

One other thing we can do when we are trying to debug is to use `pry` to try something in our code before we actually commit to adding it to our class.

Let's look at an error from our Wizard test suite:

```
2) Wizard is not always bearded
   Failure/Error: expect(wizard.bearded?).to eq(false)

     expected: false
          got: {:bearded=>false}

     (compared using ==)

     Diff:
     @@ -1 +1 @@
     -false
     +:bearded => false,

   # ./spec/wizard_spec.rb:25:in `block (2 levels) in <top (required)>'
```

<section class="checks-for-understanding">
  <h4>With a partner:</h4>
  <ul>
    <li> Read the stack trace to determine where the error is occurring.</li>
    <li> Use pry in the test file to verify any assumptions you may have about what's happening.</li>
    <li> Use pry in the Wizard class to see if you can determine how to implement this method before you enter any code into the Wizard class. Ask yourself: how can I get the return value that I want?</li>
  </ul>
</section>

## Checks For Understanding

How does the stack trace read to tell you what's going on?

What is one common error message?

What does it mean if you don't hit your pry?


## Exercise - Erroneous Creatures

See if you can finish updating the Erroneous Creatures to make the rest of the test suite pass.

Use the debugging techniques discussed above to diagnose and fix the bugs and get your creatures back to passing.


#### Other Resources

- [Older Lesson for Reference](http://tutorials.jumpstartlab.com/topics/debugging/debugging.html)
      *Note: Some of the content in the older lesson is out of date.*
