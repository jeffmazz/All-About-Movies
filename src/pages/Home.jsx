import {useState, React, useRef, useEffect, useContext} from "react"

import styles from "./Home.module.css"

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaStar } from "react-icons/fa";

import { ApiKeyContext } from "../context/ApiKeyContext";

const Home = () => {

    const {apiKey, options} = useContext(ApiKeyContext)

    const refs = useRef([])
    const overlayRef = useRef(null)
    const galleryBlockerRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentIndexRef = useRef(currentIndex)

    useEffect(() => {
        currentIndexRef.current = currentIndex
    }, [currentIndex])

    const movies = [
        {
            "title": "The Penguin",
            "synopsis": "The series follows the rise of the villain Penguin (Oswald Cobblepot) in the streets of Gotham, showcasing his journey to become the city's most powerful crime boss, following the events of 'The Batman'.",
            "photo_path": "/penguin.png",
            "genre": "crime",
            "duration": "8 episodes",
            "rating": "To be rated",
            "curious_title": "The Penguin is a spin-off of 'The Batman'!",
            "curious_text": "The series is created as a spin-off from 'The Batman' (2022), with Colin Farrell reprising his role as Oswald Cobblepot. The show explores Penguin's rise to power in Gotham."
        },
        {
            "title": "Avengers: Endgame",
            "synopsis": "After the devastating events of Infinity War, the Avengers assemble once more to undo the destruction caused by Thanos and restore balance to the universe.",
            "photo_path": "/avengers.png",
            "genre": "action",
            "duration": "3h 1min",
            "rating": "5/5",
            "curious_title": "A record-breaking finale!",
            "curious_text": "Avengers: Endgame became the highest-grossing film of all time for a period, surpassing Avatar, until its own sequel reclaimed the title."
        },
        {
            "title": "Batman Begins",
            "synopsis": "Bruce Wayne's journey to becoming Batman begins as he confronts his inner demons and trains to fight the criminal underworld of Gotham City. He takes on the fearsome role to protect his city from the growing threats.",
            "photo_path": "/batman.png",
            "genre": "action",
            "duration": "2h 20min",
            "rating": "4.8/5",
            "curious_title": "Christopher Nolan's reboot of the Batman franchise!",
            "curious_text": "Batman Begins was the start of Christopher Nolan's iconic trilogy, which redefined the superhero genre with a darker and more realistic take on the character."
        },
        {
            "title": "WALL·E",
            "synopsis": "WALL·E is a robot who spends his days collecting trash on Earth until he meets Eve, a sleek and futuristic robot. He falls in love with her and embarks on an adventure across the galaxy to save the future of mankind.",
            "photo_path": "/wall-e.png",
            "genre": "animation",
            "duration": "1h 38min",
            "rating": "4.9/5",
            "curious_title": "WALL·E is inspired by a real-world object!",
            "curious_text": "WALL·E's design was inspired by a real-world vacuum cleaner robot, giving it a unique and lovable character, despite being an unlikely hero."
        }
    ]

    const changeImageFromButton = (value) => {
        overlayRef.current.classList.add(styles.show)
        setTimeout(() => {
            overlayRef.current.classList.remove(styles.show)
            setCurrentIndex(value)
        }, 300)
    }

    const changeImageFromCarousel = (value) => {
        overlayRef.current.classList.add(styles.show)
        galleryBlockerRef.current.classList.add(styles.active)
        setTimeout(() => {
            overlayRef.current.classList.remove(styles.show)
            setCurrentIndex(value)
        }, 300)
        setTimeout(() => {
            galleryBlockerRef.current.classList.remove(styles.active)
        }, 800)
    }

    useEffect(() => {

        const handleMouseOver = (index) => {
            if(currentIndexRef.current === index) return
            changeImageFromCarousel(index)
        }

        refs.current.forEach((ref, index) => {

            if(ref) {
                const listener = () => handleMouseOver(index)
                ref.addEventListener('mouseover', listener)
                ref.listener = listener
            }

        })

        return () => {
            refs.current.forEach((ref) => {
                if(ref && ref.listener) {
                    ref.removeEventListener('mouseover', ref.listener)
                    ref.listener = null
                }
            })
        }

    }, [])

    useEffect(() => {
        refs.current.forEach((ref, index) => {
            
            if(currentIndexRef.current === index) {
                ref.classList.add(styles.active)
                ref.classList.remove(styles.disabled)
            } else {
                ref.classList.remove(styles.active)
                ref.classList.add(styles.disabled)
            }

        })
    }, [currentIndex])

    const prevImage = () => {
        if(currentIndex === 0) {
            changeImageFromButton(3)
            return
        } else {
            changeImageFromButton(currentIndex-1)
        }
    }
    const nextImage = () => {
        if(currentIndex === 3) {
            changeImageFromButton(0)
            return
        } else {
            changeImageFromButton(currentIndex+1)
        }
    }

    const [carouselGenreList, setCarouselGenreList] = useState([])

    const fetchCarouselGenre = async (id) => {
        const response = await fetch(`https://all-about-movies-c5c6a89a6500.herokuapp.com/genre/${id}`)
        const res = await response.json()
        if(res.results) {
            setCarouselGenreList(res.results)
        } else {
            setCarouselGenreList(null)
        }
    }

    const carouselRef = useRef()
    const carouselPrevBtn = useRef()
    const carouselNextBtn = useRef()

    useEffect(() => {

        const disableAndEnableButtons = () => {
            carouselPrevBtn.current.disabled = true
            carouselNextBtn.current.disabled = true
            setTimeout(() => {
                carouselPrevBtn.current.disabled = false
                carouselNextBtn.current.disabled = false
            }, 700)
        }

        const prevBtnClickHandler = () => {

          let valueToScroll = carouselRef.current.clientWidth;
          if(carouselRef.current.scrollLeft === 0) {
            carouselRef.current.scrollBy({ top: 0, left: carouselRef.current.scrollWidth, behavior: 'smooth' });
            return
          }
          carouselRef.current.scrollBy({ top: 0, left: -valueToScroll, behavior: 'smooth' });
          disableAndEnableButtons()
        }
        
        const nextBtnClickHandler = () => {
          let valueToScroll = carouselRef.current.clientWidth;
          if(carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= carouselRef.current.scrollWidth) {
            carouselRef.current.scrollBy({ top: 0, left: -carouselRef.current.scrollWidth, behavior: 'smooth' });
            return
          }
          carouselRef.current.scrollBy({ top: 0, left: valueToScroll, behavior: 'smooth' });
          disableAndEnableButtons()
        }

        if (carouselPrevBtn.current && carouselNextBtn.current) {
            carouselPrevBtn.current.addEventListener('click', prevBtnClickHandler);
            carouselNextBtn.current.addEventListener('click', nextBtnClickHandler);
        }
        
        return () => {
          if (carouselPrevBtn.current && carouselNextBtn.current) {
            carouselPrevBtn.current.removeEventListener('click', prevBtnClickHandler);
            carouselNextBtn.current.removeEventListener('click', nextBtnClickHandler);
          }
        };

      }, [])

      useEffect(() => {
        let arr = [28,12,16,35,80,99,18,14,27,10749,10752]
        fetchCarouselGenre(arr[Math.floor(Math.random()*arr.length)])
      }, [])

    return (

        <>

            <div className={styles.container} style={{backgroundImage: `linear-gradient(to top, #000 0%, #000 10%, rgba(0,0,0,0) 100%), URL(${movies[currentIndex].photo_path})`}}>

                <div className={styles.overlay} ref={overlayRef}></div>

                <section className={styles.infos}>
                    <h3 className={styles.title}> {movies[currentIndex].title} </h3>
                    <p className={styles.synopsis}> {movies[currentIndex].synopsis} </p>
                </section>

                <section className={styles.gallery}>

                    {movies && movies.map((movie, index) => (

                        <div key={index}
                        className={styles.gallery_item}
                        ref={(movie) => refs.current[index] = movie}
                        style={{backgroundImage: `URL(${movie.photo_path})`}}>
                        </div>

                    ))}

                </section>

                <div className={styles.gallery_blocker} ref={galleryBlockerRef}></div>

                <button onClick={prevImage} className={styles.prevBtn}>
                    <GrPrevious />
                </button>

                <button onClick={nextImage} className={styles.nextBtn}>
                    <GrNext />
                </button>

            </div>

            <section className={styles.details}>
                <div>
                    <strong> Genre </strong>
                    <p> {movies[currentIndex].genre} </p>
                </div>
                <div>
                    <strong> Duration </strong>
                    <p> {movies[currentIndex].duration} </p>
                </div>
                <div>
                    <strong> Rating </strong>
                    <p> <FaStar className={styles.star}/> {movies[currentIndex].rating} </p>
                </div>
            </section>

            <div className={styles.extra}>
                <h3> Curious </h3>
                <h4> {movies[currentIndex].curious_title} </h4>
                <p> {movies[currentIndex].curious_text} </p>
            </div>

            <section className={styles.home_carousel_buttons}>
                <button style={{backgroundImage: `URL(/Ação.png)`}} onClick={() => fetchCarouselGenre(28)}> Action </button>
                <button style={{backgroundImage: `URL(/Aventura.png)`}} onClick={() => fetchCarouselGenre(12)}> Adventure </button>
                <button style={{backgroundImage: `URL(/Animação.png)`}} onClick={() => fetchCarouselGenre(16)}> Animation </button>
                <button style={{backgroundImage: `URL(/Comédia.png)`}} onClick={() => fetchCarouselGenre(35)}> Comedy </button>
                <button style={{backgroundImage: `URL(/Crime.png)`}} onClick={() => fetchCarouselGenre(80)}> Crime </button>
                <button style={{backgroundImage: `URL(/Documentario.png)`}} onClick={() => fetchCarouselGenre(99)}> Documentary </button>
                <button style={{backgroundImage: `URL(/Drama.png)`}} onClick={() => fetchCarouselGenre(18)}> Drama </button>
                <button style={{backgroundImage: `URL(/Fantasia.png)`}} onClick={() => fetchCarouselGenre(14)}> Fantasy </button>
                <button style={{backgroundImage: `URL(/Terror.png)`}} onClick={() => fetchCarouselGenre(27)}> Horror </button>
                <button style={{backgroundImage: `URL(/Romance.png)`}} onClick={() => fetchCarouselGenre(10749)}> Romance </button>
                <button style={{backgroundImage: `URL(/Guerra.png)`}} onClick={() => fetchCarouselGenre(10752)}> War </button>
                <h2> choose a genre above </h2>
            </section>

            <section className={styles.home_carousel_container}>

                <button className={`${styles.prevBtn} ${styles.home_carousel_prev_btn}`} ref={carouselPrevBtn}>
                    <GrPrevious/>
                </button>
                <button className={`${styles.nextBtn} ${styles.home_carousel_next_btn}`} ref={carouselNextBtn}>
                    <GrNext/>
                </button>

                <div className={styles.home_carousel} ref={carouselRef}>

                    {carouselGenreList.length === 0 ?
                    ( <div className={styles.home_loading}> Loading ... </div>)
                    :
                    (
                        carouselGenreList.map((item) => (

                            <div key={item.id} className={styles.home_carousel_item}>

                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title}
                                    className={styles.home_carousel_item_img}
                                />

                            </div>

                        ))                            
                    ) 
                    }

                </div>
                
            </section>
            
        </>
    )
}

export default Home