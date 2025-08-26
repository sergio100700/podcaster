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
        navigate(`/podcast/${podcastId}/episode/${id}`);
    };

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                    <tr>
                        <th className="text-left px-6 py-3 uppercase tracking-wider">Title</th>
                        <th className="text-left px-6 py-3 uppercase tracking-wider">Date</th>
                        <th className="text-right px-6 py-3 uppercase tracking-wider">Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {episodes.map((ep, index) => (
                        <tr
                            key={ep.trackId}
                            className={`cursor-pointer transition-colors duration-200 ${
                                index % 2 === 0 ? "bg-gray-50 dark:bg-gray-700" : "bg-white dark:bg-gray-800"
                            } hover:bg-blue-100 dark:hover:bg-blue-900`}
                            onClick={() => handleClickEpisode(ep.trackId)}
                        >
                            <td className="px-6 py-4 text-blue-600 dark:text-blue-400 font-medium">{ep.trackName}</td>
                            <td className="px-6 py-4">{new Date(ep.releaseDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right font-mono">{ep.trackTimeMillis ? formatDuration(ep.trackTimeMillis) : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EpisodesTable;
