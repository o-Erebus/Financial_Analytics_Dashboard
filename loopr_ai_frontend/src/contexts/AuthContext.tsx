import { createContext, useState, useEffect, type ReactNode, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import * as authService from '../api/authService';
import type {User} from '../types';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const profile = await authService.getProfile();
                    setUser(profile);
                } catch (error) {
                    console.error('Failed to load user profile, logging out.', error);
                    localStorage.removeItem('authToken');
                    setToken(null);
                    setUser(null);
                }
            }
            setIsLoading(false);
        };
        loadUser();
    }, [token]);

    const login = async (credentials: { username: string; password: string }) => {
        const data = await authService.login(credentials);
        localStorage.setItem('authToken', data.token);
        setToken(data.token);
        setUser({ _id: data._id, username: data.username, user_profile: data.user_profile });
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};