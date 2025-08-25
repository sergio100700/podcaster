import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PodcastDetailCard from '../components/PodcastDetailCard';
import { usePodcasts } from '../hooks/usePodcasts';
import EpisodesTable from '../components/EpisodesTable';

const PodcastDetail = () => {
    const { podcastId } = useParams();
    const [podcastDetail, setPodcastDetail] = useState(null);
    const [podcast, setPodcast] = useState(null);
    const { podcasts, loading: loadingPodcasts, error: errorPodcasts } = usePodcasts();
  
    useEffect(() => {
      if (!podcasts || podcasts.length === 0) return;
  
      const foundPodcast = podcasts.find(p => p.id.attributes['im:id'] === podcastId);
      setPodcast(foundPodcast);
    }, [podcasts, podcastId]);
  
    useEffect(() => {
      const fetchPodcastDetail = async () => {
        try {
          const cached = localStorage.getItem(`podcast(${podcastId})`);
          const cachedTime = localStorage.getItem(`podcastTime(${podcastId})`);
          const now = Date.now();
  
          if (cached && cachedTime && now - parseInt(cachedTime) < 86400000) {
            setPodcastDetail(JSON.parse(cached));
            return;
          }
  
          const res = await fetch(`https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode`);
          const data = await res.json();
          setPodcastDetail(data);
  
          localStorage.setItem(`podcast(${podcastId})`, JSON.stringify(data));
          localStorage.setItem(`podcastTime(${podcastId})`, now.toString());
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchPodcastDetail();
    }, [podcastId]);
  
    if (loadingPodcasts || !podcast || !podcastDetail) return <p>Cargando...</p>;
    return (
        <div className='flex flex-row gap-8'>
            <PodcastDetailCard
                author={podcast["im:artist"].label}
                title={podcast["im:name"].label}
                image={podcast["im:image"][2].label}
                description={podcast.summary.label}
            />
            <div className='w-full flex flex-col'>
                <div className='border border-gray-300 rounded p-4'>
                    <h2 className='font-bold'>
                        Episodes: {podcastDetail.resultCount || 'N/A'}
                    </h2>
                </div>
                <div>
                    <EpisodesTable episodes={podcastDetail.results}/>
                </div>
            </div>
        </div>
    );
};

export default PodcastDetail;
