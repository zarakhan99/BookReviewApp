import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/AppContext";


const WriteReview= () => {

    const { userId, isAuthenticated = false } = useAppContext();

    const [rating, setRating] = useState();
    const [comment, setComment] = useState();
    const [reviewDate, setReviewDate] = useState();

    const navigate = useNavigate();
    const {bookId} = useParams();

    return
    (
        <div className ="reviews-wrapper">
            <form>
                
            </form>
            <h3>Write a Review!</h3>
        </div>
        

    )
};

export default WriteReview;
