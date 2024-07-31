---
layout: page
title: Error Handling in Rails Application
length: 150
tags: rails, errors, rescue, raise, exceptions
---

## Vocabulary
* Exception
* Error
* Class Hierarchy
* Rescue

## Learning Goals

* Understand why we need to plan for errors and how to handle exceptions
* Learn the difference between an error and an exception, in the technical sense of the two words
* Use Rails' built-in methods for rescue

### Error Handling Vs. Debugging

What’s the difference between error handling and debugging?

**Error Handling**: doing something about expected problems
**Debugging**: solving problems we were less prepared for
Debugging could inform future error handling


### Breakout Room Discussion - 10 minutes
Lets talk about some of the common errors you've seen thus far in your development. These can be errors you've seen in mod 1 in pure ruby or errors that you've seen as you've begun developing professional quality rails applications ie: ActiveRecord, Routing, ApplicationController, Status Codes, etc.

* Make a list of all of the errors you can think of.
* When our Rails app encounters an error right now, what happens?


#### Why do we care?

* We can get more specific details around what happened, maybe better logging -> easier debugging
* Quickly identify errors
* User friendliness // Trust
* Showing Rails exceptions with a stack trace can be a security vulnerability 

### Exceptions, and how to handle them

* Error
    * Something bad that happened during normal operation of a program
* Exception
    How our program (Ruby) handles an error, in an object-oriented way. Exceptions are simply classes that the Ruby library has predefined for us.

Ruby comes with a big list of Exceptions: see this list of classes.

❓ Do any of these look familiar? 
```ruby
Exception
 NoMemoryError
 ScriptError
   LoadError
   NotImplementedError
   SyntaxError
 SignalException
   Interrupt
 StandardError
   ArgumentError
   IOError
     EOFError
   IndexError
   LocalJumpError
   NameError
     NoMethodError
   RangeError
     FloatDomainError
   RegexpError
   RuntimeError
   SecurityError
   SystemCallError
   SystemStackError
   ThreadError
   TypeError
   ZeroDivisionError
 SystemExit
 fatal
 ```

Documentation is available for each, ex: [StandardError](https://ruby-doc.org/core-2.5.0/StandardError.html) docs

* Rescue
    * The process of “saving” an application from an Exception
    * Don’t rescue directly from the big `Exception` class - be specific! Stay at or below `StandardError`. Ruby needs some of those errors to function properly!
        * They are not Pokémon. Do not catch ‘em all. 

### Process for Handling Errors
1. What exception are you trying to handle? 
    * example: NoMethodError
2. Where are you trying to handle it? 
    * begin/rescue around a line or block of code.
3. What should happen next?
    * Tell the application what to do or try again.

#### Practice

Run these lines of code in a new Ruby file for this lesson.
**Which specific error types do you see?**

1. “string”.gsub
2. “string”.hey_there
3. [1, 2].first(“one”)

Results:

1.
2.
3. 


Create a ruby file called `exception_handling.rb` and place the code below in it. Then, let's run that file.

```ruby
begin
  "String".hey_there # our existing code
rescue StandardError => e
  require "pry"; binding.pry
end

```

? What would happen if you handled all the exceptions in this file, and ran it again? 

### Sad Path Testing

#### "Happy" Paths vs "Sad" Paths
* “Happy” Paths  ╰( ◕ ᗜ ◕ )╯ 
    * The way an application should work – and often does
Most user stories & feature tests (so far) written this way

* “Sad” Paths   (◞‸◟；)
    * Incorrect usage of our application that has already been solved for
    * Error messages
    * “Gentle guidance” for the user
    
❓ Is a sad path the same or different from an edge case?

**Edge case**: Less common input, can sometimes break functionality

**Sad Path**: Expected, but handled input

**Bottom line**: your tests should include both: happy paths for all, sad paths for inputs, and maybe 1-2 edge cases (if applicable). 


### Error Handling in Rails

#### Setup
We'll be using the `error-handling-start` branch of the [Set List API](https://github.com/turingschool-examples/set-list-api/tree/error-handling-start) for this lesson.


Sad Path User Story

As an API user

When I make a request for a song that doesn't exist

Then I am returned an error message saying "Couldn't find Song with 'id'=1" and a status code of 404

Let's run the sad path test from `/spec/requests/api/v1/songs_request_spec.rb` in isolation:

```ruby
describe "Songs endpoints" do
  ... 

  describe 'sad paths' do
    it "will gracefully handle if a Song id doesn't exist" do
      get "/api/v1/songs/123489846278"

      expect(response).to_not be_successful
      expect(response.status).to eq(404)

      data = JSON.parse(response.body, symbolize_names: true)

      expect(data[:errors]).to be_a(Array)
      expect(data[:errors].first[:status]).to eq("404")
      expect(data[:errors].first[:title]).to eq("Couldn't find Song with 'id'=123489846278")
    end
  end
end
```

What is the outcome of this test? Is it currently passing or failing?

It's not a trick question, and if you said "failing," you're correct! We do want to return an error response of some kind, but our application never gets the chance to do so, because it is rudely interrupted by a _raised Exception_. 

Remember, Exceptions are a type of error that 'fails loudly.' While this might be the desired behavior, we should still handle the Exception gracefully for a better user experience.

Following the stack trace, let's put a `pry` in the `Api::V1::SongsController`:

```ruby
  def show
    require 'pry'; binding.pry
    render json: SongSerializer.format_song(Song.find(params[:id]))
  end
```

Running `Song.find(params[:id])` here will return the following:
```
ActiveRecord::RecordNotFound: Couldn't find Song with 'id'=1
```

We can implement error handling in this controller action by rescuing from the specific Exception that was raised in the case of our sad path test. 

```ruby
  def show
    begin
      render json: SongSerializer.new(Song.find(params[:id]))
    rescue ActiveRecord::RecordNotFound => exception
      require 'pry'; binding.pry
    end
  end
```

Run your test and verify that this part works by hitting the pry.

Let's get the test to pass by returning a json error response within the `rescue`!

```ruby
def show
  begin
    render json: SongSerializer.new(Song.find(params[:id]))
  rescue ActiveRecord::RecordNotFound => exception
    render json: {
      errors: [
        {
          status: "404",
          title: exception.message
        }
      ]
    }, status: :not_found
  end
end
```

### A Second Approach to Error Handling

Before we implement error handling for our `create` endpoint, let's see what currently happens.

Songs require an `artist_id`.

Make a `POST` request to your `Songs` endpoint and use the following request body that doesn't include an `artist_id`.

```json
{
"title": "Example Song",
"length": 12
}
```

You should see an API response that starts similarly to the following:

```json
{
    "status": 422,
    "error": "Unprocessable Content",
    "exception": "#<ActiveRecord::RecordInvalid: Validation failed: Artist must exist>",
    "traces": {
        "Application Trace": [
            {
                "exception_object_id": 19040,
                "id": 12,
                "trace": "app/controllers/api/v1/songs_controller.rb:11:in `create'"
            }
        ],
        "Framework Trace": [
            {
                "exception_object_id": 19040,
                "id": 0,
                "trace": "activerecord (7.1.3.4) lib/active_record/validations.rb:84:in `raise_validation_error'"
            },
            {
                "exception_object_id": 19040,
                "id": 1,
                "trace": "activerecord (7.1.3.4) lib/active_record/validations.rb:55:in `save!'"
            },
            {
                "exception_object_id": 19040,
                "id": 2,
                "trace": "activerecord (7.1.3.4) lib/active_record/transactions.rb:313:in `block in save!'"
            },
            {
                "exception_object_id": 19040,
                "id": 3,
                "trace": "activerecord (7.1.3.4) lib/active_record/transactions.rb:365:in `block in with_transaction_returning_status'"
            },
            ...
        ]
    }
}
```
As an API user this is a very messy response. It's way longer than it needs to be and could be much cleaner.

There are two approaches we can take to cleaning this up. The first is to make use of the begin/rescue syntax we use for the `show` endpoint. 

#### Begin/Rescue Error Handling

Replace your `create` endpoint with the following, and make another POST request.

```ruby
def create
  begin
    render json: song = Song.create!(song_params), status: 201
  rescue ActiveRecord::RecordInvalid => exception
    render json: {
      errors: [
        {
          status: "422",
          title: exception.message
        }
      ]
    }, status: :unprocessable_entity
  end
