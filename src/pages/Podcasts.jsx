import React, { useEffect, useState } from 'react';
import PodcastCard from '../components/PodcastCard';

const Podcasts = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                const res = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
                const data = await res.json();
                setPodcasts(data.feed.entry || []);
            } catch (error) {
                console.error("Error fetching podcasts:", error);
            }
        };
        fetchPodcasts();
    }, []);

    const handleSearchPodcast = (e) => setSearch(e.target.value);

    const filteredPodcasts = podcasts.filter((podcast) => {
        const nameMatch = podcast["im:name"].label.toLowerCase().includes(search.toLowerCase());
        const artistMatch = podcast["im:artist"].label.toLowerCase().includes(search.toLowerCase());
        return nameMatch || artistMatch;
    });

    return (
        <div className='flex flex-col w-full'>
            <div className="flex gap-2 w-full justify-end items-center mb-4">
                <p className='bg-blue-500 text-white rounded-full px-2 py-1 text-sm'>{filteredPodcasts.length}</p>
                <input
                    id='filter-podcast-input'
                    type="text"
                    value={search}
                    placeholder='Filter podcasts...'
                    className='border border-gray-300 rounded px-2 py-1'
                    onChange={handleSearchPodcast}
                />
            </div>

            <div className='grid grid-cols-4 gap-4'>
                {filteredPodcasts.map((podcast, index) => (
                    <div key={index} className='p-2'>
                        <PodcastCard 
                            author={podcast["im:artist"].label} 
                            title={podcast["im:name"].label} 
                            image={podcast["im:image"][2].label} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Podcasts;
