import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Upload, Video } from 'lucide-react';
import './CreateVideo.scss';
import { updateVideoLecture, updateVideoThumbnail, updateVideoFile } from '../../../../services/courseService';

const EditVideo = ({ isOpen, onClose, video, onVideoUpdated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    accessTypes: 'FREE'
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (video) {
      setFormData({
        title: video.title || '',
        description: video.description || '',
        duration: video.duration || '',
        accessTypes: video.accessTypes || 'FREE'
      });
    }
  }, [video]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const updateResult = await updateVideoLecture(video.id, formData);
      
      if (!updateResult.success) {
        throw new Error(updateResult.message);
      }

      if (videoFile) {
        const videoResult = await updateVideoFile(video.id, videoFile);
        if (!videoResult.success) {
          console.warn('Failed to update video file:', videoResult.message);
        }
      }

      if (thumbnailFile) {
        const thumbnailResult = await updateVideoThumbnail(video.id, thumbnailFile);
        if (!thumbnailResult.success) {
          console.warn('Failed to update thumbnail:', thumbnailResult.message);
        }
      }

      onVideoUpdated();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update video lecture');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content create-video-modal">
        <div className="modal-header">
          <h3>Edit Video Lecture</h3>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="video-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Video Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
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
              min="1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="video-upload">Update Video (Optional)</label>
            <div className="file-upload">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="file-input"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="file-label">
                <Video size={20} />
                {videoFile ? videoFile.name : 'Choose new video file'}
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="thumbnail-upload">Update Thumbnail (Optional)</label>
            <div className="file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="file-input"
                id="thumbnail-upload"
              />
              <label htmlFor="thumbnail-upload" className="file-label">
                <Upload size={20} />
                {thumbnailFile ? thumbnailFile.name : 'Choose new thumbnail'}
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Updating...' : 'Update Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditVideo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  video: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    accessTypes: PropTypes.string
  }),
  onVideoUpdated: PropTypes.func.isRequired
};

export default EditVideo;