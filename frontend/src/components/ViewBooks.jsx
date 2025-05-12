import { useState, useEffect } from 'react';
import { useAppContext } from "../context/AppContext";
import "../styles/ViewBooks.css";

// ViewBooks component handles listing, editing, and deleting books
const ViewBooks = () => {

     const { books, deleteBook, editBook } = useAppContext();

     const [errorMessage, setErrorMessage] = useState('');
     const [editingBook, setEditingBook] = useState(null);

     const [bookData, setBookData] = useState({ //Book form data
      title: "",
      author: "",
      publishYear: "",
      bookDescription: "",
      imageUrl: ""
    });

    //Handles editing book
    const handleEditClick = (book) => {
      setEditingBook(book.bookId); // Mark current book as being edited
      setBookData({ // Prepoulate fields in form
        title: book.title || "",
        author: book.author || "",
        publishYear: book.publishYear?.toString() || "", 
        bookDescription: book.bookDescription || "",
        imageUrl: book.imageUrl || "", 
        });

      window.scrollTo({
         top: 0,
         behavior: 'smooth'
        });
    };

    //Handles edit submission
     const handleEditBookSubmit = async (e) => {
      e.preventDefault();
      try {
        //If missing fields set error message
        if (!bookData.title || !bookData.author || !bookData.publishYear || !bookData.bookDescription) 
        {
          setErrorMessage("*** Missing Fields: All fields must be filled to edit a book ***");
          return;
        }

        await editBook(editingBook, bookData); // call edit method

        console.log("Book updated successfully!");
        setEditingBook(null); // set edit book to null
        setErrorMessage("") // set error to null

      } catch (err) {
        setErrorMessage("Failed to update book");
      }
    };
    
    //handles cancel - sets edited book to null
    const handleCancelEdit = () => {
      setEditingBook(null); 
      setErrorMessage("")
    };

    // handles field chnage
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData(prev => ({ ...prev, [name]: value }));
  };

  //Handles book deletion
     const handleDelete = async (bookId) => {
        {
            try 
            {
                await deleteBook(bookId); // Calls delete method
                console.log("Book deleted successfully!");
            } 
            catch (err) {
                setErrorMessage("Failed to delete book");
            } 
        }
    };

    return(
        <div className= "books-wrapper">
          {editingBook && (
            <div className="edit-form-wrapper">
              <form className="edit-book-form" onSubmit={handleEditBookSubmit}>
                <div className="edit-form-title">
                  <h3>Edit Book</h3>
                  </div>
                  <div className="edit-field-group">
                    <label>Title</label>
                    <input 
                    type="text" 
                    name="title"
                    value={bookData.title}
                    onChange={handleInputChange}
                    />
                    </div>
                    <div className="edit-field-group">
                      <label>Image URL</label>
                      <input 
                      type="text" 
                      name="imageUrl"
                      value={bookData.imageUrl} 
                      onChange={handleInputChange}
                      />
                      </div>
                      <div className="field-group">
                        <label>Author</label>
                        <input 
                        type="text" 
                        name="author"
                        value={bookData.author} 
                        onChange={handleInputChange}
                        />
                        </div>

            <div className="edit-field-group">
              <label>Publish Year</label>
              <input 
                type="text" 
                name="publishYear"
                value={bookData.publishYear} 
                onChange={handleInputChange}
              />
            </div>

            <div className="edit-field-group">
              <label>Description</label>
              <textarea 
                name="bookDescription"
                value={bookData.bookDescription}
                onChange={handleInputChange}
                maxLength={300}
              />
            </div>

            <div className="edit-form-actions">
              <button type="submit" className="edit-submit-button">Save Changes</button>
              <button type="button" onClick={handleCancelEdit} className="cancel-button">
                Cancel
              </button>
            </div>
          </form>
          {errorMessage && <div className="edit-error-message">{errorMessage}</div>}
        </div>
      )}

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
              <button onClick={() => handleEditClick(book)} className="edit-button">
                Edit
              </button>
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