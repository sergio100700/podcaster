import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import PodcastDetailCard from '../components/PodcastDetailCard';
import { usePodcasts } from '../hooks/usePodcasts';
import EpisodesTable from '../components/EpisodesTable';
import { usePodcastDetail } from '../hooks/usePodcastDetail';
import { safeTextHtml } from '../utils/safeTextHtml';
import { useLoading } from '../context/useLoading';

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const [podcast, setPodcast] = useState(null);
  const { podcasts, loading: loadingPodcasts, error: errorPodcasts } = usePodcasts();
  const { podcastDetail, loading, error } = usePodcastDetail(podcastId);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(loadingPodcasts || !podcast || !podcastDetail);
  }, [loadingPodcasts, podcast, podcastDetail, setLoading]);


  useEffect(() => {
    if (!podcasts || podcasts.length === 0) return;

    const foundPodcast = podcasts.find(p => p.id.attributes['im:id'] === podcastId);
    setPodcast(foundPodcast);
  }, [podcasts, podcastId]);

  const safeDesc = useMemo(() => {
    if (!podcast?.summary?.label) return '';
    return safeTextHtml(podcast.summary.label);
  }, [podcast?.summary?.label]);
  if (loadingPodcasts || !podcast || !podcastDetail) return <></>
  return (
    <div className='flex flex-row gap-8'>
      <PodcastDetailCard
        author={podcast["im:artist"].label}
        title={podcast["im:name"].label}
        image={podcast["im:image"][2].label}
        description={safeDesc}
        podcastId={podcastId}
      />
      <div className='w-full flex flex-col'>
        <div className='border border-gray-300 rounded p-4'>
          <h2 className='font-bold'>
            Episodes: {podcastDetail.resultCount || 'N/A'}
          </h2>
        </div>
        <div>
          <EpisodesTable podcastId={podcastId} episodes={podcastDetail.results} />
        </div>
      </div>
    </div>
  );
};

export default PodcastDetail;
