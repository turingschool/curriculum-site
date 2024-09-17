---
layout: page
title: Consultancy - Inception
type: project
---
_[Back to Consultancy Home](./index)_ 
## Background

An Inception is a process used by many companies in the Software Industry to design a solution to a problem. It is tempting to take a problem and immediately start coding, however this will often result in an incoherent solution, or even worse, a solution to the **wrong** problem.

Usually this process takes several days involving many stakeholders such as the client(s), team leads, CEOs, operations, etc. We will be doing a simplified version of this process in a few hours between your team and your project manager.

### Inception Deliverables

These items must be shared with your project manager before you can begin development. They will be reviewed in your first project check-in as well. Please pin or bookmark these in your Slack channel. The sections below will walk your team through developing these materials.

1. Slack Channel Created
2. DTR
3. Miro Board or Planning Tool that includes:
    - MVP definition
    - Wireframes
    - Chosen external API
    - Chosen BE stretch tech
    <!-- - React Component Architecture DO WE WANT THIS? -->
    - Database Schema
4. User Stories in Project Board
5. Equity Analysis
6. Plan for sub-teams for first development sprint
    - Team is welcome to choose their preferred team breakdown, i.e. splitting by FE/BE, splitting by feature, etc. but we highly recommend organization that allows full-stack work
    - **It is essential that every student complete some work on both the FE and BE, but it does not need to be an even 50/50 split**
    - Remember that your final solo project will be full-stack. 

### Process

Each of the following meetings has a purpose: Brainstorm, Decide, or Solve. Everyone should try hard to stick to that purpose.

* Brainstorm - Explore who the end user(s) is(are) (personas), what is possible (ideas), what can go wrong (risks), what is not possible, debate, share counterpoints etc.
* Decide - Follows brainstorming and requires the team to put aside their pride and make decisions for the sake of the team.
* Solve - Follows deciding. This is the execution of what was decided.

Conflict and tension tends to arise in groups when there are differing expectations of these meetings. Some want to debate and explore different outcomes while others see that as a waste of time and want to make a decision. The reality is both are important for making sound decisions and the following is a template to do both and get your project off to a strong start.


<section class="dropdown">
### Tools

