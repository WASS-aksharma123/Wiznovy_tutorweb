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

// Fetch wallet balance
export const fetchWalletBalance = async () => {
    const token = getAuthToken();
    
    if (!API_BASE_URL) {
        throw new Error('API configuration not available');
    }
    
    const response = await fetch(`${API_BASE_URL}/wallet/tutor`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return handleResponse(response);
};

// Fetch wallet transactions
export const fetchWalletTransactions = async () => {
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
};

// Fetch tutor payouts
export const fetchTutorPayouts = async () => {
    try {
        const token = getAuthToken();
        
        if (!API_BASE_URL) {
            throw new Error('API configuration not available');
        }
        
        const response = await fetch(`${API_BASE_URL}/tutor-payout/my-payouts`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Fetch payouts failed:', error.message);
        throw error;
    }
};

// Create payout request
export const createPayoutRequest = async (payoutData) => {
    try {
        const token = getAuthToken();
        
        if (!API_BASE_URL) {
            throw new Error('API configuration not available');
        }
        
        const response = await fetch(`${API_BASE_URL}/tutor-payout`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payoutData)
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Payout request failed:', error.message);
        throw error;
    }
};