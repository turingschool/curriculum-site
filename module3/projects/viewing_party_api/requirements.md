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
### Summary of Existing Functionality

This application has already implemented basic authentication for users, and the user creation and login endpoints are complete. Take a look at the user database schema and model. There's quite a lot of Rails magic going on! It's not important to understand it all deeply - you will interact with the User model a bit but will not need to manipulate anythind around authentication.

#### Basic Authentication with BCrypt

This application uses a gem called [BCrypt](https://github.com/bcrypt-ruby/bcrypt-ruby) to encrypt user passwords. In the User model, you'll see `has_secure_password` which does a lot of heavy lifting for us. It will allow us to create a user with a `password` (passed in as a string) and optionally a `password_confirmation` (to allow the user to type it in again), and from there BCrypt will transform that plaintext string into an encrypted string that will live in the database in the `password_digest` column. Check it out for yourself. Our `db/seeds.rb` file creates a few users, and if you go into Rails console, you can look at these users' attributes. There is no plaintext password anywhere to be seen, and the `password_digest` is filtered until you call it explicitly: `User.last.password_digest` should show you an example of an encrypted password. 

You'll also see `has_secure_token` in the User model, and an `api_key` attribute in the database. This is built-in Rails functionality that will generate a unique API key for each user before saving it in the database. You will not need to use this API key at all unless you tackle one of the extensions for this project. Again, learning about this implementation is valuable for exposure and the confidence that you can build on top of code that 1) you didn't write and 2) you don't necessarily need to understand deeply.

#### Existing Authentication Endpoints

- Users Create

Requests must include a name, unique username, password and optionally a password confirmation in order to create a valid user. BCrypt will handle encrypting the plaintext password to store it in the database, and Rails' `SecureToken` methods will generate a secure API key for the user.

- All Users List

This endpoint will return all users in the database, but without any of the sensitive data. Only usernames and names will be included. This endpoint will be helpful for clients making a request to create a viewing party and invite the necessary users.

- Sessions Create

This endpoint is the back end to a "login" endpoint. When the client passes a correct username and password combination, the response will return that user's API key. This API key will be necessary for making any requests to authenticated endpoints (which won't exist in this project, but could be added as an extension). 
</section>

## API Endpoints to Build

You will need to expose the data through a multitude of API endpoints. All of your endpoints should follow these technical expectations:

