import React from 'react';
import { safeTextHtml } from '../utils/safeTextHtml'; // si quieres respetar saltos de línea o HTML

const PodcastCard = ({ image, title, author, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-full rounded-xl shadow-md bg-gray-100 dark:bg-gray-600 dark:hover:shadow-slate-950 hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center p-4"
    >
      <div className="w-40 h-40 mb-4 flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-full border-4 border-gray-300 transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="text-center w-full break-words">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
          {safeTextHtml(title)}
        </h2>
        <p className="text-sm text-gray-400">
          {safeTextHtml(author)}
        </p>
      </div>
    </div>
  );
};

export default PodcastCard;
