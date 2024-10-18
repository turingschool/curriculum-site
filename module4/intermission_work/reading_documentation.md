---
title: Reading and Understanding Documentation
length: 60 mins
module: 4
tags: documentation, problem solving
---

### Goals

By the end of this lesson, you will know:

* Strategies for reading documentation in order to research errors
* Strategies for reading documentation in order to learn something new
* Techniques for reading through documentation quickly


<section class="call-to-action">
  <h3> Take a moment to reflect on the following question: </h3>
  What is difficult about reading technical documentation. Why is this difficult?
</section>

### Reading technical documentation is hard
Reading technical documentation can be challenging. It often makes for very dry reading and can be a lot of new terms that are confusing to read about. Additionally, technical documentation often presents complex ideas that require critical analysis and take time and energy to understand. While exploring technical documentation can be daunting, with the right approach you can improve your ability to effectively utilize it. It's important to keep in mind that it takes time to get good at any skill. With time and a growth mindset you will become proficient at reading and understanding technical documentation.

### Part 1: Referencing Documentation While Troubleshooting Errors
<section class="call-to-action">
  <h3> Take a moment to reflect on the following question: </h3>
  What information do you look at first when you pull up a technical resource?
</section>

### Evaluating if a resource is worth diving into.
There is nothing worse than spending time applying a solution that you found on stack overflow only to discover that it is outdated and only applies to a previous version of the library you are using. Some documentation may be more relevant for your purposes than others. It's important to determine this prior to spending a lot of time attempting to utilize the resource. Here are few things to consider when evaluating how relevant a resource is to you:
1. When was this first published?
- Software changes quickly. If the post is from 10 years ago, this may be a good indication that the post is no longer relevant.
- Try adding a filter to your google search to remove posts from the results that were created before a certain date.
```
  Rails ActiveRecord::NoDatabaseError after:2019-06-01
```
- Another option is to modify your search settings to only include recent responses.
1. What version of the library/framework is this referencing?
- Make sure that the resource is referencing at least the same major version of the library/framework you are utilizing if not the exact version.
- Try adding the version number to your google search.
```
  Rails 5.2 ActiveRecord::NoDatabaseError after:2019-06-01
```

<section class="call-to-action">
  <h3> Take a moment to reflect on the following question: </h3>
  How do you evaluate if the resource is relevant to your problem?
</section>

### Evaluating if a resource applies to your problem.
After you have determined that the resource is not outdated and is relevant to you at a high level. It's important to take the next step and evaluate whether the resource applies to your specific problem. Ask yourself if the key words and terms
used in the overview or initial error description are relevant to the context in which you encountered the error? The context in which someone encountered the problem doesn't have to be an exact match, but there should be some similarities between how you encountered the problem or error messsage and what is described in the resource. If not, you may want to move onto the next resources.

<section class="call-to-action">
  <h3> Take a moment to reflect on the following question: </h3>
  What resources do you utilize when troubleshooting an error?
</section>

### Utilize multiple sources of information
Technical documentation is not always written with all readers in mind. The author may have assumed that readers will have certain knowledge about the subject. Referencing multiple sources can help fill in knowledge gaps and give you a more holistic understanding of the problem and ways to approach solving it.
- Resources that may be helpful to reference:
  - Stack overflow
  - Github issues
  - Official documentation for the library/framework/language

<section class="call-to-action">
  <h3> Take a moment to reflect on the following question: </h3>
  What do you do if the proposed solution doesn't solve your problem?
</section>

### What to do next?
It's not uncommon to get to a point in troubleshooting when none of the solutions in the resources referenced are solving your problem. After you have taken a break and stepped away for a few minutes, try doing the following:
1. Read through code line by line
- After looking at your code for a while, it easy to read what we assume is written rather than what is actually written. Reading through your code after you have taken a break can help you spot typos, syntax errors or missing code that may be contributing to the problems you are experiencing.
2. Revisit the official documentation
- If you are working with a new library/framework or solving a new type of problem it's important that you understand the purpose of every line of code you are writing. This may be a good time to revisit the official documentation to get a better
understanding of how that code you are writing works. It could be that refactoring or approaching the solution in a different way is the best way to move forward.

### Part 2: Referencing Documentation In Order To Learn Something New

<section class="call-to-action">
  Take a moment to reflect on the following questions and record your answers in your notebook:
  1. What resources do you use when you are learning something new?
  2. What is challenging about reading the official documentation for a library or framework?
  3. What are the benefits of utilizing the official documentation when you are learning something new?
</section>

Learning a new language, framework or library can often feel daunting. There are new terms and concepts to learn and certain amount of prerequisite information that is necessary to have in order to fully grasp these new concepts. The official documentation is perhaps one of the most exhaustive resources surrounding a library, framework, language or technology, which while good, can make it hard to differentiate between the information needed in order to gain a working understanding versus information that is non-essential.

While there are often great tutorials, blog posts, and articles that can help a newbie get up and running quickly, these sources can leave a beginner with an incomplete understanding.
The official documentation is a great resource for making sure you have an accurate and holistic understanding of the technology you are learning.

### Tips and tricks to for reading documentation.

1. Use a helicopter approach
<section class="note">
  <h3>Helicopter Approach</h3>
   Consider reading through the documentation in several passes starting with a high level understanding and gradually moving toward a more detailed understanding as needed.

  <h3>Round 1</h3>
    Read through the introduction and summary. Summarize in a sentence or two what the main points are.
    Ask yourself:
    - What is the purpose of this technology?
    - What are the benefits of using this technology?
  <h3>Round 2</h3>
    Skim the documentation taking note of sections and titles.
    Ask yourself:
    - What are the main parts/pieces of this technology?
  <h3>Round 3</h3>
    Read the beginnings and ends of the paragraphs in each section and summarize what the main concepts are in a few words.
</section>
2. Start with the `getting started` section applying this helicopter approach.
3. Make a list of all of the terms you don't understand. Research those topics
and apply the helicopter approach while researching. Be careful not to go down rabbit holes. A high level understanding is all you are after right now.
4. Rather than just copy and pasting code then moving on, study the code examples. Spend the majority of your time reading and analyzing the code. Run the code on your own. Change things and run it again. Try to break it and see if you can fix it.
