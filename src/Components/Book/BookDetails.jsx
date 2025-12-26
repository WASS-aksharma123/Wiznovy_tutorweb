import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaClock, FaBook, FaStar, FaLanguage } from 'react-icons/fa';
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
  const sidebarRef = useRef(null);

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
                  </div>
                </div>
              </div>
              
              <button className="back-button" onClick={() => navigate(-1)}>
                ← Back to Books
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
                      {book.bookImages?.length > 0 ? (
                        <div className="images-grid">
                          {book.bookImages.map((img, index) => (
                            <div key={img.id || index} className="image-item">
                              <img src={img.image} alt={`Book image ${index + 1}`} />
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
    </div>
  );
};

export default BookDetails;