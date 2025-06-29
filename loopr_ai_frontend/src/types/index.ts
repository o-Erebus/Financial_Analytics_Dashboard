export interface User {
    _id: string;
    username: string;
    user_profile?: string;
}

export interface AuthResponse {
    user_profile: string;
    _id: string;
    username: string;
    token: string;
}

export interface Transaction {
    _id: string;
    id: number;
    date: string;
    amount: number;
    category: 'Revenue' | 'Expense';
    status: 'Paid' | 'Pending';
    user_id: string;
    user_profile?: string;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryBreakdown {
    category: string;
    total: number;
}

export interface RevenueVsExpensesTrend {
    year: number;
    month: number;
    category: string;
    totalAmount: number;
}

export interface DashboardStats {
    totalRevenue: number;
    totalExpenses: number;
    netProfit: number;
    categoryBreakdown: CategoryBreakdown[];
    revenueVsExpensesTrend: RevenueVsExpensesTrend[];
}

export interface GetTransactionsResponse {
    transactions: Transaction[];
    currentPage: number;
    totalPages: number;
    totalTransactions: number;
}