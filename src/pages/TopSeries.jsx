import { useState, useEffect, useContext } from "react"

import CardList from "../components/CardList"
import Pagination from "../components/Pagination"

import { ApiKeyContext } from "../context/ApiKeyContext"

const TopSeries = () => {

    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [topSeries, setTopSeries] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [actualPage, setActualPage] = useState(
        Number(sessionStorage.getItem("top_series_current_page")) || 1
    )

    useEffect(() => {

        const getTopSeries = async() => {
            const url = `https://all-about-movies-backend.vercel.app/api/top-series.js?pageNumber=${actualPage}`
            const data = await fetchData(url)
            if(!data.results) {
                setTopSeries('Failed to fetch data')
                return
            }
            setTopSeries(data.results)
            setTotalPages(105)
        }

        getTopSeries()
        
        sessionStorage.setItem("top_series_current_page", actualPage)

        window.scrollTo({top:0, behavior:"smooth"})
        
    }, [actualPage])
    

    return (
        <>

            <h2 className="title"> Top Series </h2>

            {Array.isArray(topSeries) ?
                <CardList data={topSeries} />
                :
                <p className="failedFetch"> {topSeries} </p>
            }

            <Pagination totalPages={totalPages} actualPage={actualPage} setActualPage={setActualPage} />

        </>
    )
}

export default TopSeries