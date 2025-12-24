import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookAsync } from '../../store/bookSlice';
import '../../assets/Styles/Book/BookDetails.scss';

const BookDetails = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentBook: book, loading, error } = useSelector(state => state.book);

  useEffect(() => {
    if (bookId) {
      dispatch(getBookAsync(bookId));
    }
  }, [dispatch, bookId]);

  if (loading) return <div className="book-details-loading">Loading...</div>;
  if (error) return <div className="book-details-error">Error: {error}</div>;
  if (!book) return <div className="book-details-error">Book not found</div>;

  const coverImage = book.coverImage || book.bookImages?.[0]?.image;

  return (
    <div className="book-details">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      
      <div className="book-details-content">
        <div className="book-details-image">
          <img src={coverImage} alt={book.name} />
        </div>
        
        <div className="book-details-info">
          <h1>{book.name}</h1>
          <p className="author">by {book.authorName}</p>
          <p className="description">{book.description}</p>
          
          <div className="book-meta">
            <div className="meta-item">
              <strong>ISBN:</strong> {book.isbn}
            </div>
            <div className="meta-item">
              <strong>Status:</strong> 
              <span className={`status ${book.status.toLowerCase()}`}>{book.status}</span>
            </div>
            <div className="meta-item">
              <strong>Rating:</strong> ⭐ {book.averageRating} ({book.totalRatings} ratings)
            </div>
            {book.totalPages && (
              <div className="meta-item">
                <strong>Pages:</strong> {book.totalPages}
              </div>
            )}
            <div className="meta-item">
              <strong>Created:</strong> {new Date(book.createdAt).toLocaleDateString()}
            </div>
          </div>

          {book.bookImages?.length > 0 && (
            <div className="book-images">
              <h3>Book Images</h3>
              <div className="images-grid">
                {book.bookImages.map((img) => (
                  <img key={img.id} src={img.image} alt="Book image" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;