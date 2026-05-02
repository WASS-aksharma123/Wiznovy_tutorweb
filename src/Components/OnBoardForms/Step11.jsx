import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentStep, uploadIntroductionVideo } from '../../store/onboardingSlice';
import '../../assets/Styles/OnBoardForms/OnBoardMain.scss';

const Step11 = ({ formData, onInputChange, onNext, onBack, loading }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);

  const validateVideoDuration = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        setVideoDuration(duration);
        
        if (duration < 30) {
          reject('Video must be at least 30 seconds long');
        } else if (duration > 60) {
          reject('Video must not exceed 1 minute (60 seconds)');
        } else {
          resolve(duration);
        }
      };
      
      video.onerror = () => {
        window.URL.revokeObjectURL(video.src);
        reject('Unable to read video file. Please ensure it\'s a valid video format.');
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['video/mp4', 'video/quicktime', 'video/mov'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid video file (MP4, MOV)');
      return;
    }

    // Validate file size (30MB max)
    if (file.size > 30 * 1024 * 1024) {
      setError('Video file size must not exceed 30MB');
      return;
    }

    try {
      setUploadingVideo(true);
      setError('');
      
      // Validate video duration
      await validateVideoDuration(file);
      
      // Upload video to server
      const response = await dispatch(uploadIntroductionVideo(file)).unwrap();
      
      // Store video info in form data
      onInputChange('introductionVideoFile', file);
      onInputChange('introductionVideoFileName', file.name);
      onInputChange('introductionVideoUrl', response.url || response.filePath || '');
      
      setVideoUploaded(true);
      
    } catch (error) {
      console.error('Error uploading introduction video:', error);
      setError(typeof error === 'string' ? error : 'Failed to upload introduction video. Please try again.');
      setVideoUploaded(false);
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleNext = async () => {
    if (!formData.introductionVideoFile || !videoUploaded) {
      setError('Please upload your introduction video to continue');
      return;
    }

    try {
      setError('');
      // No API call needed here - the video was already uploaded
      // Just proceed to the next step using onNext callback
      onNext();
    } catch (error) {
      console.error('Failed to proceed to next step:', error);
      setError('Failed to proceed. Please try again.');
    }
  };

  const isValid = () => {
    return formData.introductionVideoFile && videoUploaded;
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="step-container">
      {/* Introduction Video Upload */}
      <div>
        <h2 className="step-title">Introduction Video (30s–1min, MP4/MOV, max 30MB) *</h2>
        <div className="input-group">
          <div>
            <label htmlFor="introductionVideo" className="form-label">
              Upload your introduction video *
            </label>
            <input
              type="file"
              id="introductionVideo"
              accept=".mp4,.mov,video/mp4,video/quicktime"
              onChange={handleVideoUpload}
              className="form-inputt"
              disabled={uploadingVideo}
              required
            />
            <div className="field-info">
              <small>
                <strong>Requirements:</strong><br/>
                • Duration: 30 seconds minimum, 1 minute maximum<br/>
                • Formats: MP4, MOV with desktop codecs<br/>
                • File size: Maximum 30MB<br/>
                • Content: Introduce yourself and your teaching approach
              </small>
            </div>
            {uploadingVideo && (
              <div className="file-uploading">
                <small>Uploading introduction video...</small>
              </div>
            )}
            {formData.introductionVideoFileName && videoUploaded && (
              <div className="file-selected success">
                <small>
                  ✓ Uploaded: {formData.introductionVideoFileName}
                  {videoDuration && (
                    <span className="video-details">
                      <br/>Duration: {formatDuration(videoDuration)} | Size: {formatFileSize(formData.introductionVideoFile?.size)}
                    </span>
                  )}
                </small>
              </div>
            )}
            {formData.introductionVideoFileName && !videoUploaded && !uploadingVideo && (
              <div className="file-selected error">
                <small>✗ Upload failed: {formData.introductionVideoFileName}</small>
              </div>
            )}
          </div>
        </div>
        
        {!formData.introductionVideoFile && !error && (
          <div className="validation-hint">
            Please upload your introduction video to continue
          </div>
        )}
        
        {/* Video Preview */}
        {formData.introductionVideoFile && videoUploaded && (
          <div className="video-preview">
            <h4>Video Preview:</h4>
            <video 
              controls 
              width="100%" 
              style={{ maxWidth: '400px', borderRadius: '8px' }}
              src={URL.createObjectURL(formData.introductionVideoFile)}
            >
              Your browser does not support the video tag.
            </video>
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
          disabled={!isValid() || loading || uploadingVideo}
        >
          {uploadingVideo ? 'Uploading...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Step11;
