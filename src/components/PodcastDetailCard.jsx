import React from 'react';

const PodcastDetailCard = ({ image, title, author, description }) => {
    return (
        <div style={{ width: "250px" }} className='flex flex-col items-center border border-gray-300 rounded p-4 mb-4 bg-white shadow'>
            <img src={image} alt={title} style={{ width: '200px', height: '200px' }} />
            <hr className="my-4 border-gray-300" />

            <h2 className='font-bold'>
                {title}
            </h2>
            <p className='text-gray-700 italic'>by {author}</p>
            <hr className="my-4 border-gray-300" />
            <strong>Description:</strong>
            <p className='italic'>{description}</p>
        </div>
    );
};

export default PodcastDetailCard;