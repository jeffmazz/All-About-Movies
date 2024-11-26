import {useState, React, useRef, useEffect} from "react"

import styles from "./Home.module.css"

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";


const Home = () => {

    const refs = useRef([])
    const overlayRef = useRef(null)
    const carouselBlockerRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const currentIndexRef = useRef(currentIndex)

    useEffect(() => {
        currentIndexRef.current = currentIndex
    }, [currentIndex])

    const movies = [
        {
            title: "Wall-e",
            synopsis: "WALL-E é um robô que vive compactando lixo na Terra até conhecer Eva, por quem se apaixona e a segue por toda a galáxia.",
            photo_path: "/wall-e.jpeg"
        },
        {
            title: "Spider-Man",
            synopsis: "Homem-Aranha se junta a Gwen Stacy e viaja pelo multiverso, enfrentando desafios ao lado de uma equipe de heróis aracnídeos.",
            photo_path: "/spiderman.jpg"
        },
        {
            title: "John Wick",
            synopsis: "John Wick, um assassino aposentado, busca vingança e acaba sendo perseguido por assassinos perigosos de todo o mundo.",
            photo_path: "/johnwick.jpeg"
        },
        
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
        carouselBlockerRef.current.classList.add(styles.active)
        setTimeout(() => {
            overlayRef.current.classList.remove(styles.show)
            setCurrentIndex(value)
        }, 300)
        setTimeout(() => {
            carouselBlockerRef.current.classList.remove(styles.active)
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
            changeImageFromButton(2)
            return
        } else {
            changeImageFromButton(currentIndex-1)
        }
    }
    const nextImage = () => {
        if(currentIndex === 2) {
            changeImageFromButton(0)
            return
        } else {
            changeImageFromButton(currentIndex+1)
        }
    }

    return (

        <>

            <div className={styles.container} style={{backgroundImage: `linear-gradient(to top, #000 0%, #000 10%, rgba(0,0,0,0) 100%), URL(${movies[currentIndex].photo_path})`}}>

                <div className={styles.overlay} ref={overlayRef}></div>

                <section className={styles.infos}>
                    <h3 className={styles.title}> {movies[currentIndex].title} </h3>
                    <p className={styles.synopsis}> {movies[currentIndex].synopsis} </p>
                </section>

                <section className={styles.carousel}>

                    {movies && movies.map((movie, index) => (

                        <div key={index}
                        className={styles.carousel_item}
                        ref={(movie) => refs.current[index] = movie}
                        style={{backgroundImage: `URL(${movie.photo_path})`}}>
                        </div>

                    ))}

                </section>

                <div className={styles.carousel_blocker} ref={carouselBlockerRef}></div>

                <button onClick={prevImage} className={styles.prevBtn}>
                    <GrPrevious />
                </button>

                <button onClick={nextImage} className={styles.nextBtn}>
                    <GrNext />
                </button>

            </div>
            
        </>
    )
}

export default Home