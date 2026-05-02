import { API_BASE_URL } from '../config/api.js';

export const getTutorSessions = async (params = {}) => {
  try {
    const token = localStorage.getItem('token');
    const { date, limit = 20, offset = 0, status, upcoming, past } = params;
    
    let url = `${API_BASE_URL}/sessions/tutor-sessions?limit=${limit}&offset=${offset}`;
    
    if (date) {
      url += `&date=${date}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    if (upcoming) {
      url += `&upcoming=true`;
    }
    if (past) {
      url += `&past=true`;
    }
    
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

// Get upcoming sessions for tutor
export const getUpcomingSessions = async () => {
  try {
    const token = localStorage.getItem('token');
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`${API_BASE_URL}/sessions/tutor-sessions?date=${today}&upcoming=true`, {
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
        message: data.message || 'Failed to fetch upcoming sessions',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};

// Get pending booking requests for tutor
export const getPendingBookings = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/bookings/tutor/pending`, {
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
        message: data.message || 'Failed to fetch pending bookings',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};