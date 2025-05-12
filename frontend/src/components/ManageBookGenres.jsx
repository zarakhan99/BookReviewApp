import React from 'react';
import CreateBookGenre from './CreateBookGenre';
import "../styles/ManageBookGenres.css"; 
import ViewBookGenres from './ViewBookGenres';

const ManageBookGenres = () => {
  return (
    <div className="manage-book-genres-container">
      <h2 className="manage-book-genre-header">Manage Book Genres</h2>

      <div className="create-book-genre-section">
        <CreateBookGenre /> 
      </div>
      <div className="list-book-genre-section">
        <ViewBookGenres />
      </div>
    </div>
  );
};

export default ManageBookGenres;