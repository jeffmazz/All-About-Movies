import { createContext, useState } from "react"

const ApiKeyContext = createContext()

const ApiKeyProvider = ({children}) => {

    const [apiKey] = useState(import.meta.env.VITE_TMDB_API_KEY)

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
        }
    }

    const fetchData = async(url) => {

        try {
            const response = await fetch(url)
            if(!response.ok) return 'Failed to fetch data from API'
            const data = await response.json()
            return data
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
