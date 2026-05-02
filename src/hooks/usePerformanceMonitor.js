import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = () => {
  const requestCount = useRef(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const originalFetch = window.fetch;
    
    window.fetch = function(...args) {
      requestCount.current++;
      console.log(`Request #${requestCount.current}:`, args[0]);
      return originalFetch.apply(this, args);
    };

    // Monitor performance
    const checkPerformance = () => {
      const loadTime = Date.now() - startTime.current;
      if (requestCount.current > 50) {
        console.warn(`High request count detected: ${requestCount.current} requests in ${loadTime}ms`);
      }
    };

    const timer = setTimeout(checkPerformance, 5000);

    return () => {
      window.fetch = originalFetch;
      clearTimeout(timer);
    };
  }, []);

  return {
    requestCount: requestCount.current,
    getStats: () => ({
      requests: requestCount.current,
      loadTime: Date.now() - startTime.current
    })
  };
};