// Hooks
import { useState, useEffect, useContext } from "react";

// React Router Dom
import { useSearchParams } from "react-router-dom";

// Components
import CardList from "../components/CardList";

// Context
import { ApiKeyContext } from "../context/ApiKeyContext";

const Searched = () => {
    
    const {apiKey, options} = useContext(ApiKeyContext)

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