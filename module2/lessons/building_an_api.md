---
title: Intro to Building an API in Rails
length: 120
layout: page
---

# Building an API

## Setup
We will be using a repo called [Set List](https://github.com/turingschool-examples/set-list-api/tree/songs-index-complete) for this lesson. Please clone this repo and checkout the `songs-index-complete` branch.

## Warmup

- What is an API in the context of web development?
- Why might we decide to expose information in a database we control through an API?
- What do we need to test in an API?
- What is REST and why do we need it?

## Background: Versioned APIs

In software (and probably other areas in life) you’re never going to know less about a problem than you do right now. Procrastination and being resolved to solve only immediate problems can be an effective strategy while writing software. Our assumptions are often wrong and we need to change what we build.

When building APIs, we don’t always know exactly how they will be used. Because of this, we should aim to build with the assumption that things will need to change.

Imagine we are serving up an API that several other companies and developers are using. Let’s think through a simple example. Let’s say we have an API endpoint of `GET /api/songs/1` that returns a JSON response that includes an `id`, `title`, length, and `play_count`. Now imagine that at a later date we no longer want to provide `play_count` and instead want to replace it with a new attribute called `popularity`. What happens to all of our consumers that were dependent on `play_count`?

We can provide a better experience for our clients (other developers) by versioning our API. Instead of our endpoint being `GET /api/songs/1` we can add an extra segment to our URL with a version number. Something like `GET /api/v1/songs/1`. If we ever want to change our API in the future we can simply change the segment to represent the new API `GET /api/v2/songs/1`. The big advantage here is we can have both endpoints served simultaneously to allow our clients to transition their code bases to use the newest version. Usually the intent is to shutdown the initial API since maintaining multiple versions can be a drain on resources. Most companies will provide a date that the deprecated API will be shutdown.

We’ll be building a versioned API in this tutorial.

## Exploring an API
<!-- TODO: Describe walking through the completes songs index endpoint; talk about the pieces, what they are all doing. Then we'll move into testing it. -->

## Test Setup

Now that we've had an intro to what a completed endpoint looks like, let's test it! From here on out, we'll want to practice TDD when creating new endpoints.

### RSpec

Let's add `gem "rspec-rails"` to your :development, :test block in your Gemfile, along with `gem "pry"`.

```bash
$ bundle
$ rails g rspec:install
```

<section class="call-to-action">
#### Think Break

Why did we add these two gems to the `:development, :test` blocks?

What did the `rails g rspec:install` command do for us?

</section>

By default, the Rails 7 test environment renders exception templates for rescuable exceptions. You can find this configuration in `config/environments/test.rb`:

```ruby
# Render exception templates for rescuable exceptions and raise for other exceptions.
  config.action_dispatch.show_exceptions = :rescuable
```

Since we want the raised exception to print to our terminal in the case of failing tests, change this line to the following:

```ruby
  config.action_dispatch.show_exceptions = :none
```

The wording here is a bit misleading, but don't worry. This change makes it so that RSpec will show us any raised exceptions instead of trying to render an HTML document for the ones that are rescuable.

### Creating Our First Test

Now that our configuration is set up, we can start testing our code. First, let's set up the test file. We need to create the structure of the test folders ourselves. Even though we are going to be creating controller files for our api, users are going to be sending HTTP requests to our app. For this reason, we are going to call these specs `requests` instead of `controller specs`. Let's create our folder structure.

<section class="call-to-action">
#### Did You Know

Controller specs used to be common in Rails apps. If you get a job working in an older version of Rails, you may see Controller specs! The Rails community has largely moved toward Request specs and is how new apps are typically developed these days.

</section>

```bash
$ mkdir -p spec/requests/api/v1
$ touch spec/requests/api/v1/songs_request_spec.rb
```

Note that we are namespacing under `/api/v1`. This is how we namespaced our controller, so we want to do the same in our tests.

On the first line of our test, we want to set up our data. We then want to make the request that a user would be making. We want a `get` request to `api/v1/songs` and we would like to get json back. At the end of the test we want to assert that the response was a success.

*spec/requests/api/v1/songs_request_spec.rb*

```ruby
require 'rails_helper'

describe "Songs API" do
  it "sends a list of songs" do
    Song.create(title: "Wrecking Ball", length: 220, play_count: 3)
    Song.create(title: "Bad Romance", length: 295, play_count: 5)
    Song.create(title: "Shake It Off", length: 219, play_count: 2)

    get '/api/v1/songs'

    expect(response).to be_successful
  end
end
```
Let's run our test. It should pass! Yay! But... it doesn't tell us a whole lot. All we know that the request was successful. We aren't checking anything about the data that was returned or even if any was returned at all.

<section class="call-to-action">
#### Think Break

Any status code in the 2xx series (200, 201, 202, etc.) is considered successful. Each code means something a little bit different. Most of the time we'll use one of the following 2xx codes:
- 200: OK
- 201: Created
- 204: No Content

This is so common, in fact, that in many scenarios, Rails will handle choosing the status code automatically. In coming weeks we'll learn how to return specific status codes of our choosing.
</section>

Let's make our test a little more thorough. To start, add the following to your spec file:

*spec/requests/api/v1/songs_request_spec.rb*

```ruby
require 'rails_helper'

describe "Songs API" do
  it "sends a list of songs" do
    Song.create(title: "Wrecking Ball", length: 220, play_count: 3)
    Song.create(title: "Bad Romance", length: 295, play_count: 5)
    Song.create(title: "Shake It Off", length: 219, play_count: 2)

    get '/api/v1/songs'

    expect(response).to be_successful

    songs = JSON.parse(response.body, symbolize_names: true)
  end
end
```

Let's take a closer look at the response. Put a pry on line eight in the test, right below where we make the request.

If you just type `response` you can take a look at the entire response object. We care about the response body. If you enter `response.body` you can see the data that is returned from the endpoint.

The data we got back is json, and we need to parse it to get a Ruby object. Try entering  `JSON.parse(response.body)`. As you see, the data looks a lot more like Ruby after we parse it. Now that we have a Ruby object, we can make assertions about it.

*spec/requests/api/v1/songs.rb*

```ruby
require 'rails_helper'

describe "Songs API" do
  it "sends a list of songs" do
    Song.create(title: "Wrecking Ball", length: 220, play_count: 3)
    Song.create(title: "Bad Romance", length: 295, play_count: 5)
    Song.create(title: "Shake It Off", length: 219, play_count: 2)

    get '/api/v1/songs'

    expect(response).to be_successful

    songs = JSON.parse(response.body, symbolize_names: true)

    expect(songs.count).to eq(3)

    songs.each do |song|
      expect(song).to have_key(:id)
      expect(song[:id]).to be_an(Integer)

      expect(song).to have_key(:title)
      expect(song[:title]).to be_a(String)

      expect(song).to have_key(:length)
      expect(song[:length]).to be_a(Integer)

      expect(song).to have_key(:play_count)
      expect(song[:play_count]).to be_a(Integer)
    end
  end
end
```

Run your tests again and they should still be passing.****

<section class="call-to-action">
#### Think Break

What is this block doing for us?
```ruby
  songs.each do |song|
    expect...
  end
```
</section>

### SongsController#show

Now we are going to test drive the `/api/v1/songs/:id` endpoint. From the `show` action, we want to return a single song.

First, let's add a test to our existing test file. As you can see, we have added a key `id` in the request:

*spec/requests/api/v1/songs_request_spec.rb*

```ruby
it "can get one song by its id" do
  id = Song.create(title: "Wrecking Ball", length: 220, play_count: 3).id

  get "/api/v1/songs/#{id}"

  song = JSON.parse(response.body, symbolize_names: true)

  expect(response).to be_successful

  expect(song).to have_key(:id)
  expect(song[:id]).to be_an(Integer)

  expect(song).to have_key(:title)
  expect(song[:title]).to be_a(String)

  expect(song).to have_key(:length)
  expect(song[:length]).to be_a(Integer)

  expect(song).to have_key(:play_count)
  expect(song[:play_count]).to be_a(Integer)
end
```

## Try to test drive the implementation before looking at the code below!

Run the tests and the first error we get is:

```bash
1) Songs API can get one song by its id
     Failure/Error: get "/api/v1/songs/#{id}"

     ActionController::RoutingError:
       No route matches [GET] "/api/v1/songs/31"
     # ./spec/requests/api/v1/songs_request_spec.rb:39:in `block (2 levels) in <main>'
```

Let’s update our routes:

*config/routes.rb*

```ruby
Rails.application.routes.draw do
  get "/api/v1/songs", to: "api/v1/songs#index"
  get "/api/v1/songs/:id", to: "api/v1/songs#show"
end
```

Let’s run our tests and:

```bash
1) Songs API can get one song by its id
     Failure/Error: get "/api/v1/songs/#{id}"

     AbstractController::ActionNotFound:
       The action 'show' could not be found for Api::V1::SongsController
     # ./spec/requests/api/v1/songs_request_spec.rb:39:in `block (2 levels) in <main>'
