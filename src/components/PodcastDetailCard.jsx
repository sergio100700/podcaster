import React from 'react';
import { safeTextHtml } from '../utils/safeTextHtml';
import { useNavigate } from 'react-router-dom';

const PodcastDetailCard = ({ image, title, author, description, podcastId }) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`/podcast/${podcastId}`)
    }

    return (
        <div style={{ width: "250px" }} className='flex flex-col h-fit items-center border border-gray-300 rounded p-4 mb-4 bg-white shadow'>
            <div className='cursor-pointer flex flex-col items-center transform transition-transform duration-200 hover:scale-105 active:scale-95'
                onClick={handleRedirect}>
                <img src={image} alt={title} style={{ width: '200px', height: '200px' }} />
                <hr className="w-full my-4 border border-gray-300" />

                <h2 className='font-bold'>
                    {title}
                </h2>
                <p className='text-gray-700 italic'>by {author}</p>
                <hr className="w-full my-4 border border-gray-300" />
            </div>
            <strong>Description:</strong>
            <p className='italic'>{safeTextHtml(description)}</p>
        </div>
    );
};

export default PodcastDetailCard;