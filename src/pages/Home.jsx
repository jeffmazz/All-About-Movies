import {useState, React, useRef, useEffect, useContext} from "react"

import styles from "./Home.module.css"

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaStar } from "react-icons/fa";

import { ApiKeyContext } from "../context/ApiKeyContext";

import { useTranslation } from "react-i18next";

const Home = () => {

    const {apiKey, options, fetchData} = useContext(ApiKeyContext)

    const refs = useRef([])
    const overlayRef = useRef(null)
    const galleryBlockerRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentIndexRef = useRef(currentIndex)

    const { t, i18n } = useTranslation()
    
    useEffect(() => {
        i18n.changeLanguage(document.documentElement.lang)
    }, [document.documentElement.lang])

    useEffect(() => {
        currentIndexRef.current = currentIndex
    }, [currentIndex])

    const movies = t('movies', { returnObjects: true })

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
                if(ref?.listener) {
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
        const url = `https://all-about-movies-backend.vercel.app/api/genres.js?id=${id}`
        const data = await fetchData(url)
        setCarouselGenreList(data)
        carouselRef.current.scrollTo({top: 0, left: 0, behavior: 'instant'})
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
                    <h3 className={styles.title} translate="no"> {movies[currentIndex].title} </h3>
                    <p className={styles.synopsis} translate="no"> {movies[currentIndex].synopsis} </p>
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

                <button onClick={prevImage} className={styles.prevBtn} aria-label="Go to previous gallery image">
                    <GrPrevious />
                </button>

                <button onClick={nextImage} className={styles.nextBtn} aria-label="Go to next gallery image">
                    <GrNext />
                </button>

            </div>

            <section className={styles.details}>
                <div>
                    <strong> Genre </strong>
                    <p translate="no"> {movies[currentIndex].genre} </p>
                </div>
                <div>
                    <strong> Duration </strong>
                    <p translate="no"> {movies[currentIndex].duration} </p>
                </div>
                <div>
                    <strong> Rating </strong>
                    <p translate="no"> <FaStar className={styles.star}/> {movies[currentIndex].rating} </p>
                </div>
            </section>

            <div className={styles.extra}>
                <h3> Curious </h3>
                <h4 translate="no"> {movies[currentIndex].curious_title} </h4>
                <p translate="no"> {movies[currentIndex].curious_text} </p>
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

                <button className={`${styles.prevBtn} ${styles.home_carousel_prev_btn}`} ref={carouselPrevBtn} aria-label="scrolls to left on genre list carousel">
                    <GrPrevious/>
                </button>
                <button className={`${styles.nextBtn} ${styles.home_carousel_next_btn}`} ref={carouselNextBtn} aria-label="scrolls to right on genre list carousel">
                    <GrNext/>
                </button>

                <div className={styles.home_carousel} ref={carouselRef}>

                    {Array.isArray(carouselGenreList) ?
                        
                        carouselGenreList.map((item) => (
                            <div key={item.id} className={styles.home_carousel_item}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title}
                                    className={styles.home_carousel_item_img}
                                />
                            </div>
                        ))
                        :
                        <p className="failedFetch"> {carouselGenreList} </p>
                    
                    }

                </div>
                
            </section>
            
        </>
    )
}

export default Home