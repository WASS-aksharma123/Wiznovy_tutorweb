import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentStep, uploadGovernmentId } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step8 = ({ formData, onInputChange, onNext, onBack, loading }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [documentUploaded, setDocumentUploaded] = useState(false);

  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid file (PDF, JPG, PNG)');
      return;
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB');
      return;
    }

    try {
      setUploadingDocument(true);
      setError('');
      
      // Upload file to server - this is the only API call needed
      const response = await dispatch(uploadGovernmentId(file)).unwrap();
      
      // Store file info in form data
      onInputChange('governmentIdFile', file);
      onInputChange('governmentIdFileName', file.name);
      onInputChange('governmentIdUrl', response.url || response.filePath || '');
      
      setDocumentUploaded(true);
      
    } catch (error) {
      console.error('Error uploading government ID:', error);
      setError('Failed to upload government ID. Please try again.');
      setDocumentUploaded(false);
    } finally {
      setUploadingDocument(false);
    }
  };

  const handleNext = async () => {
    if (!formData.governmentIdFile || !documentUploaded) {
      setError('Please upload your government ID document to continue');
      return;
    }

    try {
      setError('');
      // No API call needed here - the document was already uploaded
      // Just proceed to the next step
      dispatch(setCurrentStep(9));
      onNext();
    } catch (error) {
      console.error('Failed to proceed to next step:', error);
      setError('Failed to proceed. Please try again.');
    }
  };

  const isValid = () => {
    return formData.governmentIdFile && documentUploaded;
  };

  return (
    <div className="step-container">
      {/* Government ID Upload */}
      <div>
        <h2 className="step-title">Upload Government ID *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="governmentId" className="form-label">
              Upload your government-issued ID document *
            </label>
            <input
              type="file"
              id="governmentId"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleDocumentUpload}
              className="form-inputt"
              disabled={uploadingDocument}
              required
            />
            <div className="field-info">
              <small>
                <strong>Accepted documents:</strong> Passport, Driving License, National ID<br/>
                <strong>Accepted formats:</strong> PDF, JPG, PNG (Max size: 10MB)
              </small>
            </div>
            {uploadingDocument && (
              <div className="file-uploading">
                <small>Uploading government ID...</small>
              </div>
            )}
            {formData.governmentIdFileName && documentUploaded && (
              <div className="file-selected success">
                <small>✓ Uploaded: {formData.governmentIdFileName}</small>
              </div>
            )}
            {formData.governmentIdFileName && !documentUploaded && !uploadingDocument && (
              <div className="file-selected error">
                <small>✗ Upload failed: {formData.governmentIdFileName}</small>
              </div>
            )}
          </div>
        </div>
        
        {!formData.governmentIdFile && !error && (
          <div className="validation-hint">
            Please upload your government ID document to continue
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
          disabled={!isValid() || loading || uploadingDocument}
        >
          {uploadingDocument ? 'Uploading...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Step8;

