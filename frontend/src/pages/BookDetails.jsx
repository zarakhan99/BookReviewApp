import { useState } from 'react';
import { useAppContext } from "../context/AppContext";
import { useParams } from 'react-router-dom';

const BookDetails = () => {

    const { BookDetails, genresForBook, reviews, loading, error } = useAppContext();

   const {bookId} = useParams();

   const averageRating = () => {
    if (!reviews && reviews > 1)
    {
        {reviews.map(review.rating) => (

        )
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