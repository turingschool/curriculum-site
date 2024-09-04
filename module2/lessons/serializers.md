---
title: Serializers - Customizing JSON in your API
length: 90
tags: json, javascript, rails, ruby, api
---
# Serializers: Customizing JSON in Your API

## Learning Goals

- Articulate what a serializer is and how to create one in a Rails application.
- Understand the purpose of serializers and how they support OOP Principles
- Understand what constitutes presentation logic in the context of serving a JSON API and why formatting in the model is not the right place

## Warmup

On your own, research serializers. In your notebook, write down the answers to these questions:

- What do serializers allow us to do?
- What resources were you able to find? Which seem most promising?
- What search terms did you use that gave the best results?

## Serializers

Serializers allow us to mold the data we are returning from our API in an object-oriented fashion. They allow us to present to whomever is consuming our API what we want them to see.

When we call `render json:`, Rails makes a call to `as_json` under the hood unless we have a serializer set up. Eventually, `as_json` calls `to_json` and our response is generated.

With how we've used `render json:` up til now, all data related with the resources in our database is sent back to the client as-is.

Let's imagine that you don't just want the raw guts of your model converted to JSON and sent out to the user -- maybe you want to customize what you send back.

## Reviewing JSON

What do you already know about JSON?

JSON stands for *JavaScript Object Notation*. It's a way to organize and store data that is easy for both people and computers to understand. JSON is commonly used when sending data from a server to a web page. It's the format we use for our API responses.

Here is an example of some JSON representing a user profile:

```json
{
  "name": "Jane Doe",
  "age": 28,
  "email": "jane.doe@example.com",
  "isMember": true,
  "favorites": {
    "color": "blue",
    "food": "pizza"
  },
  "hobbies": ["reading", "swimming", "coding"]
}
```

In what ways does this feel similar to nested collections?

## Specifications for JSON Response

Let's use the [json:api](https://jsonapi.org/) specification for our JSON responses. Take a minute to familiarize yourself with the documentation.

- What is the root `key`?
- How are the attributes formatted for a resource in a response?
- How are a resource's relationships formatted?

## Exercise

### Adding to our Existing Project

You may have created a repo to code-along with from the [Building an API in Rails](https://curriculum.turing.edu/module2/lessons/building_an_api)
 lesson. Feel free to use the repository that you created. Otherwise, you can clone [this](https://github.com/turingschool-examples/set-list-api))
 repo, and use the `songs-crud-complete` branch. Below are instructions for getting started with this repo.

```bash
$ bundle
```

```bash
$ bundle exec rails db:{drop,create,migrate,seed}
```

You should then be able to access the databases called `set_list_development` and `set_list_test` and have some seed data.

You can confirm this worked by opening your rails console and taking a look at the contents of your development database.

Start up your server using `rails server` and you're ready to go!

## Responses

Use Postman to view the current responses that your API is providing to the routes listed below:

- api/v1/songs
- api/v1/songs/:id

So we have our responses from our server, but it doesn't adhere to JSON API 1.0 specification. It also has this `created_at` and `updated_at` stuff which we don’t want. So what do we do? We need to use a serializer.

## Customizing JSON

This is some practice time for you. 

1. Create a serializer for `Song` and build out a hash that will look like the following *WITHOUT THE USE OF A GEM.* (You only need to do this for the show endpoint)

```ruby
{
  "data": {
    "id": "1",
    "type": "song",
    "attributes": {
      "title": "Legend Has It",
      "length": 2301
    }
  }
}
```

That was a pain in the butt, wasn’t it? Creating serializers by hand that follow JSON API 1.0 specification for everything we want to make an API for can certainly be time consuming. There are better ways.

## Using the jsonapi-serializer gem

You can view the docs on the jsonapi-serializer gem [here](https://github.com/jsonapi-serializer/jsonapi-serializer#installation).

Add it to your Gemfile

```ruby
gem "jsonapi-serializer"
```

And go ahead and

```bash
$ bundle install
```

This gem gives us a built in generator to make ourselves all of the serializers we could possibly want.

```bash
$ rails g serializer Song title
```

We can take a look and see what’s inside it.

*app/serializers/store_serializer.rb*

```ruby
class SongSerializer
  include JSONAPI::Serializer
  attributes :title
end
```

Now that we have our serializer, we need to edit our controller to use said serializer.

*app/controllers/api/v1/songs_controller.rb*

```ruby
class Api::V1::SongsController < ApplicationController
  def index
    render json: SongSerializer.new(Song.all)
  end

  def show
    render json: SongSerializer.new(Song.find(params[:id]))
  end
end
```

We can see that instead of just letting our ActiveRecord be rendered in JSON, we are going to take our collections, and send them to the serializer, and have the result of THAT be converted to JSON.

We can also make use of methods in our `Song` model and then set it as an attribute in our serializer.

Let's return the average plays per day for each song.

*app/models/song.rb*

Add the following method into your song class.

```ruby
def average_plays_per_day
  if created_at.nil? || play_count.nil? || play_count == 0
    return 0
  end

  days_since_creation = ((Time.now - created_at) / 1.day).ceil
  
  play_count / days_since_creation
end
```

Then in your serializer you can make use of that method by adding that attribute

*app/serializers/store_serializer.rb*

```ruby
class StoreSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :length, :play_count, :average_plays_per_day
end
```
 
Completed version of this lesson to this point is available [here](https://github.com/turingschool-examples/set-list-api/tree/serializers-complete).

## Extra Practice

Update your `Song` serializer to return different fields and check out the results in Postman.

Then update your model and serializer to also return `length_in_minutes`.

## Additional Resources

- [Jbuilder](https://github.com/rails/jbuilder)
- [fast_jsonapi](https://github.com/Netflix/fast_jsonapi)
- [Nested Includes with fast_jsonapi](https://github.com/Netflix/fast_jsonapi/pull/152)
