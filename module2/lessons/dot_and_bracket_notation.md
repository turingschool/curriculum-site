---
title: "JS: Dot and Bracket Notation"
layout: page
tags: javascript, foundation, arrays, objects, bracket, dot, notation
---

## Learning Goals

- Use dot and bracket notation to access values within JavaScript objects
- Compare expressions in dot and bracket notation and identify equivalent expressions
- Determine appropriate use cases for each notation
- Apply our knowledge of each notation to gain a deeper understanding about a familiar concept
- Compare similar concepts in Ruby

## Vocabulary

- `Object` An unordered collection of related data in the form of key-value pairs. JavaScript provides two notations for accessing object properties...
- `Dot Notation` A property in an object is accessed by giving the object’s name, followed by a period, followed by the property name (i.e. `user.name`)
- `Bracket Notation` The object name is followed by a set of square brackets, with the property name specified inside the brackets via either a string (i.e. `user['name']`), or a variable (i.e. `user[name]`)

## Warm Up

Watch the first 7 minutes of [this video](https://www.youtube.com/watch?v=DJ0deyVQZPw) about dot and bracket notation.

<!-- This video is from Pam Lovett, covering bracket and dot notation and dives into details around using strings and or variables in bracket notation  -->

- Independently, complete the exercise found on [this repl](https://repl.it/@kaylaewood/bracketVsDotTryIt1#index.js).

<section class="checks-for-understanding">

Which of the following expressions is equivalent to `car.brand`?

A. `car[brand]`  
B. `car['brand']`

</section>

<section class="dropdown">

### Answer

Answer: B. `car['brand']`

Explanation: Option A would look for a variable named `brand`, while option B correctly uses a string to access the 'brand' property.

</section>

## Equivalent Expressions

Objects are a key piece of working with JavaScript. In order for objects to be helpful for us, we have to be able to access the information inside of the objects. To do this, we can use **dot notation** or **bracket notation**.

### Here are some examples of **dot notation**:

```js
house.address;
student.gradeLevel;
school.classroom.teacher;
```

### Here are equivalent expressions in **bracket notation**:

```js
house["address"];
student["gradeLevel"];
school["classroom"]["teacher"];
```

### In Ruby, we use a similar syntax for accessing hash values:

```ruby
house[:address]
student[:grade_level]
school[:classroom][:teacher]
```

<section class="checks-for-understanding">

### Stop and Think

- What differences do you notice in the way each notation is written?

</section>

<section class="note">

### Key Point #1

You can write equivalent expressions using dot and bracket notation. For example: `object.property` is equivalent to `object['property']`.

❗️Note: In Ruby, we don't have dot notation for accessing hash values. We always use the bracket notation with symbols or strings as keys.

</section>

## Chaining

As you have seen in a couple of examples today, you can chain multiple properties onto an expression in order to dig in deeper on an object. Let’s take this object, for example:

```js
var user = {
  email: "jonathan@email.com",
  name: "Jonathan",
  contactInfo: {
    phone: 123456789,
    address: {
      street: "1234 Main Street",
      city: "Denver",
      state: "CO",
      zip: 80206,
    },
  },
};
```

If we wanted to access this user’s zip code using **dot notation**, we could write:

- `user.contactInfo.address.zip`

In order to access their zip using **bracket notation**, we would write:

- `user[‘contactInfo’][‘address’][‘zip’]`

You can also mix and match! We could write something like this and it would work:

- `user.contactInfo[‘address’].zip`

Notice how each block is formatted:

- `user` `.contactInfo` `[‘address’]` `.zip`

## Practice

Complete the exercises found on [this repl](https://replit.com/@hfaerber/bracketVsDotTryIt2#index.js).

<section class="checks-for-understanding">

In your opinion, which notation is easier to read and write?

</section>

<section class="note">

### Key Point #2

Whenever it is possible, we will default to using dot notation.

</section>

## Bracket Notation & Variables

One important thing to remember; dot notation only works if you have access to the exact property name. Dot notation interprets the expression literally. Meaning, it will look for the actual property that is passed in. Let’s take, for example, [this code block](https://repl.it/@kaylaewood/bracketVsDotlesson1):

```js
var phrases = {
  greeting: "hello",
  departing: "goodbye",
};

var lookupField = "greeting";
```

If we ran the command below, we would get undefined. This is because the JavaScript interpreter is looking for a property that is literally called “lookupField” and it does not exist:

```js
console.log(phrases.lookupField); // output: undefined
```

The same would happen in this case:

```js
console.log(phrases["lookupField"]); // output: undefined
```

We can use bracket notation in our favor, by passing in the variable, like the example below. In this case, the interpreter will evaluate whats between the brackets, register `lookupField` as a variable and then pass in it’s value of `‘greeting’` to get the output of `‘hello’`:

```js
console.log(phrases[lookupField]); // output: "hello"
```

If we reassigned the value of lookupField and then ran the same command as above, we’d get a new output:

```js
lookupField = "departing";

console.log(phrases[lookupField]); //output: "goodbye"
```

💡 **Remember:** A variable represents some other value, and that value could be reassigned/change over time. This means dot notation is not an option when using a variable to represent the object's key we are trying to access because to use dot notation, we must be able to type out the exact letter-by-letter name the key. Bracket notation gives us the ability to use variables to access values in an object. This is especially helpful with the value of the variable changes.

In Ruby, we can use variables as keys in a similar way:

```rb
phrases = {
  greeting: "hello",
  departing: "goodbye"
}

lookup_field = :greeting

puts phrases[lookup_field] # output: "hello"
```

<section class="note">

Note that in Ruby, we often use symbols as keys, which is similar to using strings in JavaScript.

</section>

<section class="note">

### Key Point #3

We must use bracket notation whenever we are accessing an object's property using a _variable_ or when the property's key is a _number_ or includes a _symbol_ or is _two words with a space_.

</section>

Take a moment to read through this code:

```js
function checkForFood(restaurant, food) {
  if (restaurant.menus[food.type].includes(food.name)) {
    return `Yes, we're serving ${food.name} today!`;
  }
  return `Sorry, we aren't serving ${food.name} today.`;
}

var foodItem = {
  name: "Quiche",
  price: "6.49",
  type: "lunch",
};

var restaurant = {
  name: "Butcher Block Cafe",
  menus: {
    breakfast: ["Quiche", "Egg and Sausage Sandwich", "Corn Beef Hash"],
    lunch: ["Ham and Swiss", "Chicken Fried Steak", "Cheeseburger"],
    dinner: ["T Bone Steak", "Spaghetti and Meatballs"],
  },
};

console.log(checkForFood(restaurant, foodItem));
```

<section class="checks-for-understanding">

What will be returned from the `checkForFood` function?

</section>

<section class="dropdown">

### Answer

"Sorry, we aren't serving Quiche today."

Let's break it down:

1. The foodItem is "Quiche" and its type is "lunch".
2. The function checks if restaurant.menus[food.type] (which is restaurant.menus.lunch) includes food.name ("Quiche").
3. Looking at the restaurant object, we can see that "Quiche" is in the breakfast menu, not the lunch menu.
4. Therefore, the condition in the if statement will be false

</section>

## Applying What We've learned

Even if these concepts are new to you, you've actually been putting them into practice for awhile now! Let's take a deeper look into something familiar to you: **for loops**.

<section class="call-to-action">

### For Loop Practice

- Complete the exercises found on [this repl](https://replit.com/@hfaerber/bracketVsDotTryIt4#index.js).

</section>

<section class="note">

### Key Point #4

When we use dot notation, the JS interpreter looks in the object for a key that is an exact letter-by-letter literal match to whatever comes after the dot.

When we use bracket notation, the JS interpreter _evaluates_ everything between the brackets, _then_ looks in the object for a key that matches whatever the code between the brackets evaluated to.

</section>

<section class="call-to-action">

### Bracket vs Dot Notation Practice

- Complete the exercises found on [this repl](https://replit.com/@hfaerber/Bracket-vs-Dot-Notation-Review-Sample-Lesson#index.js).

</section>

<section class="checks-for-understanding">

### Reflect

In your notebook, answer the following questions:

- How does the JavaScript interpreter handle dot and bracket notation differently?
- When should you use dot notation? Bracket notation?
- What is a limitation of using dot notation? How does bracket notation address this?

</section>

## Ruby Comparisons

As you wrap up this lesson, let's consider the following comparisons between JavaScript and Ruby:

1. **Object Creation:**

   - Ruby: `obj = { key: "value" }`
   - JavaScript: `var obj = { key: "value" };`

2. **Accessing Properties:**

   - Ruby: `obj[:key]` or `obj["key"]`
   - JavaScript: `obj.key`; or `obj["key"]`;

3. **Adding New Properties:**

   - Ruby: `obj[:new_key] = "new value"`
   - JavaScript: `obj.newKey = "new value";` or `obj["newKey"] = "new value";`

4. **Nested Objects/Hashes:**

   - Ruby: `obj[:nested][:deeply_nested]`
   - JavaScript: `obj.nested.deeplyNested`;

## Summary

In this lesson, you've learned:

1. The difference between dot and bracket notation in JavaScript
2. When to use each type of notation
3. How to work with variables as object keys
4. The similarities and differences between JavaScript object notation and Ruby hash notation

Remember, dot notation is generally preferred for its simplicity, but bracket notation is necessary when working with variables or special property names.

<section class="call-to-action">

### Homework (Optional and Spicy! 🌶)

- Complete the code challenges found on [this repl](https://repl.it/@kaylaewood/bracketVsDotHomework).
- These are tough! Do what you can. Stuck? Look [here](https://repl.it/@kaylaewood/bracketVsDotHomeworkAnswers#main.js).
- Answer the questions found in the JavaScript section of [this codepen](https://codepen.io/kaylaewood/pen/wvGrQxV?editors=1010).

</section>

## Further Resources

- [MDN Web Docs: Working with Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects)
- [Ruby Documentation: Hash](https://ruby-doc.org/core-3.0.0/Hash.html)
