import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { getBookAsync } from "../../store/bookSlice";
import CreateBook from "../Book/CreateBook";
import EditBook from "../Book/EditBook";
import "../../assets/Styles/Book/Bookcard.scss";
import defaultBookImage from "../../assets/Images/book 5.jpg";

const BookCard = ({ bookId, book: bookProp, showAddButton = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentBook, loading } = useSelector((state) => state.book);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const book = bookProp || currentBook;

  useEffect(() => {
    if (bookId && !bookProp) {
      dispatch(getBookAsync(bookId));
    }
  }, [dispatch, bookId, bookProp]);

  const handleDetailsClick = () => {
    navigate(`/book-details/${book.id}`);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleAddClick = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleCreateClose = () => {
    setIsCreateModalOpen(false);
  };

  if (loading) return <div className="book-card">Loading...</div>;
  if (!book) return <div className="book-card">Book not found</div>;

  const coverImage = book.coverImage || (book.bookImages?.[0]?.image) || defaultBookImage;

  return (
    <div className="book-card">
      {/* Left side with image and buttons */}
      <div className="book-left">
        <div className="book-cover">
          <img src={coverImage} alt={book.name} />
        </div>
        <div className="book-actions">
          <button className="details-btn" onClick={handleDetailsClick}>Details</button>
          <button className="editt-btn" onClick={handleEditClick}>Edit</button>
          {showAddButton && <button className="add-btn" onClick={handleAddClick}>Add New Book</button>}
        </div>
      </div>

      {/* Right side with content */}
      <div className="book-content">
        <h3 className="book-title">{book.name}</h3>
        <p className="book-author">by {book.authorName}</p>

        <p className="book-description">{book.description}</p>

        <div className="book-meta">
          <span>
            ⭐ {book.averageRating} ({book.totalRatings} reviews)
          </span>
          {book.subject && <span>Subject:{book.subject.name || book.subject}</span>}
          {book.language && <span>Language:{book.language.name || book.language}</span>}
          {book.totalPages && <span>Total pages:{book.totalPages} pages</span>}
          {book.status && <span className={`status-${book.status.toLowerCase()}`}>Status:{book.status}</span>}
        </div>
      </div>
      
      {createPortal(
        <EditBook 
          isOpen={isEditModalOpen} 
          onClose={handleEditClose} 
          book={book}
        />,
        document.body
      )}
      
      {createPortal(
        <CreateBook 
          isOpen={isCreateModalOpen} 
          onClose={handleCreateClose}
        />,
        document.body
      )}
    </div>
  );
};

BookCard.propTypes = {
  bookId: PropTypes.string,
  book: PropTypes.object,
  showAddButton: PropTypes.bool
};

export default BookCard;
