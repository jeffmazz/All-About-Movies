import {useState, React, useRef, useEffect} from "react"

import styles from "./Home.module.css"

import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";


const Home = () => {

    const refs = useRef([])

    const movies = [
        {
            title: "Wall-e",
            synopsis: "Após entulhar a Terra de lixo e poluir a atmosfera com gases tóxicos, a humanidade deixou o planeta e passou a viver em uma gigantesca nave. O plano era que o retiro durasse alguns poucos anos, com robôs sendo deixados para limpar o planeta. WALL-E é o último destes robôs, e sua vida consiste em compactar o lixo existente no planeta. Até que um dia surge repentinamente uma nave, que traz um novo e moderno robô: Eva. A princípio curioso, WALL-E se apaixona e resolve segui-la por toda a galáxia.",
            photo_path: "/wall-e.jpeg"
        },
        {
            title: "Spider-Man",
            synopsis: "Depois de se reunir com Gwen Stacy, Homem-Aranha é jogado no multiverso. Lá, o super-herói aracnídeo encontra uma numerosa equipe encarregada de proteger sua própria existência.",
            photo_path: "/spiderman.jpg"
        },
        {
            title: "John Wick",
            synopsis: "O filme acompanha John Wick (Keanu Reeves), um assassino aposentado que volta a ativa por vingança e começa a ser perseguido pelos maiores assassinos do mundo.",
            photo_path: "/johnwick.jpeg"
        },
        
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const overlayRef = useRef(null)

    useEffect(() => {

        refs.current.forEach((ref, index) => {
            ref.addEventListener('mouseover', () => {
                setCurrentIndex(index)
            })
        })

    })
        
    const prevImage = () => {
        if(currentIndex === 0) {
            setTimeout(() => {
                setCurrentIndex(2)
            }, 300)
            return
        }
        setCurrentIndex((prevIndex) => prevIndex - 1)
    }
    
    const nextImage = () => {
        if(currentIndex === 2) {
            setTimeout(() => {
                setCurrentIndex(0)
            }, 300)
            return
        }
        setCurrentIndex((prevIndex) => prevIndex + 1)
    }

    const showOverlay = () => {

        if(overlayRef.current) {
            overlayRef.current.classList.add(styles.show)

            setTimeout(() => {
                if(overlayRef.current) {
                    overlayRef.current.classList.remove(styles.show)
                }
            }, 300)
        }

    }

    useEffect(() => {
        showOverlay()
    }, [currentIndex])

    return (

        <>

            <div className={styles.container} style={{backgroundImage: `linear-gradient(to top, #000 0%, #000 10%, rgba(0,0,0,0) 100%), URL(${movies[currentIndex].photo_path})`}}>

                <div className={styles.overlay} ref={overlayRef}>

                </div>

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