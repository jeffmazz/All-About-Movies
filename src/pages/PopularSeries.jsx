import { useState, useEffect } from "react"

import CardList from "../components/CardList"

const PopularSeries = () => {
  
    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    const [popularSeries, setPopularSeries] = useState([])

    useEffect(() => {

        const getPopularSeries = async() => {

            try {
                const response = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
                const res = await response.json()
                setPopularSeries(res.results)
                console.log(res.results)
            } catch(err) {
                console.log(err)
            }
            
        }

        getPopularSeries()
        
    }, [])

    return (
        <>

            <h2 className="title"> Popular Series </h2>
            
            <CardList data={popularSeries}/>

        </>
    )

}

export default PopularSeries