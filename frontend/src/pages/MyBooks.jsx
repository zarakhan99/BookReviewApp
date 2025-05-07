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
                deleteReview(reviewId, userId); // method to delet is called and deleted the review

                setFilteredBooks((previousBooks) => // update the fultered books state so the review it removed form the ui
                    previousBooks.filter((book) => book.reviewId !== reviewId)
                );
    
                console.log("Review Successfully Deleted")
            }
          }
        
        return (
            <div className="myBooks-wrapper">
              <div className="userBooksRow">
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => {
                    const review = userReviews.find((r) => r.bookId === book.bookId);
                    if (!review) return null;
                    return (
                    <div className="book" key={book.bookId}>
                        <h4>{book.title}</h4>
                        <p>{review.rating}</p>
                        <p>{review.reviewComment}</p>
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