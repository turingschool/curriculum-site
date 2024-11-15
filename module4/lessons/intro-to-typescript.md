---
title: "Introduction to TypeScript"
length: 120
tags: typescript, javascript, type-checking, interfaces
module: 4
---

## Learning Goals
* Understand what TypeScript is and how it compares to JavaScript
* Learn the benefits of using TypeScript in development
* Get familiar with TypeScript's type system, including basic types, functions, and interfaces
* Understand how TypeScript can help prevent common JavaScript errors

## Vocab
- `TypeScript`: A typed superset of JavaScript that compiles to plain JavaScript.
- `Static Type Checking`: The process of verifying the type correctness of a program at compile-time.
- `Transpiling`: The process of converting TypeScript code into JavaScript code.
- `Type Annotation`: A way to explicitly declare the type of a variable or function parameter.
- `Interface`: A TypeScript structure that defines the shape of an object, specifying its properties and their types.

## Introduction to TypeScript
TypeScript (TS) is really just JavaScript (JS) with some added syntax! Everything you know about JavaScript still applies, but there are features of TypeScript added in. What are those added features? They all revolve around the idea that of a **typed** language, hence the name.  

TypeScript is a superset of JavaScript that introduces static type definitions. This means that TypeScript code must be transpiled into JavaScript before it can be executed by a browser or Node.js. TypeScript provides all the features of JavaScript but adds optional static typing, which can help catch errors early in the development process.

## JavaScript vs TypeScript
What does it mean for a language to be typed? Let's review the basic set of types available to us in JS: number, bigint, string, boolean, null, undefined, symbol, and object.

In JS, we can take a variable that holds one type and change it to another type. This is called **dynamic** typing because it can change.

```js
var user = "Alex";

user = 10; // This is ok to do with JS, but not TS

// TS will say "Type 'number' is not assignable to type 'string'."
```

TS will not allow this to happen. If a variable begins its life as one type, then it must remain that type. This is called **static** typing.

Similarly, we can and should declare function parameters and return values to be of a certain type in TS. Why is this useful?

```js
// How we might write it in JS
function addFive(num) {
  return num + 5;
}

// How TS wants us to be specific with parameters AND return value
function addFive(num: number): number {
  return num + 5;
}
```

TS prevents developers on your team accidentally passing in something other than a number into the `addFive` function. Declaring the return type also gives other developers more awareness of what the function will return. If we were to call `addFive` with a string in TS like this:

```js
addFive('5')

// We would see an error:
// "Argument of type 'string' is not assignable to parameter of type 'number'."
```

### Why Use TypeScript?
1. **Type Safety**: TypeScript's type system helps catch type-related errors at compile time, rather than at runtime.
2. **Enhanced IDE Support**: With TypeScript, you get better code completion, navigation, and refactoring support.
3. **Better Documentation**: Types serve as documentation, making it easier to understand and use code written by others.
4. **Scalability**: TypeScript is particularly useful for large codebases, where it can help manage complexity.

Overall, TS is useful for us as developers. There aren't big benefits in terms of performance for the user. It's a **development tool** that helps us predict errors before the code gets run (it helps to prevent "runtime errors").

At first, writing TS will be much slower than writing the same thing in JS. You'll have to look up how to define types and learn a whole new set of error messages. However, it will get faster, and the time saved not debugging as much will be worth it!

## Type Annotations
TypeScript allows you to annotate variables with types including all of the standard data types you have used in JavaScript like strings, numbers, booleans, arrays, and objects. This helps catch type errors at compile time.

Here are some examples of type annotations in TypeScript:

```ts
let age: number = 25;
let name: string = "Alice";
let isStudent: boolean = true;
let hobbies: string[] = ["reading", "hiking"];
let person: { name: string; age: number } = { name: "Bob", age: 30 };
```

<section class="call-to-action">
### Your Turn

**Example 1**
```js
let title = "TypeScript Basics";
let duration = 60;
let isComplete = false;
```

* Convert the above JavaScript code to TypeScript by adding appropriate type annotations.

**Example 2**
```ts
let score: number = "high";
```
* What error will the above TypeScript code produce?
</section>

<section class="answer">
### Solution
1. The solution to converting the variables would look like:
```ts
let title: string = "TypeScript Basics";
let duration: number = 60;
let isComplete: boolean = false;
```
2. The error will be a compile-time error because the type of the variable `score` is not a number.
</section>

<section class="note">
### A Note about `any`

TypeScript also supports a type called `any`, which means that a variable can be any type.  This is useful when you want to store a value of any type in a variable.  However, using `any` should be avoided because it disables type-safety.

An example of using `any` would look like:
```ts
let id: any = 101;
id = "E101"; // No error
```
</section>

### Union Types
In addition to type annotation, TypeScript also supports union types.  Union types allow a variable to hold more than one type.  Let's take a look at an example:

```ts
let id: number | string;
id = 101; // Valid
id = "E101"; // Also valid
```

In this example, the `id` variable can be either a number or a string.  This can be great for when you want to store different types in a single variable.

## TypeScript with Functions
TypeScript also allows you to specify the types of function parameters and return values.  Let's take a look at an example:

