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

export const fetchUnreadCount = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/notifications/unread-count`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch unread count');
    }

    const data = await response.json();
    return {
      success: true,
      count: data.unreadCount || data.count || 0
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      count: 0
    };
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/notifications/mark-all-read`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to mark all notifications as read');
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};