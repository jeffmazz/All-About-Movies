// Hooks
import { useState, useEffect, useContext } from "react"

// Components
import CardList from "../components/CardList"

// Context
import { ApiKeyContext } from "../context/ApiKeyContext"

const TopMovies = () => {
  
    const {apiKey, options} = useContext(ApiKeyContext)

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