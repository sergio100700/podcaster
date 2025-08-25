import React from 'react';

const PodcastCard = ({ image, title, author }) => {
    return (
        <div className='w-fit border border-gray-300 rounded p-4 mb-4 bg-white shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer'>

            <img src={image} alt={title} style={{ width: '200px', height: '200px', borderRadius: '50%' }} />

            <h2>{title}</h2>
            <p className='text-gray-300'>{author}</p>
        </div>
    );
};

export default PodcastCard;