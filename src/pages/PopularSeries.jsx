import { useState, useEffect, useContext } from "react"

import CardList from "../components/CardList"

import { ApiKeyContext } from "../context/ApiKeyContext"

const PopularSeries = () => {
  
    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [popularSeries, setPopularSeries] = useState([])

    useEffect(() => {

        const getPopularSeries = async() => {

           const url = 'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1'
           const data = await fetchData(url)
           setPopularSeries(data)
            
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