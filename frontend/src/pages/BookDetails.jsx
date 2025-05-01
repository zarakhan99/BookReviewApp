import { useState } from 'react';
import { useEffect } from 'react'; 
import { useAppContext } from "../context/AppContext";
import { useParams } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const BookDetails = () => {

    const { bookDetails, genresForBook, reviews, fetchBookDetails, fetchBookReviews, fetchGenresForBook, loading, error } = useAppContext();

   const {bookId} = useParams();

   useEffect(() => {
    if (bookId) {
      fetchBookDetails(bookId);
      fetchGenresForBook(bookId);
      fetchBookReviews(bookId);
    }
  }, [bookId]);

   const calcAverageRating = () => {

    if (reviews && reviews.length > 0)
        {
            const bookRatings = reviews.map((review) => review.rating);
            
            const ratingSum = bookRatings.reduce((acc, rating) => acc + rating, 0);
            
            const averageRating = ratingSum /  bookRatings.length;

            const stars = [];

      // Loop through 1 to 5 stars
    for (let i = 1; i <= 5; i++) {
        if (averageRating >= i) {
          stars.push(<FaStar key={i} />);
        } else if (averageRating >= i - 0.5) {
          stars.push(<FaStarHalfAlt key={i} />);
        } else {
          stars.push(<FaRegStar key={i} />);
        }
      }
  
      return stars;
    }
     else
     {
        return Array(5).fill().map((_, i) => <FaRegStar key={i} />);
     }

    }
    
    console.log("bookDetails:", bookDetails);

   return (
    <div className="book-details">
        <h2>{bookDetails.title}</h2>
        <h3>{bookDetails.author}</h3>
        <div className="book-average-rating">
        {calcAverageRating()}
        </div>
        <div className="book-genres">
        {genresForBook.map((genre) => (
            <span> 
                key={genre.genreId}
                {genre.genreName}
                </span>
                 ))}
        </div>
        <div className= "book-description"> 
        <p>{bookDetails.bookDescription}</p>
        </div>
        <div className="book-average-rating">
            <h3>Reviews & Ratings</h3>
       

        </div>
    </div>
   );
};

export default BookDetails;