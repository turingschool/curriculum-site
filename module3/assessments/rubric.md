---
title: M3 Assessment Rubric
layout: page
---

_[Back to Assessments Home](./index)_

In order for a candidate to pass this challenge, **_they must score "Leaning Yes Hire" or "Strong Yes Hire" in every category._**

<section class="dropdown">
### 1. Problem Solving and Task Completion (Take Home Only)
#### Strong Yes Hire

The candidate...
- is able to articulate multiple approaches and describe the pros and cons of each and is able to fully implement the approach, without any real help from the interviewer.
- recognizes edge cases, draws attention to them unprompted, and solves them.
- goes above and beyond the MVP in either adding new functionality beyond the base requirements or special consideration through means of testing or accessibility. 

#### Leaning Yes Hire
The candidate...
- is able to outline a solution beyond the most basic solution, covering the vast majority of edge cases. 
- asks questions to clarify the scope of the problem or states their assumptions without being prompted. 
- is able to modify their solution independently if an edge case is pointed out.
- builds a solution that meets all MVP expectations provided by the challenge and is easy to use by the end user.

#### Leaning Don’t Hire
The candidate...
- is unable to arrive at a solution beyond the most basic approach. The final solution does not account for edge cases. 
- dives in to a solution without giving the problem much thought. 
- is only able to solve a bug or for an identified issue with significant help.
- built most of the MVP, but one or two requirements may be incomplete.

#### Strong Don’t Hire
The candidate...
- is unable to arrive at a solution beyond the most basic approach. 
- fails to complete three or more requirements of the MVP or the application is broken.
</section>

<section class="dropdown">
### 2. Technical Fluency and Code Design
#### Strong Yes Hire

The candidate...
- chooses to use standard library functions and is able to describe their behavior when asked. 
- is able to break down a complex system into elegantly structured components, and thoroughly describe the interaction model, the interface and the behavior Abstractions are clear and clean, given the problem definition, and keep open the possibility of future needs without significant refactoring.
- understands time and space complexity (even if they don’t use those terms) and can describe the characteristics of their implemented code if appropriate.

#### Leaning Yes Hire
The candidate...
- can describe the tradeoffs inherent in different approaches, and can articulate why a specific data structure is appropriate. 
- chooses to use standard library functions and is able to describe their behavior when asked.
  - examples:
    - chooses ActiveRecord over plain Ruby 
    - correctly uses `useEffect` to handle the asynchronous behavior of network requests
- is able to structure their solution in a way that separates classes appropriately and demonstrates a good understanding of OOP principles (even if they don’t use the specific terms). 
- makes intentional decisions about their React component structure and utilizes state and props to manage data efficiently.

#### Leaning Don’t Hire

The candidate...
- is able to write basic code, but does not demonstrate strong familiarity with their chosen language’s properties or built in features. 
- re-implements standard library functions, rather than using what is available. 
- provides a finished output that has the appearance of being bolted together, rather than being coherently designed. 
- builds abstractions, but are rigid or resistant to change.
- makes inconsistent decisions in their code (ex: sometimes destructuring props, but not always).

#### Strong Don’t Hire

The candidate...
- is familiar with common data structures, but cannot describe which ones are appropriate for the task at hand. 
- is unable to translate their thoughts into code. 
- is unable to speak to code or describe what it does. 
- does not seek to break out their code into reusable components, and doesn’t understand the value of doing so.
</section>

<section class="dropdown">
### 3. Testing and Debugging
Note: Testing is expected to be present for the backend and is considered "extra" for frontend.
#### Strong Yes Hire

The candidate...
- tests all sad paths and edge cases. 
- if any unexpected bugs appear during the interview, the candidate effectively debugs the issue.

#### Leaning Yes Hire

The candidate...
- tests all sad paths but may have missed some edge cases. 
- tests all happy paths and feature work. 
- begins a debugging process and posits some reasonable solutions to the problem if any unexpected bugs appear during the interview.

#### Leaning Don’t Hire

The candidate...
- tests happy paths but missed, or inffecetively tested, some sad paths. 
- could not identify edge cases. 
- begins a basic debugging process but is not able to come up with any solutions to the problem if any unexpected bugs appear during the interview.

#### Strong Don’t Hire

The candidate...
- does little to no testing. 
- does not spot glaring bugs in the code, if any, or does not attempt to debug when found.
</section>

<section class="dropdown">
### 4. Presentation and Communication
#### Strong Yes Hire

The candidate...
- frequently checks understanding when explaining a complex concept, and if there is any misunderstanding, is able to unpack the problem and effectively communicate the necessary information. 
- finds the precise word they want to convey the exact meaning they need (even if they take a few seconds to do so). 
- is able to explain with great precision why they took the steps they did on a project. 
- has put together cases that persuade a skeptical audience.

#### Leaning Yes Hire

The candidate...
- describes how their code works, unprompted, by talking about the purpose of a code snippet or its design 
- explains their thought processes very clearly using proper technical terms. 
- clearly imparts knowledge and concepts through appropriate means (ex: diagrams, body movement, writing and speech). 
- talks at a level appropriate to their audience When explaining something. 

#### Leaning Don’t Hire

The candidate...
- needs to say things multiple times to get their point across to a good faith listener. 
- can communicate an idea at a high level, but lacks precision and nuance in the details. 
- reads code line by line

#### Strong Don’t Hire

The candidate...
- intent is frequently unclear. 
- cannot clearly communicate their intentions or thought process. 
- spent little to no time explaining their thought processes. 
- Interviewer had to actively prompt the candidate with questions.

</section>

<section class="dropdown">
### 5. Documentation and Planning
#### Strong Yes Hire

The candidate...
- includes a README with a walkthrough (gif, screenshots, etc.) of the FE or Swagger for the BE to run requests. 
- include artifacts that demonstrate planning, like: schema, component tree, mock ups/wireframes, etc.
- effectively utilized a project board with clear user stories and there is a clear progression of tickets moved over to the Done column.

#### Leaning Yes Hire

The candidate...
- includes a summary, setup instructions, endpoints, instructions, etc. in the README. 
- can speak to their planning process and demonstrate they used some sort of artifact(s) to plan their solution, such as a component architecture diagram, wireframes, a minimal project board, a database schema diagram, etc. 

#### Leaning Don’t Hire

The candidate...
- has some documentation but there are gaps in the README such as missing setup instructions, endpoints/wireframes, or testing instructions. 
- starts using a project board in the beginning, but is abandoned by the end. 
- some tickets may have unclear user stories & descriptions.

#### Strong Don’t Hire

The candidate...

- has little to no documentation or planning documents (ie missing wireframes, schema designs, or use of project board).
- does not include accurate and clear instructions for running the FE and BE locally.

</section>