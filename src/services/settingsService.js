import { API_BASE_URL } from '../config/api';

export const getPublicSettings = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/settings/public`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }
    );
    
    // If the endpoint doesn't exist (404), return default settings
    if (response.status === 404) {
      console.warn('Settings endpoint not found, using default settings');
      return {
        success: true,
        settings: {
          companyName: 'WIZNOVY® Global Inc.',
          companyYear: '2025'
        },
      };
    }
    
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        settings: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch settings',
      };
    }

  }
  catch (error) {
    console.warn('Settings service error, using defaults:', error);
    return {
      success: true,
      settings: {
        companyName: 'WIZNOVY® Global Inc.',
        companyYear: '2025'
      },
    };
  }
}