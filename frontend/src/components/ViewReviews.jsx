import { useState } from 'react';
import { useEffect } from 'react'; 
import { useAppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../styles/ViewReviews.css";

// ViewReviews allows admins to manage all book reviews

const ViewReviews = () => {

    const { allReviews, books, fetchReviews, deleteReview, userRole, isAuthenticated = false} = useAppContext();

   const navigate = useNavigate();
   
   useEffect(() => {
    if (userRole !== "Admin") 
        {
            navigate(`/account`);
            return;  // Exit early if not admin
        }
        fetchReviews(); // Now called only when this component loads
  }, []);

        const handleDeleteClick = (reviewId,memberId) => {
            
            const confirmed = window.confirm("Are you sure you want to delete this review?"); // alert will ask the user to confirm the deletion

            if(confirmed) // if user clicks ok
            {
                deleteReview(reviewId, memberId); // method to delete is called and deleted the review
    
                console.log("Review Successfully Deleted")
            }
          }

        // Map reviews to with books based on bookId
          const bookReviews = allReviews.map(review => {
            const book = books.find(book => book.bookId === review.bookId);
            return { ...review, book };
        }).filter(item => item.book); 

        //Creates stars based on rating
        const getUserStarRating = (rating) => {
                    const reviewStars = []
                    for (let i = 1; i <= 5; i++) {
                        if (rating >= i) {
                            reviewStars.push(<FaStar key={i} className="star-icon"/>);
                        } else if (rating >= i - 0.5) {
                            reviewStars.push(<FaStarHalfAlt key={i} className="star-icon"/>);
                        } else {
                            reviewStars.push(<FaRegStar key={i} className="star-icon"/>);
                        }
                    }
                    return reviewStars; // Returns an array of stars
                };
    
    return(
        <div className="all-reviews-wrapper">
                <div className="reviews-header">
                <h4>Title</h4>
                <h4>Rating</h4>
                <h4>Review</h4>
                <h4>Date</h4>
                <h4>Action</h4>
                </div>
              <div className="userReviewsRow">
              {bookReviews.length > 0 ? (
                bookReviews.map((item) => (
                    <div className="book-review-info" key={item.reviewId}>
                        <h4>{item.book.title}</h4>
                        <p>{getUserStarRating(item.rating)}</p>
                        <p className="review-comment">{item.reviewComment}</p>
                        <p>{item.reviewDate?.split("T")[0]}</p>
                        <button className = "delete-review-button" onClick = {() => handleDeleteClick(item.reviewId, item.memberId)}>
                            Delete
                        </button>
                    </div>
                ))
            ) : (
            <p className="no-review-msg">No reviews for books found.</p> // Display a message if the user has no reviews for books
            )}
            </div>
        </div>

    );
}

export default ViewReviews;


