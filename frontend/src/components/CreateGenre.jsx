import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import "../styles/CreateGenres.css";


const CreateGenre = () => {

  const {  createGenre, userRole, error } = useAppContext();

   const [genreName, setGenreName] = useState("");

  const navigate = useNavigate();

   const handleCreateGenreSubmit = async (e) => {  // Add event parameter
    e.preventDefault(); 
    if (userRole === "Admin") {
       await createGenre(genreName);
      console.log("Genre successfully created!")
      setGenreName('');
    }
    else{
        navigate(`/account`);
        return; 
    }
  };

  return (
    <div className="genre-wrapper">
      {error && <p className="error">{error}</p>}
      <form className="create-genre-form" onSubmit={handleCreateGenreSubmit}>
        <div className="form-title">
          <h3>Create A New Genre</h3>
        </div>
        <div className="genre-field-group">
          <label htmlFor="genre-title">Genre Name</label>
          <input 
            type="text" 
            id="title" 
            name="genre-title" 
            value={genreName} 
            onChange={(event) => setGenreName(event.target.value)} 
          />
        </div>
        <button type="create-genre">Create Genre </button>
      </form>
    </div>
  );
};

export default CreateGenre;







   
