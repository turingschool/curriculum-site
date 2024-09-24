---
title: "Authorization"
length: 3 hours
module: 3
---

## Pre-Work

Make sure you have read about [Authentication, Authorization, and Sessions](./authentication_and_authorization) _before_ you start this lesson!


<section class="call-to-action">
## Warmup
In small groups, discussi the following:
* What is the difference between Authentication and Authorization?
* Describe the user flow that you experienced when signing up for an API key with pexels.com
    * How do you retrieve your API key?
    * How does pexels know which API key to show you?
</section>

In your homework, you learned the difference between Authentication and Authorization.  In this lesson, we will implement both in a Rails API so that we can control who has access to specific endpoints.

## Learning Goals
* Implement token-based authentication in an API
* Deepen our understanding of authentication and authorization

## User Registration

In order to control what actions are allowed in our API, we will need to have some way of identifying who is trying to access our application, and what information or actions they should have access to.

We will be using user-specific authentication tokens to manage this process; which means, we will need users in our application!

<section class='call-to-action'>

**Code Exploration in Small Groups**

Checkout the `auth-starter` branch from the [SetListAPI repo](https://github.com/turingschool-examples/set-list-api/tree/auth-starter), and explore the code by answering the following questions:
* What new tables do you see in our scheme?
* How does a user get an authentication token?
* How do we ensure that a user is never created without an authentication token?
* Do we store user's passwords in our database?
    * for this question, you might want to explore the [bcrypt](https://github.com/bcrypt-ruby/bcrypt-ruby) docs!

</section>

## Token Generation

In the past, you have used athentication tokens in your API requests to places like [pexels.com](https://www.pexels.com/api/key/) (though they use the term 'key').  Now, we are going to update our API to require a token to gain access to our data.

We are using ruby's [SecureRandom](https://ruby-doc.org/stdlib-3.1.1/libdoc/securerandom/rdoc/SecureRandom.html) module to generate individual authentication tokens that are tied to specific users.  This is not the *only* way to generate authentication tokens - can you imagine a few other ways that we might generate tokens?

<section class='dropdown'>
### 3 common strategies

**Randomly Generated Token (UUID or Secure Random)**
How it works: A random string is generated using libraries like SecureRandom in Ruby or generating a UUID (Universally Unique Identifier). These tokens are unique, hard to guess, and often stored in the database associated with the user.

Example in Ruby:
```ruby
token = SecureRandom.hex(20)
```

Advantages:
* Simple to implement.
* Tokens are unique and can have a long enough length to ensure security.
Drawbacks:
* Tokens don’t expire unless explicitly set to do so.
* If a token is compromised, it remains valid until revoked manually or through the system.

**JWT (JSON Web Tokens)**
How it works: JWTs are a compact, URL-safe token that consist of three parts: a header, payload, and signature. The payload contains the user data (claims) and the signature ensures the integrity of the token. JWTs can be signed with a secret key (HS256) or a public/private key pair (RS256).
Example in Ruby (using jwt gem):

```ruby
payload = { user_id: user.id, exp: (Time.now + 1.day).to_i }
token = JWT.encode(payload, 'secret_key', 'HS256')
```

Advantages:
* Stateless authentication (no need to store tokens in the database).
* Built-in support for expiration (exp claim) and can carry user data.
* Easily decodable for quick verification of claims.
Drawbacks:
* If not handled securely, the payload can be tampered with (though the signature protects this).
* Cannot be revoked easily since tokens are not stored in the database.

**OAuth Access Tokens**
How it works: OAuth is an open-standard authorization framework that issues access tokens. The client receives a token after authenticating, which is then used to access API endpoints. Access tokens are usually short-lived, with a refresh token issued to extend access.

Example: In Rails, you could implement this using libraries like Doorkeeper to handle OAuth token generation and expiration.

Advantages:
* Token expiration and refresh mechanisms are built-in.
* Secure for third-party access delegation.
* Standardized and well-supported in libraries.
Drawbacks:
* More complex to set up than random tokens or JWTs.
* Tokens can expire frequently, requiring refresh logic.
* Each strategy has different use cases, with random tokens being simple but less flexible, JWTs offering stateless and efficient token handling, and OAuth providing a comprehensive authorization framework, especially for third-party integrations.

</section>

## User Roles

Let's use TDD to drive the implementation of authenticating api requests, and controlling for specific user-roles.  By the end of this lesson, our application will adhere to the following user-stories:

```
As an visitor
When I make an api request (without an auth token)
Then I am directed to register as a user
```

```
As a registered user
When I make an api request (with my auth token) to
  GET "/api/v1/songs"
Then I see a json response will all songs
```

```
As a registered user
When I make an api request (with my auth token) to
  GET "/api/v1/songs/1"
Then I see a json response with 1 song
```

```
As a registered user
When I make an api request (with my auth token) to
  POST "/api/v1/songs/"
Then I see a json response with a 405 status
```

```
As an admin user
When I make an api request (with my auth token) to
  POST "/api/v1/songs/" {'title':'Happy', 'length':'325', 'play_count':'3'}
Then I see a json response with my created song
  And the song is saved in the database
```

Update the `spec/requests/v1/songs_requests_spec.rb` to test for authenticated users; you may copy/paste these tests to replace the existing tests.

<section class='dropdown'>

### Authorization Tests

```ruby
require 'rails_helper'

describe "Songs API" do
  describe "as a visitor, require user registration for" do
    before (:each) do
      Song.create(title: "Wrecking Ball", length: 220, play_count: 3)
      Song.create(title: "Bad Romance", length: 295, play_count: 5)
      Song.create(title: "Shake It Off", length: 219, play_count: 2)
    end

    it "songs index" do
      get '/api/v1/songs'

      body = JSON.parse(response.body, symbolize_names:true)

      expect(response).to_not be_successful
      expect(body[:error]).to eq("Unathorized, please register as a user")
    end

    it "songs show" do
      get '/api/v1/songs/1'

      body = JSON.parse(response.body, symbolize_names:true)

      expect(response).to_not be_successful
      expect(body[:error]).to eq("Unathorized, please register as a user")
    end

    it "songs create" do
      song_params = {
        title: "Wrecking Ball",
        length: 220,
        play_count: 3
      }
      headers = { "CONTENT_TYPE" => "application/json" }

      post "/api/v1/songs", headers: headers, params: JSON.generate(song: song_params)

      body = JSON.parse(response.body, symbolize_names:true)

      expect(response).to_not be_successful
      expect(body[:error]).to eq("Unathorized, please register as a user")
    end

    it "songs update" do
      id = Song.create(title: "Shake It Off", length: 219, play_count: 2).id
      previous_name = Song.last.title
      song_params = { title: "Shake It Off (Taylor's Version)" }
      headers = {"CONTENT_TYPE" => "application/json"}
  
      patch "/api/v1/songs/#{id}", headers: headers, params: JSON.generate({song: song_params})
      body = JSON.parse(response.body, symbolize_names:true)

      expect(response).to_not be_successful
      expect(body[:error]).to eq("Unathorized, please register as a user")
    end

    it "songs delete" do
      song = Song.create(title: "Wrecking Ball", length: 220, play_count: 3)

      expect(Song.count).to eq(4)
  
      delete "/api/v1/songs/#{song.id}"

      body = JSON.parse(response.body, symbolize_names:true)

      expect(response).to_not be_successful
      expect(body[:error]).to eq("Unathorized, please register as a user")
    end

  end

  describe "As a registered user with default role" do
    before(:each) do
      Song.create(title: "Wrecking Ball", length: 220, play_count: 3)
      Song.create(title: "Bad Romance", length: 295, play_count: 5)
      Song.create(title: "Shake It Off", length: 219, play_count: 2)
      @default_user = User.create!(email: "default@example.com", password: "test123")
    end

    it "sends a list of songs" do
      headers = { "Authorization" => @default_user.api_token }
      get '/api/v1/songs', headers: headers

      expect(response).to be_successful
  
      songs = JSON.parse(response.body, symbolize_names: true)
  
      expect(songs.count).to eq(3)
  
      songs.each do |song|
        expect(song[:id]).to be_an(Integer)
        expect(song[:title]).to be_a(String)
        expect(song[:length]).to be_a(Integer)
        expect(song[:play_count]).to be_a(Integer)
      end
    end

    it "sends a single song" do
      db_song = Song.first
      headers = { "Authorization" => @default_user.api_token }
      get "/api/v1/songs/#{db_song.id}", headers: headers
      
      response_song = JSON.parse(response.body, symbolize_names: true)

      expect(response).to be_successful
  
      expect(response_song[:id]).to eq(db_song.id)
      expect(response_song[:title]).to eq(db_song.title)
      expect(response_song[:length]).to eq(db_song.length)
      expect(response_song[:play_count]).to eq(db_song.play_count)
    end

    it "does not allow new song creation" do
      song_params = {
        title: "Wrecking Ball",
        length: 220,
        play_count: 3
      }
      headers = { "Authorization" => @default_user.api_token, "CONTENT_TYPE" => "application/json" }

      post "/api/v1/songs", headers: headers, params: JSON.generate(song: song_params)

      expect(response.status).to eq(405)
      # expect a Method Not Allowed status
    end
  end

  describe "As a registered user with default role" do
    before(:each) do
      Song.create(title: "Wrecking Ball", length: 220, play_count: 3)
      Song.create(title: "Bad Romance", length: 295, play_count: 5)
      Song.create(title: "Shake It Off", length: 219, play_count: 2)
      @admin_user = User.create!(email: "default@example.com", password: "test123", role: 1)
    end

    it "allows new song creation" do
      song_params = {
        title: "Wrecking Ball",
        length: 220,
        play_count: 3
      }
      headers = { "Authorization" => @admin_user.api_token, "CONTENT_TYPE" => "application/json" }

      post "/api/v1/songs", headers: headers, params: JSON.generate(song: song_params)

      created_song = Song.last

      expect(response).to be_successful
      expect(created_song.title).to eq(song_params[:title])
      expect(created_song.length).to eq(song_params[:length])
      expect(created_song.play_count).to eq(song_params[:play_count])
    end
  end
end
```
</section>

### Control for Authorized Users

Because we want to control for **all** of our songs endpoints, we can use a [before_action](https://guides.rubyonrails.org/action_controller_overview.html#action-callbacks) callback to authenticate each request.

```ruby
# app/controllers/api/v1/songs_controller.rb

class Api::V1::SongsController < ApplicationController
  before_action :authenticate_user

  ...

  private

  def authenticate_user
    token = request.headers['Authorization']
    @current_user = User.find_by(api_token: token)
    
    if @current_user.nil?
      render json: { error: 'Unathorized, please register as a user' }, status: :unauthorized
    end
  end
end
```

We will see the @current_user variable come back into play after we get user roles set up!

### User Role

We generally would make the user role an integer value so we're not storing a string over and over, and we can tell Ruby to use a lookup table called an "enum" (short for enumerable) to convert that number to a string later.

How we order these values doesn't really matter, but it's important to note that we generally only add to the END of our enumerable list. If we add something in the middle of the list, we might accidentally change other roles, and that can get really confusing.

Rails also has some neat "magic" about using these enum strings to build validation routines that we'll see in a moment.

#### Add a new `role` field

Make a migration to add a `role` field for a user, which is an integer field:

```bash
$ rails g migration AddRoleToUsers role:integer
```

The migration should look something like this down below. Be sure to set the default to 0, which we will set to be a “default” user, like a regular user that has no special access.

```ruby
class AddRoleToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :role, :integer, default: 0
  end
end
```

And let us go ahead and apply this change.

```bash
$ rails db:migrate
```

Now, in our `User` model, we need to specify our list of enumerable strings for the Roles that we have created.

*app/models/user.rb*

```ruby
class User < ApplicationRecord
    has_secure_password

    enum role: %w(default admin)

    before_create :generate_api_token

    validates :email, presence: true, uniqueness: true

    private

    def generate_api_token
        self.api_token = SecureRandom.hex(20)
    end
end

```

What this does is that it will give us access to some really useful helper methods, like this:

```ruby
# look up user 1
user = User.find(1)

# is user a default user?
if user.default?
  # default user!
elsif user.admin?
  # user is an admin
else
  # we don't know what kind of user they are?!
end
```

Remember that earlier, we had made it in our migration that our database would set the role to `0` if we didn’t set the role explicitly on our site, so we REALLY want to make sure that we are using strong params when we are creating users to make sure that we are NOT letting the `role` property to be transferred in as a form parameter.

#### Control for Admin User

Now that we have implemented roles for our users, we can control who has access to perform certain actions:

```ruby
class Api::V1::SongsController < ApplicationController
  before_action :authenticate_user

  ...

  def create
    if @current_user.admin?
      render json: Song.create(song_params) 
    else
      render status: :method_not_allowed
    end
  end

  ...

  private
  ...

end
```

At this point, we have satisfied the user stories outlined at the beginning of the lesson!

<section class='call-to-action'>

Solidify your learning by implementing the following:

<section class='dropdown'>

### 🫑 Control Songs#delete

Update your tests and implement code to satisfy this user story:

```
As an admin user
When I make an api request (with appropriate headers) to
  DELETE "/api/v1/songs/1"
Then I receive a successful response
  And the song is removed from the database
```

</section>

<section class='dropdown'>

### 🌶️ Control Songs#update

Update your tests and implement code to satisfy this user story:

```
When I make an api request (with appropriate headers) to
  PATCH "/api/v1/songs/1" {'title':'New Song Title'}
Then I see a json response with the song's updated information
  And the song is updated in the database
```
</section>

<section class='dropdown'>

### 🌶️🌶️ DRY your SongsController

At this point, you have a lot of repeated code in your SongsController. Clean up this code so that you are using a callback to control admin access to the CUD related controller actions.

</section>

<section class='dropdown'>

### 🌶️🌶️ SRP Refactor

Think about the responsibility of your SongsController.  Are there any responsibilities that could be abstracted away to new or existing classes?  If so, try to make those refactors!

</section>

</section>

## What About Sessions?
In the pre-work for this lesson, you learned about sessions - they help an application maintain state for a user by passing session information back and forth in the request and response headers.  This allows us to **stay logged in** on websites like Amazon, Gmail, etc...

But, for API consumption, the session is largely irrelevant because we expect the consumers of our APIs (whether human or application) to tell us who they are with **each request**.  

## Checks for Understanding (aka possible interview questions!)
* Describe the difference between authentication and authorization.
* Outline the design of an ebay copycat application:
    * what resources might exist?
    * what routes might exist?
    * How many roles would you need?
    * what endpoints would be useful?
    * how might name-spacing be used to structure the design?
* Define what a 'callback' is in rails; and provide examples of when one would be used.

<small>Completed code for this lesson can be found on the auth-complete branch of the [SetListAPI](https://github.com/turingschool-examples/set-list-api/) repo </small>