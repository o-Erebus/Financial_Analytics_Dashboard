# Financial Analytics Dashboard - Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

A modern, responsive dashboard for Financial Analytics built with React, TypeScript, and Vite. This frontend application provides an intuitive interface for managing financial data and visualizing analytics.

## ✨ Features

- **User Authentication**: Secure login and registration functionality
- **Financial Overview**: Interactive charts displaying financial data with Recharts
- **Recent Transactions**: Quick overview of the latest transactions
- **Transaction Management**: Full CRUD operations with filtering and pagination
- **Responsive Design**: Clean and modern UI that works on all screen sizes
- **Real-time Updates**: Dynamic data updates with React Context
- **Export Functionality**: Download transaction data as CSV

## 🚀 Tech Stack

- **Framework**: [React 19](https://reactjs.org/) with TypeScript
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Library**: [Material-UI (MUI)](https://mui.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Context API
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Date Handling**: [date-fns](https://date-fns.org/)

## 📋 Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🏁 Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/o-Erebus/Financial_Analytics_Dashboard.git
   cd Financial_Analytics_Dashboard/loopr_ai_frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the application on `http://localhost:5173`.

### Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

To preview the production build:

```bash
npm run preview
```

## 🔧 Available Scripts

```bash
npm run dev          # Start Vite development server
npm run build        # Build for production (TypeScript + Vite)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality
```

## 📂 Project Structure

The project follows a feature-based structure:

```
src/
├── api/                # API service calls
├── assets/             # Static assets (images, svgs)
├── components/         # Reusable UI components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard-specific components
│   └── layout/        # Layout components (Header, Sidebar)
├── contexts/           # React contexts for state management
├── hooks/              # Custom React hooks
├── pages/              # Application pages
├── theme/              # MUI theme configuration
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 📚 Documentation

**For detailed component documentation, architecture details, and development guidelines, see [DOCS.md](./DOCS.md)**

## 🔗 Backend Integration

This frontend connects to the Financial Analytics Dashboard backend API. Make sure the backend is running on `http://localhost:5000` for full functionality.

Backend repository: [../loopr_ai_backend](../loopr_ai_backend)

## 🎨 Theming

The application uses Material-UI's theming system. Theme configuration can be found in:
- `src/theme/theme.ts` - Main theme configuration
- `src/theme.ts` - Additional theme utilities

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.
