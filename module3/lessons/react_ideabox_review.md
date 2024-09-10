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

## What's an Ideabox, anyway?
IdeaBox is a Turing term meant to describe a simple application that allows a user to fill out a form and then display that information. If you think about it, there are LOTS of "IdeaBoxes" out there:
    - Facebook: users fill out a form and their post appears
    - Google: users fill out a form and search results appear
    - Amazon: users search for an item and a list of items appear
If you can build lots of versions of IdeaBoxes in M3, you'll be well equipped to build pretty much anything you're asked to. You can find inspo for those IdeaBoxes [**here**](../projects/ideabox_practice)!

## Wireframing + Planning
Let's go back to the beginning. One of the most important parts of creating a React application is being able to visualize the components on the page. I am going to model for you how I would turn a concept into React components.

![IdeaBox screenshot](../../../assets/images/lessons/ideaBox/ideabox_screenshot.jpg)

For this process, you may choose to use an iPad, a tool like [Figma](https://www.figma.com/) or [Mockflow](https://mockflow.com/), or [paper and pencil](https://medium.com/@ray_vevaina/wireframing-a-front-end-developers-best-friend-c541df51ea65). What matters is that you're able to turn a wireframe into a plan for your component architecture. 

Let's work out the following:
1. What components should we create?

1. How will those components be related to each other? (Draw out your [component tree](https://react.dev/learn/understanding-your-ui-as-a-tree))

1. Which components should hold state? What data will be held in state?

1. Which components will hold methods that affect our data?

1. What props will we need to pass around?

Now that we've got a general plan, let's consider these questions:
1. Why can't we just pass the ideas between the `Form` and `Ideas` components?

1. Where should `addIdea` live? It will be triggered by the button in `Form`, but it will update the state living in `App`. Which component should contain that method?

1. Will we ever pass props to `App`? Why or why not?

1. Is there a way to pass a prop directly to the desired child, or do you have to pass to every child component down the tree to get to where you want?

## React Dev Tools

Let's take a minute to look at the React Dev Tools. If you haven't already, [install the dev tools Chrome extension](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) now. 

Run your Ideabox in the browser and open up your dev tools. Navigate to the "Components" tab. Answer the following questions:
1. What props are being passed to the Form component? What component is passing those props?

1. What props are being passed to the Ideas component? What component is passing those props?

1. When you add a new idea, what component is created? What props is it being passed?

1. When you add a new idea, what component(s) have a state change?

1. As you fill out the form, where can you see the form values being stored in state?

1. Do you think this means we no longer need to `console.log`?

## Controlled Forms

Now that we've seen what the Form's state looks like in the dev tools, let's talk a bit more about controlled forms. From the [React docs](https://legacy.reactjs.org/docs/forms.html#controlled-components):

<blockquote><p class='text'>
"In HTML, form elements such as input, textarea, and select typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with setState().
<br />
<br />
We can combine the two by making the **React state be the 'single source of truth'**. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”."
</p></blockquote>

Basically, we want our React state to be our single source of truth when it comes to what the user is seeing. We want to make sure that every update made on the page is logged in our state. We can write our forms so that every keystroke triggers a state update and (as always) every state update triggers an update on the screen. To the user, there is no difference. But to the developer, we now have much more control over the data.

Consider the following questions:
1. In your own words, what is a controlled form and why do we use them in React?

1. How does using a controlled form help us with form validation as frontend devs?

