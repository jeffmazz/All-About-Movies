import { useState, useEffect, useContext } from "react"

import CardList from "../components/CardList"

import { ApiKeyContext } from "../context/ApiKeyContext"

const TopSeries = () => {

    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [topSeries, setTopSeries] = useState([])

    useEffect(() => {

        const getTopSeries = async() => {

                const url = 'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1'
                const data = await fetchData(url)
                setTopSeries(data)
            
        }

        getTopSeries()
        
    }, [])

    return (
        <>

            <h2 className="title"> Top Series </h2>

            {Array.isArray(topSeries) ?
                <CardList data={topSeries} />
                :
                <p className="failedFetch"> {topSeries} </p>
            }

        </>
    )
}

export default TopSeries