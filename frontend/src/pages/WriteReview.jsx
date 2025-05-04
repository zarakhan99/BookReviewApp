import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/AppContext";


const WriteReview= () => {

    const { userId, isAuthenticated = false, submitReview } = useAppContext();

    const [rating, setRating] = useState();
    const [reviewComment, setReviewComment] = useState();
    const [isSubmitting, setIsSubmitting] = useState();

    const navigate = useNavigate();
    const {bookId} = useParams();

    const handleReviewsubmission = async () => {

        if (!rating || rating < 1 || rating > 5 || !reviewComment || reviewComment.length < 5)
        {
            alert("Invalid Input! Please provide a valid rating and comment");
            return;
        }

        const userReview = await submitReview(userId, bookId, rating, reviewComment)

        if (userReview)
        {
            navigate(`/book/${bookId}`);
        }
        else
        {
            alert("Error! Review submission unsuccessful.");
        }
       
    }

    return
    (
        <div className ="reviews-wrapper">
            <div className='title'> 
                <h3>Write a Review!</h3>
            </div>
            <form>

            </form>
            
        </div>
        

    )
};

export default WriteReview;
