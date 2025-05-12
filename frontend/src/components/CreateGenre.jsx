import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import "../styles/CreateGenres.css";

// Component to create a new genre 
const CreateGenre = () => {

  const {  createGenre, userRole, error } = useAppContext();

  //State var
   const [genreName, setGenreName] = useState("");

  const navigate = useNavigate();

  //handles create genre
   const handleCreateGenreSubmit = async (e) => {  // Add event parameter
    e.preventDefault(); 
    if (userRole === "Admin") { 
       await createGenre(genreName); // create genre using genre name
      console.log("Genre successfully created!")
      //Clear field
      setGenreName('');
    }
    else{ // Navigate non admin users
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







   
