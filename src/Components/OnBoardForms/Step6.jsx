import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStep6, setCurrentStep } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step6 = ({ formData, onInputChange, onNext, onBack, loading }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [experienceError, setExperienceError] = useState('');

  const handleExperienceChange = (e) => {
    const value = e.target.value;
    
    // Allow empty string for clearing the field
    if (value === '') {
      onInputChange('teachingExperience', '');
      setExperienceError('');
      return;
    }

    // Convert to number and validate
    const numValue = parseFloat(value);
    
    // Check if it's a valid number
    if (isNaN(numValue)) {
      setExperienceError('Please enter a valid number');
      return;
    }

    // Check for negative numbers
    if (numValue < 0) {
      setExperienceError('Teaching experience cannot be negative');
      return;
    }

    // Check for values greater than 50
    if (numValue > 50) {
      setExperienceError('Teaching experience cannot exceed 50 years');
      return;
    }

    // Check for decimal places (optional - remove if decimals are allowed)
    if (numValue % 1 !== 0) {
      setExperienceError('Please enter a whole number');
      return;
    }

    // Valid input
    onInputChange('teachingExperience', numValue.toString());
    setExperienceError('');
    setError('');
  };

  const handleNext = async () => {
    if (!formData.teachingExperience && formData.teachingExperience !== '0') {
      setError('Please enter your teaching experience to continue');
      return;
    }

    if (experienceError) {
      setError('Please fix the teaching experience error before continuing');
      return;
    }

    const experience = parseFloat(formData.teachingExperience);
    if (isNaN(experience) || experience < 0 || experience > 50) {
      setError('Please enter a valid teaching experience between 0 and 50 years');
      return;
    }

    const step6Data = {
      teachingExperience: experience
    };

    try {
      setIsSubmitting(true);
      setError('');
      await dispatch(updateStep6(step6Data)).unwrap();
      dispatch(setCurrentStep(7));
      onNext();
    } catch (error) {
      console.error('Failed to update step 6:', error);
      setError('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    const experience = parseFloat(formData.teachingExperience);
    return !isNaN(experience) && experience >= 0 && experience <= 50 && !experienceError;
  };

  return (
    <div className="step-container">
      {/* Teaching Experience */}
      <div>
        <h2 className="step-title">Teaching Experience *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="teachingExperience" className="form-label">
              Enter your teaching experience in years *
            </label>
            <input
              type="number"
              id="teachingExperience"
              value={formData.teachingExperience || ''}
              onChange={handleExperienceChange}
              className="form-inputt"
              placeholder="Enter years (0-50)"
              min="0"
              max="50"
              step="1"
              required
            />
            <div className="field-info">
              <small>Enter a number between 0 and 50 years</small>
            </div>
          </div>
        </div>
        
        {experienceError && (
          <div className="error-message">{experienceError}</div>
        )}
        
        {!formData.teachingExperience && !experienceError && !error && (
          <div className="validation-hint">Please enter your teaching experience to continue</div>
        )}
      </div>

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

export default Step6;
