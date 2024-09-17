---
layout: page
title: Refactoring Patterns for API Consumption
---

## Setup

We will start with the `consuming-apis-complete` branch of the [Set List API](https://github.com/turingschool-examples/set-list-api/tree/consuming-apis-complete) for this lesson. We will be looking at the `ImagesController` first. 

Instructions for using Rails Encrypted Credentials can be found in the "Required Setup" section [here](./testing_tools_for_api_consumption).

## Learning Goals

- Identify SRP and MVC violations with implementing API consumption entirely in the controller

- Refactor code to pull logic out of the controller

- Identify the purpose of a Gateway/Service and a PORO

## Vocabulary

**Refactor** - to change code in a way that the end functionality still works as intended, but reorganizes it in a way to make it easier to maintain, easier to test, etc.

**SRP** - Single Responsibility Principle; the ideal that a piece of code should be responsible for one kind of task (this can be at a class level, a method level, etc.).

**Design Pattern** - an implementation of code which follows as much "industry standard" as possible to achieve clean organization of our code.

**MVC** - "Model, View, Controller" design pattern; a way of organizing our code into logical portions where our "business logic" is managed by the Controller, the "data logic" is managed by the Models, and the "presentation logic" is managed by the Views.


## Reminders

1. **There is no one right way** to refactor and structure API consumption in Rails or in any framework. We will introduce you to a few ideas and design patterns but we are not picky about which patterns you use. 

2. Before refactoring anything, it is **essential** that robust testing is already in place. See section on "Red, Green, Refactor Below"

---

## Identifying Candidates for Refactoring

### Warm-Up

1. What anti-patterns do you see in the current implementation of API consumption in the `consuming-apis-complete` branch, specifically in the `ImagesController`?

2. List out all the responsibilities the controller is handling

<section class="dropdown">
### Possible Answers - No peeking!

1. Our controller is handling every step of the process. This is a violation of MVC, as business logic and presentation logic should not live in the controller. Controllers should instead be slim and only direct traffic by delegating to other classes. This is also a violation of abstraction and encapsulation, two principles of Object Oriented Programming. 
2. The controller is:
  - Making a network call to Pexels
  - Parsing the JSON (which includes knowing which response keys are important for our needs)
  - Formatting this endpoint's response

</section>

## How do we refactor?

### 1. Declarative Programming

Throughout this refactor, we will use a technique called [Declarative Programming](https://vimeo.com/131588133). This is also referred to as "dream-driven development". Simply put, we write the code we *wish* existed and worry about implementation details later.

We use this strategy in life all the time. A statement such as "I need to travel to New York City." is an example. There is no mention of *how* we plan to get there. We could take a train, car, plane, bicycle, or some combination but those are details we will worry about later. Depending on your origin different strategies make more sense than others.

It's less likely, although perhaps more exciting, to select a means of travel without knowing the final destination. "I'd like to ride a train for 12 hours, a bus for 3 hours, and a boat for 2 hours. Where can I go?" There's a good chance you won't end up in NYC.

Writing code this way makes it more likely that we'll end up with abstractions that aren't vulnerable to breaking if implementation changes.

For example, currently we are using the Pexels API to retrieve this data. But maybe this data used to be provided by an API called Unsplash. By deciding how we want to interface with these objects and classes (picking our destination) prior to implementing API calls (how we are going to get there), we make this code more robust and less brittle. Imagine if we change APIs, and therefore the response we get back with the image data changes. The keys of that hash would likely change and this endpoint would suddenly stop working. When we refactor, we want to favor designs that minimize the number of layers that need to change if we switch out our API.

### 2. Red, Green, Refactor

We will also be using the Red, Green, Refactor technique. Red refers to a failing test, green refers to a passing test, and refactoring refers to making changes to improve code. We want to start with a failing test and then make it pass (red to green). We already did that step in the previous lesson. Then we make a refactor to improve the code. As we make that refactor, our test will most likely break, so our goal is for that refactor to end with our tests passing again. This way, we can use our tests to check our work every step along the way. We want to try to keep our refactors small and get back to green as often as possible to maintain our functionality.

---

## Refactoring Our Controller

So far, most of the code we've written in Rails has fit nicely into the MVC structure, and we haven't explored writing files much beyond controllers, models, and serializers. But now with API consumption, we're handling logic that doesn't fit squarely into any of these components. 

**Brainstorm:** If you were building a vanilla Ruby application, what types of files do you think you would make to extract this logic out of the controller?

<section class="dropdown">
### Possible Refactor, Part #1: Gateways

[Gateway classes](https://mattbrictson.com/blog/gateway-pattern) are a very common design pattern across many frameworks. They are also referred to as a *service* but this is a very overloaded term in Rails and software development as a whole. This section will refer to these classes as *gateways* but you're welcome to name them however you'd prefer.

Gateways typically encapsulate the logic used for interacting with an external API. Let's refactor our controller to use a gateway. 

*app/controllers/images_controller.rb*
```ruby
class Api::V1::ImagesController < ApplicationController
  def show
    artist = params[:artist]

    first_photo = ImageGateway.get_first_image(artist)
    
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

Now our Gateway class might look like this:
```ruby
class ImageGateway
  def self.get_first_image(query_term)
    conn = Faraday.new(url: "https://api.pexels.com") do |faraday|
      faraday.headers["Authorization"] = Rails.application.credentials.pexels[:key]
    end

    response = conn.get("/v1/search", { query: query_term })
    # OR response = conn.get("/v1/search?query=#{artist})

    json = JSON.parse(response.body, symbolize_names: true)
    json[:photos][0]
  end
end
```

Notice how much logic that extracted out of the controller! Hooray! 

If we are making calls to more than one Pexels endpoint in our application, we could also consider adding additional class methods to our Gateway and extacting the Faraday connection set up into a helper method that can be called in each method.

```ruby
class ImageGateway
  def self.get_first_image(query_term)
    response = conn.get("/v1/search", { query: query_term })

    json = JSON.parse(response.body, symbolize_names: true)
    json[:photos][0]
  end

  private
  
  def self.conn
    Faraday.new(url: "https://api.pexels.com") do |faraday|
      faraday.headers["Authorization"] = Rails.application.credentials.pexels[:key]
    end
  end
end
```


We also know that serializers are a very helpful tool for managing the presentation of our data. Once we extract the JSON response formatting out of the controller, our controller action looks even nicer!

*app/controllers/images_controller.rb*
```ruby
class Api::V1::ImagesController < ApplicationController
  def show
    artist = params[:artist]

    first_photo = ImageGateway.get_first_image(artist)

    render json: ImageSerializer.format_image_response(first_photo)
  end
end
```

This is a huge improvement! 

</section>

<section class="dropdown">
### Possible Refactor, Part 2: POROs

You may have noticed that we mentioned the potential problem with hash keys changing in the "Declarative Programming" section but we haven't really addressed it. If we were to change APIs from Pexels to another service, we would have to change the gateway class and the serializer to makes sure all necessary data can be accessed. This is especially bothersome in a serializer. The presentation layer of our code should not need to know the details about the external API response's data format. 

On top of this coupling, our application is also carting around a much larger hash than it really needs to. Our endpoint only needs to expose 4 attributes, but the individual image hash that comes from Pexels is 20 lines long! This is a violation of YAGNI -- we don't need all that data! 

One possible alternative to using transporting a large hash that's been parsed from the Pexels response is to use a PORO: a plain old Ruby object. 

While the term is new, the concept is not. This is what you built all through Module 1. In this context, and in Mod 1, we used these POROs as *domain objects*, or objects that represent real things in the world. Some domain objects you might have built before include `Dog`, `Vehicle`, `Wizard`, `Team` and `Deck`. 

Some benefits of using POROs over a hash here include:
* We're only storing the attributes we need or care about
* We can name the attributes however we'd like
* We can use `attr_readers` to control access to these attributes and prevent accidental data changes.
* We can build some lightweight methods for handling these objects, like a method that formats an address or calculates an amount in a different currency. 

Let's refactor our logic to use a `Image` PORO!

*app/poros/image.rb*
```ruby
class Image
  attr_reader :url,
              :photographer,
              :photographer_url,
              :alt_text

  def initialize(data)
    @url = data[:url]
    @photographer = data[:photographer]
    @photographer_url = data[:photographer_url]
    @alt_text = data[:alt]
  end
end
```

And now we can refactor our `ImageGateway` to parse the JSON response into an `Image` object.

*app/gateways/image_gateway.rb*
```ruby
class ImageGateway
  def self.get_first_image(query_term)
    response = conn.get("/v1/search", { query: query_term })

    json = JSON.parse(response.body, symbolize_names: true)
    Image.new(json[:photos][0])
  end
```

Again, be mindful of continuing to run your tests to make sure nothing we've written has broken existing tests. We'll also want to write *unit tests* for the new classes we've created. Let's think about what each of these new specs could verify:

* **Gateway Class**: Verify that the method receives a query argument and returns an image object. Optionally stub the response that comes back from the API call. 
* **PORO**: Verify that attributes are properly populated from the data passed in. Verify behavior of any methods needed for data cleaning or manipulation.

**Try writing these tests yourself before you check out implementations on the completed branch from class**

</section>

<section class="note">
### Domain Objects vs Utility Classes

You might have noticed that technically, both our `ImageGateway` and our `Image` class are POROs, in that they are both regular ol' classes with no special Rails magic involved. However, as we design POROs, it's important to think about the difference between these 2 types of classes.

* **Domain Objects** represent a "thing" in the real world, and can be instantiated and hold state. We can think of these like a *noun*
* **Utility Classes** perform a certain task, and typically don't need to be instantiated. They might contain all class methods. We can think of these like a *verb*

</section>

<section class="dropdown">
### Additional Refactoring Patterns to Explore

Interested in checking out other design patterns that could be applied to this context?

* [Facade Pattern](http://wiki.c2.com/?FacadePattern)
* [Registry Pattern](https://mattbrictson.com/blog/registry-pattern)
* [Service Objects](https://www.toptal.com/ruby-on-rails/rails-service-objects-tutorial)

Remember - there is no *one right way* to refactor this code, and the world is full of many opinions on all of these patterns. As you explore refactoring options, observe your own developer intuition and opinions, and be prepared to defend your design choices!


</section>

## Checks for Understanding

- Describe your preferred refactoring workflow (i.e. red-green-refactor, declarative programming, etc.)
- Describe the code smells from the controller action at the beginning of this lesson (`ImagesController`)
- What is the responsibility of every new file you've created today?

You can find a completed implementation that uses a gateway and a PORO domain object [here](https://github.com/turingschool-examples/set-list-api/tree/refactoring-api-consumption-complete)

