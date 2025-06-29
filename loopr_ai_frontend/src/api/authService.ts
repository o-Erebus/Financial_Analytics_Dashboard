import axiosInstance from './axiosInstance';
import type {AuthResponse, User} from '../types';

export const login = async (credentials: { username: string; password: string }): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', credentials);
    console.log(response.data);
    return response.data;
};

export const getProfile = async (): Promise<User> => {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
};