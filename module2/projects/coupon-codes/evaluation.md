---
title: Coupon Codes API Evaluation
---

## Evaluation Criteria

_[Back to Coupon Codes Home](./index)_

## Presentation
For the project evaluation, you will meet with an instructor for a 20 minute session. You should prepare a presentation that covers the following:

* Demonstration of backend functionality via Postman suites
* Demonstration of frontend functionality via running app in Browser
* Discussion of technical quality and organization of the code, identifying code that should be refactored and how it would be refactored
* Running your application's test suite and a discussion of test coverage (happy/sad paths and any edge cases)
* Identifying the area(s) of code of which you are most proud, and an area where you would like specific feedback

Students should focus on practicing technical communication that is succinct and utilizes appropriate technical vocabulary.

Slides are not required, but encouraged as a way to facilitate the presentation along with sharing specific code examples.

With remaining time, instructors will ask questions and follow-up on feedback requests.


## Rubric
Your project will be evaluated based on the following rubric: 

### Feature Delivery

* Exceeds Expectations: Project completes all requirements and at least one extension.
* Meets Expectations: Project completes all requirements. Postman tests pass, and FE functions correctly when wired up to API. 
* Approaching Expectations: Project fails to complete 1 - 2 required endpoints
* Below Expectations: Project fails to complete 3 or more endpoints

### Technical Presentation

* Exceeds Expectations: The student has a well organized presentation that addresses each point directly, uses technical vocabulary correctly throughout the presentation, and can speak to the iterations of their progress on complex queries using visuals.
* Meets Expectations: Student has a well-organized presentation that addresses each presentation point directly, and can speak to how they arrived at their solutions to the complex, logic-heavy user stories.
* Approaching Expectations: Student presents their code and is able to talk about 3 of the presentation points, but does not speak to how they arrived at complex solutions in their code.
* Below Expectations: Student is unprepared for the presentation and requires prompts from the instructor to talk about the code. 

### Test Driven Development

* Exceeds Expectations: Project achieves 100% test coverage at the unit and integration levels. Project utilizes new testing tool such as Faker or FactoryBot.
* Meets Expectations: Project achieves greater than 98% test coverage. The tests include sad path and edge case testing.
* Approaching Expectations: Project achieves greater than 90% test coverage
* Below Expectations: Project does not have 90% test coverage.

### Technical Quality

* Exceeds Expectations: Project demonstrates exceptionally well factored code, utilizing strategies or tools not discussed in class. 
* Meets Expectations: Project demonstrates solid code quality, MVC principles (1-2 infractions is okay), and uses a serializer for formatting JSON responses. RESTful endpoints follow RESTful routing and design. Error handling is refactored to use `rescue_from` blocks and helper methods where appropriate
* Approaching Expectations: Project demonstrates some gaps in code quality and/or application of MVC principles. Routing is not quite RESTful for first section of endpoints.
* Below Expectations: Project demonstrates poor factoring and/or understanding of MVC. Lacks adherence to RESTful routing. 

### SQL/ActiveRecord

* Exceeds Expectations: At least one ActiveRecord/SQL extension is complete.
* Meets Expectations: All queries are functional and accurate, and are written in AR (i.e. no Ruby is used to process data)
* Approaching Expectations: Some Ruby is used to process data instead of using AR/SQL. Or, some queries are not accurate.
* Below Expectations: Ruby is used more often than SQL/AR to process data. Or, no queries are correct.