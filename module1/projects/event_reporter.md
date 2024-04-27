---
layout: page
title: EventReporter
---

This project builds on the lessons learned in [EventManager](../projects/eventmanager)
to focus on fundamental Ruby style/concepts.

## Project Overview

### Learning & Practice Goals

* Determine appropriate classes and methods based on specifications
* Demonstrate understanding of variable scope and lifecycle
* Create multiple coordinating methods and objects
* Choose enumerables best suited for the task
* Utilize effective debugging techniques

### Abstract

Let's take [EventManager](eventmanager) to the next
level. Based on the larger data file, build an interactive query-and-reporting
tool which fulfills the expectations below. Re-use data-cleaning procedures
from the original `EventManager` to handle dirty input and generate beautiful
output. We are also going to explore creating our own HTML files.

### Data Supplied

* Source data file: [full_event_attendees.csv](full_event_attendees.csv)

## Base Expectations

As a user launching the program, I'm provided a [REPL (Read-Eval-Print-Loop)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) where I can issue one of several commands, described below. After each command completes, the prompt returns, waiting for another instruction.

### The Queue

The program has a concept called the "queue". The queue holds the stored results from a previous search. As a user, I issue a search command to find records, then later issue another command to do work with those results. The queue is *not* cleared until the user runs the command `queue clear` or a new `find` command.

### The REPL

The program must respond to the following commands:

#### `load <filename>`

Erase any loaded data and parse the specified file. If no filename is given, default to `full_event_attendees.csv`.

#### `find <attribute> <criteria>`

Populate the queue with all records matching the criteria for the given attribute. Example usages:

* `find zipcode 20011`
* `find last_name Johnson`
* `find state VA`

The comparison should:

* Be case insensitive, so `"Mary"` and `"mary"` would be found in the same search
* Be insensitive to internal whitespace, but not external:
  * `"John"` and `"John "` are considered matches
  * `"John Paul"` and `"Johnpaul"` are not matches
* Not do substring matches, so a `find first_name Mary` does not find a record with first name `"marybeth"`

#### `queue count`

Output how many records are in the current queue

#### `queue clear`

Empty the queue

#### `queue print`

Print out a tab-delimited data table with a header row following this format:

```
  LAST NAME  FIRST NAME  EMAIL  ZIPCODE  CITY  STATE  ADDRESS  PHONE
```

#### `queue print by <attribute>`

Print the data table sorted by the specified `attribute` like `zipcode`.

#### `queue save to <filename.csv>`

Export the current queue to the specified filename as a CSV. The file should
include data and headers for last name, first name, email, zipcode, city,
state, address, and phone number.

#### `queue export html <filename.csv>`

Export the current queue to the specified filename as a valid HTML file. The
file should use tables and include the data for all of the expected information.

#### `help`

Output a listing of the available individual commands

#### `help <command>`

Output a description of how to use the specific command. For example:

```
help queue clear
help find
```

### Test Cases for Base Expectations

Your program must handle the following scenarios correctly:

#### A. Happy Paths

1. `load full_event_attendees.csv`
2. `queue count` should return `0`
3. `find first_name John`
4. `queue count` should return `63`
5. `queue clear`
6. `queue count` should return `0`
7. `help` should list the commands
8. `help queue count` should explain the queue count function
9. `help queue print` should explain the printing function

#### B. Let's Try Printing

1. `load`
2. `queue count` should return `0`
3. `find first_name John`
4. `find first_name Mary`
5. `queue print` should print out the 16 attendees
6. `queue print by last_name` should print the same attendees sorted alphabetically by last name
7. `queue count` should return `16`

#### C. Saving

1. `load`
2. `find city Salt Lake City`
3. `queue print` should display 13 attendees
4. `queue save to city_sample.csv`
5. Open the CSV and inspect that it has correct headers and the data rows from step 3.
6. `find state DC`
7. `queue print by last_name` should print them alphabetically by last name
8. `queue save to state_sample.csv`
9. Open the CSV and inspect that it has the headers, the data from step 7, but not the data previously found in step 2.
10. `queue clear`
11. Repeat steps 2 through 8, except with HTML.

#### D. Reading Your Data

1. `load`
2. `find state MD`
3. `queue save to state_sample.csv`
4. `quit`

