import { useState, useEffect } from "react";

// React Router Dom
import { useSearchParams } from "react-router-dom";

import CardList from "../components/CardList";

const Searched = () => {
    
    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')    

    const [searchedResults, setSearchedResults] = useState([])

    useEffect(() => {

        const getSearchedResults = async() => {

            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, options)
                const res = await response.json()
                console.log(res.results)
                setSearchedResults(res.results)
            } catch(err) {
                console.log(err)
            }
            
        }

        getSearchedResults()
        
    }, [query])

    return (
        <>

            <h2 className="title"> Results of {query} </h2>

            <CardList data={searchedResults}/>

        </>
    )

}

export default Searched