```

So right now we should add our action and then declare what data should be returned from the endpoint:

*app/controllers/api/v1/songs_controller.rb*

```ruby
class Api::V1::SongsController < ApplicationController
  def index
    render json: Song.all
  end

  def show
    render json: Song.find(params[:id])
  end
end
```

Run the tests and we should have two passing tests.

### SongsController#create

Let's start with adding the test to our test file. Since we are creating a new song, we need to pass data for the new song via the HTTP request. We can do this easily by adding the params as a key-value pair. Also note that we swapped out the `get` in the request for a `post` since we are creating data.

Also note that we aren't parsing the response to access the last song we created, we can simply query for the last Song record created.

*spec/requests/api/v1/songs_request_spec.rb*

```ruby
it "can create a new song" do
  song_params = {
                  title: "Wrecking Ball",
                  length: 220,
                  play_count: 3
  }
  headers = { "CONTENT_TYPE" => "application/json" }
  # We include this header to make sure that these params are passed as JSON rather than as plain text

  post "/api/v1/songs", headers: headers, params: JSON.generate(song: song_params)
  created_song = Song.last

  expect(response).to be_successful
  expect(created_song.title).to eq(song_params[:title])
  expect(created_song.length).to eq(song_params[:length])
  expect(created_song.play_count).to eq(song_params[:play_count])