_Restart the program and continue..._

5. `load state_sample.csv`
6. `find first_name John`
7. `queue count` should return `4`

#### E. Emptiness

Note that this set intentionally has no call to `load`:

1. `find last_name Johnson`
2. `queue count` should return `0`
3. `queue print` should not print any attendee data
4. `queue clear` should not return an error
5. `queue print by last_name` should not print any data
6. `queue save to empty.csv` should output a file with only headers
7. `queue count` should return `0`

## Extensions

### Improving `queue print`

* Modify your `queue print` command so it prints in left-aligned columns where the size of each column is determined by the longest entry in the column.
* If the queue is more than 10 lines, pause after ten until the user hits either the spacebar or enter keys.
* Add a status line that reads like "Showing Matches 20-30 of 80"

### Improving `find`

* Modify your `find` instruction so all searches are case insensitive
* Modify your `find` instruction to allow compound searches using a single `and` such as:

```
find zipcode 20011 and last_name Johnson
```

### Improving `queue save to`

* Modify the instruction to respect the filename extension so that:
  * `csv` generates comma-separated values
  * `txt` generates tab-delimited values
  * `json` generates valid, parsable JSON
  * `xml` generates valid, parsable XML
  * `yml` generates valid YAML

### Implementing `queue district`

If there are less than 10 entries in the queue, this command will use the [Google Civic Information API](https://developers.google.com/civic-information/) to get Congressional District information for each entry.

### Implementing Queue Math

Assuming I have results currently in the queue, implement queue math like this:

```
find state DC
subtract zipcode 20011
```

That would find me all entries for DC that are _not_ in `20011`. Similarly:

```
find state DC
add zipcode 22182
```

Would load the queue with all entries from DC or the `22182` zipcode.

### Nightmare-Mode `find`

Modify your `find` method to allow multiple attribute values in parentheses like this:

```
find zipcode (20011, 22182) and last_name (Johnson, Patrick, Smith)
```

Support an `or` operation:

```
find zipcode (20011, 22182) or last_name (Johnson, Patrick, Smith)
```

And support `find` only within the queue:

```
find zipcode (20011, 22182)
queue find last_name Johnson
```

Which would find only the Johnsons in 20011 or 22182.

### Test Cases for Extensions

For the extensions to pass the evaluation, it must handle the following scenarios correctly.

#### A. Improved `queue print`

1. `load`
2. `find first_name sarah`
3. `queue print`

Observe the first two screens of output similar to this:

```
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
LAST NAME       FIRST NAME  EMAIL                                  ZIPCODE     CITY                    STATE  ADDRESS                              PHONE
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Hankins         SArah       pinalevitsky@jumpstartlab.com          20009       Washington              DC     2022 15th Street NW                  4145205000
Xx              Sarah       lqrm4462@jumpstartlab.com              33703       Saint Petersburg        FL     4175 3rd Street North                9419792000
Cordova         Sarah       tmai.202@jumpstartlab.com              21044       Columbia                MD     5430 Hesperus Drive                  4109639000
Irvine          Sarah       wwoodruf@jumpstartlab.com              30127       Powder Springs          GA     6184 Windflower Drive                7704249000
Hough           Sarah       gi@jumpstartlab.com                    06614       stratford               CT     42c powder mill drive                2036506000
Geretz          Sarah       ovdawaaa@jumpstartlab.com              01002       Amherst                 MA     72 Triangle St. appt. 2              8572311000
Sample          Sarah       nqiza@jumpstartlab.com                 94619       Oakland                 CA     270 Rishell Drive                    5107086000
Gerow           Sarah       xnb77@jumpstartlab.com                 33559       Lutz                    FL     2501 Black Horse Loop Apt 301C       8137359000
Eden            Sarah       cetephenson@jumpstartlab.com           33559       Lutz                    FL     2501 Black Horse Loop Apt 301C       8136798000
Riordan         Sarah       ctuhspugha@jumpstartlab.com            80212       Denver                  CO     2814 Tennyson St.                    7202058000
Displaying records 0 - 10 of 78
press space bar or the enter key to show the next set of records

Gordon          Sarah       cxcahdprice@jumpstartlab.com           43554       Pioneer                 OH     18476 County Road 15                 4197373000
Johnston        Sarah       gylaki@jumpstartlab.com                94104       San Francisco           CA     221 Pine St                          4157863000
Oddie           Sarah       blhhhhhhhh@jumpstartlab.com            94101       san francisco           CA     221 pine st                          4157863000
Catlin          Sarah       tlacyjamesrossi3@jumpstartlab.com      40206       Louisville              KY     114 N Galt Ave                       5029386000
Clatterbuck     Sarah       dhchleith@jumpstartlab.com             05401       Burlington              VT     37 D Conger Ave                      8025401000
Dernoga         Sarah       gkpaldin@jumpstartlab.com              49461       Whitehall               MI     7473 Easy Street                     2316707000
Ojeh            Sarah       bfkelly@jumpstartlab.com               20742       College Park            MD     8000 Boteler Lane Appt 248A          4104743000
Sparrow         Sarah       jw9@jumpstartlab.com                   13346       Hamilton                NY                                          9084187000
Deutschmann     Sarah       pooneil@jumpstartlab.com               03435       Keene, NH               NH     229 Main St.                         6032752000
Alilionis       Sarah       jhagamininj4@jumpstartlab.com          03431       Keene                   NH     21 Coolidge Street                   2032783000
Displaying records 10 - 20 of 78
press space bar or the enter key to show the next set of records
```

Noting that it has...

1. Aligned columns
2. 10 entries per screen
3. A status bar displaying total records

*But*, the exact number of records may differ if the program does not implement the "improved find" with case-insensitive search.

#### B. Improved `find`

1. `load`
2. `find first_name sarah and state CA`
3. Observe that there should only be four records in the queue

#### C. Improved `queue save to`

1. `load`
2. `find first_name Sarah`
3. `queue save to sarah.xml`
4. `queue save to sarah.json`
5. `queue save to sarah.txt`
6. `queue save to sarah.yml`
7. Inspect the four output files for completeness and structure.

#### D. `queue district`

`queue print` for queues less than 10 should now print a data table with a header row following this format:

```
  LAST NAME  FIRST NAME  EMAIL  ZIPCODE  CITY  STATE  ADDRESS  PHONE  DISTRICT
```

#### E. Queue Math

1. `load`
2. `find zipcode 20011`
3. `subtract first_name william`
4. `add zipcode 20010`
5. Observe that there are 8 records in the queue.

#### F. Nightmare-Mode Find

1. `load`
2. `find state (DC, VA, MD) and last_name johnson`
3. Observe that there are three records in the queue.
4. `load`
5. `find state dc or last_name smith`
6. Observe that there are 270 records in the queue
7. `queue find first_name alicia`
8. Observe that only 3 records remain in the queue

## Evaluation Rubric

The project will be assessed with the following guidelines:

* 4: Above expectations
* 3: Meets expectations
* 2: Below expectations
* 1: Well-below expectations

### 1. Ruby Syntax & Style

Expectations: 

- [ ] Applies appropriate attribute encapsulation  
- [ ] Developer creates instance and local variables appropriately
- [ ] Naming follows convention (is idiomatic)
- [ ] Ruby methods used are logical and readable  
- [ ] Developer implements best-choice enumerable methods
- [ ] Code is indented properly
- [ ] Code does not exceed 80 characters per line
- [ ] A directory/file structure provides basic organization via lib/ and/or /test


### 2. Breaking Logic into Components

Expectations: 

- [ ] Code is effectively broken into methods & classes 
- [ ] Developer writes methods less than 7 lines 
- [ ] No more than 3 methods break the principle of SRP 

### 3. Test-Driven Development

Expectations: 

- [ ] Each method is tested  
- [ ] Functionality is accurately covered
- [ ] Tests implement Ruby syntax & style   
- [ ] Balances unit and integration tests 
- [ ] Evidence of edge cases testing 
- [ ] Test Coverage metrics are present (SimpleCov)
- [ ] A test RakeTask is implemented

### 4. Functionality

Expectations: 

- [ ] Application meets all requirements (extension not req'd)

### 5. Version Control

- [ ] Developer commits at a pace of at least 1 commit per hour
- [ ] Developer implements branching and PRs
- [ ] The final submitted version is merged into master