- [Miro](https://miro.com) is an online team collaboration board. It will be a space where your team can brainstorm using sticky notes, take notes, wireframe, etc. _Note: There is a Slack integration, but please do NOT attempt to add it to Slack. Staff will deny your request._  
- Other helpful design tools include Figma, Canva, InVision
- Project Management Tools: GitHub Projects (recommended), Trello, Jira

</section>

<section class="dropdown">
### Step 1: Problem Definition and Idea Sharing (Brainstorm + Decide)

* **Objectives:**
    * Define the problem you are solving in 2-3 sentences. The solution you come up with later should solve the problem directly.
    * Discuss and debate the technical solution to the problem, thinking through the most important features this application would need in order to solve the problem.
* **Instructions**
    * The format of this meeting is an open discussion about the objectives defined above.
    * Don't spend more than 5 minutes defining the problem.
    * Don't spend more than 5 minutes on any one feature. Remember, this is just a brainstorming session.
    * Do not eliminate any ideas during this meeting.
    * No decisions are made during this meeting
    * Allow everyone's voice to be heard and make sure no one is dominating the discussion.
    * Be creative. Share bad ideas as well as good. Sometimes bad ideas lead to good ones.
    * Use the guiding questions below if you get stuck.
* **Guiding Questions**
    * What would set you apart during Demo Comp? You're not required to participate in Demo Comp, but it's a great goal!
    * What intimidates you but would be amazing to pull off?
    * What features or technology choices would spark interesting discussions during job interviews?
    * Would you use this product? If not, what is it missing?

<section class="dropdown">
### 1a. Feature Dump (Brainstorm)

* **Objectives**
    * Write out as many potential features as possible
* **Instructions**
    * This is an **individual** activity
    * Each person should write out features on Sticky Notes
    * Only 1 feature per sticky note
    * Features should describe user interaction in 3-5 words max.
    * Examples include:
        * User selects location and sees results
        * User sees stats over time
        * Email notifications
    * **If you cannot fit a feature on a single sticky note you are doing it wrong. You are probably providing implementation details. These feature descriptions should describe user interaction and should not be tied to implementing the feature in a specific way**
    * All potential features of the app should be included (we will define the MVP later in the  process)
    * Get creative with potential features. There are no wrong answers.

</section>

<section class="dropdown">
### 1b. Feature Sharing/Elimination of Duplicates (Decide)

* **Objectives**
    * Share what came out of the feature dump
    * Group related ideas into broad categories (EPICs)
    * Eliminate duplicate ideas
* **Instructions**
  * You will be organizing these thoughts as a group in the project's Miro board
  * Each person should present their features one at a time, giving a *brief* description of what that feature is, so it is clear for the whole group.
  * After you have described the feature move the sticky note into a category. If it doesn't fit in an existing category, make one.
  * As each person takes a turn you will notice that some of the features will be duplicates of previously shared features. If this is the case, simple delete that sticky note. _Don't spend time describing a feature if it is a duplicate._
  * Come up with a name for each of the categories. These will be referred to as [EPICs](https://www.yodiz.com/blog/what-is-epic-in-agile-methodology-definition-and-template-of-epic/) and will be a way to organize your features in your project management tool.
</section>

<section class="dropdown">
### 1c. Feature Prioritization and MVP Definition (Decide)

* **Objectives**
    * Define the features that will make up your [**Minimum Viable Product**](https://www.agilealliance.org/glossary/mvp/#q=~(infinite~false~filters~(tags~(~'mvp))~searchTerm~'~sort~false~sortDirection~'asc~page~1))
* **Instructions (recommended)**
    * Use labels/colors in your miro board to determine MVP/extension/unsure stories.
    * If you are unsure about a feature, table the feature and come back to it at the end.
    * Repeat this process until you have gone through all of the stories.
    * Once you are finished, you have your MVP definition.
    * Highlight the features involved in your MVP somewhere on your Miro (or other tool) so that it is **clearly visible to your PM** and easily understood to someone who did not participate in your planning meetings.
    * **You will be able to adjust your MVP as needed during the first 2 iterations of this project. But once Iteration 3 begins, your MVP cannot be adjusted without being marked down in the feature delivery category of the rubric.**

</section>
</section>

<section class="dropdown">
### Step 2: Application Design and Planning (Solve)

* **Objectives**
    * Based on your MVP and problem definition, create artifacts that will allow you to dive into development with aligned understanding and goals.
    * Prioritize chunks of work that, once development begins, should be completed first
    * Identify constraints and risks through time-boxed explorations called *spikes*
        * In order to effectively plan, teams often need to experiment and/or do some research about potential integrations, APIs, etc. 
        * Spikes are the *only time* during inception that teams are allowed to code
        * Spikes might look like trying out different API calls in order to verify the data is suitable, or doing some individual research about BE stretch techs in order to choose an option that matches the needs of your application.
* **Relevant Activities**
    * Wireframes
    * User Story Creation
    * [Database Schema Design](https://dbdiagram.io/home)
    * External API spikes
    * Stretch Tech Research
    * JSON Contracts (what will your API responses look like?)

<section class="dropdown">
### 2a. Wireframing (Solve)

* **Objectives**
    * Decide how users will interact with your application
* **Instructions (required)**
    * Create a high level [user flow diagram](https://bashooka.com/inspiration/33-excellent-user-flow-examples-for-inspiration/) that lists the steps a user will take when interacting with your application.
    * Make a list of all of the pages required for your application along with what features will exist on each page.
    * For each page, create a [wireframe](https://www.usability.gov/how-to-and-tools/methods/wireframing.html) by sketching out what that user will see when they navigate to that page. Include details such as header text, buttons, drop downs, forms with the specific fields, graphs etc.
    * Do a few pages together as a group, then divide and conquer the remaining pages.
    * [Figma](https://www.figma.com/wireframe-tool/?utm_source=google&utm_medium=cpc&utm_campaign=17340391121&utm_term=free%20wireframe%20tools&utm_content=600487515776&gclid=CjwKCAjw5P2aBhAlEiwAAdY7dLtWlIVK0NWWHUXbjj8KMAaBN8P1lO16khOpesJ63utNI5b-cF1e2xoClmoQAvD_BwE) is a great tool for wireframing

</section>

<section class="dropdown">
### 2b. Story Writing (Solve)

* **Objectives**
    * Document technical requirements for the development team

* **Instructions (required)**
    * Create a project board using Github Projects or Trello.
    * Translate each of the features that were written on sticky notes during the feature dump exercise into a [user story](https://www.atlassian.com/agile/project-management/user-stories) in your project management tool.
    * Every user story should be written from the perspective of the end user and should follow this format:  
        * `As a ___, when I visit ___, I want to ____ so that I can ____.`
    * For every user story include a list of subtasks required to complete the user story. This includes developer chores such as database migrations to add tables and columns, exposing API endpoints, creating mock data and fixtures to stub out an API call etc.
    * For every user story, include the wire frame(s) from the associate page(s)
    * An example user story is:
        - Feature: User can view their saved recipes
        - User story: "As a user, when I visit my profile, I see a section for Saved Recipes, and each result includes the name, url and a thumbnail photo."
        - Wireframe: `<link to wireframe>`
        - Subtasks:
            1. Create a section on the profile page for saved recipes.
            2. Create API endpoint to retrieve saved recipes for a given user (assuming the functionality for saving recipes is already complete)
            3. Display results with appropriate data in a grid according to wireframe
            4. Build Cypress tests for the feature
            5. If network call to the BE is unsuccessful, display friendly error message to user indicating that no recipes could be found.
    * **Note:** Notice that this user story includes both BE and FE work. These are called "vertically-sliced" user stories, in that they they involve a full vertical slice of every layer of the web application (or, the cake!). Vertically-sliced user stories are a best practice in agile software development, and we highly recommend you use them as much as possible. However, for some stories, your team might decide that horizontal slicing (i.e. BE-only tasks and FE-only tasks) is preferred organization method, and that's okay!
</section>
</section>

<section class="dropdown">
### Step 3: Equity Analysis (Brainstorm)

As technologists, it's essential to analyze product plans and processes in order to reduce harm to users, and particularly marginalized identity groups. As part of your inception, please answer these questions as a group, and share your responses with your project manager. 

* What features or tools do you plan to build into the project (or would you include if you had more time) to promote inclusion. You may have ideas that are out of scope for your MVP, but those are valuable to share here!
* Are any of the following marginalized identity groups (or others) likely to experience harm or exclusion as a result of this project:  immigrants, people of color, people with (dis)/Abilities, justice impacted (formerly incarcerated) people, elderly people, women, gender expansive people, people with limited incomes, etc.
* Which factors may impact any individual or group’s access to the proposed project?
* If you were given more time to design this product, how would you want to work with your intended users to ensure relevance?
* What happens if someone uses this product with bad/evil intent in mind?
</section>