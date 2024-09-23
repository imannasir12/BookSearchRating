import React, { useState } from 'react';
import './RatingsPage.css'; // Create this CSS file for styling

const RatingsPage = ({ bookList = [], onUpdateRating }) => { // Default bookList to an empty array
  const [ratings, setRatings] = useState({}); // To store ratings and reviews

  // Handle rating change
  const handleRatingChange = (bookKey, event) => {
    const newRatings = { ...ratings, [bookKey]: { ...ratings[bookKey], rating: event.target.value } };
    setRatings(newRatings);
  };

  // Handle review change
  const handleReviewChange = (bookKey, event) => {
    const newRatings = { ...ratings, [bookKey]: { ...ratings[bookKey], review: event.target.value } };
    setRatings(newRatings);
  };

  // Handle rating submission
  const handleSubmit = (bookKey) => {
    if (ratings[bookKey]) {
      onUpdateRating(bookKey, ratings[bookKey].rating, ratings[bookKey].review);
    } else {
      console.error(`No rating data for bookKey: ${bookKey}`);
    }
  };

  return (
    <div className="ratings-container">
      <h1 className="ratings-title">Rate Your Books</h1>

      <div className="book-list">
        {bookList.length > 0 ? (
          bookList.map((book) => (
            <div className="book-card" key={book.key}>
              {book.cover_i && (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  className="book-cover"
                />
              )}
              <h2>{book.title}</h2>
              <p>Author(s): {book.author_name?.join(', ')}</p>
              <p>Published: {book.first_publish_year}</p>

              <div className="rating-form">
                <label htmlFor={`rating-${book.key}`}>Rating:</label>
                <select
                  id={`rating-${book.key}`}
                  value={ratings[book.key]?.rating || ''}
                  onChange={(e) => handleRatingChange(book.key, e)}
                >
                  <option value="">Select a rating</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>

                <label htmlFor={`review-${book.key}`}>Review (optional):</label>
                <textarea
                  id={`review-${book.key}`}
                  value={ratings[book.key]?.review || ''}
                  onChange={(e) => handleReviewChange(book.key, e)}
                  rows="4"
                  cols="50"
                ></textarea>

                <button onClick={() => handleSubmit(book.key)}>Submit Rating</button>
              </div>
            </div>
          ))
        ) : (
          <p>No books available to rate.</p>
        )}
      </div>
    </div>
  );
};

export default RatingsPage;

