// Hooks
import { useState, useEffect, useContext } from "react"

// Components
import CardList from "../components/CardList"

// Context
import { ApiKeyContext } from "../context/ApiKeyContext"

const TopSeries = () => {

    const {apiKey, options} = useContext(ApiKeyContext)

    const [topSeries, setTopSeries] = useState([])

    useEffect(() => {

        const getTopSeries = async() => {

            try {
                const response = await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', options)
                const res = await response.json()
                setTopSeries(res.results)
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