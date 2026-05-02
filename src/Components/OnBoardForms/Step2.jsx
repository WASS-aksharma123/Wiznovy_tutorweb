import React from 'react';
import { useDispatch } from 'react-redux';
import { updateStep2, setCurrentStep } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step2 = ({ formData, onInputChange, onNext, onBack, subjects = [], loading }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const handleSubjectChange = (e) => {
    const selectedSubject = subjects.find(s => s.name === e.target.value);
    onInputChange('subject', e.target.value);
    onInputChange('subjectId', selectedSubject?.id || '');
  };

  const handleNext = async () => {
    if (!formData.subject || !formData.subjectId) {
      setError('Please select your teaching subject to continue');
      return;
    }

    // Prepare data for API
    const step2Data = {
      subjectId: formData.subjectId
    };

    try {
      setIsSubmitting(true);
      setError('');
      // Send data to API
      await dispatch(updateStep2(step2Data)).unwrap();
      // Update current step to 3 locally
      dispatch(setCurrentStep(3));
      // Proceed to next step
      onNext();
    } catch (error) {
      console.error('Failed to update step 2:', error);
      setError('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    return formData.subject && formData.subjectId;
  };

  if (loading) {
    return (
      <div className="step-container">
        <h2 className="step-title">Loading Subjects...</h2>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="validation-hint">Please wait while we load available subjects</div>
        </div>
      </div>
    );
  }

  if (!subjects || subjects.length === 0) {
    return (
      <div className="step-container">
        <h2 className="step-title">Subject Selection</h2>
        <div className="error-message">No subjects available. Please contact support.</div>
        <div className="ctnbtn">
          {onBack && (
            <button onClick={onBack} className="back-btn">
              Back
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      {/* Subject Selection */}
      <div>
        <h2 className="step-title">Select Your Subject *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="subject" className="form-label">
              Choose your teaching subject *
            </label>
            <select
              id="subject"
              value={formData.subject || ''}
              onChange={handleSubjectChange}
              className="form-inputt"
              required
            >
              <option value="">Select Subject *</option>
              {Array.isArray(subjects) && subjects.map(subject => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {error && (
          <div className="error-message">{error}</div>
        )}
        
        {!formData.subject && !error && (
          <div className="validation-hint">Please select your teaching subject to continue</div>
        )}
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

export default Step2;