---
title: Objects, Classes, and Instances
layout: page
---

## Learning Goals

* Describe the difference between a class and an instance of that class
* Define a class
* Store state in instance variables defined in `initialize`
* Provide access to state using `attr_reader`s and `attr_accessor`s
* Use methods to provide behaviors to instances of a class
* Create a new instance of a class and call methods on that instance

## Vocabulary

* Class
* Object
* Instance
* State
* Attribute
* Instance Variable
* Behavior
* Method

## Warm Up

In your notebook brainstorm a **type** of object and **specific** instances of that object. Then brainstorm 3 different **attributes** for those objects and 3 different **behaviors** of those objects.

For example:

* Type of object: Refrigerator
* Specific instances:
    * Your Kitchen Fridge, Your Garage Fridge, Your Neighbor's Kitchen Fridge
* Attributes:
  * Brand, Color, Temperature
* Behaviors:
  * Add Food, Remove Food, Change Temperature

## Classes in Ruby

### Overview

In programming, a **Class** is something that models:

1. State
2. Behavior

State is what something *is*. Behavior is what something *does*. In the warm up, our *Class* was Refrigerator. We modeled the state of a refrigerator by defining the attributes "brand", "color", and "temperature". We modeled the behavior of a refrigerator by defining the methods "add food", "remove food", and "change temperature".

An **Instance** or **Object** is a concrete representation of a Class. In the previous activity, "your refrigerator" is a specific Instance of the Refrigerator Class. We can also say that "your refrigerator" is a Refrigerator Object. Do not get confused by the terms Instance and Object. They mean the exact same thing (for now).

Think of a **Class** like a blueprint for a house and an **Instance** as an actual house. The blueprint is a just an idea of how the house should be built, and the house is the realization of that blueprint.

### Syntax

The syntax for defining a class is as follows:

```ruby
class NameOfClass
end
```

<section class="dropdown">

### Defining a similar class in JavaScript

```javascript
class NameOfClass {
}
```

</section>

So, for example, if we wanted to create a Dog class, we could do the following:

```ruby
class Dog
end
```

<section class="dropdown">

### Creating a Dog class in JavaScript

```javascript
class Dog {
}
```

</section>

Notice the use of `UpperCamelCase` for the class name.

Generally we will want to put more information in our classes to make them useful to us, but those two lines (even with no other information) will create a class.

### Example - Class/Instance Syntax

Let's follow a class example with a `Unicorn` class. I will create a directory in the classwork directory called `objects_classes_and_instances`. Within that directory, I'll create a `unicorn.rb` file, and put the following information into that file. (You will take these same steps later for a different class😉)

```ruby
# ~/turing/1module/classwork/objects_classes_and_instances/unicorn.rb
# Notice that `class` is lowercase while `Unicorn` is UpperCamelCased.

class Unicorn
end
```

In the same `objects_instances_and_classes` directory, let's create a `runner.rb` file and put the code below into that.

```ruby
# ~/turing/1module/classwork/objects_classes_and_instances/runner.rb
require './unicorn'

unicorn_1 = Unicorn.new
unicorn_2 = Unicorn.new

require 'pry'; binding.pry
```

We can run the `runner.rb` file from the command line if we are inside of our `objects_classes_and_instances` directory by typing the following: `ruby runner.rb`.

When we run this file, our terminal should open up a pry session when it reads the line: `binding.pry`. Inside of that pry session, we'll type `unicorn_1` and hit return to see what the variable `unicorn_1` is holding. Then, we'll type `unicorn_2` to see what that variable is holding.

### Reflection

- How are the two objects the same?
- How are they different?


<section class="dropdown">

### Creating object instances in JavaScript

```javascript
// ~/turing/1module/classwork/objects_classes_and_instances/runner.js
const Unicorn = require('./unicorn');

const unicorn1 = new Unicorn();
const unicorn2 = new Unicorn();

// Use console.log to inspect
console.log(unicorn1);
console.log(unicorn2);
```

<section class="note">

### Note

To run your file using Javascript, run `node runner.js` from the terminal.

JavaScript doesn't have a `binding.pry` equivalent, therefore you will use `console.log` for debugging.

</section>

</section>


## Attributes in Ruby Classes

Above we created a `Unicorn` class and then also created specific instances of the unicorn class that we held in the variables `unicorn_1` and `unicorn_2`. Generally the objects we create will come from the same template, but each will be a unique object.

We can make each one different in some important ways. For example, each one should have its own:

* name
* color

We can model these attributes in code by using *instance variables*. Generally we define these instance variables in a special method called `initialize` that is run every time a new instance of a class is created. Make sure to spell it correctly 😬.

### Initialize

