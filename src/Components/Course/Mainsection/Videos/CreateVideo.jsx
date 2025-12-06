import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X, Upload, Video } from 'lucide-react';
import { createVideoLecture } from '../../../../services/courseService';
import './CreateVideo.scss';

const CreateVideo = ({ isOpen, onClose, unitId, onVideoCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    videoFile: null,
    thumbnailFile: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('unitId', unitId);
      formDataToSend.append('duration', Number.parseInt(formData.duration, 10));
      
      if (formData.videoFile) {
        formDataToSend.append('video', formData.videoFile);
      }
      if (formData.thumbnailFile) {
        formDataToSend.append('thumbnail', formData.thumbnailFile);
      }

      const result = await createVideoLecture(formDataToSend);

      if (result.success) {
        onVideoCreated?.(result.data);
        setFormData({
          title: '',
          description: '',
          duration: '',
          videoFile: null,
          thumbnailFile: null
        });
        onClose();
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error creating video lecture:', error);
      setError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content create-video-modal">
        <div className="modal-header">
          <h3>Create New Video</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="video-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="title">Video Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              maxLength={50}
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
              maxLength={300}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Duration (minutes)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="videoFile">Video Upload</label>
            <div className="file-upload">
              <input
                type="file"
                id="videoFile"
                name="videoFile"
                accept="video/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="videoFile" className="file-label">
                <Video size={20} />
                {formData.videoFile ? formData.videoFile.name : "Choose a video file"}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="thumbnailFile">Thumbnail Upload</label>
            <div className="file-upload">
              <input
                type="file"
                id="thumbnailFile"
                name="thumbnailFile"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="thumbnailFile" className="file-label">
                <Upload size={20} />
                {formData.thumbnailFile ? formData.thumbnailFile.name : "Choose a thumbnail"}
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating...' : 'Create Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

CreateVideo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  unitId: PropTypes.string.isRequired,
  onVideoCreated: PropTypes.func
};

export default CreateVideo;