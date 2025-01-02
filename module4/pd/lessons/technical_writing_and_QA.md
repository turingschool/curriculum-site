---
layout: page
title: Technical Writing and Quality Assurance 
module: 4
---

### Warm Up:

In small groups, discuss the following (it's okay to google it):

- Describe the responsibilities of a Technical Writer and someone in Quality Assurance? 🤓 _Someone who writes technically and someone who checks for quality aren’t good answers._
- What characteristics would be helpful for someone in Technical Writing? In Quality Assurance?

## Technical Writing

**Turing’s Believe it or Not (patent pending)**: You all have experience being a Technical Writer. _Gasp!_ The responsibilities of a Technical Writer (or Documentation Engineer) vary between companies but they tend to be responsible for creating clear, concise, and user-friendly documentation that helps users and internal teams understand the complexities of the product. So, _surprise surprise_, you’ve done that with most of your projects in the README. 

### Key Responsibilities:

1. User Documentation: Writing user guides, installation manuals, FAQs, and API docs for external customers and developers

2. Internal Documentation: Creating engineering playbooks or onboarding materials for teams

3. Collaborating with Teams: Working closely with product managers, engineers, and designers to gather technical details and translate them into plain language

4. Content Optimization: Ensuring that documentation is easily searchable, well-structured, and visually appealing using tools like Markdown (you know markdown), HTML ( you know HTML too!), or specialized doc platforms

5. Feedback Incorporation: Collecting feedback from users or stakeholders to continuously improve content

We got a chance to speak with Turing alum Devin Beliveau 1610 on what its like being a Senior Documentation Engineer.

<iframe width="560" height="315" src="https://www.youtube.com/embed/U1eCdyawrS0?si=NTD98MdYVHT7BFQi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

When asked if she has any piece of advice for people on the job hunt and looking to alternative roles she had this to say:

<section class="call-to-action">
***“Technical writing can be an excellent career path for someone who wants to be development-adjacent. Tech writing jobs can have zero code, or as much as 50% code or more. It really depends on the tools the company uses and how much control you have over your personal development. My suggestion would be that someone doesn't just take a technical writing job if that's not the path they actually want to be on. I think a year or more in a tech writing role will make it much harder to jump back into full time development if that's what someone really wants. I do, however, think it can be a good path into devrel”***
</section>

<section class="dropdown">
### Let's Try it! 

- Write a beginner-friendly guide to set up RSpec in a new Ruby project. Include all necessary steps from description, installation, to running the first test.

- Things to consider:
    - Understand technical concepts
    - Step-by-step clarity
    - Audience awareness
    - Accuracy and Detail

  <section class="dropdown">
  ### Example Guide Outline 

  👁️ BIG TIME RSpec TECH COMPANY DOCS DOT EYE OH 👁️

  - **Introduction:** Briefly explain what RSpec is and its purpose in Ruby development.
      - RSpec is a framework used for automated testing. It is the testing framework used on many of the homework exercises you’ve been assigned. [RSpec Core Documentation](https://rspec.info/documentation/3.9/rspec-core/RSpec/Core/Configuration)
  - **Prerequisites:** Outline what the reader should have installed (e.g., Ruby, Bundler).
  - **Steps to Install RSpec:**
      - Initializing a new Ruby project.
      - Run `gem install rspec`.
  - **Setting Up RSpec:**
      - Running `rspec --init`.
      - Explaining the generated files (`spec/` directory, `.rspec` file).
  - **Running a Test:**
      - Creating a basic test file (e.g., `spec/example_spec.rb`).
      - Writing a simple test using `describe` and `it` blocks.
      - Running `rspec` to see the test results.
  - **Conclusion:** Encourage testing the setup with a simple Ruby method and its corresponding test.
  </section>
</section>

<section class="call-to-action">
Alternative job titles with similar responsibilities:

- Documentation Specialist
- Content Designer
- Developer Advocate Writer
- API Doc Specialist
- Technical Editor
</section>

To watch the full video with Devin and learn more about her time as a Technical Writer check out the full video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ygibG-ZU67A?si=VdFiKcDuv4_guESj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Quality Assurance (QA)

If words and documentation was never your thing, and you've been all about getting into the little details of the code and checking for bugs, QA might be the role for you. We also got to speak with Artemy Gibson (2305) whose background in biosciences prepared them to observe “tiny things” and be detail oriented. Keeping these skill sets in mind they met someone at a tech meetup where someone suggested Arty look into QA. Let’s hear from Artemy on what it’s like to be a QA Analyst.

<iframe width="560" height="315" src="https://www.youtube.com/embed/w-urHmOKWWk?si=J3YuzejS29F2-rVv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Key Responsibilities:

1. Test Planning: Develop test strategies, plans, and cases based on product specifications
2. Manual and Automated Testing: Perform manual testing to evaluate software functionality and user experience
3. Bug Identification and Reporting: Detect, document, and track bugs or performance issues
4. Regression Testing: Verify that changes or fixes don’t introduce new issues in existing software features
5. Documentation: Maintain clear documentation of testing procedures, bug reports, and test results

QA Engineers help prevent costly fixes after releases, safeguards the company’s reputation, and ensures customer satisfaction through reliable and functional software. Think back to when you were all confident and excited to show your project and then the instructors were able to login as an admin and steal everyones hypothetical data! _GASP AGAIN!_ Thats where QA comes in. Their work bridges the gap between development and end users.

<section class="dropdown">
### Let's Try it! 

- Take a look at the login credentials below. If you wanted to write test cases for a login feature so not every regular degular can login, what are some tests that you would write?

    ```ruby
    # Dummy login method to test
    def login(username, password)
      valid_username = "bigdawg123"
      valid_password = "password123"

      if username.empty? || password.empty?
        "Error: Fields cannot be empty"
      elsif username == valid_username && password == valid_password
        "Login successful"
      else
        "Error: Invalid username or password"
      end
    end
    ```
  <section class="dropdown">
  ### Example Guide Outline 
    ```ruby
    require 'rspec'

    RSpec.describe "Login Feature" do
      it "logs in with valid credentials" do
        expect(login("bigdawg123", "password123")).to eq("Login successful")
      end

      it "shows error when fields are empty" do
        expect(login("", "")).to eq("Error: Fields cannot be empty")
      end

      it "shows error for invalid credentials" do
        expect(login("wrongUser", "wrongPass")).to eq("Error: Invalid username or password")
      end
    end
    ```
  </section>
</section>


<section class="call-to-action">
Alternative job titles with similar responsibilities:

- Software Tester
- QA Engineer
- QA Specialist
- Performance Engineer
- Data Quality Analyst
</section>

If you want to know more about QA and Artemy’s experience watch the full video below.

<iframe width="560" height="315" src="https://www.youtube.com/embed/nMl0UVKmtNA?si=hT4dVf3Fan2vNkIl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Wrap up

<section class="checks-for-understanding">
#### In your notebook take some time to reflect on your experiences before Turing, the new skillset you’ve acquired, and how those can be applied to Technical Writing and QA.

- Describe some similarities and differences between a traditional Software Engineering role and someone under Technical Writing? QA?
- In what ways does your background fit into the these roles?
- Is there alignment between these roles and your previous experience / skillset? Begin to search job postings with these titles.
- What are some further questions you’d ask someone in Technical Writing or QA?

</section>