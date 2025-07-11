import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/AppContext";
import { FaStar, FaRegStar } from "react-icons/fa";
import "../styles/WriteReview.css";

//Component to let user write review
const WriteReview= () => {

    const { userId, isAuthenticated = false, submitReview } = useAppContext();

    console.log("userId from AppContext:", userId);

    const [rating, setRating] = useState(0);
    const [reviewComment, setReviewComment] = useState("");
    //const [isSubmitting, setIsSubmitting] = useState();

    const navigate = useNavigate();
    const {bookId} = useParams();

    useEffect(() => { // Naviagets to account if user is not aithenticated

    const isAuthorized = () => {
        if (!isAuthenticated)
        {
            navigate(`/account`)
        }  
    };
    isAuthorized();

    }, [isAuthenticated]);
    

    const handleReviewsubmission = async (e) => { //handles review click
        e.preventDefault();

        //If fields are empty return alert
        if (!rating || rating < 1 || rating > 5 || !reviewComment || reviewComment.length < 5)
        {
            alert("Invalid Input! Please provide a valid rating and comment");
            return;
        }

        const userReview = await submitReview(userId, bookId, rating, reviewComment) // Calls function to post review

        if (userReview)
        {
            navigate(`/books/${bookId}`); // nNvigates to book details page after review is successfully submitted
        }
        else
        {
            alert("Error! Review submission unsuccessful."); //Error if review coudnt be submitted
        }

        console.log("Review Submitted:", userId, bookId, rating, reviewComment);
       
    }

    // Generate stars based on the rating 
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

   return (

        <div className ="reviews-wrapper">
            <div className='title'> 
                <h3>Write a Review!</h3>
            </div>
            <form className = "review-form" onSubmit={handleReviewsubmission}>
                <label htmlFor="memberId">Member Id</label>
                <input type="text" id="memberId" name="member-id" value={userId} readOnly></input>
                <label htmlFor="comment">What did you think? </label>
                <div className='star-rating'> 
                    {userStarRating()}
                </div>
                <textarea id="userComment" name="subject" value = {reviewComment} placeholder="Enter review..."
                onChange={(event) => setReviewComment(event.target.value)} maxLength={300}>
                    </textarea> 
                    <p className = "character-count">{reviewComment.length} / 300 characters</p>
                    <button type="submit" className="button">
                        Post
                        </button>
            </form>
        </div>
   );
};

export default WriteReview;
