import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateStep9, setCurrentStep } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step9 = ({ formData, onInputChange, onNext, onBack, loading }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [bioError, setBioError] = useState('');

  const MIN_WORDS = 15;
  const MAX_WORDS = 80;

  useEffect(() => {
    // Calculate initial word count if bio exists
    if (formData.bio) {
      const count = countWords(formData.bio);
      setWordCount(count);
      validateWordCount(count);
    }
  }, []);

  const countWords = (text) => {
    if (!text || text.trim() === '') return 0;
    return text.trim().split(/\s+/).length;
  };

  const validateWordCount = (count) => {
    if (count < MIN_WORDS) {
      setBioError(`Bio must be at least ${MIN_WORDS} words. Current: ${count} words.`);
      return false;
    } else if (count > MAX_WORDS) {
      setBioError(`Bio cannot exceed ${MAX_WORDS} words. Current: ${count} words.`);
      return false;
    } else {
      setBioError('');
      return true;
    }
  };

  const handleBioChange = (e) => {
    const text = e.target.value;
    const count = countWords(text);

    // Block input if exceeding max words
    if (count > MAX_WORDS) {
      return; // Don't update if exceeding max words
    }

    setWordCount(count);
    validateWordCount(count);
    onInputChange('bio', text);
    setError('');
  };

  const handleNext = async () => {
    const count = countWords(formData.bio);

    if (!formData.bio || formData.bio.trim() === '') {
      setError('Please write your bio to continue');
      return;
    }

    if (count < MIN_WORDS) {
      setError(`Bio must be at least ${MIN_WORDS} words to continue`);
      return;
    }

    if (count > MAX_WORDS) {
      setError(`Bio cannot exceed ${MAX_WORDS} words`);
      return;
    }

    const step9Data = {
      bio: formData.bio.trim()
    };

    try {
      setIsSubmitting(true);
      setError('');
      await dispatch(updateStep9(step9Data)).unwrap();
      dispatch(setCurrentStep(10));
      onNext();
    } catch (error) {
      console.error('Failed to update step 9:', error);
      setError('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    const count = countWords(formData.bio);
    return formData.bio &&
      formData.bio.trim() !== '' &&
      count >= MIN_WORDS &&
      count <= MAX_WORDS &&
      !bioError;
  };

  const getWordCountColor = () => {
    if (wordCount < MIN_WORDS) return '#e74c3c'; // Red
    if (wordCount > MAX_WORDS) return '#e74c3c'; // Red
    if (wordCount >= MIN_WORDS && wordCount <= MAX_WORDS) return '#27ae60'; // Green
    return '#666'; // Default
  };

  return (
    <div className="step-container">
      {/* Bio Text Area */}
      <div>
        <h2 className="step-title">Professional Bio *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="bio" className="form-label">
              Write a brief professional bio about yourself *
            </label>
            <textarea
              id="bio"
              value={formData.bio || ''}
              onChange={handleBioChange}
              className="form-inputt"
              placeholder="Tell students about your teaching experience, expertise, and approach. Make it engaging and professional..."
              rows={6}
              required
            />

            {/* Word Counter */}
            <div className="word-counter" style={{
              marginTop: '8px',
              fontSize: '14px',
              color: getWordCountColor(),
              fontWeight: '500'
            }}>
              {wordCount}/{MAX_WORDS} words
              {wordCount < MIN_WORDS && (
                <span style={{ marginLeft: '10px', color: '#e74c3c' }}>
                  (Minimum {MIN_WORDS} words required)
                </span>
              )}
              {wordCount >= MIN_WORDS && wordCount <= MAX_WORDS && (
                <span style={{ marginLeft: '10px', color: '#27ae60' }}>
                  ✓ Good length
                </span>
              )}
            </div>

            <div className="field-info">
              <small>
                Write between {MIN_WORDS}-{MAX_WORDS} words about your teaching experience,
                qualifications, and what makes you a great tutor.
              </small>
            </div>
          </div>
        </div>

        {bioError && (
          <div className="error-message">{bioError}</div>
        )}

        {!formData.bio && !bioError && !error && (
          <div className="validation-hint">
            Please write your professional bio to continue ({MIN_WORDS}-{MAX_WORDS} words)
          </div>
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

export default Step9;
