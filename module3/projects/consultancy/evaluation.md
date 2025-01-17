---
layout: page
title: Consultancy - Evaluation
type: project
---

_[Back to Consultancy Home](./index)_ 

## Rubric

<section class="dropdown">
### Professionalism and Collaboration

This is an essential expectation and in extenuating circumstances, individuals might receive different scores in this section than their teammates. 

**Meets Expectations:**

* Team holds daily check-ins throughout project
* Teammates participate in check-ins, project check-ins, and Slack discussions
* PRs demonstrate thoughtful code review
* Project board is utilized and up-to-date in every check-in. Board is utilized as a tool for organization and transparency throughout the entire project. 
* Commits are atomic and frequent, effectively documenting the evolution/progression of the application. There is no more than a 10% disparity in project contributions between teammates.
* READMEs are formatted well and at a minimum contains:
  - Overview of project purpose and goals
  - Overview of technologies used
  - Setup and Running Instructions
  - Sample requests/responses (BE)
  - Database schema diagram (BE)
  - Screenshots/gifs of your app (FE)
  - List of contributors
* Team collaborates effectively to accomplish the shared goal. Team productively and professionally works through challenges and conflicts to ensure all team members are able to be heard and contribute throughout the project.
  - Instructors are available to offer support and guidance but conversations around what is and what is not working are expected to be led by the team members themselves.

**Exceeds Expectations:**

* Team rotates project management roles regularly (i.e. facilitator, note-taker, accountability captain, etc.)
* Team uses GitHub issues to track bugs
* PRs show reviews from rocks and mentors, and feedback is implemented before merged.

</section>

<section class="dropdown">
### Feature Delivery

**Meets Expectations:**

* 90% or more MVP stories are completed
* At least one external API is consumed
* Application is successfully deployed and core functionality is demo-able

**Exceeds Expectations:**

* One BE stretch tech is implemented
* A stretch feature (not included in the MVP) is completed

</section>


<section class="dropdown">
### Technical Quality

**Meets Expectations:**
<!-- TO-DO FE instructor opinions here would be very helpful! -->
* Code follows DRY and SRP design
* API consumption is refactored and encapsulated, whether implemented on the FE or BE
* Back End Expectations
  - Routes are RESTful (PMs have some discretion here)
  - Database migrations are managed well, and schema is well-planned and executed
  - Model data validations are utilized
  - Most common errors are rescued and serialized in a friendly error response.
* Front End Expectations
  - Application is multi-page utilizing React Router
  - At least one POST request is used
  - Application properly uses a catch block for network request error handling (if the server is down or if a fetch call fails) and displays helpful information to the user.
  - Application includes client-side validation
  - Frontend state matches the backend data
  - Data and functions are passed as props (only as needed) to effectively organize the application
  - Application is responsive across screen sizes, utilizing relative units were appropriate and breakpoints for layout changes as needed and avoiding any awkward styling as you change screen size

**Exceeds Expectations:**

* Data retrieved on the FE through a server is run through a cleaning function to handle any missing/inconsistent data and remove extraneous data before setting that data to state
* Application design is responsive across small, medium and large breakpoints
* BE includes advanced data manipulations including joins, grouping or aggregating
</section>

<section class="dropdown">
### Testing

**Meets Expectations:**

* BE achieves 95% or more test coverage (happy and sad path)
* API calls to external services are tested using mocks/stubs in at least one instance
* Application views and user flows are thoroughly tested with Cypress
* Cypress tests make specific assertions about the content DOM elements contain

**Exceeds Expectations:**

* Sad path functionality is tested in Cypress
* BE achieves 100% test coverage

</section>
