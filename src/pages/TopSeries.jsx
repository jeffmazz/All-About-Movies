import { useState, useEffect } from "react"

// React Icons
import { FaStar } from "react-icons/fa"
import CardList from "../components/CardList"

const TopSeries = () => {

    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    const [topSeries, setTopSeries] = useState([])

    useEffect(() => {

        const getTopSeries = async() => {

            try {
                const response = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
                const res = await response.json()
                setTopSeries(res.results)
                console.log(res.results)
            } catch(err) {
                console.log(err)
            }
            
        }

        getTopSeries()
        
    }, [])

    return (
        <>

            <h2 className="title"> Top Series </h2>

            <CardList data={topSeries} />

        </>
    )
}

export default TopSeries