---
layout: page
title: Seeding Data Efficiently
length: 180
tags: seeding, seed, rails
status: draft
---

## Learning Goals

* Understand how to seed data in Rails in a timely manner
* Know when to update the seed file in the development process
* How to use Faker
* How to set up relationships

## Setup: Building an Inefficient Seed File

Clone down the following repo:

```
git clone -b seeding_data https://github.com/turingschool-examples/storedom.git seeding_data  
bundle - you may need to bundle update  
rake db:create  
rake db:migrate  
```

Typically in a Rails app, you'll seed the database by using the rake task 'rake db:seed', which runs the ruby file 'db/seeds.rb'.

### Iteration 1: Creating Records  
Create some data:  
  4 users w/ name and email  
  4 items w/ name, description, and image_url   

#### Create one user

```ruby
User.create!(name: "Chad Clancey", email: "cclancey@example.com")
```

#### Create four users

```ruby
User.create!(name: "Lauren", email: "lauren@example.com")
User.create!(name: "Josh", email: "josh@example.com")
User.create!(name: "Sally", email: "sally@example.com")
User.create!(name: "Chaz", email: "chaz@example.com")
```

#### Create an item

```ruby
Item.create!(
  name: "Red Panda",
  description: "Small arboreal mammal native to the eastern Himalayas and southwestern China ",
  image_url: "http://robohash.org/1.png?set=set2&bgset=bg1&size=200x200"
  )
```

#### Create four items

```ruby
  Item.create!(
    name: "Red Panda 1",
    description: "Small arboreal mammal native to the eastern Himalayas and southwestern China ",
    image_url: "http://robohash.org/1.png?set=set2&bgset=bg1&size=200x200"
  )

  Item.create!(
    name: "Red Panda 2",
    description: "Small arboreal mammal native to the eastern Himalayas and southwestern China ",
    image_url: "http://robohash.org/2.png?set=set2&bgset=bg1&size=200x200"
  )

  Item.create!(
    name: "Red Panda 3",
    description: "Small arboreal mammal native to the eastern Himalayas and southwestern China ",
    image_url: "http://robohash.org/3.png?set=set2&bgset=bg1&size=200x200"
  )

  Item.create!(
    name: "Red Panda 4",
    description: "Small arboreal mammal native to the eastern Himalayas and southwestern China ",
    image_url: "http://robohash.org/4.png?set=set2&bgset=bg1&size=200x200"
  )
```

What are the downsides to this approach?

## Why Seeding Data Efficiently Matters

* Setting up each record by hand takes quite a bit of time that could be used doing something else
* You might have already seen or will see at some point in the future the 300+ line seed file
* Problems of seeding generally stem from doing too much manual / hard-coded work
* We should treat our seed file as just another piece of code (aka make it Object Oriented)
* Use methods as abstractions for common operations
* Use libraries to generate data we need (often randomized data to simulate real users)
* Use Rails / ActiveRecord idioms to pre-fill relationships in a straightforward way
* Use loops and parameterization to control repeated seeding

## Iteration 2: Removing Duplication

Manually entering all these details is tedious and becomes difficult to maintain over time. We should automate the seed data that doesn't really matter. We are going to use the [Faker](https://github.com/stympy/faker) gem for this.

```ruby
# Gemfile
gem 'faker'
```

There are several different types of data that you can specify with the gem. We'll touch on a few here. Check out the docs for a more extensive list of what's available. Let's update our `User` creation to automatically fill in the name and email.

```ruby
User.create!(name: Faker::Name.name, email: Faker::Internet.email)
User.create!(name: Faker::Name.name, email: Faker::Internet.email)
User.create!(name: Faker::Name.name, email: Faker::Internet.email)
User.create!(name: Faker::Name.name, email: Faker::Internet.email)
```

We can do something similar with item creation as well. Update your code to look something like this.

```ruby
Item.create!(
  name: Faker::Commerce.product_name,
  description: Faker::Lorem.paragraph,
  image_url: "http://robohash.org/1.png?set=set2&bgset=bg1&size=200x200"
)
```

While this is an improvement, there is clearly some duplication that could be inefficient to maintain. For example, if we add a new column to one of tables we need to update all of the calls to `User.create` and `Item.create`. What if we want to create 1000 users and 10000 items?

Let's create a loop that will create the data instead. It's also nice to know what our seed file is doing so we'll add a `puts` statement stating where we are at.

```ruby
10.times do |i|
  user = User.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email
    )
  puts "User #{i}: #{user.name} - #{user.email} created!"
end
```

```ruby
100.times do |i|
  item = Item.create!(
    name: Faker::Commerce.product_name,
    description: Faker::Lorem.paragraph,
    image_url: Faker::Avatar.image
    )
  puts "Item #{i}: #{item.name} created!"
end
```

## Iteration 3: Object Oriented Seeds

Many would stop here. We're going to go one step further and make our seed file object oriented.

* Create a `Seed` class.
* Create a method for each record generation (`generate_users`, `generate_items`, `generate_orders`)
* Create class method `start` that initializes the `Seed` class and generates the records

Our final seed file should look something like this:

```ruby
# db/seeds.rb

class Seed
  def self.start
    seed = Seed.new
    seed.generate_users
    seed.generate_items
    seed.generate_orders
  end

  def generate_users
    50.times do |i|
      user = User.create!(
        name: Faker::Name.name,
        email: Faker::Internet.email
        )
      puts "User #{i}: #{user.name} - #{user.email} created!"
    end
  end

  def generate_items
    500.times do |i|
      item = Item.create!(
        name: Faker::Commerce.product_name,
        description: Faker::Lorem.paragraph,
        image_url: Faker::Avatar.image
        )
      puts "Item #{i}: #{item.name} created!"
    end
  end

  def generate_orders
    100.times do |i|
      user  = User.find(Random.new.rand(1..50))
      order = user.orders.create!()
      add_items(order)
      puts "Order #{i}: Order for #{user.name} created!"
    end
  end

  private

  def add_items(order)
    10.times do |i|
      item = Item.find(Random.new.rand(1..500))
      order.items << item
      puts "#{i}: Added item #{item.name} to order #{order.id}."
    end
  end
end

Seed.start
```

## Going Forward

We challenge you to follow best OO practices in your seed file and to use the above as an example! 
