import { useState, useEffect } from "react"

import CardList from "../components/CardList"

const TopMovies = () => {
  
    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    const [topMovies, setTopMovies] = useState([])

    useEffect(() => {

        const getTopMovies = async() => {

            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
                const res = await response.json()
                setTopMovies(res.results)
                console.log(res.results)
            } catch(err) {
                console.log(err)
            }
            
        }

        getTopMovies()
        
    }, [])

    return (
        <>

            <h2 className="title"> Top Movies </h2>

            <CardList data={topMovies} />
            
        </>
    )

}

export default TopMovies