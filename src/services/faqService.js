import { API_BASE_URL } from '../config/api.js';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

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

export const fetchTutorFAQs = async () => {
    const token = getAuthToken();
    
    if (!API_BASE_URL) {
        throw new Error('API configuration not available');
    }
    
    const headers = {
        'Content-Type': 'application/json'
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/faqs/tutor`, {
        headers
    });
    return handleResponse(response);
};
