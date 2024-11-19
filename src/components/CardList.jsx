import { useEffect, useRef, useState } from "react"
import { FaStar } from "react-icons/fa"
import { BiMedal } from "react-icons/bi";


const CardList = ({data}) => {

    const references = useRef([])
    const [visibleItems, setVisibleItems] = useState([])

    const checkVisibility = () => {

        const visibleIndexes = []

        references.current.forEach((div, index) => {
            if(div) {
                const topRect = div.getBoundingClientRect().top
                const innerHeight = window.innerHeight
                if(topRect <= innerHeight) {
                    visibleIndexes.push(index)
                }
            }
        })

        setVisibleItems(visibleIndexes)
    }

    useEffect(() => {
        checkVisibility()
        window.addEventListener('scroll', checkVisibility)
        return () => {
            window.removeEventListener('scroll', checkVisibility)
        }
    },[data])

  return (
    
    <section className="cards_section">
    
        {data.length === 0 ? (
            <p className="loading"> Carregando... </p>
        )
        :
        (
            data.map((item, index) => (
            
                <div key={item.id} className={`card ${visibleItems.includes(index) ? 'show':''}`} ref={item => (references.current[index] = item)}>
                    
                    {!item.backdrop_path ? '' : <img className="card_image" src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt={item.title}/> }
                    {(!item.backdrop_path && item.poster_path) && <img className="card_image" src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt={item.title}/> }
                    {(!item.backdrop_path && !item.poster_path) && <img className="card_profile_pic" src={`https://image.tmdb.org/t/p/original${item.profile_path}`} alt={item.name}/>}
                    
                    {item.title ? <div className="card_title"> <span> {item.title} </span> </div> : ''}
                    {(!item.title && item.name) && <div className="card_title"> {item.name} </div>}
                    {(!item.title && !item.original_name && !item.name) && <div className="card_title"> <span> {item.original_title} </span> </div>}
                    {(!item.title && !item.original_title && !item.name) && <div className="card_title"> <span> {item.original_name} </span> </div>}
            
                    {!item.overview ? '' :
                        <details className="card_overview">
                            <summary> <span> Overview </span> </summary>
                            <p> {item.overview} </p>
                        </details>
                    }

                    {!item.vote_average ? '' :
                        <div className="card_vote_average">
                            <FaStar className="card_star_icon" /> <span> Vote Average: </span> {item.vote_average}
                        </div>
                    }
                
                    {!item.vote_count ? '' :
                        <div className="card_vote_count">
                            <span> Vote Count: </span> {item.vote_count}
                        </div>
                    }
                
                    {!item.release_date ? '' :
                        <div>
                            <span> Release: </span> <i>{item.release_date}</i>
                        </div>
                    }
                
                    {(!item.release_date && item.first_air_date) &&
                        <div>
                            <span> First Air Date: </span> <i> {item.first_air_date} </i>
                        </div>
                    }

                    {!item.known_for ? "" : 
                        <details>

                            <summary className="card_summary"> Known for </summary>

                            <div className="card_details_content">

                                {item.known_for[0].title ? <div className="card_known_for_title"> {item.known_for[0].title} <span> {item.known_for[0].vote_average} <FaStar/> </span> </div> : ''}
                                {(!item.known_for[0].title && item.known_for[0].original_title) && <div className="card_known_for_title"> {item.known_for[0].orignal_title} <span> {item.known_for[0].vote_average} <FaStar/> </span> </div>}
                                {(!item.known_for[0].title && !item.known_for[0].original_title) && <div className="card_known_for_title"> {item.known_for[0].name} <span> {item.known_for[0].vote_average} <FaStar/> </span> </div>}

                                {item.known_for[1].title ? <div className="card_known_for_title"> {item.known_for[1].title} <span> {item.known_for[0].vote_average} <FaStar/> </span>  </div> : ''}
                                {(!item.known_for[1].title && item.known_for[1].original_title) && <div className="card_known_for_title"> {item.known_for[1].orignal_title} <span> {item.known_for[0].vote_average} <FaStar/> </span>  </div>}
                                {(!item.known_for[1].title && !item.known_for[1].original_title) && <div className="card_known_for_title"> {item.known_for[1].name} <span> {item.known_for[0].vote_average} <FaStar/> </span>  </div>}

                                {item.known_for[2].title ? <div className="card_known_for_title"> {item.known_for[2].title} <span> {item.known_for[0].vote_average} <FaStar/> </span>  </div> : ''}
                                {(!item.known_for[2].title && item.known_for[2].original_title) && <div className="card_known_for_title"> {item.known_for[2].orignal_title}  <span> {item.known_for[0].vote_average} <FaStar/> </span>  </div>}
                                {(!item.known_for[2].title && !item.known_for[2].original_title) && <div className="card_known_for_title"> {item.known_for[2].name}  <span> {item.known_for[0].vote_average} <FaStar/> </span>  </div>}

                            </div>

                        </details>
                    }

                    {!item.popularity ? '' : <div> <span> Popularity: </span> {item.popularity} <BiMedal  className="popular_icon"/>

                    </div>}
                
                </div>
                
            ))

        )}
    
    </section>

  )
}

export default CardList