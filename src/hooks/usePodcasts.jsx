import { useState, useEffect } from 'react';

export const usePodcasts = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        setError(null);

        const cached = localStorage.getItem('podcastsData');
        const cachedTime = localStorage.getItem('podcastsTime');
        const now = Date.now();

        if (cached && cachedTime && now - parseInt(cachedTime) < 86400000) {
          setPodcasts(JSON.parse(cached));
          setLoading(false);
          return;
        }
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';

        const res = await fetch(corsProxy + 'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
        const data = await res.json();
        const entries = data.feed.entry || [];

        setPodcasts(entries);

        localStorage.setItem('podcastsData', JSON.stringify(entries));
        localStorage.setItem('podcastsTime', now.toString());
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching podcasts:", err);
      }
    };

    fetchPodcasts();
  }, []);

  return { podcasts, loading, error };
};
