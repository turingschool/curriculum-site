---
title: Coupon Codes
---

This project is an extension of the Little Shop group project. You will add functionality for merchants to create coupons for their shop. 

## Learning Goals

* Write migrations to create tables and relationships between tables
* Implement CRUD functionality for a resource
* Use MVC to organize code effectively, limiting the amount of logic included in serializers and controllers
* Use built-in ActiveRecord methods to join tables of data, make calculations, and group data based on one or more attributes
* Write model tests that fully cover the data logic of the application
* Write request tests that fully cover the functionality of the application
* Display data for users in a frontend application by targeting DOM elements

## Details

* This is a solo project. All code must be written by you. You should use your resources as needed, but you must be prepared to explain and defend any code you write.
* Must use Rails 7.1.x and Ruby 3.2.2. 
* Additional gems to be added to the project must have instructor approval.
  * RSpec, Pry, Simplecov, Shoulda-Matchers, Orderly, jsonapi-serializer (or other serializer gem), HTTParty, Faker, Faraday, and FactoryBot are pre-approved
* Scaffolding is not permitted on this project.

## Setup

This project is an extension of Little Shop. You'll need to start this project with a frontend repo and backend repo. Read below carefully for the set-up instructions.

**Backend Repo**
- If your Little Shop project is complete, you can use the backend repo as your starting point for this project. If you are not the repo owner, fork the project to your account. If you are the repo owner, you can work off the repo without forking, just make sure your teammates have a chance to fork before pushing any commits to either repo.
- If your Little Shop backend is _not_ complete, fork **[this backend repo](https://github.com/turingschool-examples/little-shop-be-final-starter)** as a starting point for this project.  


**Frontend Repo** 
- All students must use a forked copy of **[this frontend repo](https://github.com/turingschool-examples/little-shop-fe-final-starter)** for this project. 


## Evaluation
Evaluation information for this project can be found [here](./evaluation).

## BE Technical Requirements
The BE Technical Requirements for this project can be found [here](./back_end_requirements)

## FE Technical Requirements
The FE Requirements for this project can be found [here](./front_end_requirements)

<section class="dropdown">
### Extensions (Optional)

You may pick one or more of these extension features to add to your project, **only if** you have completed all prior requirements and have refactored your code as needed for code quality.

BE Extensions:
1. Inactive coupons cannot be added to an Invoice. 
2. A Coupon has a maximum number of uses before it is automatically deactivated. When implemented, prove that the number of times used on the Merchant Coupon Show Page is updated accordingly. 
3. Generate unique coupon codes as suggestions when creating a new coupon.

FE Extensions:
As a user...
1. When I am viewing the coupons for a merchant, I should see a "View Active Coupons" button that will update the list to only showing active coupons. There should be a way to go back to viewing all coupons (active AND inactive). 
2. When I am viewing the coupons for a merchant, I should see a count of total coupons and total invoices with coupons applied.
</section>

