---
layout: page
title: Viewing Part API Requirements
tags:
type: project
---

_[Back to Viewing Party API Home](./index)_

## Setup

1. Fork and clone this [base repo](https://github.com/turingschool-examples/viewing-party-api), and follow steps in the README to setup the application locally. Take a look at the existing endpoints and what functionality they're providing. Make sure to look at the tests as a form of documentation!

2. Register for an account with [The Movie DB API](https://developers.themoviedb.org/3/getting-started/introduction)

<section class="dropdown">
## Summary of Existing Functionality

This application has already implemented basic authentication for users, and the user creation and login endpoints are complete. Take a look at the user database schema and model. There's quite a lot of Rails magic going on! It's not important to understand it all deeply - you will interact with the User model a bit but will not need to manipulate anythind around authentication. 

### Basic Authentication with BCrypt

This application uses a gem called [BCrypt](https://github.com/bcrypt-ruby/bcrypt-ruby) to encrypt user passwords. In the User model, you'll see `has_secure_password` which does a lot of heavy lifting for us. It will allow us to create a user with a `password` (passed in as a string) and optionally a `password_confirmation` (to allow the user to type it in again), and from there BCrypt will transform that plaintext string into an encrypted string that will live in the database in the `password_digest` column. Check it out for yourself. Our `db/seeds.rb` file creates a few users, and if you go into Rails console, you can look at these users' attributes. There is no plaintext password anywhere to be seen, and the `password_digest` is filtered until you call it explicitly: `User.last.password_digest` should show you an example of an encrypted password. 

You'll also see `has_secure_token` in the User model, and an `api_key` attribute in the database. This is built-in Rails functionality that will generate a unique API key for each user before saving it in the database. We can use this API key later to ensure users have permission to see certain data. 

### Existing Authentication Endpoints

1. Users Create

Requests must include a name, unique username, password and optionally a password confirmation in order to create a valid user. BCrypt will handle encrypting the plaintext password to store it in the database, and Rails' `SecureToken` methods will generate a secure API key for the user.

2. All Users List

This endpoint will return all users in the database, but without any of the sensitive data. Only usernames and names will be included. This endpoint will be helpful for clients making a request to create a viewing party and invite the necessary users.

3. Sessions Create

This endpoint is the back end to a "login" endpoint. When the client passes a correct username and password combination, the response will return that user's API key. This API key will be necessary for making any requests to authenticated endpoints. 
</section>

## API Endpoints to Build

You will need to expose the data through a multitude of API endpoints. All of your endpoints should follow these technical expectations:

* All endpoints will expect to return JSON data only
* All endpoints should be exposed under an `api` and version (`v1`) namespace (e.g. `/api/v1/movies`)
* API will be compliant to the [JSON API spec](https://jsonapi.org/) and match our requirements below precisely
* Controller actions should be limited to only the standard Rails actions and follow good RESTful convention.


You will need to expose the following RESTful API endpoints for the following:

<section class="dropdown">
### 1. Top Rated Movies

This endpoing is NOT authenticated (no API key is required!). This endpoint should:

* retrieve top-rated movies from [The Movie DB API](https://developers.themoviedb.org/3/getting-started/introduction)
* retrieve a maximum of 20 results.
* include the title and the vote average of every movie
<!-- * Include path for them, or students need to create their own?  -->

Example JSON response:

```json
{
  "data": [
    {
      "id": "278", # This ID is from the Movie DB API, not your local database
      "type": "movie",
      "attributes": {
        "title": "The Shawshank Redemption",
        "vote_average": 8.706
      }
    },
    {
      "id": "238",
      "type": "movie",
      "attributes": {
        "title": "The Godfather",
        "vote_average": 8.69
      }
    },
    {
      "id": "240",
      "type": "movie",
      "attributes": {
        "title": "The Godfather Part II",
        "vote_average": 8.574
      }
    }
  ]
}
```
</section>

<section class="dropdown">
### 2. Movie Details

This endpoint is NOT authenticated. This endpoint should:

* Return details about a movie's
  * Title
  * Release year
  * Vote average
  * Runtime in hours & minutes
  * Genre(s) associated to movie
  * Summary description
  * List the first 10 cast members (characters & actors)
  * Count the total reviews
  * List of first 5 reviews (author and review)
* Include the movie's ID (in the Movie DB API system, not your application) in the path 
<!-- TO-DO update if we're giving them path -->
* Note: Retrieving this information from the Movie DB API could take up to 3 different network requests (unless you find a shortcut!)

Example JSON response:

```json
{
  "data": {
      "id": "278",
      "type": "movie",
      "attributes": {
        "title": "The Shawshank Redemption",
        "release_year": 1994,
        "vote_average": 8.706,
        "runtime": "2 hours, 22 minutes",
        "genres": ["Drama", "Crime"],
        "summary": "Imprisoned in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates -- including an older prisoner named Red -- for his integrity and unquenchable sense of hope.",
        "cast": [
          {
            "character": "Andy Dufresne",
            "actor": "Tim Robbins"
          },
          {
            "character": "Ellis Boyd 'Red' Redding",
            "actor": "Morgan Freeman"
          } 
          // ... 10 of these! (max)
        ],
        "total_reviews": 14,
        "reviews": [
          {
            "author": "elshaarawy",
            "review": "very good movie 9.5/10 محمد الشعراوى"
          },
          {
            "author": "John Chard",
            "review": "Some birds aren't meant to be caged.\r\n\r\nThe Shawshank Redemption is written and directed by Frank Darabont. It is an adaptation of the Stephen King novella Rita Hayworth and Shawshank Redemption..."
          }
          // ... 5 of these (max)
        ]
      }
    }
}
```

</section>


<section class="dropdown">
### 3. Create a Viewing Party

This endpoint should:

* create a Viewing Party record and create the necessary joins records to invite all the indicated users
  * Note: The DB should be able to keep track of which user is the host of the party
* require a valid API key be sent with the request
* ignore any parameters in the request that are not allowed

Example Request
```json
{
  "name": "Juliet's Bday Movie Bash!",
  "start_time": "2025-02-01 10:00:00",
  "end_time": "2025-02-01 14:30:00",
  "movie_id": 278,
  "movie_title": "The Shawshank Redemption",
  "api_key": "e1An2gAidDbWtJuhbHFKryjU", // must be valid API key for host
  "invitees": [11, 7, 5] // must be valid user IDs in the system
}
```


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
* POST `/api/v1/posters/:id`
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
### POST /api/v1/posters/

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