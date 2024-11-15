// Hooks
import { useState, useEffect, useContext} from "react"

// Components
import CardList from "../components/CardList"

// Context
import { ApiKeyContext } from "../context/ApiKeyContext"

const PopularMovies = () => {

    const {apiKey, options} = useContext(ApiKeyContext)

    const [popularMovies, setPopularMovies] = useState([])

    useEffect(() => {
        const getPopularMovies = async() => {
            try {
                const response = await fetch('https://all-about-movies-c5c6a89a6500.herokuapp.com/movies/popular')
                const res = await response.json()
                setPopularMovies(res.results)
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