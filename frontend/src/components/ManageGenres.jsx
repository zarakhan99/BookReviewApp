import React from 'react';
import CreateGenre from './CreateGenre';
import ViewGenres from './ViewGenres'; // Path to your CreateGenre component
import "../styles/ManageGenres.css"; // Optional styling

const ManageGenres = () => {
  return (
    <div className="manage-genres-container">
      <h2 className="manage-genre-header">Manage Genres</h2>
      
      {/* Section for creating new genres */}
      <div className="create-genre-section">
        <CreateGenre /> {/* This renders your form */}
      </div>
      <div className="list-genres-section">
        <ViewGenres /> {/* This renders your form */}
      </div>
    </div>
  );
};

export default ManageGenres;