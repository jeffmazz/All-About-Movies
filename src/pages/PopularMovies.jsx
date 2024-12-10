import { useState, useEffect, useContext} from "react"

import CardList from "../components/CardList"

import { ApiKeyContext } from "../context/ApiKeyContext"

const PopularMovies = () => {

    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        const getPopularMovies = async() => {
            const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
            const data = await fetchData(url)
            setPopularMovies(data)
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