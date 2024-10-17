---
title: Continuous Integration
length: 1.5 hours
tags: continuous integration
module: 4
---

### Goals

By the end of this lesson, you will:

- Understand what continuous integration is and why it's important
- Be familiar with a typical deployment flow for agile teams
- Be able to set up CircleCI for continuous integration and automatic deployments for front-end or back-end applications. 

## Important Vocabulary

- **local environment**: A version of an application that a developer can edit and run on their own machine (i.e. an application run on localhost). 
- **production environment**: A deployed version of an application that the end user can interact with (i.e. a final project deployed on Heroku or Fly.io)
- **lower environments**: Any environments that are internal to a team/company and are used for development purposes. Lower environments usually include a testing/QA environment that's used for testing and/or a staging environment that's used for showcasing features before a release. Lower environments are not viewable by the end user. 
- **deployment**: The process of making software (with new features and changes) available in a target environment
- **deployment pipeline**: A system of automated processes (often managed by a CI tool) responsible for facilitating the building, testing and deployment of code from a version control system to production.

For further reading on environments and the history of multi-environment deployment processes, refer to [this lesson](./environments)

## What is Continuous Integration

Continuous integration (CI) is the practice of merging code to a main branch ("integrating" code) regularly and verifying the quality of merged code with the help of automated build and testing tools. This practice developed out of the pain and struggles developers felt after dealing with problems integrating different branches and features that had been developed in isolation over the course of weeks or even months. In order to properly practice continuous integration on software teams, developers should diligently monitor these automated tools so that when an error is detected, they are able to promptly fix it. Development teams often find that this practice allows them to more easily and quickly deploy integrated code with fewer bugs. 

Continuous integration is not the same as continuous delivery, but it is closely connected. Continous delivery means keeping your application in a "deployable state" so that it can be released at any time. CD is often associated with releasing smaller changesets more often, rather than huge releases at a less frequent cadence. You cannot practice continuous delivery without also practicing continous integration. Many teams these days will rely on some sort of automated service to handle testing these changesets and facilitating frequent releases.

Some of the most common CI services you'll hear about are [TravisCI](https://travis-ci.com/), [CircleCI](https://circleci.com/), [Github Actions](https://github.com/features/actions), and Jenkins. They all behave similarly, though each tool's setup and configuration process is slightly different. Focus on integrating CircleCI to perform a full build of an application, test it using our test suite, and automatically deploy our changes to Heroku.

## Why Use a CI Tool?

It is important to run and test a complete build of your application before you release it to production. Think of how easy it was to deploy new changes to your production apps on Heroku. You would make a commit, which would immediately be reflected on production after running `git push heroku main`. What if that commit introduced breaking changes? There is no safeguard or filter against pushing up bad code. With a CI tool like CircleCI, we can still take advantage of automatic deployments, but we also get an extra layer of assurance that our app is in good condition before any changes are pushed live. 

CircleCI will also help with catching errors that you might not find locally. 
By mimicking a production environment more closely, we can recognize any differences that might be causing inconsistent behavior between environments. For example, if I am developing an app locally and I did an `npm install`(JavaScript apps) or `bundle install`(Ruby apps) months ago, and I did not explicitly lock down the version numbers for each of my dependencies in my `package.json` or `Gemfile`, I might not notice that my production environment received more updated packages during the `npm install`/`bundle install` phase. Some of these packages may have included breaking changes that would only be exposed in production and impossible to reproduce locally until another `npm install`/`bundle install` was run.


## What is a Build?

Think of all the steps you have to take if you want to collaborate on a classmate's project. You have to fork their repo, clone it down locally, make sure you have an up-to-date version of Node (or some other platform) on your machine, install any dependencies, start up a server and maybe run a file watcher.

Sometimes more complex projects require additional steps. This setup process is called a **build**. It's all the things you need to do to get your app up and running. CI tools will run through all of these steps (and then some!) to ensure the application is in a stable, working state before it goes to production.

## Phases of the Build Process

The `.yml` file can define settings for various build lifecycle phases.
- **install:** install any dependencies required (configure the virtual machine (VM) to be able to run your code)
- **script:** run the build script (run your code and tests)
- **deploy:** deploy your code to your web servers (such as deploying to Heroku)

### Configure Automatic Deployments

If a build passes in your CI, then that means the code is probably good enough to go to production. You can make your CI tool automatically deploy to a service of your choice after the build passes. Consider Heroku, Vercel, or Netlify for your deployments. 

