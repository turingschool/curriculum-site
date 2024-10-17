---
title: Environments and Continuous Integration
length: 1.5 hours
tags: environments, continous integration
module: 4
---

## Learning Goals

By the end of this lesson, you will:

  * Understand what an environment is and what types there are
  * Dive into environment variables and what types of data can be stored in them
  * Know how deploy your application to Heroku

### What are environments?

Environments in software development refer to the place where your code runs. The “where” in this definition is less of a physical location, and refers more to a configured setup of tools, platforms, hardware and software. Each environment typically corresponds with a specific phase of the release process.

## A Brief History

### Stage 0: One Environment

In the beginning, we developed our applications directly in production. This was problematic for a number of reasons. Mainly, you had to deploy your code in order to see feedback. Think of how many times you write some functionality incorrectly. Every time you push broken code to production, it’s breaking the user experience for people who are currently on your application.

## Stage 1: Two Environments

**(Development, Production)**

To alleviate this issue, we created development environments. Development environments are intended to:

  * shorten the feedback loop (you can see if your code is working much more quickly without having to wait for a build or deployments)
  * give us a low-risk place to write our code and try it out

Development environments typically live on your laptop and allow you to configure the application in a way that makes it easiest for you to actually develop. (e.g. you might use unminified versions of libraries and packages to make debugging easier)

While the development environment provided us with some answers to the problems with a single production environment, it also introduced some new ones:

* Just because it works on your machine, does not mean it will work on others (e.g. you might have a node module installed locally that is a lower version of one that gets installed in production if you haven’t locked down your package versions)
* Although rare, hardware can sometimes change how software behaves. So the system that is running your application might not be exactly the same as the one running it in production.

### Stage 2: Three Environments

**(Development, Staging, Production)**

So, we created another environment that we call staging. This environment is meant to execute our code in an environment as close as possible to production, without actually disrupting production. The staging environment will often be accessible only internally so that employees and team members can do a round of quality assurance before deploying to production.

### Stage 3: Four Environments

**(Testing, Development, Staging, Production)**

As we began to focus on automation, we developed more advanced test suites that would do their own round of quality assurance on our code before even showing it to team members. We’ve created testing environments to run our automated test suites that verify the integrity of our code.

### Stage 4: Five Environments

**(Testing, Development, CI, Staging, Production)**

There is yet another environment that is common on modern development teams: Continuous Integration. It exists to run our tests, report back with success or failure, and in some cases, take additional action.

We all know to run our tests before we push, or after we merge, or before we deploy, but a continuous integration environment ensures that tests are run. We can’t forget. You can even add CI tools to your production deployment process, such that any commit that doesn’t pass its tests will be rejected.

## Modern Environments


* Development:
  * the application is actively being developed
  * should contain software that’s similar to that found in staging and production
  * likely does not have similar hardware as staging and production
* Testing:
  * the application is actively being tested, likely by an automated test suite
  * uses pre-defined, rigid data for testing purposes
* CI:
  * the application is running a complete build to ensure everything is working as expected under a given setup
  * should have the same software as your production environment
  * is usually connected to your version control system
  * often connected to staging and production for automatic deployments
  * needs access to the exact data you’re using in your test environment
* Staging:
  * a pre-release phase of the release process where internal team members may do a round of quality assurance
  * should be hardware and software identical to production
  * uses production-like data (often times you’ll grab a data dump from production to seed staging)
  * has to consider privacy (is usually only intended to be accessible internally within the company or organization)
* Production:
  * the live, released version of the application
  * defines the standard/expected hardware and software for the application

## Configuration

Environments can differ from each other in many ways. For example:

* You might want the mocked-out data in your test seeds to be more predictable/rigid than the data seeds you work with in development
* Your database connection strings will change between environments because you can’t and don’t want to use the same database in production that you’ll be using in development
* The configuration for automatic deployments will vary based on where your staging vs. production applications live
* The hostname for your different URLs will vary
* The port your application runs on might be 3000 in development, but 8080 in production depending on the tech stack and where it’s hosted.
* You likely want to use unminified versions of libraries and packages in development & testing for debugging purposes, but always want minified versions in production for performance reasons.

### Environment Variables and Storing Sensitive Data

To handle these differences, we use environment configurations and variables. Environment variables represent values that differ between environments. They’re used across languages and platforms to set configuration options. They allow the same logic and code to interact with different sources. They are most often found in configuration files for server-side logic or build tools, and sometimes contain sensitive or private data such as API keys and database connections.

Because API keys and database connections can contain sesitive data, you don’t want to commit this to GitHub. Pushing up to GitHub can allow others to have access to your keys, allowing them to track your data or make API calls on your account. Instead of hardcoding their values into the codebase, we can store all of this sensitive information into environment variables in a .env file that is gitignored.

<section class="call-to-action">
### Environment Variables and Frameworks

The way you create environment variables can change depending on the framework you're using. For example:

* **React**: You will need to create a .env file in the root of your project. Instructions [here](https://create-react-app.dev/docs/adding-custom-environment-variables/)
* **Rails**: We've seen sensitive variables (like API keys) be stored in encrypted credential files. There are also configuration files and initializers available for other variables. Instructions [here](https://guides.rubyonrails.org/v5.1/configuring.html)

</section>

## Getting Setup with Heroku

With your GitHub Student Developer package, you should have free monthly credits for Heroku. You're welcome to explore other platforms, too, as most offer one free project at a time. 

Below are setup instructions for Heroku. 

1. Get Heroku CLI with `brew tap heroku/brew && brew install heroku`
2. Login to Heroku with `heroku login`
3. You can also choose to login and create an application through the online Heroku dashboard. If you want to create an app through the command line, run `heroku create <app_name>`
4. If you go back to Heroku in your browser, you should now see that you have an app listed under your [personal apps](https://dashboard.heroku.com/apps) that corresponds to the one you just created from the terminal. This command also added a new remote repository to our application. You can see all of your remote git details by running the following command: `git remote -v`
5. Finish Deployment: Follow based on what framework you are using. Rails instructions are [here](https://devcenter.heroku.com/articles/getting-started-with-rails7#create-a-heroku-app) starting with "Creating a Heroku App". React instructions are [here](https://blog.heroku.com/deploying-react-with-zero-configuration)

<section class="call-to-action">

### Heroku Errors

You will inevitably have issues in production and can sometimes run into an unhelpful ‘Application Error’ when opening your app on Heroku. As a result, it’s definitely important to learn how to read the Heroku error logs. To read the Heroku logs, input the following commands below and address any errors that might be occuring.

```bash
// Gets you all the logs
$ heroku logs

// Gets you the latest log
$ herokuu logs --tail
```
</section>

<section class="call-to-action">

### Heroku Environment Variables

In order to set your environment variables in production, you will need to navigate to your app [here](https://dashboard.heroku.com/apps) and then click on "Settings". From there, click "Reveal Config Vars" where you can set variables. For Rails, for example, you will need to add your RAILS_MASTER_KEY.


</section>

### Checks for Understanding

* What is an environment
* What are the 5 different environments your code might run in and what are each of them used for?
* What kind of data might be stored in an environment variable?