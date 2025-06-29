# Penta Finance Dashboard Documentation

This document provides a detailed overview of the Penta Finance Dashboard application, including its directory structure, files, functions, and variables.

## Directory Structure

The project is structured as follows:

- `src/api`: Contains services for making API calls.
- `src/assets`: Contains static assets like images and SVGs.
- `src/components`: Contains reusable React components.
- `src/contexts`: Contains React contexts for state management.
- `src/hooks`: Contains custom React hooks.
- `src/pages`: Contains the main pages of the application.
- `src/theme`: Contains the theme configuration for the application.
- `src/types`: Contains TypeScript type definitions.
- `src/utils`: Contains utility functions.

---

## Files

### `src/api/authService.ts`

This file handles authentication-related API calls.

- **`login(credentials)`**: Sends a `POST` request to the `/auth/login` endpoint with the user's credentials.
  - **`credentials`**: An object containing the user's `username` and `password`.
  - **Returns**: A promise that resolves to an `AuthResponse` object containing the user's data and a JWT token.

- **`getProfile()`**: Sends a `GET` request to the `/auth/profile` endpoint.
  - **Returns**: A promise that resolves to a `User` object containing the authenticated user's profile information.

### `src/api/axiosInstance.ts`

This file configures a reusable Axios instance for making API requests.

- It sets the `baseURL` for all API requests from the `VITE_API_BASE_URL` environment variable.
- It includes a request interceptor that automatically adds the `Authorization` header with the user's JWT token (retrieved from `localStorage`) to every outgoing request.

### `src/api/transactionService.ts`

This file handles transaction-related API calls.

- **`getTransactions(params)`**: Fetches a paginated and filterable list of transactions.
  - **`params`**: An object containing query parameters for pagination (`page`, `limit`), sorting (`sortBy`, `sortOrder`), and filtering (`search`, `category`, `status`, `startDate`, `endDate`).
  - **Returns**: A promise that resolves to a `GetTransactionsResponse` object.

- **`getTransactionStats()`**: Fetches dashboard statistics.
  - **Returns**: A promise that resolves to a `DashboardStats` object.

- **`exportTransactions(params)`**: Exports transactions to a file.
  - **`params`**: An object containing the same filtering options as `getTransactions`, plus a `fields` property to specify which columns to export.
  - **Returns**: A promise that resolves to a `Blob` object (e.g., a CSV file).

### `src/components/auth/ProtectedRoute.tsx`

This component protects routes from unauthenticated users.

- It uses the `useAuth` hook to check if the user `isAuthenticated`.
- If the user is authenticated, it renders the nested routes using the `<Outlet />` component from `react-router-dom`.
- If not, it redirects the user to the `/login` page using the `<Navigate />` component.

### `src/components/dashboard/OverviewChart.tsx`

This component displays a line chart for revenue vs. expenses using the `recharts` library.

- **Props**: It takes a `data` prop, which is an array of `RevenueVsExpensesTrend` objects.
- **`transformDataForChart(data)`**: A helper function that processes the raw API data into a format that `recharts` can consume, grouping revenue and expenses by month.

### `src/components/dashboard/RecentTransactions.tsx`

This component displays a list of the most recent transactions.

- **Props**: It takes a `transactions` prop, which is an array of `Transaction` objects.
- It dynamically determines the color of the transaction amount (green for revenue, red for expense) based on the transaction `category`.

### `src/components/dashboard/StatCard.tsx`

This component displays a single statistic card.

- **Props**:
  - `title`: The title of the statistic (e.g., "Balance").
  - `value`: The numerical value of the statistic.
  - `icon`: A React element (SVG) to be displayed as the icon.
  - `color`: The background color of the icon container.

### `src/components/dashboard/TransactionsTable.tsx`

This component displays a feature-rich table of transactions.

- **Features**: 
  - **Pagination**: Controls for navigating through pages of transactions.
  - **Sorting**: Clickable column headers to sort the data.
  - **Filtering**: A popover with options to filter by date range and category.
  - **Search**: A search input to filter transactions by keyword.
  - **Export**: A dialog to select columns and export the data.
