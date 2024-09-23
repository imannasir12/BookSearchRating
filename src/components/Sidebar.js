import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="navbar">
      <Link to="/explore">Explore</Link>
      <Link to="/booklist">Book List</Link>
      <Link to="/ratings">Ratings</Link>
    </div>
  );
};

export default Sidebar;
