// React
import {useContext, useEffect, useState} from "react"

// Context
import { ApiKeyContext } from "../context/ApiKeyContext"

// Components
import CardList from "../components/CardList"

const Actors = () => {

    const {apiKey, options} = useContext(ApiKeyContext)

    const [actors, setActors] = useState([])

    useEffect(() => {

        const getActors = async() => {
            try {
                const response = await fetch('https://all-about-movies-c5c6a89a6500.herokuapp.com/actors')
                const res = await response.json()
                setActors(res.results)
            } catch(err) {
                console.log(err)
            }
            
            if(response.ok) {
                const res = await response.json()
                setActors(res.results)
                console.log(res.results)
            }
        }

        getActors()

    }, [])

  return (
    <>

        <h2 className="title"> Actors </h2>

        <CardList data={actors}/>

    </>
  )
}

export default Actors