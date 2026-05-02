import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStep5, setCurrentStep, fetchQualifications, uploadCertification } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step5 = ({ formData, onInputChange, onNext, onBack, loading }) => {
  const dispatch = useDispatch();
  const { qualifications } = useSelector((state) => state.onboarding);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [qualificationsLoading, setQualificationsLoading] = useState(true);
  const [uploadingCertification, setUploadingCertification] = useState(false);
  const [certificationUploaded, setCertificationUploaded] = useState(false);

  useEffect(() => {
    fetchQualificationData();
  }, []);

  const fetchQualificationData = async () => {
    try {
      setQualificationsLoading(true);
      await dispatch(fetchQualifications()).unwrap();
    } catch (error) {
      console.error('Error fetching qualifications:', error);
      setError('Failed to load qualifications. Please try again.');
    } finally {
      setQualificationsLoading(false);
    }
  };

  const handleQualificationChange = (e) => {
    const selectedQualification = qualifications.find(q => q.id === e.target.value);
    onInputChange('qualification', selectedQualification?.name || '');
    onInputChange('qualificationId', selectedQualification?.id || '');
    setError('');
  };

  const handleCertificationUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid file (PDF, JPG, PNG)');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    try {
      setUploadingCertification(true);
      setError('');
      
      // Upload file to server
      const response = await dispatch(uploadCertification(file)).unwrap();
      
      // Store file info in form data
      onInputChange('certificationFile', file);
      onInputChange('certificationFileName', file.name);
      onInputChange('certificationUrl', response.url || response.filePath || '');
      
      setCertificationUploaded(true);
      
    } catch (error) {
      console.error('Error uploading certification:', error);
      setError('Failed to upload certification. Please try again.');
      setCertificationUploaded(false);
    } finally {
      setUploadingCertification(false);
    }
  };

  const handleNext = async () => {
    if (!formData.qualification || !formData.qualificationId) {
      setError('Please select your qualification level to continue');
      return;
    }

    if (!formData.certificationFile || !certificationUploaded) {
      setError('Please upload your certification document to continue');
      return;
    }

    const step5Data = {
      qualificationId: formData.qualificationId,
      certificationUrl: formData.certificationUrl
    };

    try {
      setIsSubmitting(true);
      setError('');
      await dispatch(updateStep5(step5Data)).unwrap();
      dispatch(setCurrentStep(6));
      onNext();
    } catch (error) {
      console.error('Failed to update step 5:', error);
      setError('Failed to save data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = () => {
    return formData.qualification && formData.qualificationId && formData.certificationFile && certificationUploaded;
  };

  if (qualificationsLoading) {
    return (
      <div className="step-container">
        <h2 className="step-title">Loading Qualifications...</h2>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="validation-hint">Please wait while we load qualification information</div>
        </div>
      </div>
    );
  }

  if (error && qualifications.length === 0) {
    return (
      <div className="step-container">
        <h2 className="step-title">Qualification & Certification</h2>
        <div className="error-message">{error}</div>
        <div className="ctnbtn">
          <button onClick={fetchQualificationData} className="continue-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="step-container">
      {/* Qualification Level */}
      <div>
        <h2 className="step-title">Qualification Level *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="qualification" className="form-label">
              Select your highest qualification *
            </label>
            <select
              id="qualification"
              value={formData.qualificationId || ''}
              onChange={handleQualificationChange}
              className="form-inputt"
              required
            >
              <option value="">Select Qualification *</option>
              {qualifications.map(qualification => (
                <option key={qualification.id} value={qualification.id}>
                  {qualification.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {!formData.qualification && !error && (
          <div className="validation-hint">Please select your qualification level to continue</div>
        )}
      </div>

      {/* Certification Upload */}
      <div>
        <h2 className="step-title">Upload Certification *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="certification" className="form-label">
              Upload your certification document *
            </label>
            <input
              type="file"
              id="certification"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleCertificationUpload}
              className="form-inputt"
              disabled={uploadingCertification}
              required
            />
            <div className="file-info">
              <small>Accepted formats: PDF, JPG, PNG (Max size: 5MB)</small>
            </div>
            {uploadingCertification && (
              <div className="file-uploading">
                <small>Uploading certification...</small>
              </div>
            )}
            {formData.certificationFileName && certificationUploaded && (
              <div className="file-selected success">
                <small>✓ Uploaded: {formData.certificationFileName}</small>
              </div>
            )}
            {formData.certificationFileName && !certificationUploaded && !uploadingCertification && (
              <div className="file-selected error">
                <small>✗ Upload failed: {formData.certificationFileName}</small>
              </div>
            )}
          </div>
        </div>
        
        {!formData.certificationFile && !error && (
          <div className="validation-hint">Please upload your certification document to continue</div>
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
          disabled={!isValid() || isSubmitting || loading || uploadingCertification}
        >
          {isSubmitting ? 'Saving...' : uploadingCertification ? 'Uploading...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Step5;
