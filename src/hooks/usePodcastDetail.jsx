import { useState, useEffect } from "react";

export const usePodcastDetail = (podcastId) => {
    const [podcastDetail, setPodcastDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!podcastId) return;

        const fetchPodcastDetail = async () => {
            try {
                setLoading(true);
                const cached = localStorage.getItem(`podcast(${podcastId})`);
                const cachedTime = localStorage.getItem(`podcastTime(${podcastId})`);
                const now = Date.now();

                if (cached && cachedTime && now - parseInt(cachedTime) < 86400000) {
                    setPodcastDetail(JSON.parse(cached));
                    setLoading(false);
                    return;
                }
                const corsProxy = 'https://cors-anywhere.herokuapp.com/';
                const res = await fetch(corsProxy +
                    `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode`
                );
                const data = await res.json();
                setPodcastDetail(data);

                localStorage.setItem(`podcast(${podcastId})`, JSON.stringify(data));
                localStorage.setItem(`podcastTime(${podcastId})`, now.toString());
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPodcastDetail();
    }, [podcastId]);

    return { podcastDetail, loading, error };
};
