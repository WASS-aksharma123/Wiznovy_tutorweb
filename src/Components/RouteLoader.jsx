import React from 'react';
import { useRouteLoader } from '../hooks/useRouteLoader';
import Loader from './Loader';

const RouteLoader = () => {
  const isLoading = useRouteLoader();

  if (!isLoading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      height: '3px',
      background: 'linear-gradient(90deg, #007bff, #0056b3)',
      animation: 'routeProgress 0.3s ease-out'
    }}>
      <style>{`
        @keyframes routeProgress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
};

export default RouteLoader;