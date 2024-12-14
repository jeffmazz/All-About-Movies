import { useState, useEffect, useContext } from "react"

import CardList from "../components/CardList"

import { ApiKeyContext } from "../context/ApiKeyContext"

const PopularSeries = () => {
  
    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [popularSeries, setPopularSeries] = useState([])

    useEffect(() => {

        const getPopularSeries = async() => {

           const url = 'https://all-about-movies-backend.vercel.app/api/popular-series.js'
           const data = await fetchData(url)
           setPopularSeries(data.results)
            
        }

        getPopularSeries()
        
    }, [])

    return (
        <>

            <h2 className="title"> Popular Series </h2>
            
            {Array.isArray(popularSeries) ?
                <CardList data={popularSeries}/>
                :
                <p className="failedFetch"> {popularSeries} </p>
            }

        </>
    )

}

export default PopularSeries