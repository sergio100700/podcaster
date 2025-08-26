import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Podcasts from './pages/Podcasts'
import PodcastDetail from './pages/PodcastDetail'
import EpisodeDetail from './pages/EpisodeDetail'
import { useLoading } from './context/useLoading'
import Spinner from './components/Spinner'

function App() {
  const { loading } = useLoading();

  return (
    <div className="min-h-screen">

      <header className="flex justify-between items-center p-4 bg-white shadow">
        <Link to="/" className="text-2xl font-bold text-blue-600">Podcaster</Link>
        {loading && (
          <div id="loading-indicator" className="text-sm text-gray-500">
            <Spinner/>
          </div>
        )}
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Podcasts />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
