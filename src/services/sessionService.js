import { API_BASE_URL } from '../config/api.js';

export const rescheduleSession = async (sessionId, rescheduleData) => {
  try {
    const token = localStorage.getItem('token');
    
    // Validate inputs
    if (!sessionId) {
      throw new Error('Session ID is required');
    }
    
    if (!rescheduleData.newSessionDate || !rescheduleData.newStartTime || !rescheduleData.newEndTime) {
      throw new Error('All reschedule data fields are required');
    }

    const url = `${API_BASE_URL}/sessions/tutor/reschedule/${sessionId}`;
    const requestBody = {
      sessionId: sessionId,
      ...rescheduleData
    };
    
    console.log('Reschedule API call:', {
      url,
      sessionId,
      requestBody,
      token: token ? 'Present' : 'Missing'
    });
    
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log('Reschedule API response:', { status: response.status, data });

    if (response.ok) {
      return {
        success: true,
        data: data,
        message: 'Session rescheduled successfully',
      };
    } else {
      return {
        success: false,
        message: data.message || data.error || 'Failed to reschedule session',
        details: data
      };
    }
  } catch (error) {
    console.error('Reschedule session error:', error);
    return {
      success: false,
      message: `Network error: ${error.message}`,
    };
  }
};

export const cancelSession = async (sessionId) => {
  try {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}/sessions/tutor/cancel/${sessionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: data,
        message: 'Session cancelled successfully',
      };
    } else {
      return {
        success: false,
        message: data.message || 'Failed to cancel session',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Network error: ${error}`,
    };
  }
};