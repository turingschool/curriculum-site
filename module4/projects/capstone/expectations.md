---
title: Capstone Project Expectations
layout: page
---

[Back to Capstone Project Overview](./index.html)

## General Expectations
* Work should generally be limited to the scheduled work time hours on the calendar between 9am-4pm MT, Monday through Friday
  * This is a guideline and not a hard rule. If you do better technical work in the evenings and prefer job hunt activities during the day, that is fine. The Work Time hours are a guideline to help you manage your time.
* Regularly update your assigned tasks on the project board
* Test your code thoroughly
* Write code that is clean and easy to understand
* Keep the README up to date (database schema, screenshots, endpoint documentation, changes to setup instructions or testing etc.)
* Attend the daily check in with your project manager (when live) or reply promptly to check in messages on Slack


## Setup
After Kickoff, you'll be assigned to a project.

**If it is a new application,** you will be given a project brief with a list of features to implement. Your first several days will be spent planning and designing the technical aspects of the application.

**If it is an existing application,** follow the project's documentation and setup your development environment. This might include setting up mutliple apps or services. If anything about the setup instructions are unclear or incorrect, take notes, ask questions, and then update the README with the correct information if applicable. **Plan to spend a whole day on setup and getting familiar with the project.**

<section class="call-to-action">
Pro-Tip: Updating the README is a great way to get familiar with the project and make a first contribution on the job, too! 
</section>

### Guide for Navigating a Legacy Codebase

* Where will you start in the codebase, and why did you decide to start there?
* What is familiar to you about the codebase?
* Are you making any assumptions? If so, what are they?
* How are you identifying what files are relevant to your issue?
* What is the data flow in the application?
* What is unfamiliar? (different file structures, new packages or gems, etc.)

**Take notes on your findings and questions. This will help you as you begin to work on your project as well as be a great resource to come back to when you start your first job.**

## Working Like a Developer
After the setup period, you will be assigned your first feature. Some features will be small and others will be large enough that you will need to break them into multiple issues. You should ask clarifying questions with your project manager as needed. There will be daily opportunities to do this synchronously in the daily check in, otherwise you can use Slack to communicate with your project manager or ask to schedule a call. Your project manager will be the final decision maker on the scope of the feature, but you are encouraged to ask questions and provide input.

As the developer, you will be responsible for:
* Planning the feature (see below)
* Writing the code to implement the feature
* Testing the feature to verify it works as expected
* Writing or updating the documentation for the feature
* Ensuring your code does not break existing functionality or tests
  * If existing tests break or are inadequate, update them. Be sure to document those changes and why there were needed in the PR.
* Ensuring CI passes before requesting a review
* Verifying your deployed changes are functioning as expected in production

<section class="dropdown">
### Planning the Feature Looks Like:
* Clarifying requirements of user stories with the project manager
* Breaking down the feature into smaller issues if needed AND adding those issues to the project board
  * Remember, PRs should be focused on a single feature or bug fix. If you are working on a large feature, break it into smaller pieces and submit them as separate PRs. Each PR should have a single purpose and address a single issue.
* Choosing the appropriate tools, patterns, and technologies to implement the feature
  * This might include discussing tradeoffs with the project manager or other developers
</section>

## Git Workflow Expectations
* Create a new branch for each feature
* Write helpful [commit messages](https://cbea.ms/git-commit/)
* Keep your branches focused in scope (avoid large PRs that include many features)
  * If you are working on a large feature, break it into smaller pieces and submit them as separate PRs.
* Code should be reviewed and approved by at least one other person before merging
* PRs should be reviewed within 24 hours, Monday through Friday, or acknowledged in Slack if and why there will be a delay on the review
* Deploy your code immediately after merging your approved pull requests to main **and then visit the production application to ensure your deployed changes are functioning as expected**
* Create and use pull request templates that document and create discussion for finished features