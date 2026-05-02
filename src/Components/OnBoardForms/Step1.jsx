import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateStep1, setCurrentStep } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step1 = ({ formData, onInputChange, onNext, onBack, loading }) => {
  const dispatch = useDispatch();
  const [ageError, setAgeError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (field, value) => {
    onInputChange(field, value);
    if (field === 'dob') {
      setAgeError('');
    }
  };

  const handleNext = async () => {
    if (!formData.gender) {
      return;
    }
    
    if (!formData.dob) {
      setAgeError('Please select your date of birth');
      return;
    }
    
    const age = calculateAge(formData.dob);
    if (age < 18) {
      setAgeError('You must be 18 years or older to proceed');
      return;
    }

    // Prepare data for API
    const step1Data = {
      gender: formData.gender,
      dob: formData.dob
    };

    try {
      setIsSubmitting(true);
      // Send data to API
      await dispatch(updateStep1(step1Data)).unwrap();
      // Update current step to 2 locally
      dispatch(setCurrentStep(2));
      // Proceed to next step
      onNext();
    } catch (error) {
      console.error('Failed to update step 1:', error);
      setAgeError('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    return formData.gender && formData.dob && calculateAge(formData.dob) >= 18;
  };

  return (
    <div className="step-container">
      {/* Gender Selection */}
      <div>
        <h2 className="step-title">Select Your Gender *</h2>
        <div className="gender-grid">
          {['MALE', 'FEMALE', 'OTHER'].map((gender) => (
            <button
              key={gender}
              onClick={() => handleInputChange('gender', gender)}
              className={`gender-button ${formData.gender === gender ? 'selected' : ''}`}
            >
              {gender}
            </button>
          ))}
        </div>
        {!formData.gender && <div className="validation-hint">Please select your gender to continue</div>}
      </div>

      {/* Date of Birth */}
      <div>
        <h2 className="step-title">Date of Birth *</h2>
        <input
          type="date"
          value={formData.dob || ''}
          onChange={(e) => handleInputChange('dob', e.target.value)}
          className="form-inputt"
          required
        />
        {ageError && <div className="error-message">{ageError}</div>}
        {!formData.dob && !ageError && <div className="validation-hint">Please select your date of birth to continue</div>}
      </div>

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

export default Step1;