import React, { useState, useEffect } from 'react';
import { X, FileText } from 'lucide-react';
import { updateStudyMaterialByTutorWithId } from '../../../../services/studyMaterialService';
import './CreateStudyMaterial.scss';

const EditStudyMaterial = ({ isOpen, onClose, studyMaterial, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (studyMaterial) {
      setFormData({
        title: studyMaterial.title || '',
        description: studyMaterial.description || '',
      });
    }
  }, [studyMaterial]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        title: formData.title,
        description: formData.description,
      };

      const result = await updateStudyMaterialByTutorWithId(studyMaterial.id, submitData);

      if (result.success) {
        onSuccess && onSuccess(result.data);
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !studyMaterial) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content create-study-material-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Study Material</h3>
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
            />
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
            />
          </div>

          {studyMaterial.fileName && (
            <div className="form-group">
              <label>Current File</label>
              <p className="current-file">📄 {studyMaterial.fileName}</p>
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update Study Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudyMaterial;