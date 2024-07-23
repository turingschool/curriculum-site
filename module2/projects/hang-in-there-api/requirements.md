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
                  img_url:  "https://plus.unsplash.com/premium_photo-1661293818249-fddbddf07a5d", )
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

<details><summary><h3>1. Fetch all Posters</h3></summary>
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

<hr/>
</details>
<details><summary><h3>2. Fetch a single record</h3></summary>

This endpoint for Posters should:

* render a JSON representation of the corresponding record, if found
* follow this pattern: `GET /api/v1/poster/:id`

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

<hr/>
</details>


<details><summary><h3>3. Create a Poster</h3></summary>

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

<hr/>
</details>

<details><summary><h3>4. Update a Poster</h3></summary>

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
<hr/>
</details>


<details><summary><h3>5. Destroy a Poster</h3></summary>

This endpoint should:
* destroy the corresponding record (if found) and any associated data
* NOT return any JSON body at all, and should return a `204`` HTTP status code
* NOT utilize a Serializer (Rails will handle sending a `204` on its own if you just `.destroy` the object)

<hr/>
</details>


You may choose to divide these up between your project partners in whatever way seems best; you may also choose to implement the first story/stories _together_ to both have a solid understanding first, before dividing & conquering if you choose. 

---
## 3. Data Crunching with ActiveRecord and SQL

---

## 4. Extensions and Exploration
<!-- alternative extension idea is to do some FE work -->
### Extension 1: Non-RESTful Search Endpoints

* `GET /api/vi/posters/find`, find a single poster which matches a search term
* `GET /api/vi/posters/find_all`, find all posters which match a search term

These endpoints will make use of query parameters as described below:

<details><summary><h4>1. "Find One" endpoint</h4></summary>

These endpoints should:

* return a single object, if found
* return the first object in the database in case-insensitive alphabetical order if multiple matches are found
  * e.g., if "Disaster" and "Terrible" exist as poster names, "Disaster" would be returned, even if "Terrible" was created first
* allow the user to specify a 'name' query parameter:
  * for posters, the user can send `?name=ter` and it will search the `name` field in the database table
  * the search data in the `name` query parameter should require the database to do a case-insensitive search for text fields
    * e.g., searching for 'ter' should find 'Terrible' and 'Disaster'
* allow the user to send multiple query parameters:
  * `description` will search the `description` field in the database table, and the search data in the `description` query parameter should require the database to do a case-insensitive search for text fields
  * `max_price=99.99` should look for anything with a price less than or equal to $99.99
  * `min_price=99.99` should look for anything with a price less than or equal to $99.99

### Request examples:
* `GET /api/v1/posters/find?name=ter`
* `GET /api/v1/posters/find?description=late`
* `GET /api/v1/posters/find?min_price=50`
* `GET /api/v1/posters/find?max_price=150`

Example JSON response for `GET /api/v1/posters/find?name=fail`

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

<hr/>

</details>

<details><summary><h4>2. "Find All" endpoint</h4></summary>

These endpoints will follow the same rules as the "find" endpoints.

The JSON response will always be an array of objects, even if zero matches or only one match is found.

Example JSON response for `GET /api/v1/posters/find_all?name=ter`

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
  ]
}


```

</details>
