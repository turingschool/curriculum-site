---
layout: page
title: Consuming an API with Ruby
tags: rails, ruby, apis
---

# Consuming an API with Ruby

## Learning Goals

By the end of this exercise, a student will be able to:

- Set up and configure Faraday for use within a Rails application
- Use Faraday to connect and retrieve information from third party external APIs.
- Parse the information retrieved from a third party API.

## Warm Up

Questions to consider. Take a minute to think to yourself before checking out the dropdown below.

* True or false: A system that serves as a server can also serve as a client (i.e. it can make requests to other servers)
* Why might APIs we build need to consume data from *other* APIs as well?


<section class="dropdown">
### Answers

* TRUE! Our API-only Rails applications can be considered a server when the respond to requests from our front end applications, and a client when our APIs make requests to other servers. 
* As developers and maintainers of a Rails API, we might want to integrate data that we don't manage in order to add functionality or enrich our dataset. For example, if we manage data about public parks and trails, we might want our endpoints to include weather data so that users could determine whether a given trail or park is safe for that day. Rather than trying to manage weather data in our database, we could instead retrieve trail data from our database, and retrieve weather data from an *external API*. Our API response might combine this data to give users all of the information they need.

</section>

## Exercise

We'll be returning to our beloved [Set List API](https://github.com/turingschool-examples/set-list-api/tree/consumping-apis-start), and starting from the `consuming-apis-start` branch. 

