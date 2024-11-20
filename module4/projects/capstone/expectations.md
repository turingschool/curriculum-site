---
title: Capstone Project Expectations
layout: page
---

[Back to Capstone Project Overview](./index.html)

## Onboarding
Everyone will be assigned to an application at the start of the project. We will do our best to match you to a project that is a good fit for your skills and interests. Some projects will be new and some will be existing applications. Most often, students will be assigned to an existing application so that is where this guide will focus.

This project will span 4 weeks. Although you are working as a team, you will be assessed individually.

**If it is a new application,** you will be given a project brief with a list of features to implement. Your first several days will be spent planning and designing the technical aspects of the application.

**If it is an existing application,** you will follow the project's documentation and set up your development environment. This might include setting up multiple apps or services. If the setup instructions are unclear or incorrect, you will be expected to take notes, ask questions, and then update the README with the correct information if applicable. **Plan to spend at least a whole day on setup and getting familiar with the project.**

<section class="call-to-action">
Pro-Tip: Updating the README is a great way to get familiar with the project and make a first contribution on the job, too! 
</section>

### Guide for Navigating a Legacy Codebase
As you are getting familiar with the codebase, consider the following questions:

* Where will you start in the codebase, and why did you decide to start there?
* What is familiar to you about the codebase?
* Are you making any assumptions? If so, what are they?
* How are you identifying what files are relevant to your issue?
* What is the data flow in the application?
* What is unfamiliar? (different file structures, new packages or gems, etc.)

Take notes on your findings and questions. This will help you as you begin to work on your project and will be a great resource to come back to when you start your first job.

## Working Like a Developer
After the onboarding and setup period, you will be assigned your first feature. Some features will be small and others will be large enough that you will need to break them into multiple issues. You should ask clarifying questions to your project manager as needed. There will be daily opportunities to do this synchronously in the daily check in, otherwise you can use Slack to communicate with your project manager or ask to schedule a call. Your project manager will be the final decision maker on the scope of the feature, but you are encouraged to ask questions and provide input.

As the developer, you are responsible for:
* Planning the feature (see below)
* Writing the code to implement the feature
* Testing the feature to verify it works as expected
* Writing or updating the documentation for the feature
* Ensuring your code does not break existing functionality or tests
  * If existing tests break or are inadequate, update them. Be sure to document those changes and why there were needed in the PR.
* Ensuring CI passes before requesting a review
* Verifying your deployed changes are functioning as expected in production

### Planning the Feature Looks Like:
* Clarifying requirements of user stories with the project manager
* Breaking down the feature into smaller issues if needed AND adding those issues to the project board
  * Remember, PRs should be focused on a single feature or bug fix. If you are working on a large feature, break it into smaller pieces and submit them as separate PRs. Each PR should have a single purpose and address a single issue.
* Choosing the appropriate tools, patterns, and technologies to implement the feature
  * This might include a research spike and discussing tradeoffs with the project manager or other developers

<section class="dropdown">
### Breaking Down a Feature Example

If the assigned feature is **Users can sign up for a new account**

You might break it down into the following tasks after clarifying requirements with the project manager:
* Create a back end endpoint for sign up
* Create a front end component for sign up
* Create a new route for sign up
* Add validations to the form
* Add backend validations to ensure the email is not already in use

