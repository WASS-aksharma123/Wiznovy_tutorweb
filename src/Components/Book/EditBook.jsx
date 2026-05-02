import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { X, Upload } from 'lucide-react';
import { fetchSubjectsAsync, fetchLanguagesAsync } from '../../store/courseSlice';
import { updateBookAsync, updateBookCoverImageAsync, updateBookPdfAsync, updateBookImagesAsync, getBookAsync } from '../../store/bookSlice';
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
  
  // File upload states
  const [isCoverImageModalOpen, setIsCoverImageModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [selectedCoverImage, setSelectedCoverImage] = useState(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

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

  // File upload handlers
  const handleCoverImageChange = (e) => {
    setSelectedCoverImage(e.target.files[0]);
  };

  const handlePdfFileChange = (e) => {
    setSelectedPdfFile(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  const handleCoverImageUpload = async () => {
    if (!selectedCoverImage) {
      alert('Please select a cover image');
      return;
    }

    setUploading(true);
    try {
      await dispatch(updateBookCoverImageAsync({
        bookId: book.id,
        coverImageFile: selectedCoverImage
      })).unwrap();
      
      dispatch(getBookAsync(book.id));
      setIsCoverImageModalOpen(false);
      setSelectedCoverImage(null);
      alert('Cover image updated successfully!');
    } catch (error) {
      console.error('Error uploading cover image:', error);
      alert('Failed to upload cover image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handlePdfUpload = async () => {
    if (!selectedPdfFile) {
      alert('Please select a PDF file');
      return;
    }

    setUploading(true);
    try {
      await dispatch(updateBookPdfAsync({
        bookId: book.id,
        pdfFile: selectedPdfFile
      })).unwrap();
      
      dispatch(getBookAsync(book.id));
      setIsPdfModalOpen(false);
      setSelectedPdfFile(null);
      alert('PDF updated successfully!');
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to upload PDF. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleImagesUpload = async () => {
    if (selectedImages.length === 0) {
      alert('Please select at least one image');
      return;
    }

    setUploading(true);
    try {
      await dispatch(updateBookImagesAsync({
        bookId: book.id,
        bookImagesFiles: selectedImages
      })).unwrap();
      
      dispatch(getBookAsync(book.id));
      setIsImagesModalOpen(false);
      setSelectedImages([]);
      alert('Images updated successfully!');
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Modal close handlers
  const handleCoverImageModalClose = () => {
    setIsCoverImageModalOpen(false);
    setSelectedCoverImage(null);
  };

  const handlePdfModalClose = () => {
    setIsPdfModalOpen(false);
    setSelectedPdfFile(null);
  };

  const handleImagesModalClose = () => {
    setIsImagesModalOpen(false);
    setSelectedImages([]);
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
              max="99999"
              onInput={(e) => {
                if (e.target.value.length > 5) {
                  e.target.value = e.target.value.slice(0, 5);
                }
              }}
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
          
          {/* File Upload Buttons */}
          <div className="file-upload-section">
            <h4>Update Book Files</h4>
            <div className="upload-buttons">
              <button 
                type="button" 
                className="upload-btn cover-btn" 
                onClick={() => setIsCoverImageModalOpen(true)}
              >
                Update Cover Image
              </button>
              <button 
                type="button" 
                className="upload-btn pdf-btn" 
                onClick={() => setIsPdfModalOpen(true)}
              >
                Update PDF
              </button>
              <button 
                type="button" 
                className="upload-btn images-btn" 
                onClick={() => setIsImagesModalOpen(true)}
              >
                Update Images
              </button>
            </div>
          </div>
        </form>
      </div>
      
      {/* Cover Image Upload Modal */}
      {isCoverImageModalOpen && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-contenttt" style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '500px', width: '90%'}}>
            <div className="modal-header">
              <h3>Update Cover Image</h3>
              <button className="close-btn" onClick={handleCoverImageModalClose}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="coverImage">Select Cover Image</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="coverImage"
                    accept="image/*"
                    onChange={handleCoverImageChange}
                    className="file-input"
                  />
                  <label htmlFor="coverImage" className="file-label">
                    <Upload size={20} />
                    {selectedCoverImage ? selectedCoverImage.name : "Choose cover image"}
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCoverImageModalClose}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="submit-btn" 
                  onClick={handleCoverImageUpload}
                  disabled={uploading || !selectedCoverImage}
                >
                  {uploading ? 'Uploading...' : 'Update Cover Image'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDF Upload Modal */}
      {isPdfModalOpen && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-contenttt" style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '500px', width: '90%'}}>
            <div className="modal-header">
              <h3>Update PDF</h3>
              <button className="close-btn" onClick={handlePdfModalClose}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="pdfFile">Select PDF File</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="pdfFile"
                    accept=".pdf"
                    onChange={handlePdfFileChange}
                    className="file-input"
                  />
                  <label htmlFor="pdfFile" className="file-label">
                    <Upload size={20} />
                    {selectedPdfFile ? selectedPdfFile.name : "Choose PDF file"}
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handlePdfModalClose}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="submit-btn" 
                  onClick={handlePdfUpload}
                  disabled={uploading || !selectedPdfFile}
                >
                  {uploading ? 'Uploading...' : 'Update PDF'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Images Upload Modal */}
      {isImagesModalOpen && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-contenttt" style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '500px', width: '90%'}}>
            <div className="modal-header">
              <h3>Update Book Images</h3>
              <button className="close-btn" onClick={handleImagesModalClose}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-form">
              <div className="form-group">
                <label htmlFor="bookImages">Select Images (Multiple)</label>
                <div className="file-upload">
                  <input
                    type="file"
                    id="bookImages"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="file-input"
                  />
                  <label htmlFor="bookImages" className="file-label">
                    <Upload size={20} />
                    {selectedImages.length > 0 ? `${selectedImages.length} image(s) selected` : "Choose images"}
                  </label>
                </div>
                {selectedImages.length > 0 && (
                  <div className="selected-files">
                    {selectedImages.map((file, index) => (
                      <div key={`${file.name}-${file.size}-${file.lastModified}`} className="file-item">
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleImagesModalClose}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="submit-btn" 
                  onClick={handleImagesUpload}
                  disabled={uploading || selectedImages.length === 0}
                >
                  {uploading ? 'Uploading...' : 'Update Images'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

EditBook.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  book: PropTypes.object
};

export default EditBook;