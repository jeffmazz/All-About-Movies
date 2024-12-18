import { useState, useEffect, useContext } from "react"

import CardList from "../components/CardList"
import Pagination from "../components/Pagination"

import { ApiKeyContext } from "../context/ApiKeyContext"

const TopMovies = () => {
  
    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [topMovies, setTopMovies] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [actualPage, setActualPage] = useState(
        Number(sessionStorage.getItem("top_movies_current_page")) || 1
    )

    useEffect(() => {

        const getTopMovies = async() => {
            const url = `https://all-about-movies-backend.vercel.app/api/top-movies.js?pageNumber=${actualPage}`
            const data = await fetchData(url)
            if(!data.results) {
                setTopMovies("Failed to fetch data")
                return
            }
            setTopMovies(data.results)
            setTotalPages(data.totalPages)
        }

        getTopMovies()

        sessionStorage.setItem("top_movies_current_page", actualPage)

        window.scrollTo({top:0, behavior:"smooth"})
        
    }, [actualPage])

    return (
        <>

            <h2 className="title"> Top Movies </h2>

            {Array.isArray(topMovies) ?
                <CardList data={topMovies} />
                :
                <p className="failedFetch"> {topMovies} </p>
            }

            <Pagination totalPages={totalPages} actualPage={actualPage} setActualPage={setActualPage} />
            
        </>
    )

}

export default TopMovies