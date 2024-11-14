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
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
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