This branch has added an additional incomplete endpoint, which takes a query parameter of an artist name and should return an image of that artist. Right now, there is a test set up to verify the endpoint returns an image url, the photographer's info, and some alt text for the image. But, our database doesn't store that information, and we don't want to have to store it. Instead, there's a great API we can use to retrieve photos of these artists: [Pexels!](https://www.pexels.com/api/)

### Setup

You'll first need to make an account with Pexels in order to use the API. Once you have an account, you should be able to view your API key. This key is like your password for accessing these API endpoints. Let's use it to try out some API calls in Postman. Copy it to your clipboard now!

### Trying Out Requests in Postman

Before we write any code to make an API call, it's important to read the documentation and make sure a request or two work in Postman. Take a look at the [Pexels documentation](https://www.pexels.com/api/documentation/) and try to find the items below in order to get a request working. Don't peek at the answer until you've read the docs!

Look for:
* The base url for this API
* What endpoint to use to get an image for a given artist
* Where the API key should be passed in the request (hint: check out the "Public Authentication" section)
* How to pass the specific artist name to the request
* How to ensure the response is in JSON (not XML)

<section class="dropdown">
### Answers - No peeking!

When put all together, these answers should lead you to the following request. Try it out in Postman to make sure it works! Here, we're using The Beatles as an example.

```bash
GET https://api.pexels.com/v1/search?query=The%20Beatles
Authorization: <YOUR KEY HERE>
```
* The base url is `https://api.pexels.com`
* The specific endpoint we're using is `/search`
* We're passing a query parameter, and when we add this key/value pair to Postman, you should see it populate the path after the `?`. Because "The Beatles" has a space in it, the space might be encoded to `%20` in the URL, or there might just be a space.
* We're passing an authorization header. Sometimes, keys are passed as a query parameter, or in a different location. It's essential that we read documentation to figure out how to pass keys in a request. Note: If you remove this header in your request, what happens?


</section>

<section class="call-to-action">
You might notice that some of the photos returned for a given artist are not the most relevant. This free API has a limited library, so for this exercise, we're going to stick to the big name artists, and not worry if the images returned are somewhat irrelevant.
</section>

### Back to TDD

Let's return to our Set List API. Right now, we have a failing test because our images endpoint is just returning an empty data JSON object rather than the image info we need. Our failing test looks like this:

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

Based on this test, and the JSON API specification, we now know that our API response for this endpoint should look something like this:

```json
{
  "data": {
    "id": "null",
    "type": "image",
    "attributes": {
      "image_url": "www.url_of_the_image_for_this_artist.com",
      "photographer": "Photographer Name",
      "photographer_url": "www.photographer_url.com",
      "alt_text": "Alt text for the image"
    }
  }
}
```

Now we're ready to build this request into our application so that we can return this information! Let's take a look at our current controller action. The `show` action in our `ImagesController` is not built out much but this is where we can implement the API call to Pexels to retrieve image information. You're probably cringing at the idea of building a lot of logic into our controllers, and you should! What a total MVC violation! But, we'll learn about how to refactor this in the beginning of Mod 3. 

We will be using the [Faraday Gem](https://github.com/lostisland/faraday) to make HTTP requests using Ruby. 

First, we will need to add gem "faraday" to our Gemfile. We don't want to add to a `:development`/`:test` block since we will need to make these API calls in all environments. After you add it to your Gemfile, run bundle install.

Now that we have it installed, lets use Faraday to make the API call. Rather than memorizing the syntax we use in this tutorial, make sure you get used to referencing documentation.

*app/controllers/api/v1/images_controller.rb*
```
class Api::V1::ImagesController < ApplicationController
  def show
    artist = params[:artist]

    conn = Faraday.new(url: "https://api.pexels.com") do |faraday|
      faraday.headers["Authorization"] = "<YOUR KEY HERE>"
    end

    response = conn.get("/v1/search", { query: artist })
    # OR response = conn.get("/v1/search?query=#{artist})

    require 'pry'; binding.pry

    render json: { data: {} }
  end
end
```

Make sure you replace `<YOUR KEY HERE>` with your new Pexels API key! 

Let's take a closer look at what we're doing:

1. We grab the artist's name from the query parameter and save it as a variable
2. We set up a Faraday connection. What does this do? Does this make a network request? Check out the documentation if you're not sure.
3. We add headers to this Faraday connection, and the headers exist as key/value pairs. The documentation asks clients to pass an `Authorization` key with the API key as the value. 
4. We make a get request! Here is where we indicate the path of the endpoint we want (`"/v1/search"`) and add the query parameter. There are a couple different ways to add query parameters, so we have 2 different options shown here. 

When we run our test and hit this pry, check out the `response` object. It's a Faraday Response object! Take a look at all the attributes available here. Some particularly useful ones are `status` and `body`. Make sure that your request status is 200 and your body returns image data. 

The response's body, though, is a JSON string. It's a bit clunky to manipulate one very long string, so we can use a handy built-in method in Ruby to parse this JSON into Ruby collections: `JSON.parse(response.body)`. If you prefer to work with symbol keys rather than string keys, you can optionally use `JSON.parse(response.body, symbolize_names: true)`. Now we should be able to more easily isolate the data we're interested in. You'll probably get more than one photo in your response, but our endpoint just needs to return data for one image. For convenience, we'll just take the first image. Remember -- we are looking for the photo's url, the photographer's name, the photographer's url and the photo's alt text.

Can you massage this response data into the format we're looking for? The solution is in the dropdown below. For simplicity, the JSON response format is just added to the same controller action, but you'll want to refactor and use a serializer instead of formatting presentation logic in your controller!

<section class="dropdown">
### Controller Action: Complete

```ruby
class Api::V1::ImagesController < ApplicationController
  def show
    artist = params[:artist]

    conn = Faraday.new(url: "https://api.pexels.com") do |faraday|
      faraday.headers["Authorization"] = "<YOUR API KEY>"
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
</section>

## Environment Variables

There's one more improvement we should make to our code. If you look in the controller, we have hard coded our API key. There's a couple reasons we don't want to do this:

1. It isn't secure. If someone gets access to this code (you should always assume this is possible, even if your project is closed-source), someone could copy our API key and then would be able to masquerade as our application. They could, for example, spam the Pexels API with requests and force us over the rate limit we discussed earlier. If our API key has access to paid features, they could get this access for free.
2. It isn't flexible. If we need to change the API key, we'd need to go into the code base and manually configure it. If we use this API key in multiple places, we'd need to change it in each place.

What we really want is to put our environment configuration somewhere that is specific to this project. Luckily, Rails provides a seamless way to store environment variables via Rails Application Credentials.

To set up our API key, complete the following steps:

* Verify that you are able to launch VS Code from the command line by running `code`
  * If the following steps don’t work, you’ll need to follow these [Launching From the Command Line](https://code.visualstudio.com/docs/setup/mac#:~:text=Keep%20in%20Dock.-,Launching%20from%20the%20command%20line,code) steps to configure the command
* Generate what is called a ‘master key’ by running `EDITOR="code --wait" rails credentials:edit` in the command line
  * This will create a new key in `config/master.key` and a temporary YAML file which will open in your text editor
  * If you get a message that says "Couldn't decrypt config/credentials.yml.enc", delete that file and run the above command again.
* Add your API Key to the opened file
  * Note the indentation in the example below. The tab before `key` is important, as it results in the ability to access this value under a pexels "object".
  * The `secret_key_base` value is unique to YOUR repo. Use what is automatically generated and _don't_ copy this one.

```
pexels:
  key: <Your API key here>

# Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
secret_key_base: asdfdsafdexamplekeybaseasdfasdfasdf
```

* Save and close the file, and you should see in your terminal that the file was encrypted and saved
* Note: To use these credentials and environment variables with a team you’ll need to share the contents of the `config/master.key` file with your teammates securely, and they’ll need to create this file with that key as the contents

[Here is a walkthrough video of the steps above, to help you set up your Rails Application Credentials.](https://drive.google.com/file/d/1Cy598b1W1d7nZ-gv6ur_gPmAGOmaD3Gi/view)

Next, you’ll have to replace the hardcoded key in your controller.

```ruby
    conn = Faraday.new(url: "https://api.pexels.com") do |faraday|
      faraday.headers["Authorization"] = Rails.application.credentials.pexels[:key]
    end

```

Run your tests again to verify they still pass!

## Checks for Understanding

* What does Faraday do for us?
* What is an API key?
* Name 2 common places an API key is passed in a request
* What's wrong with leaving all of our Pexels network call logic in the controller?
* What ideas do you have about how we could clean this code up?
* Why do we need an environment variable here?