import { API_BASE_URL } from '../config/api.js';

export const getMyReviews = async (limit = 10, offset = 0) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/rating/my-reviews?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch reviews',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};