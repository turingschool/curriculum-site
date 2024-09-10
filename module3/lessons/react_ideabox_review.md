---
title: "React: Ideabox Review"
length: 3 hours
tags: javascript, react
module: 3
---

## Learning Goals
* 

## Vocab
* `wireframe` - a wireframe is a visual representation of the basic structure of a page, without worrying too much about specific content or design details
* `anonymous functions`
* `destructuring`
* `controlled form`
* 

<section class="note">
### Set Up

This lesson is a review session for the [Ideabox Tutorial lesson](./react_ideabox). If you did not complete all of the steps on that tutorial, you can clone down a completed version here: [https://github.com/turingschool-examples/react-ideabox](https://github.com/turingschool-examples/react-ideabox)

Follow the instructions for cloning, installing, and running the app. **You do not need to follow any steps for a running server.**
</section>

## Wireframing + Planning
Let's go back to the beginning. One of the most important parts of creating a React application is being able to visualize the components on the page. I am going to model for you how I would turn a concept into React components.

![IdeaBox screenshot](../../../assets/images/lessons/ideaBox/ideabox_screenshot.jpg)

For this process, you may choose to use an iPad, a tool like [Figma](https://www.figma.com/), or paper and pencil. What matters is that you're able to turn a wireframe into a plan for your component architecture. 

Let's work out the following:
- What components should we create?

- How will those components be related to each other? (Draw out your [component tree](https://react.dev/learn/understanding-your-ui-as-a-tree))

- Which components should hold state? What data will be held in state?

- Which components will hold methods that affect our data?

- What props will we need to pass around?

Now that we've got a general plan, let's consider these questions:
- Why can't we just pass the ideas between the `Form` and `Ideas` components?

- Where should `addIdea` live? It will be triggered by the button in `Form`, but it will update the state living in `App`. Which component should contain that method?

- Will we ever pass props to `App`? Why or why not?

- Is there a way to pass a prop directly to the desired child, or do you have to pass to every child component down the tree to get to where you want?