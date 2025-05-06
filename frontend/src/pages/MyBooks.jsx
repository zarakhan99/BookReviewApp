import { useState } from 'react';
import { useEffect } from 'react'; 
import { useAppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const myBooks = () => {

    const { books, userId, userReviews, fetchReviewsByUser,fetchBookDetails, isAuthenticated = false } = useAppContext();

    const[filteredBooks, setFilteredBooks] = useState();

    useEffect(() => {

        const isAuthorized = () => {
            if (!isAuthenticated)
            {
                navigate(`/account`)
            }  
        };
        isAuthorized();
    
        }, [isAuthenticated]);

        const userBookReviews = () => {

            const reviewBookId = userReviews.map((review) => review.bookId);
     
            const filterById = books.filter((book) => reviewBookId.includes(book.bookId));
            
            setFilteredBooks(filterById);
         };
        
        useEffect(() => {
            if (userId)
                {
                    fetchReviewsByUser(userId)
                }
                userBookReviews()
        },[userId]);

        useEffect(() => {
            if (userReviews.length > 0 && books.length > 0) {
                // Once reviews are fetched and books are available, filter the books
                userBookReviews();
            }
        }, [userReviews, books]);
        
        return (
            <div className="myBooks-wrapper">
              <div className="userBooks">
                {filteredBooks.map((book) => {
                  const review = userReviews.find((r) => r.bookId === book.bookId);
                  return (
                    <div className="book" key={book.bookId}>
                      <h3>{book.title}</h3>
                      <p>{review.rating}</p>
                      <p>{review.reviewComment}</p>
                      <p>{review.reviewDate}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
};
export default myBooks;