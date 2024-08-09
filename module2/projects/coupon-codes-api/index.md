---
title: Coupon Codes API
---

This project is an extension of the Rails Engine group project. You will add functionality for merchants to create coupons for their shop. 

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

This project is an extension of Rails Engine. Students have two options for setup:

1. If your Rails Engine project is complete, you can use it as a starting point for this project. If you are not the repo owner, fork the project to your account. If you are the repo owner, you can work off the repo without forking, just make sure your teammates have a chance to fork before pushing any commits to your repo.
1. If your Rails Engine project is _not_ complete, fork ****Update** [this repo](need to update)** as a starting point for this project.

## Evaluation
Evaluation information for this project can be found [here](./evaluation).

-----

## Functionality Overview

* A Coupon belongs to a Merchant
* You should be full CRUD functionality for coupons with criteria/restrictions defined below:
   - A merchant can have a maximum of 5 activated coupons in the system at one time.
   - A merchant cannot delete a coupon, rather they can activate/deactivate them.
   - A Coupon has a name, unique code (e.g. "BOGO50"), and either percent-off or dollar-off value. The coupon's code must be unique in the whole database.
* If a coupon's dollar value (ex. "$10 off") exceeds the total cost of that merchant's items on the invoice, the grand total for that merchant's items should then be $0. (In other words, the merchant will never *owe* money to a customer.)
* A coupon code from a Merchant only applies to Items sold by that Merchant.

​
## JSON Contract

Below is the expected JSON response for each request. We have also outlined a few examples of Sad Paths you may consider adding in. In your project, you should take time to implement at least 2 sad paths total, but you are not limited to the examples we provide. 

<section class="dropdown">
### 1. Merchant Coupons Index 

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
        "merchant_id": 1
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
        "merchant_id": 1
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
        "merchant_id": 1
      }
    }
  ]
}
```
</section>

<section class="dropdown">
### 2. Merchant Coupon Create 

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
      "merchant_id": 1
    }
  }
}
```


**Sad Paths to consider:**
1. This Merchant already has 5 active coupons
2. Coupon code entered is NOT unique

</section>

<section class="dropdown">
### 3. Merchant Coupon Show Page 

Returns a specific coupon

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
      "merchant_id": 1    
    }
  }
}

```
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
      "merchant_id": 1    
    }
  }
}
```

<!-- **Sad Paths to consider:**
1. A coupon cannot be deactivated if there are any pending invoices with that coupon. -->
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
      "merchant_id": 1    
    }
  }
}
```
</section>

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
        "merchant_id": 1
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
        "merchant_id": 1
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
        "merchant_id": 1
      }
    },
  ]
}
```
</section>

<section class="dropdown">
### 7. Merchant Invoice Show Page: Subtotal and Grand Total Revenues

As a merchant
When I visit one of my merchant invoice show pages
I see the subtotal for my merchant from this invoice (that is, the total that does not include coupon discounts)
And I see the grand total revenue after the discount was applied
And I see the name and code of the coupon used as a link to that coupon's show page.
```

```
</section>

<section class="dropdown">
### 8. Admin Invoice Show Page: Subtotal and Grand Total Revenues

As an admin
When I visit one of my admin invoice show pages
I see the name and code of the coupon that was used (if there was a coupon applied)
And I see both the subtotal revenue from that invoice (before coupon) and the grand total revenue (after coupon) for this invoice.

* Alternate Paths to consider: 
1. There may be invoices with items from more than 1 merchant. Coupons for a merchant only apply to items from that merchant.
2. When a coupon with a dollar-off value is used with an invoice with multiple merchants' items, the dollar-off amount applies to the total amount even though there may be items present from another merchant.
```
</section>



----


## Extensions

Students can pick one or more of these extension features/stories to add to their project: 

1. On the Merchant Coupon Index page, active and inactive coupons are sorted in order of popularity, from most to least. 
2. Coupons can be used by multiple customers, but may only be used one time per customer.
3. Inactive coupons cannot be added to an Invoice. 
4. A Coupon has a maximum number of uses before it is automatically deactivated. When implemented, prove that the number of times used on the Merchant Coupon Show Page is updated accordingly. 
5. Holiday Coupons can be used up to 1 week from the actual holiday date. The coupon should automatically inactivate once someone tries to create an Invoice with that Coupon after a week of the holiday.
6. Generate unique coupon codes as suggestions when creating a new coupon.

API Consumption is available for this project as an extension as well. 

```
9: Holidays API

As a merchant
When I visit the coupons index page
I see a section with a header of "Upcoming Holidays"
In this section the name and date of the next 3 upcoming US holidays are listed.

Use the Next Public Holidays Endpoint in the [Nager.Date API](https://date.nager.at/swagger/index.html)
```

```
10. Create a Holiday Coupon

As a merchant,
when I visit my coupons index page,
In the Holiday Coupons section, I see a `Create Coupon` button next to each of the 3 upcoming holidays.
When I click on the button I am taken to the new coupon page where I see a pre-filled name in the form, similar to:

   Name: <name of holiday> coupon
   Code: <uniquely generated code suggestion>

All other fields, I will need to fill out myself
I can leave the information as-is, or modify it before saving.
When I click save, 
I am redirected to my coupon index page where I see the newly-created coupon added to the list.
```

```
11. View a Holiday Coupon

As a merchant (if I have created a holiday coupon for a specific holiday),
when I visit my coupon index page,
within the `Upcoming Holidays` section I should not see the button to 'Create a Coupon' next to that holiday,
instead I should see a `View coupon` link.
When I click the link 
I am taken to the coupon show page for that holiday coupon.
```

