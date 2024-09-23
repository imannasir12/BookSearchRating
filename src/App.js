import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import ExplorePage from './pages/ExplorePage';
import BookListPage from './pages/BookListPage';
import RatingsPage from './pages/RatingsPage';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem('bookList')) || [];
    setBookList(savedList);
  }, []);

  useEffect(() => {
    localStorage.setItem('bookList', JSON.stringify(bookList));
  }, [bookList]);

  const addBookToList = (book) => {
    setBookList((prevList) => [...prevList, book]);
  };

  const removeBookFromList = (key) => {
    setBookList((prevList) => prevList.filter((book) => book.key !== key));
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/explore" />} /> {/* Redirect '/' to '/explore' */}
            <Route path="/explore" element={<ExplorePage onAddBook={addBookToList} bookList={bookList} />} />
            <Route path="/booklist" element={<BookListPage bookList={bookList} onRemoveBook={removeBookFromList} />} />
            <Route path="/ratings" element={<RatingsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
