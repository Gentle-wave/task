Here is a detailed `README.md` file that includes all the important information for setting up, running, and testing the project along with API documentation for all the endpoints:

---

# E-commerce RESTful API

This project is a simple E-commerce RESTful API built with **Node.js**, **Express**, and **MongoDB**. It supports basic CRUD operations for **Users**, **Products**, and **Carts**. The API includes authentication and authorization using **JWT (JSON Web Tokens)** and is designed to protect certain routes so that only authenticated users or admins can access them.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [User Authentication](#user-authentication)
  - [Product Management](#product-management)
  - [Cart Management](#cart-management)
- [Error Handling](#error-handling)

---

## Features

- **User Authentication**: Register and log in users using JWT for secure access to protected routes.
- **Admin Authorization**: Only admins can add, update, or delete products.
- **Product CRUD Operations**: Create, read, update, and delete products.
- **Cart Management**: Users can add products to their cart, view their cart, remove specific products, or clear the cart completely.
- **Error Handling**: Comprehensive error handling for all API endpoints.

---

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT**: Secure authentication with JSON Web Tokens.
- **bcryptjs**: Hashing passwords for secure storage.
- **dotenv**: Load environment variables.

---

## Installation

To get started with the project, clone the repository and install the dependencies using npm:

```bash
git clone <repository-url>
cd ecommerce-api
npm install
```

---

## Running the Project

Make sure to configure the environment variables (see below). Once installed, you can run the project using:

```bash
node index.js
```

The server will be running on the port specified in the `.env` file (default is `5000`).

---

## Environment Variables

Create a `.env` file in the root directory and configure the following environment variables:

```bash
MONGO_URI=<your-mongo-db-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

---

## API Documentation

### User Authentication

#### 1. Register a User

**Endpoint**: `/api/users/register`  
**Method**: `POST`  
**Protected**: No  
**Payload**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "_id": "64f1d1b028ef4e8f9b012345",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "<jwt-token>"
}
```

---

#### 2. Login a User

**Endpoint**: `/api/users/login`  
**Method**: `POST`  
**Protected**: No  
**Payload**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "_id": "64f1d1b028ef4e8f9b012345",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "<jwt-token>"
}
```

---

### Product Management

#### 1. Get All Products

**Endpoint**: `/api/products`  
**Method**: `GET`  
**Protected**: No  
**Response**:
```json
[
  {
    "_id": "64f1e2a328ef4e8f9b023456",
    "name": "Product 1",
    "price": 99.99,
    "description": "A cool product"
  }
]
```

---

#### 2. Create a Product (Admin Only)

**Endpoint**: `/api/products`  
**Method**: `POST`  
**Protected**: Yes (Admin)  
**Payload**:
```json
{
  "name": "Product 1",
  "price": 99.99,
  "description": "A cool product"
}
```

**Response**:
```json
{
  "_id": "64f1e2a328ef4e8f9b023456",
  "name": "Product 1",
  "price": 99.99,
  "description": "A cool product"
}
```

---

#### 3. Update a Product (Admin Only)

**Endpoint**: `/api/products/:id`  
**Method**: `PUT`  
**Protected**: Yes (Admin)  
**Payload**:
```json
{
  "name": "Updated Product",
  "price": 79.99,
  "description": "Updated product description"
}
```

**Response**:
```json
{
  "_id": "64f1e2a328ef4e8f9b023456",
  "name": "Updated Product",
  "price": 79.99,
  "description": "Updated product description"
}
```

---

#### 4. Delete a Product (Admin Only)

**Endpoint**: `/api/products/:id`  
**Method**: `DELETE`  
**Protected**: Yes (Admin)  
**Response**:
```json
{
  "message": "Product removed"
}
```

---

### Cart Management

#### 1. Get User's Cart

**Endpoint**: `/api/cart`  
**Method**: `GET`  
**Protected**: Yes (User)  
**Response**:
```json
{
  "_id": "64f2f1b228ef4e8f9b012347",
  "user": "64f1d1b028ef4e8f9b012345",
  "products": [
    {
      "_id": "64f1e2a328ef4e8f9b023456",
      "name": "Product 1",
      "price": 99.99
    }
  ]
}
```

---

#### 2. Add Product to Cart

**Endpoint**: `/api/cart`  
**Method**: `POST`  
**Protected**: Yes (User)  
**Payload**:
```json
{
  "productId": "64f1e2a328ef4e8f9b023456"
}
```

**Response**:
```json
{
  "_id": "64f2f1b228ef4e8f9b012347",
  "user": "64f1d1b028ef4e8f9b012345",
  "products": [
    "64f1e2a328ef4e8f9b023456"
  ]
}
```

---

#### 3. Remove Product from Cart

**Endpoint**: `/api/cart/:productId`  
**Method**: `DELETE`  
**Protected**: Yes (User)  
**Payload**:
```json
{
  "productId": "64f1e2a328ef4e8f9b023456"
}
```

**Response**:
```json
{
  "message": "Product removed from cart",
  "cart": {
    "user": "64f1d1b028ef4e8f9b012345",
    "products": []
  }
}
```

---

#### 4. Clear Cart

**Endpoint**: `/api/cart/clear/cart`  
**Method**: `DELETE`  
**Protected**: Yes (User)  
**Response**:
```json
{
  "message": "Cart has been cleared",
  "cart": {
    "user": "64f1d1b028ef4e8f9b012345",
    "products": []
  }
}
```
### User Management

#### 1. Get All Users (Admin Only)

**Endpoint**: `/api/users`  
**Method**: `GET`  
**Protected**: Yes (Admin)  
**Response**:
```json
[
  {
    "_id": "64f1d1b028ef4e8f9b012345",
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": true
  },
  {
    "_id": "64f1d1b028ef4e8f9b012346",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "isAdmin": false
  }
]
```

---

#### 2. Get User by ID (Admin Only)

**Endpoint**: `/api/users/:id`  
**Method**: `GET`  
**Protected**: Yes (Admin)  
**Response**:
```json
{
  "_id": "64f1d1b028ef4e8f9b012345",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": true
}
```

---

## Routes

In the `authRoute.js`, add these routes for getting all users and getting a user by ID:

```js
const express = require('express');
const router = express.Router();
const { getUsers, getUserById } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all users (Admin only)
router.route('/').get(protect, admin, getUsers);

// Get a user by ID (Admin only)
router.route('/:id').get(protect, admin, getUserById);

module.exports = router;
```

## Error Handling

All errors are handled by a custom error handler and middleware. The responses are structured as:

```json
{
  "status": "fail",
  "message": "Error message"
}
```

For validation errors, the response might include detailed information about the failed validation.

---

### Conclusion

This README provides a complete guide to setting up and running the project, along with detailed API documentation for testing each endpoint in your API. If you have any questions or issues, feel free to reach out!
