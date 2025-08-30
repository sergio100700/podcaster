import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PodcastCard from '../components/PodcastCard';
import { usePodcasts } from '../hooks/usePodcasts';
import { useLoading } from '../context/useLoading';

const Podcasts = () => {
  const { podcasts, loading, error } = usePodcasts();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { setLoading } = useLoading();


  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const filteredPodcasts = useMemo(() => {
    return podcasts.filter((podcast) => {
      const nameMatch = podcast["im:name"].label.toLowerCase().includes(search.toLowerCase());
      const artistMatch = podcast["im:artist"].label.toLowerCase().includes(search.toLowerCase());
      return nameMatch || artistMatch;
    });
  }, [podcasts, search]);



  return (
    <div className='flex flex-col w-full'>
      <div className="flex gap-2 w-full justify-end items-center mb-4">
        <p className='bg-blue-500 text-white rounded-full px-2 py-1 text-sm'>{filteredPodcasts.length}</p>
        <input
          type="text"
          value={search}
          placeholder="Filtrar podcasts..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3
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

      <div className='grid grid-cols-4 gap-4'>
        {filteredPodcasts.map((podcast, index) => (
          <div key={index} className='p-2'>
            <PodcastCard
              author={podcast["im:artist"].label}
              title={podcast["im:name"].label}
              image={podcast["im:image"][2].label}
              onClick={() => navigate(`/podcast/${podcast.id.attributes['im:id']}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcasts;
