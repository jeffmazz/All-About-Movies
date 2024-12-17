import { useEffect, useRef, useState } from "react"
import { FaStar } from "react-icons/fa"
import { BiMedal } from "react-icons/bi";
import KnownForCard from "./KnownForCard";

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
    
        {data.map((item, index) => (
        
            <div key={item.id} className={`card ${visibleItems.includes(index) ? 'show':''}`} ref={item => (references.current[index] = item)}>
                
                <img className={item?.backdrop_path || item?.poster_path ? 'card_image' : 'card_profile_pic'}
                    src={`https://image.tmdb.org/t/p/original${item?.backdrop_path ?? item?.poster_path ?? item?.profile_path ?? ''}`}
                    alt={item?.title ?? item?.name ?? 'No image available'}
                />
                <div className="card_title">
                  {item?.title ?? item?.name ?? item?.original_title ?? item?.original_name ?? 'No title available'}
                </div>
                
                {item?.overview &&
                    <details className="card_overview">
                        <summary> <span> Overview </span> </summary>
                        <p> {item.overview} </p>
                    </details>
                }
                {item?.vote_average &&
                    <div className="card_vote_average">
                        <FaStar className="card_star_icon" /> <span> Vote Average: </span> {item.vote_average}
                    </div>
                }
            
                {item?.vote_count &&
                    <div className="card_vote_count">
                        <span> Vote Count: </span> {item.vote_count}
                    </div>
                }
            
                {item?.release_date &&
                    <div>
                        <span> Release: </span> <i>{item.release_date}</i>
                    </div>
                }
            
                {item?.first_air_date &&
                    <div>
                        <span> First Air Date: </span> <i> {item.first_air_date} </i>
                    </div>
                }
                {Array.isArray(item.known_for) && item.known_for.length > 0 && 
                    (<details>
                        <summary className="card_summary"> Known for </summary>
                        <div className="card_details_content">
                            {item.known_for.map((known, index) => (
                                <KnownForCard key={index} knownFor={known}/>
                            ))}
                        </div>
                    </details>)
                }
                {item?.popularity &&
                    <div>
                        <span> Popularity: </span> {item.popularity} <BiMedal  className="popular_icon"/>
                    </div>
                }
            
            </div>
            
        ))}
    
    </section>

  )
}

export default CardList