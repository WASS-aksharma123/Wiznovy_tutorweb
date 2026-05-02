import React, { useState, useEffect } from 'react';
import { FaWifi, FaTimes, FaServer } from 'react-icons/fa';
import { MdSignalWifiOff } from 'react-icons/md';
import '../assets/Styles/ConnectivityStatus.scss';

const ConnectivityStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showModal, setShowModal] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);
  const [errorType, setErrorType] = useState('network'); // 'network' or 'server'
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setServerError(false);
      if (hasBeenOffline) {
        // Show reconnected message briefly
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          setHasBeenOffline(false);
        }, 3000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setErrorType('network');
      setShowModal(true);
      setHasBeenOffline(true);
    };

    const handleServerError = (event) => {
      const { error, message } = event.detail;
      if (error && (error.includes('Failed to fetch') || error.includes('TypeError: Failed to fetch') || message?.includes('Network error'))) {
        setServerError(true);
        setErrorType('server');
        setShowModal(true);
        setHasBeenOffline(true);
      }
    };

    // Add event listeners
    globalThis.addEventListener('online', handleOnline);
    globalThis.addEventListener('offline', handleOffline);
    globalThis.addEventListener('serverError', handleServerError);

    // Additional check with fetch to detect actual connectivity
    const checkConnectivity = async () => {
      try {
        const response = await fetch('/favicon.ico', {
          method: 'HEAD',
          cache: 'no-cache'
        });
        if (!response.ok) throw new Error('No connection');
        
        if ((!isOnline || serverError) && hasBeenOffline) {
          handleOnline();
        }
      } catch (error) {
        // Network check failed - update offline state if currently online
        if (isOnline && !serverError) {
          console.warn('Network connectivity check failed:', error.message);
          handleOffline();
        }
      }
    };

    // Check connectivity every 5 seconds when offline
    const interval = setInterval(() => {
      if (!isOnline || hasBeenOffline || serverError) {
        checkConnectivity();
      }
    }, 5000);

    // Cleanup
    return () => {
      globalThis.removeEventListener('online', handleOnline);
      globalThis.removeEventListener('offline', handleOffline);
      globalThis.removeEventListener('serverError', handleServerError);
      clearInterval(interval);
    };
  }, [isOnline, hasBeenOffline, serverError]);

  const handleCloseModal = () => {
    if (isOnline && !serverError) {
      setShowModal(false);
      setHasBeenOffline(false);
    }
  };

  const handleRetry = async () => {
    try {
      // Test both local connectivity and server connectivity
      const testUrls = ['/favicon.ico'];
      
      // If we have an API base URL, test server connectivity
      if (globalThis.location.origin) {
        testUrls.push(`${globalThis.location.origin}/favicon.ico`);
      }
      
      const response = await fetch(testUrls[0], {
        method: 'HEAD',
        cache: 'no-cache'
      });
      
      if (response.ok) {
        setIsOnline(true);
        setServerError(false);
        setShowModal(false);
        setHasBeenOffline(false);
      }
    } catch (error) {
      // Connection test failed - keep modal open and maintain offline state
      console.warn('Connectivity test failed:', error.message);
      // No need to update state as we want to keep showing the modal
    }
  };

  const getModalContent = () => {
    if (isOnline && !serverError) {
      return {
        icon: <FaWifi className="wifi-connected" />,
        heading: 'Connection Restored!',
        message: 'You are back online. All features are now available.',
        showActions: false
      };
    } else if (errorType === 'server' || serverError) {
      return {
        icon: <FaServer className="server-disconnected" />,
        heading: 'Server Connection Lost',
        message: 'Unable to connect to the server. Please check your internet connection or try again later.',
        showActions: true
      };
    } else {
      return {
        icon: <MdSignalWifiOff className="wifi-disconnected" />,
        heading: 'No Internet Connection',
        message: 'Please check your internet connection and try again. Some features may not work properly without an internet connection.',
        showActions: true
      };
    }
  };

  if (!showModal) return null;

  const modalContent = getModalContent();

  return (
    <div className="connectivity-overlay">
      <div className="connectivity-modal">
        {(isOnline && !serverError) && (
          <button className="connectivity-close" onClick={handleCloseModal}>
            <FaTimes size={16} />
          </button>
        )}
        
        <div className="connectivity-icon">
          {modalContent.icon}
        </div>

        <h3 className={`connectivity-heading ${(isOnline && !serverError) ? 'success' : 'error'}`}>
          {modalContent.heading}
        </h3>

        <p className="connectivity-message">
          {modalContent.message}
        </p>

        {modalContent.showActions && (
          <div className="connectivity-actions">
            <button className="retry-btn" onClick={handleRetry}>
              <FaWifi size={14} />
              Try Again
            </button>
          </div>
        )}

        {(isOnline && !serverError) && (
          <div className="connectivity-success">
            <div className="success-indicator"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectivityStatus;