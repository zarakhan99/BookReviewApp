import { useAppContext } from "../context/AppContext";
import BookCard from "../components/BookCard"; 

const Browse = () => {

    const { books, error, loading } = useAppContext();
  
    if (loading) return <p>Loading books...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div className="browse-container">
        <h2>Browse Books</h2>
        {books && books.length > 0 ? (
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
    );
  };
  
  export default Browse;

