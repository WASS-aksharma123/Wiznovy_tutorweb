import { API_BASE_URL } from '../config/api';

export const getTutorPages = async () => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pages/type/TUTOR`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }
    );
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        pages: data,
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to fetch pages',
      };
    }

  }
  catch (error) {
        return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
}