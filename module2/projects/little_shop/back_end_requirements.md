---
layout: page
title: Little Shop BE Requirements
length: 1 week
tags:
type: project
---



_[Back to Little Shop Home](./index)_

<section class="dropdown">
### Setup

1. Create a Rails API project called `little_shop` (make sure you do not set up a "traditional" Rails project with a frontend, this is an API-only project). `rails new little_shop -T -d="postgresql" --api`

2. Set Up [SimpleCov](https://github.com/colszowka/simplecov) to track test coverage in your little_shop API project.

3. Download [little_shop_development.pgdump](./little_shop_development.pgdump) and move it into the `/db/` folder in another folder called `/data/`, so your project files look like this:
```
/app
/bin
/config
/db
  /data                             <-- create this folder
    little_shop_development.pgdump <-- put the file in the data folder
  seeds.rb                          <-- seeds.rb is in `/db/folder, not `/db/data/`
/lib
/log
etc
```
  - this file is in a binary format and your browser may try to automatically download the file instead of viewing it

1. Set up your `db/seeds.rb` file with the following content:
```ruby
cmd = "pg_restore --verbose --clean --no-acl --no-owner -h localhost -U $(whoami) -d little_shop_development db/data/little_shop_development.pgdump"
puts "Loading PostgreSQL Data dump into local database with command:"
puts cmd
system(cmd)
```

1. Run `rails db:{drop,create,migrate,seed}` and you may see lots of output including some warnings/errors from `pg_restore` that you can ignore. If you're unsure about the errors you're seeing, ask an instructor.

2. Run `rails db:schema:dump` - Check to see that your `schema.rb` exists and has the proper tables/attributes that match the data in Postico. You can do the following to check to see if you have set up rails to effectively communicate with the database.
  * Add a `customer.rb` file to your models directory
  * Create a `Customer` class that inherits from `ApplicationRecord`
  * run `rails c` to jump into your rails console.
  * run `Customer.first` to see the object: `#<Customer id: 1, first_name: "Joey", last_name: "Ondricka", created_at: "2012-03-27 14:54:09", updated_at: "2012-03-27 14:54:09">`
  * run `Customer.last` to see the object: `#<Customer id: 1000, first_name: "Shawn", last_name: "Langworth", created_at: "2012-03-27 14:58:15", updated_at: "2012-03-27 14:58:15">`
  * If this all checks out you should be good to go.

3. Use a tool like Postico to examine the 6 tables that were created. Pay careful attention to the merchants, items, invoices and customers table. It's a good idea to use a database visualizer like [DBDesigner](https://www.dbdesigner.net/) to create a visual schema for your team. Be mindful of the data types of each field:
  * merchants
  * items
  * customers
  * invoices
  * invoice_items
  * transactions

**NOTE** The main learning goals of the project are the Rails API endpoints, not the process of importing CSV data. Avoid starting out with a Rake task to do the import and follow these instructions instead. If in doubt, ask your instructors first.

**NOTE** If your `rails new ...` project name from above is NOT exactly called "little_shop" you will need to modify the `cmd` variable to change the `-d` parameter from `little_shop_development` to `<YOUR PROJECT NAME>_development` instead. If you have questions, ask your instructors.


Finally, commit your setup steps and push to a new repo. Share that new repo with your project partner(s). Be sure to add them as a collaborator.
</section>

<section class="dropdown">
### Connecting to the FE

Due to policies around `Cross-Origin Resource Sharing` (CORS), there is some additional configuration required in your API in order to allow our back end and front end applications to communicate with each other. We basically need to allow our API to **accept requests from our front end application** rather than blocking them for security reasons. It is the software development equivalent of *stranger danger*.  We'll talk more about CORS in module 3, so don't worry about understanding the details of this configuration or the motivation behind it quite yet. If you're curious, you can read more about it [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). 

Requirements for handling CORS:
1. Add the gem `rack-cors` to your Gemfile. It should already be commented out in your Gemfile as it comes baked into every Gemfile. You'll just need to uncomment it and run `bundle install`
2. In the `config/initializers/cors.rb` file, you'll need to add the following code:
```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "localhost:5173"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end

```

What's happening here?
- Our front end application will run locally on our machine on port 5173
- We're telling our Rails app that we trust requests coming from our front end application, so we can add its base URL (`localhost:5173`) as an origin.
- We'll accept any request from this origin, including any headers and any HTTP methods. We're whitelisting all of them! 

**With these 2 small changes, our applications will be able to communicate with each other**

</section>




<section class="dropdown">
### Postman

By importing the JSON files noted below, you can open the Postman "Runner" and execute a large suite of tests.

**Note: not ALL of the Postman tests will be passing in order to pass the project**. You will need to examine the tests you NEED to run, since we're giving students some choice in how to build the application.

#### Importing the Test Suite

Download the test suites for Postman:
* [Little Shop BE, Section 1](./LittleShopBE,Part1.postman_collection.json)
* [Little Shop BE, Section 2](./LittleShopBE,Part2.postman_collection.json)

Click on each link to load it in your browser, then hit Cmd-S to save it to your system.

In Postman, in the top left corner, click on the "Import" button, and use the file selector to locate the two files on your operating system.


Within your collections in Postman, you should see two collections-- "Little Shop BE, Part 1", and "Little Shop BE, Part 2". 

#### Running the Tests

There are two ways to run the test suite: one endpoint at a time, or the whole suite.

#### Running one endpoint at a time

As you develop your endpoints, run `rails s` and find the appropriate endpoint within the Postman collection you imported. For example, "Get All Merchants". When you select "Get All Merchants" from the list, you should see a Postman tab open, pre-populated with everything you need to connect to the endpoint in your code and see if it works correctly.

Click the "Send" button in the top right corner.

In the lower portion of the Postman interface, you should see "Body", "Cookies", "Headers" and a spot that says something like "Test Results (7/7)". This would indicate that 7 tests passed out of 7. If you see, for example, 3/7 then 3 tests passed and 4 did not.

You can click on the "Test Results (7/7)" to see which tests passed.

The error messages aren't that great, but we're here to help you diagnose the problems.

#### Running the full test suite

In the bottom right corner of the Postman interface, you'll see a "Runner" button. Click that and a new panel will appear. From here, you can drag one of the two "Little Shop" collections to the right side of the screen.

Next, you can select/deselect which tests you'd like to run. Finally, click the "Run Little Shop" button.

As it runs, it will show you which tests are passing or failing.
</section>

<section class="dropdown">
### API Endpoints, general definitions

## Your BE Application

In total, the MINIMUM requirement for the BE portion of this project will be 16 endpoints:

* Section One has 14 endpoints (some with additional features via query parameters)
* Section Two has 2 endpoints


You may choose to divide these up between your project partners in whatever way seems best. One pair could handle the Merchant stories, and one pair could handle the Item and additional endpoints. You may also decide to work on the first story/stories together to have a solid understanding first before dividing and conquering. 

All of your endpoints should follow these technical expectations:

* All endpoints should be fully tested for happy path AND sad path. **The Postman tests are not a substitute for writing your own tests.**
  * As an extension, you can explore integrating testing gems such as [FactoryBot](https://github.com/thoughtbot/factory_bot/blob/master/GETTING_STARTED.md) and/or [Faker](https://github.com/faker-ruby/faker#default) into your projects.
* All endpoints will expect to return JSON data only
* All endpoints should be exposed under an `api` and version (`v1`) namespace (e.g. `/api/v1/items`)
* API will be compliant to the [JSON API spec](https://jsonapi.org/) and match our requirements below precisely
  * if your tests pass but the Postman test does not, you have done something wrong.
* Controller actions should be limited to only the standard Rails actions and follow good RESTful convention.
* Endpoints such as `GET /api/v1/merchants/find?parameters` will NOT follow RESTful convention, and that's okay:

```ruby
module Api
  module V1
    class MerchantsController
      # code omitted
      def find
        # code omitted
      end
    end
  end
end
```

This approach can lead to large controllers. For more info on the reasons why, check out this [blog post](http://jeromedalbert.com/how-dhh-organizes-his-rails-controllers/).

Instead try something like this which adheres to the above approach of only using RESTful actions:

```ruby
module Api
  module V1
    module Merchants
      class SearchController
        def show
        # code omitted
        end
      end
    end
  end
end
```
<section class="dropdown">
#### Error Responses

If the user causes an error for which you are sending a 400-series error code, the JSON body of the response should follow this format:

```json
{
  "message": "your query could not be completed",
  "errors": [
    "string of error message one",
    "string of error message two",
    "etc"
  ]
}
```

You can customize the value of the `message` element, but the `message` element must be present.

The `errors` element will always be an array and contain one or more strings of why the user's request was unsuccessful. Examples will include a "ID was invalid" in the case of a 404, or "the 'description' parameter was missing"

#### DRY Exception Handlers in Code

As part of the project, we're requiring students to try to refactor exception handling and sad path logic in their controllers as much as possible. Take a look at [this page](https://curriculum.turing.edu/module2/lessons/dry_exception_handling) to learn more about some options. 

#### Sad Path vs Edge Case

Sad Path: the user did something which didn't cause an _error_ but didn't work out the way they'd hoped. For example, searching for a merchant by name and getting zero results is a "sad path"

Edge Case: the user did something which broke the functionality of an endpoint. For example, a user searches for an item based on a negative price, or searching between revenue dates where the end date comes before the start date.
</section>

<section class='call-to-action'>
## Minimum Requirements:
### SECTION ONE: RESTful Endpoints

You will need to expose the following RESTful API endpoints for the following:

* Merchants:
  * get all merchants
    * get all merchants sorted by newest to oldest
    * get all merchants with returned items (check invoice)
    * get all merchants with calculated count of items
  * get one merchant
  * create a merchant
  * edit a merchant
  * delete a merchant
  * get all items for a given merchant ID

* Items:
  * get all items
  *   get all items sorted by price (low to high)
  * get one item
  * create an item
  * edit an item
  * delete an item
  * get the merchant data for a given item ID

* Additional RESTful endpoints
  * get all customer names for a given merchant
  * get all invoices for a given merchant, filtered by status


### SECTION TWO: Non-RESTful Search Endpoints

You will get to choose ONE group of endpoint pairs from the following list:

**A. One Merchant & All Items:**
  * Find one MERCHANT based on search criteria, and
  * Find all ITEMS based on search criteria

Or, 

**B. One Item & All Merchants:**
  * Find one ITEM based on search criteria, and
  * Find all MERCHANTS based on search criteria

</section>
</section>

<section class="dropdown">
### SECTION ONE: RESTful Requests - More Detail
<section class="dropdown">
### 1. Fetch all Items/Merchants

These "index" endpoints for items and merchants should:

* render a JSON representation of all records of the requested resource
* always return an array of data, even if one or zero resources are found
* NOT include dependent data of the resource (e.g., if you're fetching merchants, do not send any data about merchant's items or invoices)
* follow this pattern: `GET /api/v1/<resource>`

### Example JSON response for the Merchant resource:

```json
{
  "data": [
    {
      "id": "1",
        "type": "merchant",
        "attributes": {
          "name": "Mike's Awesome Store",
        }
    },
    {
      "id": "2",
      "type": "merchant",
      "attributes": {
        "name": "Store of Fate",
      }
    },
    {
      "id": "3",
      "type": "merchant",
      "attributes": {
        "name": "This is the limit of my creativity",
      }
    }
  ]
}
```

For "Fetch all" endpoints that have a condition (i.e. sorted, filtered, etc.), the following parameters should be added to the request to indicate what type of condition should be included in the response:

* `?sorted=age` on the merchants index to sort merchants by created_at timestamp, newest first
* `?sorted=price` on the items index to sort items by price, cheapest first
* `?status=returned` on the merchants index to include only merchants that have had items from an invoice returned (hint: look at merchant's invoices)
* `?count=true` on the merchants index to include the calculated `item_count` attribute (see below)

**Calculated Attribute**

One of the merchant endpoints requires the ability to add a calculated count attribute for every merchant, indicating the number of items the merchant has. This calculated attribute should be added to every merchant, in the attributes section, as see below:

```json
{
  "data": [
    {
      "id": "1",
        "type": "merchant",
        "attributes": {
          "name": "Mike's Awesome Store",
          "item_count": 14
        }
    },
    {
      "id": "2",
      "type": "merchant",
      "attributes": {
        "name": "Store of Fate",
        "item_count": 24
      }
    }
  ]
}
```


</section>

<section class="dropdown">
### 2. Fetch a single record

This endpoint for Items and Merchants should:

* render a JSON representation of the corresponding record, if found
* follow this pattern: `GET /api/v1/<resource>/:id`

### Example JSON response for the Item resource:

```json
{
  "data": {
    "id": "1",
    "type": "item",
    "attributes": {
      "name": "Super Widget",
      "description": "A most excellent widget of the finest crafting",
      "unit_price": 109.99
    }
  }
}
```

Note that the `unit_price` is sent as numeric data, and not string data.

### Example JSON response for the Merchant resource:

```json
{
  "data": {
    "id": "1",
    "type": "merchant",
    "attributes": {
      "name": "Crafty Coders"
    }
  }
}
```

<hr/>
</section>

<section class="dropdown">
### 3: Create an Item/Merchant

This endpoint should:

* create a record and render a JSON representation of the new Item or Merchant record.
* follow this pattern: `POST /api/v1/items` or `POST /api/v1/merchants`
* accept the following JSON body with only the following fields:

### Item:
```json
{
  "name": "value1",
  "description": "value2",
  "unit_price": 100.99,
  "merchant_id": 14
}
```
(Note that the unit price is to be sent as a numeric value, not a string.)

### Merchant: 
```json
{
  "name": "merchant_name"
}
```

* return an error if any attribute is missing
* should ignore any attributes sent by the user which are not allowed

### Example JSON response for the Item resource:

```json
{
  "data": {
    "id": "16",
    "type": "item",
    "attributes": {
      "name": "Widget",
      "description": "High quality widget",
      "unit_price": 100.99,
      "merchant_id": 14
    }
  }
}
```

### Example JSON response for the Merchant resource:

```json
{
  "data": {
    "id": "16",
    "type": "merchant",
    "attributes": {
      "name": "Toys R Us"
    }
  }
}
```

<hr/>
</section>

<section class="dropdown">
### 4: Update an Item or Merchant

This endpoint should:

* update the corresponding resource (if found) with whichever details are provided by the user
* render a JSON representation of the updated record.
* follow this pattern: `PATCH /api/v1/items/:id` or `PATCH /api/v1/merchants/:id`
* Merchant Update: accept a JSON body with a new name value, and no other attributes
* Item Update: accept the following JSON body with one or more of the following fields:
The body should follow this pattern:

```json
{
  "name": "value1",
  "description": "value2",
  "unit_price": 100.99,
  "merchant_id": 7
}
```
(Note that the unit price is to be sent as a numeric value, not a string.)

### Example JSON response for the Item resource:

```json
{
  "data": {
    "id": "1",
    "type": "item",
    "attributes": {
      "name": "New Widget Name",
      "description": "High quality widget, now with more widgety-ness",
      "unit_price": 299.99,
      "merchant_id": 7
    }
  }
}
```

### Example JSON response for the Merchant resource:

```json
{
  "data": {
    "id": "1",
    "type": "merchant",
    "attributes": {
      "name": "New Toy Store Name"
    }
  }
}
```
<hr/>
</section>

<section class="dropdown">
### 5: Destroy an Item or Merchant

This endpoint should:
* destroy the corresponding record (if found) and any associated data
* NOT return any JSON body at all, and should return a `204`` HTTP status code
* NOT utilize a Serializer (Rails will handle sending a `204` on its own if you just `.destroy` the object)

<hr/>
</section>

<section class="dropdown">
### 6. Relationship Endpoints

These endpoints should show related records for a given resource. The relationship endpoints you should expose are:

* `GET /api/v1/merchants/:id/items` - return all items associated with a merchant.
  * return a 404 if merchant is not found
* `GET /api/v1/items/:id/merchant` - return the merchant associated with an item
  * return a 404 if the item is not found

</section>

<section class="dropdown">
### 7. Get All Customers for a Merchant

This endpoint should:

* render a JSON representation of all customers that have an invoice associated with the given merchant
* always return an array of data, even if one or zero resources are found
* NOT include dependent data of the resource (e.g., don't include the invoice information in the response, just the customer data)
* follow this pattern: `GET /api/v1/merchants/:merchant_id/customers`

### Example JSON response:

```json
{
  "data": [
    {
      "id": "7",
        "type": "customer",
        "attributes": {
          "first_name": "Parker",
          "last_name": "Daugherty"
        }
    },
    {
      "id": "25",
        "type": "customer",
        "attributes": {
          "first_name": "Kirstin",
          "last_name": "Wehner"
        }
    },
    {
      "id": "29",
        "type": "customer",
        "attributes": {
          "first_name": "Albina",
          "last_name": "Erdman"
        }
    }
  ]
}
```
</section>

<section class="dropdown">
### 8. Get All Invoices for Merchant Based on Status

This endpoint should:

* render a JSON representation of all invoices for a given merchant that have a status matching the desired status query parameter
* always return an array of data, even if one or zero resources are found
* Only allow the `status` query parameter to be sent in, and only with the following values: `shipped`, `returned` or `packaged`
* follow this pattern: `GET /api/v1/merchants/:merchant_id/invoices?status=<status>`

### Example JSON response:

```json
{
  "data": [
    {
      "id": "86",
        "type": "invoice",
        "attributes": {
          "customer_id": "17",
          "merchant_id": "3",
          "status": "shipped"
        }
    },
    {
      "id": "186",
        "type": "invoice",
        "attributes": {
          "customer_id": "39",
          "merchant_id": "3",
          "status": "shipped"
        }
    },
    {
      "id": "318",
        "type": "invoice",
        "attributes": {
          "customer_id": "67",
          "merchant_id": "3",
          "status": "shipped"
        }
    }
  ]
}
```

</section>
</section>


<section class="dropdown">
### SECTION TWO: Non-RESTful Search Endpoints - More detail

As a reminder, for Section Two you should choose a group of endpoints to implement, either: 

**A. One Merchant & All Items:**
  * Find one MERCHANT based on search criteria, and
  * Find all ITEMS based on search criteria

Or, 

**B. One Item & All Merchants:**
  * Find one ITEM based on search criteria, and
  * Find all MERCHANTS based on search criteria

Once you choose the group you are implementing, you will build the corresponding endpoints which will NOT follow RESTful convention. For example:

* `GET /api/vi/items/find`, find a single item which matches a search term
* `GET /api/vi/items/find_all`, find all items which match a search term
* `GET /api/vi/merchants/find`, find a single merchant which matches a search term
* `GET /api/vi/merchants/find_all`, find all merchants which match a search term

These endpoints will make use of query parameters as described below:
<section class="dropdown">
### 9. "Find One" endpoints

These endpoints should:

* return a single object, if found
* return the first object in the database in case-insensitive alphabetical order if multiple matches are found
  * e.g., if "Ring World" and "Turing" exist as merchant names, "Ring World" would be returned, even if "Turing" was created first
* allow the user to specify a 'name' query parameter:
  * for merchants, the user can send `?name=ring` and it will search the `name` field in the database table
  * for items, the user can send `?name=ring` and it will search the `name` field in the database table
  * the search data in the `name` query parameter should require the database to do a case-insensitive search for text fields
    * e.g., searching for 'ring' should find 'Turing' and 'Ring World'
* allow the user to send one or more price-related query parameters, applicable to items only:
  * `min_price=4.99` should look for anything with a price equal to or greater than $4.99
  * `max_price=99.99` should look for anything with a price less than or equal to $99.99
  * both `min_price` and `max_price` can be sent
* for items, the user will send EITHER the `name` parameter OR either/both of the `price` parameters
  * users should get an error if `name` and either/both of the `price` parameters are sent

### Valid examples:
* `GET /api/v1/merchants/find?name=Mart`
* `GET /api/v1/items/find?name=ring`
* `GET /api/v1/items/find?min_price=50`
* `GET /api/v1/items/find?max_price=150`
* `GET /api/v1/items/find?max_price=150&min_price=50`

### Invalid examples:
* `GET /api/v1/<resource>/find`
  * parameter cannot be missing
* `GET /api/v1/<resource>/find?name=`
  * parameter cannot be empty
* `GET /api/v1/items/find?name=ring&min_price=50`
  * cannot send both `name` and `min_price`
* `GET /api/v1/items/find?name=ring&max_price=50`
  * cannot send both `name` and `max_price`
* `GET /api/v1/items/find?name=ring&min_price=50&max_price=250`
  * cannot send both `name` and `min_price` and `max_price`

### Example JSON response for `GET /api/v1/merchants/find?name=ring`

```json
{
  "data": {
    "id": 4,
    "type": "merchant",
    "attributes": {
      "name": "Ring World"
    }
  }
}
```

<hr/>
</section>

<section class="dropdown">
### 10. "Find All" endpoints

These endpoints will follow the same rules as the "find" endpoints.

The JSON response will always be an array of objects, even if zero matches or only one match is found.

It should not return a 404 if no matches are found.

### Example JSON response for `GET /api/v1/merchants/find_all?name=ring`

```json
{
  "data": [
    {
      "id": "4",
      "type": "merchant",
      "attributes": {
        "name": "Ring World"
      }
    },
    {
      "id": "1",
      "type": "merchant",
      "attributes": {
        "name": "Turing School"
      }
    }
  ]
}


```

</section>
</section>

<section class="dropdown">
### BE Deployment (Required)

Groups are required to deploy this API to the Internet, using either Heroku or Render. To avoid difficult deployment troubleshooting, please deploy early and deploy often! To use Heroku, follow [these instructions](https://devcenter.heroku.com/articles/getting-started-with-rails7) and don't forget to provision a database! If you're using Render, check out our guide [here](https://curriculum.turing.edu/module2/lessons/deployment_guide)
</section>

<section class="call-to-action">

### See FE Requirements [here](front_end_requirements)
</section>
