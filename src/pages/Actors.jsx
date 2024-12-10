import {useContext, useEffect, useState} from "react"

import { ApiKeyContext } from "../context/ApiKeyContext"

import CardList from "../components/CardList"

const Actors = () => {

    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const [actors, setActors] = useState([])

    useEffect(() => {

        const getActors = async() => {
            const url = 'https://api.themoviedb.org/3/person/popular?language=en-US&page=1'
            const data = await fetchData(url)
            setActors(data)
        }

        getActors()

    }, [])

  return (
    <>

        <h2 className="title"> Actors </h2>

        {Array.isArray(actors) ? 
            <CardList data={actors}/>
            :
            <p className="failedFetch"> {actors} </p>
        }

    </>
  )
}

export default Actors