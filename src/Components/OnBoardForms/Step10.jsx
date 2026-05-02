import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateStep10, setCurrentStep } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step10 = ({ formData, onInputChange, onNext, onBack, loading }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [hourlyRateError, setHourlyRateError] = useState('');
  const [trialRateError, setTrialRateError] = useState('');

  useEffect(() => {
    // Validate rates when component mounts or rates change
    validateRates();
  }, [formData.hourlyRate, formData.trialRate]);

  const validateRates = () => {
    let hourlyError = '';
    let trialError = '';

    // Validate hourly rate
    if (!formData.hourlyRate || formData.hourlyRate === '') {
      hourlyError = 'Hourly rate is required';
    } else {
      const hourlyValue = parseFloat(formData.hourlyRate);
      if (isNaN(hourlyValue) || hourlyValue < 1.00) {
        hourlyError = 'Hourly rate must be at least $1.00';
      }
    }

    // Validate trial rate
    if (!formData.trialRate || formData.trialRate === '') {
      trialError = 'Trial rate is required';
    } else {
      const trialValue = parseFloat(formData.trialRate);
      const hourlyValue = parseFloat(formData.hourlyRate);
      
      if (isNaN(trialValue) || trialValue < 0) {
        trialError = 'Trial rate cannot be negative';
      } else if (!isNaN(hourlyValue) && trialValue >= hourlyValue) {
        trialError = 'Trial rate must be less than your hourly rate';
      }
    }

    setHourlyRateError(hourlyError);
    setTrialRateError(trialError);
  };

  const handleRateChange = (field, value) => {
    // Remove any non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = numericValue.split('.');
    let formattedValue = parts[0];
    if (parts.length > 1) {
      formattedValue += '.' + parts.slice(1).join('').substring(0, 2); // Max 2 decimal places
    }

    // Prevent negative values
    if (parseFloat(formattedValue) < 0) {
      return;
    }

    onInputChange(field, formattedValue);
    setError('');
  };

  const handleNext = async () => {
    const hourlyValue = parseFloat(formData.hourlyRate);
    const trialValue = parseFloat(formData.trialRate);

    // Validate required fields
    if (!formData.hourlyRate || formData.hourlyRate === '') {
      setError('Please enter your hourly rate');
      return;
    }

    if (!formData.trialRate || formData.trialRate === '') {
      setError('Please enter your trial rate');
      return;
    }

    // Validate numeric values
    if (isNaN(hourlyValue) || hourlyValue < 1.00) {
      setError('Hourly rate must be at least $1.00');
      return;
    }

    if (isNaN(trialValue) || trialValue < 0) {
      setError('Trial rate cannot be negative');
      return;
    }

    // Validate trial rate is less than hourly rate
    if (trialValue >= hourlyValue) {
      setError('Trial rate must be less than your hourly rate');
      return;
    }

    const step10Data = {
      hourlyRate: parseFloat(formData.hourlyRate),
      trailRate: parseFloat(formData.trialRate)
    };

    try {
      setIsSubmitting(true);
      setError('');
      await dispatch(updateStep10(step10Data)).unwrap();
      dispatch(setCurrentStep(11));
      onNext();
    } catch (error) {
      console.error('Failed to update step 10:', error);
      setError('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    const hourlyValue = parseFloat(formData.hourlyRate);
    const trialValue = parseFloat(formData.trialRate);
    
    return formData.hourlyRate &&
           formData.trialRate &&
           !isNaN(hourlyValue) &&
           !isNaN(trialValue) &&
           hourlyValue >= 1.00 &&
           trialValue >= 0 &&
           trialValue < hourlyValue &&
           !hourlyRateError &&
           !trialRateError;
  };

  return (
    <div className="step-container">
      <h2 className="step-title">Set Your Rates *</h2>
      
      {/* Hourly Rate */}
      <div className="input-group">
        <label htmlFor="hourlyRate" className="form-label">
          Hourly Rate in $ *
        </label>
        <div className="rate-input-container">
          <span className="currency-symbol">$</span>
          <input
            id="hourlyRate"
            type="text"
            value={formData.hourlyRate || ''}
            onChange={(e) => handleRateChange('hourlyRate', e.target.value)}
            className={`form-inputt rate-input ${hourlyRateError ? 'error' : ''}`}
            placeholder="0.00"
            required
          />
        </div>
        {hourlyRateError && (
          <div className="error-message">{hourlyRateError}</div>
        )}
        <div className="field-info">
          <small>Set your standard hourly tutoring rate (minimum $1.00)</small>
        </div>
      </div>

      {/* Trial Rate */}
      <div className="input-group">
        <label htmlFor="trialRate" className="form-label">
          Trial Rate in $ *
        </label>
        <div className="rate-input-container">
          <span className="currency-symbol">$</span>
          <input
            id="trialRate"
            type="text"
            value={formData.trialRate || ''}
            onChange={(e) => handleRateChange('trialRate', e.target.value)}
            className={`form-inputt rate-input ${trialRateError ? 'error' : ''}`}
            placeholder="0.00"
            required
          />
        </div>
        {trialRateError && (
          <div className="error-message">{trialRateError}</div>
        )}
        <div className="field-info">
          <small>Set your trial session rate (must be less than hourly rate)</small>
        </div>
      </div>

      {/* Rate Comparison Display */}
      {/* {formData.hourlyRate && formData.trialRate && isValid() && (
        <div className="rate-comparison">
          <div className="rate-summary">
            <div className="rate-item">
              <span className="rate-label">Hourly Rate:</span>
              <span className="rate-value">${parseFloat(formData.hourlyRate).toFixed(2)}</span>
            </div>
            <div className="rate-item">
              <span className="rate-label">Trial Rate:</span>
              <span className="rate-value">${parseFloat(formData.trialRate).toFixed(2)}</span>
            </div>
            <div className="rate-item savings">
              <span className="rate-label">Student Savings:</span>
              <span className="rate-value">
                ${(parseFloat(formData.hourlyRate) - parseFloat(formData.trialRate)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )} */}

      {error && (
        <div className="error-message">{error}</div>
      )}

      {/* Navigation Buttons */}
      <div className="ctnbtn">
        {onBack && (
          <button onClick={onBack} className="back-btn">
            Back
          </button>
        )}
        <button
          onClick={handleNext}
          className={`continue-btn ${!isValid() ? 'disabled' : ''}`}
          disabled={!isValid() || isSubmitting || loading}
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Step10;
