import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, Upload } from 'lucide-react';
import { fetchSubjectsAsync, fetchLanguagesAsync } from '../../store/courseSlice';
import { createBookBasicAsync, updateBookCoverImageAsync, updateBookImagesAsync, updateBookPdfAsync, updateBookAsync } from '../../store/bookSlice';
import '../../assets/Styles/CreateBook.scss';

const CreateBook = ({ isOpen, onClose, editMode = false, bookData = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjects, languages } = useSelector(state => state.course);
  const { loading: bookLoading } = useSelector(state => state.book);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    authorName: '',
    subject: '',
    language: '',
    // isbnNumber: '',
    numberOfPages: '',
    coverImage: null,
    bookImages: [],
    pdfFile: null
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [createdBookId, setCreatedBookId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      [name]: file
    }));
    
    // Clear validation error when user selects a file
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleMultipleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      setValidationErrors(prev => ({ ...prev, bookImages: 'Maximum 3 images allowed' }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      bookImages: files
    }));
    
    // Clear validation error when user selects files
    if (validationErrors.bookImages) {
      setValidationErrors(prev => ({ ...prev, bookImages: '' }));
    }
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchSubjectsAsync());
      dispatch(fetchLanguagesAsync());
      
      // Populate form data if in edit mode
      if (editMode && bookData) {
        setFormData({
          title: bookData.name || '',
          description: bookData.description || '',
          authorName: bookData.authorName || '',
          subject: bookData.subject?.name || '',
          language: bookData.language?.name || '',
          numberOfPages: bookData.totalPages || '',
          coverImage: null,
          bookImages: [],
          pdfFile: null
        });
        setCreatedBookId(bookData.id);
      } else {
        // Reset form for create mode
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
        setCreatedBookId(null);
        setCurrentStep(1);
      }
    }
  }, [dispatch, isOpen, editMode, bookData]);

  const handleNext = async () => {
    if (currentStep === 1) {
      // Validate step 1 fields individually
      const errors = {};
      
      if (!formData.title?.trim()) {
        errors.title = 'Please enter the book title';
      }
      if (!formData.authorName?.trim()) {
        errors.authorName = 'Please enter the author name';
      }
      if (!formData.description?.trim()) {
        errors.description = 'Please enter the book description';
      }
      if (!formData.subject) {
        errors.subject = 'Please select a subject';
      }
      if (!formData.language) {
        errors.language = 'Please select a language';
      }
      if (!formData.numberOfPages || formData.numberOfPages <= 0) {
        errors.numberOfPages = 'Please enter a valid number of pages';
      }
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      setLoading(true);
      try {
        const selectedSubject = subjects.find(s => s.name === formData.subject);
        const selectedLanguage = languages.find(l => l.name === formData.language);
        
        const bookBasicData = {
          name: formData.title,
          authorName: formData.authorName,
          description: formData.description,
          totalPages: formData.numberOfPages,
          subjectId: selectedSubject?.id,
          languageId: selectedLanguage?.id
        };

        if (editMode) {
          // Update existing book
          await dispatch(updateBookAsync({ bookId: createdBookId, bookData: bookBasicData })).unwrap();
        } else {
          // Create new book
          const result = await dispatch(createBookBasicAsync(bookBasicData)).unwrap();
          setCreatedBookId(result.id);
        }
        setValidationErrors({});
        setCurrentStep(2);
      } catch (error) {
        console.error('Error saving book:', error);
        setValidationErrors(prev => ({ ...prev, general: 'Failed to save book. Please try again.' }));
      } finally {
        setLoading(false);
      }
    } else if (currentStep === 2) {
      // Validate step 2 fields individually
      const errors = {};
      
      if (!formData.coverImage) {
        errors.coverImage = 'Please select a cover image';
      }
      if (!formData.bookImages || formData.bookImages.length === 0) {
        errors.bookImages = 'Please select at least one book image';
      }
      
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        return;
      }

      setLoading(true);
      try {
        // Upload cover image and book images
        await dispatch(updateBookCoverImageAsync({ 
          bookId: createdBookId, 
          coverImageFile: formData.coverImage 
        })).unwrap();
        
        await dispatch(updateBookImagesAsync({ 
          bookId: createdBookId, 
          bookImagesFiles: formData.bookImages 
        })).unwrap();
        
        setValidationErrors({});
        setCurrentStep(3);
      } catch (error) {
        console.error('Error uploading images:', error);
        setValidationErrors(prev => ({ ...prev, general: 'Failed to upload images. Please try again.' }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate step 3 individually
    const errors = {};
    
    if (!formData.pdfFile) {
      errors.pdfFile = 'Please select a PDF file';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setLoading(true);

    try {
      // Upload PDF file
      await dispatch(updateBookPdfAsync({ 
        bookId: createdBookId, 
        pdfFile: formData.pdfFile 
      })).unwrap();
      
      // Reset form and close modal
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
      setCreatedBookId(null);
      setCurrentStep(1);
      setValidationErrors({});
      onClose();
      
      // Redirect to my-books page
      navigate('/my-books');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      setValidationErrors({ pdfFile: 'Failed to upload PDF. Please try again.' });
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
    setCreatedBookId(null);
    setCurrentStep(1);
    setValidationErrors({});
    onClose();
  };

  const renderStepIndicator = () => {
    return (
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
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contenttt">
        <div className="modal-header">
          <h3>{editMode ? 'Edit Book' : 'Create New Book'}</h3>
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
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, title: 'Please enter the book title' }));
                  }}
                />
                {validationErrors.title && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {validationErrors.title}
                  </div>
                )}
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
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, authorName: 'Please enter the author name' }));
                  }}
                />
                {validationErrors.authorName && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {validationErrors.authorName}
                  </div>
                )}
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
                  maxLength={300}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, description: 'Please enter the book description' }));
                  }}
                />
                {validationErrors.description && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {validationErrors.description}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, subject: 'Please select a subject' }));
                  }}
                >
                  <option value="">Select a subject</option>
                  {subjects.map((subject) => (
                    <option key={subject.id} value={subject.name}>
                      {subject.name}
                    </option>
                  ))}
                </select>
                {validationErrors.subject && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {validationErrors.subject}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="language">Language</label>
                <select
                  id="language"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  required
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, language: 'Please select a language' }));
                  }}
                >
                  <option value="">Select a language</option>
                  {languages.map((language) => (
                    <option key={language.id} value={language.name}>
                      {language.name}
                    </option>
                  ))}
                </select>
                {validationErrors.language && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {validationErrors.language}
                  </div>
                )}
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
                  max="99999"
                  onInput={(e) => {
                    if (e.target.value.length > 5) {
                      e.target.value = e.target.value.slice(0, 5);
                    }
                  }}
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, numberOfPages: 'Please enter the number of pages' }));
                  }}
                />
                {validationErrors.numberOfPages && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {validationErrors.numberOfPages}
                  </div>
                )}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="coverImage">Cover Image</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input"
                    required
                    onInvalid={(e) => {
                      e.preventDefault();
                      setValidationErrors(prev => ({ ...prev, coverImage: 'Please select a cover image' }));
                    }}
                  />
                  <label htmlFor="coverImage" className="file-label">
                    <Upload size={20} />
                    {formData.coverImage ? formData.coverImage.name : "Choose cover image"}
                  </label>
                </div>
                {validationErrors.coverImage && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {validationErrors.coverImage}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="bookImages">Book Images (Max 3)</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="bookImages"
                    name="bookImages"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleFileChange}
                    className="file-input"
                    required
                    onInvalid={(e) => {
                      e.preventDefault();
                      setValidationErrors(prev => ({ ...prev, bookImages: 'Please select at least one book image' }));
                    }}
                  />
                  <label htmlFor="bookImages" className="file-label">
                    <Upload size={20} />
                    {formData.bookImages.length > 0 ? `${formData.bookImages.length} image(s) selected` : "Choose book images"}
                  </label>
                </div>
                {validationErrors.bookImages && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                    {validationErrors.bookImages}
                  </div>
                )}
              </div>
            </>
          )}

          {currentStep === 3 && (
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
                  onInvalid={(e) => {
                    e.preventDefault();
                    setValidationErrors(prev => ({ ...prev, pdfFile: 'Please select a PDF file' }));
                  }}
                />
                <label htmlFor="pdfFile" className="file-label">
                  <Upload size={20} />
                  {formData.pdfFile ? formData.pdfFile.name : "Choose PDF file"}
                </label>
              </div>
              {validationErrors.pdfFile && (
                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                  {validationErrors.pdfFile}
                </div>
              )}
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

CreateBook.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  bookData: PropTypes.object
};

export default CreateBook;