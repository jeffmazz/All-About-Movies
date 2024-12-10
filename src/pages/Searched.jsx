import { useState, useEffect, useContext } from "react";

import { useSearchParams } from "react-router-dom";

import CardList from "../components/CardList";

import { ApiKeyContext } from "../context/ApiKeyContext";

const Searched = () => {
    
    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')

    const [searchedResults, setSearchedResults] = useState([])

    useEffect(() => {

        const getSearchedResults = async() => {

            const url = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`
            const data = await fetchData(url)
            setSearchedResults(data)
            
        }

        getSearchedResults()
        
    }, [query])

    return (
        <>

            <h2 className="title"> Results of {query} </h2>

            {Array.isArray(searchedResults) ?
                <CardList data={searchedResults}/>
                :
                <p className="failedFetch"> {searchedResults} </p>
            }

        </>
    )

}

export default Searched