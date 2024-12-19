import { useState, useEffect, useContext } from "react";

import { useSearchParams } from "react-router-dom";

import CardList from "../components/CardList";
import Pagination from "../components/Pagination";

import { ApiKeyContext } from "../context/ApiKeyContext";

const Searched = () => {
    
    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')

    const [searchedResults, setSearchedResults] = useState([])
    const [totalPages, setTotalPages] = useState()
    const [actualPage, setActualPage] = useState(1)

    useEffect(() => {
        setActualPage(1)
    }, [query])
    
    useEffect(() => {

        const getSearchedResults = async() => {
            const url = `https://all-about-movies-backend.vercel.app/api/searched.js?q=${query}&pageNumber=${actualPage}`
            const data = await fetchData(url)
            if(data.results.length === 0) {
                setSearchedResults('Your search returned no results')
                return
            }
            setSearchedResults(data.results)
            setTotalPages(data.totalPages)
        }

        getSearchedResults()

        window.scrollTo({top:0, behavior:"smooth"})
        
    }, [query, actualPage])

    return (
        <>

            <h2 className="title"> Results of {query} </h2>

            {Array.isArray(searchedResults) ?
                <CardList data={searchedResults}/>
                :
                <p className="failedFetch"> {searchedResults} </p>
            }

            <Pagination totalPages={totalPages} actualPage={actualPage} setActualPage={setActualPage} />

        </>
    )

}

export default Searched