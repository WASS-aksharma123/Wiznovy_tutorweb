// Global error handler for network and server connectivity issues
export const handleNetworkError = (error, customMessage = null) => {
  const errorMessage = error?.message || error?.toString() || '';
  const isNetworkError = 
    errorMessage.includes('Failed to fetch') ||
    errorMessage.includes('TypeError: Failed to fetch') ||
    errorMessage.includes('Network error') ||
    errorMessage.includes('ERR_NETWORK') ||
    errorMessage.includes('ERR_INTERNET_DISCONNECTED') ||
    error?.name === 'TypeError' ||
    !navigator.onLine;

  if (isNetworkError) {
    // Dispatch custom event to trigger ConnectivityStatus modal
    const event = new CustomEvent('serverError', {
      detail: {
        error: errorMessage,
        message: customMessage || 'Network error occurred',
        timestamp: new Date().toISOString()
      }
    });
    window.dispatchEvent(event);
    return true; // Indicates error was handled
  }
  return false; // Error was not a network error
};

// Enhanced fetch wrapper that automatically handles network errors
export const fetchWithErrorHandling = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    
    // Check if response is ok
    if (!response.ok) {
      // Handle HTTP errors (4xx, 5xx)
      if (response.status >= 500) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      } else if (response.status >= 400) {
        throw new Error(`Client error: ${response.status} ${response.statusText}`);
      }
    }
    
    return response;
  } catch (error) {
    // Handle network errors
    const wasHandled = handleNetworkError(error, `Failed to connect to ${url}`);
    if (wasHandled) {
      // Re-throw with a more user-friendly message
      throw new Error('Network connection failed. Please check your internet connection.');
    }
    // Re-throw original error if it's not a network error
    throw error;
  }
};

// Wrapper for async functions to automatically handle network errors
export const withNetworkErrorHandling = (asyncFunction) => {
  return async (...args) => {
    try {
      return await asyncFunction(...args);
    } catch (error) {
      const wasHandled = handleNetworkError(error);
      if (!wasHandled) {
        // Re-throw if it's not a network error
        throw error;
      }
      // Return null or appropriate fallback for network errors
      return null;
    }
  };
};

// Global error event listener setup
export const setupGlobalErrorHandling = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    handleNetworkError(error, 'Unhandled network error occurred');
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    const error = event.error;
    handleNetworkError(error, 'Global network error occurred');
  });

  // Override console.error to catch logged network errors
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const errorString = args.join(' ');
    if (errorString.includes('Failed to fetch') || errorString.includes('Network error')) {
      handleNetworkError(new Error(errorString), 'Console network error detected');
    }
    originalConsoleError.apply(console, args);
  };
};

export default {
  handleNetworkError,
  fetchWithErrorHandling,
  withNetworkErrorHandling,
  setupGlobalErrorHandling
};