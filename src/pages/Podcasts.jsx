import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PodcastCard from '../components/PodcastCard';
import { usePodcasts } from '../hooks/usePodcasts';

const Podcasts = () => {
  const { podcasts, error } = usePodcasts();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredPodcasts = useMemo(() => {
    if (!podcasts) return [];
    return podcasts.filter((podcast) => {
      const nameMatch = podcast["im:name"].label.toLowerCase().includes(search.toLowerCase());
      const artistMatch = podcast["im:artist"].label.toLowerCase().includes(search.toLowerCase());
      return nameMatch || artistMatch;
    });
  }, [podcasts, search]);

  if (error) {
    return (
      <div className="text-red-500 text-center">
        <p>Error fetching podcasts. Please try again later.</p>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full'>
      <div className="flex gap-2 w-full justify-end items-center mb-4">
        <p className='bg-blue-500 text-white rounded-full px-2 py-1 text-sm'>{filteredPodcasts.length}</p>
        <input
          type="text"
          value={search}
          placeholder="Filter podcasts..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3
    rounded-lg
    px-3
    py-2
    border
    border-gray-300
    bg-white
    text-gray-900
    placeholder-gray-400
    shadow-sm
    focus:outline-none
    focus:ring-2
    focus:ring-blue-500
    focus:border-blue-500
    transition
    dark:bg-gray-800
    dark:border-gray-600
    dark:text-gray-100
    dark:placeholder-gray-400
    dark:focus:ring-blue-400
    dark:focus:border-blue-400"
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {filteredPodcasts.length > 0 ? (
          filteredPodcasts.map((podcast) => (
            <div key={podcast.id.attributes['im:id']} className='p-2'>
              <PodcastCard
                author={podcast["im:artist"].label}
                title={podcast["im:name"].label}
                image={podcast["im:image"][2].label}
                onClick={() => navigate(`/podcast/${podcast.id.attributes['im:id']}`)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
            No podcasts found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Podcasts;