Each of these tasks should be added to the issue as a checklist item. The issue details should include a description of the feature, any acceptance criteria (that's your checklist), and any additional information that will help you complete the feature such as:
* Links to documentation or code
* Dependencies (ex: gems or packages)
* Potential blockers (ex: decisions or issues that need to be completed before this one can be started)

Any new issues should be given a status of **Backlog** and the Project Manager will move them to **To Do** when they have been scheduled to be worked on.

<section class="call-to-action">
A good rule of thumb for breaking down a feature is to think about the happy path and the sad path. The happy path is what should happen when the feature is working as expected. The sad path is what should happen if something goes wrong. Generally, an issue should be small enough to be completed in about a single day of work. Larger than that and you should consider breaking it into smaller issues. Additionally, if the work cannot all be completed by one person, you should break it into smaller issues. An example of this would be if you are working as separate front end and back end teams.
</section>

**For the example "Users Can Sign Up for a New Account":**
* Description: Create a back end endpoint for sign up
* Acceptance Criteria: 
  * Create a back end endpoint for sign up
  * Create a front end component for sign up
  * Create a new route for sign up
  * Add validations to the form
  * Add backend validations to ensure the email is not already in use
  * New user saved to the database
  * Return a 200 status code with the correct response body
  * Return a 400 status code with an appropriate error message if the form is invalid
* Dependencies: None
* Blockers: Requires `User` model and table to be created
* Additional Information:
  * Request:
    ```
    POST /api/v1/users

    {
      "email": "test@test.com",
      "password": "password",
      "password_confirmation": "password"
    }
    ```
  * Response body:
    ```json
    "data": {
      "type": "user",
      "id": "1",
      "attributes": {
        "email": "test@test.com",
        "password": "password",
        "password_confirmation": "password"
      }
    }
  ```
</section>


## Structure and Rituals of Agile Development (and thus this project)
* Every day you will have a check-in with your project manager where we will discuss your progress, any blockers, and your plan for the day. 
  * Usually in the morning following the Warm Up or immediately after lunch. Occasionally, these will happen at an off time or on Slack instead.  
* You will be assigned issues on the project board and be expected to update the issue as you work on it.
  * If your tasks aren't being updated, your project manager will assume you are not working on them which will result in a failing grade.
* You are expected to create new issues for your features as needed and to update the project board's backlog with new issues as you discover them.
* Retros will be held 2-3 times over the course of the project.
* Backlog Refinement sessions will be held 2-3 times over the course of the project.

<section class="note">
Work should generally be limited to the scheduled work time hours on the calendar between 9am-4pm MT, Monday through Friday just like a real job.
</section>

### What is a...
* **Check-In/Standup**: A brief daily meeting with your team where we will discuss your progress, any blockers, and your plan for the day
* **Issue**: A task or unit of work that needs to be completed
* **Blocker**: A problem that is preventing you from completing your work or moving forward
* **Backlog**: A list of issues that need to be completed but are not yet scheduled
* **Retro(spective)**: A meeting where we will discuss what went well, what didn't go well, and how we can improve
* **Backlog Refinement**: A meeting where we will discuss the issues in the backlog and decide which ones to work on next
* **Project Board**: A place to track the status of your issues

<section class="dropdown">
### Wait, tell me more about the project board

The project board is where we will track the status of your issues. It is a place to plan your work and track your progress. As a rule of thumb, you should never have more than 2 issues in flight at any given time. If you are blocked on an issue, you should raise the concern with your project manager so that we can help you get unblocked.

Our Project Board will have the following status columns:
* **Backlog**: Issues that are not yet scheduled
* **To Do**: Issues that are scheduled to be worked on soon
* **In Progress**: Issues that are currently being worked on
* **Review**: Issues that are complete and ready for code review
* **Done**: Issues that have been reviewed and merged
</section>


## Git Workflow and Technical Expectations
### Code Quality
* Test your code thoroughly
  * This includes both unit tests and integration tests
  * Nothing should be merged to main without tests
* Write code that is clean and easy to understand
  * Follow the conventions of the language and framework
  * Variables, methods, and functions have helpful names
  * Use consistent formatting (line breaks, indentation, etc.)
* Unused code and unnecessary comments and logging should be removed before opening a PR
* Keep the README up to date (database schema, screenshots, endpoint documentation, changes to setup instructions or testing etc.)

### Git Workflow
* Create a new branch for each issue
* Write helpful [commit messages](https://cbea.ms/git-commit/)
* Keep your branches focused in scope (avoid large PRs that include many features)
  * If you are working on a large feature, that is a sign to break it into smaller issues and submit them as separate PRs.
* Code should be reviewed and approved by at least one other person before merging
  * Reviews should include comments and suggestions for changes. Just saying "Nice work" is not helpful. See below for more details.
  * Each team member is expected to provide at least three detailed and feedback-rich reviews over the course of the project
  * The developer and the reviewer _equally_ share the responsibility of ensuring broken/breaking code is not pushed to production.
* PRs should be reviewed within 24 hours, Monday through Friday, or acknowledged in Slack if and why there will be a delay on the review
* Deploy your code immediately after merging your approved pull requests to main **and then visit the production application to ensure your deployed changes are functioning as expected**
* Use pull request templates that document and create discussion for finished features


<section class="dropdown">
### Pull Request Review Tips

Helpful things to look for in a review might include:
* Ensuring the code is clean and easy to read
  * Code follows the project's conventions
  * Code follows the language and framework's conventions
  * Variables, methods, and functions have helpful names
* Code is well tested
* Code is well documented
* Pull the branch locally and test it to ensure it works as expected
* Ensure CI is passing
* All edge cases and sad paths are handled and tested (if applicable)
* Unnecessary comments and logging are removed from code
* Did this change break anything?
</section>

[Performance Review and Rubric](./evaluation.html)
