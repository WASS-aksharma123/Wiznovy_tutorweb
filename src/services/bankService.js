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
        localStorage.removeItem('token'); // Clear invalid token
        throw new Error('Authentication failed. Please login again.');
    }
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorData}`);
    }
    return response.json();
};

// Fetch all bank accounts
export const fetchBankDetails = async () => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/bank-details`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return handleResponse(response);
};

// Create a new bank account
export const createBankAccount = async (bankData) => {
    console.log('Creating bank account with data:', bankData);
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/bank-details`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bankData)
    });
    const result = await handleResponse(response);
    console.log('Bank account creation response:', result);
    return result;
};

// Upload passbook document
export const uploadPassbookDocument = async (accountId, file) => {
    console.log('Uploading passbook document:', { accountId, fileName: file?.name });
    
    if (!accountId) {
        throw new Error('Account ID is required for document upload');
    }
    
    if (!file) {
        throw new Error('File is required for upload');
    }
    
    const formData = new FormData();
    formData.append('file', file);
    const token = getAuthToken();
    
    console.log('Making API call to:', `${API_BASE_URL}/bank-details/passbook/${accountId}`);
    
    const response = await fetch(`${API_BASE_URL}/bank-details/passbook/${accountId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    
    console.log('Passbook upload response status:', response.status);
    return handleResponse(response);
};

// Upload ID document
export const uploadIdDocument = async (accountId, file) => {
    console.log('Uploading ID document:', { accountId, fileName: file?.name });
    
    if (!accountId) {
        throw new Error('Account ID is required for document upload');
    }
    
    if (!file) {
        throw new Error('File is required for upload');
    }
    
    const formData = new FormData();
    formData.append('file', file);
    const token = getAuthToken();
    
    console.log('Making API call to:', `${API_BASE_URL}/bank-details/document/${accountId}`);
    
    const response = await fetch(`${API_BASE_URL}/bank-details/document/${accountId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    });
    
    console.log('ID upload response status:', response.status);
    return handleResponse(response);
};

// Delete bank account
export const deleteBankAccount = async (bankDetailId) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/bank-details/${bankDetailId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return handleResponse(response);
};

// Update bank account
export const updateBankAccount = async (bankDetailId, bankData) => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/bank-details/${bankDetailId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bankData)
    });
    return handleResponse(response);
};