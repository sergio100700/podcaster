import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Podcasts from './pages/Podcasts'
import PodcastDetail from './pages/PodcastDetail'
import EpisodeDetail from './pages/EpisodeDetail'
import { useLoading } from './context/useLoading'
import Spinner from './components/Spinner'
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDarkMode } from './context/useDarkMode'

function App() {
  const { loading } = useLoading();
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen w-full">

      <header className="flex justify-between items-center p-4 shadow dark:shadow-slate-950">
        <Link to="/" className="text-2xl font-bold text-blue-600">Podcaster</Link>
        <div className='flex gap-5 items-center'>
          {loading && (
            <div id="loading-indicator" className="text-sm text-gray-500">
              <Spinner />
            </div>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
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
