import { useState } from 'react';
import { useAppContext } from "../context/AppContext";
import { useParams } from 'react-router-dom';

const BookDetails = () => {

    const { BookDetails, genresForBook, reviews, loading, error } = useAppContext();

   const {bookId} = useParams();

   const calcAverageRating = () => {

    if (reviews && reviews.length > 0)
        {
            const bookRatings = reviews.map((review) => review.rating);
            
            const ratingSum = bookRatings.reduce((acc, rating) => acc + rating, 0);
            
            const averageRating = ratingSum /  bookRatings.length;

            const stars = [];

      // Loop through 1 to 5 stars
    for (let i = 1; i <= 5; i++) {
        if (averageRating >= i) {
          stars.push(<FaStar key={i} />);
        } else if (averageRating >= i - 0.5) {
          stars.push(<FaStarHalfAlt key={i} />);
        } else {
          stars.push(<FaRegStar key={i} />);
        }
      }
  
      return stars;
    }
     else
     {
        return Array(5).fill().map((_, i) => <FaRegStar key={i} />);
     }

    }
    

 
   return (
    <div>
        <h2>{BookDetails.title}</h2>
        <h3>{BookDetails.author}</h3>

        <p>{BookDetails.description}</p>

    </div>
   )

   


}