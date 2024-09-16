---
title: Intro to Accessibility
length: 120
tags: html, ARIA, accessibility
---

### Learning Goals

* Define accessibility and explain why it's important to us as developers
* Identify different user groups we should be developing for
* Gain some insight into how others might interact with the web that's different than the way we do
* Be able to use the three different types of ARIA attributes
* Determine when ARIA is and is not needed to make websites more accessible

## Vocab

- `Accessibility` Broadly, creating an experience that is available to anyone and everyone
- `VoiceOver` A screen reader that is built into apple computers
- `ARIA` Accessible Rich Internet Applications
- `Role` The function an element serves on the page.  *"What is this element?"*
- `State` The state of an element on a page (e.g., expanded, disabled). *"What is the status of this element?" (Boolean, changes and must be updated/kept current with JS as application is used)*
- `Property` Additional information about an element or other elements its related to.  *"What other info is important about this element?"*

##  What is accessibility?

Accessibility on the web is all about creating a user experience that is available to anyone and everyone. We want to enable as many people as possible to use our applications, even when those users may be limited in some way.

The Web is fundamentally designed to work for all people, whatever their hardware, software, language, culture, location, or physical or mental ability. When the Web meets this goal, it is accessible to people with a diverse range of hearing, movement, sight, and cognitive ability.

<section class="note">
### What does this mean?

This means that any new specifications or enhancements that come to the web are BY DEFAULT designed to be fully accessible to a complete audience.
</section>

Unfortunately, developers often use the tools we're given in the wrong ways, unknowingly (or uncaringly) effecting the accessibility of their site in a negative way.

A quick example: not using semantic HTML tags. If you were to use a `div` instead of an `article` to wrap text for a news article, that means infinitely less to someone relying on a screen reader.

But for some reason we do it anyway!! So the good few souls out there that are really pushing for accessibility have even added additional attributes and APIs you can use to allow you to write your code the way you want, and still make it accessible.

e.g. if you really wanted to use your `div` tag instead of an `article` tag, you could do something like `<div role="article">` and this would provide that same accessibility feedback as if you had used an article tag.

So we have all the tools to make our applications very accessible. While we won't learn about all of them just yet, we will learn about what types of accessibility concerns actually exist, and gain some understanding of how others might be interacting with the web.

## Types of Accessibility Concerns



<section class="call-to-action">
### Shout Em Out!

What are some types of limitations our users might have when using the web?  How might you categorize them?

* Describe how this limits the user.  What kind of web content or devices might they have difficulty interacting with?
* How might you adjust your web content to alleviate that issue?
</section>

<section class="answer">
### Potential Categories  

1. Auditory - This might relate to someone who is deaf / has a hearing loss.  Imagine trying to watch content such as YouTube without captions!
2. Visual - This revolves around those that are blind and unable to interact with tech visually.  Color blindness is also very common in trying to distinguish the difference between colors such as greens and reds, blues and yellows, as well as complete color blindness.
3. Cognitive - This can include any learning disability including dyslexia.
4. Mobility - This can relate to dexterity issues such as the difficulty of typing on a phone, the placement of icons and navigation elements, etc.  
</section>

## Station One

<section class="call-to-action">
### Using a Screen Reader

