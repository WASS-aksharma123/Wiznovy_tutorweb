import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, FileText } from 'lucide-react';
import { createStudyMaterial } from '../../../../services/studyMaterialService';
import './CreateStudyMaterial.scss';

const CreateStudyMaterial = ({ isOpen, onClose, unitId, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    unitId: unitId || '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    // Clear validation error when user selects a file
    if (validationErrors.file) {
      setValidationErrors(prev => ({ ...prev, file: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('unitId', formData.unitId);
      
      if (file) {
        submitData.append('pdf', file);
      }

      const result = await createStudyMaterial(submitData);

      if (result.success) {
        onSuccess?.(result.data);
        onClose();
        setFormData({
          title: '',
          description: '',
          unitId: unitId || '',
        });
        setFile(null);
        setValidationErrors({});
      } else {
        setError(result.message);
      }
    } catch (err) {
      console.error('Error creating study material:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content create-study-material-modal">
        <div className="modal-header">
          <h3>Create Study Material</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form className="study-material-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              maxLength={100}
              onInvalid={(e) => {
                e.preventDefault();
                setValidationErrors(prev => ({ ...prev, title: 'Please enter the study material title' }));
              }}
            />
            {validationErrors.title && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {validationErrors.title}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
              maxLength={500}
              onInvalid={(e) => {
                e.preventDefault();
                setValidationErrors(prev => ({ ...prev, description: 'Please enter the study material description' }));
              }}
            />
            {validationErrors.description && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {validationErrors.description}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="file">PDF File</label>
            <div className="file-upload">
              <input
                type="file"
                id="file"
                name="file"
                className="file-input"
                onChange={handleFileChange}
                accept=".pdf"
                required
                onInvalid={(e) => {
                  e.preventDefault();
                  setValidationErrors(prev => ({ ...prev, file: 'Please select a PDF file' }));
                }}
              />
              <label htmlFor="file" className="file-label">
                <FileText size={20} />
                {file ? file.name : 'Choose a PDF file to upload'}
              </label>
            </div>
            {validationErrors.file && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {validationErrors.file}
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create Study Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateStudyMaterial.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  unitId: PropTypes.string,
  onSuccess: PropTypes.func
};

export default CreateStudyMaterial;