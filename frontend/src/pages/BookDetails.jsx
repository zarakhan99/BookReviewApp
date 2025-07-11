import { useState } from 'react';
import { useEffect } from 'react'; 
import { useAppContext } from "../context/AppContext";
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../styles/BookDetails.css";


const BookDetails = () => {

   const { bookDetails, genresForBook, bookReviews, fetchBookDetails, fetchBookReviews, fetchGenresForBook, isAuthenticated = false } = useAppContext();

   // Retrieve the bookId from URL 
   const {bookId} = useParams();

   const navigate = useNavigate();

   useEffect(() => { // Fetch the book details, genres, and reviews 
    if (bookId) {
      fetchBookDetails(bookId);
      fetchGenresForBook(bookId);
      fetchBookReviews(bookId);
    }
  }, [bookId]);

  //Calculate average rating for reviews and create stars
   const calcAverageRating = () => {

    if (bookReviews && bookReviews.length > 0)
        {
            const bookRatings = bookReviews.map((review) => review.rating);
            
            const ratingSum = bookRatings.reduce((acc, rating) => acc + rating, 0);
            
            const averageRating = (ratingSum / bookReviews.length).toFixed(1);

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
  
      return { stars, averageRating }; // Return stars and average rating
    }
     else
     { // Return empty stars if no reviews
      const emptyStars = Array(5).fill().map((_, i) => <FaRegStar key={i} />);
      return { stars: emptyStars, averageRating: "0.0" }; 
     }

    }

    // Display Users stars based on their rating
    const getUserStarRating = (review) => {

    const reviewStars = []

    for(let i = 1; i <= 5; i++)
    {
        if (review.rating >= i) {
            reviewStars.push(<FaStar key={i} />);
          } else if (review.rating >= i - 0.5) {
            reviewStars.push(<FaStarHalfAlt key={i} />);
          } else {
            reviewStars.push(<FaRegStar key={i} />);
          }
        }
        return reviewStars;
    }
    
    //Handles click to write review
    const handleWriteReviewClick = () => {
      if (isAuthenticated)
      {
        navigate(`/review/${bookId}`)
      }
      else
      {
        navigate(`/account`)
      }
    }
    
    console.log("bookDetails:", bookDetails);

   return (
    <div className="book-details-container">
      <div className= "book-header">
      <img src={bookDetails.imageUrl} alt={bookDetails.title} className="book-cover" />
        <div className= "book-info"> 
        <h2 className="book-title">{bookDetails.title}</h2>
        <h3 className="book-author">{bookDetails.author}</h3>
        <div className="book-average-rating">
        {calcAverageRating().stars}
        <span className="rating-number">
          {calcAverageRating().averageRating}/5
          </span>
        </div>
        <div className="book-genres">
          Genres:&nbsp;
          {genresForBook.map(genre => genre.genreName).join(", ")}
        </div>
        <div className= "book-description"> 
        <p>{bookDetails.bookDescription}</p>
        </div>
        </div>
        </div>
        <div className="book-reviews">
            <h3>Reviews & Ratings</h3>
            <h4> What do you think?</h4>
            <button className ="review-button" onClick={handleWriteReviewClick}>
              Write a Review
              </button>
              <hr className="review-divider" />
            
            {bookReviews.length > 0 ? (
                bookReviews.map(review => (
                    <div key={review.reviewId} className="review-card">
                        <div className="review-meta">
                            <span className="review-member-id">
                                User: {review.memberId}
                                </span>
                            <span className="review-date">
                            {new Date(review.reviewDate).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                              })}
                                </span>
                                </div>
                                <div className="review-stars">
                                    {getUserStarRating(review)}
                                </div>
                                <div> 
                                <p className="review-text">{review.reviewComment}</p>
                                </div>
                                </div>
  ))
) : (
  <p className="no-reviews">No reviews yet. Be the first to review!</p>
)}
</div>
</div>

)};

export default BookDetails;