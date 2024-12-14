import { useState, useEffect, useContext} from "react"

import CardList from "../components/CardList"

import { ApiKeyContext } from "../context/ApiKeyContext"

const PopularMovies = () => {

    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        const getPopularMovies = async() => {
            const url = 'https://all-about-movies-backend.vercel.app/api/popular-movies.js'
            const data = await fetchData(url)
            setPopularMovies(data.results)
        }
        getPopularMovies()
    }, [])

    return (
        <>

            <h2 className="title"> Popular Movies </h2>

            {Array.isArray(popularMovies) ?
                <CardList data={popularMovies}/>
                :
                <p className="failedFetch"> {popularMovies} </p>
            }

        </>
    )

}

export default PopularMovies