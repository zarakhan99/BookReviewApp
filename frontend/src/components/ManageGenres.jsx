import React from 'react';
import CreateGenre from './CreateGenre';
import ViewGenres from './ViewGenres'; 
import "../styles/ManageGenres.css"; 

const ManageGenres = () => {
  return (
    <div className="manage-genres-container">
      <h2 className="manage-genre-header">Manage Genres</h2>
      
      <div className="create-genre-section">
        <CreateGenre /> 
      </div>
      <div className="list-genres-section">
        <ViewGenres /> 
      </div>
    </div>
  );
};

export default ManageGenres;