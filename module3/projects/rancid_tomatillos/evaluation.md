---
title: Rancid Tomatillos Evaluation
module: 3
tags: react,  testing, javascript, api, cypress
---

_[Back to Rancid Tomatillos Home](./index)_

## Video Submission

For the project evaluation, each project team should prepare a **10 minute** video presentation. Presentations longer than 10 minutes will not be reviewed and sent back for revision. 

We do not expect anything fancy - we will only be evaluating you on the content, not the quality of your video. We recommend simply getting onto a Zoom call together and recording via Zoom's tools. 

All team members are expected to participate equally in the presentation. Students should focus on practicing technical communication that is succinct and utilizes appropriate technical vocabulary.

Slides are not required, but encouraged as a way to facilitate the presentation along with sharing specific code examples.

Instructors will review the video presentation. Scores and final comments will be sent to teams via Slack.

Your presentation should cover the following points:
- **App Functionality:** Run through the app, click all the buttons, show the user experience, show off any extra features like responsive design, etc.
- **React Architecture:** Talk about your component architecture and how your data is stored/passed around. Show us some code snippets, including how you handled the network requests.
- **Testing Coverage:** Run the Cypress tests, showing successfully intercepted network requests. Show a couple code examples of tests you wrote, focusing on tests that were complex or that you are particularly proud of.
- **Router:** Show the URL updates and a snippet of your Router code.
- **General Takeaways:** Share some takeaways from this project, focusing on how you overcame challenges and specific things you've learned
- **Seek Feedback:** Identify an area where you would like specific feedback

---

## Rubric

<section class="dropdown">
### Collaboration and Professionalism
While this is not a scored rubric section, every team member is expected to fully participate, contribute, communicate, and collaborate with the team throughout the entirety of this project. **Failure to do so can result in an individual failing the project, even if the group/project is otherwise passing.**

We expect all teammates to:
* Hold daily standups throughout project.
* Make atomic and frequent commits, effectively documenting the evolution/progression of the application. There is no more than a 10% disparity in project contributions between teammates.
* Use a project board (and update it throughout the project) with Github issues and labels.
* Use branches/PRs and do consistent, thorough, meaningful code reviews of PRs, which prompt updates and changes made to that PR before merging.
* Create a complete README that is formatted well and at minimum contains:
  * Overview of project and goals
  * Overview of technologies used, challenges, wins, and any other reflections
  * Link to deployed site
  * Screenshots/gifs of your app
  * Links to contributors' GitHub profiless
* Collaborate effectively to accomplish the shared goal.  Team productively and professionally works through challenges and conflicts to ensure all team members are able to be heard and contribute throughout the project. Instructors are available to offer support and guidance but conversations around what *is* and what *is not* working are expected to be led by the team members themselves.
</section>

<section class="dropdown">
### React Fundamentals/UI

**Meets Expectations** can look like:
  - The terminal shows no errors or warnings
  - A consistent, modular file structure is used
  - Create reusable and modular functional components by incorporating props and considering component composition
  - Hooks are implemented to manage and update state. State remains pure and immutable.
  - Data and functions are passed as props (only as needed) to effectively organize the application
  - Logic is pulled out of return statements when it makes sense.  `return` statements are as readable as possible, only communicating what will be displayed
  - Frontend state matches the backend data
  - Code is DRY, reusable, and empathetic 
  - Application properly uses a catch block for network request error handling (if the server is down or if a fetch call fails) and displays helpful information to the user.

**Exceeds Expectations** can look like:
  - Data retrieved from a server is run through a cleaning function to handle any missing/inconsistent data and remove any extraneous data that isn't using in the application - before setting that data to state.
  - Application shows loading state
  - Application design is [responsive](https://frontend.turing.edu/lessons/module-3/css-responsive-layouts.html) across small, medium and large breakpoints
  
</section>

<section class="dropdown">
### Testing

**Meets Expectations** can look like:
  - Application views are thoroughly tested
  - Application user flows are thoroughly tested
  - Tests make specific assertions about the content DOM elements contain
  - Network requests are properly stubbed (intercepted)
  - Happy path async functionality is stubbed and tested

**Exceeds Expectations** can look like:
  - Sad path async functionality is stubbed and tested
  - Implements Cypress `alias` and `wait()` 
  - Implements Cypress `fixture` 
  - Implements Cypress `command` 
  
</section>

<section class="dropdown">
### Routing

**Meets Expectations** can look like:
  - Application uses Router to display appropriate components based on URL
  - The user has access to previous routes via the back/forward buttons
  - Code was refactored to remove unnecessary or old code artifacts

**Exceeds Expectations** can look like:
  - A 404 page handles unknown routes.  *You can check this by going to localhost:3000/nonsense*
</section>