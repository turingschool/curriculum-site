---
title: Consultancy Project
layout: page
---

## Project Description

The goal of this project is to create a successful web application from a student-led project idea. Your team will create an app that will solve a real world problem, but no problem is too small! You don't need to build an app that will save the world. What about an application that will gamify learning test questions for the written driving exam? Or an application that tells you when to move your car to avoid parking tickets for street sweeping? 

Building student-designed projects can help differentiate you as a candidate, but it often comes down more to *how* you build it than *what* you build. The learning goals of this project are to expand/deepen your understanding of your learning process & dynamics within a team - NOT to build the flashiest thing ever.

This project will focus heavily on Service-Oriented Architecture (SOA) and will require at least one back end service (likely in Rails) and one React application.

## Professional Development Benefits

You will be better prepared to hit the ground running in the workplace having worked on a larger team, in a much larger application base, with lots of moving pieces. Understanding the deeper impact of how a small change can have a cascading effect on other pieces of a system will be crucial.

### Feedback from Previous students:

  * "The complexity added value to the interviewing conversations. I got to speak to pros/cons, and I understood the concepts a lot better."
  * "Exploring different design patterns was great and being able to speak on different ways to build things PLUS being able to compare was helpful."
  * "Incredibly helpful in interviewing. It was the biggest project on my resume, and was key to my early interviews. It was more important in my interview for my new role than my Mod 4 capstone because of the multi-app architecture. I could speak to decision-making more because I got to work on each piece. My new company said I reset their expectations for what a bootcamp grad could accomplish."
  * "It came up in just about every interview I had."
  * "People seemed most excited/interested about working on a larger team project. They asked lots of followup questions about how we handled project management, made decisions, etc. It was really helpful to know how SOA/multi-app systems worked."
  * "They were surprised that we got exposure to SOA and speaking about microservices.
  It helped to understand and speak to Abstraction and Encapsulation a lot more. Working on a larger team definitely helped me get started at my job which was a way bigger team than the 10-person project."
  * "People seemed most excited/interested about working on a larger team project (10 people). They asked lots of followup questions about how we handled project management, made decisions, etc. It was really helpful to know how SOA/multi-app systems worked."
  * "It definitely came up in interviews, especially about microservices, and the trade offs versus monolith apps."

### User Empathy, Personas, and Equity Analysis

We'll also examine our end users on a deeper level to instill a strong sense of developer empathy. We will do this by focusing time on "user personas" to answer questions like "who is our user", "what age range are we targeting", "how tech-savvy must the user be to use our app" and so on. As part of this project, groups will also perform an equity analysis in order to interrogate the product they're building, and reflect on possible changes that could better prioritize inclusion and harm reduction. 

## Phases

* [Ideation](./ideation): Week 3 - Students optionally pitch ideas
* [Inception](./inception): Beginning of Week 4 - Completed before development
* [Development](./development): Weeks 4 + 5
* [Retro](./retro_guide): Completed twice during Weeks 4 + 5
* [Video Presentation](./presentation): End of Week 5
* [Evaluation](./evaluation): End of Week 5

## Technical Requirements

You have a lot of freedom with this project, but there are a few technical requirements. Overall, your project must:

1. Includes at least one Rails API and one ReactJS application.
2. Use one external API, but it can be consumed on the FE or BE. 
3. Be deployed (BE and FE)
4. Assume one single user - multiple users with log in and authentication is out of scope.
5. Implement functionality beyond simply data display - there needs to be some way for the user to work with or manipulate the data (favoriting, searching, filtering, commenting, rating, etc)

<section class="dropdown">
### Back End Requirements

* Thorough testing at both the unit and integration level.
  * Test Coverage tool like SimpleCov is used
  * Happy Path and Sad Path/Edge Case testing is included
* Well factored code that adheres to MVC
  * Any API consumption is refactored out of the controller.
* Database has at least one relationship between tables **unless permission is granted from PM**

Optional Stretch Tech:
  * **Caching**: Using low-level caching (no FE caching). Team should be able to identify how the points where caching is implemented help to alleviate the main workflow of the application, and ideally show before/after data. 
  * **Background Jobs**: Consider using Sidekiq with Redis. Team should be able to identify how the background worker(s) alleviate the main workflow of the application, and ideally show before/after data. 
  * **CirlceCI**: Team should be able to identify the use case of this technology, its pros and cons. In order to receive credit for this stretch tech, teams must not only set it up, but incorporate continuous integration principles into their workflow (i.e. when the build is red, discussion about fixing the build is visible, and commits are not pushed on top of a red build)
  * **Rate Limiting**: Consider using the gem called "rack-attack" and test to demonstrate it's working! Team should be able to discuss why rate limiting is an effective feature. Ideally, be able to demonstrate it live using a small script (either live or in production). 
  * **Microservice**: Team should create a separate microservice (separate from their BE API app) using Sinatra or a different framework, and be able to speak to the pros/cons of that framework when compared to Rails. 
* Pagination
* [Security Vulnerability Scanner](https://github.com/presidentbeef/brakeman)
* OpenAPI Documentation
* [Circuit Breaker Design Pattern](https://makisushi.io/posts/asd)
* Observability (i.e. New Relic, Skylight, Honey Badger, Rails Performance)

</section>

<section class="dropdown">
### Front End Requirements

* Multi-page application utilizing React Router
* Includes at least one POST request to the BE
* The application cannot simply be a display of data - there needs to be at least **one** way for the user to work with or manipulate the data (favoriting, searching, filtering, commenting, rating, etc)
* Includes thorough client-side validations and error-handling, including error handling for network requests.
* Implements robust Cypress testing, with all network requests properly intercepted and all user flows tested
* Responsive across screensizes, avoiding any awkward styling as you change screen size

Deployment is required for this project. Two popular deployment options for the FE are [Vercel](https://vercel.com/) and [Netlify](https://docs.netlify.com/).  You can research and proceed with whatever deployment platform you choose.  


</section>