When we run `Unicorn.new` in Ruby, what actually happens? We can see from the last example that different Unicorn objects (or instances) are created. Other than that, nothing happens. If we want some specific code to run when we first create a new Unicorn, we need to tell Ruby what should happen when a new Unicorn instance (or object) is created. We do this with the initialize method.

```ruby
class Unicorn
  def initialize
    # Any code here will run each time a new instance is created
  end
end
```

<section class="dropdown">

### JavaScript has an equivalent function called the constructor function

```javascript
class Unicorn {
  constructor() {
    // Any code here will run each time a new instance is created
  }
}
```

</section>

This method is run once and only once during an Object's lifetime, when we call `new`. Other than that, initialize is like any other method where we can put Ruby code:

```ruby
class Unicorn
  def initialize
    puts "A new Unicorn object has been created"
  end
end
```

<section class="dropdown">

### Here is the equivalent in JavaScript

```javascript
class Unicorn {
  constructor() {
    console.log("A new Unicorn object has been created");
  }
}
```

</section>

### Modeling State with Attributes

The instances of the classes we've defined so far are basically useless. Aside from their `object_id`, there is nothing unique about these instances.

Remember, a class models *State* and *Behavior*. Let's give our unicorn some state.

### Example - Attributes

Let's add some attributes to the `Unicorn` class. The `@` symbol before a variable name indicates that it is an *Attribute* or *Instance Variable*. These two terms mean the exact same thing.

```ruby
class Unicorn
  def initialize(name_parameter, color_parameter)
    @name = name_parameter
    @color = color_parameter
  end
end
```

<section class="dropdown">

### Adding attributes to our Unicorn class in JavaScript

```javascript
class Unicorn {
  constructor(nameParameter, colorParameter) {
    this.name = nameParameter;
    this.color = colorParameter;
  }
}
```

</section>

Because attributes are something we want to persist throughout an object's lifetime, we typically define them inside the initialize method because we want them to exist as soon as the object is created.

We have now created a method class that will allow us to create many different instances of Unicorn, each one slightly different from the last. How do we do that in practice? Let's update the runner file so that it includes the following:

```ruby
unicorn_1 = Unicorn.new("Sparkle", "rainbow")
unicorn_2 = Unicorn.new("", "white")

require 'pry'; binding.pry
```

<section class="dropdown">

### Passing arguments to our Unicorn class in JavaScript

```javascript
const unicorn1 = new Unicorn("Sparkle", "rainbow");
const unicorn2 = new Unicorn("", "white");

console.log(unicorn1);
console.log(unicorn2);
```

</section>

When we include the arguments to `.new`, Ruby will pass those arguments to the initialize method for us. Note that the arguments that we pass to `new` are order dependent. So, in the first example when we pass `"Sparkle"` as the first argument, we are saying that the name of the Unicorn we are creating is Sparkle. When we pass an empty string (`""`) the second time we call `new` we are saying that the Unicorn that we created doesn't have a name.

What we have just done is a very common pattern. We gave our initialize method some arguments and we saved those arguments to instance variables. While this is a strong pattern, it is not a rule. For instance, you may want to set a variable in your initialize that has a default value that isn't set using an argument:

```ruby
class Unicorn
  def initialize(name, color)
    @name = name
    @color = color
    @magical_powers = [] # We are setting the default value of magical_powers to an empty array
  end
end
```

<section class="dropdown">

### Setting a default value for an attribute in JavaScript

```javascript
class Unicorn {
  constructor(name, color) {
    this.name = name;
    this.color = color;
    this.magicalPowers = []; // We are setting the default value of magicalPowers to an empty array
  }
}
```

</section>

### Practice

Create an `objects_classes_and_instances` directory, then touch a `person.rb` file and a `runner.rb` file. Define a Person class in it and create instances of that class in your runner file.

Now, give your Person class some attributes that are set using arguments to initialize and some attributes that have default values. Make some instances of your Person class, and run you runner file.

## Accessing Attributes

That's all well and good, but what can we do with all these attributes that we've created? They're no good to us if we can't use them.

Generally, the way that we access information stored in a class is by *calling methods* on that class. We do that using dot `.` syntax.

Let's run our runner file again and check to see what this returns:

```ruby
unicorn_1.name
```

<section class="dropdown">

### Accessing an object's attribute in JavaScript (Spoiler Alert: It's exactly the same!)

```javascript
unicorn1.name
```

</section>

We should get an error that says something about the method `.name` not existing (a `no method` error). The syntax here is correct, but we haven't told our `Unicorn` class how to respond when it receives the message `name`.

We can do that with methods like the ones we've seen before, but attributes stored as instance variables are special. We can tell our class to provide access to them using attribute readers. Let's do that now.

### Example - Accessing Attributes in Ruby

