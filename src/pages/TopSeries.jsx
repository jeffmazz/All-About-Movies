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
                const response = await fetch('https://all-about-movies-c5c6a89a6500.herokuapp.com/series/top')
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