* All endpoints will expect to return JSON data only
* All endpoints should be exposed under an `api` and version (`v1`) namespace (e.g. `/api/v1/movies`)
* API will be compliant to the [JSON API spec](https://jsonapi.org/) and match our requirements below precisely. You may find that handrolling some serializers will be easier than using the JSON API gem for all of them. However, it is your choice - either strategy is fine.
* Controller actions should be limited to only the standard Rails actions and follow good RESTful convention.
* You will decide the most RESTful paths for your endpoints. Paths will not be given but must be determined by the student.
* Your application's README should document the paths and the requirements for each endpoint (i.e. should the data be passed as a body or a query parameter?)


You will need to expose the following RESTful API endpoints for the following:

<section class="dropdown">
### 1. Top Rated Movies

This endpoint should:

* retrieve top-rated movies from [The Movie DB API](https://developers.themoviedb.org/3/getting-started/introduction)
* retrieve a maximum of 20 results.
* include the title and the vote average of every movie

Example JSON response:

```json
{
  "data": [
    {
      "id": "278", // This ID is from the Movie DB API, not your local database
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
    },
    // ... a maximum of 20 results listed
  ]
}
```
</section>


<section class="dropdown">
### 2. Movie Search

This endpoint should:

* retrieve movies from [The Movie DB API](https://developers.themoviedb.org/3/getting-started/introduction) based on a search query from the request
* require that the search term is passed as a query parameter in the request
* retrieve a maximum of 20 results.
* include the title and the vote average of every movie

Example JSON response for search term "Lord of the Rings":
```json
{
  "data": [
    {
      "id": "120", // This ID is from the Movie DB API, not your local database
      "type": "movie",
      "attributes": {
        "title": "The Lord of the Rings: The Fellowship of the Ring",
        "vote_average": 8.413
      }
    },
    {
      "id": "122",
      "type": "movie",
      "attributes": {
        "title": "The Lord of the Rings: The Return of the King",
        "vote_average": 8.698
      }
    },
    {
      "id": "240",
      "type": "movie",
      "attributes": {
        "title": "The Lord of the Rings: The Two Towers",
        "vote_average": 8.397
      }
    },
    // ... maximum of 20 results
  ]
}
```
</section>


<section class="dropdown">
### 3. Create a Viewing Party

This endpoint should:

* create a Viewing Party record and create the necessary joins records to invite all the indicated users
  * Note: The DB should be able to keep track of which user is the host of the party
* ignore any parameters in the request that are not allowed
* send specific error messaging back to the client if required data is not sent in the request.

Example Request
```json
{
  "name": "Juliet's Bday Movie Bash!",
  "start_time": "2025-02-01 10:00:00",
  "end_time": "2025-02-01 14:30:00",
  "movie_id": 278,
  "movie_title": "The Shawshank Redemption",
  "invitees": [11, 7, 5] // must be valid user IDs in the system
}
```

Example JSON response after successfully creating a Viewing Party resource:
```json
{
  "data": {
    "id": "1",
    "type": "viewing_party",
    "attributes": {
      "name": "Juliet's Bday Movie Bash!",
      "start_time": "2025-02-01 10:00:00",
      "end_time": "2025-02-01 14:30:00",
      "movie_id": 278,
      "movie_title": "The Shawshank Redemption",
      "invitees": [
        {
          "id": 11,
          "name": "Barbara",
          "username": "leo_fan"
        },
                {
          "id": 7,
          "name": "Ceci",
          "username": "titanic_forever"
        },
                {
          "id": 5,
          "name": "Peyton",
          "username": "star_wars_geek_8"
        }
      ]
    }
  }
}
```

<section class="dropdown">
#### Relationships vs. Attributes

If you would rather use the JSON API relationships tool to list the invitees rather than listing them as an attribute, you are welcome to do so! If you choose this option, your sample response would follow this format:

```json
{
  "data": {
    "id": "1",
    "type": "viewing_party",
    "attributes": {
      "name": "Juliet's Bday Movie Bash!",
      "start_time": "2025-02-01 10:00:00",
      "end_time": "2025-02-01 14:30:00",
      "movie_id": 278,
      "movie_title": "The Shawshank Redemption"
    },
    "relationships": {
      "users": {
        "data": [
          {
            "id": "11",
            "type": "user"
          },
          {
            "id": "7",
            "type": "user"
          },
          {
            "id": "5",
            "type": "user"
          }
        ]
      }
    }
  }
}
```

</section>

Sad Paths to Handle:
* Request sent with missing required attributes for a viewing party
* Request sent with party duration *less than*  movie runtime
* Request sent with end time before start time
* Request sent with an invalid user ID as one of the invitees
  * In this case, it is sufficient to create the viewing party (if other attributes are valid) and create joins table records for only the valid user IDs. No error message/code is needed. It will be a partial success.

Sample Error Response
```json
{
  "message": "Attribute movie_id cannot be blank",
  "status": 400
}
```
</section>

<section class="dropdown">
### 4. Add Another User to Existing Viewing Party

This endpoint should:

* not make any updates to the viewing party resource, but instead just add more users to the party. Consider: what is the most RESTful path and controller organization for this case?
* Pass a valid viewing party ID in the path of the request

Example Request
```json
{
  "invitees_user_id": 14 // must be valid user ID in the system
}
```

Example JSON response after successfully inviting another user (same response as Viewing Party create, but invite list now contains another user):
```json
{
  "data": {
    "id": "1",
    "type": "viewing_party",
    "attributes": {
      "name": "Juliet's Bday Movie Bash!",
      "start_time": "2025-02-01 10:00:00",
      "end_time": "2025-02-01 14:30:00",
      "movie_id": 278,
      "movie_title": "The Shawshank Redemption",
      "invitees": [
        {
          "id": 11,
          "name": "Barbara",
          "username": "leo_fan"
        },
                {
          "id": 7,
          "name": "Ceci",
          "username": "titanic_forever"
        },
                {
          "id": 5,
          "name": "Peyton",
          "username": "star_wars_geek_8"
        },
        {
          "id": 14,
          "name": "Leo DiCaprio",
          "username": "leo_real_verified",
        }
      ]
    }
  }
}
```

Sad Paths to Handle
* Invalid viewing party ID
* Invalid user ID

</section>


<section class="dropdown">
### 5. Movie Details

This endpoint should:

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
### 6. Retrieve User Profile

This endpoint should:

* render a JSON representation of users's basic attributes as well as the viewing parties they are hosting and attending
* require the user ID for the given user in the path
* return an empty collection of viewing parties if the given user has not hosted or been invited to any parties.
* NOT include any sensitive data in the response, such as the password digest or API key.

Example JSON response for the a user's full profile:

```json
{
  "data": {
    "id": "14",
    "type": "user",
    "attributes": {
      "name": "Leo DiCaprio",
      "username": "leo_real_verified",
      "viewing_parties_hosted": [
        {
          "id": 44,
          "name": "Titanic Watch Party",
          "start_time": "2025-05-01 10:00:00",
          "end_time": "2025-05-01 14:30:00",
          "movie_id": 597,
          "movie_title": "Titanic",
          "host_id": 14
        }
      ],
      "viewing_parties_invited": [
        {
          "name": "LOTR Viewing Party",
          "start_time": "2025-03-11 10:00:00",
          "end_time": "2025-03-11 15:30:00",
          "movie_id": 120,
          "movie_title": "The Lord of the Rings: The Fellowship of the Ring",
          "host_id": 16
        },
        {
          "name": "Juliet's Bday Movie Bash!",
          "start_time": "2025-02-01 10:00:00",
          "end_time": "2025-02-01 14:30:00",
          "movie_id": 278,
          "movie_title": "The Shawshank Redemption",
          "host_id": 1
        },
        {
          "name": "Let's watch clueless together!",
          "start_time": "2025-01-15 10:00:00",
          "end_time": "2025-01-15 14:30:00",
          "movie_id": 9603,
          "movie_title": "Clueless",
          "host_id": 1
        }
      ]
    }
  }
}
```
Note: The host ID for any viewing parties that the user has created should be the same as this user's ID. 

Sad Paths to Handle:
* invalid user ID sent

Example Error Response
```json
{
  "message": "Invalid User ID",
  "status": 404
}
```

</section>


---

## Extensions and Explorations

<section class="dropdown">
### Add Authorization

We have these api keys in the users table for a reason. Let's use them! 

Add the following functionality to your API:
* Require requests to create a viewing party **to include the valid API key for the host user**. If the request to create a viewing party is sent without the host's API key in the body, the API should respond with a 401 (Unauthorized). 
* Require the host's API key for requests to add additional users to an invitation. If a request to invite additional users doesn't include an API key in the body or a as a query parameter, the API should return with a 401.
* Require the user's valid API key in the request for endpoint #6, so that a user needs to provide their key to get their specific profile data returned. If no key is provided, return a 401.  

Check out [this lesson](https://curriculum.turing.edu/module3/lessons/api_authorization) as a resource for implementing authorization.

</section>


<section class="dropdown">
### Similar Movies

This endpoint is NOT authenticated. This endpoint should:
* For a given movie ID, retrieve movie information about similar movies
* Retrieve similar movie data from The Movie Database API
* Include the title and vote average for every similar movie

</section>

<section class="dropdown">
### Viewing Party Info: Where to Watch

This endpoint should:
* Require an API key in order to retrieve viewing party information
* When passed a given viewing party ID in the request path, return a list of video providers where the movie is available
* Return the video providers organized by rent vs. buy.

Example JSON response
```json
{
  "data": {
    "id": "1",
    "type": "viewing_party",
    "attributes": {
      "name": "Juliet's Bday Movie Bash!",
      "start_time": "2025-02-01 10:00:00",
      "end_time": "2025-02-01 14:30:00",
      "movie_id": 278,
      "movie_title": "The Shawshank Redemption",
      "invitees": [
        {
          "id": 11,
          "name": "Barbara",
          "username": "leo_fan"
        }, // continue all invitee info
      ],
      "watch_providers": {
        "buy": [
          {
            "provider_logo_path": "/9ghgSC0MA082EL6HLCW3GalykFD.jpg",
            "provider_id": 2,
            "provider_name": "Apple TV"
          },
          {
            "provider_logo_path": "/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg",
            "provider_id": 3,
            "provider_name": "Google Play Movies"
          }
        ], 
        "rent": [
          {
            "provider_logo_path": "/9ghgSC0MA082EL6HLCW3GalykFD.jpg",
            "provider_id": 2,
            "provider_name": "Apple TV"
          },
          {
            "provider_logo_path": "/8z7rC8uIDaTM91X0ZfkRf04ydj2.jpg",
            "provider_id": 3,
            "provider_name": "Google Play Movies"
          },
                    {
            "provider_logo_path": "/seGSXajazLMCKGB5hnRCidtjay1.jpg",
            "provider_id": 10,
            "provider_name": "Amazon Video"
          },
          {
            "provider_logo_path": "/bZvc9dXrXNly7cA0V4D9pR8yJwm.jpg",
            "provider_id": 35,
            "provider_name": "Rakuten TV"
          },
          {
            "provider_logo_path": "/5vfrJQgNe9UnHVgVNAwZTy0Jo9o.jpg",
            "provider_id": 68,
            "provider_name": "Microsoft Store"
          }
        ]
      }
    }
  }
}

```

</section>

<section class="dropdown">
### Following/Followers

This extension adds functionality to multiple existing endpoints, as well as an additional new endpoint.

Introduce the idea of friendship/following on this application following the Twitter-style of following, so if user A follows user B, that doesn't mean that user B necessarily follows A back automatically. 

In order to set up this functionality, you'll need to have a joins table that uses self-referential `has_many through`. Once your database is set up, you should create an `POST` endpoint to allow one user to follow another user in the system. 

When creating viewing parties and inviting users to said parties, update your endpoints so that users can only invite users they are following. 

Update your user profile endpoint to include a list of all the users they are following, as well as a list of all the users that are following them. 

</section>