* Watch the following [video to see how a screen reader understands a page](https://youtu.be/qdB8SRhqvFc?t=417){:target='blank'} from **6:57 to the 9:40** mark.

Using the built-in screen reader on your machine, VoiceOver, close your eyes and navigate through the following two codepens, one at a time:

* [Non-Semantic HTML Form](https://codepen.io/damwhit/full/JZmeqQ){:target='blank'}
* [Semantic HTML Form](https://codepen.io/damwhit/full/WyaMaQ){:target='blank'}

Here are some helpful VoiceOver commands:

* **Starting/Stopping VoiceOver:** command + F5 (if you do not have an F5 key, you can navigate to  > System Preferences > Accessibility > VoiceOver > Enable VoiceOver)
* **Moving your VoiceOver cursor:** control + option + arrow key (ie. control + option + right arrow)
* **Moving your VoiceOver cursor into your web page’s content:** control + option + shift + down arrow
* **Moving your VoiceOver cursor out of your web page’s content:** control + option + shift + up arrow

*Note: use your screen reader very slowly, and really listen to what it's telling you. It will remind you of the commands to enter/navigate a particular piece of content.*

**Questions:**
* What effect does the way we write our HTML have on a screen reader?
* What was difficult about using a screen reader?
* Did you cheat and open your eyes?
</section>

## Station Two


<section class="call-to-action">
### Color Blindness
 
Install a colorblind simulator for Chrome. 

* [Colorblind](https://chrome.google.com/webstore/detail/colorblind-dalton-for-goo/afcafnelafcgjinkaeohkalmfececool/related?hl=en){:target='blank'}

Navigate to some of your most visited sites -- especially those that have some sort of notifications that you would expect to be red (error), yellow (info/warning), green (success). (You can also look at design sites like [Dribbble](https://www.dribbble.com){:target='blank'})

**Questions:**
* What would be difficult about navigating the web while color blind?
* What might you do to help the color blind more clearly interact with your applications?
</section>



----------------------------------------------



## Station Three

<section class="call-to-action">
### Tabbing

Watch the following [video](https://youtu.be/hKIQkgPVXH4?t=307){:target='blank'} from **5:07 - 9:50**.

**Questions:**
* What are some key takeaways from this video snippet?
* What can you do to make sure your page is accessible just through the keyboard?

Go to a site you're less familiar with, and try to accomplish a specific task just by tabbing through. Some ideas:

* go to the United Airlines website and try to book a flight outta here
* go to USPS and try to calculate the price of a package shipping
* go to Facebook and try to comment on a post
* go to your grocery store site and add some things to your cart

No use of the trackpad is allowed!

**Questions:**
* What was your experience like? Was anything frustrating or confusing about the process? What could you do to solve the frustrations you encountered?
* How was the focus on your current selection? Did you tab into any drop down menus for selecting specific options?
</section>

## Station Four

<section class="call-to-action">
### Accessible Text

Check out the following [site](http://geon.github.io/programming/2016/03/03/dsxyliea){:target='blank'} that replicates what it *could* be like to read text with Dyslexia. 

Read the following article on our good font friend, [Comic Sans!](https://www.thecut.com/2017/03/the-reason-comic-sans-is-a-public-good.html){:target='blank'}

Read the following [article on strategies for making text more accessible]( https://www.makeuseof.com/tag/reading-web-dyslexia-heres-make-easier/).

**Questions:**
* What strategies for accessible text could you implement?
* How might you accommodate those with dyslexia while maintaining the original experience for those without?
</section>




----------------------------------------------


<section class="call-to-action">
### Audits 

Browser vendors are beginning to work some accessibility checks directly into our good friend, dev tools. Let's see what we can learn from them! 

**Lighthouse**
* Open up your dev tools panel on the current lesson plan.
* Click on the 'Lightouse' panel of dev tools
* Select the following  options to run an accessibility check on the page
  * Navigation (Default)
  * Desktop
  * Accessibility (ensure you have only this option checked)
* Click 'Analyze Page Load' (your dev tools may disappear for a while, or your screen may go blank, just wait it out)
* Take time to look into:
  * Navigation Items - open the drop down to learn more
  * Additional Items to Manually Check - click 'Show' to see the list of items you should check manually
  * Passed Audits - click 'Show' to see what the audit checked for specifically 

**WAVE Evaluation Tool**
* Download the [Chrome Extension](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh?hl=en-US)

Read through the passing, failing, non-applicable and manual audits for this page:
* What accessibility concerns have come to light? WHY are they accessibility concerns?
* What strategies may you have learned based on the failing audits? Passing audits?
* Run the audit on your paired project, and take note of what issues you might need to resolve
</section>

## WAI-ARIA

Web Accessibility Initiative - Accessible Rich Internet Applications.

[WAI-ARIA](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics){:target='blank'} is a set of **attributes**  we can add to our HTML tags to make our code more semantically meaningful for screen readers.

Think about the information provided by a set of `<div></div>` tags. What do we know about the content within those tags? Really, we know nothing. It’s a semantically void element that controls the APPEARANCE of its content - by default it is a block style element, but beyond that it could theoretically be literally any kind of data - a title, a paragraph, an image, a random red decorative sidebar…etc.

ARIA provides a series of tools and approaches to enhancing the meaning of your code. Today we will look at the three main aspects of ARIA - Roles, States, and Properties.

* __Roles__
* __States__
* __Properties__

*An element can only have one role at a time, but can have as many properties and states as necessary*

An important point about WAI-ARIA attributes is that they don't affect the appearance or functionality of a web page, except for the information exposed by the browser's accessibility APIs (where screen readers get their information from). WAI-ARIA doesn't affect webpage structure, the DOM, etc., although the attributes can be useful for selecting elements by CSS.

<section class="call-to-action">
What are some attributes you might put on an HTML element that don't show up on the page?
</section>

<!-- ![Aria Tree](/assets/images/aria.jpg) -->

#### Rules of ARIA Use
The core rules to keep in mind when using ARIA are:

If you can use native HTML elements and attributes to communicate the proper semantics (like `<header>`, `<nav>`, `<main>`, `<footer>`, `<button>` etc.) and then do so. Adding ARIA support where it’s not needed is __redundant code__ that isn’t doing anything. For the most part it won’t lead to problems, but it is a waste of time, and will annoy your screen reader users.

**Many "accessibility flags" come from developers _overusing_ ARIA. Only use ARIA as a last resort!!**

## Aria Roles, States, and Properties

### Roles

Roles define what an element is - what function it serves on the page. They give screen readers more information about how to interact with the element (`What am I?`)

These can be either **implicit** or **explicit**.

Implicit roles are those that are pre-defined by default in HTML. Ie: `<h1></h1>`, `<button></button>`, `<ul></ul>`. The semantic meanings of these elements are already clear by the element themselves and assistive technologies have this information too.

If you are writing good semantic HTML, the role will likely be implicit. Remember you can always check the role [here](https://www.w3.org/TR/html-aria/#docconformance){:target='blank'}

Implicit Role Example:

```html
<h1>Hello World</h1>
<!-- The above markup has an implicit role of "heading level 1" -->

<nav></nav>
<!-- The above markup has an implicit role of "navigation" -->
```

Explicit Role Example:

```html
<form role='search'></form>
A form element has a role of 'form' by default. We can override that role using the `role` attribute and providing it another value. Like in the case above where we are using the role of search.
```

<section class="call-to-action">
### In Groups
- Use the [Table of elements and their implicit roles](https://www.w3.org/TR/html-aria/#docconformance){:target='blank'} and look up the following elements and their implicit roles
  - `<div>`
  - `<form>`
  - `<main>`
  - `<input>`
- Check out some of the other elements. Is there anything surprising?
- Take turns explaining what a role is.
- What is the difference between implicit and explicit roles?
- BONUS: Can you think of other examples for when we might want to override a default role?
</section>

## States

States describe how you are interacting with an element (What am I doing right now?) and rely on _boolean logic_.

For example, think about websites that have a sidebar menu that can be toggled open or closed. You might see something like this:

```html
<button>
  Toggle Menu
</button>
```

Here we have a button with text that says "Toggle Menu", probably indicating that when you click on said button it will toggle the menu open or closed.

What this doesn't tell you is if the menu is already open or closed, which is fine if you are a sighted user, but probably not great if you use assistive technology.

Luckily ARIA provides state information that we can add to our markup.

```html
<button
  id="menu-button"
  aria-expanded="true"
>
  Toggle Menu
</button>
```

```javascript
let button = document.getElementById("menu-button");

button.addEventListener("click", function() {
  let attr = button.getAttribute("aria-expanded");

  if (attr === 'true') {
     button.setAttribute("aria-expanded", false);
  } else {
     button.setAttribute("aria-expanded", true);
  }
});
```

This also allows you to target these elements using the `aria-expanded` attribute when interacting with them in your JavaScript or CSS.

States can also be implicit, imagine a checkbox element in html. If you toggle the checked property that state will change as well.

----------------------------------------------


<section class="call-to-action">
### Accessibility Style Guide 

Explore w3's style guide on building accessible UI elements. In small groups, choose a UI element and see how it interacts without using your mouse. What are the 'rules' for this UI pattern? What WAI-ARIA attributes are needed?
</section>

<section class="checks-for-understanding">
### Exit Ticket

In your project groups, file issues for all accessibility concerns that need to be fixed 
</section>