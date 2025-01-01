import {useContext, useEffect, useState} from "react"

import { ApiKeyContext } from "../context/ApiKeyContext"

import CardList from "../components/CardList"
import Pagination from "../components/Pagination"

const Actors = () => {

    const [actors, setActors] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [actualPage, setActualPage] = useState(
        Number(sessionStorage.getItem("actors_current_page")) || 1
    )

    useEffect(() => {

        const getActors = async() => {
            const response = await fetch(`https://all-about-movies-backend.vercel.app/api/actors.js?pageNumber=${actualPage}`)
            const data = await response.json()
            if(!data.results) {
                setActors("Failed to fetch data")
                return
            }
            setActors(data.results)
            setTotalPages(500)
        }

        getActors()

        sessionStorage.setItem("actors_current_page", actualPage)

        window.scrollTo({top:0, behavior:"smooth"})

    }, [actualPage])

  return (
    <>

        <h2 className="title"> Actors </h2>

        {Array.isArray(actors) ? 
            <CardList data={actors}/>
            :
            <p className="failedFetch"> {actors} </p>
        }

        <Pagination totalPages={totalPages} actualPage={actualPage} setActualPage={setActualPage}/>

    </>
  )
}

export default Actors