Let's update our Unicorn class to include the lines below.

```ruby
class Unicorn
  def initialize(name, color)
    @name = name
    @color = color
    @magical_powers = []
  end

  def name
    @name
  end

  def color
    @color
  end

  def magical_powers
    @magical_powers
  end
end
```

Let's run our runner file again and see if you can now call `unicorn_1.name`.

Now, I should be able to call `unicorn_1.name` and get back whatever was stored in the instance variable. But wow, this class is suddenly lengthy, harder to read, and has a lot of similar work happening. A method called `name` returns `@name`, `color` returns `@color`, etc. There's a cleaner way to do the same thing:

```ruby
class Unicorn
  attr_reader :name,
              :color,
              :magical_powers

  def initialize(name, color)
    @name = name
    @color = color
    @magical_powers = []
  end
end
```

Let's run our runner file again and see if you can still call `unicorn_1.name` and the other attributes.

An important thing to remember is that although there is a special syntax for creating `attr_reader`s, they are still just methods. Remember the error we got earlier was a **no method error** for `name`.

<section class="note">

### Note

This is not the case with JavaScript, you automatically get access to these attributes without using something like `attr_reader`.

</section>

### Practice

- Create `attr_reader`s for the attributes in your `Person` class.
- Practice explaining to your what is happening _under the hood_ with the `attr_reader`s

## Other Methods

We can also create other methods that will allow us to send other messages to our Unicorn class. For example, let's say we wanted to add a magical power to our unicorn. We currently have a way to see what magical powers our unicorn has, but we don't have any way to _add_ to it. Let's do that by creating a method called `add_power` that will add a power to the `magical_powers` array.

Define an `add_power` method that allows you to give your unicorn another magical power. Note that we can access the `@magical_powers` instance variable from anywhere within the class just by using the `@` symbol.

```ruby
class Unicorn
  # [ ... attr_readers & initialize method ]

  def add_power(power)
    @magical_powers << power
  end
end
```

<section class="dropdown">
  
### Adding other methods to your classes in JavaScript

```javascript
class Unicorn {
  // [ ... constructor function ]

  addPower(power) {
    this.magicalPowers.push(power);
  }
}
```

</section>

Let's update our runner file so that you:

1. Create a new instance of Unicorn.
2. Print the magical powers of that Unicorn.
3. Add a power for that Unicorn, using the method you just created. You can represent a power as a String.
4. Print the new powers of the Unicorn.

### Practice

- Create a `have_birthday` method for your Person class. This should increase the age of that person by 1.
- Update your runner file in a similar fashion to steps 1-4 for your Person class.

## Object Interaction

When we build more complex programs, we typically have many classes, and the instances of those classes `interact` in some way.

### Example - Object Interaction

Instead of representing power as a String, let's create a Power class to represent a power.

```ruby
class Power
  attr_reader :name,
              :energy_required

  def initialize(name, energy_required)
    @name = name
    @energy_required = energy_required
  end
end
```

Let's update our runner file to add Power objects to your unicorn.

## Practice

### Create a Book Class

Create a book class. Make sure that your book class with `title`, `author`, and `genre` attributes.

Once you've created your class, create a runner file that creates three separate instances of book and saves them to variables.

**Check in** with your partner that you're in a similar place. Discuss an differences you have in your code.

### Create a Library Class

Create a Library class. Add attributes as you wish, but the be sure to include a `@collection` instance variable that starts as an empty array.

**Check in** with your partner that you're in a similar place. Discuss an differences you have in your code.

If you have time:

* Add a `add_book` method that takes an instance of book and adds it to your collection.
* Add a `titles` method that iterates over your collection of books and returns only their titles.
* Add an `authors` method that iterates over your collection of books and returns the authors for each book. Can you make it so that it does not return any duplicate authors?
* Pretty print: add a method that prints a table of books and authors that the library has. This will require some string manipulation to get a table to print with columns that line up.

Update your runner file to create a new library, add some books to the library, and print information about their collections.

### Check for Understanding

On your own, answer the questions below.

* Classes, instances, objects
    * What is a Class?
    * What is an Instance?
    * What is an Object?
    * How are these three things alike/different?
    * What code do you have to write to create a Class? What code do you have to write to create an instance?
    * What happens when a new instance is created?
* Attributes & Methods
    * What is an attribute? How can we recognize an attribute?
    * What is a method? How do we write methods?
    * What are parameters? How do we add parameters to methods?
    * What is a return value? How do you know what the return value of a method is? Do all methods have return values?

If you are struggling a bit to answer any of these, take some time after this lesson to google or talk with a classmate. If you feel absolutely lost in these, set up a time to pair with a Mod2 student/mentor/instructor.
