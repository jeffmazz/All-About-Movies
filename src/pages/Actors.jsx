import {useContext, useEffect, useState} from "react"

import { ApiKeyContext } from "../context/ApiKeyContext"

import CardList from "../components/CardList"
import Pagination from "../components/Pagination"

const Actors = () => {

    const [actors, setActors] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [actualPage, setActualPage] = useState(1)

    useEffect(() => {

        const getActors = async() => {
            const response = await fetch(`https://all-about-movies-backend.vercel.app/api/actors.js?pageNumber=${actualPage}`)
            const data = await response.json()
            setActors(data.results)
            setTotalPages(50)
            // total pages bugado!
        }

        getActors()

    }, [actualPage])

  return (
    <>

        <h2 className="title"> Actors </h2>

        <Pagination totalPages={totalPages} setActualPage={setActualPage}/>

        {Array.isArray(actors) ? 
            <CardList data={actors}/>
            :
            <p className="failedFetch"> {actors} </p>
        }

    </>
  )
}

export default Actors