end
```

You're API response should now look something like this. Much nicer!

```json
{
    "errors": [
        {
            "status": "422",
            "title": "Validation failed: Artist must exist"
        }
    ]
}
```

#### If/Else Error Handling

Now, replace your current `create` endpoint with the following code. Send the same API request again and notice that again you have a much more user friendly response!

```ruby
def create
    song = Song.new(song_params)
    if song.save
      render json: song, status: 201
    else
      render json: {
        errors: [
          {
            status: "422",
            title: song.errors.full_messages
          }
        ]
      }, status: :unprocessable_entity
    end
end
```

What is different between this approach and the approach for the `show` endpoint?

Here we have switched to using `new` and `save` to create a new entity. And we are able to make use of an if/else statement because `song.save` returns us a boolean to let us know if that method was successful. We can see this from [the save docs](https://www.rubydoc.info/docs/rails/3.2.8/ActiveRecord%2FPersistence:save). The `find` method we used earlier behaves differently and just throws an exception that we need to use `rescue` to recover from. We can see this from [the find docs](https://www.rubydoc.info/docs/rails/3.2.8/ActiveRecord%2FFinderMethods:find)

### Error Handling and Validations

Let's review your Data Validations homework and think about how data validations fit in with error handling.

With you partner, discuss the following two questions:
* What are data validations?
* Where do validations happen? (DB, Rails application, FE, etc)
* When do validations happen?
* Why is it important to validate our data?

When one of our validations fails, that's one reason for `song.save` to return `False`.

#### Try it out! 

Add a validation to your song model to make sure the title is less than 20 characters.

[validation helpers](https://edgeguides.rubyonrails.org/active_record_validations.html).

In Postman, send a request with an extra long title and make sure your error handling gracefully handles this sad path.

### Practice

In your breakout rooms complete the following:
* Add at least two sad path tests for `create`
* Add sad path tests and error handling for your `update` and `destroy` endpoints.

**Basics**
- Add a validation that validates the uniqueness of an Artist's name
- Add a validation that validates the presence of a Song's title
- Add a validation for the Song's `play_count` column that validates numericality
- Add a validation to check for the presence of a boolean value for one of your models.

**Advanced**
- Add a new column to the songs table that has a validation that only runs on an `update`
- Add a custom validation method to assign a default length attribute for a Song when none is provided

### Checks for Understanding

1. What is an example of a Sad Path, and how does it differ from a Happy Path?
2. Why should we handle exceptions?
3. Why is it best practice to handle specific exceptions and never rescue directly from the big `Exception` class?

### Resources

* [Rebased on API error handling](https://blog.rebased.pl/2016/11/07/api-error-handling.html)
* [Stackify on rescuing exceptions in ruby](https://stackify.com/rescue-exceptions-ruby/)
* [Geeks for Geeks on handling exceptions in ruby](https://www.geeksforgeeks.org/ruby-exception-handling/)
