---
layout: page
title: Hang In There API Requirements
length: 1 week
tags:
type: project
---
<style>
summary:hover {
  background-color: #bbe5fa;
}
</style>


_[Back to Hang In There API Home](./index)_
## 1. Setup

1. Create a Rails API project called `hang_in_there_api` with the command `rails new hang_in_there_api -T -d="postgresql" --api`

2. Add your gems to your `development, test` section in the Gemfile:
    * rspec-rails
    * pry
    * simplecov

3. Run the following commands to get started: 
    ```bash
    $ cd hang_in_there_api
    $ bundle install
    $ rails db:create
    $ rails g rspec:install
    ```

4. Your database will have one table: `posters`. Use migrations to create this table with the following attributes:

    * `id` as integer
    * `name` as string
    * `description` as string
    * `price` as float
    * `year` as integer
    * `vintage` as boolean
    * `img_url` as string
    * `created_at` as timestamp
    * `updated_at` as timestamp

5. It will make it easier to test as you develop if you create some seeds in your `seeds.rb` file. You can use the following pattern to create seed data.
  ```ruby
    Poster.create(name: "REGRET",
                  description: "Hard work rarely pays off.",
                  price: 89.00,
                  year: 2018,
                  vintage: true,
                  img_url:  "https://plus.unsplash.com/premium_photo-1661293818249-fddbddf07a5d")
  ```

6. Finally, commit your setup steps and push to a new repo. Share that new repo with your project partner(s). Be sure to add them as a collaborator.

---

## 2. API Endpoints, general definitions

You will need to expose the data through a multitude of API endpoints. All of your endpoints should follow these technical expectations:

