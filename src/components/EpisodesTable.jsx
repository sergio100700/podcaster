import React from "react";

const EpisodesTable = ({ episodes }) => {
    const formatDuration = (millis) => {
        if (!millis) return "00:00";
        const totalSeconds = Math.floor(millis / 1000);
        const minutes = Math.floor(totalSeconds / 60)
            .toString()
            .padStart(2, "0");
        const seconds = (totalSeconds % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };
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
                        <tr key={ep.id} className="hover:bg-gray-50">

                            <td className="px-4 py-2 border-b">{ep.trackName}</td>
                            <td className="px-4 py-2 border-b">{ep.releaseDate}</td>
                            <td className="px-4 py-2 border-b">{ep.trackTimeMillis ? formatDuration(ep.trackTimeMillis) : "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EpisodesTable;
