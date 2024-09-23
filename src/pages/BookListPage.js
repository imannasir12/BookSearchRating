import React from 'react';
import './BookListPage.css';

const BookListPage = ({ bookList, onRemoveBook }) => {
  return (
    <div className="booklist-container">
      <h1 className="booklist-title">My Book List</h1>

      <div className="book-list">
        {bookList.map((book) => (
          <div className="book-card" key={book.key}>
            {book.cover_i && (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="book-cover"
              />
            )}
            <h2 className="book-title">{book.title}</h2>
            <p className="book-author">Author(s): {book.author_name?.join(', ')}</p>
            <p className="book-published">Published: {book.first_publish_year}</p>
            <button className="remove-button" onClick={() => onRemoveBook(book.key)}>Remove from Book List</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookListPage;
