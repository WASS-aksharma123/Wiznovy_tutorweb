import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep7, setCurrentStep, fetchLanguages } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step7 = ({ formData, onInputChange, onNext, onBack, loading }) => {
  const dispatch = useDispatch();
  const { languages } = useSelector((state) => state.onboarding);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [languagesLoading, setLanguagesLoading] = useState(true);

  const proficiencyLevels = [
    { value: 'Native', label: 'Native' },
    { value: 'Fluent', label: 'Fluent' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Basic', label: 'Basic' }
  ];

  useEffect(() => {
    fetchLanguageData();
  }, []);

  const fetchLanguageData = async () => {
    try {
      setLanguagesLoading(true);
      await dispatch(fetchLanguages()).unwrap();
    } catch (error) {
      console.error('Error fetching languages:', error);
      setError('Failed to load languages. Please try again.');
    } finally {
      setLanguagesLoading(false);
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = languages.find(l => l.id === e.target.value);
    onInputChange('language', selectedLanguage?.name || '');
    onInputChange('languageId', selectedLanguage?.id || '');
    setError('');
  };

  const handleProficiencyChange = (e) => {
    onInputChange('languageProficiency', e.target.value);
    setError('');
  };

  const handleNext = async () => {
    if (!formData.language || !formData.languageId) {
      setError('Please select a language to continue');
      return;
    }

    if (!formData.languageProficiency) {
      setError('Please select your language proficiency level to continue');
      return;
    }

    const step7Data = {
      languageId: formData.languageId,
      languageProficiency: formData.languageProficiency
    };

    try {
      setIsSubmitting(true);
      setError('');
      await dispatch(updateStep7(step7Data)).unwrap();
      dispatch(setCurrentStep(8));
      onNext();
    } catch (error) {
      console.error('Failed to update step 7:', error);
      setError('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    return formData.language && formData.languageId && formData.languageProficiency;
  };

  if (languagesLoading) {
    return (
      <div className="step-container">
        <h2 className="step-title">Loading Languages...</h2>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="validation-hint">Please wait while we load language information</div>
        </div>
      </div>
    );
  }

  if (error && languages.length === 0) {
    return (
      <div className="step-container">
        <h2 className="step-title">Language & Proficiency</h2>
        <div className="error-message">{error}</div>
        <div className="ctnbtn">
          <button onClick={fetchLanguageData} className="continue-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      {/* Language Selection */}
      <div>
        <h2 className="step-title">Language *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="language" className="form-label">
              Select your primary teaching language *
            </label>
            <select
              id="language"
              value={formData.languageId || ''}
              onChange={handleLanguageChange}
              className="form-inputt"
              required
            >
              <option value="">Select Language *</option>
              {languages.map(language => (
                <option key={language.id} value={language.id}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {!formData.language && !error && (
          <div className="validation-hint">Please select your primary teaching language to continue</div>
        )}
      </div>

      {/* Language Proficiency */}
      <div>
        <h2 className="step-title">Language Proficiency *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="languageProficiency" className="form-label">
              Select your proficiency level *
            </label>
            <select
              id="languageProficiency"
              value={formData.languageProficiency || ''}
              onChange={handleProficiencyChange}
              className="form-inputt"
              required
            >
              <option value="">Select Proficiency Level *</option>
              {proficiencyLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {!formData.languageProficiency && !error && (
          <div className="validation-hint">Please select your language proficiency level to continue</div>
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

export default Step7;
