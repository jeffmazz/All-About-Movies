import React from "react"
import { useState, useEffect } from "react"

// React Icons
import { FaStar } from "react-icons/fa";

const Home = () => {

    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    return (
        <>
            WELCOME
        </>
    )
}

export default Home