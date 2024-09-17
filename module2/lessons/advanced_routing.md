---
title: Advanced Routing
layout: page
---
## Learning Goals

- Understand what the `resources` syntax in `routes.rb` generates for us.
- Understand what nesting `resources` in `routes.rb` generates for us.
- Understand the 5 pieces of information `rails routes` gives us.
- Use route helpers
- Understand the difference between namespacing and nested `resources`

## Vocabulary

- routes
- route helper
- namespace

## Set Up
For part of this lesson we'll use the [`advanced-routing-start`](https://github.com/turingschool-examples/set-list-api/tree/advanced-routing-start) branch of the Set List Tutorial.

## Warm Up

In your notebook, without using your computer, fill in the following table for the 5 RESTful routes for a generic "resource”

Include the following for each:

- Verb
- URI Pattern
- Controller#Action

<section class="dropdown">
### More RESTful Routes  

Did you know...

...when working with Rails as a monolith, using views instead of API endpoints, we actually have two additional RESTful routes.

Think about if we had the resource of :dogs and we wanted to create a new dog record. The user would first need to access a form to fill out information needed to create this dog. To access that form, the route would be
`get "/dogs/new"`
Once the user is done filling out the form and clicks `Submit`, the form will make an http request to `post "/dogs"` and the new record is created.

The last additional route in a Rails monolith is `get "/dogs/:id/edit"` which renders a form to edit a specific dog resource. When the `Submit` button is clicked, the form makes an http request to `patch "/dogs/:id"` (or `put "/dogs/:id"`) and updates that resource.

You can see these addition routes listed [here](https://guides.rubyonrails.org/v7.0.4/routing.html#resource-routing-the-rails-default:~:text=2.2%20CRUD%2C%20Verbs%2C%20and%20Actions). 

</section>

## Rails Resources

Rails gives us a handy shortcut for generating the 5 ReSTful routes in our routes.rb file. Open up any Rails app, such as SetList, and add the following line anywhere in your routes file:

**config/routes.rb**

```ruby
resources :dogs
```

Run `rails routes -c dogs` from the command line. The `-c` stands for controller, so it will only show you routes for the dogs.

Explore what this output gives you.

## Only/Except

You never want to create routes that you haven't implemented in your code. If you have `resources :dogs` in your routes file, but you haven't implemented the `DogsController#destroy` action, you would be exposing an unused route. Instead, we give our resource an `only` option to explicitly say which ReSTful routes we want created. For example, if we only wanted the dogs index, and create actions, we could put this in our routes file.

**config/routes.rb**

```ruby
resources :dogs, only: [:index, :create]
```

You can also use `except`, which will generate the 5 ReSTful routes *except* the ones specified.

**config/routes.rb**

```ruby
resources :dogs, except: [:destroy]
```

This would be the same as:

**config/routes.rb**

```ruby
resources :dogs, only: [:index, :show, :create, :update]
```

Note: Generally its better to use `only` and not `except` because it’s easier to think in terms of positive rather than negative, and it’s preferred to use `only` instead of `except` even if it results in longer code.

With a partner, refactor some of the ReSTful routes in SetList to use the `resources` syntax.

## Nested Resources

Some resources are logically dependent on other resources. In SetList, Songs can't exist without an Artist.

If we look in our routes for SetList, we'll see:

```ruby
post "/artists/:artist_id/songs", to: "songs#create"
```

When we want to make a new song, we need to know which artist we are making the song for. We can also accomplish this with the `resources` syntax by nesting with a `do` block:

```ruby
resources :artists do
  resources :songs
end
```

This will generate 5 ReSTful routes for artists *and* 5 ReSTful routes for songs that are nested under an artist. You can also use only/except for nested resources:

```ruby
resources :artists, only: [:show] do
  resources :songs, only: [:update]
end
```

Just like before, we only want to create the routes we need.

Take a moment to refactor the nested routes in SetList to use the `resources` syntax.

## What's the difference between Nested Resources and Namespacing?

Namespacing a route is an organizational tool that helps us categorize routes. Take a look at this routes file:

```ruby
	    resources :songs, only: [:index]
	    namespace :admin do
	      resources :songs, only: [:index, :show]
	    end
```

While this might look similar to nested resources, the routes it will produce are different. The paths listed under `namespace` will have `/admin/` tacked on the beginning of them, but `admin` itself is not a resource. It does not map to a database table like `artists` and it does not have associated IDs. In this case, prepending the routes with `admin` is purely for organization and categorization. Using namespacing is akin to putting existing routes in a folder called `admin`. Take a look at what `rails routes` will output for these routes. 

```ruby 
         Prefix 	Verb   	URI Pattern                	Controller#Action
           songs 	GET    	/songs(.:format)            songs#index
     admin_songs 	GET  		/admin/songs(.:format)      admin/songs#index
			admin_song 	GET    	/admin/songs/:id(.:format) 	admin/songs#show
```

When creating a controller for actions that come from namespaced routes, it's conventional to declare the namespace title as a module, like so:

`class Admin::SongsController < ApplicationController`

The path for the above controller in the application's file directory would likely be `controllers/admin/songs_controller.rb`. Note the `admin` sub-directory. 

## Route Helpers

If you run `rails routes`, you'll notice the first column is called "prefix". Rails will use the "prefix" column to build route helpers.

Route helpers will generate a path for you (note: just the path, not the VERB). All you have to do is append `_path` to the end of the prefix name. For example, if you have this in your routes:

```ruby
resources :dogs, only: [:index]
```

Then `rails routes -c dogs` should give you:

```bash
Prefix Verb URI Pattern     Controller#Action
  dogs GET  /dogs(.:format) dogs#index
```

Using that prefix `dogs` we can use `dogs_path` anywhere in our Rails app to generate the path `/dogs`.

Generally, any row in your `rails routes` output that does not include a prefix uses the same prefix as the line above it.

## Passing Parameters to Route Helpers

Some paths include parameters. For example:

```ruby
resources :dogs, only: [:show]
```

Gives you this `rails routes` output:

```bash
Prefix Verb URI Pattern         Controller#Action
   dog GET  /dogs/:id(.:format) dogs#show
```

You can’t generate the path using `dog_path`  because it is expecting to be passed an `:id`. Any time a route helper needs a dynamic parameter like `:id`, we MUST pass a value to the route helper. For example, `dog_path(29)` will generate `/dogs/29`.

We can also pass an object rather than the actual value of the parameter and Rails is smart enough to extract that object's id. This below, is considered best practice.

```ruby
journey = Artist.create(name: 'Journey')
visit artist_path(journey)
```

Be careful. If you forget to pass a parameter to a route helper that needs it, the error message will start to look like a "missing route" error. Read the ENTIRE error, and it will actually tell you that the route helper is missing a parameter.

## Practice

Refactor some of the code in setlist to use Route Helpers rather than hardcoded routes.

## Checks for Understanding

- What are the 5 ReSTful routes and their controller/actions?
- What routes would `resources :dogs, only: [:destroy, :index]` generate?
- What routes would the following generate?

```ruby
resources :owners, only: [:index] do
  resources :dogs, only: [:show]
end
```

- Why should you use `only`/`except`?
- How can you use the prefix column from `rails routes`?



Completed code can be found on the `advanced-routing-complete` branch [here](https://github.com/turingschool-examples/set-list-api/tree/advanced-routing-refactored).


## Additional Resources

- [Video](https://www.loom.com/share/604d8bb6a2dc41f6b97dd9a0dc01272f) 
- [Rails guides on routing](https://guides.rubyonrails.org/v7.0.4/routing.html#resource-routing-the-rails-default)
