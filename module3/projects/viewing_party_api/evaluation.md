---
layout: page
title: Viewing Part API Evaluation
tags:
type: project
---

## Feedback Session Format

The evaluation for this project is going to be a bit different than other projects in the past. First, you should score yourself for this project. To do that, please fill out [this form](https://forms.gle/h8MhbSR2k4xj5MGs9) indvidually. 

### Feedback Session Format

Instead of a traditional eval, you will be meeting in small groups to get feedback from your peers as well as an instructor. The format of this session is below.

1. **Highlight Walkthrough**: Do a brief walkthrough (not a line-by-line code read-a-thon) of the following:
- *one* implementation of API consumption
- handling viewing party invitations
- *one* example of mocking and stubbing

2. **Request for Feedback**: Choose at least one part of your project that you’d like specific feedback on. Everyone will be asked to bring this to the feedback session, and you will be able to get feedback from your instructor as well as your peers in the feedback group.

3. **Behavioral Question**: After you’re done getting feedback on your code, your instructor will pull up the [Wheel of Behavioral Interview Questions](https://spinthewheel.io/wheels/oF5ZfO1oCmBmrZCe45Jecz0xJmU9MQ), and spin it to select a question for you to answer. This is meant to emulate an interview experience. So, as funny as it may feel, answer it as if you were talking to an interviewer. After answering, your instructor (and any cohort-mates!) will give you feedback on your answer. Remember, this is a safe place to practice!

## Rubric

### Feature Delivery

- **Exceeds Expectatations:** All core requirements are complete and at least one extension
- **Meets Expectations:** All core requirements are complete.
- **Approaching Expectations:** Missing 1 core endpoint, or all core requirements are complete but not functioning exactly as intended.
- **Below Expectations:** More than 1 core endpoint incomplete or non-functional

### Testing

- **Exceeds Expectatations:** Project achieves 100% test coverage, stubs all network requests, and includes all expectations below
- **Meets Expectations:** Project achieves over 95% test coverage. In addition to "happy path" testing, project also tests for "sad path" and edge cases. WebMock or VCR are used in at least 2 tests.
- **Approaching Expectations:** Project achieves 80-95% test coverage. Project may not include "sad path" or edge case testing. Project may not include stubbing external HTTP requests.
- **Below Expectations:** Project does not achieve 80% test coverage.

### Code Quality

- **Exceeds Expectatations:** Student can demonstrate how different portions of the project demonstrate all of the four pillars of OOP: polymorphism, encapsulation, abstraction, inheritance. Student has refactored all API consumption out of controller actions, and utilized components like services, POROs, etc.
- **Meets Expectations:** Student has refactored at least one instance of API consumption out of the controller, utilizing components like services, POROs, etc. Students can discuss how their refactoring supports MVC, SRP, and OOP principles. Student can identify areas where code can be refactored. Endpoints are RESTfully designed. The many-to-many relationship is implemented using a join table and ActiveRecord is used to query and manipulate relationships.
- **Approaching Expectations:** Project demonstrates some gaps in code quality and/or application of MVC principles, REST, and DRY. No API consumption is refactored.
- **Below Expectations:**  Project demonstrates poor factoring and/or understanding of MVC principles, REST, and DRY.
