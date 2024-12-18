import { useState, useEffect, useContext } from "react"

import CardList from "../components/CardList"
import Pagination from "../components/Pagination"

import { ApiKeyContext } from "../context/ApiKeyContext"

const PopularSeries = () => {
  
    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [popularSeries, setPopularSeries] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [actualPage, setActualPage] = useState(
        sessionStorage.getItem('popular_series_current_page') || 1
    )

    useEffect(() => {

        const getPopularSeries = async() => {
            const url = `https://all-about-movies-backend.vercel.app/api/popular-series.js?pageNumber=${actualPage}`
            const data = await fetchData(url)
            if(!data.results) {
                setPopularSeries('Failed to fetch data')
                return
            }
            setPopularSeries(data.results)
            setTotalPages(400)
        }

        getPopularSeries()

        sessionStorage.setItem('popular_series_current_page', actualPage)

        window.scrollTo({top:0, behavior:"smooth"})
        
    }, [actualPage])

    return (
        <>

            <h2 className="title"> Popular Series </h2>
            
            {Array.isArray(popularSeries) ?
                <CardList data={popularSeries}/>
                :
                <p className="failedFetch"> {popularSeries} </p>
            }

            <Pagination totalPages={totalPages} actualPage={actualPage} setActualPage={setActualPage}/>

        </>
    )

}

export default PopularSeries