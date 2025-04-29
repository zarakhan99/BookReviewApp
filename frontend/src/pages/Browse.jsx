import { useState } from 'react';
import { useAppContext } from "../context/AppContext";
import BookCard from "../components/BookCard"; 
import "../styles/Browse.css";

const Browse = () => {

    const { books, genres, fetchBooksByGenre, error, loading } = useAppContext();
  
    if (loading) return <p>Loading books...</p>;

    const [selectedGenreId, setSelectedGenreId] = useState(null);
  
    const handleGenreClick = (genreId) => {
      setSelectedGenreId(genreId)
      fetchBooksByGenre(genreId);
    }

    return (
      <div className="browse-container">
      {/* Sidebar */}
      <div className="genre-sidebar">
        <h4>Genres</h4>
        {genres && genres.length > 0 ? (
          <div className="genre-list">
            <button onClick={() => handleGenreClick(null)}
            className={selectedGenreId === null ? "active" : ""}
              >All Genres
            </button>
            
            {genres.map((genre) => (
              <button 
                key={genre.genreId} 
                onClick={() => handleGenreClick(genre.genreId)}
                className={selectedGenreId === genre.genreId ? "active" : ""}
                >
                {genre.genreName} {/* Display genre name */}
              </button>
            ))}
          </div>
          
        ) : (
          <p>No genres available.</p>
        )}
      </div>
    
      <div className="book-container">
        <h2>Browse Books</h2>
        {error && <p className="error-message">{error}</p>}
  {loading ? (
    <p>Loading books...</p>
  ) : books && books.length > 0 ? (
          <div className="book-list">
            {books.map((book) => (
              <BookCard
                key={book.bookId}
                bookId={book.bookId}
                title={book.title}
                author={book.author}
                publishYear={book.publishYear}
                bookDescription={book.bookDescription}
              />
            ))}
          </div>
        ) : (
          <p>No books available.</p>
        )}
        </div>
      </div>
    );
  };
  
  export default Browse;
