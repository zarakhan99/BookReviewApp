import { useState } from 'react';
import { useAppContext } from "../context/AppContext";
import { useParams } from 'react-router-dom';

const WriteReview= () => {

    const {bookId} = useParams();

    return
    (
        <h3>Write a Review!</h3>

    )
};

export default WriteReview;
