import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { X, Upload } from 'lucide-react';
import '../../assets/Styles/NewCourse.scss';
import '../../assets/Styles/EditCourse.scss';
import { fetchSubjectsAsync, fetchLanguagesAsync, updateCourseAsync } from '../../store/courseSlice';

const EditCourse = ({ isOpen, onClose, courseData, onSave }) => {
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

  const dispatch = useDispatch();
  const { subjects, languages } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(fetchSubjectsAsync());
    dispatch(fetchLanguagesAsync());
  }, [dispatch]);

  useEffect(() => {
    if (courseData) {
      setFormData({
        courseName: courseData.name || '',
        accessType: courseData.accessType?.toLowerCase() || 'free',
        subject: courseData.subjectId || '',
        language: courseData.languageId || '',
        totalDuration: courseData.totalDuration || '',
        totalLectures: courseData.totalLectures || '',
        validityDays: courseData.validityDays || '',
        startDate: courseData.startDate ? new Date(courseData.startDate).toISOString().split('T')[0] : '',
        endDate: courseData.endDate ? new Date(courseData.endDate).toISOString().split('T')[0] : '',
        price: courseData.price || '',
        discountedPrice: courseData.discountPrice || '',
        courseDescription: courseData.description || '',
        authorMessage: courseData.authorMessage || '',
        thumbnail: null
      });
    }
  }, [courseData]);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, thumbnail: file }));
    }
  };



  const handleCancel = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      const updateData = {
        name: formData.courseName,
        description: formData.courseDescription,
        price: Number.parseFloat(formData.price) || 0,
        discountPrice: Number.parseFloat(formData.discountedPrice) || 0,
        validityDays: Number.parseInt(formData.validityDays, 10) || 0,
        accessType: formData.accessType.toUpperCase(),
        totalDuration: formData.totalDuration,
        totalLectures: Number.parseInt(formData.totalLectures, 10) || 0,
        authorMessage: formData.authorMessage,
        startDate: formData.startDate,
        endDate: formData.endDate,
        subjectId: formData.subject,
        languageId: formData.language
      };

      const formDataToSend = new FormData();
      Object.keys(updateData).forEach(key => {
        formDataToSend.append(key, updateData[key]);
      });
      
      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }

      await dispatch(updateCourseAsync({ 
        courseId: courseData.id, 
        courseData: formDataToSend 
      })).unwrap();
      
      if (onSave) {
        onSave(updateData);
      }
      onClose();
    } catch (error) {
      console.error('Failed to update course:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modald-content">
        <div className="modal-header">
          <h2>Edit Course</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form className="course-form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div className="form-group">
            <label htmlFor='course_input'>Course Name</label>
            <input
            id='course_input'
              type="text"
              value={formData.courseName}
              onChange={(e) => handleInputChange('courseName', e.target.value)}
              placeholder="Enter course name"
              maxLength={70}
              required
            />
          </div>

          <fieldset className="form-group">
            <legend>Access Type</legend>
            <div className="access-buttons">
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
          </fieldset>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="subject-select">Subject</label>
              <select
                id="subject-select"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                required
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="language-select">Language</label>
              <select
                id="language-select"
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
                required
              >
                <option value="">Select Language</option>
                {languages.map(language => (
                  <option key={language.id} value={language.id}>{language.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="duration-input">Total Duration (hours)</label>
              <input
                id="duration-input"
                type="number"
                value={formData.totalDuration}
                onChange={(e) => handleInputChange('totalDuration', e.target.value)}
                placeholder="0"
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="total-lectures-input">Total Lectures</label>
              <input
                id="total-lectures-input"
                type="number"
                value={formData.totalLectures}
                onChange={(e) => handleInputChange('totalLectures', e.target.value)}
                placeholder="0"
                required
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="validity-days-input">Validity Days</label>
              <input
                id="validity-days-input"
                type="number"
                value={formData.validityDays}
                onChange={(e) => handleInputChange('validityDays', e.target.value)}
                placeholder="0"
                required
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="start-date-input">Start Date</label>
              <input
                id="start-date-input"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="end-date-input">End Date</label>
              <input
                id="end-date-input"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                required
              />
            </div>
          </div>

          {formData.accessType === 'paid' && (
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price-input">Price</label>
                <input
                  id="price-input"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="discounted-price-input">Discounted Price</label>
                <input
                  id="discounted-price-input"
                  type="number"
                  value={formData.discountedPrice}
                  onChange={(e) => handleInputChange('discountedPrice', e.target.value)}
                  placeholder="0.00"
                  min="0"
                  max={formData.price || undefined}
                  step="0.01"
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="course-description-input">Course Description</label>
            <textarea
              id="course-description-input"
              value={formData.courseDescription}
              onChange={(e) => handleInputChange('courseDescription', e.target.value)}
              placeholder="Describe your course..."
              rows={4}
              maxLength={250}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="author-message-input">Author Message</label>
            <textarea
              id="author-message-input"
              value={formData.authorMessage}
              onChange={(e) => handleInputChange('authorMessage', e.target.value)}
              placeholder="Message from the author..."
              rows={3}
              maxLength={150}
              minLength={10}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="thumbnail-upload">Course Thumbnail</label>
            <div className="upload-area">
              <Upload size={24} />
              <p>Upload course image</p>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                hidden
              />
              <label htmlFor="thumbnail-upload" className="upload-btn">
                Choose File
              </label>
              {formData.thumbnail && (
                <p className="file-name">{formData.thumbnail.name}</p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Update Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditCourse.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  courseData: PropTypes.object,
  onSave: PropTypes.func
};

export default EditCourse;