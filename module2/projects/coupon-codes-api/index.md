---
title: Coupon Codes API
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

This project is an extension of Little Shop. Students have two options for setup:

1. If your Little Shop project is complete, you can use it as a starting point for this project. If you are not the repo owner, fork the project to your account. If you are the repo owner, you can work off the repo without forking, just make sure your teammates have a chance to fork before pushing any commits to your repo.
1. If your Little Shop project is _not_ complete, fork **[this repo](https://github.com/turingschool-examples/little-shop-be-final-starter)** as a starting point for this project.

## Evaluation
Evaluation information for this project can be found [here](./evaluation).

-----

## Functionality Overview

* A Coupon belongs to a Merchant
* An Invoice optionally belongs to a Coupon. An invoice may only have one coupon.
  * Note: When creating this new association on Invoice, your existing tests will fail unless the association is optional. Use these guides as a reference.
  * You are not required to build functionality for a user applying a coupon to an invoice, but can instead use test data, Rails console or seed data to add coupons to existing invoices to verify behavior.
* You should build full CRUD functionality for coupons with criteria/restrictions defined below:
   - A merchant can have a maximum of 5 activated coupons in the system at one time.
   - A merchant cannot delete a coupon, rather they can activate/deactivate them.
   - A Coupon has a name, unique code (e.g. "BOGO50"), and either percent-off or dollar-off value. The coupon's code must be unique in the whole database.
* If a coupon's dollar value (ex. "$10 off") exceeds the total cost of that merchant's items on the invoice, the grand total for that merchant's items should then be $0. (In other words, the merchant will never *owe* money to a customer.)
* A coupon code from a Merchant only applies to Items sold by that Merchant.

​
## 1) CRUD Endpoints

Below is the expected JSON response for each request. We have also outlined a few examples of Sad Paths you may consider adding in. In your project, you should take time to implement at least 2 sad paths total, but you are not limited to the examples we provide. 

<section class="dropdown">
### 1. Merchant Coupon Show Page 

Returns a specific coupon and shows a count of how many times that coupon has been used.

**Request**
```bash
GET /api/v1/merchants/:merchant_id/coupons/:id
Content-Type: application/json
Accept: application/json
```

**Response**

```json
status: 200
body:

{
  "data": {
    "id": "1",
    "type": "coupon",
    "attributes": {
      "name": "Buy One Get One 50",
      "code": "BOGO50",
      "amount_off": 50,
      "percent_off": null,
      "status": "active",
      "merchant_id": 1,
      "uses": 1    
    }
  }
}

```
</section>

<section class="dropdown">
### 2. Merchant Coupons Index 

Returns all of a merchant's coupons

**Request**
```bash
GET /api/v1/merchants/:merchant_id/coupons
Content-Type: application/json
Accept: application/json
```

**Response**

```json
{
  "data": [
    {
      "id": "1",
      "type": "coupon",
      "attributes": {
        "name": "Buy One Get One 50",
        "code": "BOGO50",
        "amount_off": 50,
        "percent_off": null,
        "status": "active",
        "merchant_id": 1,
        "uses": 1
      }
    },
    {
      "id": "2",
      "type": "coupon",
      "attributes": {
        "name": "25 Percent Sale",
        "code": "25PERCENT",
        "amount_off": null,
        "percent_off": 25,
        "status": "inactive",
        "merchant_id": 1,
        "uses": 0
      }
    },
    {
      "id": "3",
      "type": "coupon",
      "attributes": {
        "name": "One More Coupon",
        "code": "MONEYOFF",
        "amount_off": 10,
        "percent_off": null,
        "status": "active",
        "merchant_id": 1,
        "uses": 2
      }
    }
  ]
}
```
</section>

<section class="dropdown">
### 3. Merchant Coupon Create 

Create a new coupon for a merchant

**Request**
```
POST /api/v1/merchants/:merchant_id/coupons
Content-Type: application/json
Accept: application/json

{
  "name": "Buy One Get One 50",
  "code": "BOGO50",
  "amount_off": 50,
  "percent_off": null,
  "status": "active",
  "merchant_id": 1
}
```

```json
status: 201
body:

{
  "data": {
    "id": "1",
    "type": "coupon",
    "attributes": {
      "name": "Buy One Get One 50",
      "code": "BOGO50",
      "amount_off": 50,
      "percent_off": null,
      "status": "active",
      "merchant_id": 1,
      "uses": 0
    }
  }
}
```


**Sad Paths to consider:**
1. This Merchant already has 5 active coupons
2. Coupon code entered is NOT unique

</section>

<section class="dropdown">
### 4. Merchant Coupon Deactivate

Updates a coupon from active to inactive

**Request**
```bash
PATCH /api/v1/merchants/:merchant_id/coupons/:id
Content-Type: application/json
Accept: application/json

{
  "status": "inactive"
}
```

**Response**

```json
status: 200
body:

{
  "data": {
    "id": "1",
    "type": "coupon",
    "attributes": {
      "name": "Buy One Get One 50",
      "code": "BOGO50",
      "amount_off": 50,
      "percent_off": null,
      "status": "inactive",
      "merchant_id": 1,
      "uses": 1
    }
  }
}
```

**Sad Paths to consider:**
1. A coupon cannot be deactivated if there are any pending invoices with that coupon.
</section>

<section class="dropdown">
### 5. Merchant Coupon Activate

Updates a coupon from inactive to active

```bash
PATCH /api/v1/merchants/:merchant_id/coupons/:id
Content-Type: application/json
Accept: application/json

{
  "status": "active"
}
```

```json
status: 200
body:

{
  "data": {
    "id": "1",
    "type": "coupon",
    "attributes": {
      "name": "Buy One Get One 50",
      "code": "BOGO50",
      "amount_off": 50,
      "percent_off": null,
      "status": "active",
      "merchant_id": 1,
      "uses": 2
    }
  }
}
```
</section>

----

## 2) Iterating on Existing Endpoints

<section class="dropdown">
### 6. Merchant Coupon Index Sorted

When passed a query param, returns coupons sorted by active or inactive

**Request**
```bash
GET /api/v1/merchants/:merchant_id/coupons?sort=status
Content-Type: application/json
Accept: application/json
```

**Response**

```json
{
  "data": [
    {
      "id": "1",
      "type": "coupon",
      "attributes": {
        "name": "Buy One Get One 50",
        "code": "BOGO50",
        "amount_off": 50,
        "percent_off": null,
        "status": "active",
        "merchant_id": 1,
        "uses": 1
      }
    },
    {
      "id": "3",
      "type": "coupon",
      "attributes": {
        "name": "One More Coupon",
        "code": "MONEYOFF",
        "amount_off": 10,
        "percent_off": null,
        "status": "active",
        "merchant_id": 1,
        "uses": 2
      }
    },
    {
      "id": "2",
      "type": "coupon",
      "attributes": {
        "name": "25 Percent Sale",
        "code": "25PERCENT",
        "amount_off": null,
        "percent_off": 25,
        "status": "inactive",
        "merchant_id": 1,
        "uses": 0
      }
    },
  ]
}
```
</section>

<section class="dropdown">
### 7. Merchant Invoice

Return a merchant's invoice and include the id of the coupon used (if one was used)

**Request**
```bash
GET /api/v1/merchants/:merchant_id/invoices/:id
Content-Type: application/json
Accept: application/json
```

**Response**

```json
{
  "data": [
    {
      "id": "86",
        "type": "invoice",
        "attributes": {
          "customer_id": "17",
          "merchant_id": "3",
          "coupon_id": "1",
          "status": "shipped"
        }
    },
    {
      "id": "186",
        "type": "invoice",
        "attributes": {
          "customer_id": "39",
          "merchant_id": "3",
          "coupon_id": "2",
          "status": "shipped"
        }
    },
    {
      "id": "318",
        "type": "invoice",
        "attributes": {
          "customer_id": "67",
          "merchant_id": "3",
          "coupon_id": null,
          "status": "shipped"
        }
    }
  ]
}
```

</section>

<section class="dropdown">
### 8. Merchants

Update the merchants endpoint to include a count of coupons for each merchant and a count of invoices with coupons applied for each merchant.

**Request**
```bash
GET /api/v1/merchants
Content-Type: application/json
Accept: application/json
```

**Response**

```json
{
  "data": [
    {
      "id": "1",
        "type": "merchant",
        "attributes": {
          "name": "Mike's Awesome Store",
          "coupons_count": 3,
          "invoice_coupon_count": 2
        }
    },
    {
      "id": "2",
      "type": "merchant",
      "attributes": {
        "name": "Store of Fate",
        "coupons_count": 0,
        "invoice_coupon_count": 0
      }
    },
    {
      "id": "3",
      "type": "merchant",
      "attributes": {
        "name": "This is the limit of my creativity",
        "coupons_count": 1,
        "invoice_coupon_count": 4
      }
    }
  ]
}
  
```

</section>



----

## 3) Frontend

TODO: Add the frontend stories

----

## Extensions

Students can pick one or more of these extension features to add to their project: 

1. On the Merchant Coupon Index page, active and inactive coupons are sorted in order of popularity, from most to least. 
2. Inactive coupons cannot be added to an Invoice. 
3. A Coupon has a maximum number of uses before it is automatically deactivated. When implemented, prove that the number of times used on the Merchant Coupon Show Page is updated accordingly. 
4. Generate unique coupon codes as suggestions when creating a new coupon.
