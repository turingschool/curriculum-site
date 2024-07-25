---
title: Intro to Building an API in Rails
length: 60
layout: page
---

## Learning Goals

- Understand how an API works at a conceptual level
- Understand what makes a valid JSON data structure


## APIs

API = Application Programming Interface

An API is effectively a "domain specific language" (DSL) between a system which can perform an instruction, and a user who wants to perform that instruction.

Ruby, as a language, has APIs. These are the Ruby methods like `.each` or `.new` or `def` to make methods. In this case, the "user" is you as a human, entering instructions for the Ruby interpreter to perform a task.

There are also "external" APIs, which is the more common use of the "API" term, and pertains to Internet-based information systems, such as GitHub, Google, Yelp, and so on, from whom we can send/retrieve data to perform a task. In this case, a tool like [Postman](https://www.postman.com/) or [Faraday](https://github.com/lostisland/faraday) is the "user", asking an external service to do an instruction like "fetch a list of public repos for the `turingschool` account"

The rest of this lesson will discuss APIs in the context of these external Internet-based "services".

## Why use (external, Internet-based) APIs?

APIs provide a means for us to transmit data between web-based applications without worrying about all the overhead associated with HTML.

- Create an application that uses client-side JavaScript to update a page without a full-page refresh.
    - eg, the front-end developer only needs to fetch a little bit of data, not a whole HTML page
- Provide a means for developers at other companies to use a service that we provide.
- Split the work of our application service into smaller application services that are each deployed separately (service-oriented architecture)

## Background: JSON

### Exploration

Discuss the examples of JSON linked below with a partner and describe what you notice.

- [Example 1](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#json_structure:~:text=application/json.-,JSON%20structure,-As%20described%20above)
- [Example 2](https://www.petfinder.com/developers/v2/docs/)

### More Notes To Read Later

[Here are more notes about JSON for API Development](/module2/resources/json_for_api_development)

## New Tools

Before we begin, let's take a look at some of the new tools you'll be using.

### JSON and Ruby

Let's play around with it in our `pry` consoles.

```bash
require 'json'
my_hash = { hello: "goodbye" }
puts JSON.generate(my_hash) #=> "{"hello":"goodbye"}"
puts  my_hash.to_json #=> "{"hello":"goodbye"}"
```

```bash
person = '{"name":"Jennifer Lopez","street":"641 Pine St.","phone":true,"age":50,"pets":["cat","dog","fish"]}'
parsed_person = JSON.parse(person) #=> {"name"=>"Jennifer Lopez", "street"=>"641 Pine St.", "phone"=>true, "age"=>50, "pets"=>["cat", "dog", "fish"]}
puts parsed_person
puts parsed_person['pets']
```

## Building an API in Rails

We will start by using a new `--api` flag when we call "rails new".

This flag should only create the following paths inside `/app/`:

- channels
- controllers
- jobs
- mailers
- models
- views

If you see `/app/assets` and `/app/helpers` in a project you started from new then you did not use the `--api`
 flag. You may get asked to start over! We don't want to create files and directories we don't need.

## Think about testing and TDD at a high level

- Can more of our code be tested in a way that feels more like unit testing?

### Using JSON in Rails Testing

- `get 'api/v1/items'`: submits a get request to your application
- `response`: captures the response to a given request 
- `JSON.parse(response)`: parses a JSON response


## Namespacing and Routing will be extra important!

You'll be building lots of "versioning" into your routes, to make URI paths like "/api/v1/something"

<section class="call-to-action">
#### Think Break

Why is it important to version our API?

</section>


### Using JSON in the Controller

```ruby
class MyController << ApplicationController
  def index
    render json: Item.all
  end
end
```

## OOP Principles at Play

Aim to have very "thin" controllers -- very little code. Remember that our data logic should live in the model.

The controller, then, will hand off the data from the model to a Serializer, which can be appropriately-named for the data it contains like TaskSerializer or something like that, and given the Object data from the database or other source.

## Checks for Understanding

- What are some reasons you'd want to create an API?
- At its core, what is JSON?
