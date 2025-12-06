import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Upload, Calendar } from 'lucide-react';
import '../assets/Styles/NewCourse.scss';
import { createCourseAsync, fetchSubjectsAsync, fetchLanguagesAsync } from '../store/courseSlice';

const NewCourse = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    courseName: '',
    accessType: 'free',
    subject: '',
    language: '',
    totalDuration: '',
    totalLectures: '',
    validityDays: '',
    startDate: '',
    endDate: '',
    price: '',
    discountedPrice: '',
    courseDescription: '',
    authorMessage: '',
    thumbnail: null
  });

  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();
  const { subjects, languages, loading } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchSubjectsAsync());
    dispatch(fetchLanguagesAsync());
  }, [dispatch]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
    }
  };

  const validateForm = () => {
    if (!formData.courseName.trim()) {
      alert('Course Name is required');
      return false;
    }
    if (!formData.subject) {
      alert('Subject is required');
      return false;
    }
    if (!formData.language) {
      alert('Language is required');
      return false;
    }
    if (!formData.totalDuration || formData.totalDuration <= 0) {
      alert('Total Duration must be greater than 0');
      return false;
    }
    if (!formData.totalLectures || formData.totalLectures <= 0) {
      alert('Total Lectures must be greater than 0');
      return false;
    }
    if (!formData.validityDays || formData.validityDays <= 0) {
      alert('Validity Days must be greater than 0');
      return false;
    }
    if (!formData.startDate) {
      alert('Start Date is required');
      return false;
    }
    if (!formData.endDate) {
      alert('End Date is required');
      return false;
    }
    if (!formData.courseDescription.trim()) {
      alert('Course Description is required');
      return false;
    }
    if (!formData.authorMessage.trim()) {
      alert('Author Message is required');
      return false;
    }
    if (!formData.thumbnail) {
      alert('Course Thumbnail is required');
      return false;
    }
    if (formData.accessType === 'paid' && (!formData.price || formData.price <= 0)) {
      alert('Price is required for paid courses');
      return false;
    }
    return true;
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const selectedSubject = subjects.find(s => s.name === formData.subject);
    const selectedLanguage = languages.find(l => l.name === formData.language);
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.courseName.trim());
    formDataToSend.append('description', formData.courseDescription.trim());
    formDataToSend.append('price', formData.accessType === 'paid' ? formData.price : '0');
    formDataToSend.append('discountPrice', formData.accessType === 'paid' ? (formData.discountedPrice || '0') : '0');
    formDataToSend.append('validityDays', parseInt(formData.validityDays));
    formDataToSend.append('accessType', formData.accessType.toUpperCase());
    formDataToSend.append('totalDuration', parseFloat(formData.totalDuration));
    formDataToSend.append('totalLectures', parseInt(formData.totalLectures));
    formDataToSend.append('authorMessage', formData.authorMessage.trim());
    formDataToSend.append('startDate', new Date(formData.startDate).toISOString());
    formDataToSend.append('endDate', new Date(formData.endDate).toISOString());
    formDataToSend.append('subjectId', selectedSubject?.id);
    formDataToSend.append('languageId', selectedLanguage?.id);
    formDataToSend.append('thumbnail', formData.thumbnail);

    const result = await dispatch(createCourseAsync(formDataToSend));
    if (result.type === 'course/createCourse/fulfilled') {
      onClose();
    }
  };

  const handleCancel = () => {
    setFormData({
      courseName: '',
      accessType: 'free',
      subject: '',
      language: '',
      totalDuration: '',
      totalLectures: '',
      validityDays: '',
      startDate: '',
      endDate: '',
      price: '',
      discountedPrice: '',
      courseDescription: '',
      authorMessage: '',
      thumbnail: null
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modald-content">
        <div className="modal-header">
          <h2>Create New Course</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form className="course-form" onSubmit={handleSave}>
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              value={formData.courseName}
              onChange={(e) => handleInputChange('courseName', e.target.value)}
              placeholder="Enter course name"
              required
              maxLength={70}
              onInvalid={(e) => {
                e.preventDefault();
                setValidationErrors(prev => ({ ...prev, courseName: 'Please fill the course name' }));
              }}
            />
            {validationErrors.courseName && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {validationErrors.courseName}
              </div>
            )}
          </div>

          <div className="form-group">
            <label id="access-type-label" htmlFor="access-type-group">Access Type</label>
            <div className="access-buttons" id="access-type-group" role="group" aria-labelledby="access-type-label">
              <button
                type="button"
                className={formData.accessType === 'free' ? 'active' : ''}
                onClick={() => handleInputChange('accessType', 'free')}
              >
                Free
              </button>
              <button
                type="button"
                className={formData.accessType === 'paid' ? 'active' : ''}
                onClick={() => handleInputChange('accessType', 'paid')}
              >
                Paid
              </button>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
                onInvalid={(e) => {
                  e.preventDefault();
                  setValidationErrors(prev => ({ ...prev, subject: 'Please select the subject' }));
                }}
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.name}>{subject.name}</option>
                ))}
              </select>
              {validationErrors.subject && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.subject}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Language</label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                required
                onInvalid={(e) => {
                  e.preventDefault();
                  setValidationErrors(prev => ({ ...prev, language: 'Please select the language' }));
                }}
              >
                <option value="">Select Language</option>
                {languages.map(language => (
                  <option key={language.id} value={language.name}>{language.name}</option>
                ))}
              </select>
              {validationErrors.language && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.language}
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Total Duration (hours)</label>
              <input
                type="number"
                value={formData.totalDuration}
                onChange={(e) => handleInputChange('totalDuration', e.target.value)}
                placeholder="0"
                required
                min="0"
                onInvalid={(e) => {
                  e.preventDefault();
                  setValidationErrors(prev => ({ ...prev, totalDuration: 'Please select total duration' }));
                }}
              />
              {validationErrors.totalDuration && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.totalDuration}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Total Lectures</label>
              <input
                type="number"
                value={formData.totalLectures}
                onChange={(e) => handleInputChange('totalLectures', e.target.value)}
                placeholder="0"
                required
                min="0"
                onInvalid={(e) => {
                  e.preventDefault();
                  setValidationErrors(prev => ({ ...prev, totalLectures: 'Please select total lectures' }));
                }}
              />
              {validationErrors.totalLectures && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.totalLectures}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Validity Days</label>
              <input
                type="number"
                value={formData.validityDays}
                onChange={(e) => handleInputChange('validityDays', e.target.value)}
                placeholder="0"
                required
                min="0"
                onInvalid={(e) => {
                  e.preventDefault();
                  setValidationErrors(prev => ({ ...prev, validityDays: 'Please select validity days' }));
                }}
              />
              {validationErrors.validityDays && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.validityDays}
                </div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                required
                onInvalid={(e) => {
                  e.preventDefault();
                  setValidationErrors(prev => ({ ...prev, startDate: 'Please select the starting date' }));
                }}
              />
              {validationErrors.startDate && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.startDate}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                required
                onInvalid={(e) => {
                  e.preventDefault();
                  setValidationErrors(prev => ({ ...prev, endDate: 'Please select the end date' }));
                }}
              />
              {validationErrors.endDate && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.endDate}
                </div>
              )}
            </div>
          </div>

          {formData.accessType === 'paid' && (
            <div className="form-row">
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, price: 'Please fill this field' }));
                  }}
                />
                {validationErrors.price && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {validationErrors.price}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Discounted Price</label>
                <input
                  type="number"
                  value={formData.discountedPrice}
                  onChange={(e) => handleInputChange('discountedPrice', e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>Course Description</label>
            <textarea
              value={formData.courseDescription}
              onChange={(e) => handleInputChange('courseDescription', e.target.value)}
              placeholder="Describe your course..."
              rows={4}
              required
              maxLength={250}
              onInvalid={(e) => {
                e.preventDefault();
                setValidationErrors(prev => ({ ...prev, courseDescription: 'Please give a course description' }));
              }}
            />
            {validationErrors.courseDescription && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {validationErrors.courseDescription}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Author Message</label>
            <textarea
              value={formData.authorMessage}
              onChange={(e) => handleInputChange('authorMessage', e.target.value)}
              placeholder="Message from the author..."
              rows={3}
              required
              maxLength={150}
              minLength={10}
              onInvalid={(e) => {
                e.preventDefault();
                setValidationErrors(prev => ({ ...prev, authorMessage: 'Please enter Author message' }));
              }}
            />
            {validationErrors.authorMessage && (
              <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                {validationErrors.authorMessage}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Course Thumbnail</label>
            <div className="upload-area">
              <Upload size={24} />
              <p>Upload course image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                id="thumbnail-upload"
                hidden
                required
                onInvalid={(e) => {
                  e.preventDefault();
                  setValidationErrors(prev => ({ ...prev, thumbnail: 'Please select a file' }));
                }}
              />
              <label htmlFor="thumbnail-upload" className="upload-btn">
                Choose File
              </label>
              {formData.thumbnail && (
                <p className="file-name">{formData.thumbnail.name}</p>
              )}
              {validationErrors.thumbnail && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.thumbnail}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCourse;