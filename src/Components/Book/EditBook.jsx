import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { X, Upload } from 'lucide-react';
import { fetchSubjectsAsync, fetchLanguagesAsync } from '../../store/courseSlice';
import { updateBookAsync, updateBookCoverImageAsync, updateBookImagesAsync, updateBookPdfAsync } from '../../store/bookSlice';
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
    numberOfPages: '',
    coverImage: null,
    bookImages: [],
    pdfFile: null
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { loading: bookLoading } = useSelector(state => state.book);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchSubjectsAsync());
      dispatch(fetchLanguagesAsync());
    }
  }, [dispatch, isOpen]);

  useEffect(() => {
    if (book && isOpen) {
      setFormData({
        title: book.name || '',
        description: book.description || '',
        authorName: book.authorName || '',
        subject: book.subject?.name || book.subject || '',
        language: book.language?.name || book.language || '',
        numberOfPages: book.totalPages || '',
        coverImage: null,
        bookImages: [],
        pdfFile: null
      });
      setCurrentStep(1);
    }
  }, [book, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));
  };

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      alert('Maximum 3 images allowed');
      return;
    }
    setFormData(prev => ({
      ...prev,
      bookImages: files
    }));
  };

  const handleNext = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (currentStep === 1) {
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
        
        const bookData = {
          name: formData.title,
          authorName: formData.authorName,
          description: formData.description,
          totalPages: formData.numberOfPages,
          subjectId: selectedSubject?.id,
          languageId: selectedLanguage?.id
        };

        await dispatch(updateBookAsync({ bookId: book.id, bookData })).unwrap();
        setCurrentStep(2);
      } catch (error) {
        console.error('Error updating book:', error);
        alert('Failed to update book. Please try again.');
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 2) {
      setLoading(true);
      try {
        if (formData.coverImage) {
          await dispatch(updateBookCoverImageAsync({ 
            bookId: book.id, 
            coverImageFile: formData.coverImage 
          })).unwrap();
        }
        
        if (formData.bookImages.length > 0) {
          await dispatch(updateBookImagesAsync({ 
            bookId: book.id, 
            bookImagesFiles: formData.bookImages 
          })).unwrap();
        }
        
        setCurrentStep(3);
      } catch (error) {
        console.error('Error uploading images:', error);
        alert('Failed to upload images. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setLoading(true);
    try {
      if (formData.pdfFile) {
        await dispatch(updateBookPdfAsync({ 
          bookId: book.id, 
          pdfFile: formData.pdfFile 
        })).unwrap();
      }
      
      setFormData({
        title: '',
        description: '',
        authorName: '',
        subject: '',
        language: '',
        numberOfPages: '',
        coverImage: null,
        bookImages: [],
        pdfFile: null
      });
      setCurrentStep(1);
      onClose();
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to upload PDF. Please try again.');
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
      numberOfPages: '',
      coverImage: null,
      bookImages: [],
      pdfFile: null
    });
    setCurrentStep(1);
    onClose();
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map((step) => (
        <React.Fragment key={step}>
          <div className={`step ${currentStep >= step ? 'active' : ''}`}>
            {step}
          </div>
          {step < 3 && <div className="step-line"></div>}
        </React.Fragment>
      ))}
    </div>
  );

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
          {renderStepIndicator()}
          
          {currentStep === 1 && (
            <>
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
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="coverImage">Cover Image (Optional)</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <label htmlFor="coverImage" className="file-label">
                    <Upload size={20} />
                    {formData.coverImage ? formData.coverImage.name : "Choose cover image"}
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bookImages">Book Images (Max 3, Optional)</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="bookImages"
                    name="bookImages"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleFileChange}
                    className="file-input"
                  />
                  <label htmlFor="bookImages" className="file-label">
                    <Upload size={20} />
                    {formData.bookImages.length > 0 ? `${formData.bookImages.length} image(s) selected` : "Choose book images"}
                  </label>
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <div className="form-group">
              <label htmlFor="pdfFile">Upload PDF (Optional)</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="pdfFile"
                  name="pdfFile"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="pdfFile" className="file-label">
                  <Upload size={20} />
                  {formData.pdfFile ? formData.pdfFile.name : "Choose PDF file"}
                </label>
              </div>
            </div>
          )}

           <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            {currentStep < 3 ? (
              <button type="button" className="submit-btn" onClick={handleNext} disabled={loading}>
                {(() => {
                  if (loading) {
                    return currentStep === 1 ? 'Creating...' : 'Uploading...';
                  }
                  return 'Continue';
                })()}
              </button>
            ) : (
              <button type="submit" className="submit-btn" disabled={loading || bookLoading}>
                {loading || bookLoading ? 'Uploading PDF...' : 'Complete'}
              </button>
            )}
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