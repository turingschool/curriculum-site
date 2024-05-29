# Turing School of Software and Design
## Software Development Program Curriculum

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

## Site for the Turing Program

This site is built with Jekyll. Find the docs [here](https://jekyllrb.com/docs/usage/)

The live site can be found at [https://curriculum.turing.edu/](https://curriculum.turing.edu/)

This curriculum is used in conjunction with a repo of practice exercises and examples found at [https://github.com/turingschool-examples/se-mod1-exercises](https://github.com/turingschool-examples/se-mod1-exercises)

### Contributing

* Clone the repo `git clone git@github.com:turingschool/curriculum-site.git`
* Note: You will need Ruby 3.2.2 installed ([setup instructions if needed](https://mod0.turing.edu/computer-setup#install-rbenv))
* Run `bundle install`
* You can now begin to edit the website.
* To start the server run `bundle exec jekyll serve --incremental`.
* Navigate to `localhost:4000` to see the site
* You can push changes to production by pushing the `main` branch to github. `git push origin main`.
* The changes may take a minute or two to be recognized on production. Please make sure you review your changes on production.

## Structure of the site and where to find the most important things:

You will find a module specific directory. eg `module1` and within each directory you will find a directory for `lessons` and `projects`. All files within this site can be written as either markdown or html. To link to each you just need to write the relative path to each file without the file extension. For example `lessons/lesson_on_stuff`.

The `navigation.html` file is where you will find the sidebar for the site.

The `today.html` file is where you will find the basic html page for today, and each file for the specific day will live within the `today` directory.

## Styling Your Lesson Plans

You can add styled boxes to your lesson plans for different areas of content.

#### Standard Box:

```html
<section class="call-to-action">
### In Your Notebook

What would you expect to be logged when we get to line 10? Why?
</section>
```

Will result in the following styled box:

![styled-box](https://user-images.githubusercontent.com/17582916/60548262-e75fd180-9cde-11e9-8964-03c4ee6152d9.png)

#### Answer/Solution Box:

The heading in the answer box *must be an h3*. You can include any text within the section after that

```html
<section class="dropdown">
### The Answer  

Here is an answer to the On Your Own section...
</section>
```

Will result in the following styled box:

![collapsed answer](https://user-images.githubusercontent.com/17582916/72355972-a725d680-36a5-11ea-8755-077ebf0d34dc.png)

![expanded answer](https://user-images.githubusercontent.com/17582916/72356019-be64c400-36a5-11ea-87e6-a5a7310db2bc.png)

#### Note Box:

```html
<section class="note">
### Note

This hoisting behavior adds some complexity to the JavaScript language, and is important to understand thoroughly in order to anticipate the values of your variables at any given time.
</section>
```

![note-box](https://user-images.githubusercontent.com/17582916/60548280-f2b2fd00-9cde-11e9-848c-6d58f4b6ebde.png)

#### CFU/Exit Ticket Box:

```html
<section class="checks-for-understanding">
### Exit Ticket

What are 3 easy and actionable accessibility steps you can take in all of your projects from here on out?
</section>
```

![cfu-box](https://user-images.githubusercontent.com/17582916/60548305-ff375580-9cde-11e9-9e06-739244d68973.png)

**DO NOT INDENT YOUR MARKDOWN** within the section tag, or else it will not work.

### Headers in your markdown files

Put something like this at the top of all your markdown files:

```yaml
---
title: Name of lesson
subheading: lesson is about stuff
layout: page
---
```

- `subheading` is optional
- `layout` is basically always going to be `page`

### Index.md instead of Readme.md

The system we're using to translate from github to curriculum.turing.edu uses index files instead of readme files. Where you would have created a file called `readme.md`, just use `index.md` instead

### Links and Paths

When linking to a markdown file, drop the `.md` in your link. Instead of linking to `learning_to_pair.md`, just use `learning_to_pair`. Other files, like PDFs and PNGs, keep the original extension.

#### Absolute vs Relative paths

Since you're editing on github, and viewing at curriculum.turing.edu, you'll probably want to use *relative* links instead of *absolute* links. I found a primer on the difference. It's in the context of HTML instead of Markdown, but should basically explain the concept: http://www.boogiejack.com/server_paths.html

### Your markdown will behave differently

Github uses a slightly different system for translating from Markdown than the engine we use for curriculum.turing.edu. Here's some things that I had to change to get things to look right on the site, even if it looks right on Github.

- Put a space after your `#`'s in headers
- Put a blank line between your headers and any content below
- Replace any `|` with `\|` unless you're really trying to do a table
