import { useState, useEffect } from 'react';
import { useAppContext } from "../context/AppContext";
import "../styles/ViewBooks.css";

const ViewBooks = () => {

     const { books, loading, error, deleteBook } = useAppContext();

     const [errorMessage, setErrorMessage] = useState('');

     const handleDelete = async (bookId) => {
        {
            try 
            {
                await deleteBook(bookId);
                console.log("Book deleted successfully!");
            } 
            catch (err) {
                setErrorMessage(err.message || "Failed to delete book");
            } 
        }
    };

    return(
        <div className= "books-wrapper">

            <div className="books-header">
                <h4>Id</h4>
                <h4>Image</h4>
                <h4>Title</h4>
                <h4>Author</h4>
                <h4>Published</h4>
                <h4>Book Description</h4>
                <h4>Action</h4>
            </div>
            <hr></hr>

                {/* Books List */}
      <div className="books-list">
        {books.map(book => (
          <div key={book.bookId} className="book-row">
            <div className="book-cell">{book.bookId}</div>
            <div className="book-cell">
              {book.imageUrl && (
                <img 
                  src={book.imageUrl} 
                  alt={book.title}
                  className="book-image" 
                />
              )}
            </div>
            <div className="book-cell">{book.title}</div>
            <div className="book-cell">{book.author}</div>
            <div className="book-cell">{book.publishYear}</div>
            <div className="book-cell book-description">{book.bookDescription}</div>
            <div className="book-cell">
              <button onClick={() => handleDelete(book.bookId)} className ="delete-button">
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

export default ViewBooks;