import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaBook, FaStar, FaLanguage } from 'react-icons/fa';
import { X } from 'lucide-react';
import { getBookAsync } from '../../store/bookSlice';
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
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleDownloadPdf = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(book.pdfFile);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${book.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
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
                    {/* Removed Update Cover Image button - now in EditBook.jsx */}
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
                          <h3>PDF Document</h3>
                          <div className="pdf-actions">
                            <button 
                              onClick={() => setIsPdfViewerOpen(true)}
                              className="pdf-btn view-btn"
                            >
                              📄 View PDF
                            </button>
                            <button 
                              onClick={handleDownloadPdf}
                              className="pdf-btn download-btn"
                            >
                              ⬇️ Download PDF
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'images' && (
                    <div className="images-section">
                      {/* Removed Update Images button - now in EditBook.jsx */}
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
      
      {/* PDF Viewer Modal */}
      {isPdfViewerOpen && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{width: '90%', height: '90%', backgroundColor: 'white', borderRadius: '8px', overflow: 'hidden', position: 'relative'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #ddd'}}>
              <h3 style={{margin: 0}}>{book.name}</h3>
              <button 
                onClick={() => setIsPdfViewerOpen(false)}
                style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px'}}
              >
                <X size={24} />
              </button>
            </div>
            <iframe 
              src={book.pdfFile}
              style={{width: '100%', height: 'calc(100% - 60px)', border: 'none'}}
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetails;