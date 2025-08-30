import React, { Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PodcastDetailCard from '../components/PodcastDetailCard';
import { usePodcasts } from '../hooks/usePodcasts';
import { usePodcastDetail } from '../hooks/usePodcastDetail';
import { safeTextHtml } from '../utils/safeTextHtml';
import Spinner from '../components/Spinner';

function EpisodeDetail() {
    const { podcastId, episodeId } = useParams();
    const [podcast, setPodcast] = useState(null);
    const [audioSrc, setAudioSrc] = useState(null);
    const { podcasts } = usePodcasts();
    const { podcastDetail } = usePodcastDetail(podcastId);
    const [episode, setEpisode] = useState(null);

    useEffect(() => {
        if (!podcasts || podcasts.length === 0) return;
        const foundPodcast = podcasts.find(p => p.id.attributes['im:id'] === podcastId);
        setPodcast(foundPodcast);
    }, [podcasts, podcastId]);

    useEffect(() => {
        if (!podcastDetail || !podcastDetail.results) return;
        const foundEpisode = podcastDetail.results.find(ep => ep.trackId == episodeId);
        setEpisode(foundEpisode);

        if (foundEpisode?.episodeUrl) {
            const corsProxy = 'https://cors-anywhere.herokuapp.com/';
            fetch(corsProxy + foundEpisode.episodeUrl)
                .then(res => res.blob())
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    setAudioSrc(url);
                })
                .catch(err => {
                    console.error('Error cargando audio:', err);
                    setAudioSrc(null);
                });
        }
    }, [podcastDetail, episodeId]);

    if (!podcast || !podcastDetail) return <div className="text-center"><Spinner /></div>;

    return (
        <div className='flex flex-row gap-5'>
            <div className='w-fit'>
                {podcast && (
                    <PodcastDetailCard
                        author={podcast["im:artist"].label}
                        title={podcast["im:name"].label}
                        image={podcast["im:image"][2].label}
                        description={safeTextHtml(podcast?.summary?.label)}
                        podcastId={podcastId}
                    />
                )}
            </div>


            <div className='flex flex-col p-6 gap-2 h-fit w-full items-center border border-gray-300 rounded mb-4 shadow'>
                <h2 className='font-bold text-2xl'>{episode?.trackName}</h2>
                <p className='text-left'>{safeTextHtml(episode?.description)}</p>
                <hr className="w-full my-4 border border-gray-300" />
                {episode.episodeUrl ? (
                    audioSrc ? <audio className='w-full' controls src={audioSrc}></audio> : <Spinner />
                ) : (
                    <p>No hay audio disponible</p>
                )}
            </div>
        </div>
    );
}

const EpisodeDetailWithSuspense = () => {
    return (
        <Suspense fallback={<div className="text-center"><Spinner /></div>}>
            <EpisodeDetail />
        </Suspense>
    )
}

export default EpisodeDetailWithSuspense;
