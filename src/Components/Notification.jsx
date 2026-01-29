import React, { useState, useEffect } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { markAsReadAsync } from '../store/notificationSlice.js';
import '../assets/Styles/notification.scss';

const Notification = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      dispatch(markAsReadAsync(notification.id));
    }
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeNotifications();
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
          onClick={() => setShowNotifications(!showNotifications)}
        >
          {isMobile ? (
            <span className="linksss">Notifications</span>
          ) : (
            <FaBell className="linksss" style={{ fontSize: "1.5rem" }} />
          )}
          {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
        </button>
      </div>

      {/* Overlay */}
      <div 
        className={`notification-overlay ${showNotifications ? 'show' : ''}`}
        onClick={closeNotifications}
      />

      {/* Notification Panel */}
      <div className={`notification-panel ${showNotifications ? 'show' : ''}`}>
        <div className="notification-header">
          <h4>Notifications</h4>
          <button 
            type="button"
            className="close-btn"
            onClick={closeNotifications}
          >
            <FaTimes />
          </button>
        </div>
        <div className="notification-list">
          {notifications.length > 0 ? (
            notifications.slice(0, 10).map((notification) => (
              <button 
                key={notification.id} 
                type="button"
                className={`notification-item ${notification.read ? '' : 'unread'}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-content">
                  <h5>{notification.title}</h5>
                  <p>{notification.desc}</p>
                  <span className="notification-time">{formatTimeAgo(notification.createdAt)}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="no-notifications">No notifications</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;