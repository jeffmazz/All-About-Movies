import { useState, useEffect, useContext } from "react"

import CardList from "../components/CardList"

import { ApiKeyContext } from "../context/ApiKeyContext"

const TopMovies = () => {
  
    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [topMovies, setTopMovies] = useState([])

    useEffect(() => {

        const getTopMovies = async() => {

            const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'
            const data = await fetchData(url)
            setTopMovies(data)
            
        }

        getTopMovies()
        
    }, [])

    return (
        <>

            <h2 className="title"> Top Movies </h2>

            { Array.isArray(topMovies) ?
                <CardList data={topMovies} />
                :
                <p className="failedFetch"> {topMovies} </p>
            }
            
        </>
    )

}

export default TopMovies