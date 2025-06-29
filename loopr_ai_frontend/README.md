# Penta Finance Dashboard

A modern, responsive dashboard for Penta Finance built with React, TypeScript, and Vite.

## ✨ Features

- **User Authentication**: Secure login functionality.
- **Financial Overview**: Interactive chart displaying financial data.
- **Recent Transactions**: A quick look at the latest transactions.
- **Transaction History**: A paginated and filterable table of all transactions.
- **Responsive Design**: A clean and modern UI that works on all screen sizes.

## 🚀 Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Material-UI (MUI)](https://mui.com/)
- **State Management**: React Context API
- **Routing**: [React Router](https.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## 📂 Project Structure

The project follows a feature-based structure:

```
src/
├── api/                # API service calls
├── assets/             # Static assets (images, svgs)
├── components/         # Reusable UI components
│   ├── auth/
│   ├── dashboard/
│   └── layout/
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── pages/              # Application pages
├── theme/              # MUI theme configuration
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd loopr_ai_assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Development

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

### Building for Production

To create a production build, run:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

