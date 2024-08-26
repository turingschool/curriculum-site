---
title: Hang In There - API
---

## Project Description
Last week you built a front end for your not so motivational posters. This week, you're going to build a database so that posters don't have to be hardcoded into your front end. How cool is that? You are building CRUD functionality in your back end API application. We have provided a front end that you can use to see your work come to life!


## Learning Goals

* Expose an API
* Use serializers to format JSON responses
* Test API exposure
* Use SQL and AR to gather data
* Breaking down a problem into small steps
* Practice individual research (articles, videos, mentors)

## Postman
### Import the collection
Download the test suites for Postman:
* [Hang in There API](./hang_in_there_api.postman_collection.json)

Click on the link to load it in your browser, then hit Cmd-S to save it to your system.

In Postman, in the top left corner, click on the "Import" button, and use the file selector to locate the file on your operating system.

Next, you'll "confirm" the import. The collection should display as a "Postman Collection v2.1" and import as a "Collection". Click the "Import" button to continue.

Within your collections in Postman, you should now see "Hang In There API". 

### Running one endpoint at a time
As you develop your endpoints, run `rails s` and find the appropriate endpoint within the Postman collection you imported. For example, "Get All Posters". When you select "Get All Posters" from the list, you should see a Postman tab open, pre-populated with everything you need to connect to the endpoint in your code and see if it works correctly.

Click the "Send" button in the top right corner.

In the lower portion of the Postman interface, you should see "Body", "Cookies", "Headers", and "Status". The body should contain your expected JSON response and the appropriate status code if done correctly (something in the 2xx series)

## Technical Requirements

The Technical Requirements for this project can be found [here](./requirements)


## Evaluation

Evaluation and Rubric details can be found [here](./evaluation)
