---
title: Solo Stretch Tech
layout: page
---

## Overview + Learning Goals

In this project, students will create a roadmap for and begin a 10-week-long project. That’s right - 10 weeks! 

Turing grads often struggle post-graduation with establishing solid routines, keeping their technical skills sharp, and upskilling in new technical areas. The goals of this project are meant to directly address these areas:
- Students will solidify a plan for the first 8 weeks of post-graduate life.
- Students will create a project that they are enthusiastic about, giving them a strong story for interviews.
- Students will continue to solidify programming concepts and add more skills to their resume.

For the most part, you will spend the next 2 weeks planning and getting your project set up so that you have something tangible to work on after graduation. You will only contribute a little bit of code to this project before graduation.  

## MVP (Minimum Viable Product)

You will be designing this application from the ground up. For the most part, you have control over what you build, but we want to help set you up for success by defining a few requirements for the product. We don't want you choosing a project that is too small to last over the next 10 weeks and we don't want you starting to code when you haven't done your due diligence planning. For your MVP, we expect:
- A clearly defined app idea with a specific audience
- A large enough scope to take 10+ weeks
- Two stretch technologies (1 BE and 1 FE) implemented
- The frontend and backend should "talk" at least 3 different places in the app, with at least one request mutating the data (POST, PATCH, PUT, DELETE)

## Stretch Technologies

**We expect you to implement 1 stretch tech from each menu below (2 total).** If you would like to add more, you can, but be careful not to bite off too much. If there is a technology you're interested in using that is not on these lists, let your instructor know and we'll do our best to make it work.

<section class="dropdown">
### Frontend Menu

- **Global State Management:** Use a tool like Redux or Context API to handle data management. Student should be able to speak to the benefits of using global statement management in a React application.
- **Another Framework:** Build a frontend using a different framework like Vue, Svelte, Angular, etc. Student should identify strengths and pain points for this framework in comparison to React and vanilla JS. 
- **Unit Testing:** In addition to using Cypress for end-to-end testing, implement unit testing in your app using React Testing Library or Jest. 
- **Progressive Web App:** Create a PWA that (at minimum) uses caching to maintain some offline functionality and fast loading, is fully responsive to screen size, and has an app-like feel for users. 
- **CSS Technologies:** Up your CSS game with GSAP Animations, WebGL Animations, Bootstrap, Styled Components, or something else you find interesting. If you choose this stretch tech, we'd expect your app design to be extremely strong. 
- **Mobile Development**: Create an app that uses a frontend mobile language like React Native or Swift. 
</section>

<section class="dropdown">
### Backend Menu

