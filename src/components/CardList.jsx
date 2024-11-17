import { useEffect, useRef, useState } from "react"
import { FaStar } from "react-icons/fa"

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
                
                </div>
                
            ))

        )}
    
    </section>

  )
}

export default CardList