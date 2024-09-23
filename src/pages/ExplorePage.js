import React, { useState, useCallback, useEffect } from 'react';
import { searchBooks } from './bookService'; // Ensure this function is available
import './ExplorePage.css';
import searchIcon from './magnifying-glass.png'; // Adjust if it's in a subfolder within src
import booklistImage from '../pages/booklist.webp'; // Adjust the path if needed
import blackstarImage from '../pages/blackstar.png'; // Adjust the path if needed
import soundIconImage from '../pages/sound.webp'; // Path to your sound icon image
import defaultBooks from './defaultBooks'; // Import defaultBooks

const ExplorePage = ({ onAddBook, bookList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState(defaultBooks); // Start with defaultBooks
  const [loading, setLoading] = useState(false);
  const [searchInitiated, setSearchInitiated] = useState(false); // Track if search was initiated

  const handleSearch = useCallback(async () => {
    if (!searchTerm) return; // Only perform search if there's a search term

    setLoading(true);
    setSearchInitiated(true); // Set searchInitiated to true when search is clicked
    try {
      const results = await searchBooks(searchTerm);
      if (!results) {
        throw new Error('No results found');
      }
      setBooks(results); // Set search results
    } catch (error) {
      console.error('Error searching books:', error.message);
      setBooks([]); // If an error occurs, show no results
    }
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    // Clear books and reset searchInitiated if the searchTerm is empty
    if (!searchTerm && searchInitiated) {
      setBooks(defaultBooks); // Reset to defaultBooks when searchTerm is cleared
      setSearchInitiated(false);
    }
  }, [searchTerm, searchInitiated]);

  const handleAddBook = (book) => {
    // Check if the book is already in the bookList
    const isBookInList = bookList.some((b) => b.key === book.key);
    if (!isBookInList) {
      onAddBook(book);
    } else {
      alert('This book is already in your book list.');
    }
  };

  const handleImageClick = (book) => {
    handleAddBook(book);
  };

  const handleBlackstarClick = () => {
    // Placeholder for now; nothing happens on click
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  const handleSpeak = (title, authors) => {
    const speech = new SpeechSynthesisUtterance();
    
    // Construct the text to speak
    let text = `The title of the book is ${title}.`;
    if (authors && authors.length > 0) {
      text += ` It is written by ${authors.join(', ')}.`;
    }

    speech.text = text;
    speech.lang = 'en-US'; // Set the language (you can adjust if needed)
    speech.pitch = 1;      // Set pitch
    speech.rate = 1;       // Set rate (speed)

    // Speak the text
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore Books</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon} // Replace with your actual icon path
          alt="Search"
          className="search-icon"
          onClick={handleSearchClick}
        />
      </div>

      <div className="book-list">
        {books.length === 0 && !loading ? (
          <p>No results found.</p>
        ) : (
          <>
            {books.slice(0, 24).map((book) => (
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
                {book.subjects && (
                  <p className="book-genre">Genre(s): {book.subjects.join(', ')}</p>
                )}
                <div className="action-icons">
                  <img
                    src={booklistImage}
                    alt="Add to Book List"
                    className="add-to-booklist"
                    onClick={() => handleImageClick(book)}
                  />
                  <img
                    src={blackstarImage}
                    alt="Black Star"
                    className="blackstar-icon"
                    onClick={handleBlackstarClick}
                  />
                  <img
                    src={soundIconImage}
                    alt="Sound Icon"
                    className="sound-icon"
                    onClick={() => handleSpeak(book.title, book.author_name)}
                  />
                </div>
              </div>
            ))}
            {loading && <p>Loading...</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
