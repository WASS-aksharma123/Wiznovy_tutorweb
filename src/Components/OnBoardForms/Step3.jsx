import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onboardingService } from '../../services/onboardingService';
import { updateStep3, setCurrentStep } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step3 = ({ formData, onInputChange, onNext, onBack, loading: globalLoading }) => {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState({
    countries: true,
    states: false,
    cities: false
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(prev => ({ ...prev, countries: true }));
      setError('');
      const response = await onboardingService.fetchCountries();
      setCountries(response || []);
    } catch (err) {
      console.error('Error fetching countries:', err);
      setError('Failed to load countries. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, countries: false }));
    }
  };

  const fetchStates = async (countryId) => {
    try {
      setLoading(prev => ({ ...prev, states: true }));
      const response = await onboardingService.fetchStates(countryId);
      setStates(response || []);
    } catch (err) {
      console.error('Error fetching states:', err);
      setError('Failed to load states. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, states: false }));
    }
  };

  const fetchCities = async (stateId) => {
    try {
      setLoading(prev => ({ ...prev, cities: true }));
      const response = await onboardingService.fetchCities(stateId);
      setCities(response || []);
    } catch (err) {
      console.error('Error fetching cities:', err);
      setError('Failed to load cities. Please try again.');
    } finally {
      setLoading(prev => ({ ...prev, cities: false }));
    }
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(c => c.name === e.target.value);
    onInputChange('country', e.target.value);
    onInputChange('countryId', selectedCountry?.id || '');
    onInputChange('state', '');
    onInputChange('stateId', '');
    onInputChange('city', '');
    onInputChange('cityId', '');
    
    // Clear states and cities
    setStates([]);
    setCities([]);
    
    // Fetch states for selected country
    if (selectedCountry?.id) {
      fetchStates(selectedCountry.id);
    }
  };

  const handleStateChange = (e) => {
    const selectedState = states.find(s => s.name === e.target.value);
    onInputChange('state', e.target.value);
    onInputChange('stateId', selectedState?.id || '');
    onInputChange('city', '');
    onInputChange('cityId', '');
    
    // Clear cities
    setCities([]);
    
    // Fetch cities for selected state
    if (selectedState?.id) {
      fetchCities(selectedState.id);
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = cities.find(c => c.name === e.target.value);
    onInputChange('city', e.target.value);
    onInputChange('cityId', selectedCity?.id || '');
  };

  const handleNext = async () => {
    if (!formData.country || !formData.state || !formData.city || 
        !formData.countryId || !formData.stateId || !formData.cityId) {
      setError('Please select country, state, and city to continue');
      return;
    }

    // Prepare data for API
    const step3Data = {
      countryId: String(formData.countryId),
      stateId: String(formData.stateId),
      cityId: String(formData.cityId)
    };

    try {
      setIsSubmitting(true);
      setError('');
      // Send data to API
      await dispatch(updateStep3(step3Data)).unwrap();
      // Update current step to 4 locally
      dispatch(setCurrentStep(4));
      // Proceed to next step
      onNext();
    } catch (error) {
      console.error('Failed to update step 3:', error);
      setError('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    return formData.country && formData.state && formData.city && 
           formData.countryId && formData.stateId && formData.cityId;
  };

  if (loading.countries) {
    return (
      <div className="step-container">
        <h2 className="step-title">Loading Location Data...</h2>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="validation-hint">Please wait while we load location information</div>
        </div>
      </div>
    );
  }

  if (error && countries.length === 0) {
    return (
      <div className="step-container">
        <h2 className="step-title">Location Selection</h2>
        <div className="error-message">{error}</div>
        <div className="ctnbtn">
          <button onClick={fetchCountries} className="continue-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      {/* Location Selection */}
      <div>
        <h2 className="step-title">Select Your Location *</h2>
        <div className="input-group">
          {/* Country Dropdown */}
          <div>
            <label htmlFor="country" className="form-label">
              Select Country *
            </label>
            <select
              id="country"
              value={formData.country || ''}
              onChange={handleCountryChange}
              className="form-inputt"
              required
            >
              <option value="">Select Country *</option>
              {countries.map(country => (
                <option key={country.id} value={country.name}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Dropdown */}
          <div>
            <label htmlFor="state" className="form-label">
              Select State *
            </label>
            <select
              id="state"
              value={formData.state || ''}
              onChange={handleStateChange}
              className="form-inputt"
              disabled={!formData.country || loading.states}
              required
            >
              <option value="">
                {loading.states ? 'Loading states...' : 'Select State *'}
              </option>
              {states.map(state => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* City Dropdown */}
          <div>
            <label htmlFor="city" className="form-label">
              Select City *
            </label>
            <select
              id="city"
              value={formData.city || ''}
              onChange={handleCityChange}
              className="form-inputt"
              disabled={!formData.state || loading.cities}
              required
            >
              <option value="">
                {loading.cities ? 'Loading cities...' : 'Select City *'}
              </option>
              {cities.map(city => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="error-message">{error}</div>
        )}

        {(!formData.country || !formData.state || !formData.city) && !error && (
          <div className="validation-hint">
            Please select country, state, and city to continue
          </div>
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
          disabled={!isValid() || loading.states || loading.cities || isSubmitting || globalLoading}
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Step3;