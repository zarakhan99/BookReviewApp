import { useState } from 'react';
import { useEffect } from 'react'; 
import { useAppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../styles/MyBooks.css";

// Display the books the user has reviewed
const myBooks = () => {

    const { books, userId, userReviews, fetchReviewsByUser, isAuthenticated = false, deleteReview, fetchBooksByGenre } = useAppContext();

    const[filteredBooks, setFilteredBooks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => { // Redirect to account if the user is not authenticated

        const isAuthorized = () => {
            if (!isAuthenticated)
            {
                navigate(`/account`)
            }  
        };
        isAuthorized();
    
        }, [isAuthenticated]);

        useEffect(() => { // Fetch reviews for user by user Id
            fetchBooksByGenre(null); 
            if (userId)
                {
                    fetchReviewsByUser(userId)
                }
        },[userId]);

        const userBookReviews = () => { // Filter the books the user has reviewed
            if (userReviews.length > 0 && books.length > 0)
            {
                const filterById = books.filter((book) => 
                userReviews.some((review) => review.bookId === book.bookId));

                setFilteredBooks(filterById);

            }
            else 
            {
                setFilteredBooks([]); // Clear if no data
            }
         };

        useEffect(() => { //Run function if review or books data changes
            userBookReviews();
          }, [userReviews, books]);
          
          const handleDeleteClick = (reviewId) => {
            
            const confirmed = window.confirm("Are you sure you want to delete this review?"); // Alert will ask the user to confirm the deletion

            if(confirmed) // If user clicks ok
            {
                deleteReview(reviewId, userId); // Method to delete is called and deleted the review

                setFilteredBooks((previousBooks) => // Update the filtered books state so the review it removed form the ui
                    previousBooks.filter((book) => book.reviewId !== reviewId)
                );
    
                console.log("Review Successfully Deleted")
            }
          }

          // Created stars on user rating
          const getUserStarRating = (review) => {
            const reviewStars = []
            for (let i = 1; i <= 5; i++) {
                if (review.rating >= i) {
                    reviewStars.push(<FaStar key={i} className="star-icon"/>);
                } else if (review.rating >= i - 0.5) {
                    reviewStars.push(<FaStarHalfAlt key={i} className="star-icon"/>);
                } else {
                    reviewStars.push(<FaRegStar key={i} className="star-icon"/>);
                }
            }
            return reviewStars; // Return Stars
        };
        
        return (
            <div className="my-books-wrapper">
                <div className="my-books-header">
                <h4>Title</h4>
                <h4>Rating</h4>
                <h4>Review</h4>
                <h4>Date</h4>
                <h4>Action</h4>
                </div>
              <div className="userBooksRow">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => {
                    const review = userReviews.find((r) => r.bookId === book.bookId);
                    if (!review) return null;
                    return (
                    <div className="book" key={book.bookId}>
                        <h4>{book.title}</h4>
                        <p>{getUserStarRating(review)}</p>
                        <p className="review-comment">{review.reviewComment}</p>
                        <p>{review.reviewDate.split("T")[0]}</p>
                        <button className = "delete-review" onClick = {() => handleDeleteClick(review.reviewId)}>
                            Delete
                        </button>
                    </div>
                    );
                })
            ) : (
            <p className="no-review">No reviews for books found.</p> 
            )}
            </div>
            </div>
        );
};
export default myBooks;