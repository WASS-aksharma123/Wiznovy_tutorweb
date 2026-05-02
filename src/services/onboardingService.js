import { API_BASE_URL } from '../config/api';

const getAuthHeaders = () => ({
  'Authorization': `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json'
});

export const onboardingService = {
  updateTutorDetails: async (data) => {
    console.log('Sending tutor details update:', data);
    console.log('API URL:', `${API_BASE_URL}/tutor-details/update`);
    console.log('Token:', localStorage.getItem('token') ? 'Present' : 'Missing');
    
    const response = await fetch(`${API_BASE_URL}/tutor-details/update`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`Failed to update tutor details: ${response.status} - ${errorText}`);
    }
    
    const result = await response.json();
    console.log('API Response:', result);
    return result;
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
    const response = await fetch(`${API_BASE_URL}/state/user?limit=10&offset=0&keyword=&status=ACTIVE&countryId=${countryId}`);
    
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

  fetchBudgets: async () => {
    const response = await fetch(`${API_BASE_URL}/budget/all`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch budgets');
    }
    
    const data = await response.json();
    return data.result || [];
  },

  fetchLanguages: async () => {
    const response = await fetch(`${API_BASE_URL}/languages/all?limit=50&offset=0`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch languages');
    }
    
    const data = await response.json();
    return data.result || [];
  },

  updateStep1: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step1`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 1 data');
    }
    
    return response.json();
  },

  updateStep2: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step2`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 2 data');
    }
    
    return response.json();
  },

  updateStep3: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step3`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 3 data');
    }
    
    return response.json();
  },

  updateStep4: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step4`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 4 data');
    }
    
    return response.json();
  },

  updateStep5: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step5`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 5 data');
    }
    
    return response.json();
  },

  updateStep6: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step6`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 6 data');
    }
    
    return response.json();
  },

  updateStep7: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step7`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 7 data');
    }
    
    return response.json();
  },

  updateStep8: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step8/document`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 8 data');
    }
    
    return response.json();
  },

  updateStep9: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step9`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 9 data');
    }
    
    return response.json();
  },

  updateStep10: async (data) => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/step10`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update step 10 data');
    }
    
    return response.json();
  },

  getCurrentStep: async () => {
    const response = await fetch(`${API_BASE_URL}/tutor-details/current-step`, {
      headers: getAuthHeaders()
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch current step');
    }
    
    const data = await response.json();
    return data.currentStep || 1;
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

  uploadCertification: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/tutor-details/step5/certification`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload certification');
    }
    
    return response.json();
  },

  uploadGovernmentId: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/tutor-details/step8/document`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload government ID');
    }
    
    return response.json();
  },

  uploadIntroductionVideo: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/tutor-details/step11/introduction-video`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload introduction video');
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