import { API_BASE_URL } from '../config/api';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
});

export const onboardingService = {
  updateTutorDetails: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/update`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update tutor details');
    }
    
    return response.json();
  },

  fetchCountries: async () => {
    const response = await fetch(`${API_BASE_URL}/country/all`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    
    const data = await response.json();
    return data.result || [];
  },

  fetchStates: async (countryId) => {
    const response = await fetch(`${API_BASE_URL}/state?limit=10&offset=0&keyword=&status=ACTIVE&countryId=${countryId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch states');
    }
    
    const data = await response.json();
    return data.result || [];
  },

  fetchCities: async (stateId) => {
    const response = await fetch(`${API_BASE_URL}/city/user?stateId=${stateId}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch cities');
    }
    
    const data = await response.json();
    return data.result || [];
  },

  fetchQualifications: async () => {
    const response = await fetch(`${API_BASE_URL}/qualification/all`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch qualifications');
    }
    
    const data = await response.json();
    return data.result || [];
  },

  fetchSubjects: async () => {
    const response = await fetch(`${API_BASE_URL}/subjects/all`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch subjects');
    }
    
    const data = await response.json();
    return data.result || [];
  },

  uploadProfileImage: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/tutor-details/profileImage`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload profile image');
    }
    
    return response.json();
  },

  uploadDocument: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/tutor-details/document`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload document');
    }
    
    return response.json();
  }
};