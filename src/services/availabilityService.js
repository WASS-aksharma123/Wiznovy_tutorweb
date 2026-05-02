import { API_BASE_URL } from '../config/api.js';

export const getTutorAvailability = async (limit = 10, offset = 0) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/tutor-availability/my-availability?limit=${limit}&offset=${offset}`, {
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
        message: data.message || 'Failed to fetch availability',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

// Legacy export for existing code compatibility
export const availabilityService = {
  createAvailability: async (availabilityData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/tutor-availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(availabilityData),
      });

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message || 'Failed to create availability');
      }
    } catch (error) {
      throw new Error(`Network error: ${error}`);
    }
  }
};