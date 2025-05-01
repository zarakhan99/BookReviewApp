import { useState } from 'react';
import { useAppContext } from "../context/AppContext";
import { useParams } from 'react-router-dom';

const BookDetails = () => {

    const { books, genres, BookDetails, fetchBooksByGenre,  fetchBookReviews, reviews, error, loading } = useAppContext();

   const {bookId} = useParams();
   


}