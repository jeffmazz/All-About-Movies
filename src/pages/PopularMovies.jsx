import { useState, useEffect, useContext} from "react"

import CardList from "../components/CardList"
import Pagination from "../components/Pagination"

import { ApiKeyContext } from "../context/ApiKeyContext"

const PopularMovies = () => {

    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [popularMovies, setPopularMovies] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [actualPage, setActualPage] = useState(
        sessionStorage.getItem('popular_movies_current_page') || 1
    )
    
    useEffect(() => {

        const getPopularMovies = async() => {
            const url = `https://all-about-movies-backend.vercel.app/api/popular-movies.js?pageNumber=${actualPage}`
            const data = await fetchData(url)
            if(!data.results) {
                setPopularMovies('Failed to fetch data')
                return
            }
            setPopularMovies(data.results)
            setTotalPages(400)
        }

        getPopularMovies()

        sessionStorage.setItem("popular_movies_current_page", actualPage)

        window.scrollTo({top:0, behavior:"smooth"})

    }, [actualPage])

    return (
        <>

            <h2 className="title"> Popular Movies </h2>

            {Array.isArray(popularMovies) ?
                <CardList data={popularMovies}/>
                :
                <p className="failedFetch"> {popularMovies} </p>
            }

            <Pagination totalPages={totalPages} actualPage={actualPage} setActualPage={setActualPage} />

        </>
    )

}

export default PopularMovies