Here are some resources to get you started with setting up CD: 
- [Automatic Deployment with React and AWS CodeBuild](https://developeranish.medium.com/automatic-react-deployment-with-aws-codebuild-and-github-on-s3-bucket-943211538d9f)
- [Automatic Deployment with React and GitHub Actions and Push](https://dev.to/fidalmathew/automatic-deployment-on-react-app-github-actions-gcj)
- [Automatic Deployment with CircleCI and Netlify](https://dev.to/fidalmathew/automatic-deployment-on-react-app-github-actions-gcj)
- [Automatic Deployment with GitHub Actions and Vercel](https://vercel.com/guides/how-can-i-use-github-actions-with-vercel)
  
----

## Getting Started with CI

There are many tools available to implement CI. We're sharing these examples with you for exposure and to start your research, but we do not require you to implement CI on your own. You may choose to explore it if it interests you.

You can find some options, guides, and ideas below to get you started in your research.

<section class="dropdown">

### Github Actions with React and Cypress

1. Create a React application, add Cypress, add a test to Cypress, and push everything up to GitHub. Don't forget that you'll need some way to _run_ the Cypress tests, so please add a test command in the 'scripts' section of your `package.json`
2. Set up GitHub Actions:
  - Navigate to the Actions tab in your GitHub repository.
  - Select "Skip this and set up a workflow yourself ->". This will bring you to an editor with a ```yml``` file open. This file is your CI configuration. 
  - There are many ways to correctly configure GitHub actions, but here's an example ```yml``` file for React/Cypress:

```yml
name: Cypress Tests

on: [push]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    environment: Test
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      # Install NPM dependencies, cache them correctly
      # and run all Cypress tests
      - name: Cypress run
        uses: cypress-io/github-action@v5.5.1 # use the explicit version number
        with:
          build: npm run build
          start: npm start
```

3. Always run your test locally before pushing your code up.
4. Commit your code to Github. 
5. Navigate to the Actions tab to see the results of your CI. (Click around to see what information you can gather.)
</section>

<section class="dropdown">

### CircleCI with React and Cypress

1. Sign up for a CircleCI account [here](https://circleci.com/vcs-authorize/?returnsource=auth0-login) and log in with your GitHub account.
2. Make a repository on your Github 
3. Authorize CircleCI to access information about your GitHub repos (it's ok)
4. Skip adding any project yet to your CircleCI for now. We will add a config file to our project before adding it to circleCI.
5. Clone down your Github project into your machine. 
6. In your root directory, make `.circleci` folder.
7. Inside that folder, make `config.yml` file.

There are many ways to correctly configure CircleCI, but here's an example ```yml``` file for React/Cypress:

```yml
version: 2.1 # Use 2.1 to make use of orbs and other features
orbs: # An orb is a reusable package of CircleCI configuration that you may share
  # across projects, enabling you to create encapsulated, parameterized commands, jobs, and
  # executors that can be used across multiple projects.
  cypress: cypress-io/cypress@3.1.1
workflows: # Workflows are a declarative way to orchestrate jobs and their run order.
  build:
    jobs:
      - cypress/run: # Run the cypress/run job from the cypress orb
          cypress-command: npx cypress run --headless # Run the cypress run command in headless mode
          start-command: npm start
```

8. Always run your test locally before pushing your code up.
9. Commit your code to Github. 
10. On your CircleCI dashboard, select your app. 
11. choose the main branch and Set Up the project. 
</section>

<section class="dropdown">

### GitHub Actions with Ruby

Check out [these instructions](https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-ruby) to set up a workflow for a Ruby application.

[This article](https://revs.runtime-revolution.com/ruby-on-rails-ci-cd-with-github-actions-1e65adbd6181) does a great job breaking down the steps to set up a GH Actions workflow for Rails. 

</section>

<section class="dropdown">

### CircleCI with Ruby

Below are sample config files. You would need to change the value associated with `POSTGRES_DB`. The first sample uses Fly.io to for deployment, and the second sample uses Heroku. When using Fly.io to deploy applications, you must set up authentication so that the CI server has permission to push to Fly. To do this, add an environment variable in your CircleCI project settings with the key `FLY_ACCESS_TOKEN`. Be sure to use this exact key name as flyctl (the command line tool for Fly.io) will be looking for this variable. The value of this variable will be the token that is returned when you run `flyctl auth token` in your command line after logging in to Fly running `flyctl auth login`.

```yml
version: 2.1 # use CircleCI 2.1
orbs:
  node: circleci/node@5.0.0 # Needed for javascript runtime
jobs: # a collection of steps
  build-and-test: # runs not using Workflows must have a `build` job as entry point
    docker: # run the steps with Docker
      - image: circleci/ruby:2.7.4 # if you're using ruby version >= 3.0, use cimg/ruby:3.x.y
        environment: # environment variables for primary container
          BUNDLE_JOBS: 3
          BUNDLE_RETRY: 3
          BUNDLE_PATH: vendor/bundle
          PGHOST: 127.0.0.1
          PGUSER: postgres
          RAILS_ENV: test
      - image: circleci/postgres:11 # database image
        environment: # environment variables for database, it is kind of obvious but it is important that they match with your test config in database.yml
          POSTGRES_USER: postgres
          POSTGRES_DB: mod_4_randomizer_test
          POSTGRES_HOST_AUTH_METHOD: trust
    steps: # a collection of executable commands
      - checkout # special step to check out source code to working directory
      # Which version of bundler?
      - node/install:
          install-yarn: true
          node-version: '16.13'
      - run:
          name: Force Bundler Version
          command: |
            echo 'export BUNDLER_VERSION=$(cat Gemfile.lock | tail -1 | tr -d " ")' >> $BASH_ENV
            source $BASH_ENV
            gem install bundler
      - run:
          name: Bundle Install
          command: bundle install
      - run:
          name: Wait for DB
          command: dockerize -wait tcp://localhost:5432 -timeout 1m
      - run:
          name: Database setup
          command: bin/rails db:{create,migrate} --trace
      - run:
          name: Run rspec in parallel
          command: bundle exec rspec
      # Save test results for timing analysis
      - store_test_results: # Upload test results for display in Test Summary: https://circleci.com/docs/2.0/collect-test-data/
          path: test_results
      # See https://circleci.com/docs/2.0/deployment-integrations/ for example deploy configs
  deploy:
    docker:
      - image: alpine:3.12
    steps:
      - checkout
      - run:
          name: Deploy app to Fly
          # The following steps install Flyctl and deploy the app
          # Your CircleCI project must have a FLY_ACCESS_TOKEN environment variable
          # in order for CircleCI to authenticate and deploy this app.
          command: |
            apk add --no-cache curl
            curl -L https://fly.io/install.sh | sh
            export FLYCTL_INSTALL="/root/.fly"
            export PATH="$FLYCTL_INSTALL/bin:$PATH"
            echo "Successfully Installed Flyctl"
            sh -c "flyctl status"
            sh -c "flyctl deploy"
            sh -c "flyctl info"
            exit 0
workflows:
  build-test-deploy:
    jobs:
      - build-and-test
      - deploy:
          requires:
            - build-and-test
          filters:
            branches:
              only: main

```
Below is the sample config file for an app that uses Heroku. 

```yml
version: 2.1 # use CircleCI 2.1
orbs:
   node: circleci/node@5.0.0 # Needed for javascript runtime
   heroku: circleci/heroku@1.0.1 # Use the Heroku orb in your config
jobs: # a collection of steps
  build-and-test: # runs not using Workflows must have a `build` job as entry point
    docker: # run the steps with Docker
      - image: circleci/ruby:2.7.2 # if you're using ruby version >= 3.0, use cimg/ruby:3.x.y 
        environment: # environment variables for primary container
          BUNDLE_JOBS: 3
          BUNDLE_RETRY: 3
          BUNDLE_PATH: vendor/bundle
          PGHOST: 127.0.0.1
          PGUSER: postgres
          RAILS_ENV: test
      - image: circleci/postgres:11 # database image
        environment: # environment variables for database, it is kind of obvious but it is important that they match with your test config in database.yml
          POSTGRES_USER: postgres
          POSTGRES_DB: <Insert the name of your testing database, for example, cool_new_app_test>
    steps: # a collection of executable commands
      - checkout # special step to check out source code to working directory
      # Which version of bundler?
      - node/install:
          install-yarn: true
          node-version: '16.13'
      - run:
          name: Force Bundler Version
          command: |
            echo 'export BUNDLER_VERSION=$(cat Gemfile.lock | tail -1 | tr -d " ")' >> $BASH_ENV
            source $BASH_ENV
            gem install bundler
      - run:
          name: Bundle Install
          command: bundle install
      - run:
          name: Wait for DB
          command: dockerize -wait tcp://localhost:5432 -timeout 1m
      - run:
          name: Database setup
          command: bin/rails db:{create,migrate} --trace
      - run:
          name: Run rspec in parallel
          command: bundle exec rspec
      # Save test results for timing analysis
      - store_test_results: # Upload test results for display in Test Summary: https://circleci.com/docs/2.0/collect-test-data/
          path: test_results
      # See https://circleci.com/docs/2.0/deployment-integrations/ for example deploy configs
workflows:
  build-test-deploy:
    jobs:
      - build-and-test
      - heroku/deploy-via-git: # Use the pre-configured job, deploy-via-git
          requires:
            - build-and-test
          post-steps:
            - run:
                name: migrate
                command: heroku run -a $HEROKU_APP_NAME rails db:migrate
          filters:
            branches:
              only:
                - main
```
</section>

<section class="dropdown">

### Other CI Tools

You may be interested in trying one of the following tools instead of the tools listed above:

- [AWS CodeBuild](https://docs.aws.amazon.com/codebuild/)
- [BitBucket Pipelines](https://bitbucket.org/product/features/pipelines)
- [TravisCi](https://www.travis-ci.com/)
- [Jenkins](https://www.jenkins.io/)

</section>