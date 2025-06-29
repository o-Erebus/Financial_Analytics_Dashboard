# Financial Analytics Dashboard - Backend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

This is the backend API for the Financial Analytics Dashboard application. It's a Node.js application built with Express and TypeScript, providing secure authentication and comprehensive transaction management.

## 🚀 Features

- User authentication with JWT
- CRUD operations for financial transactions
- Data filtering, sorting, and pagination
- Export data to CSV format
- Transaction statistics and analytics
- MongoDB integration with Mongoose
- TypeScript for type safety
- Comprehensive error handling

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Development**: Nodemon for hot reloading
- **Data Export**: JSON to CSV conversion

## 📋 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/o-Erebus/Financial_Analytics_Dashboard.git
   cd Financial_Analytics_Dashboard/loopr_ai_backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment file**:
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file**:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/financial_analytics
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript to JavaScript
npm start            # Start production server
npm run lint         # Run ESLint
npm run load-data    # Load sample data (if available)
```

## 📚 API Documentation

The API endpoints are defined in the `src/routes` directory. You can test the endpoints using tools like Postman or by running the `test-api.ts` script.

**Detailed API documentation with request/response structures can be found in [DOCS.md](./DOCS.md)**

### Quick API Overview

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/transactions` - Get transactions (with filtering/pagination)
- `POST /api/transactions` - Create new transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/export` - Export transactions to CSV

## 📁 Project Structure

```
src/
├── config/         # Database configuration
├── controllers/    # Request handlers
├── middleware/     # Express middleware
├── models/         # Mongoose models
├── routes/         # API routes
└── server.ts       # Main server file
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

## 📝 License

This project is licensed under the MIT License.
