import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PodcastDetailCard from '../components/PodcastDetailCard';
import { usePodcasts } from '../hooks/usePodcasts';
import { usePodcastDetail } from '../hooks/usePodcastDetail';
import { safeTextHtml } from '../utils/safeTextHtml';
import { useLoading } from '../context/useLoading';
import Spinner from '../components/Spinner';

function EpisodeDetail() {
    const { podcastId, episodeId } = useParams();
    const [podcast, setPodcast] = useState(null);
    const [audioSrc, setAudioSrc] = useState(null);
    const { podcasts, loading: loadingPodcasts } = usePodcasts();
    const { podcastDetail, loading } = usePodcastDetail(podcastId);
    const [episode, setEpisode] = useState(null);
    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(loadingPodcasts || loading || !podcast || !podcastDetail);
    }, [loadingPodcasts, loading, podcast, podcastDetail, setLoading]);

    useEffect(() => {
        if (!podcasts || podcasts.length === 0) return;
        const foundPodcast = podcasts.find(p => p.id.attributes['im:id'] === podcastId);
        setPodcast(foundPodcast);
    }, [podcasts, podcastId]);

    useEffect(() => {
        if (!podcastDetail || !podcastDetail.results) return;
        const foundEpisode = podcastDetail.results.find(ep => ep.trackId == episodeId);
        setEpisode(foundEpisode);

        // Si hay URL de audio, la obtenemos mediante proxy CORS
        if (foundEpisode?.episodeUrl) {
            const corsProxy = 'https://cors-anywhere.herokuapp.com/'; // o allorigins
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

    if (loadingPodcasts || !podcast || !podcastDetail || loading) return <></>

    return (
        <div className='flex flex-row w-fit gap-5'>
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


            <div className='flex flex-col p-6 gap-2 h-fit items-center border border-gray-300 rounded mb-4 shadow'>
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

export default EpisodeDetail;
