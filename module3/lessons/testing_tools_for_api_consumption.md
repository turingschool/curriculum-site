---
layout: page
title: Testing Tools for API Consumption
---

## Resources

Past Live Lessons:
- [Josh Mejia walks through WebMock and VCR as testing tools](https://youtu.be/Okck4Fc557o)
- [Lesson w/ Ian Douglas](https://youtu.be/dlhgKYtXBoY)

## Learning Goals

After this class, a student should be able to:

- Explain why we don’t want our tests to make real API calls
- Understand how to stub network requests using WebMock and VCR


## Required Setup

[📺 Here is a walkthrough video to help you set up your Rails Application Credentials.](https://drive.google.com/file/d/1Cy598b1W1d7nZ-gv6ur_gPmAGOmaD3Gi/view?usp=sharing)

- [Request a Pexels API Key](https://www.pexels.com/api/)
  - Click Join
  - Click "I Want to Download"
  - Register
  - Upon successful registration, click your user picture/icon in top right corner and select Image & Video API to access your API key.
- Clone [the set-list-api repo](https://github.com/turingschool-examples/set-list-api) (You should already have this cloned from your intermission work.)
  - (forking is optional since we won't ask you to push up any changes)
- In the `testing-setup` branch, run setup steps:
```bash
bundle
rails db:{drop,create, migrate}
```
- Verify that you are able to launch VS Code from the command line. `code`
  - If the following steps don't work, you'll need to follow [these 'Launching From the Command Line' steps](https://code.visualstudio.com/docs/setup/mac#:~:text=Keep%20in%20Dock.-,Launching%20from%20the%20command%20line,code) to configure the command
- Generate what is called a 'master key' by running `EDITOR="code --wait" rails credentials:edit` in the command line
  - This will create a new key in `config/master.key` and a temporary YAML file which will open in your text editor.
- Add your Pexels API Key to the opened file

```
pexels:
  key: whatever4your1pexel8api5key98is

# Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
secret_key_base: ugsdfeadsfg98a7sd987asjkas98asd87asdkdwfdg876fgd
```

- Save and close the file, and you should see in your terminal that the file was encrypted and saved.
- Note: To use these credentials and environment variables with a team you'll need to share the contents of the `config/master.key` file with your teammates securely, and they'll need to create this file with that key as the contents. 

## Optional Manual Setup

You can start this class from this branch [here](https://github.com/turingschool-examples/set-list-api/tree/testing-setup).


Our `ImagesController` currently looks like this:

*app/controllers/api/v1/images_controller.rb*

```ruby
class Api::V1::ImagesController < ApplicationController
  def show
    artist = params[:artist]

    conn = Faraday.new(url: "https://api.pexels.com") do |faraday|
      faraday.headers["Authorization"] = Rails.application.credentials.pexels[:key]
    end

    response = conn.get("/v1/search", { query: artist })
    # OR response = conn.get("/v1/search?query=#{artist})

    json = JSON.parse(response.body, symbolize_names: true)
    first_photo = json[:photos][0]

    formatted_json = {
      id: nil,
      type: "image",
      attributes: {
        image_url: first_photo[:url],
        photographer: first_photo[:photographer],
        photographer_url: first_photo[:photographer_url],
        alt_text: first_photo[:alt]
      }
    }

    render json: { data: formatted_json }
  end
end
```

For simplicity’s sake we aren’t going to use the refactored pattern, we are just going to leave all of the code in your controller. This leaves the controller action pretty bloated, but cleaning this up will be part of a different lesson! For now, just focus on understanding the logic. 

You can test this code is working correctly in Postman if you can find a an image by an artist.

We also have a spect testing the functionality of this action:

*spec/requests/api/v1/images/image_request_spec.rb*

```ruby
require "rails_helper"

RSpec.describe "Images Endpoint" do
  describe "happy path" do
    it "can retrieve an image for a specific artist specific artist" do
      get "/api/v1/images?artist=The%20Beatles"

      expect(response).to be_successful
      json = JSON.parse(response.body, symbolize_names: true)

      expect(json[:data][:id]).to be_nil
      expect(json[:data][:type]).to eq("image")
      expect(json[:data][:attributes]).to have_key(:image_url)
      expect(json[:data][:attributes]).to have_key(:photographer)
      expect(json[:data][:attributes]).to have_key(:photographer_url)
      expect(json[:data][:attributes]).to have_key(:alt_text)
    end
  end
end
```

---

## Mocking Network Requests

The [setup branch](https://github.com/turingschool-examples/set-list-api/tree/testing-setup) for this class has implemented a test to ensure that we are able to hit our API and display some data from the response. However, our test is actually hitting the Pexels API every time it runs. There are many reasons we wouldn't want to do this:

1. We could hit API rate limits much faster.
2. Our test suite will be slower.
3. If someone working on our team doesn't have an API key set up, we make it that much harder for them to jump into our code base.
4. If we ever need to work without WiFi, or if the WiFi is down, or if the API we're using goes down (for maintenance, for example), we make it impossible to keep working on the app.

Rather than making real HTTP requests, we want to make Mock HTTP Requests.

## WebMock

We will be using [WebMock](https://github.com/bblimke/webmock) to mock our HTTP requests. As always, you should peruse the docs to get an idea of how it works.

## Install the Gem

Looking at the "Installation" section of the docs, we can see we need to `gem install webmock`, but since we're using Bundler we can add it to our Gemfile which handles our gem installation. Add `gem "webmock`" to a `:test` block of your Gemfile. DO NOT add it to the `:development, :test` block (more on that in a second). Run `bundle install`.

Finally, we can see a section for "RSpec" in the Installation instructions. This tells us to add `require 'webmock/rspec'` to our `spec/spec_helper`. Do that now.

Let’s run our Senator search test:

```bash
$ bundle exec rspec spec/requests/api/v1/images/image_request_spec.rb
```

Now we will se a big ol’ error message:


```bash
     Failure/Error: response = conn.get("/v1/search", { query: artist })
     
     WebMock::NetConnectNotAllowedError:
       Real HTTP connections are disabled. Unregistered request: GET https://api.pexels.com/v1/search?query=The%20Beatles with headers {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'Authorization'=>'hduMdCOMwGyOhPOf74pAcSFmzqgA7Sk24ljHEOBZOvIboKZQkRnUA4w6', 'User-Agent'=>'Faraday v2.10.1'}
     
       You can stub this request with the following snippet:
     
       stub_request(:get, "https://api.pexels.com/v1/search?query=The%20Beatles").
         with(
           headers: {
          'Accept'=>'*/*',
          'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
          'Authorization'=>'hduMdCOMwGyOhPOf74pAcSFmzqgA7Sk24ljHEOBZOvIboKZQkRnUA4w6',
          'User-Agent'=>'Faraday v2.10.1'
           }).
         to_return(status: 200, body: "", headers: {})
     
       ============================================================
```

This means it's working! WebMock not only allows us to mock real HTTP requests, but also **prevents** us from making real HTTP requests. While this is good for our test suite (which we run very frequently), we do want to see the real requests being made at some point, so we want to allow HTTP requests in development. This is why we only added the gem to the `:test` block of our Gemfile and not `:development, :test`.

## Stubbing the Request

Looking at the docs, we can see some examples of how to stub requests. Let's add one to our test:

********spec/requests/api/v1/images/image_request_spec.rb********

```ruby
require "rails_helper"

RSpec.describe "Images Endpoint" do
  describe "happy path" do
    it "can retrieve an image for a specific artist specific artist" do
      stub_request(:get, "https://api.pexels.com/v1/search?query=The%20Beatles")
        .to_return(status: 200, body: '')

      get "/api/v1/images?artist=The%20Beatles"

      expect(response).to be_successful
      json = JSON.parse(response.body, symbolize_names: true)

      expect(json[:data][:id]).to be_nil
      expect(json[:data][:type]).to eq("image")
      expect(json[:data][:attributes]).to have_key(:image_url)
      expect(json[:data][:attributes]).to have_key(:photographer)
      expect(json[:data][:attributes]).to have_key(:photographer_url)
      expect(json[:data][:attributes]).to have_key(:alt_text)
    end
  end
end
```

We can put this right above the `get "/api/v1/images?artist=The%20Beatles"`.

Now, when we run the test, we get a new error.


```bash
Failures:

  1) Images Endpoint happy path can retrieve an image for a specific artist specific artist
     Failure/Error: json = JSON.parse(response.body, symbolize_names: true)
     
     JSON::ParserError:
       unexpected token at ''
     # ./app/controllers/api/v1/images_controller.rb:11:in `show'
     # ./spec/requests/api/v1/images/image_request_spec.rb:9:in `block (3 levels) in <top (required)>'
```

If we look at the stub we just put in the test, we are returning an empty body, so it makes sense that we're getting an error when trying to parse the response body as JSON.

We need to replace the empty body with an actual JSON response. We *could* copy and paste a body right into this test, but then our test file would get quite messy. What we'll do instead is make a `spec/fixtures` directory with a file that we can read:

```bash
$ mkdir spec/fixtures
$ touch spec/fixtures/beatles_artist_query.json
```

And then we have to update our test to use this fixture file:

*spec/requests/api/v1/images/image_request_spec.rb*

```ruby
require "rails_helper"

RSpec.describe "Images Endpoint" do
  describe "happy path" do
    it "can retrieve an image for a specific artist specific artist" do
      json_response = File.read('spec/fixtures/beatles_artist_query.json')
      stub_request(:get, "https://api.pexels.com/v1/search?query=The%20Beatles")
        .to_return(status: 200, body: json_response)

      get "/api/v1/images?artist=The%20Beatles"

      expect(response).to be_successful
      json = JSON.parse(response.body, symbolize_names: true)

      expect(json[:data][:id]).to be_nil
      expect(json[:data][:type]).to eq("image")
      expect(json[:data][:attributes]).to have_key(:image_url)
      expect(json[:data][:attributes]).to have_key(:photographer)
      expect(json[:data][:attributes]).to have_key(:photographer_url)
      expect(json[:data][:attributes]).to have_key(:alt_text)
    end
  end
end
```

We're still returning an empty body because our file is empty, so let's add some actual JSON data to that file **That mimics how the JSON Data looks when we hit the real API**. Use Postman to hit the Pexels API to get a JSON response and copy and paste it into your *spec/fixtures/beatles_artist_query.json* file. Your test should be passing once again.

If this is *really* working, we should be able to turn off our WiFi and see the test is still working.

## VCR

Another handy tool for mocking these requests is [VCR](https://github.com/vcr/vcr). You can think of it as an extension of WebMock. We will still be stubbing requests, but now rather than manually creating the mock JSON response, VCR will allow us to make one real HTTP request the first time, record its response, and use that response as the stub for future requests. VCR refers to these recorded responses as `cassettes`. We are now going to implement VCR on this same test.

## Setup

First, add `gem "vcr"` to the `:test` block of your Gemfile and `bundle install`.

Then, add this at the bottom of your `rails_helper`:

*spec/rails_helper.rb*

```ruby
VCR.configure do |config|
  config.cassette_library_dir = "spec/fixtures/vcr_cassettes"
  config.hook_into :webmock
end
```

In the first line of the block, we tell VCR where we want to store the the `cassettes`. We are making use of the `spec/fixtures` folder we already created.

The second line tells VCR what library it should use for intercepting these requests, which will be WebMock. So we are still using WebMock, but VCR is adding additional functionality for recording responses.

Let's reset our test in *spec/requests/api/v1/images/image_request_spec.rb* by removing the lines we added to use webmock.

Now, let’s run our test.

```bash
$ bundle exec rspec spec/requests/api/v1/images/image_request_spec.rb
```

You’re going to see a big error, but the important part is:

```ruby
# --- Caused by: ---
     # VCR::Errors::UnhandledHTTPRequestError:
     #
     #
     #   ================================================================================
     #   An HTTP request has been made that VCR does not know how to handle:
     #      GET https://api.pexels.com/v1/search?query=The%20Beatles
```

This means that it’s working. 

## Stubbing the Request

In order to use VCR, we wrap our test in a `VCR.use_cassette` block:

*spec/requests/api/v1/images/image_request_spec.rb*

```ruby
require "rails_helper"

RSpec.describe "Images Endpoint" do
  describe "happy path" do
    it "can retrieve an image for a specific artist specific artist" do
      VCR.use_cassette("beatles_artist_query") do

        get "/api/v1/images?artist=The%20Beatles"

        expect(response).to be_successful
        json = JSON.parse(response.body, symbolize_names: true)

        expect(json[:data][:id]).to be_nil
        expect(json[:data][:type]).to eq("image")
        expect(json[:data][:attributes]).to have_key(:image_url)
        expect(json[:data][:attributes]).to have_key(:photographer)
        expect(json[:data][:attributes]).to have_key(:photographer_url)
        expect(json[:data][:attributes]).to have_key(:alt_text)
      end
    end
  end
end
```

The string we passed to `use_cassette` is an identifier for the cassette, so it doesn't really matter what you pass it, but this will become the title of the cassette so name it something appropriate to the data it will be holding.

Run your tests and they should be passing. If you look under `spec/fixtures/vcr_cassettes` you should see a `.yml` file that contains your recorded response. This is now the cassette vcr will use anytime this test runs.
Notice that we no longer need the `spec/fixtures/beatles_artist_query.json` file since vcr will look at only the recorded cassettes. If vcr does not find a cassette with the title you are requesting, that's when it will make a live API call and then record that response to a cassette. 

## Filtering Sensitive Data

If you look closely in that `.yml` file you can see our API key in there. We will be pushing these cassettes to GitHub, so we don't want the actual API key to be recorded for the same reasons we don't want to hardcode the API key in our code. We will use a VCR option to replace the actual API key with a placeholder. Open up your `rails_helper.rb` and add another line to the VCR configuration:

*spec/rails_helper.rb*

```ruby
VCR.configure do |config|
  config.cassette_library_dir = "spec/fixtures/vcr_cassettes"
  config.hook_into :webmock
  config.filter_sensitive_data('<PEXELS_API_KEY>') { Rails.application.credentials.pexels[:key] }
end
```

Then, delete your VCR cassettes directory:

```bash
$ rm -rf spec/fixtures/vcr_cassettes
```

Run your test suite again, and you should see a new VCR cassette in the  `vcr_cassettes` directory. Open it up and confirm that your api key is now being replaced with `<PEXELS_API_KEY>`.

**You will need to add a `filter_sensitive_data` block for EACH thing you want to filter. If you're building an app using several API keys, make sure you add a filter for each thing in your `config/application.yml` that you want to have hidden!**

## Using RSpec Metadata

VCR has a handy feature that allows us to use the names of our tests to name cassettes rather than having to manually wrap each test in a `VCR.use_cassette` block and give the cassette a name. Add one more line to your VCR config block:

*spec/rails_helper.rb*

```ruby
VCR.configure do |config|
  config.cassette_library_dir = "spec/fixtures/vcr_cassettes"
  config.hook_into :webmock
  config.filter_sensitive_data('<PEXELS_API_KEY>') { Rails.application.credentials.pexels[:key] }
  config.configure_rspec_metadata!
end
```

Now in our tests, we can delete the `VCR.use_cassette` block and tell the test to use VCR by passing it `:vcr`:

*spec/requests/api/v1/images/image_request_spec.rb*

```ruby
require "rails_helper"

RSpec.describe "Images Endpoint" do
  describe "happy path" do
    it "can retrieve an image for a specific artist specific artist", :vcr do
      get "/api/v1/images?artist=The%20Beatles"

      expect(response).to be_successful
      json = JSON.parse(response.body, symbolize_names: true)

      expect(json[:data][:id]).to be_nil
      expect(json[:data][:type]).to eq("image")
      expect(json[:data][:attributes]).to have_key(:image_url)
      expect(json[:data][:attributes]).to have_key(:photographer)
      expect(json[:data][:attributes]).to have_key(:photographer_url)
      expect(json[:data][:attributes]).to have_key(:alt_text)
    end
  end
end
```

Run your tests again and you'll notice a new directory and file in your `vcr_cassettes` directory that matches the names of the blocks in the test. Now when we want a test to use VCR, we just have to pass it `:vcr` and we're good to go. Much easier!****

## But manually deleting VCR cassettes is like, SO annoying

Thankfully the VCR team have come up with a way to set an expiration on our VCR cassettes, and we can do it one of two ways (or both)

On a per-cassette level, we can set it up like this:

```ruby
VCR.use_cassette('name_of_cassette', re_record_interval: 7.days) do
  # test code goes here
end
```

There's no easy way to configure this on tests which use the `:vcr` flag, though. One way would be for one test to use the `:vcr` flag, and another test which makes the same API call to use the `VCR.use_cassette()` setting above. When the test executes which has the `re_record_interval` option set to a value, it may 'expire' cassette and re-record it if the cassette passes that threshold.

We can also set a global configuration which will apply to all VCR-enabled tests, including those using the `:vcr` flag, but changing our `spec/rails_helper.rb` configuration slightly:

```ruby
VCR.configure do |config|
  config.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
  config.hook_into :webmock
  config.filter_sensitive_data('<PEXELS_API_KEY>') { Rails.application.credentials.pexels[:key] }
  config.default_cassette_options = { re_record_interval: 7.days }
  config.configure_rspec_metadata!
end
```

This example uses a "default cassette options" flag, setting a re-record interval of 7 days for all cassettes. You can still override this on individual tests which use `VCR.use_cassette()`, so you could set a general flag of, say, `30.days` but a particular test could be set to `7.days` instead to expire earlier.

## What if I don't want to stub a request?

When VCR is installed, it will assume you want to block every network request in all of your tests. Sometimes though, we don't want VCR to interrupt the network call. We can add an additional line of configuration to prevent VCR from throwing an error when we're intentionally trying to make an API call.
```ruby
VCR.configure do |config|
  config.cassette_library_dir = 'spec/fixtures/vcr_cassettes'
  config.hook_into :webmock
  config.filter_sensitive_data('<PEXELS_API_KEY>') { Rails.application.credentials.pexels[:key] }
  config.default_cassette_options = { re_record_interval: 7.days }
  config.configure_rspec_metadata!
  config.allow_http_connections_when_no_cassette = true
end
```

## Checks for Understanding

- What are some reasons we don't want our tests to make real API calls?
- What does WebMock do?
- What does VCR do?
- Why don't we want VCR to record our API key?
- How are WebMock and VCR similar? different?

You can find this code complete on this branch [here](https://github.com/turingschool-examples/set-list-api/tree/testing-tools-complete).
