import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { X, Upload } from 'lucide-react';
import '../assets/Styles/NewCourse.scss';
import '../assets/Styles/EditCourse.scss';
import { fetchSubjectsAsync, fetchLanguagesAsync, updateCourseAsync } from '../store/courseSlice';

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
        startDate: courseData.startDate || '',
        endDate: courseData.endDate || '',
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modald-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Course</h2>
          <button onClick={onClose} className="close-btn">
            <X size={20} />
          </button>
        </div>

        <form className="course-form">
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              value={formData.courseName}
              onChange={(e) => handleInputChange('courseName', e.target.value)}
              placeholder="Enter course name"
            />
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
              >
                <option value="">Select Subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Language</label>
              <select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
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
              <label>Total Duration (hours)</label>
              <input
                type="number"
                value={formData.totalDuration}
                onChange={(e) => handleInputChange('totalDuration', e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Total Lectures</label>
              <input
                type="number"
                value={formData.totalLectures}
                onChange={(e) => handleInputChange('totalLectures', e.target.value)}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Validity Days</label>
              <input
                type="number"
                value={formData.validityDays}
                onChange={(e) => handleInputChange('validityDays', e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
              />
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
                />
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
            />
          </div>

          <div className="form-group">
            <label>Author Message</label>
            <textarea
              value={formData.authorMessage}
              onChange={(e) => handleInputChange('authorMessage', e.target.value)}
              placeholder="Message from the author..."
              rows={3}
            />
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
            <button type="button" onClick={handleSave} className="save-btn">
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