- **Caching:** Use low-level caching (no FE caching). Students should be able to identify how the points where caching is implemented help to alleviate the main workflow of the application, and ideally show before/after data.
- **Background Jobs:** Consider using Sidekiq with Redis. Students should be able to identify how the background worker(s) alleviate the main workflow of the application, and ideally show before/after data.
- **Rate Limiting:** Consider using the gem called “rack-attack” and test to demonstrate it’s working! Students should be able to discuss why rate limiting is an effective feature. Ideally, be able to demonstrate it live using a small script (either live or in production).
- **Microservice:** Students should create a separate microservice (separate from their BE API app) using Sinatra or a different framework, and be able to speak to the pros/cons of that framework when compared to Rails.
- **JWT (JSON Web Tokens):** Use the jwt gem for stateless authentication alongside username/password login. Students should explain its benefits and show token expiration and verification
<!-- **I used chatGPT for the following list items, please change as needed** -->
- **GraphQL:** Use GraphQL for querying and mutating data. Students should be able to explain the differences between GraphQL and REST. (This would lead to some changes to how you make requests from the frontend, too!)
- **Pagination:** Implement pagination to limit the amount of data returned in API responses. Students can use strategies like cursor-based pagination or offset-based pagination. They should discuss why pagination is important for performance and scalability.
- **[Security Vulnerability Scanner](https://github.com/presidentbeef/brakeman):** Use Brakeman, a static analysis tool, to scan the Rails application for potential security vulnerabilities. Students should be able to explain what Brakeman does, why it’s useful, and how it integrates into the development workflow. 
- **OpenAPI Documentation:** Use OpenAPI Specification to create comprehensive, interactive API documentation. Students should document all major API endpoints (requests, responses, and parameters) and integrate the documentation using tools like Swagger UI or Redoc.
- **[Circuit Breaker Design Pattern](https://makisushi.io/posts/asd):** Implement the Circuit Breaker design pattern to handle potential failures when calling external APIs or services. Students should use a gem like stoplight or breaker to demonstrate how the circuit breaker prevents cascading failures and improves app resilience. 
- **Observability:** Integrate an observability tool (e.g., New Relic, Skylight, Honeybadger) to monitor and analyze the application’s performance, errors, and resource usage. Students should configure the tool to track response times, database queries, and bottlenecks.
</section>

## Timeline + Deliverables

At the end of the days listed below, you will need to turn in certain deliverables. Your cohort calendar specifies the day of the stretch project so you can easily align when each set of deliverables are due. If you fall behind, talk to your instructor as soon as possible. We want to mimic what communication would look like on the job if you needed more time to complete your assigned tasks.

<section class="note">
### All deliverables will be turned in via **[this google sheet](https://docs.google.com/spreadsheets/d/1dkhqQctc_6nylYyQII22zLU0He_P1k_xfaJOFngV7dM/edit?usp=sharing)**.
</section>

<section class="dropdown">
### Day 2
- Project Proposal: Make a copy of [this document](https://docs.google.com/document/d/1xUWFfFzSJ09GlWi-55942H2RgDJ8GZN-dTMhNsgakig/edit?usp=sharing) and fill it out. Add the link to your proposal to the google sheet. An instructor will review your proposal. You should not move forward until your proposal has been approved. 
- Stretch Techs: List the stretch techs you have chosen for your project. 
</section>

<section class="dropdown">
### Day 5

- FE Design: We expect to see a thought-out design for your frontend before you start coding. Use any tool you'd like (Canva, Figma, Excalidraw, etc) to create a solid wireframe for your app. If you struggle with design, keep it simple. Less is more when it comes to FE design! Look at similar apps out there and take note of what you like about them. Use those features as inspiration.
- BE Planning Docs: We also expect to see a strong schema design before you start coding. Use any tool you'd like for this. We want to see what data you plan to manage, how it will be organized, and what the relationships between the data will be. 
- Stretch Tech Learning Resources: Please find at least 2 resources per stretch tech (4 total) that you will use for learning. This could be the official docs, a tutorial, a YouTube series, etc. 
</section>

<section class="dropdown">
### Day 7

- Repo(s): Please create your repo(s) and link them in the google sheet. You don't need to have any code in there yet.
- CI/CD: Set up continuous integration on both repos. We recommend using Github actions or CircleCI for this
- Project Board: You will link your project board, which should include:
  - At least 4 columns, i.e. `To Do`, `In Progress`, `In Review`, `Merged/Done`
  - At least 6 tickets, with each ticket including a user story
  - All tickets should be converted to **[issues](https://docs.github.com/en/issues)** in your repo
      - Issues are sometimes disabled. To enable them go to Settings in the upper right corner, then scroll down to the Features section. Check the Issues box to enable them.
  - (optional) The use of **[labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)** could be very helpful in organizing your Project Board
    - To view labels on the project board, click the down carrot on the View tab (top left of page) > Fields > ✔️ Labels.

</section>

<section class="note">
### It's time to start coding!

Your first PR will be pushed up by EOD Day 9. This PR will close one of your issues/tickets. Pick any user story from your project board and start working. If you're finding it hard to close an issue in 2 days, the issue is too big. Revisit your project board and break your tickets into smaller chunks.
</section>

<section class="dropdown">
### Day 9

- First PR: We'd love to (finally) see some code! Choose any ticket from your project board and get it done! Push up a PR and drop the link in the google sheet. This can be BE or FE code. Your PR should [close the associated ticket by referencing the issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/linking-a-pull-request-to-an-issue). You can merge this PR anytime, we will not be doing a code review.
</section>


<section class="dropdown">
### Day 10

- Presentation Slides: Link your presentation slides here. More details in the "Presentation Details" section.
</section>

## Presentation and Evaluation Details

### Purpose
Your presentation will highlight your progress on this project and your plans for your job search moving forward. It’s an opportunity to reflect on your experiences and demonstrate how you’ve grown and learned throughout the process.

### Structure
- Student-directed presentation (~10-15 minutes)
  - Develop an organized slide deck or Google document to present your progress and plan moving forward.
  - Include visual aids, such as charts or graphs, to enhance your presentation.
- Instructor feedback (~5 minutes)

### Potential Outcomes
- If everything goes according to plan: good luck in the future!
- If a student fails to present (due to illness, etc), please arrange an alternate time to present to instructors.
- If a student delivers an exceptionally poor presentation: instructors will determine the next steps.

### Format
Each student will deliver a slide presentation in front of your instructor. The presentation will include the following sections:

1. Progress on the project so far 
  - What have you accomplished so far? 
  - How will you talk about this project in your job hunt? 
2. Reflections on your stretch techs
  - How have you approached learning these new technologies? How does this relate to learning things on the job?  
  - What has been challenging?  
2. Plan for the project moving forward
  - How will you continue to be motivated to work on this? 
3. Reflections on job search so far
  - What has your job hunt strategy been so far?
  - How have you been networking? 
  - What is working? What isn't?
4. Plan for job searching moving forward
  - What is your strategy in the coming weeks to secure a job?
5. Organizing your post-grad time
  - Show us your calendar for the first 2 weeks post-graduation. This should include time for working on your Stretch Tech project AND job hunt activities.