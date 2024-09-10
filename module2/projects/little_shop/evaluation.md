---
layout: page
title: Little Shop Evaluation
length: 1 week
type: project
---
_[Back to Little Shop Home](./index)_

## Presentation
For the project evaluation, each project team will meet with an instructor for a 30 minute session. Teams should prepare a presentation that covers the following:

* Demonstration of functionality via your FE application (and Postman Suites for functionality not covered in FE app)
  * Outlining at least 3 styling improvements you made, why you chose them and what your inspiration design was
  * Demonstrating your FE refactoring and FE feature add
* Discussion of technical quality and organization of the code, identifying code that should be refactored and how it would be refactored
* Running your application's test suite and a discussion of test coverage (happy/sad paths and any edge cases)
* Identifying the area(s) of code of which you are most proud, and an area where you would like specific feedback

_All_ team members are expected to participate equally in the presentation. Students should focus on practicing technical communication that is succinct and utilizes appropriate technical vocabulary.

Slides are not required, but encouraged as a way to facilitate the presentation along with sharing specific code examples.

With remaining time, instructors will ask questions and follow-up on feedback requests.


## Rubric
Your project will be evaluated based on the following rubric: 

### Feature Delivery

* Exceeds Expectations: Project completes all requirements and at least one extensions.
* Meets Expectations: Project completes all requirements. Postman tests pass/FE functions correctly.  FE requirements are met. BE requirements are met.
<!-- * Meets Expectations: Project completes all requirements. Postman tests pass/FE functions correctly.  FE requirements are met. BE application is successfully deployed.  -->
* Approaching Expectations: Project fails to complete 1 - 2 required endpoints
* Below Expectations: Project fails to complete more than 3 or more endpoints

### Project Management

* Exceeds Expectations: GitHub Project Board is fully up to date in all checkins and the evaluation. Live presentation is prepared with visuals, a logical flow, and distributed talking points. Students complete all requirements in "Meets Expectations" as well
* Meets Expectations: Students use GitHub projects or similar tool to track all project tasks. Project board is mostly up to date in all checkins, and fully up to date in evaluation. Students participate in meaningful code review and it's visible through PR comments or live meetings (students can speak to one of these meetings). Live presentation is prepared, and follows a logical flow. All group members participate, but maybe with some instructor prompting.
* Approaching Expectations: Project board is not utilized, or not up to date at evaluation. Evidence of meaningful code revision is minimal. Presentation is disorganized, and not all members participate (note: individual team members can receive different scores for this section)
* Below Expectations: GitHub Projects is not utilized. No evidence of code review. Unprepared presentation that doesn't cover all topics listed above. 

### Test Driven Development

* Exceeds Expectations: Project achieves 100% test coverage at the unit and integration levels. Project utilizes new testing tool such as Faker or FactoryBot.
* Meets Expectations: Project achieves greater than 98% test coverage. The tests include sad path and edge case testing.
* Approaching Expectations: Project achieves greater than 90% test coverage
* Below Expectations: Project does not have 90% test coverage.

### Technical Quality

* Exceeds Expectations: Project demonstrates exceptionally well factored code, utilizing strategies or tools not discussed in class. 
* Meets Expectations: Project demonstrates solid code quality, MVC principles (1-2 infractions is okay), and uses a serializer for formatting JSON responses. The first section of RESTful endpoints follow RESTful routing and design. Error handling is refactored to use `rescue_from` blocks and helper methods where appropriate
* Approaching Expectations: Project demonstrates some gaps in code quality and/or application of MVC principles. Routing is not quite RESTful for first section of endpoints.
* Below Expectations: Project demonstrates poor factoring and/or understanding of MVC. Lacks adherence to RESTful routing. 

### SQL/ActiveRecord

* Exceeds Expectations: At least one ActiveRecord/SQL extension is complete.
* Meets Expectations: All queries are functional and accurate, and are written in either AR or SQL (i.e. no Ruby is used to process data)
* Approaching Expectations: Some Ruby is used to process data instead of using AR/SQL. Or, some queries are not accurate.
* Below Expectations: Ruby is used more often than SQL/AR to process data. Or, no queries are correct.
