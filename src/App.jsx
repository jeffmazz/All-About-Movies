import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

// components
import Navbar from './components/Navbar'

// pages
import Home from './pages/Home'
import TopMovies from './pages/TopMovies'
import PopularMovies from './pages/PopularMovies'
import TopSeries from './pages/TopSeries'
import PopularSeries from './pages/PopularSeries'
import Searched from './pages/Searched'

function App() {

  return (
    <BrowserRouter>

      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>} />

        <Route path="/top_movies" element={<TopMovies/>} />

        <Route path="/popular_movies" element={<PopularMovies/>} />

        <Route path="/top_series" element={<TopSeries/>} />

        <Route path="/popular_series" element={<PopularSeries/>} />

        <Route path="/searched" element={<Searched/>} />

      </Routes>
    
    </BrowserRouter>
  )
}

export default App
