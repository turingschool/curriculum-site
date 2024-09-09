---
layout: page
title: Viewing Part API Evaluation
tags:
type: project
---

## Presentation/Feedback

### Presentation Points

- Demonstration of functionality in Postman (endpoints are already prepared, so this should not take more than 2-3 minutes!)
- Discussion of API consumption and design
- Discussion of many-to-many implementation, and how student created the viewing parties and invited users (both for initial creation and subsequent invitations)
- Discussion of authorization, and any refactoring done to optimize its implementation. 
- Walkthrough of Testing: Happy & Sad Path, Test Coverage

Questions:
- Live eval or group feedback session?
  - Leaning towards live eval since this is the only BE-focused project? But could be persuaded!

## Rubric

### Feature Delivery

- **Exceeds Expectatations:** All core requirements are complete and at least one extension
- **Meets Expectations:** All core requirements are complete.
- **Approaching Expectations:** Missing 1 core endpoint, or all core requirements are complete but not functioning exactly as intended.
- **Below Expectations:** More than 1 core endpoint incomplete or non-functional

### Testing

- **Exceeds Expectatations:** Project achieves 100% test coverage, stubs all network requests, and includes all expectations below
- **Meets Expectations:** Project achieves over 95% test coverage. In addition to "happy path" testing, project also tests for "sad path" and edge cases. WebMock or VCR are used in at least 2 tests.
- **Approaching Expectations:** Project achieves 80-90% test coverage. Project may not include "sad path" or edge case testing. Project may not include stubbing external HTTP requests.
- **Below Expectations:** Project does not achieve 80% test coverage.

### Code Quality

- **Exceeds Expectatations:** Student can demonstrate how different portions of the project demonstrate all of the four pillars of OOP: polymorphism, encapsulation, abstraction, inheritance. Student has refactored all API consumption out of controller actions, and utilized components like services, POROs, etc.
- **Meets Expectations:** Student has refactored at least one instance of API consumption out of the controller, utilizing components like services, POROs, etc. Students can discuss how their refactoring supports MVC, SRP, and OOP principles. Student can identify areas where code can be refactored. Endpoints are RESTfully designed. The many-to-many relationship is implemented using a join table and ActiveRecord is used to query and manipulate relationships.
- **Approaching Expectations:** Project demonstrates some gaps in code quality and/or application of MVC principles, REST, and DRY. No API consumption is refactored.
- **Below Expectations:**  Project demonstrates poor factoring and/or understanding of MVC principles, REST, and DRY.

### Presentation

- **Exceeds Expectatations:** The student has a well organized presentation that addresses each point directly, uses technical vocabulary correctly throughout the presentation, and can speak to the design choices they made around API consumption, implementing authorization, and 
- **Meets Expectations:** The student has a well organized presentation that addresses each point directly, uses technical vocabulary correctly throughout the presentation, and can speak to the design choices they made around API consumption, implementing authorization, and a many-to-many relationship. Minimal prompting from an instructor is necessary.
- **Approaching Expectations:** Student can speak to all but one of the presentation points, and/or presentation may be scattered or lack a logical flow.
- **Below Expectations:** Student is unprepared for the presentation and requires a lot of prompting from an instructor to talk through presentation points.