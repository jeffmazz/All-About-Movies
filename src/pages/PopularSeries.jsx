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
                const response = await fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', options)
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