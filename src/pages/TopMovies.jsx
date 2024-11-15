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
                const response = await fetch('https://all-about-movies-c5c6a89a6500.herokuapp.com/movies/top')
                const res = await response.json()
                setTopMovies(res.results)
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