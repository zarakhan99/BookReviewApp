import { useState, useEffect } from 'react';
import { useAppContext } from "../context/AppContext";
import "../styles/ViewBookGenres.css";

// Component for viewing and deleting BookGenre associations
const ViewBookGenres = () => {

     const { bookGenres, fetchBookGenres, deleteBookGenre } = useAppContext();

     const [errorMessage, setErrorMessage] = useState('');
     
     useEffect(() => { // Fetches book genres on mount
      fetchBookGenres();
    }, []);

    //Handles book genre deletion
     const handleBookGenreDelete = async (bookGenreId) => {
        {
            try 
            {
                await deleteBookGenre(bookGenreId); // Deletes book genre using genre id
                console.log("BookGenre deleted successfully!");
                await fetchBookGenres(); // Refetches book genres to update list
            } 
            catch (err) {
                setErrorMessage(err.message || "Failed to delete book genre");
            } 
        }
    };

     return (
    <div className="book-genres-wrapper">
      <div className="book-genres-header">
        <h4>Id</h4>
        <h4>Book Id</h4>
        <h4>Genre Id</h4>
        <h4>Action</h4>
      </div>
      <hr />

      <div className="book-genre-list">
        {bookGenres.map(bookGenre => (
          <div key={bookGenre.bookGenreId} className="book-genre-row">
            <div className="book-genre-cell">{bookGenre.bookGenreId}</div>
            <div className="book-genre-cell">{bookGenre.bookId}</div>
            <div className="book-genre-cell">{bookGenre.genreId}</div>
            <div className="book-genre-cell">
              <button 
                className="delete-book-genre-btn" 
                onClick={() => handleBookGenreDelete(bookGenre.bookGenreId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {errorMessage && <div className="book-genre-error-message">{errorMessage}</div>}
    </div>
  );
};

export default ViewBookGenres;