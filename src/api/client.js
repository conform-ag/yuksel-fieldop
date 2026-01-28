import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Replace with your actual ERPNext URL
const BASE_URL = 'http://192.168.1.100:8000'; // Dev URL, should be configurable

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Interceptor to add auth token
client.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync('auth_token');
        if (token) {
            config.headers['Authorization'] = `token ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default client;
