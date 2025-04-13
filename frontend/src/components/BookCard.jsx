import React from 'react';

function BookCard({title, author, publishYear, description}) 
{
    const previewLength = description.length > 50
    ? description.substring[0,50] + '...' : description

    return 
    (
        <div className='BookCard'>
            <img src = {image} alt={title}/>
            <h4>{title}</h4>
            <p>{author}</p>
            <p>{publishYear}</p>
            <p>{description}</p>
            <Link
            to="/Book">BookDetailsPage</Link>
        </div>

    )

}
