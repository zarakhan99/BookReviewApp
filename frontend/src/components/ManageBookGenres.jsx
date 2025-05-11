import React from 'react';
import CreateBookGenre from './CreateBookGenre';
import "../styles/ManageGenres.css"; // Optional styling

const ManageBookGenres = () => {
  return (
    <div className="manage-book-genres-container">
      <h2 className="manage-book-genre-header">Manage Book Genres</h2>
      
      {/* Section for creating new genres */}
      <div className="create-book-genre-section">
        <CreateBookGenre /> {/* This renders your form */}
      </div>
    </div>
  );
};

export default ManageBookGenres;