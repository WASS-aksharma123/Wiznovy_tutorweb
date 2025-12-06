import { API_BASE_URL } from '../config/api';

export const subjectsService = {
  getAllSubjects: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/subjects/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch subjects');
    }
    
    return response.json();
  }
};