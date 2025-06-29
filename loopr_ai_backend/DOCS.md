# Application Documentation

This document provides a detailed overview of the Loopr AI backend application, including the directory structure, files, and functions.

## Project Structure

The backend is structured as follows:

```
src/
├── config/         # Database configuration
├── controllers/    # Request handlers
├── middleware/     # Express middleware
├── models/         # Mongoose models
├── routes/         # API routes
└── server.ts       # Main server file
```

## `src/` Directory

### `server.ts`

This is the main entry point of the application. It sets up the Express server, connects to the database, applies middleware, and defines the API routes.

### `config/db.ts`

This file contains the logic for connecting to the MongoDB database using Mongoose.

- **`connectDB()`**: An asynchronous function that connects to the MongoDB database using the `MONGO_URI` from the environment variables.

### `controllers/`

This directory contains the controllers that handle the business logic for each API route.

#### `authController.ts`

- **`loginUser(req, res, next)`**: Authenticates a user and returns a JWT token.
    - **Request:** `POST /api/auth/login`
        - **Body:** `{ "username": "string", "password": "string" }`
    - **Response:**
        - **Success (200):** `{ "_id": "string", "username": "string", "user_profile": "string", "token": "string" }`
        - **Error (400):** `{ "message": "Please provide username and password" }`
        - **Error (401):** `{ "message": "Invalid username or password" }`
- **`registerUser(req, res, next)`**: Registers a new user.
    - **Request:** `POST /api/auth/register`
        - **Body:** `{ "username": "string", "password": "string", "user_profile": "string" }`
    - **Response:**
        - **Success (201):** `{ "_id": "string", "username": "string", "user_profile": "string", "token": "string" }`
        - **Error (400):** `{ "message": "Please provide all fields" }` or `{ "message": "User already exists" }` or `{ "message": "Invalid user data" }`
- **`getUserProfile(req, res, next)`**: Retrieves the profile of the currently authenticated user.
    - **Request:** `GET /api/auth/profile`
        - **Headers:** `Authorization: Bearer <token>`
    - **Response:**
        - **Success (200):** `{ "_id": "string", "username": "string", "user_profile": "string" }`
        - **Error (401):** `{ "message": "Not authorized, token failed" }` or `{ "message": "Not authorized, user not found" }`

#### `transactionController.ts`

- **`getTransactions(req, res, next)`**: Retrieves a paginated, sorted, and filtered list of transactions.
    - **Request:** `GET /api/transactions`
        - **Headers:** `Authorization: Bearer <token>`
        - **Query Params:** `page`, `limit`, `sortBy`, `sortOrder`, `search`, `category`, `status`, `user_id`, `startDate`, `endDate`, `minAmount`, `maxAmount`
    - **Response:**
        - **Success (200):** `{ "transactions": [...], "currentPage": "number", "totalPages": "number", "totalTransactions": "number" }`
- **`exportTransactionsToCSV(req, res, next)`**: Exports transactions to a CSV file.
    - **Request:** `GET /api/transactions/export`
        - **Headers:** `Authorization: Bearer <token>`
        - **Query Params:** `fields`, `sortBy`, `sortOrder`, `search`, `category`, `status`, `user_id`, `startDate`, `endDate`, `minAmount`, `maxAmount`
    - **Response:**
        - **Success (200):** CSV file download
- **`getTransactionStats(req, res, next)`**: Retrieves statistics about transactions.
    - **Request:** `GET /api/transactions/stats`
        - **Headers:** `Authorization: Bearer <token>`
    - **Response:**
        - **Success (200):** `{ "totalRevenue": "number", "totalExpenses": "number", "netProfit": "number", "transactionCount": "number", "averageTransactionAmount": "number" }`

### `middleware/`

This directory contains custom middleware for the Express application.

#### `authMiddleware.ts`

- **`protect(req, res, next)`**: A middleware function that protects routes by verifying the JWT token in the request headers.

#### `errorMiddleware.ts`

- **`notFound(req, res, next)`**: Handles requests to non-existent routes.
- **`errorHandler(err, req, res, next)`**: A general error handler that formats and returns error responses.

### `models/`

This directory contains the Mongoose schemas and models for the database.

#### `Transaction.ts`

Defines the schema for the `Transaction` collection, including fields like `id`, `date`, `amount`, `category`, `status`, and `user_id`.

#### `User.ts`

Defines the schema for the `User` collection, including fields like `username`, `password`, and `user_profile`. It also includes a `matchPassword` method to compare passwords.

### `routes/`

This directory contains the route definitions for the API.

#### `authRoutes.ts`

Defines the routes for authentication, such as `/login`, `/register`, and `/profile`.

#### `transactionRoutes.ts`

Defines the routes for transactions, such as `/`, `/export`, and `/stats`.
