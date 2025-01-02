# Intro to Caching in Rails

## Learning Goals

- Understand caching as a performance optimization tool
- Practice analyzing our applications to identify performance problems
- Practice using Rails' built-in caching facilities to implement low-level caching

## Discussion — What is Caching?

Frequently as developers we'll run into situations when we need to make something in our programs faster.

With user-facing web applications in particular, we're constrained by a request/response cycle that needs to be kept fast -- anything over about 200ms starts to feel slow and clunky to the user.

So we need to make something faster. We have a couple of choices:

- **1:** Speed up the underlying process
- **2:** Figure out a way to get rid of the underlying process (at least some of the time)

When looking at the list it seems like a no-brainer -- just choose number 1, make your things fast, and then the problems go away!

Unfortunately it turns out that #1 is often pretty hard. In fact in some situations it may be actually impossible (see [NP-Completeness](https://en.wikipedia.org/wiki/NP-complete)).

So often in application development we turn to choice 2 -- caching.

## Ok, but what actually is caching

In short, caching is an optimization technique focusing on saving the results of a computation so that we can retrieve it again later without having to re-do the original calculation.

To a certain extent, caching is a "non-optimizing optimization" -- we don't actually make the underlying pieces any faster, but we make the application **seem** faster by limiting our usage of the slow pieces.

Let's look at a simple example in ruby using a hypothetical pizza store. We are using the sleep to simulate that it takes a while to make a tasty pizza.

```ruby
class PizzaShop
  def make_me_a_pizza(type)
    puts "cooking up your #{type} pizza"
    sleep(3)
    puts "One tasty #{type} pizza"
  end
end

PizzaShop.new.make_me_a_pizza("anchovy")
cooking up your anchovy pizza
# (dramatic pause)
=> "One tasty anchovy pizza"
```

As we can see, the pizza production process is currently pretty slow. Perhaps our pizza chefs are napping on the job. Let's see if we can speed it up with a cache:

```ruby
class PizzaShop

  def pizza_cache
    @pizza_cache ||= {}
  end

  def make_me_a_pizza(type)
    puts "cooking up your #{type} pizza"
    #first, check if this type of za is in the cache:
    if pizza_cache[type]
      pizza_cache[type]
    else
      sleep(3)
      cooked_pizza = "One tasty #{type} pizza"
      pizza_cache[type] = cooked_pizza
      cooked_pizza
    end
  end
end

shop = PizzaShop.new
shop.make_me_a_pizza("anchovy")
cooking up your anchovy pizza
# (dramatic pause)
=> "One tasty anchovy pizza"
shop.make_me_a_pizza("anchovy")
cooking up your anchovy pizza
# (instantaneous)
=> "One tasty anchovy pizza"
```

Let's talk through it. We've inserted a cache in the pizza-production-pathway. The first time someone requests a pizza of a specific type, we still have the same 3-second delay. But after we make that pizza the first time, we store it.

After that, subsequent requests for the same pizza type can be served instantly.

### Caching Limitations

Let's think about some of the limitations of our trivial cache example:

- What happens if we request a different pizza type?
- What happens if we make a new pizza shop?
- What happens if we change the underlying technique of making a pizza?

It's important to remember that while caching is a very useful technique, it does have limitations.

### Discussion - Caching in Rails?

What sorts of things might we want to cache in a Rails app? (try to list at least 4 common sources of performance problems in a typical web app)

Fortunately this is such a common use-case that Rails includes built-in support for it via the cache helper. Let's take a look.

## Workshop — Caching in Rails

For this exercise we'll use our beloved [Set List API](https://github.com/turingschool-examples/set-list-api). We'll be using the `caching_start` branch. Be sure to run the step up steps in the README, with a special eye on the Rails credentials set up so that our API can reach the external Pexels API.  

```bash
bundle install
rails db:{drop,create,migrate,seed}
EDITOR="code --wait" rails credentials:edit
```

*Demo -- looking for performance bottlenecks*

*Observe while I run through the app and talk about looking for problems*


### Step 1 -- enable caching in development

