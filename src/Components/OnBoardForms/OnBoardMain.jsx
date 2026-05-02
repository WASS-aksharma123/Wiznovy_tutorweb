import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { 
  updateTutorDetails, 
  fetchCountries, 
  fetchQualifications,
  fetchSubjects,
  fetchLanguages,
  fetchCurrentStep,
  updateStep1,
  updateStep2,
  updateStep3,
  setCurrentStep,
  updateFormData,
  resetOnboarding
} from '../../store/onboardingSlice';

// Import step components
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import Step9 from './Step9';
import Step10 from './Step10';
import Step11 from './Step11';
import Step12 from './Step12';

const OnBoardMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentStep, formData, countries, states, cities, qualifications, subjects, languages, loading, error } = useSelector(state => state.onboarding);
  const [isResuming, setIsResuming] = React.useState(false);
  const [showWelcomeBack, setShowWelcomeBack] = React.useState(false);

  const handleBackToSignIn = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    const initializeOnboarding = async () => {
      // Only fetch current step if we don't have it yet (currentStep is 1 by default)
      if (currentStep === 1) {
        setIsResuming(true);
        try {
          const fetchedStep = await dispatch(fetchCurrentStep()).unwrap();
          if (fetchedStep > 1) {
            setShowWelcomeBack(true);
            // Hide welcome message after 3 seconds
            setTimeout(() => setShowWelcomeBack(false), 3000);
          }
        } catch (error) {
          console.warn('Could not fetch current step, starting from step 1:', error);
          // If fetching fails, start from step 1
          dispatch(setCurrentStep(1));
        } finally {
          setIsResuming(false);
        }
      } else {
        // We already have the step, just show welcome back if needed
        if (currentStep > 1) {
          setShowWelcomeBack(true);
          setTimeout(() => setShowWelcomeBack(false), 3000);
        }
        setIsResuming(false);
      }
      
      // Fetch all required data only once
      if (countries.length === 0) dispatch(fetchCountries());
      if (qualifications.length === 0) dispatch(fetchQualifications());
      if (subjects.length === 0) dispatch(fetchSubjects());
      if (languages.length === 0) dispatch(fetchLanguages());
    };

    initializeOnboarding();
  }, [dispatch]); // Remove currentStep from dependencies to prevent re-runs

  const totalSteps = 12;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleInputChange = (field, value) => {
    dispatch(updateFormData({ [field]: value }));
  };





  const goBack = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const continueStep = () => {
    if (currentStep < totalSteps) {
      const newStep = currentStep + 1;
      dispatch(setCurrentStep(newStep));
    }
  };

  // Component props for step components
  const stepProps = {
    formData,
    onInputChange: handleInputChange,
    onNext: continueStep,
    onBack: currentStep > 1 ? goBack : null,
    onBackToSignIn: handleBackToSignIn,
    dispatch,
    updateTutorDetails,
    updateStep1,
    updateStep2,
    updateStep3,
    countries,
    states,
    cities,
    qualifications,
    subjects,
    languages,
    loading
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 {...stepProps} />;
      case 2:
        return <Step2 {...stepProps} />;
      case 3:
        return <Step3 {...stepProps} />;
      case 4:
        return <Step4 {...stepProps} />;
      case 5:
        return <Step5 {...stepProps} />;
      case 6:
        return <Step6 {...stepProps} />;
      case 7:
        return <Step7 {...stepProps} />;
      case 8:
        return <Step8 {...stepProps} />;
      case 9:
        return <Step9 {...stepProps} />;
      case 10:
        return <Step10 {...stepProps} />;
      case 11:
        return <Step11 {...stepProps} />;
      case 12:
        return <Step12 {...stepProps} />;
      default:
        return null;
    }
  };

  // Show loading screen while initializing
  if (isResuming) {
    return (
      <div className="onboard-container">
        <div className="onboard-wrapper">
          <div className="form-card">
            <div className="step-container" style={{ textAlign: 'center', padding: '3rem' }}>
              <h2 className="step-title">Loading Your Progress...</h2>
              <div className="validation-hint">Please wait while we restore your onboarding progress</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="onboard-container">
      <div className="onboard-wrapper">
        {showWelcomeBack && (
          <div className="welcome-back-message">
            <div className="info-box" style={{ marginBottom: '1rem' }}>
              <p className="info-text" style={{ margin: 0, color: '#059669' }}>
                ✓ Welcome back! Resuming from Step {currentStep}
              </p>
            </div>
          </div>
        )}
        
        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-header">
            <span className="progress-text">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="progress-percentage">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {loading && (
            <div className="validation-hint" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              Syncing your progress...
            </div>
          )}
        </div>

        {/* Form Content */}
        <div className="form-card">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default OnBoardMain;