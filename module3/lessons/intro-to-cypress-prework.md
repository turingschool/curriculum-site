---
title: Intro to Cypress Testing
length: 1 hour
tags: Cypress, testing
module: 3
---
<!-- Keep the pre-work seperated from the lesson 
Pre-work needs to be moved to the new curriculum site 
- I think we make this lesson too long, and pin pointed, part of the pre-work, small react app 
- ideabox repo few test files and written out and then after they look through the item, this is how we do E2E testing, let us show them 
look how to typing in the value and look how the post works, and corresponding test suits. 
before feedback - section some other application and something similar and has the test suit and make sense of it
now download these 2 repos and setup the cypress and see functional test suits. 
What si on the page load.

 -->
## Prework:
In this lesson, we're going to be working with a new codebase and testing multiple scenarios to explore the power of end-to-end tests and the tools **Cypress** provides.  

Before working on this repo, let's look at the our beloved Ideabox application. 
We do know that in our Ideabox, we have a page that contains a list of ideas and a form to add new ideas. Let's see how to add a few Cypress test files to test the following user flows: 
- As a user, I want to be able to see the title of the application. 
- As a user, I want to be able to see the form to add a new idea. 
- As a user, I want to be able to see the list of ideas on the dashboard when I load the page. 
- As a user, I want to be able to add a new idea to the list.
### Step 1
We need to setup the Cypress testing framework in our application. 
Let's add the Cypress npm package to our application. 
```bash
npm i -D cypress
```
Next, we need to add a script to our `package.json` file to run Cypress. 
```js
{
  "scripts": {
    "cypress": "cypress open"
  }
}
```
Now it's time to run Cypress. 
```bash
npm run cypress
```
This will open the Cypress Test Runner, a user-friendly interface for managing your tests. Follow these steps to create your first test file:

1. In the Cypress Test Runner, you'll see a list of browsers. Select "Chrome" (or your preferred browser).

2. Click the "Create new spec" button in the top right corner.

3. A dialog will appear. Enter `dashboard_spec.cy.js` as the file name.

4. Click "Create spec" to generate the new test file.

5. Cypress will create the file and show it in the list of specs.
6. Go back to your text editor and open the `dashboard_spec.cy.js` file. You can see the file structure in the IDE.and the code that was generated for us. 

This process creates a new test file specifically for testing your dashboard functionality. As you become more familiar with Cypress, you'll find this interface makes it easy to organize and manage your test suite.
Here is the code that was generated for us:
```js
describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})

```
Ok now we have the file structure lets tweak the test to see how it works. 
First lets make sure that our application is running and we can navigate to it in the browser. 
Now lets go back to our test file and make sure that we can navigate to the dashboard, we need to change the `cy.visit` to navigate to `http://localhost:3000`.

Here is the Cypress UI running our test and opening the application inside the Cypress UI.

![Cypress UI](./assets/cypress-ui.png)

As you can see Cypress is running our test and opening the application in the Cypress UI for us to see the results. It looks like our test is also running the fetch call to get the ideas and display them on the page. 
But before we go on, with writing tests for our GET request, fist go back to our user flow and see what else we need to test. Based on the user flow we have we want to make sure the dashboard has a title, a form to add a new idea, and a list of ideas. 
Let's add our first it block test to make sure that the title is displayed on the page. What Cypress helping us here is to make sure that our React application is rendering the correct content to the DOM for our end users. 
Here is the code for the test: 
```js
it('displays the application title', () => {
    cy.get('h1').should('contain', 'IdeaBox')
  })
```
It looks like our test is not passing, as the application is only get visited in the first test and not in the second it block. 
In order to run the visit before every it block we need to add a `beforeEach` hook to our test. 
<section class="note">

`beforeEach` is aCypress test hook that allows you to run a set of commands before each test (it block) in a describe block
</section>
Let's add that to our test. 

```js
describe('Dashboard', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })
})
```
Now before each test, Cypress will visit the application and run the test. 
- In real-world scenarios, users typically start from a fresh page load.
- This approach more closely mimics actual user interactions.
- Also, it's a good practice to have a fresh page load so each test is independent and does not rely on the results of another test.

