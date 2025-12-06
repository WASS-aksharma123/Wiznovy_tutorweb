import { API_BASE_URL } from '../config/api';

export const availabilityService = {
  createAvailability: async (availabilityData) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/tutor-availability`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(availabilityData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create availability');
    }
    
    return response.json();
  }
};