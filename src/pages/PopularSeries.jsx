// Hooks
import { useState, useEffect, useContext } from "react"

// Components
import CardList from "../components/CardList"

// Context
import { ApiKeyContext } from "../context/ApiKeyContext"

const PopularSeries = () => {
  
    const {apiKey, options} = useContext(ApiKeyContext)

    const [popularSeries, setPopularSeries] = useState([])

    useEffect(() => {

        const getPopularSeries = async() => {

            try {
                const response = await fetch('https://all-about-movies-c5c6a89a6500.herokuapp.com/series/popular')
                const res = await response.json()
                setPopularSeries(res.results)
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