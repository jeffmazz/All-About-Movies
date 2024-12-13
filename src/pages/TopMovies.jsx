import { useState, useEffect, useContext } from "react"

import CardList from "../components/CardList"

import { ApiKeyContext } from "../context/ApiKeyContext"

const TopMovies = () => {
  
    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [topMovies, setTopMovies] = useState([])

    useEffect(() => {

        const getTopMovies = async() => {

            const url = 'https://all-about-movies-backend.vercel.app/api/top-movies.js'
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