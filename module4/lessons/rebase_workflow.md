---
title: Rebase Workflow Workshop
layout: page
---

## Learning Goals

By the end of this lesson, you will:

* Have a better understanding of the differences between **merge** and **rebase** workflows
* Be able to speak on the ups and downs of using one git workflow over the other
* Practice one way of following a rebase workflow and experiment with interactive rebasing

## Prework

Hopefully you've had some time to process the Rebase workflow in the prework, but you might still have some questions on the flow and the differences between a Rebase and Merge workflow.  Before the lesson, please take 30 minutes to watch this [video](https://vimeo.com/415012296){:target='blank'} led by one of our former instructors, Ian Douglas.  He diagrams out the differences between the two focusing on the differences with the commit timeline between Rebase and Merge and offers some thoughts on when you might use one workflow over the other.  The second half of the video is a bit of a Q&A with past students and covers a couple different ways you can achieve a Rebase workflow.  Later in this lesson, you will get the opportunity to practice this.

<section class="checks-for-understanding">
### Checks For Understanding

- Draw out your own diagram comparing the differences between a `merge` & `rebase` workflow.
- What are the benefits of using a rebase workflow over a merge workflow?  Are there downsides?
</section>

## Getting Started

<section class="call-to-action">
### Warm Up in Breakout Rooms

- Using a `merge` workflow, how are commits organized in the timeline?
- How is a `rebase` workflow different in how commits are organized?
- What are the benefits and downsides of using one versus the other?  Is one better than the other?
</section>

<section class="answer">
### Reviewing some key points on the above  

- Merging keeps the timeline of your commits.  Can be really useful for knowing when code has been updated.
- However, rebasing rewrites your commit history.  This can make it much easier to keep all feature commits together.
- Merge conflicts will typically happen more often in a rebase workflow because that timeline is being rewritten.
</section>

Now that you are a bit more familiar with some of the differences between a `merge` and `rebase` workflow on a high level, let's focus on some of the Git commands used specifically with a `rebase` workflow.  __Fork__ this [repo](https://github.com/turingschool-examples/rebase-workshop){:target='blank'} and then clone it down.  Make sure to also change into the `rebase-workshop` directory!  Then follow the exercises below:

<section class="note">
### Note

Although this is just a template README file, the same rules will apply when you're actually working on your code files and making changes there as well.

_Also take note that spacing is important, so if you don't see what you expect the first time you run a command, make sure there isn't a typo and that your spacing is correct._
</section>

## Exercises

<section class="call-to-action">
### Exercise 1 (Initial commits and setting up a PR)

The rebase workflow has a lot of similarities to the merge workflow, especially around resolving conflicts that arise when multiple contributors are working on the same codebase.  While there are a few different ways of doing this, we'll cover one way you can approach it.

1. Checkout a new branch (**branch1**) off of `main` and make some edits by adding or removing lines from the README or creating new files with some content.
2. Create 3 new commits on this branch (**branch1**).  Run `git log` and note the three new commits that you have added. (you can exit the log by hitting `q`)
3. Checkout another branch (**branch2**) off of `main` and make some edits here as well.  You only need to create 1 new commit on this branch.
3. Next, go back to your previous branch (**branch1**), and push up your branch to GitHub with `git push origin <branch_name>`.  Then go to your GH repo and click `Compare & pull request`.
4. When you open the pull request, change the `base repository` to be your repository. (*NOT* "turingschool-examples"!).  Then click `Create pull request`.
</section>

<section class="note">
### Note

In the next exercise, you will be making some edits to your git timeline.  Your git text editor is typically defaulted to VIM mode (where you are editing code directly in the terminal). This means that when you run the `git rebase -i ...` commands below, VIM will likely open and you must edit in VIM. However, you can change this to be **VS Code** through the following command:

To use **VS Code** as your git text editor, run:
`git config --global core.editor "code --wait"`
</section>

<section class="call-to-action">
### Exercise 2 (Interactive Rebase)

Let's say we're looking at those three commits, and they all appear to be tied together and likely could be one larger commit.  Now is a perfect time for **interactive rebase**! Interactive rebase allows us to manipulate our commit history by editing our commits. Here are some tips to working through the interactive rebase flow!

