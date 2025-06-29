# Loopr AI Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is the backend for the Loopr AI financial analytics application. It is a Node.js application built with Express and TypeScript.

## Features

*   User authentication with JWT
*   CRUD operations for financial transactions
*   Data filtering, sorting, and pagination
*   Export data to CSV format
*   Transaction statistics

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/loopr-ai-backend.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the root directory and add the necessary environment variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5001
    ```
4.  Start the server:
    ```bash
    npm start
    ```

## API Endpoints

The API endpoints are defined in the `src/routes` directory. You can test the endpoints using a tool like Postman or by running the `test-api.ts` script.

A detailed documentation of the API, including request and response structures, can be found in [DOCS.md](DOCS.md).

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.
