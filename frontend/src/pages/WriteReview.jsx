import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/AppContext";


const WriteReview= () => {

    const { userId, isAuthenticated = false, submitReview } = useAppContext();

    const [rating, setRating] = useState();
    const [reviewComment, setReviewComment] = useState();
    const [isSubmitting, setIsSubmitting] = useState();

    const navigate = useNavigate();
    const {bookId} = useParams();

    useEffect(() => {

    const isAuthorized = () => {
        if (!isAuthenticated)
        {
            navigate(`/account`)
        }  
    };
    isAuthorized();

    }, [isAuthenticated]);
    

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

    const userStarRating = () => {

        const handleClickStar = value => {
            setRating(value)
        };

        const stars = [];
        
              // Loop through 1 to 5 stars
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) 
                {
                    stars.push(<FaStar key={i} onClick={() => handleClickStar(i)}/>);
    
                }
                else {
                    stars.push(<FaRegStar key={i} onClick={() => handleClickStar(i)}/>); 
                }
            }
            return stars;
        }

    return
    (
        <div className ="reviews-wrapper">
            <div className='title'> 
                <h3>Write a Review!</h3>
            </div>
            <form className = "review-form">
            <label for="memberId">First Name</label>
            <label for="comment">What did you think?</label>
            <textarea id="userComment" name="subject" placeholder="Enter review..."> 
                <input onChange={reviewComment} > </input>
            </textarea> 
            <button type="submit" className="button">
                Post
                onClick={() => handleReviewsubmission()}

            </button>
            </form>
            
            
        </div>
        

    )
};

export default WriteReview;