* All endpoints will expect to return JSON data only
* All endpoints should be exposed under an `api` and version (`v1`) namespace (e.g. `/api/v1/posters`)
* API will be compliant to the [JSON API spec](https://jsonapi.org/) and match our requirements below precisely
* Controller actions should be limited to only the standard Rails actions and follow good RESTful convention.


You will need to expose the following RESTful API endpoints for the following:

<section class="dropdown">
### 1. Fetch all Posters
These "index" endpoints should:

* render a JSON representation of all records of the requested resource
* always return an array of data, even if one or zero resources are found
* follow this pattern: `GET /api/v1/posters`

Example JSON response:

```json
{
  "data": [
    {
      "id": "1",
      "type": "poster",
      "attributes": {
        "name": "FAILURE",
        "description": "Why bother trying? It's probably not worth it.",
        "price": 68.00,
        "year": 2019,
        "vintage": true,
        "img_url": "https://images.unsplash.com/photo-1620401537439-98e94c004b0d"
      }
    },
    {
      "id": "2",
      "type": "poster",
      "attributes": {
        "name": "REGRET",
        "description": "Hard work rarely pays off.",
        "price": 89.00,
        "year": 2018,
        "vintage": true,
        "img_url":  "https://plus.unsplash.com/premium_photo-1661293818249-fddbddf07a5d",
      }
    },
    {
      "id": "3",
      "type": "poster",
      "attributes": {
        "name": "MEDIOCRITY",
        "description": "Dreams are just that—dreams.",
        "price": 127.00,
        "year": 2021,
        "vintage": false,
        "img_url": "https://images.unsplash.com/photo-1551993005-75c4131b6bd8",
      }
    }
  ]
}
```
</section>

<section class="dropdown">
### 2. Fetch a single record

This endpoint for Posters should:

* render a JSON representation of the corresponding record, if found
* follow this pattern: `GET /api/v1/posters/:id`

Example JSON response:

```json
{
  "data": {
      "id": "1",
      "type": "poster",
      "attributes": {
        "name": "FAILURE",
        "description": "Why bother trying? It's probably not worth it.",
        "price": 68.00,
        "year": 2019,
        "vintage": true,
        "img_url": "https://images.unsplash.com/photo-1620401537439-98e94c004b0d"
      }
    }
}
```

</section>


<section class="dropdown">
### 3. Create a Poster

This endpoint should:

* create a record and render a JSON representation of the new Poster record.
* follow this pattern: `POST /api/v1/posters`
* accept the following JSON body with only the following fields:

```json
{
  "name": "DEFEAT",
  "description": "It's too late to start now.",
  "price": 35.00,
  "year": 2023,
  "vintage": false,
  "img_url":  "https://unsplash.com/photos/brown-brick-building-with-red-car-parked-on-the-side-mMV6Y0ExyIk"
}
```
* you should ignore any attributes sent by the user which are not allowed

Example JSON response after successfully creating a Poster resource:

```json
{
  "data": {
    "id": "1",
    "type": "poster",
    "attributes": {
      "name": "DEFEAT",
      "description": "It's too late to start now.",
      "price": 35.00,
      "year": 2023,
      "vintage": false,
      "img_url":  "https://unsplash.com/photos/brown-brick-building-with-red-car-parked-on-the-side-mMV6Y0ExyIk"
    }
  }
}
```
</section>

<section class="dropdown">
### 4. Update a Poster

This endpoint should:

* update the corresponding Poster (if found) with whichever details are provided by the user
* render a JSON representation of the updated record.
* follow this pattern: `PATCH /api/v1/posters/:id`
* accept the following JSON body with **one or more** of the following fields:
The body should follow this pattern:

```json
{
  "name": "DEFEAT",
  "description": "It's REALLY too late to start now.",
  "price": 40.00,
  "year": 2024,
  "vintage": false,
  "img_url":  "https://unsplash.com/photos/brown-brick-building-with-red-car-parked-on-the-side-mMV6Y0ExyIk"
}
```

Example JSON response for the Poster resource:

```json
{
  "data": {
    "id": "1",
    "type": "poster",
    "attributes": {
      "name": "DEFEAT",
      "description": "It's REALLY too late to start now.",
      "price": 40.00,
      "year": 2024,
      "vintage": false,
      "img_url":  "https://unsplash.com/photos/brown-brick-building-with-red-car-parked-on-the-side-mMV6Y0ExyIk"
    }
  }
}
```
</section>


<section class="dropdown">
### 5. Destroy a Poster

This endpoint should:
* destroy the corresponding record (if found) and any associated data
* NOT return any JSON body at all, and should return a `204`` HTTP status code
* NOT utilize a Serializer (Rails will handle sending a `204` on its own if you just `.destroy` the object)

</section>


You may choose to divide these up between your project partners in whatever way seems best; you may also choose to implement the first story/stories _together_ to both have a solid understanding first, before dividing & conquering if you choose. 

---
## 3. Using ActiveRecord and SQL

Now we're going to make our app work a little harder for us by returning a count of items returned per request and allowing users to sort and filter results through the use of query params in their requests. As in the previous section:

* All endpoints will expect to return JSON data only
* All endpoints should be exposed under an `api` and version (`v1`) namespace (e.g. `/api/v1/posters`)
* API will be compliant to the [JSON API spec](https://jsonapi.org/) and match our requirements below precisely
* Controller actions should be limited to only the standard Rails actions and follow good RESTful convention.


<section class="dropdown">
### Returning Count

This endpoint should:

* Add a `count` value to our JSON response. Following JSON:API convention, this should be added as a key value pair with a key of `"meta"` at the same level as our `"data"` key. `"meta"` has a value of a hash (`{}`) and within that hash is the key value pair of `"count": [integer]`

#### Request examples:
* `GET /api/v1/posters`

Example JSON response for `GET /api/v1/posters`

```json
{
  "data": [
    {
      "id": "1",
      "type": "poster",
      "attributes": {
        "name": "FAILURE",
        "description": "Why bother trying? It's probably not worth it.",
        "price": 68.00,
        "year": 2019,
        "vintage": true,
        "img_url": "https://images.unsplash.com/photo-1620401537439-98e94c004b0d"
      }
    },
    {
      "id": "2",
      "type": "poster",
      "attributes": {
        "name": "REGRET",
        "description": "Hard work rarely pays off.",
        "price": 89.00,
        "year": 2018,
        "vintage": true,
        "img_url":  "https://plus.unsplash.com/premium_photo-1661293818249-fddbddf07a5d",
      }
    },
    {
      "id": "3",
      "type": "poster",
      "attributes": {
        "name": "MEDIOCRITY",
        "description": "Dreams are just that—dreams.",
        "price": 127.00,
        "year": 2021,
        "vintage": false,
        "img_url": "https://images.unsplash.com/photo-1551993005-75c4131b6bd8",
      }
    }
  ],
  "meta": {
    "count": 3
  }
}


```
</section>

<section class="dropdown">
### Sorting Results by Query Parameters

This endpoint should:

* return all objects in the database in the appropriately sorted order, based on the query params received.
* allow the user to specify a 'sort' query parameter:
  * for posters, the user can send `?sort=asc` and it will return records sorted by `created_at` date, ascending
  * for posters, the user can send `?sort=desc` and it will return records sorted by `created_at` date, descending
  

#### Request examples:
* `GET /api/v1/posters?sort=asc`
* `GET /api/v1/posters?sort=desc`

The JSON response will always be an array of objects, even if there are zero results.

Example JSON response for `GET /api/v1/posters?sort=asc`

```json
{
  "data": [
    {
      "id": "1",
      "type": "poster",
      "attributes": {
        "name": "DISASTER",
        "description": "It's a mess and you haven't even started yet.",
        "price": 28.00,
        "year": 2016,
        "vintage": false,
        "img_url": "https://images.unsplash.com/photo-1485617359743-4dc5d2e53c89"
      }
    },
    {
      "id": "2",
      "type": "poster",
      "attributes": {
        "name": "TERRIBLE",
        "description": "It's too awful to look at.",
        "price": 15.00,
        "year": 2022,
        "vintage": true,
        "img_url": "https://unsplash.com/photos/low-angle-of-hacker-installing-malicious-software-on-data-center-servers-using-laptop-9nk2antk4Bw"
      }
    }
  ],
  "meta": {
    "count": 2
  }
}


```
</section>


<section class="dropdown">
### Filtering Results by Query Parameters

This endpoint should:

* allow the user to specify a 'name' query parameter:
  * for posters, the user can send `?name=ter` and it will search the `name` field in the database table
  * the search data in the `name` query parameter should require the database to do a case-insensitive search for text fields
    * e.g., searching for 'ter' should find 'TERRIBLE' and 'DISASTER'
  * return all objects in the database in case-insensitive alphabetical order if multiple matches are found
    * e.g., if "Disaster" and "Terrible" exist as poster names, "Disaster" would be listed first, even if "Terrible" was created first
* return all objects in the database that meet the price threshold specification: 
  * `max_price=99.99` should look for anything with a price less than or equal to $99.99
  * `min_price=99.99` should look for anything with a price more than or equal to $99.99

### Request examples:
* `GET /api/v1/posters?name=ter`
* `GET /api/v1/posters?min_price=50`
* `GET /api/v1/posters?max_price=150`

The JSON response will always be an array of objects, even if zero matches or only one match is found.

Example JSON response for `GET /api/v1/posters?name=ter`

```json
{
  "data": [
    {
      "id": "1",
      "type": "poster",
      "attributes": {
        "name": "DISASTER",
        "description": "It's a mess and you haven't even started yet.",
        "price": 28.00,
        "year": 2016,
        "vintage": false,
        "img_url": "https://images.unsplash.com/photo-1485617359743-4dc5d2e53c89"
      }
    },
    {
      "id": "2",
      "type": "poster",
      "attributes": {
        "name": "TERRIBLE",
        "description": "It's too awful to look at.",
        "price": 15.00,
        "year": 2022,
        "vintage": true,
        "img_url": "https://unsplash.com/photos/low-angle-of-hacker-installing-malicious-software-on-data-center-servers-using-laptop-9nk2antk4Bw"
      }
    }
  ],
  "meta": {
    "count": 2
  }
}
```

Example JSON response for `GET /api/v1/posters?max_price=20.00`

```json
{
  "data": [
    {
      "id": "2",
      "type": "poster",
      "attributes": {
        "name": "TERRIBLE",
        "description": "It's too awful to look at.",
        "price": 15.00,
        "year": 2022,
        "vintage": true,
        "img_url": "https://unsplash.com/photos/low-angle-of-hacker-installing-malicious-software-on-data-center-servers-using-laptop-9nk2antk4Bw"
      }
    }
  ],
  "meta": {
    "count": 1
  }
}
```
Example JSON response for `GET /api/v1/posters?min_price=2000.00`

```json
{
  "data": [],
  "meta": {
    "count": 0
  }
}


```
</section>

---

## 4. Extensions and Exploration - Validations and Errors

### Validations
Add some validations to your `Poster` model:
  * `name` should be required AND unique
  * `description` should be required
  * `year` should be required AND an integer
  * `price` should be required AND a float
  * `vintage` should be required

Write tests for these validations. You can add the [shoulda-matchers](https://github.com/thoughtbot/shoulda-matchers) gem to help with testing if you'd like.

### Errors
Right now you are only solving for what happens when everything goes right. We call this the Happy Path. But what about when things go wrong? And what can go wrong here anyways? Think about what your code would do in the following scenarios. Try it out in Postman. Is this what you want to happen?
* GET `/api/v1/posters/:id`
  * For an ID that doesn't exist
* POST `/api/v1/posters`
  * When we're missing some attributes
  * If someone tries to create a poster with a duplicate name?
* PATCH `/api/v1/posters/:id`
  * If we try to update the name to a name that already exists in our database?
  * If we try to delete a required attribute?

We have to assume our users will sometimes try to do things we don't want or expect them to. We call these scenarios Sad Paths and Edge Cases. Update your endpoints to handle these errors. 

#### Examples

<section class="dropdown">
### GET /api/v1/posters/:id

**Request**
```bash
GET /api/v1/posters/bad_id
Content-Type: application/json
Accept: application/json
```
**Response**
```json
status: 404
body:

{
  "errors": [
    {
      "status": "404",
      "message": "Record not found"
    }
  ]
}
```
</section>

<section class="dropdown">
### POST /api/v1/posters

**Request**
```bash
POST /api/v1/posters/
Content-Type: application/json
Accept: application/json

{
  "name": "FAILURE",
  "year": 2019,
  "vintage": true,
  "price": 20.00
}
```
**Response**
```json
status: 422
body:

{
  "errors": [
    {
      "status": "422",
      "message": "Description cannot be blank."
    }
  ]
}
```
</section>

<section class="dropdown">
### PATCH /api/v1/posters/:id

**Request**
```bash
PATCH /api/v1/posters/:id
Content-Type: application/json
Accept: application/json

{
  "name": ""
}
```
**Response**
```json
status: 422
body:

{
  "errors": [
    {
      "status": "422",
      "message": "Name cannot be blank."
    }
  ]
}
```
</section>