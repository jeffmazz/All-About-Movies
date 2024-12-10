import { createContext, useState } from "react"

const ApiKeyContext = createContext()

const ApiKeyProvider = ({children}) => {

    const [apiKey] = useState(import.meta.env.VITE_TMDB_API_KEY)

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    const fetchData = async(url) => {

        try {

            const response = await fetch(url, options)

            if(!response.ok) return 'Failed to fetch data from API'

            const data = await response.json()

            const originalArray = data.results
    
            const filteredArray = originalArray.map(item => ({
                id: item.id,
                backdrop_path: item.backdrop_path,
                poster_path: item.poster_path,
                profile_path: item.profile_path,
                title: item.title,
                name: item.name,
                original_title: item.original_title,
                original_name: item.original_name,
                overview: item.overview,
                vote_average: item.vote_average,
                vote_count: item.vote_count,
                release_date: item.release_date,
                first_air_date: item.first_air_date,
                known_for: item.known_for?.map(item => ({
                    id: item.id,
                    name: item.name,
                    title: item.title,
                    original_title: item.original_title,
                    vote_average: item.vote_average,
                })),
                popularity: item.popularity
            }))
    
            return filteredArray
    
        } catch(error) {
            console.log("Error:", error)
            return 'Failed to fetch data from API'
        }
    }

    return (
        <ApiKeyContext.Provider value={{apiKey, options, fetchData}}>
            {children}
        </ApiKeyContext.Provider>
    )

}

export {ApiKeyContext, ApiKeyProvider}