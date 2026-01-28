import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import client from '../api/client';
import { initDatabase } from '../database/db';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const token = await SecureStore.getItemAsync('auth_token');
            const userData = await SecureStore.getItemAsync('user_data');

            if (token && userData) {
                setUser(JSON.parse(userData));
                // Optional: Validate token with server
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            // Ideally use real auth endpoint
            // For demo/BFF, we assume success or mock
            // const res = await client.post('/api/method/login', ...);

            // Mock Success
            const mockUser = { name: "John Doe", email: username, roles: ["Sales User"] };
            const mockToken = "mock_token_123";

            await SecureStore.setItemAsync('auth_token', mockToken);
            await SecureStore.setItemAsync('user_data', JSON.stringify(mockUser));
            setUser(mockUser);

            // Init DB on login
            await initDatabase();

            return { success: true };
        } catch (e) {
            return { success: false, error: e.message };
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync('auth_token');
        await SecureStore.deleteItemAsync('user_data');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading: loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
