import React from "react";
import { useNavigate } from "react-router-dom";

const EpisodesTable = ({ podcastId, episodes }) => {
    const navigate = useNavigate();

    const formatDuration = (millis) => {
        if (!millis) return "00:00";
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (totalSeconds % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handleClickEpisode = (id) => {
        navigate(`/podcast/${podcastId}/episode/${id}`)
    }

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-4 py-2 border-b">Title</th>
                        <th className="text-left px-4 py-2 border-b">Date</th>
                        <th className="text-left px-4 py-2 border-b">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {episodes.map((ep) => (
                        <tr key={ep.trackId} className="hover:bg-gray-50 cursor-pointer" onClick={()=>handleClickEpisode(ep.trackId)}>
                            <td className="px-4 py-2 border-b text-blue-500 text-left">{ep.trackName}</td>
                            <td className="px-4 py-2 border-b text-left">{new Date(ep.releaseDate).toLocaleDateString()}</td>
                            <td className="px-4 py-2 border-b text-right">{ep.trackTimeMillis ? formatDuration(ep.trackTimeMillis) : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EpisodesTable;
