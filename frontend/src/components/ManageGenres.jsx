import React from 'react';
import CreateGenre from './CreateGenre'; // Path to your CreateGenre component
import "../styles/ManageGenres.css"; // Optional styling

const ManageGenres = () => {
  return (
    <div className="manage-genres-container">
      <h2>Manage Genres</h2>
      
      {/* Section for creating new genres */}
      <div className="create-genre-section">
        <CreateGenre /> {/* This renders your form */}
      </div>

      {/* Optional: Add a list/edit/delete genres section here later */}
    </div>
  );
};

export default ManageGenres;