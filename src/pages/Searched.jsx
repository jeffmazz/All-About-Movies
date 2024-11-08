import { useState, useEffect } from "react";

// React Router Dom
import { useSearchParams } from "react-router-dom";

// React Icons
import { FaStar } from "react-icons/fa";

const Searched = () => {
    
    const apiKey = import.meta.env.VITE_TMDB_API_KEY

    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
        }
    }

    const [searchParams] = useSearchParams()
    const query = searchParams.get('q')    

    const [movies, setMovies] = useState([])

    useEffect(() => {

        const getMovies = async() => {

            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&language=en-US&page=1`, options)
                const res = await response.json()
                console.log(res.results)
                setMovies(res.results)
            } catch(err) {
                console.log(err)
            }
            
        }

        getMovies()
        
    }, [query])

    return (
        <>

            <h2 className="title"> Results of {query} </h2>

            {movies.length === 0 ? (
                <p className="loading"> Carregando... </p>
            )
            :
            (
                <section className="cards_section">

                    {movies.map((movie) => (

                        <div key={movie.id} className="card">

                            {!movie.backdrop_path ? '' : <img className="card_image" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}/> }
                            {(!movie.backdrop_path && movie.poster_path) && <img className="card_image" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/> }

                            {movie.title ? <div className="card_title"> <span> {movie.title} </span> </div> : ''}
                            {(!movie.title && movie.name) && <div className="card_title"> {movie.name} </div>}
                            {(!movie.title && !movie.original_name && !movie.name) && <div className="card_title"> <span> {movie.original_title} </span> </div>}
                            {(!movie.title && !movie.original_title && !movie.name) && <div className="card_title"> <span> {movie.original_name} </span> </div>}

                            {!movie.overview ? '' :
                                <details className="card_overview">
                                    <summary> <span> Overview </span> </summary>
                                    <p> {movie.overview} </p>
                                </details>
                            }
                            
                            {!movie.vote_average ? '' :
                                <div className="card_vote_average">
                                    <FaStar className="card_star_icon" /> <span> Vote Average: </span> {movie.vote_average}
                                </div>
                            }

                            {!movie.vote_count ? '' :
                                <div className="card_vote_count">
                                    <span> Vote Count: </span> {movie.vote_count}
                                </div>
                            }

                            {!movie.release_date ? '' :
                                <div>
                                    <span> Release: </span> <i>{movie.release_date}</i>
                                </div>
                            }

                            {(!movie.release_date && movie.first_air_date) &&
                                <div>
                                    <span> First Air Date: </span> <i> {movie.first_air_date} </i>
                                </div>
                            }

                        </div>

                    ))}

                </section>
            )}
        </>
    )

}

export default Searched