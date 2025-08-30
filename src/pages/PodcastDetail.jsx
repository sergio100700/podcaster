import React, { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import PodcastDetailCard from '../components/PodcastDetailCard';
import { usePodcasts } from '../hooks/usePodcasts';
import EpisodesTable from '../components/EpisodesTable';
import { usePodcastDetail } from '../hooks/usePodcastDetail';
import { safeTextHtml } from '../utils/safeTextHtml';
import Spinner from '../components/Spinner';

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const { podcasts } = usePodcasts();
  const { podcastDetail } = usePodcastDetail(podcastId);

  const podcast = useMemo(() => {
    if (!podcasts || podcasts.length === 0) return null;
    return podcasts.find(p => p.id.attributes['im:id'] === podcastId);
  }, [podcasts, podcastId]);

  const safeDesc = useMemo(() => {
    if (!podcast?.summary?.label) return '';
    return safeTextHtml(podcast.summary.label);
  }, [podcast?.summary?.label]);

  if (!podcast || !podcastDetail) {
    return <div className="text-center"><Spinner /></div>;
  }

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
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
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

const PodcastDetailWithSuspense = () => {
  return (
    <Suspense fallback={<div className="text-center"><Spinner /></div>}>
      <PodcastDetail />
    </Suspense>
  )
}

export default PodcastDetailWithSuspense;
