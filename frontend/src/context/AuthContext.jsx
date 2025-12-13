import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getMe, setAuthToken, getAuthToken, logout as apiLogout } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is already logged in on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = getAuthToken();
            if (token) {
                try {
                    const userData = await getMe();
                    if (userData) {
                        setUser(userData);
                        setIsAuthenticated(true);
                    } else {
                        // Token is invalid
                        apiLogout();
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    apiLogout();
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (credentials) => {
        try {
            const response = await apiLogin(credentials);
            if (response && response.access_token && response.user) {
                setAuthToken(response.access_token);
                setUser(response.user);
                setIsAuthenticated(true);

                // Dispatch custom event to reload cart and favorites
                window.dispatchEvent(new CustomEvent('auth:login'));

                return { success: true, user: response.user };
            }
            return { success: false, error: 'Invalid response from server' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.response?.data?.detail || 'Login failed' };
        }
    };

    const register = async (userData) => {
        try {
            const response = await apiRegister(userData);
            if (response && response.access_token && response.user) {
                setAuthToken(response.access_token);
                setUser(response.user);
                setIsAuthenticated(true);
                return { success: true, user: response.user };
            }
            return { success: false, error: 'Invalid response from server' };
        } catch (error) {
            console.error('Register error:', error);
            return { success: false, error: error.response?.data?.detail || 'Registration failed' };
        }
    };

    const logout = () => {
        apiLogout();
        setUser(null);
        setIsAuthenticated(false);

        // Clear cart and favorites from localStorage
        localStorage.removeItem('essencia-cart');
        localStorage.removeItem('favorites');

        // Dispatch custom event that works in same tab
        window.dispatchEvent(new CustomEvent('auth:logout'));
    };

    const isAdmin = () => {
        return user && user.isAdmin === true;
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        isAdmin: isAdmin(),
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
