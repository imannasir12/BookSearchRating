import React from 'react';

const BookList = ({ books }) => {
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          {book.title} - Read on {book.readOn}
        </li>
      ))}
    </ul>
  );
};

export default BookList;
