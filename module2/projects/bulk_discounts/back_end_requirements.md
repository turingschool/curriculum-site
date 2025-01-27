---
layout: page
title: Bulk Discounts BE Requirements
type: project
---

## Database Notes

Regardless of which setup option you choose, you will need to make database migrations to complete this project. Our initial database setup happens when running `rails db:seed` because we're using a Postgres database dump file. You might run into issues if you reset your database (i.e. drop it and recreate it). Typically, Rails doesn't allow you to run your seeds file before you run database migrations, but you will have to do that on your project since your seeding step sets up the preliminary database. If you need to reset your database, run the following in this order:

```bash
rails db:{drop,create}
rails runner ActiveRecord::Tasks::DatabaseTasks.load_seed
rails db:migrate
```

----

## Functionality Overview

* A Coupon belongs to a Merchant
* An Invoice **optionally** belongs to a Coupon. An Invoice may only have **one** coupon.
  * Note: When creating this new association on Invoice, your existing tests will fail unless the association is optional. Use [these guides](https://guides.rubyonrails.org/association_basics.html#optional) as a reference.
  * You are **not** required to build functionality for a user applying a Coupon to an Invoice, but can instead use test data, Rails Console or seed data to add Coupons to existing invoices to verify behavior.
* You should build full CRUD functionality for coupons with criteria/restrictions defined below:
  * A Merchant can have any number of Coupons in the system.
  * A Merchant can only have a maximum of 5 activated Coupons in the system at one time.
  * A Merchant cannot delete a Coupon, rather they can only activate/deactivate them.
  * At minimum a Coupon:
    * Has a name
    * Has a unique code (e.g. "BOGO50"). This code must be unique in the whole database.
    * Can be either percent-off or dollar-off value. Your database table must be able to store both types.

## 1) CRUD Endpoints

Below is the expected JSON response for each request. We have also outlined a few examples of Sad Paths you may consider adding in. In your project, you should take time to implement at least 2 sad paths total, but you are not limited to the examples we provide.

<section class="dropdown">
### 1. Merchant Bulk Discount Show

Returns a specific bulk discount, including its percentage discount and quantity threshold.

**Response**

```json
status: 200
body:
{
  "data": {
    "id": "1",
    "type": "bulk_discount",
    "attributes": {
      "name": "Buy 10 Get 20% Off",
      "quantity_threshold": 10,
      ... remaining attributes go here ...
    }
  }
}
```

</section>

<section class="dropdown">
### 2. Merchant Bulk Discounts Index

Returns all bulk discounts for a specific merchant.

**Response**

```json
status: 200
body:
{
  "data": [
    {
      "id": "1",
      "type": "bulk_discount",
      "attributes": {
        "name": "Buy 10 Get 20% Off",
        "quantity_threshold": 10,
        ... remaining attributes go here ...
      }
    },
    {
      "id": "2",
      "type": "bulk_discount",
      "attributes": {
        "name": "Buy 15 Get $15 Off",
        "quantity_threshold": 15,
        ... remaining attributes go here ...
      }
    }
    ... remaining merchant discounts go here ...
  ]
}
```

</section>

<section class="dropdown">
### 3. Merchant Bulk Discount Create

Create a new bulk discount for a merchant.

**Response**

```json
status: 201
body:
{
  "data": {
    "id": "1",
    "type": "bulk_discount",
    "attributes": {
      "name": "Buy 10 Get 20% Off",
      "quantity_threshold": 10,
      ... remaining attributes go here ...
    }
  }
}
```

**Sad Paths to consider**:

* The percentage exceeds 100 or is below 0.
* The quantity threshold is invalid (i.e., less than 1).
* Merchant already has 5 active discounts
* Discount code entered is NOT unique

</section>

<section class="dropdown">
### 4. Merchant Bulk Discount Delete

Deletes a bulk discount, if eligible.

**Response**

```json
status: 204
body: *No Content*
```

**Sad Paths to consider**:

* The bulk discount cannot be deleted if it is tied to pending invoices.

</section>

## 2) Iterating on Existing Endpoints

<section class="dropdown">
### 5. Merchant Bulk Discounts Index Filtered

When passed a query parameter, returns bulk discounts filtered by that criteria (i.e., by discount amount, discount type, or quantity threshold).

</section>

<section class="dropdown">
### 6. Merchant Invoice Show Page: Discounted Revenue

Returns the total revenue and discounted revenue for a merchant on an invoice.

**Request**

```
GET /api/v1/merchants/:merchant_id/invoices/:invoice_id
Content-Type: application/json
Accept: application/json
```

#### Solution Example:

* For each `InvoiceItem`, use ActiveRecord to:
  1. Fetch the `unit_price` and `quantity`.
  2. Query for the highest applicable `BulkDiscount` using `.where` and `.order`.
  3. Apply the discount directly in SQL. (See: [COALESCE](https://www.w3schools.com/sql/func_sqlserver_coalesce.asp))

Use separate ActiveRecord queries for each operation without iterating in Ruby.

**Response**

```json
status: 200
body:
{
  "data": {
    "id": "1",
    "type": "invoice",
    "attributes": {
      "total_revenue": 500,
      "discounted_revenue": 400,
      "merchant_id": 3
    }
  }
}
```

</section>

<section class="dropdown">
### 7. Merchant Invoice Items

Returns all invoice items for a merchant and indicates which bulk discounts were applied.

#### Solution Example:

* Use `.joins` to connect `InvoiceItem` to `BulkDiscount` via `Item`.
* Filter applicable discounts using `.where`.
* Return `InvoiceItem` details, including the applied discount (if any), using `.select`.

**Request**

```
GET /api/v1/merchants/:merchant_id/invoices/:invoice_id/items
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
      "type": "invoice_item",
      "attributes": {
        "item_id": 5,
        "quantity": 12,
        "unit_price": 50,
        "discount_applied": {
          "id": 2,
          "percentage": 20
        }
      }
    },
    {
      "id": "2",
      "type": "invoice_item",
      "attributes": {
        "item_id": 6,
        "quantity": 5,
        "unit_price": 40,
        "discount_applied": null
      }
    }
  ]
}

```

</section>

<section class="dropdown">
### 8. Merchants

Update the merchants index endpoint to include the total number of bulk discounts for each merchant.

#### Solution Example:

* For each `Merchant`, fetch the count of associated discounts using `.where`.
* Return each merchant's attributes along with the count of discounts directly.

**Request**

```
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
        "name": "Merchant One",
        "bulk_discounts_count": 3,
        "invoices_with_discounts_count": 2
      }
    },
    {
      "id": "2",
      "type": "merchant",
      "attributes": {
        "name": "Merchant Two",
        "bulk_discounts_count": 1,
        "invoices_with_discounts_count": 0
      }
    }
  ]
}
```

</section>
