---
title: Using ChatGPT Effectively
layout: page
---

## Learning Goals
- Identify appropriate times to use ChatGPT as a student and developer
- Create and use scripts that produce strong results from ChatGPT

<br>

## AI Tools & ChatGPT
Leveraging AI tools has become an important skill for developers. It's critical to know how and when to reach for these tools. Today, we'll focus on ChatGPT. Later in the program, you may be exposed to other AI tools like [GitHub Copilot](https://docs.github.com/en/copilot).  
  
ChatGPT, developed by OpenAI, is a powerful language model designed to assist users in a variety of tasks, including programming. It can help developers understand complex concepts, debug their code, provide code snippet examples, and more!  
  
ChatGPT operates like a chatbox - it'll feel like you're messaging a customer service rep who knows a lot about coding!  
  
One very important thing to keep in mind: AI tools can be extremely helpful, but they should not be treated as 100% reliable. We need to always be a tad skeptical of the results we're given.  

<br>

## Set Up
We are going to be using ChatGPT a lot in class today. Let's all take a few minutes to get set up with a ChatGPT account.  
  
1. Visit [https://chatgpt.com/](https://chatgpt.com/).  
2. Either log in or sign up.  
3. Select "New chat" on the left tool bar.  
  
We're ready to go!  

<br>

## ChatGPT in Action

### Explaining Concepts
In your new chat, take a few moments to try the following prompts:

1. What is merge sort?  
2. Can you explain merge sort like I'm 5 years old?
3. Explain merge sort using kittens. 
4. Show me a merge sort example in Ruby.

**Stop and Reflect:** 
- What do you notice about the differences in the answers ChatGPT provided above?

<br>

### Refactoring Code
Start a new chat and give it the following prompt:  
<section class="call-to-action">


"Combine the following 3 functions into one function.  

def add_two_numbers(num1, num2)  
  sum = num1 + num2  
  return sum  
end  
  
def add_three_numbers(num1, num2,num3)  
  sum = num1 + num2 + num3  
  return sum  
end  
  
def add_four_numbers(num1, num2,num3, num4)  
  sum = num1 + num2 + num3 + num4  
  return sum  
end"  
</section>

**Stop and Reflect:**   
- What do you think about the code it provided for you? Does it follow the best practices you've learned in Mod 1 so far?  
- What happens if you say "Is there another way to write that function?"

<br>

### Debugging Code
Oh no! Your function isn't doing what you're expecting it to do:

```ruby
def double_numbers(numbers)
  numbers.each do |num|
    num *= 2
  end
  return numbers
end

puts double_numbers([1, 2, 3, 4, 5])
# desired output: [2, 4, 6, 8, 10]
# actual output: [1, 2, 3, 4, 5] 
```

Let's ask ChatGPT for help. Send the following prompt:
<section class="call-to-action">


"I want my function to output [2, 4, 6, 8, 10], but it's outputting [1, 2, 3, 4, 5]. Can you explain why?  
  
def double_numbers(numbers)  
  numbers.each do |num|  
    num *= 2  
  end  
  return numbers  
end"  
</section>

**Stop and Reflect:**   
- Was ChatGPT able to find the bug?  
- When might you use this in the future?

<br>

### Creating Practice Problems
Let's say you are struggling with a specific concept - like using `#each`. ChatGPT can help you by providing a bank of practice exercises.

Try the following prompts:
- Can you create an array of hashes that describes movies from 1997?
- Can you add a property to the hashes that has a value of an array?
- Can you give me some prompts that would require me to use #each on the array above?
- Can you show me how you would solve the first prompt you wrote?

**Stop and Reflect:**   
- Was ChatGPT able to create a useful data set for you to practice with?  
- What did you think of the prompts it came up with?  
- When might you use this in the future?

<br>

### Comparing Languages
You have been focusing on Ruby, but you might get curious from time to time about what your code might look like in a different language. Try the following prompt:

<section class="call-to-action">

"Show me what this function looks like in JavaScript:  
  
def get_property(array, property)  
  properties = array.map { |hash| hash[property] }  
  sorted_properties = properties.compact.sort  
  return sorted_properties  
end  
  
array = [  
  { name: "John", age: 30 },  
  { name: "Alice", age: 25 },  
  { name: "Bob", age: 35 }  
]  
  
get_property(array, :name)"  

</section>


**Stop and Reflect:**   
- How might this be useful?  
- Try it with other languages! Do you notice any similarities between all the languages?  

<br>

## ChatGPT Tips + Tricks
- **Be specific:** The more specific you are with your prompts, the better the result will be.
- **Provide follow-up prompts:** You can always add onto your previous prompt by asking something more specific or simply asking for another example.
- **Ask for examples:** If ChatGPT gives you a wall of text, it can be helpful to request a tanglible example to go along with that text.
- **Don't just take its code at face value:** Remember that the code produced by ChatGPT isn't always the best. It often times is more complex than it needs to be and will often use concepts you don't fully understand yet. Trust your own brain and judgment more than AI. The code snippets it provides are a helpful place to start, but shouldn't be treated as perfect.  
  - This is especially important to remember when using AI to help you debug your dev environment.  Do not blindly trust and run terminal commands from chatGPT.  Especially if they include `force` or `sudo`.  First, copy paste the command back to chatGPT and ask:
    - What does this command do?
    - Could this command cause problems in my environment?

<br>

## Conclusion
Take a few minutes to think about all the examples we tried with ChatGPT today. Reflect on the following questions:
- What is a benefit of using a tool like ChatGPT?  
- What is a drawback?  
- What is something you could see yourself using ChatGPT for in the next week?  
- What prompts did we **not** try today that you are interested in trying out? 