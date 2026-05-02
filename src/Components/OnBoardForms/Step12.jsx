import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step12 = ({ onBackToSignIn }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/dashboard');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="step-container completion-step">
      <div className="success-icon">
        <Check className="check-icon" />
      </div>
      <h2 className="step-title">Onboarding Complete!</h2>
      <p className="completion-text">
        Congratulations! You have successfully completed your profile setup. 
        Your account is now ready and all your information has been saved.
      </p>
      <div className="info-box">
        <p className="info-text">
          You can now access all features and start your journey with Wiznovy!
        </p>
      </div>
      
      <div className="completion-actions">
        <p className="redirect-info">
          Redirecting to dashboard in <strong>{countdown}</strong> seconds...
        </p>
        <button 
          onClick={handleGoToDashboard}
          className="continue-btn"
          style={{ marginTop: '1rem' }}
        >
          Go to Dashboard Now
        </button>
      </div>
    </div>
  );
};

export default Step12;