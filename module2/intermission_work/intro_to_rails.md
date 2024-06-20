---
layout: page
title: Introduction to Ruby on Rails
---

## What _is_ Ruby on Rails?

In module 2 you'll be building web applications with the Ruby on Rails framework. What does that mean, exactly?

Consider:
 - How did you interact with your code in your projects from Mod 1?
 - What is the difference between software that runs locally and software that runs on the internet?

From the [Rails documentation](https://guides.rubyonrails.org/getting_started.html):

> Rails is a web application development framework written in the Ruby programming language. It is designed to make programming web applications easier by making assumptions about what every developer needs to get started. It allows you to write less code while accomplishing more than many other languages and frameworks. Experienced Rails developers also report that it makes web application development more fun.

While many web application development frameworks exist, Ruby on Rails is a popular choice due to its established community, robust and well-documented built in tools, and ease of rapid development. Many popular applications started as Rails projects (such as Twitter and Airbnb), including some that are mostly or entirely maintained with Rails to this day (like GitHub and Shopify).

### Web Applications

In order to create web applications that other people can access and use on the internet, we must utilize HyperText Transfer Protocol. This is the protocol used for sending data from your browser to a web server, then getting data back from the server. To understand the benefits of Rails, it’s important to know the basics of the **HTTP request/response cycle**.

With HTTP, one machine acts as a client and another machine acts as a server. When a client requests information from the server, the server sends back some kind of response. This information exchange follows certain rules so that both machines understand each other. 

Every client request has many parts, but for now we’ll focus on the request containing a **verb** and a **path** (also known as a URI). This tells the server WHAT information is being requested, and HOW that information is being requested. If an HTTP verb is, well, a verb— the path is analogous to a ‘noun.’

We could type `https://backend.turing.edu/module2/intermission_work` into our browser's address bar, which would act as a client and send a request over HTTP to the `backend.turing.edu` server:

```
GET /module2/intermission_work
```

It is then the server's responsibility to interpret this request, find the module 2 intermission work data, and send that data back to the client in the response body.

### Why do we need Rails?

It is possible to create a server and handle HTTP requests using Ruby alone, but it is a tedious process. One project we've assigned in the past explores HTTP, servers, and clients in Ruby: [HTTP Yeah You Know Me](https://backend.turing.edu/module1/projects/http_yeah_you_know_me).

Here are some other basic HTTP servers made with Ruby. You don't need to build these or follow any tutorials, just take 10 minutes to look at 1-2 of these examples and try to guess what the code is doing.

- [Simple HTTP Server](https://github.com/esteedqueen/simple-http-server)
- [Simplest Ruby HTTP Server](https://github.com/alphabet/simplest_ruby_http_server)
- [https://www.mikeperham.com/2023/09/11/ruby-http-server-from-scratch/](https://www.mikeperham.com/2023/09/11/ruby-http-server-from-scratch/)

Next, watch [this video]() covering the basics of what is included in Ruby on Rails.

### Convention over Configuration

As a Rails developer, you’ll hear the phrase "Convention over Configuration" a LOT. The philosophy behind this phrase is that the less time you spend making small choices about basic setup and code organization, the more cognitive resources you’ll be able to spend building cool stuff.

Because of this, Rails is "opinionated." It will expect you to build things in a certain way. For example, Rails controllers accept incoming HTTP requests and decide what HTML view file to return in the response body. By default, Rails will look at the _names of your files_ in order to make this decision, instead of forcing you to explicitly write those directions.

New Rails projects also come with a _lot_ of boilerplate code for configuring middleware, ports, environment setup, etc. It saves time by assuming we want to start every web application the same way.

### Database Management and an Object Relational Mapper

Ruby on Rails comes with an ORM (Object Relational Mapper) called [ActiveRecord](https://guides.rubyonrails.org/active_record_basics.html). ORMs allow us to connect **objects** to persisted rows of data in the database, making them much easier to work with.

In an application that manages data about Artists and Songs, we could write a SQL query to retrieve all songs in the database:

```sql
set_list_7_development=# SELECT * FROM songs;
```

Or, we could write an ActiveRecord query:

```ruby
irb(main):001:0> Song.all
```

The second approach is much more Ruby-like and intuitive. Additionally, the ActiveRecord syntax will return **model** objects instead of raw data, which means we can define custom behavior for these records.

```ruby
class Song < ApplicationRecord
  belongs_to :artist

  def self.songs_by_artist(artist_id)
    where(artist_id: artist.id)
  end
end
```

An instance of this class might remind you of creating object instances in plain Ruby:

```
#<Song:0x00000001143d9540 id: 10, title: "I Can Change", length: 640, play_count: 100000, created_at: Tue, 18 Jun 2024 16:33:42.099019000 UTC +00:00, updated_at: Tue, 18 Jun 2024 16:33:42.099019000 UTC +00:00, artist_id: 6>
```

Don't worry too much about what every line of code is doing in the snippet above, or how. We'll get into all of these concepts in more detail during Mod 2.

### Putting it all together

Let's go through the the high level flow of an HTTP request and response in Rails. This example assumes we have already set up a database and created some rows in those database tables (something you'll get practice with later in Mod 2).

_Optional: clone [this repo](https://github.com/turingschool-examples/intro_to_ror_demo/tree/main) to follow along with the steps in the video._

Watch this video: [Observing an HTTP request and response in Rails]()

## Check for Understanding

- What does "convention" mean?
- What does "configuration" mean?
- When it comes to web applications, how is data requested (and delivered)?
- What are the high level steps of handling an HTTP request in a Rails application?

## Further reading

- [The Rails Doctrine](https://rubyonrails.org/doctrine)
- [Web frameworks](https://en.wikipedia.org/wiki/Web_framework)
- [RailsGuides Documentation](https://guides.rubyonrails.org/index.html)