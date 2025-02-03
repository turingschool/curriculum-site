---
title: Deployment Guide
layout: page
---
<style>
summary:hover {
  background-color: #bbe5fa;
}
</style>

# Deploying to the Internet

## When should I deploy?
- When you start an application, it's a good idea to set up your deployment right away, and then intermittently deploy changes through your development process
- Deploy recent changes to the _production_ environment when your application has reached a new apex in feature availability - in other words, when your `main` branch has been updated to where you are confident that you want it to be available on the internet. 
- When deploying, these platforms will take ___your remote copy___, you'll be able to select which branch (we recommend `main`), and deploy it to your server. So, follow good git practice and only merge to `main` once your team has decided the code quality is good enough to deploy a new version of the app. 

## Deplying an API written in Rails

<details><summary><h3>Guide to Heroku</h3></summary>
 Docs are [here](https://devcenter.heroku.com/articles/getting-started-with-rails7). 

 Follow these docs starting at the "Create a Heroku App" section. You do **not** need to start at the beginning because it details creating an app from scratch (not necessary).

 Note: for applications in this module, you do not need to create a Procfile because the default start up command that Heroku will use will work just fine.
<hr/>
</details>


<details><summary><h3>Guide to Render</h3></summary>

<section class="note">
<p>Follow the docs here on <a href="https://render.com/docs/deploy-rails" target="_blank">Render.com</a>'s existing documentation and resources. You are free to ignore this page and follow directions on Render's website to deploy your application, if you wish. You can skip to the 3rd step - "Update your app for Render".</p>

<p>Turing is not associated or affiliated with Render.com in any way; this page was created as a reference for students to deploy their applications for the first time. 
</p>
</section>

## Getting Started
1. Create an account on Render, if you haven't already. (You can use GitHub to create an account to make your sign-in even easier.)

2. Locally in the repository you'll be deploying, update the secret key before deploying: 
   1. Delete the existing `config/credentials.yml.enc` file. 
   2. In Terminal in this repository, run `EDITOR="code" bin/rails credentials:edit`.
         - You do need to specify `EDITOR="code"` for it to work unless it already appears in your Terminal's config file, otherwise it may give you errors. 
         - When successful, it will generate 2 files called `credentials.yml.enc` and `master.key`. The `master.key` file will be ignored by git - this is normal, you do not want to share this key with other teammates. 
   3. Commit and push the change that added the new `credentials.yml.enc` file to your remote. 

## Deploying an Existing Rails App

### Create DB Service
1. After you sign in, it will take you to your Dashboard. 
2. Click the button to **Create a New PostgreSQL**. 
   - Give the PostgreSQL service a name (recommend to use the same name as your repo for sanity)
   - You can keep the **Database** and **User** fields blank, they will be randomly generated.
   - **Change the PostgreSQL Version to 14.**
   - Keep the Instance Type set to **Free**, and then click `Create Database`. 
3. Once the database is created, click the `Connect` dropdown on the top-right, and copy the **Internal Database URL**. You'll use this link to connect to the production DB after you create the web service.

### Create Web Service
1. Click the button to Create a New __Web Service__. If you've connected your GitHub account, it will display some of your repositories that you can connect to for this web service. Click `Connect` next to the repo you'd like to deploy. 
1.  Give the service a name (anything, you can use the same name as the repo)
1.  Follow instructions from the Docs in the "Create a build script" section to create your **render-build.sh** file and push it to main, but **remove the below lines as they are not needed for APIs** and then add `rails db:{migrate,seed}` below `bundle install`.
```bash
# REMOVE THESE BELOW LINES
bundle exec rails assets:precompile
bundle exec rails assets:clean
```
2. Set the following properties:
   - Build Command: `./bin/render-build.sh`
   - Start Command: `./buin/rails server`
3.  Make sure your **Instance Type** is **Free**, then click the `Create Web Service` button. 
4. On the next screen, you'll need to add 2 Environment Variables, so click **Environment**. 
   1. Key = `DATABASE_URL` , Value = your PostgreSQL service's Internal Database URL, from the previous step. 
   2. Key = `RAILS_MASTER_KEY`, Value = your repo's local `master.key` file.


If the steps are all working, it will then attempt to build your application and copy it to its container, this will take several minutes. You can watch the service's terminal for updates. If the build is successful, it will display `==> Build successful 🎉` then `==> Deploying...`. When this step finishes, you can click the URL of the application displayed at the top of the page to visit your site. 


<section class="call-to-action">
<br/>
At any time, you can see your applications on Render from a high-level by going to the <a target="_blank" href="https://dashboard.render.com">Render Dashboard</a>. 
<br/><br/>
</section>



## Troubleshooting
- If the build fails, you will see a message like `==> Build failed 😞` in the dashboard terminal, and it will send you an e-mail notification. Any build errors or deployment issues will be listed in the terminal above this message. 
- If during your deploy you see a message in Render's console that says `rails: command not found`, run the following command in your local terminal: `bundle lock --add-platform x86_64-linux`. This will allow Render's server architecture to run your application. 
- Note that the Free tier of the Web Service does not allow for SSH console, so you can't use `rails c` on the dashboard unfortunately.  
- You can [read more about the Free tier limitations](https://render.com/docs/free#free-web-services) if you encounter other issues. 
- Further troubleshooting documentation can be found on [Render's website](https://render.com/docs/deploy-rails).  

<hr/>
</details>

<details><summary><h3>Guide to Fly.io</h3></summary>

<section class="note">
<p>These instructions were compiled from <a href="https://fly.io" target="_blank">Fly.io</a>'s existing documentation and resources. You are free to ignore this page and follow directions on Fly.io's website to deploy your application, if you wish. The instructions and links below have been tested as of December 2022.</p>

<p>Turing is not associated or affiliated with Fly.io in any way; this page was created as a reference for students to deploy their applications for the first time. 
</p>
</section>

## Getting Started
1. Install [Fly's command line tools](https://fly.io/docs/hands-on/install-flyctl)
- `brew install flyctl`
- This may take a few minutes, please be patient. 

1. Log into Fly from your Terminal ([Documentation link](https://fly.io/docs/getting-started/log-in-to-fly))
- `flyctl auth login`
- This will open your browser and prompt you to log in. 
- If you haven't made an account yet, click the link to make one. (You can also use GitHub to create an account, in order to sign in even easier.)
- *NOTE*: It will look like you have to enter a credit card number to complete registration. There is a small link below the form that says ___"Try Fly.io for Free -->"___ Click that link to proceed with the free plan. 
      - If for some reason you must enter a credit card to complete registration, please reach out to your instructors for assistance. 


## Deploying an Existing Rails App

1. In Terminal, navigate to the app that you want to launch, in its root folder (e.g. `/turing/2module/projects/relational_rails`). 

1. Follow Fly's instructions to [launch an existing Rails app](https://fly.io/docs/rails/getting-started/existing). 
   - `fly launch`
      - It will "scan" your code, detect a Rails app, and ask you some questions. 
   - Leave "App Name" blank, or type one in. The name should be unique to your account. 
   - *Important:* When asked, choose the __default region__ by pressing `Enter`. 
      - Note: Some users have had weird errors and issues when they choose a non-default region. In this scenario, it may be easier to delete the deployment on your [Fly.io Dashboard](https://fly.io/dashboard) than to fiddle around with it for too long. 
   - When asked to select a configuration, select `Development` (this is the first option). 
   - When asked, "`Would you like to set up a Postgresql database now? y/n"` enter `Y` for yes. 
   - Copy to a file or screenshot the given postgresql Username, Password, Hostname, and Ports data, as you may need this later. Save this to your desktop for safe keeping. You should _not_ commit this to your repository. 
   - When asked, "`Would you like to set up an Upstash Redis database now? y/n"` enter `n` for no. 

1. When the above steps are completed, double-check that you are on a local branch that you want to deploy (usually this is the `main` branch). Then, run `fly deploy` to deploy a copy of the files/folders in this branch to the newly-created server. At the end of this process, Fly will automatically run your `db` setup tasks like create, migrate, and seed. 

1. If your deployment is successful, it will display `"Monitoring deployment..." ` and `---> v0 deployed successfully.`. This `v0` number will increment with each subsquent deployment. Run `fly open` to open your deployed application in your browser. 

<section class="call-to-action">
<br/>
At any time, you can see your applications on Fly from a high-level by going to the <a target="_blank" href="https://fly.io/dashboard">Fly Dashboard</a>. 
<br/><br/>
</section>



## Troubleshooting
- If you visit your app in the browser and see some generic errors, those messages will probably be vague and unhelpful. This is because you're looking at the production environment, which is meant to be seen by users and not developers. To see helpful debugging information, run `fly logs` from your local Terminal in order to see logs of your deployments. 
- To open a rails console on your server, run `fly ssh console -C "/app/bin/rails console"`. 
   - Be careful of using this, as you are accessing the Rails console directly in production! Also, this may incur more usage of the application which can run up your usage on Fly's service. If you've provided a credit card number, it may end up charging you. 

- Problem: an error message in deployment that ends with: 
```
ERROR: [stage-3 7/7] RUN bin/rails fly:build … rails aborted! ExecJS: RuntimeUnavailable: Could not find a JavaScript runtime. See https://github.com/rails/execjs for a list of available runtimes.
```
   - Solution: Open the `Dockerfile` in the root of the project. Around line 76, find `ARG DEPLOY_PACKAGES`. At the end of this string value, add `nodejs`. It should now look like this: 
   ```ruby
   ARG DEPLOY_PACKAGES="postgresql-client file vim curl gzip libsqlite3-0 nodejs"
   ```
   Finally, run `fly deploy` again. 

- Further troubleshooting documentation can be found on [Fly's website](https://fly.io/docs/rails/getting-started/existing/#troubleshooting-your-initial-deployment).  