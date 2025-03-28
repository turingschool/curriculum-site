---
title: Intro to Cypress Testing
length: 3 hours
tags: Cypress, testing
module: 3
---

<section class="call-to-action">
### Prework:

Before this lesson, be sure you have worked through **[this prework](./intro_to_cypress_prework){:target='blank'}** to complete the necessary set-up steps.

When we start the lesson you should have the Feedback Loop api ready and running and the Feedback Loop UI ready and running - with Cypress installed and the 3 specific spec files set up in your e2e directory.  
</section>

## Learning Goals:
* Become familiar with what Cypress is
* Practice testing a React application with Cypress including:
  * Filling out forms and switching routes
  * Intercepting and stubbing network requests
  * Happy and sad path user flows 
* Understand how acceptance testing & end-to-end testing differ from unit & integration testing

##  What is Cypress?

Cypress is an automated testing tool used for the functional aspects of web applications.  
<section class="dropdown">
### Major Features of Cypress

Here are a list of major features pulled from the [documentation](https://docs.cypress.io/guides/overview/why-cypress.html#Features){:target='blank'}

* **Time Travel:** Cypress takes snapshots as your tests run. Hover over commands in the Command Log to see exactly what happened at each step.
* **Debuggability:** Stop guessing why your tests are failing. Debug directly from familiar tools like Developer Tools. Our readable errors and stack traces make debugging lightning fast.
* **Automatic Waiting:** Never add waits or sleeps to your tests. Cypress automatically waits for commands and assertions before moving on. No more async hell.
* **Spies, Stubs, and Clocks:** Verify and control the behavior of functions, server responses, or timers. The same functionality you love from unit testing is right at your fingertips.
* **Network Traffic Control:** Easily control, stub, and test edge cases without involving your server. You can stub network traffic however you like.
* **Screenshots and Videos:** View screenshots taken automatically on failure, or videos of your entire test suite when run from the CLI.
* **Cross browser Testing:** Run tests within Firefox and Chrome-family browsers (including Edge and Electron) locally and optimally in a Continuous Integration pipeline.
</section>

### The Big Picture
We'll be using Cypress in two main ways:
1. Simulating the user's interactions with the various features of our application, making assertions about when and where the user will encounter the various elements on the DOM
2. Intercepting the real network requests our application makes, and simulating a mock _response_ from our API when a real network request is made. 

Consider the following code and write down your responses to the questions:
 - Which parts of this code align with the 1st way we'll be using Cypress? How do you know?
 - Which parts of this code align with the 2nd way we'll be using Cypress? How do you know?
- What are some reasons we might want to avoid hitting our API with our test suite?
- How do these tests give us confidence that our app is working as intended?

```js
  beforeEach(() => {
    cy.intercept("GET", "https://api.openbrewerydb.org/breweries?by_city=savannah", {
      statusCode: 200,
      fixture: "savannah_breweries"
    })
    .visit("http://localhost:3000/")
  });

  it("should have a form to enter a city and display that city's breweries", () => {
    cy.get("input[name='city']").type("savannah")
    .get(".search-button").click()
    .get(".breweries-container").find(".brewery-card-wrapper").should("have.length", 2)
    .get(".brewery-name").first().contains("h2", "Moon River Brewing Co")
    .get(".brewery-name").last().contains("h2", "Two Tides Brewing Company")
    .get(".brewery-location").first().contains("p", "Savannah, Georgia")
  });
```

With the two main ways we'll be using Cypress in mind, take some time to play around with the Feedback Loop UI application as a user.  Try to identify and list some user flows within this application - what can a user see and what can they do.  

### Enough talk already
Let's experiment ourselves and see how great Cypress is firsthand.  Your Feedback Loop UI and Feedback Loop Api should already be up and running.  Open cypress from within the FE repo using the command you set up as a script in `package.json`.  *Likely `npm run cypress` or `npm run cypress:open`.*  Select **E2E Testing**, then **Chrome** for your browser, then the **Start E2E Testing in Chrome** button.

We should have 3 spec files set up from the prework: `login_spec.cy.js`, `dashboard_spec.cy.js` and `form_spec.cy.js`.  We could have chosen to use one giant file and test absolutely everything in there.  But its probably more maintainable and intuitive to group up our related user flows into their own files.

<section class="note">
### Note

Notice that each of these describes actions tied to our data/server/network requests. When viewing feedback from coworkers, there are several different user flows. But they all involve GETTING feedback data from the back end.

Figuring out how to group user flows/stories can be tricky, and ultimately there are no hard-and-fast rules about how to do so. Over time, you'll develop a sense of what to put together, just like how you are learning what to break out into a React component and what to leave as is. And, of course, these conventions change from team to team.
</section>

Inside `login_spec.js`, we'll first write a dummy test to make sure things are hooked up correctly.

```js
describe('Feedback Loop login flows', () => {
  it('Should confirm that true is equal to true', () => {
    expect(true).to.equal(true)
  });
});
```

Move over to the [Cypress Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview){:target='blank'} and click on the `login_spec.js` and prepare to be amazed!  Did it pass?  Look at the [Command Log](https://docs.cypress.io/guides/core-concepts/test-runner.html#Command-Log){:target='blank'} and notice the assertion being made.  Then try changing `true` to `false` and see if it fails.

<section class="call-to-action">
### User Flows

This is great and all but let's think about what we actually need to test.  Remember that Cypress is especially useful for testing `user flows` on our applications.  List out a few user flows for the beginning of our application. (Hint: Refer to the user flows you brainstormed in the pre-work!)
<section class="dropdown">
### Beginning User Flows  

* As a user, I should be able to visit `http://localhost:3000` and see a title & form displayed.
* As a user, I can select different inputs and fill them out.
* As a user, I will receive an error message when I click the Submit button without filling out both inputs
* As a user, I can fill out the `email` and `password` inputs and click the Submit button and be directed to a different URL.  **Happy Path**
* As a user, I will receive an error message that my email and password don't match if I submit incorrect `email` and `password` inputs.  **Sad Path**
</section>
</section>


### Testing Our First User Flow

Now that we've identified some user flows, let's get to testing (finally)! First, let's focus on this user flow:

**1a. As a user, I should be able to visit `http://localhost:3000` and see a title & form displayed.**

* Write a test that asserts that a user can visit `http://localhost:3000` using the [visit](https://docs.cypress.io/api/commands/visit.html#Syntax) command.
* In the same `it` block, check to make sure that our site [contains](https://docs.cypress.io/api/commands/contains.html){:target='blank'} the correct title text. 
* Then, check to make sure our site can [get](https://docs.cypress.io/api/commands/get.html#Syntax){:target='blank'} the displayed form and that it [contains](https://docs.cypress.io/api/commands/contains.html){:target='blank'} the correct header text within the form.
* Run your test to ensure no errors so far. Take note of any errors that you get in the `Test Body` of the **Command Log**.

**1b. Adding onto the same flow, as a user, I can select the inputs, fill them out, as confirm that each input's value matches what I typed.**
* In the same `it` block, get the *email* input field, [type](https://docs.cypress.io/api/commands/type.html){:target='blank'} "leta@turing.io" into that field.  This is the user action we're simulating in Cypress. Now we need to assert against the results of that action.
* Assert that the email input field [should](https://docs.cypress.io/api/commands/should.html#Syntax){:target='blank'} have the same value as whatever you typed into it.
* Get the *password* input field, type "keane20" into that field. 
* Assert that the email input field [should](https://docs.cypress.io/api/commands/should.html#Syntax){:target='blank'} have the same value as whatever you typed into it.
* Take note of any errors that you get in the `Test Body` of the **Command Log**.

This test might feel a bit unnecessary and overly simple - but it's valuable.  Thinking about controlled forms, what are we actually testing here?


<section class="note">
### Note - Your React app must be running in order for Cypress to work

If your test fails when trying to load your site, this might be because Cypress is actually trying to visit your page, but your server is not running. Make sure your React App server is running in a separate tab on your terminal! You do not need to have the API server running, though.
</section>

<section class="dropdown">
### Possible Solution - challenge yourself to try before looking!

```js
// login_spec.js

describe('Feedback Loop login', () => {
  it('Should be able to visit page, render correct elements, and hold values in inputs', () => {
    cy.visit('http://localhost:3000')
      .contains('Feedback Loop')
      .get('form').contains('h2', "Please Sign In")
      .get("input[name='email']").type("leta@turing.io").should('have.value', 'leta@turing.io')
      .get("input[name='password']").type("keane20").should('have.value', 'keane20')
  });
});
```

Note that we can chain multiple methods to make multiple assertions!
</section>

Before we continue, let's add in the following block:

```js
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
```
<section class="dropdown">
### Why use beforeEach? Consider the reasons before reviewing the explanation below.

- This helps to ensure that we start anew before each test.  A [best practice](https://docs.cypress.io/guides/references/best-practices.html#Having-tests-rely-on-the-state-of-previous-tests){:target='blank'} is that tests should always be able to run independently from one another and *still pass*.  
- A **common pitfall** is adding code to the beforeEach that isn't needed by every `it` block.  If it's not used by every single `it` block, it doesn't belong in the beforeEach - put it directly into `it` blocks that needed it instead.
</section>


<section class="note">
### Did You Know?

In the test runner, you can actually hit `command + option + i` to open up your DevTools!  Instead of looking at your code, use your DevTools to find the necessary elements you need to query.

To add the React Dev Tools to your cypress browser window, take a look at [this blog post](https://www.cypress.io/blog/2020/01/07/how-to-load-the-react-devtools-extension-in-cypress/){:target='blank'}.
</section>

**2. User flow to test:** I will receive an error message when I click the Submit button without filling out both inputs.

* Write another test - in a new `it` block - that asserts an error message is displayed when the Submit button is [clicked](https://docs.cypress.io/api/commands/click.html){:target='blank'} without filling both inputs.

<section class="note">
### Note - Never end a test on a "click"

Why?  Because to test any user flow, we need to walk Cypress through simulating some user action. *Then*, we assert against whatever the user should see on the DOM as a *result* of that action.  The `click` is the action, so its only getting us halfway there.  We always need to add assertions after.

Here is a link to [commonly used assertions](https://docs.cypress.io/guides/references/assertions.html#Common-Assertions) in Cypress!
</section>

<section class="dropdown">
### Solutions  

```js
  it('should display an error message when a user clicks the Submit button without filling both inputs', () => {
    cy.get('button').click() //This is the user action we're simulating.
    cy.get('p').contains('Please fill out both inputs.')  //This is where we're asserting against whatever we expect as a result of that user action.
  });
```
</section>



### Writing tests involving network requests

**User Story:** As a user, I can correctly fill out the `email` and `password` inputs and click the Submit button and be directed to a different URL.

* This builds off of what we have done previously, however we now want to test that when we log in successfully, our app takes us to a new url - `http://localhost:3000/dashboard`.  It's okay if the page doesn't display all of the data on the next page, just assert that the url has updated for now.

<section class="note">
### Note

Upon filling out the form and submitting, you will likely run into a new error, `Failed to fetch`.  This is because it is trying to access our API.  In order to write a *true* end-to-end test, you could startup the server driving the application the same way a real user would.  These are important around testing your application's *critical paths* especially around **happy paths**.  

There are some downsides however:
* Because this is sending real responses, you normally would need to *seed a database* separate from your actual user's info.  (We don't want to be making accidental changes to our user's information and settings.)
* This can slow the performance of your tests as a result of doing real network requests.
* It is also more difficult to test edge cases.

For now (and throughout Mod 3), we will instead use [stubbing](https://docs.cypress.io/guides/guides/network-requests.html#Stub-Responses){:target='blank'} and [intercepting](https://docs.cypress.io/api/commands/intercept.html#Comparison-to-cy-route){:target='blank'} to control our network responses. Although both types of tests are important, stubbing is much more common and allows you to control the response body, status, and headers while also making your tests more performant.
</section>

<section class="dropdown">
### Potential Solution  

```js
  it('should be able to fill out the email and password and click Submit, directing the user to a different page', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/login', {
        statusCode: 201,
        body: {
          id: 2,
          image: "https://ca.slack-edge.com/T029P2S9M-U37MJAV0T-007ccf2f5eb2-512",
          name: "Leta Keane"
        }
      })
      .get('input[type="email"]').type('leta@turing.io')
      .get('input[type="password"]').type('keane20')
      .get('button').click()
      .url().should('include', '/dashboard')
  });
```
</section>

Note that in our solution we are just intercepting the `POST` request for logging in and mocking out what the expected response would look like. Our dashboard is blank because we haven't mocked out the other network requests; this is something we'll test later on in our dashboard spec.

*How can we tell which network requests have and have not been properly stubbed?*

For now, all we are asserting is that our URL has updated to the page we expect to view when we are logged in.  To thoroughly test this user flow, we'd also want to assert for all the elements and data we expect to see on the DOM. 

### Testing the Sad Path to a Network Request

**User flow to test:** I will receive an error message that my email and password don't match if I submit incorrect `email` and `password` inputs.

* Take what you learned from the exercise to **stub** a `401` response if a user fails to login.  Assert that a new error message is displayed.

<section class="dropdown">
### Solution  

```js
  it('should display an error message if I submit an incorrect email and password', () => {
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/login'
    },
    {
      statusCode: 401,
      body: {
        message: `Email and password do not match.  Please try again.`
      }
    })
    .get('input[type="email"]')
    .type('leta@turing.io')
    .get('input[type="password"]')
    .type('YOLO')
    .get('button').click()
    .get('p').should('contain', 'Email and password do not match.  Please try again.')
  });
```

Once again we have intercepted the `POST` request, but this time changed the statusCode to be a 401 along with a body including an error message.  You can follow the functionality in the `signInUser` method of `LoginForm` to confirm.  
</section>

<section class="note">
### Handy `should` arguments cheatsheet

Take note of the different arguments passed through `should` when checking the values of an element on the page.  

* **Input:** `.should('have.value', [some value])`.
* **URL:** `.should('include', [some url])`
* **Other DOM elements:** `.should('contain', [some text]')`.
</section>

## Testing the Dashboard view

Let's get a little more practice with intercepting network requests, by testing our Dashboard view.

In our `dashboard_spec.js` file, let's pseudocode the user flows we should be testing.

- After I login successfully, I should see the dashboard, complete with feedback from my teammates, as well as seeing teammates I have/haven't left feedback for.

As you can see by digging through `App.js` and `Dashboard.js`, the way this code is constructed, there are no error messages when there is no appropriate user data. This is probably something we should fix in the future, but for now, we'll only worry about testing the happy path.
<section class='dropdown'>
### Possible Solution

**(hint: you only need to run a single spec file at a time)**
- We need to have our login on the dashboard within our beforeEach, since we are starting a new spec file, and our dashboard spec is dependent on a user being logged in.
- Our dashboard spec is dependent on our feedback request,teammates request, the user's data and their teammates data so we need to stub those network requests as well.
- 

```js
// dashboard_spec.js
describe('Dashboard view', () => {
    beforeEach(() => {
      // Login the user and stub the network requests 
      cy.intercept('POST', 'http://localhost:3001/api/v1/login', {
        statusCode: 201,
        body : {
          id:2,
          image: "https://ca.slack-edge.com/T029P2S9M-U37MJAV0T-007ccf2f5eb2-512",
          email: 'leta@turing.io',
          password: 'keane20'
        }
      })
      // Stub the network requests for the user's teammates
      cy.intercept(`http://localhost:3001/api/v1/users/2/teammates`, {
      "teammates": [
        {
          email: "hannah@turing.io",
          id: 1,
          image: "https://ca.slack-edge.com/T029P2S9M-UPE0QSWEQ-d4bebe6f4d88-512",
          name: "Hannah Hudson",
          delivered: false
        },
        {
          email: "khalid@turing.io",
          id: 3,
          image: "https://ca.slack-edge.com/T029P2S9M-UDR1EJKFS-9351230a5443-512",
          name: "Khalid Williams",
          delivered: true
        }
      ]
    });
    // Stub the network requests for the user's feedback
    cy.intercept(`http://localhost:3001/api/v1/users/2/feedback`, {
      feedback: [
        {
          feedback: "Your feedback game is TOO strong.",
          senderId: 4,
          receiverId: 2
        },
        {
          feedback: "I appreciate your positive energy and how hard you work in supporting both students and other instructors alike.",
          senderId: 11,
          receiverId: 2
        }
      ]
    });
    // Stub the network requests for the user's data
     cy.intercept("GET", "http://localhost:3001/api/v1/users/4", {
      id: 4,
      name: "Scott Ertmer",
      image: "https://ca.slack-edge.com/T029P2S9M-UJ910QEJF-7244f37f7e12-512",
      email: "scott@turing.io",
      password: "ertmer20",
    });
    cy.intercept("GET", "http://localhost:3001/api/v1/users/11", {
      id: 11,
      name: "Travis Rollins",
      image: "https://ca.slack-edge.com/T029P2S9M-U4R41TZD2-7661f06e8c71-512",
      email: "travis@turing.io",
      password: "rollins20",
    });
    cy.visit('http://localhost:3000/')
  })
})
```
**As you see our beforeEach is doing a lot of things, this is a good example of where we would refactor our code to make our tests more performant.**
- We can create fixtures to help us with this.
- If you are interested in refactoring this test even further, look into the Want to learn more box at the end of this lesson. 
</section>

### Using Fixtures to Simplify Intercepts
Fixtures are a great way to manage and reuse static data in your tests. Let's walk through using a fixture for one of the intercepts above.
First, create a fixture file. In your cypress/fixtures directory, create a file named teammates.json and add the following content:
First, create a fixture file. In your cypress/fixtures directory, create a file named teammates.json and add the following content:

```json
{
  "teammates": [
    {
      "email": "hannah@turing.io",
      "id": 1,
      "image": "https://ca.slack-edge.com/T029P2S9M-UPE0QSWEQ-d4bebe6f4d88-512",
      "name": "Hannah Hudson",
      "delivered": false
    },
    {
      "email": "khalid@turing.io",
      "id": 3,
      "image": "https://ca.slack-edge.com/T029P2S9M-UDR1EJKFS-9351230a5443-512",
      "name": "Khalid Williams",
      "delivered": true
    }
  ]
}
```
Next, update your test to use this fixture:

```js
cy.intercept(`http://localhost:3001/api/v1/users/2/teammates`, {
  statusCode: 200,
  fixture: 'teammates' // <<< Name of your fixture file 
});
```

### Using body to pass in mock data

You can also pass in mock data using the `body` argument. This is when you have smaller mock data that you want to pass in. 
Choosing between using `fixture` or `body` is dependent on what you are working with, but both are good to know and use. 

```js
cy.intercept("GET", "http://localhost:3001/api/v1/users/11", {
  statusCode: 200,
  body: {
    id: 11,
    name: "Travis Rollins",
    image: "https://ca.slack-edge.com/T029P2S9M-U4R41TZD2-7661f06e8c71-512",
    email: "travis@turing.io",
    password: "rollins20",
  }
}
```

<section class="checks-for-understanding">
### Exit Ticket

* What is acceptance testing and how is it different from unit and integration tests?
* What is Cypress and how is it different from other testing frameworks you've used in the past?
* Should you include tests that utilize the API (end-to-end) or should you stub the network requests?  Is there an argument for both?
</section>

### Building From Here
Remember, this lesson and it's activities are just an *introduction* to the world of testing with Cypress.  We've only scratched the surface.  In order to build your knowledge, fluency and skill to the level needed to succeed in Mod 3 and beyond, you will need to spend significant time in the Cypress documentation and getting your hands dirty with practice.  In project-based learning, your projects will be your primary platform for learning.  The feedback you get from that project work is what will help guide you towards further research and really help you level up your skill.
<section class="dropdown">
### Want to learn more?

As we saw in our `login_spec.js` file, logging in takes a few steps. We have to find the inputs, type the appropriate data in, and click our login button.

We can actually automate this process by creating a custom [Cypress command](https://docs.cypress.io/api/cypress-api/custom-commands){:target='blank'}.
<!--  This is where I need to move this into a box as this is not required in M3 -->
<section class="note">
### Caution

In today's example, we're going to create a command to login to the dashboard by using our app's UI. This is actually an anti-pattern. In `login_spec.js`, we already tested that our login UI works! By creating a command that does this same thing, we're simply creating redundant code that does nothing to make us feel more confident about our code.

In complex applications with dozens or hundreds of user flows to test, all of which depend on first being logged in, having Cypress go through the UI to login (aka finding and typing into form fields, clicking buttons, waiting for new pages to render, etc) would make our tests take FOREVER to run.

We are forced to use the app's UI to login today because of the way we've written our app - this is a GREAT example of how when our tests are difficult, it indicates that perhaps we should refactor our implementation code. Perhaps instead of having our login form directly set the state of App with a user, and all the results of the subsequent network requests listed in `updateUser`, we could set the user info in localStorage and rely on a hook to conduct the rest of the fetches. That would allow us to use a custom command to just put the user data in localStorage, rather than having to go through the rigamarole of filling in fields and stubbing the POST request.

To learn about creating a custom login command that does not have to go through the UI of an app, you can watch [this conference talk](https://youtu.be/5XQOK0v_YRE?t=925) from the creator of Cypress. The video starts partway through, and shows you the creation of a custom command.
</section>

Inside the `cypress` directory, you'll find another directory called `support`. Inside that are two files:
- `commands.js`
- `e2e.js`

Before we replace the commented out code in `commands.js`, let's take a look at the `App.js` file and see what happens when we click our login button.

1. We fetch our teammate information (populates the right-hand sidebar of the app)
1. We fetch our feedback (populates the left-hand main page and shows us the feedback our teammates have left for us)
1. We get additional ifo (if necessary)
1. We set state with the new information using our hook.

This means our new command will need to:

1. stub our POST network request to login
1. stub our GET network request to get our teammates
1. stub our GET network request to get our feedback
1. find the form inputs, fill them out, and click the button, redirecting us to the `/dashboard` page

Research the [Cypress docs](https://docs.cypress.io/api/cypress-api/custom-commands){:target='blank'} and see what you can come up with!

<section class="answer">
### Try your best before you peek!

Our command might look something like this:
<!--  We can pull something out of this and explore the rest on your own. 
it's not a piority to learn commands, but it's good to know,  -->
```js
// commands.js

Cypress.Commands.add('login', () => {
  const baseURL = 'http://localhost:3001/api/v1';

  // stub our login in network request
  cy.intercept('POST', `${baseURL}/login`, {
    statusCode: 201,
      body: {
        id: 2,
        image: "https://ca.slack-edge.com/T029P2S9M-U37MJAV0T-007ccf2f5eb2-512",
        name: "Leta Keane"
      }
  });

  // stub our teammate network request
  cy.intercept(`${baseURL}/users/2/teammates`, {
      "teammates": [
        {
          email: "hannah@turing.io",
          id: 1,
          image: "https://ca.slack-edge.com/T029P2S9M-UPE0QSWEQ-d4bebe6f4d88-512",
          name: "Hannah Hudson",
          delivered: false
        },
        {
          email: "khalid@turing.io",
          id: 3,
          image: "https://ca.slack-edge.com/T029P2S9M-UDR1EJKFS-9351230a5443-512",
          name: "Khalid Williams",
          delivered: true
        }
      ]
    });

  // stub our feedback network request
  cy.intercept(`${baseURL}/users/2/feedback`, {
    feedback: [
      {
        feedback: "Your feedback game is TOO strong.",
        senderId: 4,
        receiverId: 2
      },
      {
        feedback: "I appreciate your positive energy and how hard you work in supporting both students and other instructors alike.",
        senderId: 11,
        receiverId: 2
      }
    ]
  });

  // stub Scott's user data
  cy.intercept("GET", "http://localhost:3001/api/v1/users/4", {
    id: 4,
    name: "Scott Ertmer",
    image: "https://ca.slack-edge.com/T029P2S9M-UJ910QEJF-7244f37f7e12-512",
    email: "scott@turing.io",
    password: "ertmer20",
  });

  // stub Travis's user data
  cy.intercept("GET", "http://localhost:3001/api/v1/users/11", {
    id: 11,
    name: "Travis Rollins",
    image: "https://ca.slack-edge.com/T029P2S9M-U4R41TZD2-7661f06e8c71-512",
    email: "travis@turing.io",
    password: "rollins20",
  });

  // Fill in our UI to trigger the network requests and send us to /dashboard
  cy.visit('http://localhost:3000/')
    .get('input[name=email]').type('leta@turing.io')
    .get('input[name=password]').type('keane20')
    .get('button').click()
})
```
</section>

Let's see this in action. In our test file `dashboard_spec.js`, write a `describe` block with an `it` block that checks to see the title of the page. Use a `beforeEach` to call the custom login command.

<section class="answer">
### Try it before looking here

One possible solution:

```js
describe('Dashboard view', () => {

  beforeEach(() => {
    cy.login();
  })

  it('should render the title', () => {
    cy.contains('h1', 'Feedback Loop');
  });
});
```
</section>

Now that that is written, run this spec **(hint: you can run a single spec file at a time)**.

We can see two pieces of feedback and two teammates rendered.

<section class="call-to-action">
### Try it yourself

Now try to write more into this test to find and verify the rest of the information on the page: the two pieces of feedback, and the two teammates.
</section>

<section class="answer">
### Try it before looking here

One possible solution:

```js
describe('Dashboard view', () => {

  beforeEach(() => {
    cy.login();
  })

  it('should render the title, feedback, and teammates', () => {
    cy.contains('h1', 'Feedback Loop');
    cy.contains('.feedback', 'Scott Ertmer')
    cy.contains('.feedback', 'Your feedback game is TOO strong');
    cy.contains('.feedback', 'Travis Rollins');
    cy.contains('.feedback', 'I appreciate your positive energy and how hard you work in supporting both students and other instructors alike.');
    cy.contains('.team', 'Hannah Hudson');
    cy.contains('.team', 'Khalid Williams');
  });
});
```
</section>

### Note about mocking data

Many of the projects you will be working on often require that you load a significant amount of data. To take the above example to the next step, we would need to load a user's teammates.  To help with readability of our tests, it would be good to use a [fixture](https://docs.cypress.io/api/commands/fixture.html#Syntax){:target='blank'} to load a fixed set of data from another file.

### Testing the form

See what you can do on your own!

Here's a `beforeEach` to get you started:

```js
beforeEach(() => {
    cy.login();

    // This selects the teammate who we have not given feedback to
    cy.get(".highlight").click();
  });
```

And let's make a list of functionality to test:
1. "should show the feedback form"
1. "should be able to fill in the feedback form"
1. "should be able to submit the form and see confirmation message"
1. "should be able to return to the dashboard & see status change"

The [documentation](https://docs.cypress.io/api/api/table-of-contents.html){:target='blank'} that Cypress offers is a great place to start as you become more and more proficient in testing.  With time, you can even drive your implementation through TDD with Cypress.


</section>

## Resources

- The official [Cypress Documentation](https://docs.cypress.io/guides/overview/why-cypress)
  - Pay particular attention to the following pages in the docs:
    - [Best Practices](https://docs.cypress.io/guides/references/best-practices)
    - [aliasing](https://docs.cypress.io/guides/core-concepts/variables-and-aliases)
    - [waiting](https://docs.cypress.io/guides/guides/network-requests#Waiting)
  
- Heather's [Cypress Tips & Tricks](https://turingschool.notion.site/Cypress-Tips-Tricks-8565977029cf48faa6003046c148a048?pvs=4) 