1. In your terminal, run `git log --oneline` in `branch1` to see the 3 commits you just created.  
- Looking at them, you'll notice you've made multiple changes all relating to the README.  Wouldn't it be nice to combine (ie. `squash`) them into one?
2. To squash all three of them, run `git rebase -i <hash>` (ie `98b1875`) or run `git rebase -i HEAD~3`.
- Take a look at the **note underneath Exercise #2** for questions about which hash to pick or what `HEAD~3` mean!
- _Note: When in the interactive rebase, it is **possible** that you'll be in VIM mode (where you are editing code in the terminal).  In order to edit anything first type `i` for insert. Once you are done editing, press `esc`. Then type `:wq` (this will save your changes).  If it opens up VSCode or Atom, edit the scripts and save as your normally would before closing out of it._
<section class="answer">
### You should see something like this... 

```
pick c3a27af Remove requirements from README
pick 255ed0e Update first installation instruction
pick 2fb87ae Update troubleshooting section of README

# Rebase 98b1875..2fb87ae onto 98b1875 (3 commands)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup <commit> = like "squash", but discard this commit's log message
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
```
</section>

3. Replace the word `pick` with `squash` in front of two of the commit hashes (It shouldn't matter which ones since you will effectively be combing all three into one.  However, if it doesn't work correctly, experiment with different ones).
4. Then save your changes.  (In VIM mode, press `esc` and type `:wq`)
5. You'll see a new message with the three commits messages you previously made.  
- This is your opportunity to edit/write (remember to press `i` in VIM mode) the commit messages you want to use. If you did not edit any of the messages it would keep them all. 
- Remove two of the commit messages and change the final one to be the new message describing the changes made.
6. After editing, save your changes once more.

In the terminal you should now see:
`Successfully rebased and updated refs/heads/<branch_name>.`

Now when you run `git log --oneline` there should no longer be 3 new commits, but instead one commit with the new message you wrote.  Cheers!
</section>

<section class="note">
### Note

To enter an interactive rebase you must first determine at which commit you want to begin viewing the commit history. You can either use the commit hash that is before the commit at which you want to begin editing or you can use `HEAD~3` where the `~3` is the number or generations you want to go back (it will include the head (or current commit) and the 3 previous)

Another way to think of this is that the argument you supply to `git rebase -i` is the hash of the parent of the last commit you want to edit. If you want to edit _all three_ of the commits you made on branch1, then you need to select the _parent_ of the first commit you made (which is the Initial Commit if you made 3 new commits). If you want to edit the most recent two commits, then you will use the hash for the commit directly before those two recent commits. 
</section>

<section class="call-to-action">
### Exercise 3 (Pushing your new timeline up to GitHub)

Now that we've done that, take a look at your PR.  Note that there are still three commits there.  It's not up to date with our local repo.

1. Try pushing up your branch again and take note of what it says.
- Because we are rewriting the commit timeline, it's not allowing us to push up to our remote respository (it acts as a safety measure)
2. To fix this and rewrite the timeline, you can run `git push -f origin <branch_name>`.
- The `-f` means to forcefully push up and rewrite the timeline which is necessary for this rebase because we want to combine these commits
3. Then check your Pull Request and check if it now only displays one commit.
4. After confirming that there is only one commit (you may need to refresh GitHub), then click on `Merge pull request` to merge the branch into `main`.
</section>

<section class="call-to-action">
### Exercise 4 (Bringing those changes to Branch 2)

Remember that we had created two branches?  What if we wanted to pull in our latest changes from main into our second branch?

1. Checkout `main` and pull down your latest changes from GitHub.
2. Then checkout **branch2** and run `git rebase main` to bring in the latest changes.
- Note because there were changes made in a similar file, you may need to deal with merge conflicts.
3. Work through the merge conflicts, `add` them, and then run `git rebase --continue` to finish up.  You can then run `git log` to see your new and improved timeline!
</section>

<section class="checks-for-understanding">
### Standardizing Some of the Steps

There are a lot of steps we took in this workshop, some not always being necessary every time.  (You may not always need to do an **interactive rebase** if you're happy with the way you made your commits)  As you begin to work with your teams, here are some simple steps you can take with your workflow:

1. Create feature branch
2. Make commits on feature branch
3. **Optional:** Interactive rebase to squash commits
4. Git pull origin main into your `main` branch
5. Checkout feature branch again and run `git rebase main`
6. Resolve conflicts on branch
7. Push up branch and create PR.

Remember to experiment and try things out.  Just like the first time you worked with Git, it can be scary at first but this is the time to try things out before doing it on the job! 
</section>

## Extra Resources

* [Merging vs
  Rebasing](https://www.atlassian.com/git/tutorials/merging-vs-rebasing){:target='blank'}
* [Beginner’s Guide to Interactive Rebasing](https://hackernoon.com/beginners-guide-to-interactive-rebasing-346a3f9c3a6d){:target='blank'}
