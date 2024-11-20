---
layout: page
title: Coupon Codes BE Requirements
type: project
---

_[Back to Coupon Codes Home](./index)_

## Database Notes

Regardless of which setup option you choose, you will need to make database migrations to complete this project. Our initial database setup happens when running `rails db:seed` because we're using a Postgres database dump file. You might run into issues if you reset your database (i.e. drop it and recreate it). Typically, Rails doesn't allow you to run your seeds file before you run database migrations, but you will have to do that on your project since your seeding step sets up the preliminary database. If you need to reset your database, run the following in this order:

```bash
rails db:{drop,create}
rails runner ActiveRecord::Tasks::DatabaseTasks.load_seed
rails db:migrate
```
-----

## Functionality Overview

* A Coupon belongs to a Merchant
* An Invoice optionally belongs to a Coupon. An invoice may only have one coupon.
  * Note: When creating this new association on Invoice, your existing tests will fail unless the association is optional. Use [these guides](https://guides.rubyonrails.org/association_basics.html#optional) as a reference.
  * You are not required to build functionality for a user applying a coupon to an invoice, but can instead use test data, Rails console or seed data to add coupons to existing invoices to verify behavior.
* You should build full CRUD functionality for coupons with criteria/restrictions defined below:
   - A merchant can have a maximum of 5 activated coupons in the system at one time.
   - A merchant cannot delete a coupon, rather they can activate/deactivate them.
   - A Coupon has a name, unique code (e.g. "BOGO50"), and either percent-off or dollar-off value. The coupon's code must be unique in the whole database.


​
## 1) CRUD Endpoints

Below is the expected JSON response for each request. We have also outlined a few examples of Sad Paths you may consider adding in. In your project, you should take time to implement at least 2 sad paths total, but you are not limited to the examples we provide. 

<section class="dropdown">
### 1. Merchant Coupon Show 

Returns a specific coupon and shows a count of how many times that coupon has been used.

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
      ...remaining attributes go here...   
    }
  }
}

```
</section>

<section class="dropdown">
### 2. Merchant Coupons Index 

Returns all of a merchant's coupons

**Response**

```json
status: 200
body:

{
  "data": [
    {
      "id": "1",
      "type": "coupon",
      "attributes": {
        "name": "Buy One Get One 50",
        ...remaining attributes go here...
      }
    },
    {
      "id": "2",
      "type": "coupon",
      "attributes": {
        "name": "25 Percent Sale",
        ...remaining attributes go here...
      }
    },
    {
      "id": "3",
      "type": "coupon",
      "attributes": {
        "name": "One More Coupon",
       ...remaining attributes go here...
      }
    }
  ]
}
```
</section>

<section class="dropdown">
### 3. Merchant Coupon Create 

Create a new coupon for a merchant

**Response**

```json
status: 201
body:

{
  "data": {
    "id": "1",
    "type": "coupon",
    "attributes": {
      "name": "Buy One Get One 50",
      ...remaining attributes go here...
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
      ...remaining attributes go here...
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
      ...remaining attributes go here...
    }
  }
}
```
</section>

----

## 2) Iterating on Existing Endpoints

<section class="dropdown">
### 6. Merchant Coupon Index Filtered

When passed a query param, returns coupons filtered by active or inactive

</section>

<section class="dropdown">
### 7. Merchant Invoice

Return a merchant's invoices and include the id of the coupon used (if one was used)

**Request**
```bash
GET /api/v1/merchants/:merchant_id/invoices
Content-Type: application/json
Accept: application/json
```

**Response**

```json
status: 200
body:

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

Update the merchants index endpoint to include a count of coupons for each merchant and a count of invoices with coupons applied for each merchant.

**Request**
```bash
GET /api/v1/merchants
Content-Type: application/json
Accept: application/json
```

**Response**

```json
status: 200
body:

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