end
```

Run the test and you should get:

```ruby
1) Songs API can create a new song
     Failure/Error: post "/api/v1/songs", headers: headers, params: JSON.generate(song: song_params)

     ActionController::RoutingError:
       No route matches [POST] "/api/v1/songs"
     # ./spec/requests/api/v1/songs_request_spec.rb:75:in `block (2 levels) in <main>'
```

We have been to this rodeo before. Let’s add a route and an action:

*config/routes.rb*

```ruby
get "/api/v1/songs", to: "api/v1/songs#index"
get "/api/v1/songs/:id", to: "api/v1/songs#show"
post "/api/v1/songs", to: "api/v1/songs#create"
```

*app/controllers/api/v1/songs_controller.rb*

```ruby
def create
end
```

We run the tests and we’re going to get an error.

```ruby
1) Songs API can create a new song
     Failure/Error: expect(created_song.title).to eq(song_params[:title])

     NoMethodError:
       undefined method `title' for nil:NilClass

           expect(created_song.title).to eq(song_params[:title])

# ./spec/requests/api/v1/songs_request_spec.rb:79:in `block (2 levels) in <main>'
```

This occurs because we aren’t actually creating anything yet.

We are going to create an song with the incoming params. Let's take advantage of all the niceties Rails gives us and use strong params.

*app/controllers/api/v1/songs_controller.rb*

```ruby
def create
  render json: Song.create(song_params)
end

private

  def song_params
    params.require(:song).permit(:title, :length, :play_count )
  end
```

<section class="call-to-action">
#### Think Break

But wait, what are strong params?

In Rails, "strong parameters" is a feature used to help prevent mass-assignment vulnerabilities by requiring explicit allowance of the parameters that can be used in a controller.

Per the docs, using a private method to encapsulate the permissible parameters is a good pattern since you'll be able to reuse the same permit list between create and update.

You can [read more about strong params](https://api.rubyonrails.org/v7.1.3.4/classes/ActionController/StrongParameters.html) in the Rails docs.

</section>


We should now have three passing tests.

### SongsController#Update

Like before, let's add a test.

This test looks very similar to the previous one we wrote. Note that we aren't making assertions about the response, instead we are accessing the song we updated from the database to make sure it actually updated the record.

*spec/requests/api/v1/songs_request_spec.rb*

```ruby
it "can update an existing song" do
  id = Song.create(title: "Shake It Off", length: 219, play_count: 2).id
  previous_name = Song.last.title
  song_params = { title: "Shake It Off (Taylor's Version)" }
  headers = {"CONTENT_TYPE" => "application/json"}
  # We include this header to make sure that these params are passed as JSON rather than as plain text
  
  patch "/api/v1/songs/#{id}", headers: headers, params: JSON.generate({song: song_params})
  song = Song.find_by(id: id)

  expect(response).to be_successful
  expect(song.title).to_not eq(previous_name)
  expect(song.title).to eq("Shake It Off (Taylor's Version)")