Now our H1 title test is passing, let's add our second test to check if the form is displayed on the page. 
```js
  it('displays the form ', () => {
    cy.get('form').should('exist')
    cy.get('form input[type="text"]').should('exist')
    cy.get('form input[name="description"]').should('exist')
    cy.get('form button').should('exist')
  })
```
Next we want to check if the list of ideas is displayed on the page. 
```js
  it('displays the list of ideas', () => {
    cy.get('.ideas-container').should('exist')
    cy.get('.ideas-container').should('have.length.at.least', 1)
  })
```


**Clone down the following the repos:**

**[UI](https://github.com/turingschool-examples/feedback-loop-ui){:target='blank'}**
```bash
git clone https://github.com/turingschool-examples/feedback-loop-ui.git
cd feedback-loop-ui
npm i
npm start
```

**[API](https://github.com/turingschool-examples/feedback-loop-api){:target='blank'}**
```bash
git clone https://github.com/turingschool-examples/feedback-loop-api.git
cd feedback-loop-api
npm i
npm start
```

Once you have application running, spend 15 minutes using the application and examining the FE code to see how the application runs. *The fake log-in information is located in [this file](https://github.com/turingschool-examples/feedback-loop-api/blob/main/mockData/users.js){:target='blank'}.* It's not important to understand every line of code, but take note of the various user flows and how the various API calls work.

For example, you don't need to know how Router works. Instead, use the application and see how the URL changes as you navigate through the website.

### Setting Up Cypress
You'll need to use the Cypress docs to figure out how to get it set up in your repo.  This might feel uncomfortable and unfamiliar, thats ok - these docs ARE unfamiliar to you right now. Take your time working through them.  Ask questions in your cohort channel if you get stuck - but only ***after*** doing some research and troubleshooting to try to get yourself unstuck first.

* First use [the Cypress docs](https://docs.cypress.io/guides/getting-started/installing-cypress.html#Installing){:target='blank'} to figure out how to use npm to install Cypress within the Feedback Loop UI repo.
* There are multiple ways of opening up Cypress.  Use the docs to figure out how to setup a `script` in the `package.json` that you'll be able to use to open up Cypress.  
* Open Cypress with the script you added. A new window will appear with two testing options.  
  * Select **E2E Testing**.  
  * There are some config options on the next window...but for now just select **Continue** at the bottom.  
    * *Hint: If you see an error that references webpack, you likely chose Component Testing by mistake in the previous step.*
  * Then select your browser (*Chrome*) and the **Start E2E Testing in Chrome** button. *Pause here for now and keep working thru this prework lesson.*  

Having completed these steps, you should notice some new directories and files added to your application.

<section class="answer">
### If you get stuck!  

* Install `cypress` as a dev dependency.

```bash
  npm i -D cypress
```

* Add the following to your `package.json`

```js
{
  "scripts": {
    "cypress": "cypress open"
  }
}
```

* Then run `npm run cypress`

Note: This syntax might be slightly different than what you found in the docs. Thats ok! There are many syntax options.
</section>

### Writing your first test!
You'll notice in your code that there are a few directories including `downloads`, `fixtures`, and `support` inside of a `cypress` directory.  Make note of these directories and go back to the main window on Cypress, then follow the [instructions here](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test#What-you-ll-learn){:target="_blank"} for adding your first test file.

### Creating some test files
As we consider what we will be testing, let's consider a few ways to set up our files.

We could make one giant file and test absolutely everything there: `feedback_loop_spec.cy.js`.  But it's probably more maintainable to group up our related user flows.

**Create a few files in the `e2e` directory (located inside the `cypress` directory) using the Cypress UI** (do not add them manually within your repo):
- `cypress/e2e/login_spec.cy.js`
- `cypress/e2e/dashboard_spec.cy.js`
- `cypress/e2e/form_spec.cy.js`

<section class="note">
### Note

Notice that each of these describes actions tied to our data/server/network requests. When viewing feedback from coworkers, there are several different user flows. But they all involve GETTING feedback data from the back end.

Figuring out how to group user flows/stories can be tricky, and ultimately there are no hard-and-fast rules about how to do so. Over time, you'll develop a sense of what to put together, just like how you are learning what to break out into a React component and what to leave as is. And, of course, these conventions change from team to team.
</section>

