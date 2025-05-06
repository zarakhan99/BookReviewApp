import { useState } from 'react';
import { useEffect } from 'react'; 
import { useAppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const myBooks = () => {

    const { books, userId, userReviews, fetchReviewsByUser,fetchBookDetails, isAuthenticated = false } = useAppContext();


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

       const reviewBookId = userReviews.map((review) => review.bookId);

       const filteredBooks = books.filter(reviewBookId.includes(book.bookId));
    
    };


    return
    ( <div>
        <h3> Your Reviews</h3>
    </div>
    
    );
};