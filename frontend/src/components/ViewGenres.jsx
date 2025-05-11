import { useState, useEffect } from 'react';
import { useAppContext } from "../context/AppContext";
import "../styles/ViewGenres.css";

const ViewGenres = () => {

     const { genres, deleteGenre } = useAppContext();

     const [errorMessage, setErrorMessage] = useState('');

     const handleGenreDelete = async (genreId) => {
        {
            try 
            {
                await deleteGenre(genreId);
                console.log("Genre deleted successfully!");
            } 
            catch (err) {
                setErrorMessage(err.message || "Failed to delete genre");
            } 
        }
    };

    return(
        <div className= "allgenres-wrapper">

            <div className="genres-header">
                <h4>Id</h4>
                <h4>Genre Name</h4>
                <h4>Action</h4>
            </div>
            <hr></hr>

                {/* Books List */}
      <div className="genre-list">
        {genres.map(genre => (
          <div key={genre.genreId} className="genre-row">
            <div className="genre-cell">{genre.genreId}</div>
            <div className="genre-cell">{genre.genreName}</div>
            <div className="genre-cell">
              <button className= "delete-genre-btn" onClick={() => handleGenreDelete(genre.genreId)} >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default ViewGenres;