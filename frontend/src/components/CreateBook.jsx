import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import "../styles/Createbook.css";

const CreateBook = () => {
    
    const { createBook, assignBookToGenre, genres, books } = useAppContext();
    
    // state var for book creation
    const[title, setTitle] = useState("");
    const[author, setAuthor] = useState("");
    const[publishYear, setPublishYear] = useState("");
    const[bookDescription, setBookDescription] = useState("");
    const[imageUrl, setImageUrl] = useState("");
    const[selectedGenres, setSelectedGenres] = useState([]); // array for multiple genre selection
    const [errorMessage, setErrorMessage] = useState('');
    const [createdBook, setCreatedBook] = useState(null);
    
    const handleCreateBookClick = async () =>
    {
        if (title && author && publishYear && bookDescription && imageUrl && selectedGenres.length > 0)
                
        {
            const newBook = await createBook(title, author, publishYear, bookDescription,imageUrl)
            
            if(newBook)
            {
                console.log("Book Created Successfully!");
                console.log(newBook);
                
                for (const genreId of selectedGenres) 
                {
                    await assignBookToGenre(newBook.bookId, genreId);
                }
                console.log("Book genres successfully assigned!");

                //const matchingGenres = selectedGenres.genreId.map(id) => genres.genreId);

                const newCreatedBook = {newBook,selectedGenres}

                setCreatedBook(newCreatedBook)

                setTitle("")
                setAuthor("")
                setPublishYear("")
                setBookDescription("")
                setImageUrl("");
                setSelectedGenres([])
            }
            else
            {
                setErrorMessage("Book Creation failed!");
            }
    }
    else 
    {
        setErrorMessage("Missing Fields: All fields must be filled to create a book");
    }
    };
    
    return (
        <div className = "form-wrapper">
            <form className = "create-book-form" onSubmit={(e) => {  // create a form
            e.preventDefault(); // stop defualt submission and page reload
            handleCreateBookClick(); 
            }}>
            <label htmlFor="title"> Title</label>
            <input type="text" id="title" name="book-title" value={title} onChange={(event) => setTitle(event.target.value)} >
            </input>
            <label htmlFor="imageUrl"> Image Url</label>
            <input type="text" id="image Url" name="book-image" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} >
            </input>
            <label htmlFor="author"> Author</label>
            <input type="text" id="author" name="book-author" value={author} onChange={(event) => setAuthor(event.target.value)} >
            </input>
            <label htmlFor="publishYear"> Publish Year</label>
            <input type="text" id="publishYear" name="book-publish-year" value={publishYear} onChange={(event) => setPublishYear(event.target.value)} >
            </input>
            <label htmlFor="selectedGenres">Select Genres</label>
            <select // create a dropdown
                name="genres" //genre names
                multiple //allow user to select multiple genres
                value={selectedGenres} // bind chosen genred to selected genres
                onChange={(e) => setSelectedGenres([...e.target.selectedOptions].map(option => option.value))} // selected options
            >
                {genres.map(genre => ( // loops over selected options and gets the genre ids
                    <option key={genre.genreId} value={genre.genreId}>
                        {genre.genreName}
                    </option>
                ))}
            </select>
            <textarea id="bookDescription" name="book-description" value = {bookDescription} placeholder="Enter book synopsis..."
                onChange={(event) => setBookDescription(event.target.value)} maxLength={300}
            /> 
            {errorMessage && <div className="error-message">{errorMessage}
                </div>}
            <button className ="submit-button"> Submit </button>
            </form>
        </div>
    );
}

export default CreateBook;