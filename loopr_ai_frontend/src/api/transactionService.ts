import axiosInstance from './axiosInstance';
import type {DashboardStats, GetTransactionsResponse} from '../types';

interface TransactionParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    category?: string | string[];
    status?: string;
    startDate?: string;
    endDate?: string;
}

export const getTransactions = async (params: TransactionParams): Promise<GetTransactionsResponse> => {
    const response = await axiosInstance.get('/transactions', { params });
    return response.data;
};

export const getTransactionStats = async (): Promise<DashboardStats> => {
    const response = await axiosInstance.get('/transactions/stats');
    return response.data;
};

export const exportTransactions = async (params: TransactionParams & { fields: string }): Promise<Blob> => {
    const response = await axiosInstance.get('/transactions/export', {
        params,
        responseType: 'blob',
    });
    return response.data;
};

