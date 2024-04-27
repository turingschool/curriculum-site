---
layout: page
title: Module 3
subheading: Intermission Work
---

# Required

You must complete and submit all of these assignments. *It is due the Saturday before the start of the inning at 5pm.*

Submit your work here: [Survey Link](https://forms.gle/SzrTxMFjYUQLbqbY8)

You must use Ruby 3.2.2 and Rails 7.1.x for all of the work in this module. You can check your version by running `ruby -v` and `rails -v` in your terminal.

Note: If you are installing Ruby 3.2.2 for the first time, you WILL have to reinstall all of your gems. Gems reside on your computer per version of Ruby, and every time you add a new version of Ruby, you will have to reinstall all of your gems for that version of ruby.

If you need a guide on how to upgrade [check this out](https://curriculum.turing.edu/module3/misc/ruby_and_rails_versions).


## Core Learning Goals of Mod 3

* API Development / Consumption
* Authentication / Authorization systems
* Managing deeply-nested data collections
* Refactoring code into new Design Patterns

---

### Professional Development

To start your Professional Development work in mod 3, plan to spend 60-90 minutes completing [this async lesson on crafting your Resume](https://docs.google.com/presentation/d/13IGrf4TKWQ47tIuP0Ls8YjHjjpXuGJ3S6DEHT26wkgE/edit#slide=id.p1).

### Intro to APIs

Everything we build in Mod 3 will focus on the theme of building and consuming APIs.

Here are some helpful videos and tutorials that you can use to familiarize yourself with both building and consuming APIs. The videos are using Rails 5, but the concepts are the same. The build an API in Rails Tutorial has been updated to use Rails 7.

To begin, familiarize yourself with the concept of an API by reading [this AWS article, _"What is an API?"_](https://aws.amazon.com/what-is/api/). For mod 3, we will focus on REST APIs.

Then, complete the following:

1. [Consuming an API](https://github.com/turingschool/backend-curriculum-site/blob/gh-pages/module3/lessons/consuming_an_api.md)
2. [Building an API in Rails Tutorial](https://github.com/turingschool/backend-curriculum-site/blob/gh-pages/module3/lessons/exercises/building_an_api.md)
  * We recommend following along with this lesson by watching **one** of these videos:
     * [Instructor Dione Wilson demonstrates the process of building an API for 2006](https://vimeo.com/469621034/d0d5febb9d)
     * [Instructor Ian Douglas demonstrates the process of building an API for 2005](https://vimeo.com/452734115/8b3bd1adf0)
3. [Download & Install Postman](https://www.postman.com/downloads/). **NOTE:** do not use the web version, you will want to download it in order to use all features.
4. [Play with Postman in order to use the API you built out in the previous lesson.](https://learning.postman.com/docs/getting-started/overview/)
5. Review your reflections on your M2 projects, and revise / add onto them.

### Read / Take Notes
* [Sandi Metz's _Rules for Developers_](https://robots.thoughtbot.com/sandi-metz-rules-for-developers)

### Deeply Nested Collections

When consuming APIs, the data is often returned in deeply nested collections, so you will need to tap into your Mod 1 skills to practice digging through them to retrieve the data you need.

Fork and clone [Here Be Dragons](https://github.com/turingschool-examples/here-be-dragons). Get the tests to pass. This is something you'll turn in with your submission, so make sure you make a forked copy of it.

### Authentication / Authorization

Write up some notes and ideas on the following:
- you need to store a user in a database table; what do we need to know about them (ie, email, password)
- how can we store a password in a secure way (ie, if our database is compromised, how can we protect their passwords from prying eyes)
- how would we store the idea of what a user is allowed to do on a web site
- how would we build a safe login page
- how could we tell if a user is logged in since HTTP is "stateless"
- how could we allow a user to "stay logged in for 7 days" even if your Rails app is restarted


### HTTP Request/Response Review

* On one piece of paper, write out all of the parts of an example `HTTP GET` request (Diagram the DNS look-up as well as how a Rails Application would handle the request via MVC)
  * **Even better:** write your explanation as a metaphor
* On a separate piece of paper, write out an example 200 response to that request with all of the parts


### Rails `"params"` magic

How does "params" get built in Rails, and what precidence is given for query parameters (ie `?id=5` in a URL) versus dynamic placeholders (ie `/book/:id`) versus data sent in the body of a request from a form.

Start writing up some notes based on the Rails documentation:
* [Rails Docs - Parameters](https://guides.rubyonrails.org/action_controller_overview.html#parameters)


### SQL/ActiveRecord

Entering Module 3 with a solid understanding of ActiveRecord and SQL is key to getting the module off to a good start. Make sure you are able to write and understand queries that involve multiple `JOIN` statements and that combine math functions.

1. Complete and understand the [Intermediate SQL I](https://github.com/turingschool/lesson_plans/blob/master/ruby_03-professional_rails_applications/intermediate_sql.md) challenges.
1. Complete and understand the [Intermediate SQL II](https://gist.github.com/case-eee/5affe7fd452336cef2c88121e8d49f5d) challenges.


---

# For further exploration

If you have time, here are some activities that will be valuable not only in Mod 3, but in Mod 4 and the job hunt as well.

### Data Structures And Algorithms

Read: [An Overview of Data Structures for Ruby Developers](https://www.rubyguides.com/2019/04/ruby-data-structures/)

We are going to be covering various data structures to prepare you for the job hunt and technical interviews. Complete this former M1 project, [Beat Box](https://curriculum.turing.edu/module1/projects/beat_box).

If you've done Beat Box, let's get serious and have a [Date Night](https://curriculum.turing.edu/module1/projects/date_night)!

### Security

* Read the docs on [Rails Security](https://guides.rubyonrails.org/security.html). We recommend focusing in particular on the sections regarding:
  * Sessions
  * CSRF
  * User Management
  * Injection

