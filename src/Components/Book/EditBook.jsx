import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { fetchSubjectsAsync, fetchLanguagesAsync } from '../../store/courseSlice';
import { updateBookAsync } from '../../store/bookSlice';
import '../../assets/Styles/CreateBook.scss';

const EditBook = ({ isOpen, onClose, book }) => {
  const dispatch = useDispatch();
  const { subjects, languages } = useSelector(state => state.course);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    authorName: '',
    subject: '',
    language: '',
    numberOfPages: ''
  });
  const [loading, setLoading] = useState(false);
  const { loading: bookLoading } = useSelector(state => state.book);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchSubjectsAsync());
      dispatch(fetchLanguagesAsync());
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (book && isOpen && subjects.length > 0 && languages.length > 0) {
      console.log('Setting form data with book:', book);
      console.log('Available subjects:', subjects);
      console.log('Available languages:', languages);
      console.log('Book subject:', book.subject);
      console.log('Book language:', book.language);
      
      setFormData({
        title: book.name || '',
        description: book.description || '',
        authorName: book.authorName || '',
        subject: book.subject?.name || book.subject || '',
        language: book.language?.name || book.language || '',
        numberOfPages: book.totalPages || ''
      });
    }
  }, [book, isOpen, subjects, languages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = ['title', 'authorName', 'description', 'subject', 'language', 'numberOfPages'];
    const isValid = requiredFields.every(field => formData[field]?.toString().trim());
    
    if (!isValid) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const selectedSubject = subjects.find(s => s.name === formData.subject);
      const selectedLanguage = languages.find(l => l.name === formData.language);
      
      console.log('Form data before submit:', formData);
      console.log('Available subjects for matching:', subjects);
      console.log('Available languages for matching:', languages);
      console.log('Looking for subject:', formData.subject);
      console.log('Looking for language:', formData.language);
      console.log('Selected subject:', selectedSubject);
      console.log('Selected language:', selectedLanguage);
      
      if (!selectedSubject) {
        alert('Subject not found. Please select a valid subject.');
        setLoading(false);
        return;
      }
      
      if (!selectedLanguage) {
        alert('Language not found. Please select a valid language.');
        setLoading(false);
        return;
      }
      
      const bookData = {
        name: formData.title,
        authorName: formData.authorName,
        description: formData.description,
        totalPages: formData.numberOfPages,
        subjectId: selectedSubject?.id,
        languageId: selectedLanguage?.id
      };

      await dispatch(updateBookAsync({ bookId: book.id, bookData })).unwrap();
      
      setFormData({
        title: '',
        description: '',
        authorName: '',
        subject: '',
        language: '',
        numberOfPages: ''
      });
      onClose();
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Failed to update book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      authorName: '',
      subject: '',
      language: '',
      numberOfPages: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenttt">
        <div className="modal-header">
          <h3>Edit Book</h3>
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
              placeholder="Enter book title (Max 100 characters)"
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="authorName">Author Name</label>
            <input
              type="text"
              id="authorName"
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              placeholder="Enter author name"
              required
              maxLength={60}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter book description (Max 200 characters)"
              rows="4"
              required
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="language">Language</label>
            <select
              id="language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a language</option>
              {languages.map((language) => (
                <option key={language.id} value={language.name}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="numberOfPages">Number of Pages</label>
            <input
              type="number"
              id="numberOfPages"
              name="numberOfPages"
              value={formData.numberOfPages}
              onChange={handleInputChange}
              placeholder="Enter number of pages"
              required
              min="1"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading || bookLoading}>
              {loading || bookLoading ? 'Updating...' : 'Update Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditBook.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  book: PropTypes.object
};

export default EditBook;