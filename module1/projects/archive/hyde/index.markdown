---
layout: page
title: Hyde
---

Writing your own blogging engine is almost a right of passage for aspiring web developers. In this project you'll build a "Static Site Generator" -- a system that allows the author to write content in a writing-friendly format (like Markdown), then the system generates HTML and puts it all together. For reference, existing systems that do this include [Jekyll](https://jekyllrb.com/), [Middleman](https://middlemanapp.com/), and many others.

## Project Overview

### Learning Goals

* Use tests to drive both the design and implementation of code
* Decompose a large application into components
* Use test fixtures instead of actual data when testing
* Connect related objects together through references
* Learn an agile approach to building software

### Getting Started

1. One team member forks the repository at https://github.com/turingschool-examples/hyde and adds the other(s) as collaborators.
2. Everyone on the team clones the repository
3. Setup [SimpleCov](https://github.com/colszowka/simplecov) to monitor test coverage along the way

## Key Concepts

From a technical perspective, this project will emphasize:

* File I/O
* Parsing and Markup
* Encapsulating Responsibilities
* Light data / analytics

## Evaluation Rubric

Available [here](rubric).

## Code Sanitation

To help give us a more automated approach to evaluating code cleanliness in the project, the template includes the [Cane](https://github.com/square/cane) and [Reek](https://github.com/troessner/reek) gems. These tools will analyze your codebase and print out warnings for common problems like:

* Long methods
* Long lines
* Too many branches

To run the sanitation checker, use this command (from the root of your project):

`$ rake sanitation:all`

## Project Iterations and Base Expectations

Because the requirements for this project are lengthy and complex, we've broken
them into Iterations in their own files:

* [Iteration 0](iteration_0) - Generating a new Hyde project
* [Iteration 1](iteration_1) - Building Hyde source files into HTML
* [Iteration 2](iteration_2) - Generating new blog post files
* [Iteration 3](iteration_3) - Customizing site design with layouts and CSS
* [Iteration 4](iteration_4) - Supporting post "tags"
* [Iteration 5](iteration_5) - Supporting features #1
* [Iteration 6](iteration_6) - Supporting features #2

### Possible Supporting Features

* Partials
* CSS preprocessor (using sass or less)
* Gem extraction
* Include a dev server for serving built files
* FS Event Watcher to rebuild automatically on file change
