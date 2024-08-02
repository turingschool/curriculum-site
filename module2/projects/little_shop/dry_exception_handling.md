---
layout: page
title: Little Shop DRY Exception Handling
length: 1.5 weeks
tags:
type: project
---

# Refactoring Our Exception Handling

## Revisiting Our Rescue Blocks

Let's think back to our Set List example, where we were setting up error handling for the case when a controller action is fetching a song with an invalid ID. Remember that `Song.find(<id>)` will throw an exception when it's passed an invalid song ID. 
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

This looks pretty good, but it would be nice to get that presentation logic out of the controller action, and encapsulate it into an error serializer that could be used in multiple controller actions. The jsonapi serializer gem doesn't do a good job of creating an error serializer for us, so we will handroll one. We can pass as arguments the exception we catch in our rescue block, as well as the status code we'd like to send in that JSON response.

```ruby
class ErrorSerializer
  def self.format_error(exception, status)
    {
      errors: [
        {
          status: status.status_code,
          title: exception.message
        }
      ]
    }

  end
end
```

Now our method will look like this:

```ruby
def show
  begin
    render json: SongSerializer.new(Song.find(params[:id]))
  rescue ActiveRecord::RecordNotFound => exception
    render json: ErrorSerializer(exception, "404"), status: :not_found
  end
end
```

This is awesome, but what if we want to rescue from the `ActiveRecord::RecordNotFound` exception in other controller actions? Adding a `rescue` block to every action that uses `Song.find(params[:id])` isn't very DRY.

That's where the Rails `rescue_from` syntax comes in! `rescue_from` behaves as a Rails filter that creates a rescue for each action in this controller. 

```ruby
class Api::V1::SongsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  ...
end
```

`:not_found_response` will direct Rails to invoke a method of the same name whenever `ActiveRecord::RecordNotFound` is raised. The Exeception will auto-magically be passed, so we need to define this method and make sure it accepts an argument.

```ruby
class Api::V1::SongsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response

  ...

  def show
    render json: SongSerializer.new(Song.find(params[:id])) 
  end

  ...

  def update
    song = Song.find(params[:id])
    song.update(Song_params)
    render json: SongSerializer.new(song)
  end
  
  def destroy
    song = Song.find(params[:id])
    song.destroy
    render json: SongSerializer.new(song)
  end

  private
 
  def not_found_response(exception)
    render json: ErrorSerializer.new(exception.message, "404"), status: :not_found
  end
end
```

This is much better, because now our `update` and `destroy` actions will handle that exception the same way. The `show` action goes back to one line, just how it was before we started this process.

We can keep our code _even more DRY_ by rescuing from a given exception across all controllers. Try it out by moving this `rescue_from` and `not_found_response` method to the ApplicationController!

### Thinking About Patterns

Take a few minutes on your own to answer the following questions:

* What do you like about this approach?
* What do you not like about this approach?
* How could you use `rescue` in conjunction with ActiveRecord validations?

### Resources

* [Rebased on API error handling](https://blog.rebased.pl/2016/11/07/api-error-handling.html)
* [Stackify on rescuing exceptions in ruby](https://stackify.com/rescue-exceptions-ruby/)
* [Geeks for Geeks on hanling exceptions in ruby](https://www.geeksforgeeks.org/ruby-exception-handling/)

