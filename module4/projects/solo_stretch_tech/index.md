---
title: Solo Stretch Tech
layout: page
---

## Overview + Learning Goals
In this project, students will create a roadmap for and begin a 10-week-long project. That’s right - 10 weeks! 

Turing grads often struggle post-graduation with establishing solid routines, keeping their technical skills sharp, and upskilling in new technical areas. The goals of this project are meant to directly address these areas:
- Students will solidify a plan for the first 8 weeks of post-graduate life.
- Students will create a project that they are enthusiastic about, giving them a strong story for interviews.
- Students will choose 1-2 stretch technologies to implement in the project.

## MVP

## Stretch Technologies
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

## Deliverables
In your Final Presentation in week 6, you will submit:
A MVP plan
2-3 Stretch Techs
A repo with 2 user stories completed 
A project board with X tickets
A calendar
Reflections on how you will talk about this project in a job interview (sample questions)


## Suggested Timeline
EOD Day 2 - MVP proposal, 2 stretch techs
EOD Day 3 - 2 learning resources per stretch tech
EOD Day 5 - repo(s), project board (w/ Xdrive tickets)
EOD Day 7 - 1 user story done
EOD Day 8 - Another user story done
EOD Day 9 - Calendar, more tickets, presentation
Day 10 - Final Presentations

## Evaluation Details
