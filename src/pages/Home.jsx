import React from "react"
import { useState, useEffect } from "react"

// React Icons
import { FaStar } from "react-icons/fa";

const Home = () => {

    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    const [movies, setMovies] = useState([])

    useEffect(() => {

        const getMovies = async() => {

            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
                const res = await response.json()
                setMovies(res.results)
                console.log(res.results)
            } catch(err) {
                console.log(err)
            }
            
        }

        getMovies()
        
    }, [])

    return (
        <>
            WELCOME
        </>
    )
}

export default Home