```ts
function add(a: number, b: number): number {
  return a + b;
}

let sum = add(5, 10); // Correct usage
let result = add("5", 10); // Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

Note that in the above TypeScript function add, we are defining a function that takes two parameters, `a` and `b`, both of which are of type number. The function is also specified to return a value of type number. If we try to pass in a string for the second parameter, TypeScript will throw an error.

<section class="note">
### Note: Default Values

TypeScript also supports default values for parameters.  Let's take a look at an example:

```ts
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greet("Alice"));
console.log(greet("Bob", "Hi"));
```

1. What do you expect the output to be for `console.log(greet("Alice"));`?
2. Similarly, what do you expect the output to be for `console.log(greet("Bob", "Hi"));`?
</section>

<section class="call-to-action">
### Checks for Understanding

1. Define a function in TypeScript that takes two numbers as arguments and returns the product. (*the returned value should be a number*).  
2. Now modify to the function to return a message instead: `The product of 2 and 3 is 6`. *Note the difference in output compared to the previous iteration. Did you get an error after having changed the return type?  If so, make sure to update the type annotation for the function to match the new return type.*
3. Modify the following function to include default parameter values for `taxRate` and `discount`:
```ts
function calculateTotalPrice(price: number, taxRate: number, discount: number): number {
  const taxAmount = price * taxRate;
  const discountAmount = price * discount;
  const totalPrice = price + taxAmount - discountAmount;
  return totalPrice;
}
```
</section>

## Interfaces

Interfaces in TypeScript define the shape of an object. They specify what properties an object should have and their types.

```ts
interface Person {
  name: string;
  age: number;
}

let student: Person = {
  name: "John",
  age: 21
};
```


### Complex Interface Example

In TypeScript, interfaces can be used to define more complex objects that include nested properties and arrays. Let's consider an example of an interface for a `Course` object that includes details about the course, the instructor, and the list of students enrolled.

```ts
interface Course {
  title: string;
  details: {
    description: string;
    duration: number;
  };
  instructor: string;
  students: string[];
}

let course: Course = {
  title: "TypeScript Basics",
  details: {
    description: "A course that introduces TypeScript",
    duration: 60
  },
  instructor: "John Doe",
  students: ["Alice", "Bob"]
};
```

Here is what is happening in the above example:

- The `Course` interface defines the shape of a `Course` object. It includes properties for the `title`, `details`, `instructor`, and `students`.
- The `details` property is an object that contains the `description` and `duration` of the course.
- The `students` property is an array of strings that represent the names of the students enrolled in the course.

The above example is a simple example of an interface. In a real-world application, you might have additional interfaces for an `Instructor` and a `Student`.

<section class="call-to-action">
### Your Turn

1. Define an interface for a `Student` object that includes the student's name and the courses they are enrolled in.
2. Define an interface for a `Instructor` object that includes the instructor's name and the courses they teach.
3. Then define objects that implement both interfaces.
</section>

<section class="answer">
### Potential Solution

```ts
interface Student {
  name: string;
  courses: string[];
}

let student: Student = {
  name: "Alice",
  courses: ["TypeScript Basics", "Advanced TypeScript"]
};
```

```ts
interface Instructor {
  name: string;
  courses: string[];
}

let instructor: Instructor = {
  name: "Jane Eyre",
  courses: ["TypeScript Basics", "Advanced TypeScript"]
};
```
</section>

<section class="note">
### Extending Interfaces

TypeScript allows you to extend interfaces using the `extends` keyword. This is useful when you want to add new properties to an existing interface.

```ts
interface Course {
  title: string;
  details: {
    description: string;
    duration: number;
  };
  instructor: string;
  students: string[];
}

interface AdvancedCourse extends Course {
  isAdvanced: boolean,
  prerequisites: string[],
}

let advancedCourse: AdvancedCourse = {
  title: "Advanced TypeScript",
  details: {
    description: "A course that introduces advanced TypeScript concepts",
    duration: 90
  },
  instructor: "Jane Doe",
  students: ["Charlie", "Dave"],
  isAdvanced: true,
  prerequisites: ["TypeScript Basics"]
};
```

In this example, we've extended the `Course` interface to include a new property `isAdvanced` that indicates if the course is for advanced learners. We've also added a new property `prerequisites` that indicates the list of prerequisites for the course.

1. Can you think of any other properties that might be useful to add to the `Course` interface?
2. Can you think of another use case for extending an interface?
</section>

<section class="checks-for-understanding">
### Additional Practice

1. Create an interface for a `Car` that includes properties for `make`, `model`, and `year`.
2. Extend the `Car` interface to create a `ElectricCar` interface that also includes a property for `batteryCapacity`.
3. Define an object that implements the `ElectricCar` interface.
</section>

## Conclusion

TypeScript offers powerful tools to write safer and more robust code compared to JavaScript. By understanding and using its type system, interfaces, and advanced features like generics, developers can catch errors early, improve code readability, and manage large codebases more effectively.

<section class="note">
### Incorporating TypeScript in Future Projects

Implementing TypeScript in an application that interacts with the DOM will require some extra research on your part.  We suggest starting your research by looking into how TypeScript can handle the `event` object.  Setup instructions to add TypeScript into your group project are already included in the `README.md` file.  We'll also have an opportunity to practice TypeScript in a coding challenge this Friday!
</section>

<section class="checks-for-understanding">
### Final Checks for Understanding

Using your journal, take a few minutes to answer the following questions:

1. What are the benefits of using TypeScript over JavaScript?
2. How do type annotations help prevent errors in your code?
3. What are interfaces in TypeScript and how do they improve code quality?
</section>

<section class="call-to-action">
### Looking for Additional Practice?

You can continue to get extra practice converting JavaScript into Typescript with the following exercise.  Clone down this [repo](https://github.com/turingschool-examples/js-to-typescript-practice){:target="_blank"} and follow the instructions in the `README.md` to complete the exercise.

Once you have finished the exercise, you can compare your solution to the solution in the `ts-solution` branch.
</section>
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html){:target="_blank"}
- [TypeScript Playground](https://www.typescriptlang.org/playground/){:target="_blank"}
- [TypeScript for Beginners](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html){:target="_blank"}

