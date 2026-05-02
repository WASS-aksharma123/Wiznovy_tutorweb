import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTutorBooksAsync } from '../../store/bookSlice';
import BookCard from './BookCard';
import '../../assets/Styles/Book/MyBooks.scss';
import { SlExclamation } from "react-icons/sl";


const MyBooks = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector(state => state.book);

  useEffect(() => {
    dispatch(getTutorBooksAsync());
  }, [dispatch]);

  if (loading) return <div className="my-books-loading">Loading books...</div>;
  if (error) return <div className="my-books-error">Error: {error}</div>;

  return (
    <div className="my-books">
      <h2 className="my-books-title">My Books</h2>
      <div className="books-grid">
        {books?.map((book) => (
          <BookCard key={book.id} bookId={book.id} book={book} />
        ))}
      </div>
      {books?.length === 0 && (
        <div className="no-sessions">
          <SlExclamation size={50} />
          No books found. Create your first book!
        </div>
      )}
    </div>
  );
};

export default MyBooks;
