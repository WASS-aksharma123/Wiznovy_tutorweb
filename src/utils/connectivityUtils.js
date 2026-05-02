// Utility function to manually trigger the ConnectivityStatus modal
// This can be used anywhere in the application when a "Failed to fetch" error is detected

import { handleNetworkError } from './networkErrorHandler.js';

/**
 * Manually trigger the ConnectivityStatus modal
 * @param {string|Error} error - The error message or Error object
 * @param {string} customMessage - Optional custom message to display
 */
export const showConnectivityModal = (error, customMessage = null) => {
  // Create an error object if string is passed
  const errorObj = typeof error === 'string' ? new Error(error) : error;
  
  // Use the network error handler to trigger the modal
  handleNetworkError(errorObj, customMessage);
};

/**
 * Check if an error is a network/connectivity error
 * @param {Error|string} error - The error to check
 * @returns {boolean} - True if it's a network error
 */
export const isNetworkError = (error) => {
  const errorMessage = error?.message || error?.toString() || '';
  return (
    errorMessage.includes('Failed to fetch') ||
    errorMessage.includes('TypeError: Failed to fetch') ||
    errorMessage.includes('Network error') ||
    errorMessage.includes('ERR_NETWORK') ||
    errorMessage.includes('ERR_INTERNET_DISCONNECTED') ||
    error?.name === 'TypeError' ||
    !navigator.onLine
  );
};

/**
 * Example usage in a component or service:
 * 
 * import { showConnectivityModal, isNetworkError } from '../utils/connectivityUtils.js';
 * 
 * try {
 *   const response = await fetch('/api/data');
 *   // ... handle response
 * } catch (error) {
 *   if (isNetworkError(error)) {
 *     showConnectivityModal(error, 'Failed to load data');
 *   } else {
 *     // Handle other types of errors
 *     console.error('Non-network error:', error);
 *   }
 * }
 */

export default {
  showConnectivityModal,
  isNetworkError
};