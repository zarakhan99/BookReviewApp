import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import "../styles/Createbook.css";

const CreateBook = () => {
    
    const { createBook, assignBookToGenre, genres } = useAppContext();
    
    // state var for book creation
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");
    const [bookDescription, setBookDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(""); // array for multiple genre selection
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleCreateBookClick = async (e) => {
    e.preventDefault();

    setErrorMessage(""); // Clear previous errors

    if (title && author && publishYear && bookDescription && imageUrl && selectedGenre) {
    
        try{
        
        const newBook = await createBook (
            title, 
            author, 
            Number(publishYear), 
            bookDescription, 
            imageUrl
        );
        
        if (newBook) {
            console.log("Book Created Successfully!");
            console.log(newBook);
            
            const assignedGenres = await assignBookToGenre(newBook.bookId, selectedGenre);

            console.log("Genre assignment response:", assignedGenres); 

            if (assignedGenres) 
                {

                setTitle("")
                setAuthor("")
                setPublishYear("")
                setBookDescription("")
                setImageUrl("");
                setSelectedGenre("");

                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setErrorMessage("Genre assignment failed!");  // Moved inside this block
            }
        }
        } catch (err) {
      setErrorMessage(err.response?.data || "Book creation failed");
    }
    } else {
        setErrorMessage("*** Missing Fields: All fields must be filled to create a book ***");
    }
};

    return (
        <div className = "form-wrapper">
            <form className = "create-book-form" onSubmit={handleCreateBookClick}>
            <div className="form-title">
                <h3>Create A New Book</h3>
            </div>
            <div className="field-group">
            <label htmlFor="title"> Title</label>
            <input type="text" id="title" name="book-title" value={title} onChange={(event) => setTitle(event.target.value)} >
            </input>
            </div>
            <div className="field-group">
            <label htmlFor="imageUrl"> Image Url</label>
            <input type="text" id="imageUrl" name="book-image" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} >
            </input>
            </div>
            <div className="field-group">
            <label htmlFor="author"> Author</label>
            <input type="text" id="author" name="book-author" value={author} onChange={(event) => setAuthor(event.target.value)} >
            </input>
            </div>
            <div className="field-group">
            <label htmlFor="publishYear"> Publish Year</label>
            <input type="text" id="publishYear" name="book-publish-year" value={publishYear} onChange={(event) => setPublishYear(event.target.value)} >
            </input>
            </div>
            <div className="field-group">
            <label htmlFor="selectedGenres">Select Genres</label>
            <select // create a dropdown
                className ="genre-select"
                name="genres" //genre names
                value={selectedGenre} // bind chosen genred to selected genres
                size={6}
                onChange={(e) => setSelectedGenre(Number(e.target.value))}
            >
                {genres.map(genre => ( // loops over selected options and gets the genre ids
                    <option key={genre.genreId} value={genre.genreId}>
                        {genre.genreName}
                    </option>
                ))}
            </select>
            <div className="display-genre">
                <h4>Selected Book Genre:</h4>
                <span className="selected-genre">
                    {selectedGenre ? genres.find(g => g.genreId === selectedGenre)?.genreName : "None"}
                </span>
            </div>
            </div>
            <div className="field-group">
                <label htmlFor="book-description">Book Description</label>
            <textarea id="bookDescription" name="book-description" value = {bookDescription} placeholder="Enter book synopsis..."
                onChange={(event) => setBookDescription(event.target.value)} maxLength={300}
            /> 
            </div>
            <button className ="submit-button"> Submit </button>
            </form>
            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                    </div>
                )}
        </div>
    );
}

export default CreateBook;