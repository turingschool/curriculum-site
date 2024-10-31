---
layout: page
title: EventManager
language: ruby
topics: files, CSV, String, Sunlight API, ERB
---

### Prerequisites

Before starting this tutorial, you should have a basic understanding of topics
covered in [Ruby in 100 Minutes](https://gist.github.com/beneggett/6633512).

You should also be comfortable with:

 * installing a gem
 * using IRB
 * writing methods

### Learning Goals

After completing this tutorial, you will be able to:

* manipulate [file](http://rubydoc.info/stdlib/core/File) input and output
* read content from a [CSV](http://rubydoc.info/stdlib/csv/file/README.rdoc) (Comma Separated Value) file
* transform it into a standardized format
* utilize the data to contact a remote service
* populate a template with user data
* manipulate [strings](http://rubydoc.info/stdlib/core/String)


<div class="note">
<p>This tutorial is open source. If you notice errors, typos, or have questions/suggestions,
  please <a href="https://github.com/JumpstartLab/curriculum/blob/master/source/projects/eventmanager.markdown">submit them to the project on GitHub</a>.</p>
</div>

### What We're Doing in This Tutorial

Imagine that a friend of yours runs a non-profit org around political activism.
A number of people have registered for an upcoming event. She has asked for your help in
engaging these future attendees.

### Initial Setup

Create a folder named `event_manager` wherever you want to store your project.
In that folder, use your text editor to create a plain text file named
`event_manager.rb`.

```
$ mkdir event_manager
$ cd event_manager
$ mkdir lib
$ touch lib/event_manager.rb
```
Creating and placing your `event_manager.rb` file in 'lib' directory is entirely
optional, however, it adheres to a common convention within most ruby applications.
The filepaths we use in this tutorial will assume that we have put our `event_manager.rb`
file within the 'lib' directory.

Ruby source file names are often times written all in lower-case characters and
instead of camel-casing multiple words together they are instead separated by an
underscore (often called *snake-case*).

Open `lib/event_manager.rb` in your text editor and add the line:

```
ruby lib/event_manager.rb
puts "EventManager Initialized!"
```

Validate that ruby is installed correctly and you have created the file correctly by running it from the root of your `event_manager` directory:

```
$ ruby lib/event_manager.rb
Event Manager Initialized!
```
If ruby is not installed and available on your environment path then you will be presented with the following message:

```
$ ruby lib/event_manager.rb
-bash: ruby: command not found
```
If the file was not created then you will be presented with the following error:
message

```
$ ruby lib/event_manager.rb
ruby: No such file or directory -- lib/event_manager.rb (LoadError)
```
For this project we are going to use the following sample data:

* [Small Sample](../assets/event_attendees.csv)
* [Large Sample](../assets/full_event_attendees.csv)

Download the *small sample* csv file and save it in the
root of `event_manager` directory.

```
$ curl -o event_attendees.csv http://tutorials.jumpstartlab.com/projects/event_attendees.csv
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  2125  100  2125    0     0   3269      0 --:--:-- --:--:-- --:--:-- 12073
```

## Iteration 0: Loading a File

A comma-separated values
[(CSV)](http://en.wikipedia.org/wiki/Comma-separated_values) file stores
tabular data (numbers and text) in plain-text form. The CSV format is readable
by a large number of applications (e.g. Excel, Numbers, Calc). Its portability
makes it a popular option when sharing large sets of tabular data from a
database or spreadsheet applications.

The first few rows of the CSV file you downloaded look like this:

` ,RegDate,first_Name,last_Name,Email_Address,HomePhone,Street,City,State,Zipcode
1,11/12/08 10:47,Allison,Nguyen,arannon@jumpstartlab.com,6154385000,3155 19th St NW,Washington,DC,20010
2,11/12/08 13:23,SArah,Hankins,pinalevitsky@jumpstartlab.com,414-520-5000,2022 15th Street NW,Washington,DC,20009
3,11/12/08 13:30,Sarah,Xx,lqrm4462@jumpstartlab.com,(941)979-2000,4175 3rd Street North,Saint Petersburg,FL,33703
4,11/25/08 19:21,David,Thomas,gdlia.lepping@jumpstartlab.com,650-799-0000,9 garrison ave,Jersey City,NJ,7306`

### Read the File Contents

[File](http://rubydoc.info/stdlib/core/File) is a core ruby class that allows
you to perform a large number of operations on files on your filesystem. The
most straightforward being `File.read`

```ruby
$lib/event_manager.rb
puts "EventManager initialized."

contents = File.read "event_attendees.csv"
puts contents
```

Whether you use Single Quotes or Double Quotes does not matter. They are
different in many ways but are essentially the same when representing a string
of characters in this case as the initial greeting or the name of the file.

We are assuming the file is present here. File has the ability to check if a
file exists at the specified filepath on the filesystem through `File.exist?
"event_attendees.csv"`.


### Read the File Line By Line

Reading and displaying the entire contents of the file showed us how to quickly
access the data. Our goal is to display the first names of all the attendees.
There are numerous [String](http://rubydoc.info/stdlib/core/String) methods
that would allow us to manipulate this large string.

Files can also be read in as an array of lines.

```ruby
$lib/event_manager.rb
puts "EventManager initialized."

lines = File.readlines "event_attendees.csv"
lines.each do |line|
  puts line
end
```

First we read in the entire contents of the file as an array of lines. Second
we iterate over the entire collection of lines, one at a time, and output the
contents of each line.

### Display the First Name of All Attendees

Instead of outputing the entire contents of each line we want to show only the
first name. That requires us to look at the current contents of our Event
Attendees file.

```
 ,RegDate,first_Name,last_Name,Email_Address,HomePhone,Street,City,State,Zipcode
1,11/12/08 10:47,Allison,Nguyen,arannon@jumpstartlab.com,6154385000,3155 19th St NW,Washington,DC,20010
```

The first row contains header information. This row provides descriptional text
for each column of data. It tells us the data columns are laid out as follows
from left-to-right:

* `ID` - the empty column represents a unique identifier or row number of all
  the subsequent rows
* `RegDate` - the date the user registered for the event
* `first_Name` - their first name
* `last_Name` - their last name
* `Email_Address` - their email address
* `HomePhone` - their home phone number
* `Street` - their street address
* `City` - their city
* `State` - their state
* `Zipcode` - their zipcode

The lack of consistent formatting of these headers models is not ideal when
choosing to model your own data. These column names have been our extreme
example of a poorly formed external service. Great applications are often built
on the backs of such services.

We are interested in the 'first_Name' column. At the moment we have a string of
text that represents the entire row. We need to convert the string into an
array of columns. The separation of the columns can be identified by the comma
',' separator. We want to split the string into pieces wherever we see a comma.

Ruby's
[String#split](http://rubydoc.info/stdlib/core/String#split-instance_method)
allows you to convert a string of text into an Array along a particular
character.

By default when you send the split message to the String without a parameter it
will break the string apart along a space " " character.

```ruby
$lib/event_manager.rb
puts "EventManager initialized."

lines = File.readlines "event_attendees.csv"
lines.each do |line|
  columns = line.split(",")
  p columns
end
```

Within our array of columns we want to access our 'first_Name'. This would be
the third column or third element at the array's second index `columns[2]`.

Arrays start counting at 0 instead of 1. To get the idea, we would access the
array's first element at `columns[0]`.


```ruby
$lib/event_manager.rb
puts "EventManager initialized."

lines = File.readlines "event_attendees.csv"
lines.each do |line|
  columns = line.split(",")
  name = columns[2]
  puts name
end
```

### Skipping the Header Row

The header row was a great help to us in understanding the contents of the CSV
file. However, the row itself does not represent an actual attendee. To ensure
that we only output attendees we could remove the header row from the file, but
that would make it difficult if we later returned to the file and tried to
understand the columns of data.

Another option is to ignore the first row when we display the names. Currently
we handle all the rows exactly the same which makes it difficult to understand
which one is the header row.

One way to solve this problem would be to skip the line when it exactly matches
our current header row.

```ruby
$lib/event_manager.rb
puts "EventManager initialized."

lines = File.readlines "event_attendees.csv"
lines.each do |line|
  next if line == " ,RegDate,first_Name,last_Name,Email_Address,HomePhone,Street,City,State,Zipcode\n"
  columns = line.split(",")
  name = columns[2]
  puts name
end
```

A problem with this solution is that the content of our header row could change
in the future. Additional columns could be added or the existing columns
updated.

A second way to solve this problem is for us to track the index of the current
line.

```ruby
$lib/event_manager.rb
puts "EventManager initialized."

lines = File.readlines "event_attendees.csv"
row_index = 0
lines.each do |line|
  row_index = row_index + 1
  next if row_index == 1
  columns = line.split(",")
  name = columns[2]
  puts name
end
```

This is a such a common operation that Array defines
[Array#each_with_index](http://rubydoc.info/stdlib/core/Enumerable#each_with_index-instance_method).

```ruby
$lib/event_manager.rb
puts "EventManager initialized."

lines = File.readlines "event_attendees.csv"
lines.each_with_index do |line,index|
  next if index == 0
  columns = line.split(",")
  name = columns[2]
  puts name
end
```

This solves the problem if the header row were to change in the future. It does
now assume that the header row is first row within the file.


### Look for a Solution before Building a Solution

Either of these solutions would be *OK* given our current attendees file.
Problems may arise if we are given a new CSV file that is generated or
manipulated by another source. This is because the CSV parser that we have
started to create does not take into account a number of other features
supported by the CSV file format.

Two important ones:

* CSV files often contain comments which are lines that start with a pound (#) character
* Columns are unable to support a value which contain a comma (,) character

Our goal is to get in contact with our event attendees. It is not to define a
CSV parser. This is often a hard concept to let go of when initially solving a
problem with programming. An important rule to abide by while building software
is:

> Look for a Solution before Building a Solution

Ruby actually provides a CSV parser that we will instead use throughout the
remainder of this exercise.

## Iteration 1: Parsing with CSV

It is likely the case that if you want to solve a problem, someone has likely
done it in some capacity. They may have even been kind enough to share their
solution or the tools that they created. This is the kind of goodwill that
pervades the Open Source community and Ruby ecosystem.

In this iteration we are going to convert our current CSV parser to use Ruby's [CSV](http://rubydoc.info/stdlib/csv).
We will then use this new parser to access our attendees' zip codes.

### Switching over to use the CSV Library

Ruby's core language comes with a wealth of great classes. Not all of them are
loaded every single time ruby code is executed. This ensures unneeded
functionality is not loaded unless required, preventing ruby from having
slower start up times.

You can browse the many libraries available through the [documentation](http://rubydoc.info/stdlib).

```ruby
require "csv"
puts "EventManager initialized."

contents = CSV.open "event_attendees.csv", headers: true
contents.each do |row|
  name = row[2]
  puts name
end
```

First we need to tell Ruby that we want it to load the CSV library. This is done
through the `require` method which accepts a parameter of the functionality to
load.

The way [CSV](http://rubydoc.info/stdlib/csv) loads and parses data is very
similar to what we previously defined.

Instead of `read` or `readlines` we use CSV's `open` method to load our file.
The library also supports the concept of headers and so we provide some
additional parameters which state this file has headers.

There are pros and cons to using an external library. A 'pro' is how easy this
library makes it for us to express that our file has headers. A 'con' is that
you have to learn how the library is implemented.

### Accessing Columns by their Names

CSV files with headers have an additional option which allows you to access
the column values by their headers. Our CSV file defines several different
formats for the column names. The CSV library provides an additional option
which allows us to convert the header names to symbols.

Converting the headers to symbols will make our column names more uniform and
easier to remember. The header 'first_Name' will be converted to `:first_name`.

```ruby
require "csv"
puts "EventManager initialized."

contents = CSV.open "event_attendees.csv", headers: true, header_converters: :symbol
contents.each do |row|
  name = row[:first_name]
  puts name
end
```

### Displaying the Zip Codes of All Attendees

Accessing the zipcode is very easy using the header name. 'Zipcode' becomes
`:zipcode`.

```ruby
require "csv"
puts "EventManager initialized."

contents = CSV.open "event_attendees.csv", headers: true, header_converters: :symbol
contents.each do |row|
  name = row[:first_name]
  zipcode = row[:zipcode]
  puts "#{name} #{zipcode}"
end
```

We now are able to output the name of the individual and their zipcode.

Now that we are able to visualize both pieces of data we realize that we
have a problem....

## Iteration 2: Cleaning up our Zip Codes

The zip codes in our small sample show us:

* Most zip codes are correctly expressed as a five-digit number
* Some zip codes are represented with less than a five-digit number
* Some zip codes are missing

Before we are able to figure out our attendees' representatives we need to
solve the second issue and the third issue.

* Some zip codes are represented with less than a five-digit number

If we looked at the *larger sample of data* we would
see that the majority of the shorter zip codes are from individuals from states
in the north-eastern part of the United States. Many zip codes there start with
0. This data was likely stored in the database as an integer, and not as text,
which caused the leading zeros to be removed.

So in the case of zip codes less than five-digits we will assume that we can
pad missing zeros to the front.

* Some zip codes are missing

Some of our attendees are missing a zip code. It is likely that they forgot to
enter the data when they filled out the form. The zip code data was not likely
marked as mandatory and so our future attendees were not presented with an
error message.

We could try and figure out the zip code based on the rest of the address
provided. We could be wrong with our guess so instead we will use a default,
bad zip code of "00000".

### Pseudocode for Cleaning Zip Codes

Before we start to explore a solution with Ruby code it is often helpful to
express what we are hoping to accomplish in English words.

```ruby
require "csv"
puts "EventManager initialized."

contents = CSV.open "event_attendees.csv", headers: true, header_converters: :symbol
contents.each do |row|
  name = row[:first_name]
  zipcode = row[:zipcode]

  # if the zip code is exactly five digits, assume that it is ok
  # if the zip code is more than 5 digits, truncate it to the first 5 digits
  # if the zip code is less than 5 digits, add zeros to the front until it becomes five digits

  puts "#{name} #{zipcode}"
 end
```

* if the zip code is exactly five digits, assume that it is ok

In the case when the zip code is five digits in length we have it easy. We
simply want to do nothing.

* if the zip code is more than 5 digits, truncate it to the first 5 digits

While zip codes can be expressed with additional resolution (more digits after
a dash) we are only interested in the first five digits.

* if the zip code is less than 5 digits, add zeros to the front until it
  becomes five digits

There are many possible ways that we can solve this issue. These are a few
paths:

  * Use a `while` or `until` loop to prepend zeros until the length is five
  * Calculate the length of the current zip code and add missing zeros to the front
  * Add five zeros to the front of the current zip code and then trim the last five digits
  * Use [String#rjust](http://rubydoc.info/stdlib/core/String#rjust-instance_method) to append zeros to the front of the string.

### Handling Bad and Good Zip Codes

The following solution employs:

* [String#length](http://rubydoc.info/stdlib/core/String#length-instance_method) - returns the length of the string.
* [String#rjust](http://rubydoc.info/stdlib/core/String#rjust-instance_method) - to pad the string with zeros.
* [String#slice](http://rubydoc.info/stdlib/core/String#slice-instance_method) - to create sub-strings either through
  the `slice` method or the array-like notation `[]`

```ruby
require 'csv'

puts "EventManager initialized."

contents = CSV.open 'event_attendees.csv', headers: true, header_converters: :symbol

contents.each do |row|
  name = row[:first_name]
  zipcode = row[:zipcode]

  if zipcode.length < 5
    zipcode = zipcode.rjust 5, "0"
  elsif zipcode.length > 5
    zipcode = zipcode[0..4]
  end

  puts "#{name} #{zipcode}"
end
```

When we run our application, we see the first few output correctly and then the
application terminates.

```
$ ruby lib/event_manager.rb
EventManager initialized.
Allison 20010
SArah 20009
Sarah 33703
David 07306
lib/event_manager.rb:11:in `block in <main>': undefined method `length' for nil:NilClass (NoMethodError)
	from /Users/burtlo/.rvm/rubies/ruby-1.9.3-p374/lib/ruby/1.9.1/csv.rb:1792:in `each'
	from lib/event_manager.rb:7:in `<main>'
```
* What is the error mesage "undefined method `length' for nil:NilClass (NoMethodError)" saying?

Reviewing our CSV data we notice that the next row specifies no value. An empty
field translates into a nil instead of an empty string. This is choice made by
the CSV library maintainers. So we now need to handle this situation.

### Handling Missing Zip Codes

Our solution above does not handle the case when the zip code has not been
specified. CSV return a `nil` value when no value has been specified in the
column. All objects in Ruby respond to `#nil?`. All objects will return false
except for a `nil`.

We can update our implementation to handle this new case by simply adding a
check for `nil?`.

```ruby
require 'csv'

puts "EventManager initialized."

contents = CSV.open 'event_attendees.csv', headers: true, header_converters: :symbol

contents.each do |row|
  name = row[:first_name]
  zipcode = row[:zipcode]

  if zipcode.nil?
    zipcode = "00000"
  elsif zipcode.length < 5
    zipcode = zipcode.rjust 5, "0"
  elsif zipcode.length > 5
    zipcode = zipcode[0..4]
  end

  puts "#{name} #{zipcode}"
end
```

```
$ ruby lib/event_manager.rb
EventManager initialized.
Allison 20010
SArah 20009
Sarah 33703
David 07306
Chris 00000
Aya 90210
Mary Kate 21230
Audrey 95667
Shiyu 96734
Eli 92037
Colin 02703
Megan 43201
Meggie 94611
Laura 00924
Paul 14517
Shannon 03082
Shannon 98122
Nash 98122
Amanda 14841
```
### Moving Clean Zip Codes to a Method

It is important for us to take a look at our implementation. During this
examination we should ask ourselves:

* Does the code clearly express what it is trying to accomplish?

The implementation does a decent job at expressing what it accomplishes. The
biggest problem is that it is expressing it near so many other concepts. To
make this implementation clearer we should move this logic into its own method
named `clean_zipcode`.

```ruby
require 'csv'

def clean_zipcode(zipcode)
  if zipcode.nil?
    "00000"
  elsif zipcode.length < 5
    zipcode.rjust(5,"0")
  elsif zipcode.length > 5
    zipcode[0..4]
  else
    zipcode
  end
end

puts "EventManager initialized."

contents = CSV.open 'event_attendees.csv', headers: true, header_converters: :symbol

contents.each do |row|
  name = row[:first_name]

  zipcode = clean_zipcode(row[:zipcode])

  puts "#{name} #{zipcode}"
end
```

While this may feel like a very small, inconsequential change. Small changes
like these help make your code cleaner and your intent clearer.

### Refactoring Clean Zip Codes

With our clean zip code logic tucked away in our `clean_zipcode` method we can
examine it further to see if we can make it even more succinct.

* Coercion over Questions

A good rule when developing in Ruby is to favor coercing values into similar
values so that they will behave the same. We have a special case to deal
specifically with a `nil` value. It would be much easier if instead of checking
for a nil value we convert the `nil` into a string with
[NilClass#to_s](http://rubydoc.info/stdlib/core/NilClass#to_s-instance_method).

```
$ nil.to_s
=> ""
```

Examining
[String#rjust](http://rubydoc.info/stdlib/core/String#rjust-instance_method) in
irb we can see that when we provide values greater than 5 it performs no work.
This means we apply it in both cases as it will have the same intended effect.

```
$ "123456".rjust 5, "0"
=> "123456"
```

Lastly, examining
[String#slice](http://rubydoc.info/stdlib/core/String#slice-instance_method) in
irb we can see that for a number that is exactly five digits in length it has no
effect. This also means we can apply it in cases when the zip code is five
digits or more than five digits and it will have the same effect.

```
$ "12345"[0..4]
=> "12345"
```

Combining all of these steps together we can write a more succinct
`clean_zipcode` method:

```ruby
def clean_zipcode(zipcode)
  zipcode.to_s.rjust(5,"0")[0..4]
end
```
