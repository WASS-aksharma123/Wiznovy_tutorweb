import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes, FaCheckDouble } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUnreadCountAsync, markAllAsReadAsync, fetchNotificationsAsync } from '../store/notificationSlice.js';
import '../assets/Styles/notification.scss';

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [markingAllAsRead, setMarkingAllAsRead] = useState(false);
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMarkAllAsRead = async () => {
    if (markingAllAsRead || unreadCount === 0) return;
    
    try {
      setMarkingAllAsRead(true);
      await dispatch(markAllAsReadAsync()).unwrap();
      // Refresh notifications and unread count
      dispatch(fetchNotificationsAsync());
      dispatch(fetchUnreadCountAsync());
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    } finally {
      setMarkingAllAsRead(false);
    }
  };

  const handleNotificationClick = (notification) => {
    // Handle notification click (e.g., navigate to related page)
    console.log('Notification clicked:', notification);
  };

  const handleOpenNotifications = () => {
    setShowNotifications(true);
    // Refresh notifications and unread count when opening
    dispatch(fetchNotificationsAsync());
    dispatch(fetchUnreadCountAsync());
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
    // Refresh unread count when closing notifications
    dispatch(fetchUnreadCountAsync());
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseNotifications();
      }
    };

    if (showNotifications) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showNotifications]);

  return (
    <>
      <div className="notification-container">
        <button 
          type="button"
          className="notification-bell" 
          onClick={handleOpenNotifications}
        >
          {isMobile ? (
            <span className="linksss">Notifications</span>
          ) : (
            <FaBell className="linksss" style={{ fontSize: "1.5rem" }} />
          )}
          {unreadCount > 0 && (
            <span className="notification-badge">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Overlay */}
      <div 
        className={`notification-overlay ${showNotifications ? 'show' : ''}`}
        onClick={handleCloseNotifications}
      />

      {/* Notification Panel */}
      <div className={`notification-panel ${showNotifications ? 'show' : ''}`}>
        <div className="notification-header">
          <h4>
            Notifications
            {unreadCount > 0 && (
              <span className="unread-count-header">({unreadCount} unread)</span>
            )}
          </h4>
          <div className="header-actions">
            {unreadCount > 0 && (
              <button 
                type="button"
                className="mark-all-read-btn"
                onClick={handleMarkAllAsRead}
                disabled={markingAllAsRead}
                title="Mark all as read"
              >
                {markingAllAsRead ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <FaCheckDouble />
                )}
              </button>
            )}
            <button 
              type="button"
              className="close-btn"
              onClick={handleCloseNotifications}
            >
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.slice(0, 10).map((notification) => (
              <div 
                key={notification.id} 
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-content">
                  <div className="notification-header-item">
                    <h5>{notification.title}</h5>
                    {!notification.read && <div className="unread-indicator"></div>}
                  </div>
                  <p>{notification.desc}</p>
                  <div className="notification-footer">
                    <span className="notification-time">{formatTimeAgo(notification.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-notifications">
              {loading ? 'Loading notifications...' : 'No notifications'}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;