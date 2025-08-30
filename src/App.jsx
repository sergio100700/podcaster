import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import { useLoading } from './context/useLoading'
import Spinner from './components/Spinner'
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDarkMode } from './context/useDarkMode'
import { Suspense, lazy } from 'react'

const Podcasts = lazy(() => import('./pages/Podcasts'))
const PodcastDetail = lazy(() => import('./pages/PodcastDetail'))
const EpisodeDetail = lazy(() => import('./pages/EpisodeDetail'))

function App() {
  const { loading } = useLoading();
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen w-full">

      <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-900 transition-colors duration-300">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors"
        >
          Podcaster
        </Link>

        <div className="flex items-center gap-4">
          {loading && (
            <div id="loading-indicator" className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Spinner />
            </div>
          )}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </header>

      <main className="p-6">
        <Suspense fallback={<div className="text-center"><Spinner /></div>}>
          <Routes>
            <Route path="/" element={<Podcasts />} />
            <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
            <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
