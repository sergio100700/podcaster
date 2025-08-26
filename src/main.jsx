import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LoadingProvider } from './context/useLoading.jsx'
import { DarkModeProvider } from './context/useDarkMode.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <DarkModeProvider>
          <App />
        </DarkModeProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
