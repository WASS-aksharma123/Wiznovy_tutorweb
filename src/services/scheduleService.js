import { API_BASE_URL } from '../config/api.js';

export const getTutorSessions = async (date, limit = 20, offset = 0) => {
  try {
    const token = localStorage.getItem('token');
    const url = date 
      ? `${API_BASE_URL}/sessions/tutor-sessions?limit=${limit}&offset=${offset}&date=${date}`
      : `${API_BASE_URL}/sessions/tutor-sessions?limit=${limit}&offset=${offset}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
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
        message: data.message || 'Failed to fetch sessions',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};