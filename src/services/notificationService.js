import { API_BASE_URL } from '../config/api.js';

export const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    return {
      success: true,
      data: data.result,
      total: data.total
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/notifications/${notificationId}/read`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to mark notification as read');
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};