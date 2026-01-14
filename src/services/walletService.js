import { API_BASE_URL } from '../config/api.js';

// Helper function to get and validate token
const getAuthToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found. Please login again.');
    }
    return token;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Authentication failed. Please login again.');
    }
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorData}`);
    }
    return response.json();
};

// Fetch wallet balance - fallback to mock data if API fails
export const fetchWalletBalance = async () => {
    try {
        const token = getAuthToken();
        
        if (!API_BASE_URL) {
            throw new Error('API configuration not available');
        }
        
        const response = await fetch(`${API_BASE_URL}/wallet/balance`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        // Fallback to mock data if wallet endpoint doesn't exist
        console.warn('Wallet API not available, using mock data:', error.message);
        return { balance: 6983.99 };
    }
};

// Fetch wallet transactions - fallback to mock data if API fails
export const fetchWalletTransactions = async () => {
    try {
        const token = getAuthToken();
        
        if (!API_BASE_URL) {
            throw new Error('API configuration not available');
        }
        
        const response = await fetch(`${API_BASE_URL}/wallet/transactions`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        // Fallback to mock data if wallet endpoint doesn't exist
        console.warn('Wallet transactions API not available, using mock data:', error.message);
        return { transactions: [] };
    }
};