end
```

<section class="call-to-action">
  We're using a `PATCH` in our test. What is the difference between a `PATCH` and a `PUT`?
</section>

### Try to test drive the implementation before you look at the code below.

*config/routes.rb*

```ruby
get "/api/v1/songs", to: "api/v1/songs#index"
get "/api/v1/songs/:id", to: "api/v1/songs#show"
post "/api/v1/songs", to: "api/v1/songs#create"
patch "/api/v1/songs/:id", to: "api/v1/songs#update"
```

*app/controllers/api/v1/songs_controller.rb*

```ruby
def update
  render json: Song.update(params[:id], song_params)
end
```

### SongsController#Destroy

Last one. Finally.

In this test, the last line in this test is refuting the existence of the song we created at the top of this test.

*spec/requests/api/v1/songs_request_spec.rb*

```ruby
it "can destroy an song" do
  song = Song.create(title: "Wrecking Ball", length: 220, play_count: 3)

  expect(Song.count).to eq(1)

  delete "/api/v1/songs/#{song.id}"

  expect(response).to be_successful
  expect(Song.count).to eq(0)
  expect{ Song.find(song.id) }.to raise_error(ActiveRecord::RecordNotFound)
end
```

Alternatively, we can also use RSpec's [expect change](https://rubydoc.info/gems/rspec-expectations/RSpec%2FMatchers:change) method as an extra check. In our case, `change` will check that the numeric difference of `Song.count` before and after the block is run is `-1`.

*spec/requests/api/v1/songs_request_spec.rb*

```ruby
it "can destroy an song" do
  song = create(:song)

  expect{ delete "/api/v1/songs/#{song.id}" }.to change(Song, :count).by(-1)

  expect{ Song.find(song.id) }.to raise_error(ActiveRecord::RecordNotFound)
end
```

Let’s make the test pass.

*config/routes.rb*

```ruby
get "/api/v1/songs", to: "api/v1/songs#index"
get "/api/v1/songs/:id", to: "api/v1/songs#show"
post "/api/v1/songs", to: "api/v1/songs#create"
patch "/api/v1/songs/:id", to: "api/v1/songs#update"
delete "/api/v1/songs/:id", to: "api/v1/songs#destroy"
```

*app/controllers/api/v1/songs_controller.rb*

```ruby
def destroy
  render json: Song.delete(params[:id])
end
```

Congratulations - you have done the thing. 

### One Step Further

At the beginning of this exercise we discussed the importance of versioning. So let's implement a v2 route for our songs index that will return song `popularity` and not `play_count`.

Let's begin by making a test. We will need to create a new `v2` directory to hold our `songs_request_spec`.

```bash
$ mkdir -p spec/requests/api/v2
$ touch spec/requests/api/v2/songs_request_spec.rb
```

And let’s add a test.

*spec/requests/api/v2/songs_request_spec.rb*

```ruby
require 'rails_helper'

describe "Songs API" do
  it "sends a list of songs" do
    Song.create(title: "Wrecking Ball", length: 220, play_count: 3)
    Song.create(title: "Bad Romance", length: 295, play_count: 5)
    Song.create(title: "Shake It Off", length: 219, play_count: 2)

    get '/api/v2/songs'

    expect(response).to be_successful

    songs = JSON.parse(response.body, symbolize_names: true)

    expect(songs.count).to eq(3)

    songs.each do |song|
      expect(song).to have_key(:id)
      expect(song[:id]).to be_an(Integer)

      expect(song).to have_key(:title)
      expect(song[:title]).to be_a(String)

      expect(song).to have_key(:length)
      expect(song[:length]).to be_a(Integer)

      expect(song).to have_key(:popularity)
      expect(song[:popularity]).to be_an(String)

      expect(song).to_not have_key(:play_count)
    end
  end
end
```

And when we run our tests, we should see an error involving a missing route.

```bash
1) Songs API sends a list of songs
     Failure/Error: get '/api/v2/songs'

     ActionController::RoutingError:
       No route matches [GET] "/api/v2/songs"
     # ./spec/requests/api/v2/songs_request_spec.rb:7:in `block (2 levels) in <main>'
```

So lets make ourselves an appropriate route:

*config/routes.rb*

```ruby
Rails.application.routes.draw do
  get "/api/v1/songs", to: "api/v1/songs#index"
  get "/api/v1/songs/:id", to: "api/v1/songs#show"
  post "/api/v1/songs", to: "api/v1/songs#create"
  patch "/api/v1/songs/:id", to: "api/v1/songs#update"
  delete "/api/v1/songs/:id", to: "api/v1/songs#destroy"

  get "/api/v2/songs", to: "api/v2/songs#index"