(by default rails turns off caching in development, so let's turn that on)

```bash
$ rails dev:cache
```
What this does, is that it creates an empty file called `caching-dev.txt` and puts it in your `tmp/` directory.

So let’s look at `config/environments/development.rb` and look for this section in particular.

```ruby
if Rails.root.join('tmp/caching-dev.txt').exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      'Cache-Control' => "public, max-age=#{2.days.seconds.to_i}"
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end
```

In our development environment, this means what rails will look to see if there is a caching-dev.txt file in our tmp/ directory. If that file exists, it will enable caching. If it does not, no caching. So you can turn off caching either by running rails dev:cache again or you can just delete the file. 

What does `'Cache-Control' => "public, max-age=#{2.days.seconds.to_i}"` do?

(Don't forget to restart your server after making this change)

Why do you need to restart your server?

## Step 2 — cache 'em all!

By now you've probably noticed that our API call to get image data for a given artist is taking forever! If you take a look at the `ImageGateway`, you might notice why:

```ruby
  def self.get_images_for_artist(artist)
    sleep(3)
    response = conn.get("/v1/search", { query: artist })

    json = JSON.parse(response.body, symbolize_names: true)
    json[:photos][0]
  end
```

This API call isn't actually very slow, but this `sleep(3)` is simulating an operation that might not be very performant, and therefore might be a great candidate for caching. Sometimes, API calls *can* actually be this slow, or they might require authentication flows that include multiple requests. In any case, slow or complex network calls are a great place to put caching to use. 

### Low-Level Caching

Take a look at the [Rails docs section on caching](https://guides.rubyonrails.org/caching_with_rails.html#low-level-caching-using-rails-cache) and try to play around with caching this request. Don't check out the drop-down below until you've tried this implementation solo or with a partner!

<section class="dropdown">
### Possible Implementation - Part I

**app/controllers/api/v1/images_controller.rb**
```ruby
class Api::V1::ImagesController < ApplicationController
  def show
    first_photo = Rails.cache.fetch("image_data", expires_in: 12.hours) do
      ImageGateway.get_images_for_artist(params[:artist])
    end

    render json: ImageSerializer.format_image(first_photo)
  end
end
```

</section>

At this point, our single image request can be done again and again and completed in no time. When testing this request out in Postman, you should be able to detect the difference between a response that calls out to the API, and a response that fetches from the cache. 

If we change the artist we're querying for, though, you might notice something off...

Why is nothing in the response changing?

### Cache Keys

Let's think back to the `PizzaShop` example from above.

In that case the "pizza type" we were providing was serving as a "key" -- a way of matching the specific piece of information we requested with what had already been stored in the cache.

If we didn't use pizza types to label the data in the cache, a user might come in asking for "pepperoni" pizza and get back "anchovy and blue cheese". Which is effectively what's happening in our current example.

We need our cache to hold different values based on the input coming in the request - in this case the artist parameter. Based on the Rails docs and your own ideas, what sort of solution can you come up with? Once you have a solution in place, take a look at the dropdown below. 

<section class="dropdown">
### Possible Implementation - Part II

**app/controllers/api/v1/images_controller.rb**
```ruby
class Api::V1::ImagesController < ApplicationController
  def show
    first_photo = Rails.cache.fetch("image_data_#{params[:artist]}", expires_in: 12.hours) do
      ImageGateway.get_images_for_artist(params[:artist])
    end

    render json: ImageSerializer.format_image(first_photo)
  end
end
```

</section>

## Step 3 - Cache Invalidation - A Tricky Question

Low-level caching in Rails is pretty straightforward! But how do we decide when cached data is 
no longer relevant? 

Can you identify a use case where cached data...
* might need to update within the hour?
* might need to be updated when a given event triggers it?
* might not need to be updated for several days?

<section class="dropdown">

### Possible Use Cases

* Within an hour: weather data
* Event-based: until a database operation updates the corresponding record
  * Keep in mind that Rails encourages caching only IDs or other identifying primitive data,
  rather than an ActiveRecord instance itself. Can you guess why?
* (Relatively) Longer-term caching: data pertaining to government officials retrieved from an external API
</section>

Deciding how to invalidate your cache can be one of the trickiest parts of caching. Performance and data 
integrity can seem at odds, and striking the right (or close-enough) balance is the key. 


### Further Exploration

- [AWS: Caching Challenges and Strategies](https://aws.amazon.com/builders-library/caching-challenges-and-strategies/)
- A different storage mechanism: We haven't really touched on the question of where the cached data is stored. By default rails actually uses the file system to store cached data. Can you update it to use Memcached instead? You'll want to use [this section](http://guides.rubyonrails.org/caching_with_rails.html#activesupport-cache-memcachestore) of the Rails guides as well as some googling to get started. Some of the issues you'll need to address include: installing memcached (via brew); using the dalli gem to access it; configuring rails to use memcached as its cache store.
- [Redis to a Ruby on Rails Application](https://yaasir007.medium.com/redis-to-a-ruby-on-rails-application-21c3105219a3)

## Checks for Understanding

Categorize each of these use cases as a case for caching, or a database.

* Storing the product list for fast rendering of the homepage of an online boutique.
* Storing long-living data about users and their accounts
* Storing results of expensive database queries for popular searches.
* Storing HTML fragments for quicker rendering
* Storing data with complex relationships, like a many-to-many relationship between a user and their environments
* Storing data that needs to reliably update, like a comment that a user created, and sees again when they return to the page weeks later
* Storing E-commerce inventory management data where stock levels are updated frequently.
* Tracking request counts for a user or IP to enforce limits.
* Storing an enormous volume of data


