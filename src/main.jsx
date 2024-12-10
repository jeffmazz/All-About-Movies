import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Console API KEY
console.log('API KEY:', import.meta.env.VITE_TMDB_API_KEY)

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />
  //</StrictMode>,
)
