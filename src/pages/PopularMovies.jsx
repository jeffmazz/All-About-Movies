import { useState, useEffect } from "react"

import CardList from "../components/CardList"

const PopularMovies = () => {

    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {

        const getPopularMovies = async() => {

            try {
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
                const res = await response.json()
                setPopularMovies(res.results)
                console.log(res.results)
            } catch(err) {
                console.log(err)
            }
            
        }

        getPopularMovies()
        
    }, [])

    return (
        <>

            <h2 className="title"> Popular Movies </h2>

            <CardList data={popularMovies}/>

        </>
    )

}

export default PopularMovies