---
title: Rancid Tomatillos API Documentation
module: 3
tags: react,  testing, javascript, api, cypress
---

_[Back to Rancid Tomatillos Home](./index)_

## Overview

You can view the data in your browser at **[https://rancid-tomatillos-api.onrender.com/api/v1/movies](https://rancid-tomatillos-api.onrender.com/api/v1/movies)**

Pro Tip: Install this **[JSON Formatter Chrome Extension](https://chromewebstore.google.com/detail/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en)** to make the data easier to read!

## Endpoints

All API endpoints are prefixed with `https://rancid-tomatillos-api.onrender.com`.

| Purpose | URL Path | Verb | Data to Send | Sample Sucessful Response | Sample Unsuccessful Response |
|:-:|-----|:-:|--------------|------------------------------|
|Get all movie posters| `/api/v1/movies` | `GET` | n/a | An array of movie objects, ex: `[{"id": 1184918, "poster_path": "something.jpg", "title": "The Wild Robot", "vote_count": 9}, ...]` | n/a |
|Up or down vote a movie|`/api/v1/movies/:id` | `PATCH` | The `id` of the movie you're voting for in the URL and an object specifying an up or down vote in the request body, ex: `{ vote_direction: "up" }` or `{ vote_direction: "down" }`| A single movie object with updated vote count, ex: `{"id": 1184918, "poster_path": "something.jpg", "title": "The Wild Robot", "vote_count": 10}` | `4xx` level response with a message like: `No movie found with an ID of 123. Try again with an existing movie ID.` or `Expected body: { vote_direction: 'up' or 'down' }`
|Get a movie's details|`/api/v1/movies/:id` | `GET` | The `id` of the movie you need details for in the URL | An object with movie details, ex: `{"backdrop_path": "something.jpg", "genre_ids": ["Family"], "id": 1184918, "original_language": "en", "overview": "After a shipwreck, ...", "popularity": 199.001, "poster_path": "something.jpg", "release_date": "2024-09-12", "title": "The Wild Robot"}`| `4xx` level response with a message like: `No movie found with an ID of 38. Try again with an existing movie ID.`| 

## Endpoint Details

All resources are given a unique ID in the database. For instance, every movie has an `id` property, like `1` or `5`. The IDs are used to reference each movie uniquely.  

If you are sending information in the body of a request (like the `PATCH`), you will need to set the request header of `Content-Type` to `application/json`.

## Collaboration Notes

Please note that all students in your cohort will be using the same endpoint. This means that when you are sending a `PATCH`, you are updating the data for ALL students. If the numbers seem to be acting weird, it's probably because several of you are updating the vote count of the same movie at the same time. If you'd rather run the API locally to avoid this, you can - **[Here is the repo](https://github.com/turingschool-examples/rancid-tomatillos-api/)**. Just note that when it's time to deploy your application, you'll want to point your network rquests back to the deployed Render URL.