end
```

Running our tests, we should get a new error:

```bash
1) Songs API sends a list of songs
     Failure/Error: get '/api/v2/songs'

     ActionController::RoutingError:
       uninitialized constant Api::V2

             Object.const_get(camel_cased_word)
                   ^^^^^^^^^^

                   raise MissingController.new(error.message, error.name)
                   ^^^^^
     # ./spec/requests/api/v2/songs_request_spec.rb:7:in `block (2 levels) in <main>'
     # ------------------
     # --- Caused by: ---
     # NameError:
     #   uninitialized constant Api::V2
     #
     #         Object.const_get(camel_cased_word)
     #               ^^^^^^^^^^
     #   ./spec/requests/api/v2/songs_request_spec.rb:7:in `block (2 levels) in <main>'
```

This error is telling us that we are missing a v2 directory in the api folder within app/controllers. Add a new `v2`
 directory and `songs_controller.rb`
 file.

```bash
$ mkdir -p app/controllers/api/v2
$ touch app/controllers/api/v2/songs_controller.rb
```

And we also have to add something to the controller, I suppose.

*app/controllers/api/v2/songs_controller.rb*

```ruby
class Api::V2::SongsController < ApplicationController
  def index
  end
end
```

If we run our tests now, we will get a JSON error because we aren’t actually returning anything.

```bash
1) Songs API sends a list of songs
     Failure/Error: songs = JSON.parse(response.body, symbolize_names: true)

     JSON::ParserError:
       859: unexpected token at ''
     # ./spec/requests/api/v2/songs_request_spec.rb:11:in `block (2 levels) in <main>'
```

Let’s fix it.

*app/controllers/api/v2/songs_controller.rb*

```ruby
class Api::V2::SongsController < ApplicationController
  def index
    render json: Song.all
  end
end
```

We get past the error we were getting before, but it’s erroring out on the fact that we don’t yet have a popularity attribute.

```bash
  1) Songs API sends a list of songs
     Failure/Error: expect(song).to have_key(:popularity)
       expected `{:created_at=>"2024-07-19T03:20:36.597Z", :id=>124, :length=>220, :play_count=>3, :title=>"Wrecking Ball", :updated_at=>"2024-07-19T03:20:36.597Z"}.has_key?(:popularity)` to be truthy, got false
     # ./spec/requests/api/v2/songs_request_spec.rb:27:in `block (3 levels) in <main>'
     # ./spec/requests/api/v2/songs_request_spec.rb:17:in `each'
     # ./spec/requests/api/v2/songs_request_spec.rb:17:in `block (2 levels) in <main>'
```

We are going to create a migration to add it to our songs table.

```bash
rails g migration AddPopularityToSongs popularity:string
```

Run the migration.

We need a way to calculate popularity so we are going to use a callback on our model. Check out the [rails docs](https://guides.rubyonrails.org/active_record_callbacks.html) to learn more about callbacks.

*app/models/song.rb*

```ruby
class Song < ApplicationRecord
before_save { |song| song.popularity = calculate_popularity }

private
  def calculate_popularity
    if play_count > 5
      'high'
    else
      'low'
    end
  end
end
```

Awesome! Now we have our popularity attribute. Before we celebrate too early though, we still have a failing test because we are returning the `play_count`. We need to customize our response a little bit more. For us to accomplish this, we are going to use something called a Serializer.

```bash
$ mkdir -p app/serializers
$ touch app/serializers/song_serializer.rb
```

*app/serializers/song_serializer.rb*

```ruby
class SongSerializer
  def self.format_songs(songs)
    songs.map do |song|
      {
        id: song.id,
        title: song.title,
        length: song.length,
        popularity: song.popularity
      }
    end
  end
end
```

Now that we have a serializer that formats our songs for our json response we can use it in our controller.

*app/controllers/api/v2/songs_controller.rb*

```ruby
class Api::V2::SongsController < ApplicationController
  def index
    songs = Song.all
    render json: SongSerializer.format_songs(songs)
  end
end
```

Run our tests again and we should have a passing test! If you are still curious about serializers look ahead to the serializers lesson and do a little research.

## Supporting Materials
- [Building an Internal API Short Tutorial](https://vimeo.com/185342639)

You can find a repo of this exercise completed in its entirety [here](https://github.com/turingschool-examples/building_internal_apis_7).
