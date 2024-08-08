---
layout: page
title: Beginner Rails Workshop
subheading: Rails Installation Guide & Task Manager Tutorial
---

## Installation:
### Ruby 3.2.2

We will use Ruby 3.2.2 in Modules 2 & 3. You can check your Ruby version by running `ruby -v`.

Using [rbenv](https://github.com/rbenv/rbenv), you can install Ruby 3.2.2 (if you don't have it already) with:

```bash
rbenv install 3.2.2
```

NOTE: If rbenv tells you that the version you supplied is missing or not available, run 

```bash
brew update && brew upgrade ruby-build
```
This will take some time to complete. 

With `rbenv`, you can set your Ruby version to a default globally, or for a specific directory and all subdirectories within it. If you have a `2module` or `3module` directory on your machine, you can set your Ruby version for this directory (and all subdirectories) by first changing into that directory and then running

```bash
rbenv local 3.2.2
```

Or, if you wanted to set it globally for your machine, you can run 

```bash
rbenv global 3.2.2
```

Always double check that your Ruby version is correct after changing it with `ruby -v`.


### Rails 7.1.2

We will use Rails version 7.1.2 in Module 2 & 3.

Rails is a Gem, and if you are using `rbenv`, gems are specific to your current Ruby version, so you need to make sure you are on Ruby 3.2.2 before proceeding by following the instructions above.

Once you have verified your Ruby version is 3.2.2, check if you have Rails. From the command line:

```bash
$ rails -v
```

If you get a message saying rails is not installed or you do not have version 7.1.2, run

```bash
$ gem install rails --version 7.1.2
```

You may need to quit and restart your terminal session to see these changes show up when you check your rails version with:

```bash
$ rails -v
```

Be careful not to install the latest version of Rails by only doing `gem install rails` -- there are always newer versions and our curruiculum is based on these specific versions, so you will need to uninstall and reinstall correctly. 

If you instead get a version of Rails besides `7.1.2`, follow [these instructions*](https://github.com/turingschool-examples/se_task_manager_rails/blob/161-update-task-manager-to-start-with-database-setup/rails_uninstall.md).

<br>

## Action Item: Task Manager Tutorial

- Follow along with this [Task Manager Tutorial*](https://github.com/turingschool-examples/se_task_manager_rails) to create a Rails application with C.R.U.D. functionality.
- Answer the Check for Understanding questions at the bottom of the README when you have finished working through the tutorial.
- You will submit your work using [this form](https://forms.gle/iGjXVB72pwxdzTPU6).

<div class="note">
#### Pro Tip From Alumni:
This is all new material that can seem a little overwhelming at first glance, so feel free to go through the tutorial a second or third time to reinforce the content and workflow. These concepts and practices are really important and will be relavant throughout the rest of your time here at Turing!
</div>
<br>
<br>
<br>
<br>