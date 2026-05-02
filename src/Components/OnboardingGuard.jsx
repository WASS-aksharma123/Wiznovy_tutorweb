import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchCurrentStep } from '../store/onboardingSlice';
import Loader from './Loader';

const OnboardingGuard = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentStep, stepFetched, loading } = useSelector(state => state.onboarding);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isInitializing, setIsInitializing] = useState(false);

  useEffect(() => {
    let isMounted = true;
    
    const initializeStep = async () => {
      if (!isAuthenticated) {
        return;
      }

      // Only fetch if we haven't fetched the step yet
      if (!stepFetched && !loading && !isInitializing) {
        setIsInitializing(true);
        try {
          await dispatch(fetchCurrentStep()).unwrap();
        } catch (error) {
          console.warn('Could not fetch current step:', error);
        } finally {
          if (isMounted) {
            setIsInitializing(false);
          }
        }
      }
    };

    initializeStep();
    
    return () => {
      isMounted = false;
    };
  }, [dispatch, isAuthenticated, stepFetched, loading, isInitializing]);

  // Show loading only if we're initializing or loading and authenticated
  if (isAuthenticated && (isInitializing || loading) && !stepFetched) {
    return <Loader fullScreen text="Checking your progress..." />;
  }

  // If not authenticated, let other guards handle it
  if (!isAuthenticated) {
    return children;
  }

  const currentPath = location.pathname;

  // Dashboard access control - only allow if currentStep is 12
  if (currentPath === '/dashboard' && currentStep !== 12) {
    return <Navigate to="/onboarding" replace />;
  }

  // Onboarding access control - redirect to dashboard if completed
  if (currentPath === '/onboarding' && currentStep === 12) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default OnboardingGuard;