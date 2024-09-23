import React from 'react';

const Ratings = ({ ratings }) => {
  return (
    <ul>
      {ratings.map((book) => (
        <li key={book.id}>
          {book.title} - Rated {book.rating}/5
        </li>
      ))}
    </ul>
  );
};

export default Ratings;
