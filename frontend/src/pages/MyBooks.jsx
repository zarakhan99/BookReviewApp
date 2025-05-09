import { useState } from 'react';
import { useEffect } from 'react'; 
import { useAppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../styles/MyBooks.css";


const myBooks = () => {

    const { books, userId, userReviews, fetchReviewsByUser, isAuthenticated = false, deleteReview } = useAppContext();

    const[filteredBooks, setFilteredBooks] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const isAuthorized = () => {
            if (!isAuthenticated)
            {
                navigate(`/account`)
            }  
        };
        isAuthorized();
    
        }, [isAuthenticated]);

        useEffect(() => {
            if (userId)
                {
                    fetchReviewsByUser(userId)
                }
        },[userId]);

        const userBookReviews = () => {
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

        useEffect(() => {
            userBookReviews();
          }, [userReviews, books]);
          
          const handleDeleteClick = (reviewId) => {
            
            const confirmed = window.confirm("Are you sure you want to delete this review?"); // alert will ask the user to confirm the deletion

            if(confirmed) // if user clicks ok
            {
                deleteReview(reviewId, userId); // method to delete is called and deleted the review

                setFilteredBooks((previousBooks) => // update the fultered books state so the review it removed form the ui
                    previousBooks.filter((book) => book.reviewId !== reviewId)
                );
    
                console.log("Review Successfully Deleted")
            }
          }

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
            return reviewStars;
        };
        
        return (
            <div className="myBooks-wrapper">
                <div className="books-header">
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
            <p>No reviews for books found.</p> // Display a message if the user has no reviews for books
            )}
            </div>
            </div>
        );
};
export default myBooks;