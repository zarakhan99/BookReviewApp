import React from 'react';
import { Link} from 'react-router-dom';
import "../styles/BookCard.css";


function BookCard({ bookId, title, author, publishYear, bookDescription, imageUrl }) {
    console.log("Rendering BookCard with:", { 
      bookId, title, author, publishYear, bookDescription, imageUrl 
    });

    const previewLength = bookDescription.length > 110
  ? bookDescription.substring(0, 110) + '...' : bookDescription

    return (
        <div className="BookCard">
          <img
          src={imageUrl?.startsWith('http') ? imageUrl : `http://localhost:5276${imageUrl}`}
          alt={`${title} cover`}
          className="book-cover"
          />
          <h4>{title}</h4>
          <p> Author: {author}</p>
          <p> Published: {publishYear}</p>
          <p>{previewLength}</p>
          <Link to={`/books/${bookId}`}>Book Details</Link>
        </div>
      );
    }
    
  export default BookCard;
