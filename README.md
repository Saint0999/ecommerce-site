# MyStore - E-Commerce Web App

A simple e-commerce web application built using **HTML, CSS, and Vanilla JavaScript**.  
This project demonstrates dynamic product rendering, cart management, and local storage handling without using any frameworks.


## Features

- Fetch and display products dynamically from API
- Add items to cart
- Buy Now (instant purchase of a single item)
- Remove items from cart
- Persistent cart using `localStorage`
- Dynamic total price calculation
- Order confirmation page


## Concepts Used

- DOM Manipulation
- Event Listeners
- Fetch API (async/await)
- Arrays & Objects
- localStorage (JSON.stringify / JSON.parse)
- Conditional Rendering
- Basic CSS Flexbox


---

## How It Works

### 1. Products Page
- Fetches products from Fake Store API
- Dynamically creates product cards
- Each card has:
  - Add to Cart button
  - Buy Now button


### 2. Add to Cart
- Stores items in an array
- Saves to `localStorage` under `"cart"`
- Multiple items allowed


### 3. Buy Now
- Stores only ONE item in `"buyNow"`
- Overrides cart temporarily
- Redirects to cart page instantly


### 4. Cart Page Logic

```js
const itemsToShow = buyNowData.length ? buyNowData : cartData;
