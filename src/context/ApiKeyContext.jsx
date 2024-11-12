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

    return (
        <ApiKeyContext.Provider value={{apiKey, options}}>
            {children}
        </ApiKeyContext.Provider>
    )

}

export {ApiKeyContext, ApiKeyProvider}