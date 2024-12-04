import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

import Navbar from './components/Navbar'

import Home from './pages/Home'
import TopMovies from './pages/TopMovies'
import PopularMovies from './pages/PopularMovies'
import TopSeries from './pages/TopSeries'
import PopularSeries from './pages/PopularSeries'
import Searched from './pages/Searched'

import { ApiKeyContext, ApiKeyProvider } from './context/ApiKeyContext'
import Actors from './pages/Actors'

function App() {

  return (
    <BrowserRouter>

      <ApiKeyProvider>

        <Navbar/>

        <Routes>  
          <Route path="/" element={<Home/>} />
          <Route path="/top_movies" element={<TopMovies/>} />
          <Route path="/popular_movies" element={<PopularMovies/>} />
          <Route path="/top_series" element={<TopSeries/>} />
          <Route path="/popular_series" element={<PopularSeries/>} />
          <Route path="/searched" element={<Searched/>} />
          <Route path="/actors" element={<Actors/>} />
        </Routes>

      </ApiKeyProvider>
    
    </BrowserRouter>
  )
}

export default App
