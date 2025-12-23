import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, Upload, BookOpen } from 'lucide-react';
import '../assets/Styles/CreateBook.scss';

const CreateBook = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdfFile: null
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      pdfFile: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement book creation API call
      console.log('Creating book:', formData);
      
      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        pdfFile: null
      });
      onClose();
    } catch (error) {
      console.error('Error creating book:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      pdfFile: null
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenttt">
        <div className="modal-header">
          <h3>Create New Book</h3>
          <button className="close-btn" onClick={handleCancel}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter book title"
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
              placeholder="Enter book description"
              rows="4"
              required
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pdfFile">Upload PDF</label>
            <div className="file-upload">
              <input
                type="file"
                id="pdfFile"
                name="pdfFile"
                accept=".pdf"
                onChange={handleFileChange}
                className="file-input"
                required
              />
              <label htmlFor="pdfFile" className="file-label">
                <Upload size={20} />
                {formData.pdfFile ? formData.pdfFile.name : "Choose PDF file"}
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateBook.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CreateBook;