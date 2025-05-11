import { useState, useEffect } from 'react';
import { useAppContext } from "../context/AppContext";

const ViewGenres = () => {

     const { genres, fetchGenres,  } = useAppContext();

     const [errorMessage, setErrorMessage] = useState('');

     const handleDelete = async (genreId) => {
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
          <div key={genres.genreId} className="genre-row">
            <div className="genre-cell">{genre.genreId}</div>
            <div className="genre-cell">{genre.genreName}</div>
            <div className="genre-cell">
              <button onClick={() => handleDelete(genre.genreId)} className ="delete-genre-button">
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