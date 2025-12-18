import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Upload, Check } from 'lucide-react';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';
import { API_BASE_URL } from '../../config/api.js';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import { 
  updateTutorDetails, 
  fetchCountries, 
  fetchStates,
  fetchCities, 
  fetchQualifications,
  fetchSubjects,
  setCurrentStep,
  updateFormData,
  resetOnboarding
} from '../../store/onboardingSlice';

const OnBoardMain = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentStep, formData, countries, states, cities, qualifications, subjects, loading } = useSelector(state => state.onboarding);

  const handleBackToSignIn = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    dispatch(resetOnboarding());
    dispatch(fetchCountries());
    dispatch(fetchQualifications());
    dispatch(fetchSubjects());
  }, [dispatch]);



  const totalSteps = 9;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const [ageError, setAgeError] = useState('');

  const handleInputChange = (field, value) => {
    dispatch(updateFormData({ [field]: value }));
    if (field === 'dob') {
      setAgeError('');
    }
  };

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

  const getQualificationId = (qualificationName) => {
    const qualification = qualifications.find(q => q.name === qualificationName);
    return qualification?.id || '';
  };

  const uploadProfileImage = async (file) => {
    try {
      const token = localStorage.getItem('token');
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      
      const response = await fetch(`${API_BASE_URL}/tutor-details/profileImage`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Profile image uploaded successfully:', data);
      dispatch(updateFormData({ profilePicture: file }));
    } catch (error) {
      console.error('Error uploading profile image:', error);
    }
  };

  const uploadIdDocument = async (file) => {
    try {
      const token = localStorage.getItem('token');
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      
      const response = await fetch(`${API_BASE_URL}/tutor-details/document`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('ID document uploaded successfully:', data);
      dispatch(updateFormData({ idDocument: file }));
    } catch (error) {
      console.error('Error uploading ID document:', error);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const continueStep = async () => {
    if (currentStep === 2) {
      if (!formData.dob) {
        setAgeError('Please select your date of birth');
        return;
      }
      const age = calculateAge(formData.dob);
      if (age < 18) {
        setAgeError('You must be 18 years or older to proceed');
        return;
      }
    }

    if (currentStep === 6) {
      const bioWordCount = formData.bio.trim().split(/\s+/).filter(word => word.length > 0).length;
      if (bioWordCount < 15) {
        return;
      }
    }

    const updateData = {};
    
    if (currentStep === 1 && formData.gender) updateData.gender = formData.gender;
    if (currentStep === 2 && formData.dob) updateData.dob = formData.dob;
    if (currentStep === 3) {
      if (formData.countryId) updateData.countryId = formData.countryId;
      if (formData.stateId) updateData.stateId = formData.stateId;
      if (formData.cityId) updateData.cityId = String(formData.cityId);
    }
    if (currentStep === 4) {
      if (formData.education) updateData.qualificationId = getQualificationId(formData.education);
      if (formData.proficiency) updateData.expertiseLevel = formData.proficiency;
    }
    if (currentStep === 5 && formData.specializationId) updateData.subjectId = formData.specializationId;
    if (currentStep === 6 && formData.bio) updateData.bio = formData.bio;
    
    if (Object.keys(updateData).length > 0) {
      dispatch(updateTutorDetails(updateData));
    }
    
    if (currentStep < totalSteps) dispatch(setCurrentStep(currentStep + 1));
  };

  const renderGenderStep = () => (
    <div className="step-container">
      <h2 className="step-title">Select Your Gender</h2>
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
    </div>
  );

  const renderDateStep = () => (
    <div className="step-container">
      <h2 className="step-title">Date of Birth</h2>
      <input
        type="date"
        value={formData.dob}
        onChange={(e) => handleInputChange('dob', e.target.value)}
        className="form-inputt"
      />
      {ageError && <div className="error-message">{ageError}</div>}
    </div>
  );

  const renderLocationStep = () => {
    const handleCountryChange = (e) => {
      const selectedCountry = countries.find(c => c.name === e.target.value);
      handleInputChange('country', e.target.value);
      handleInputChange('countryId', selectedCountry?.id || '');
      handleInputChange('state', '');
      handleInputChange('city', '');
      if (selectedCountry?.id) dispatch(fetchStates(selectedCountry.id));
    };

    const handleStateChange = (e) => {
      const selectedState = states.find(s => s.name === e.target.value);
      handleInputChange('state', e.target.value);
      handleInputChange('stateId', selectedState?.id || '');
      handleInputChange('city', '');
      if (selectedState?.id) dispatch(fetchCities(selectedState.id));
    };

    const handleCityChange = (e) => {
      const selectedCity = cities.find(c => c.name === e.target.value);
      handleInputChange('city', e.target.value);
      handleInputChange('cityId', selectedCity?.id || '');
    };

    return (
      <div className="step-container">
        <h2 className="step-title">Location</h2>
        <div className="input-group">
          <select value={formData.country} onChange={handleCountryChange} className="form-inputt">
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country.id} value={country.name}>{country.name}</option>
            ))}
          </select>
          <select value={formData.state} onChange={handleStateChange} className="form-inputt" disabled={!formData.country}>
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state.id} value={state.name}>{state.name}</option>
            ))}
          </select>
          <select value={formData.city} onChange={handleCityChange} className="form-inputt" disabled={!formData.state}>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city.id} value={city.name}>{city.name}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const renderEducationStep = () => (
    <div className="step-container">
      <h2 className="step-title">Education</h2>
      <div className="input-group">
        <div>
          <label htmlFor="education" className="form-label">Tell us about your education</label>
          <select id="education" value={formData.education} onChange={(e) => handleInputChange('education', e.target.value)} className="form-inputt">
            <option value="">Select Education Level</option>
            {qualifications.map(qualification => (
              <option key={qualification.id} value={qualification.name}>{qualification.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="proficiency" className="form-label">Tell us about your proficiency</label>
          <select id="proficiency" value={formData.proficiency} onChange={(e) => handleInputChange('proficiency', e.target.value)} className="form-inputt">
            <option value="">Select Proficiency Level</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="EXPERTS">Expert</option>
            <option value="PRO_MASTER">Professional</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderSpecializationStep = () => {
    const handleSpecializationChange = (e) => {
      const selectedSubject = subjects.find(s => s.name === e.target.value);
      handleInputChange('specialization', e.target.value);
      handleInputChange('specializationId', selectedSubject?.id || '');
    };

    return (
      <div className="step-container">
        <h2 className="step-title">Specialization</h2>
        <div>
          <label htmlFor="specialization" className="form-label">Tell us about your specialization</label>
          <select id="specialization" value={formData.specialization} onChange={handleSpecializationChange} className="form-inputt">
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.name}>{subject.name}</option>
            ))}
          </select>
        </div>
      </div>
    );
  };

  const getBioWordCountClass = (wordCount) => {
    if (wordCount < 15) return 'text-warning';
    if (wordCount > 80) return 'text-error';
    return 'text-success';
  };

  const renderBioStep = () => {
    const bioWordCount = formData.bio.trim().split(/\s+/).filter(word => word.length > 0).length;
    const isValidBio = bioWordCount >= 15 && bioWordCount <= 80;
    
    return (
      <div className="step-container">
        <h2 className="step-title">Your Bio</h2>
        <div>
          <label htmlFor="bio" className="form-label">Tell us about yourself (15-80 words)</label>
          <textarea
            id="bio"
            placeholder="Write a brief bio about yourself, your teaching experience, and what makes you unique..."
            value={formData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            rows={6}
            className={`form-textarea ${!isValidBio && formData.bio ? 'error' : ''}`}
          />
          <div className="word-count">
            <span className={getBioWordCountClass(bioWordCount)}>
              {bioWordCount}/80 words {bioWordCount < 15 ? '(minimum 15)' : ''}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderUploadStep = (title, accept, uploadFn, fileKey, inputId) => (
    <div className="step-container">
      <h2 className="step-title">{title}</h2>
      <div className="upload-area">
        <Upload className="upload-icon" />
        <p className="upload-text">{title === 'Profile Picture' ? 'Upload your profile picture' : 'Upload a valid government ID'}</p>
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) uploadFn(file);
          }}
          className="file-input"
          id={inputId}
          disabled={loading}
          style={{ display: 'none' }}
        />
        <button
          type="button"
          onClick={() => document.getElementById(inputId).click()}
          className={`upload-button ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Choose File'}
        </button>
        {formData[fileKey] && (
          <p className="file-success">✓ {formData[fileKey].name}</p>
        )}
      </div>
    </div>
  );

  const renderCompletionStep = () => (
    <div className="step-container completion-step">
      <div className="success-icon">
        <Check className="check-icon" />
      </div>
      <h2 className="step-title">Account Under Review</h2>
      <p className="completion-text">
        Thank you for completing your profile! Your account is now under review. 
        We'll notify you once the verification process is complete.
      </p>
      <div className="info-box">
        <p className="info-text">
          Review typically takes 24-48 hours. You'll receive an email notification once approved.
        </p>
      </div>
      <button className='backtosignin' onClick={handleBackToSignIn}>Back to Sign In</button>
    </div>
  );

  const renderStep = () => {
    const stepComponents = {
      1: renderGenderStep,
      2: renderDateStep,
      3: renderLocationStep,
      4: renderEducationStep,
      5: renderSpecializationStep,
      6: renderBioStep,
      7: () => renderUploadStep('Profile Picture', 'image/*', uploadProfileImage, 'profilePicture', 'profile-upload'),
      8: () => renderUploadStep('Valid ID Document', '.pdf,.jpg,.jpeg,.png', uploadIdDocument, 'idDocument', 'id-upload'),
      9: renderCompletionStep
    };
    
    return stepComponents[currentStep]?.() || null;
  };

  return (
    <div className="onboard-container">
      <div className="onboard-wrapper">
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
        </div>

        {/* Form Content */}
        <div className="form-card">
          {renderStep()}

          {/* Navigation Buttons */}
          {currentStep < 9 && (
            <div className="ctnbtn">
              {currentStep > 1 && (
                <button
                  onClick={goBack}
                  className="back-btn"
                >
                  Back
                </button>
              )}
              <button
                onClick={continueStep}
                className="continue-btn"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnBoardMain;