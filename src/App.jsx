import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Podcasts from './pages/Podcasts'

function App() {

  return (
    <div className="min-h-screen bg-gray-100">
      
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <Link to="/" className="text-2xl font-bold text-blue-600">Podcaster</Link>
        <div id="loading-indicator" className="text-sm text-gray-500"> {/* spinner */}</div>
      </header>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Podcasts />}/>
          <Route path="/podcast/:podcastId" element={<h1 className="text-xl">Detalle podcast</h1>} />
          <Route path="/podcast/:podcastId/episode/:episodeId" element={<h1 className="text-xl">Detalle episodio</h1>} />
        </Routes>
      </main>
    </div>
  )
}

export default App
