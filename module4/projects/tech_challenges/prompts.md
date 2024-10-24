---
title: Technical Challenge Prompts
layout: page
---


### Bracket Matcher

<section class="dropdown">

### Prompt &#9759;

<img src="https://media.giphy.com/media/DPhxnGZ9pIUAo/giphy.gif" width="200" alt="matcher">

#### Instructions
Create a method/function that will intake a set of brackets <b>[ { (</b> as a string and determine if the brackets are well-formed (match). Brackets can be nested.
        
        bracket('{}')
        // => true

        bracket('{()}')
        // => true

        bracket('({[]}{[]})') 
        // => true
        
        bracket('{(')
        // => false
        
        bracket('{[)][]}')
        // => false
        
        bracket(']')
        // => false


</section>


### Flattener
<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/68yBjfxSpUpUY/giphy.gif" width="200" alt="flatten">

#### Instructions
In Ruby and JavaScript, there is a built in method/function to `flatten` arrays, meaning it makes them one-dimensional. Below are examples of both Ruby and JavaScript:

        #Ruby
        nums = [1, 2, 3, [[4], 5], [[[6]]]]
        nums.flatten
        => [1, 2, 3, 4, 5, 6]

        #JavaScript
        var nums = [ 0, 1, 2, [ 3, 4 ] ]
        nums.flat()
        => [ 0, 1, 2, 3, 4 ]

Your goal is to recreate this functionality without using the built in method/function. You will be given a deeply nested array, or multi-dimensional array, that will look similar to either of the below:
      
        nums = [1, 2, 3, [[4], 5], [[[6]]]]
        words = ["hi", "this is", [[["string"], "that is very"], [[[["nested"]]]]]]

The contents of the array are not significant. Your method/function should take an input of a multi-dimensional array and output a one-dimensional array. More simply put, remove the deeply nested brackets to return a single array.
       

</section>

### Millions of Numbers
<section class="dropdown">

### Prompt &#9759;

#### Instructions
You are given three arrays of __equal__ size. Each array has 1 million __RANDOM__ integer values.

Assume that each array is already sorted in ascending order and that no individual array has any duplicate values.

Your goal is to write a method/function that will return an array of any/all values which are present in all three arrays.

_Bonus: Once you've found a working solution, try to optimize to run in O(n) time and 1x space complexity._

Small Scale Example Below

        #Ruby
        nums_1 = [1, 2, 4, 5, 8]
        nums_2 = [2, 3, 5, 7, 9]
        nums_3 = [1, 2, 5, 8, 9]
        find_matches(nums_1, nums_2, nums_3)
        => [2, 5]
       
        #JavaScript
        nums1 = [1, 2, 4, 5, 8]
        nums2 = [2, 3, 5, 7, 9]
        nums3 = [1, 2, 5, 8, 9]
        findMatches(nums1, nums2, nums3)
        => [2, 5]

</section>

### Next Palindrome

<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/VVQSePMuomVgA4H7BN/giphy.gif" width="200" alt="next">

#### Instructions

A palindrome is any number, word, or phrase that reads the same forward as it does backward. In this challenge, we are going to focus on palindromic numbers. For example, `12321` is a palindromic number, whereas `123` is not. 

Your goal is to write a method/function that takes in an integer and returns the __next__ palindrome. It is safe to assume you are working with only whole numbers, no decimals, and no negatives. 

Example

        #Ruby
        find_next_palindrome(100)
        => 101

        find_next_palindrome(101)
        => 111


        #JavaScript
        findNextPalindrome(100)
        => 101

        findNextPalindrome(101)
        => 111

</section>

### Palindromic Sum
<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/l1KcPomNdcKbXgV7q/giphy.gif" width="200" alt="">

#### Instructions

A palindrome is any number, word, or phrase that reads the same forward as it does backward. In this challenge, we are going to focus on palindromic numbers. For example, `12321` is a palindromic number, whereas `123` is not.

Write a method/function that starts at 0 and finds the first twenty-five numbers where the number plus its inverse equals a palindrome that is greater than 1,000. 

47(number) + 74(inverse) = 121(palindrome) _Note: This does not meet the greater than 1,000 rule._

Collect the twenty-five numbers in an array as the return value. Be sure to collect the __number__ and not the sum.

_Bonus: Once you've found a working solution, see if you can create a solution without converting the numbers to strings/arrays._


</section>

### Pascal's Triangle
<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/eB5WYVSaOT0qUmHOWA/giphy.gif" width="200" alt="triangle">

#### Instructions

If you've never heard of Pascal's Triangle, you are not alone! Use [this](http://en.wikipedia.org/wiki/Pascal's_triangle) resource to help gain some context.

Your goal is to write a method/function that, given a depth (n), returns an array representing Pascal's Triangle to the n-th level.

       #Ruby
       calculate_pascals_triangle(4)
       =>  [1, 1, 1, 1, 2, 1, 1, 3, 3, 1]

       #JavaScript
       calculatePascalsTriangle(3)
       => [1, 1, 1, 1, 2, 1]

</section>

### Robot
<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/tczJoRU7XwBS8/giphy.gif" width="200" alt="robot">

#### Instructions

In this challenge, you are working with a computer simulation of a mobile robot. The robot moves on a plane, and its movements are described by a command string consisting of one or more of the following letters:

- G instructs the robot to __move__ forward one step
- L instructs the robot to __turn__ left
- R instructs the robot to __turn__ right

The robot CANNOT go backwards - poor robot. After running all of the movement commands, you want to know if the robot returns to its original starting location.

        #Ruby
        return_to_origin?("GRGRGRG")
        => true

        JavaScript
        returnToOrigin("GRGL")
        => false


</section>

### Roman Numerals
<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/xT5LMNd1ieywmnI3Qc/giphy.gif" width="200" alt="roman numerals">

#### Instructions

[What are Roman Numerals?](https://www.mathsisfun.com/roman-numerals.html)

Your goal is to write a method/function that converts an integer into a string such that the number is represented in Roman Numerals in the most efficient way.

For example, the number 4 could be written as `IIII` but it's more efficient to use `IV` since that's a shorter string.

Assume no number is greater than 4,000.

Here are the Roman Numeral equivalents you'll need to know:

- M=1000
- CM=900
- D=500
- CD=400
- C=100
- XC=90
- L=50
- XL=40
- X=10
- IX=9
- V=5
- IV=4
- I=1

Example

        #Ruby
        to_roman(128)
        => "CXXVIII"
        to_roman(2000)
        => "MM"

        #JavaScript
        toRoman(2017)
        => "MMXVII"
        toRoman(1999)
        => "MCMXCIX"


</section>

### Snail
<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/RCBQSWiMPTQly/giphy.gif" width="200" alt="snail">

#### Instructions

Given an n x n array, write a method that returns the array elements arranged from outermost elements to the middle element, traveling clockwise.

A good way to visualize this is to picture the spiral shell of a snail!

Example

        #Ruby
        array_matrix = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
        snail(array_matrix) 
        => [1, 2, 3, 6, 9, 8, 7, 4, 5]


        #JavaScript
        const arrayMatrix = [
            [9, 8, 7],
            [6, 5, 4],
            [3, 2, 1]
        ];
        snail(arrayMatrix) 
        => [9, 8, 7, 4, 1, 2, 3, 6, 5]

</section>

### Target & Payload
<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/10iFFpLLpsDm0/giphy.gif" width="200" alt="target">

#### Instructions
Write a method that takes two parameters, payload and target. The playload should be an array or unique integer values(positive, negative, or 0). The target should be an integer(positive, negative, or 0).Your method/function should search through the payload to find any two numbers that add together to equal the target value.

When you find a pair of numbers that add up to your target value, you can stop processing/searching and return an array of those two values. If no values are found return an empty array.

Be careful that you don't find the same number twice in your payload; for example if your payload contains a 4 and your target is 8, your answer should not indicate that it found 4 twice.

Example

        #Ruby
        find_target([1, 3, 4, 5, 10], 15)
        => [5, 10]
        find_target([-1, -3, 4, 7, -5, 18, 10, -23, 5], 15)
        => [-3, 18]
        find_target([-3, -34, 2, 6, 40, -4], 1)
        => []

        #JavaScript
        findTarget([1, 3, 4, 5, 10], 15)
        => [5, 10]
        findTarget([-1, -3, 4, 7, -5, 18, 10, -23, 5], 15)
        => [-3, 18]
        findTarget([-3, -34, 2, 6, 40, -4], 1)
        => []

_Bonus: Once you've found a working solution, try to optimize to run in O(n) time and 1x space complexity._

</section>

### Merge Linked Lists
<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/YWUpVw86AtIbe/giphy.gif" width="200" alt="link">

#### Instructions

Start [here](https://www.geeksforgeeks.org/data-structures/linked-list/) to explore what is a linked list.

In this challenge, imagine you are given two sorted linked lists.

Each linked list: 
- has data sorted in ascending order
- will not be empty

Your goal is to write a method/function that will merge all data into a single linked list, which should also be sorted in ascending order. The method/function should return an __array__ of all the elements of the merged linked list.

<section class="dropdown">

### Ruby Starter Code  &#9759;


        class ListNode
          attr_accessor :val, :next

          def initialize(val)
            @val = val
            @next = nil
          end
        end


        def merge_two_sorted_linked_lists(list1, list2)
          result = []

          # start a new list with a nil value, which you'll need to skip later
          new_list = ListNode.new(nil)
          
          # we need to keep track of the start of this linked list for later, also
          head = new_list

          # return our result array
          result
        end

        # test cases:
        list1 = ListNode.new(1)
        list1.next = ListNode.new(3)
        list1.next.next = ListNode.new(5)
        list2 = ListNode.new(2)
        list2.next = ListNode.new(4)
        list2.next.next = ListNode.new(6)
        puts 'test case 1 failed' if merge_two_sorted_linked_lists(list1, list2) != [1,2,3,4,5,6]


        list1 = ListNode.new(1)
        list1.next = ListNode.new(2)
        list2 = ListNode.new(4)
        list2.next = ListNode.new(5)
        list2.next.next = ListNode.new(6)
        puts 'test case 2 failed' if merge_two_sorted_linked_lists(list1, list2) != [1,2,4,5,6]

        list1 = ListNode.new(10)
        list1.next = ListNode.new(20)
        list1.next.next = ListNode.new(40)
        list2 = ListNode.new(0)
        puts 'test case 3 failed' if merge_two_sorted_linked_lists(list1, list2) != [0, 10, 20, 40]

        puts 'all done!'

</section>

<section class="dropdown">

### JavaScript Starter Code  &#9759;


        class ListNode {
          constructor(data) {
           this.val = data;
           this.next = null;
          }
        }


        function merge_two_sorted_linked_lists(list1, list2) {
          var result = [];

          // start a new list with a nil value, which we'll skip later
          let new_list = new ListNode(null);
          
          // we need to keep track of the start of this linked list for later, also
          let head = new_list;

          return result;
        }

        // test cases:
        var list1 = new ListNode(1);
        list1.next = new ListNode(3);
        list1.next.next = new ListNode(5);
        var list2 = new ListNode(2);
        list2.next = new ListNode(4);
        list2.next.next = new ListNode(6);
        if (JSON.stringify(merge_two_sorted_linked_lists(list1, list2)) != JSON.stringify([1, 2, 3, 4, 5, 6])) {
         console.log("test case 1 failed");
        }


        var list1 = new ListNode(1);
        list1.next = new ListNode(2);
        var list2 = new ListNode(4);
        list2.next = new ListNode(5);
        list2.next.next = new ListNode(6);
        if (JSON.stringify(merge_two_sorted_linked_lists(list1, list2)) != JSON.stringify([1, 2, 4, 5, 6])) {
         console.log("test case 2 failed");
        }


        var list1 = new ListNode(10);
        list1.next = new ListNode(20);
        list1.next.next = new ListNode(40);
        var list2 = new ListNode(0);
        if (JSON.stringify(merge_two_sorted_linked_lists(list1, list2)) != JSON.stringify([0, 10, 20, 40])) {
         console.log("test case 3 failed");
        }

        console.log("all done!");


</section>


</section>

### Subsets
<section class="dropdown">

### Prompt &#9759;


#### Instructions
In this challenge you are given an array of unique integers. Your job is to return all the possible combinations of unique pairs (2 integers only). No duplicate pairs are allowed. Below are some examples:
        
        #Example 1
        Input: [1, 2, 3, 4]
        Output: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]
        
        #Example 2
        Input: [54, 77]
        Output[[54, 77]]
        
        #Example 3
        Input: []
        Output: []
        
__Possible Extension__
If you successfully complete the challenge above, consider refactoring your solution to return all __possible unique subsets__ from the original array. A subset is any selection of the array, and can be between 0 and n elements long, where n is the number of items in the original array. 
       
        #Example 1
        Input: [1, 2, 3, 4]
        Output: [[],[1],[2],[3],[4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4],[1,2,3],[1,2,4],[1,3,4],[2,3,4],[1,2,3,4]]
 

</section>

### What Did I Order?
<section class="dropdown">

### Prompt &#9759;


<img src="https://media.giphy.com/media/3ogwG6s8q7AudVxce4/giphy.gif" width="200" alt="cash register">

#### Instructions

In this challenge you are given a menu and a list of receipt values. Write a method/function to find the __first__ combination of food that adds up to the receipt total. Return a print out of only __one__ combination for that receipt, and move on to the next receipt. How the print out looks is up to you, but here are some examples:

        #Example 1
        4.85:
        3 items, extra veggies, chips, cheese

        #Example 2
        13.75:
        3 items, {'veggie sandwich': 1, 'nachos': 2}


Constraints:
- you must use 100% of the receipt value, we don't want any money left over
- you can order any quantity of any menu item
- none of the receipt values are "tricks", they all have answers

Tip:
- Doing subtraction and addition on money values CAN lead to “floating point precision” problems. For example, `4.85 - 1.25` might give you `3.599999996`. Round values to two decimal places to make sure you’re finding answers.


<section class="dropdown">

### Ruby Starter Code  &#9759;



        menu = {
          'veggie sandwich' => 6.85,
          'extra veggies' => 2.20,
          'chicken sandwich' => 7.85,
          'extra chicken' => 3.20,
          'cheese' => 1.25,
          'chips' => 1.40,
          'nachos' => 3.45,
          'soda' => 2.05,
        }

        receipts = [4.85, 11.05, 13.75, 17.75, 18.25, 19.40, 28.25, 40.30, 75.00]


</section>

<section class="dropdown">

### JavaScript Starter Code  &#9759;


        let menuItems = {
          "veggie sandwich": 6.85,
          "extra veggies": 2.20,
          "chicken sandwich": 7.85,
          "extra chicken": 3.20,
          "cheese": 1.25,
          "chips": 1.40,
          "nachos": 3.45,
          "soda": 2.05,
        };

        const receipts = [4.85, 11.05, 13.75, 17.75, 18.25, 19.40, 28.25, 40.30, 75.00];

</section>


</section>