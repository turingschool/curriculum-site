---
layout: page
title: Little Shop Extensions
length: 1 week
tags:
type: project
---

# Extensions & Extra Practice


## External API Consumption

<br>

<details><summary><h3>9. Get Item Images</h3></summary>

#### Details: 
1. The endpoint should be in the pattern of `GET /api/v1/items/:id`, to add onto the "Fetch a Single Record" endpoint (#2 above).
2. You will need to utilize the [Unsplash API](https://unsplash.com/documentation) for this - specifically, the [Search Photos](https://unsplash.com/documentation#search-photos) endpoint. Supply a query that would work for this item's name, and use the API to retrieve an image to represent this item. 
3. If an invalid image id is passed in, a 404 status as well as a descriptive error message should be sent back in the response.
4. The `data` top level key should always point to an array even if one or zero images were found for this image. 
5. If no image is found, a link to a placeholder image URL can be used (see [placehold.co](https://placehold.co/)), using the `Text` option to include a URL-encoded string representing the Item's name in the placeholder image. 

    <details><summary><h5>Example #1 😁 </h5></summary>

    **Request:**
    ```
      GET /api/v1/item/1
      Content-Type: application/json
      Accept: application/json
    ```

    **Response:**
    `status: 200`
    ```json
    {
      "data": {
        "id": "1",
        "type": "item",
        "attributes": {
          "name": "Super Widget",
          "description": "A most excellent widget of the finest crafting",
          "unit_price": 109.99, 
          "image_url": "https://api.unsplash.com/photos/eOLpJytrbsQ" //or, https://placehold.co/600x400?text=Super+Widget
        }
      }
    }
    ```
    </details>
    <details><summary><h5>Example #2 😭 </h5></summary>
      
      **Request:**
      ```
      GET /api/v1/item/123123123123 (where this is an invalid ID)
      Content-Type: application/json
      Accept: application/json
      ```

      **Response:** 
      `status: 404`
      ```json
    {
        "errors": [
            {
                "detail": "Couldn't find Item with 'id'=123123123123"
            }
        ]
    }
      ```
    </details>

    ---

</details>



<details><summary><h3>10. Get Merchant Images</h3></summary>

#### Details: 
1. The endpoint should be in the pattern of `GET /api/v1/merchants/:id`, to add onto the "Fetch a Single Record" endpoint (#2 above).
2. You will need to utilize the [Unsplash API](https://unsplash.com/documentation) for this - specifically, the [Search Photos](https://unsplash.com/documentation#search-photos) endpoint. Supply a query that would work for this merchant's name, and use the API to retrieve an image to represent this merchant. 
3. If an invalid image id is passed in, a 404 status as well as a descriptive error message should be sent back in the response.
4. The `data` top level key should always point to an array even if one or zero images were found for this image. 
5. If no image is found, a link to a placeholder image URL can be used (see [placehold.co](https://placehold.co/)), using the `Text` option to include a URL-encoded string representing the merchant's name in the placeholder image. 

    <details><summary><h5>Example #1 😁 </h5></summary>

    **Request:**
    ```
      GET /api/v1/merchant/1
      Content-Type: application/json
      Accept: application/json
    ```

    **Response:**
    `status: 200`
    ```json
   {
      "data": [
        {
          "id": "1",
            "type": "merchant",
            "attributes": {
              "name": "Mike's Awesome Store",
              "image_url": "https://api.unsplash.com/photos/eOLpJytrbsQ" //or, https://placehold.co/600x400?text=Mike%27s\nAwesome\nStore
            }
        }
      ]
    },
    ```
    </details>
    <details><summary><h5>Example #2 😭 </h5></summary>
      
      **Request:**
      ```
      GET /api/v1/merchant/123123123123 (where this is an invalid ID)
      Content-Type: application/json
      Accept: application/json
      ```

      **Response:** 
      `status: 404`
      ```json
    {
        "errors": [
            {
                "detail": "Couldn't find merchant with 'id'=123123123123"
            }
        ]
    }
      ```
    </details>
</details>