- **State Management**: It manages numerous state variables for the current page, rows per page, sort order, search term, filter values, and loading/error states.
- **Hooks**: It uses the `useDebounce` hook to delay the API call while the user is typing in the search bar.

### `src/components/layout/Header.tsx`

This is the header component for the main dashboard layout.

- It displays the "Dashboard" title.
- It includes a (currently disabled) search bar.
- It shows a notification icon and the user's avatar.
- Clicking the avatar opens a `Popover` with a "Logout" option.
- It uses the `useAuth` hook to access the `user` object and the `logout` function.

### `src/components/layout/Sidebar.tsx`

This is the sidebar component for navigation.

- It displays the application `Logo`.
- It renders a list of `menuItems`, each with an icon and text.
- It manages the `selected` state to highlight the currently active menu item.

### `src/contexts/AuthContext.tsx`

This file provides a global authentication context to the application.

- **`AuthContext`**: The React context object.
- **`AuthProvider`**: The provider component that wraps the application.
- **State**:
  - `user`: The authenticated user object (`User` or `null`).
  - `token`: The JWT token (`string` or `null`).
  - `isLoading`: A boolean to indicate if the initial user profile fetch is in progress.
- **Functions**:
  - `login`: Calls the `authService.login`, stores the token in `localStorage`, updates the state, and navigates to the dashboard.
  - `logout`: Removes the token from `localStorage`, resets the state, and navigates to the login page.
- **`useEffect`**: On initial load, if a token exists in `localStorage`, it attempts to fetch the user's profile.

### `src/hooks/useAuth.ts`

This custom hook provides a convenient way to access the `AuthContext`.

- It uses `useContext(AuthContext)`.
- It throws an error if used outside of an `AuthProvider` to ensure proper usage.

### `src/hooks/useDebounce.ts`

This custom hook debounces a value.

- **`useDebounce<T>(value: T, delay: number): T`**: A generic function that takes a `value` and a `delay`.
- It returns the `value` only after the specified `delay` has passed without the `value` changing. This is useful for preventing excessive API calls on user input, such as in a search bar.

### `src/pages/DashboardPage.tsx`

This is the main dashboard page.

- It fetches all necessary data for the dashboard (`stats` and `recent` transactions) when the component mounts.
- It displays a loading spinner while data is being fetched and an error message if the API call fails.
- It arranges the main components: `Sidebar`, `Header`, `StatCard`s, `OverviewChart`, `RecentTransactions`, and `TransactionsTable`.

### `src/pages/LoginPage.tsx`

This is the login page.

- It contains a form with fields for `username` and `password`.
- **State**: It manages form input values, submission status, and error messages.
- **Validation**: It includes a `validateForm` function to perform basic client-side validation before submitting.
- **Submission**: The `handleSubmit` function calls the `login` function from the `useAuth` hook.

### `src/theme/theme.ts`

This file defines the custom Material-UI theme for the application.

- It uses `createTheme` to configure the application's look and feel.
- **`palette`**: Defines the color scheme (mode: 'dark'), including primary, secondary, background, and text colors.
- **`typography`**: Sets the default `fontFamily` to "Inter" and configures font weights.
- **`shape`**: Sets the global `borderRadius`.
- **`components`**: Provides style overrides for specific MUI components, like `MuiAvatar`.

### `src/types/index.ts`

This file contains all the shared TypeScript type definitions for the application.

- **`User`**: Defines the shape of a user object.
- **`AuthResponse`**: Defines the response from the login endpoint.
- **`Transaction`**: Defines the shape of a single transaction object.
- **`CategoryBreakdown`**: Defines the structure for category-wise expense/revenue data.
- **`RevenueVsExpensesTrend`**: Defines the structure for the monthly trend data used in the overview chart.
- **`DashboardStats`**: Defines the shape of the statistics object returned from the `/transactions/stats` endpoint.
- **`GetTransactionsResponse`**: Defines the shape of the response from the paginated transactions endpoint.

### `src/utils/formatters.ts`

This file contains utility functions for formatting data.

- **`formatCurrency(amount, minimumFractionDigits)`**: Formats a number as a USD currency string (e.g., `$1,234.56`).
  - **`amount`**: The number to format.
  - **`minimumFractionDigits`**: The minimum number of decimal places to show.
