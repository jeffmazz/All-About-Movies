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
                const response = await fetch(`https://all-about-movies-c5c6a89a6500.herokuapp.com/search`, {
                    method: 'POST',
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({query})
                })
                const res = await response.json()
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