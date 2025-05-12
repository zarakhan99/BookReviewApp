import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import "../styles/CreateBookGenre.css";

// Component to associate a book with a genre 
const CreateGenre = () => {

  const {  createBookGenre, userRole, error } = useAppContext();
  
  //state var
  const [bookId, setBookId] = useState("");
  const [genreId, setGenreId] = useState("");

  const navigate = useNavigate();

  // Handles form submission
   const handleCreateBookGenreSubmit = async (e) => {  // Add event parameter
    e.preventDefault(); 
    // Only allow Admins to submit
    if (userRole === "Admin") {
       await createBookGenre(bookId, genreId); // creates book genre using book id and genre id
      console.log("BookGenre successfully created!")

      // Clear form inputs
      setBookId("");
      setGenreId("");
    }
    else{
        // navigate non-admin users
        navigate(`/account`);
        return; 
    }
  };

  return (
    <div className="book-genre-wrapper">
      {error && <p className="book-genre-error">{error}</p>}
      <form className="create-book-genre-form" onSubmit={handleCreateBookGenreSubmit}>
        <div className="book-genre-title">
          <h3>Create A New Book Genre</h3>
        </div>
        <div className="book-genre-field-group">
          <label htmlFor="bookid-title">Book Id</label>
          <input 
            type="text" 
            id="title" 
            name="bookid-title" 
            value={bookId} 
            onChange={(event) => setBookId(event.target.value)} 
          />
        </div>
        <div className="book-genre-field-group">
          <label htmlFor="genreid-title">Genre Id</label>
          <input 
            type="text" 
            id="title" 
            name="genreid-title" 
            value={genreId} 
            onChange={(event) => setGenreId(event.target.value)} 
          />
        </div>
        <button type="submit" className= "create-bg-button">Create Book Genre </button>
      </form>
    </div>
  );
};

export default CreateGenre;