import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep4, setCurrentStep, fetchBudgets } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step4 = ({ formData, onInputChange, onNext, onBack, loading }) => {
  const dispatch = useDispatch();
  const { budgets } = useSelector((state) => state.onboarding);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [budgetsLoading, setBudgetsLoading] = useState(true);

  useEffect(() => {
    fetchBudgetData();
  }, []);

  const fetchBudgetData = async () => {
    try {
      setBudgetsLoading(true);
      await dispatch(fetchBudgets()).unwrap();
    } catch (error) {
      console.error('Error fetching budgets:', error);
      setError('Failed to load budget ranges. Please try again.');
    } finally {
      setBudgetsLoading(false);
    }
  };

  const handleBudgetChange = (e) => {
    const selectedBudget = budgets.find(b => b.id === e.target.value);
    onInputChange('budget', e.target.value);
    onInputChange('budgetId', selectedBudget?.id || '');
    setError('');
  };

  const handleNext = async () => {
    if (!formData.budget || !formData.budgetId) {
      setError('Please select your target student budget to continue');
      return;
    }

    const step4Data = {
      budgetId: formData.budgetId
    };

    try {
      setIsSubmitting(true);
      setError('');
      await dispatch(updateStep4(step4Data)).unwrap();
      dispatch(setCurrentStep(5));
      onNext();
    } catch (error) {
      console.error('Failed to update step 4:', error);
      setError('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    return formData.budget && formData.budgetId;
  };

  if (budgetsLoading) {
    return (
      <div className="step-container">
        <h2 className="step-title">Loading Budget Ranges...</h2>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="validation-hint">Please wait while we load budget information</div>
        </div>
      </div>
    );
  }

  if (error && budgets.length === 0) {
    return (
      <div className="step-container">
        <h2 className="step-title">Target Student Budget</h2>
        <div className="error-message">{error}</div>
        <div className="ctnbtn">
          <button onClick={fetchBudgetData} className="continue-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      <div>
        <h2 className="step-title">Target Student Budget *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="budget" className="form-label">
              Select your target student budget range *
            </label>
            <select
              id="budget"
              value={formData.budget || ''}
              onChange={handleBudgetChange}
              className="form-inputt"
              required
            >
              <option value="">Select Budget Range *</option>
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>
                  ${budget.min} - ${budget.max} 
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {error && (
          <div className="error-message">{error}</div>
        )}
        
        {!formData.budget && !error && (
          <div className="validation-hint">Please select your target student budget to continue</div>
        )}
      </div>

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

export default Step4;
