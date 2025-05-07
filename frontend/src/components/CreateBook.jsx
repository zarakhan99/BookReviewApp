import { useState, useContext } from 'react';
import { useAppContext } from '../context/AppContext';

const CreateBook = () => {
    
    const { createBook, assignBookToGenre, genres, books, loading, error } = useAppContext();
    
    // state var for book creation
    const[title, setTitle] = useState("");
    const[author, setAuthor] = useState("");
    const[publishYear, setPublishYear] = useState("");
    const[bookDes, setBookDes] = useState("");
    const[imageUrl, setImageUrl] = useState("");
    const[selectedGenres, setSelectedGenres] = useState([]); // array fir multiple genre selection
    
    const handleCreateBookClick = async () =>
    {
        if (title && author && publishYear && bookDes && imageUrl && selectedGenres.length > 0)
                
        {
            const newBook = await createBook(title, author, publishYear, bookDes,imageUrl)
            
            if(newBook)
            {
                console.log = ("Book Created Successfully!");
                console.log = ($(newBook));
                
                for (const genreId of selectedGenres) 
                {
                    await assignBookToGenre(newBook.bookId, genreId);
                }
                console.log("Book genres successfully assigned!");
            }
            else
            {
                console.log("Book Creation failed!");
            }
    }
    else 
    {
        console.log("Missing Fields: All fields must be filled to create a book");
    }
    };
    
    return (
        <div className = "form-wrapper">
            <form className = "create-book-form">

            </form>
        </div>
    );

}