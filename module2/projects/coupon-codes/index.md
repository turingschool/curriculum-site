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

## Details

* This is a solo project, to be completed alone without assistance from cohortmates, alumni, mentors, rocks, etc.
* Must use Rails 7.1.x and Ruby 3.2.2. 
* Additional gems to be added to the project must have instructor approval.
  * RSpec, Pry, Simplecov, Shoulda-Matchers, Orderly, jsonapi-serializer (or other serializer gem), HTTParty, Faker, Faraday, and FactoryBot are pre-approved
* Scaffolding is not permitted on this project.

## Setup

This project is an extension of Little Shop. **You'll need to start this project with a frontend repo and backend repo.** You have a few options for setup:

1. If your Little Shop project is complete, you can use both the frontend repo and backend repo as your starting points for this project. If you are not the repo owner, fork the project to your account. If you are the repo owner, you can work off the repo without forking, just make sure your teammates have a chance to fork before pushing any commits to either repo.
1. If your Little Shop backend is _not_ complete, fork **[this backend repo](https://github.com/turingschool-examples/little-shop-be-final-starter)** as a starting point for this project. 
1. It is okay to work off of an incomplete frontend, as you'll be building new features. That said, if your frontend is buggy, you may choose to restart with the same **[frontend starter repo](https://github.com/turingschool-examples/little-shop-fe-group-starter)** from the last project.


## Evaluation
Evaluation information for this project can be found [here](./evaluation).

## BE Technical Requirements
The BE Technical Requirements for this project can be found [here](./back_end_requirements)

## FE Technical Requirements
The FE Requirements for this project can be found [here](./front_end_requirements)

## Extensions

Students can pick one or more of these extension features to add to their project, if they have completed all prior requirements: 
1. On the Merchant Coupon Index page, active and inactive coupons are sorted in order of popularity, from most to least. 
2. Inactive coupons cannot be added to an Invoice. 
3. A Coupon has a maximum number of uses before it is automatically deactivated. When implemented, prove that the number of times used on the Merchant Coupon Show Page is updated accordingly. 
4. Generate unique coupon codes as suggestions when creating a new coupon.
