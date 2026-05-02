import { API_BASE_URL } from '../config/api.js';
import { fetchWithErrorHandling, handleNetworkError } from '../utils/networkErrorHandler.js';

export const fetchTutorProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetchWithErrorHandling(`${API_BASE_URL}/account/tutor/profile`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    // Handle network errors specifically
    const wasNetworkError = handleNetworkError(error, 'Failed to fetch tutor profile');
    return { 
      success: false, 
      message: wasNetworkError ? 'Network connection failed' : error.message 
    };
  }
};