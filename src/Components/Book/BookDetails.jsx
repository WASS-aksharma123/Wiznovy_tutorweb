import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBook, FaStar, FaLanguage } from 'react-icons/fa';
import { X, Upload } from 'lucide-react';
import { getBookAsync, updateBookCoverImageAsync, updateBookPdfAsync, updateBookImagesAsync } from '../../store/bookSlice';
import '../../assets/Styles/Book/BookDetails.scss';
import defaultBookImage from '../../assets/Images/book 5.jpg';

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentBook: book, loading, error } = useSelector(state => state.book);
  const [activeTab, setActiveTab] = useState('overview');
  const [tabLoading, setTabLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPdfFile, setSelectedPdfFile] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const sidebarRef = useRef(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePdfFileChange = (e) => {
    setSelectedPdfFile(e.target.files[0]);
  };

  const handleImagesChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    setUploading(true);
    try {
      await dispatch(updateBookCoverImageAsync({
        bookId: book.id,
        coverImageFile: selectedFile
      })).unwrap();
      
      dispatch(getBookAsync(bookId));
      setIsModalOpen(false);
      setSelectedFile(null);
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
      
      dispatch(getBookAsync(bookId));
      setIsPdfModalOpen(false);
      setSelectedPdfFile(null);
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Failed to upload PDF. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handlePdfModalClose = () => {
    setIsPdfModalOpen(false);
    setSelectedPdfFile(null);
  };

  const handleImagesModalClose = () => {
    setIsImagesModalOpen(false);
    setSelectedImages([]);
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
      
      dispatch(getBookAsync(bookId));
      setIsImagesModalOpen(false);
      setSelectedImages([]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (bookId) {
      dispatch(getBookAsync(bookId));
    }
  }, [dispatch, bookId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  if (loading) {
    return (
      <div className="bookMain">
        <div className="container">
          <div className="loading-state">Loading book details...</div>
        </div>
      </div>
    );
  }

  if (error) return <div className="book-details-error">Error: {error}</div>;
  if (!book) return <div className="book-details-error">Book not found</div>;

  const coverImage = book.coverImage || book.bookImages?.[0]?.image || defaultBookImage;

  return (
    <div className="bookMain">
      <div className="container">
        <div className="bookScreen">
          <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <div className="user">
              <div className="Bookface">
                <div className="book-card">
                  <div className="image-section">
                    <img src={coverImage} alt={book.name} />
                  </div>

                  <div className="details-section">
                    <h3>{book.name}</h3>
                    <p>
                      By {book.authorName} <span>({book.totalPages || 0} Pages)</span>
                    </p>

                    <div className="book-stats">
                      <div className="stat">
                        <FaBook className="icon" />
                        <span>{book.subject?.name || book.subject || 'General'}</span>
                      </div>
                      <div className="stat">
                        <FaLanguage className="icon" />
                        <span>{book.language?.name || book.language || 'English'}</span>
                      </div>
                      <div className="stat">
                        <FaStar className="icon star" />
                        <span>{book.averageRating || '0.0'} ({book.totalRatings || 0})</span>
                      </div>
                    </div>
                    <button className="back-button ppp" onClick={() => {console.log('Button clicked'); setIsModalOpen(true);}}>Update Cover Image</button>
                  </div>
                </div>
              </div>
              
              <button className="back-button" onClick={() => navigate(-1)}>
              Back to Books
              </button>
            </div>
          </div>
          
          <div className="mainSection">
            <div className="tabs">
              <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
              </button>
              <button
                className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => {
                  if (activeTab !== 'overview') {
                    setTabLoading(true);
                    setTimeout(() => {
                      setActiveTab('overview');
                      setTabLoading(false);
                    }, 300);
                  }
                }}
              >
                <h2>Overview</h2>
              </button>
              <button
                className={`tab ${activeTab === 'images' ? 'active' : ''}`}
                onClick={() => {
                  if (activeTab !== 'images') {
                    setTabLoading(true);
                    setTimeout(() => {
                      setActiveTab('images');
                      setTabLoading(false);
                    }, 300);
                  }
                }}
              >
                <h2>Images</h2>
              </button>
            </div>

            <div className="contentarea">
              {tabLoading ? (
                <div className="tab-loader">
                  <div className="circular-loader"></div>
                </div>
              ) : (
                <>
                  {activeTab === 'overview' && (
                    <div className="overview-section">
                      <div className="book-description">
                        <h3>Description</h3>
                        <p>{book.description}</p>
                      </div>
                      
                      <div className="book-meta">
                        <h3>Book Information</h3>
                        <div className="meta-grid">
                          {book.isbn && (
                            <div className="meta-item">
                              <strong>ISBN:</strong> {book.isbn}
                            </div>
                          )}
                          <div className="meta-item">
                            <strong>Status:</strong>
                            <span className={`status ${book.status?.toLowerCase()}`}>{book.status}</span>
                          </div>
                          <div className="meta-item">
                            <strong>Total Pages:</strong> {book.totalPages || 'N/A'}
                          </div>
                          <div className="meta-item">
                            <strong>Subject:</strong> {book.subject?.name || book.subject || 'General'}
                          </div>
                          <div className="meta-item">
                            <strong>Language:</strong> {book.language?.name || book.language || 'English'}
                          </div>
                          <div className="meta-item">
                            <strong>Created:</strong> {new Date(book.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      {book.pdfFile && (
                        <div className="pdf-section">
                          <div className="updatefield"><h3>PDF Document</h3>
                          <button className='pdfup' onClick={() => setIsPdfModalOpen(true)}>Update Pdf</button></div>
                          <div className="pdf-actions">
                            <a 
                              href={book.pdfFile} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="pdf-btn view-btn"
                            >
                              📄 View PDF
                            </a>
                            <a 
                              href={book.pdfFile} 
                              download={`${book.name}.pdf`}
                              className="pdf-btn download-btn"
                            >
                              ⬇️ Download PDF
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'images' && (
                    <div className="images-section">
                      <button className='imgup' onClick={() => setIsImagesModalOpen(true)}>Update Images</button>
                      {book.bookImages?.length > 0 ? (
                        <div className="images-grid">
                          {book.bookImages.map((img, index) => (
                            <div key={img.id || index} className="image-item">
                              <img src={img.image} alt={`${book.name} ${index + 1}`} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-images">
                          <p>No additional images available for this book.</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cover Image Upload Modal */}
      {console.log('isModalOpen:', isModalOpen)}
      {isModalOpen && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-contenttt" style={{backgroundColor: 'white', padding: '20px', borderRadius: '8px', maxWidth: '500px', width: '90%'}}>
            <div className="modal-header">
              <h3>Update Cover Image</h3>
              <button className="close-btn" onClick={handleModalClose}>
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
                    onChange={handleFileChange}
                    className="file-input"
                  />
                  <label htmlFor="coverImage" className="file-label">
                    <Upload size={20} />
                    {selectedFile ? selectedFile.name : "Choose cover image"}
                  </label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleModalClose}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="submit-btn" 
                  onClick={handleUpload}
                  disabled={uploading || !selectedFile}
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
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
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

export default BookDetails;