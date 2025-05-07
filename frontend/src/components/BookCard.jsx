import React from 'react';
import { Link} from 'react-router-dom';
import "../styles/BookCard.css";


function BookCard({ bookId, title, author, bookDescription, imageUrl }) {
    console.log("Rendering BookCard with:", { 
      bookId, title, author, bookDescription, imageUrl 
    });

    const previewLength = bookDescription.length > 110
  ? bookDescription.substring(0, 110) + '...' : bookDescription

    return (
        <div className="BookCard">
          <img
          src={imageUrl?.startsWith('http') ? imageUrl : `http://localhost:5276${imageUrl}`}
          alt={title}
          className="book-cover"
          />
          <h4>{title}</h4>
          <p> Author: {author}</p>
          <p>{previewLength}</p>
          <Link to={`/books/${bookId}`} className = "book-details">Book Details</Link>
        </div>
      );
    }
    
  export default BookCard;
