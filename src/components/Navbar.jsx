import { useState } from "react";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./Navbar.module.css"

// React Icons
import { IoSearchSharp } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

const Navbar = () => {

  const navigate = useNavigate()

  const [query, setQuery] = useState('')

  const handleQuery = (e) => {
    e.preventDefault()
    if(query == '' || query.trim() == '') return
    navigate(`/searched?q=${query}`)
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleNavigate = (url) => {
    handleSidebar()
    navigate(`${url}`)
  }

  return (
    <nav className={styles.navbar}>
        {/*
        <ul className={styles.navbar_ul}>
            <li className={styles.navbar_title}>
              <span> Movies </span>
              <ul className={styles.navbar_title_list}>
                <li onClick={() => navigate('/top_movies')}> Top Rated Movies </li>
                <li onClick={() => navigate('/popular_movies')}> Most Popular Movies </li>
              </ul>
            </li>
            <li className={styles.navbar_title}>
              <span> Series </span>
              <ul className={styles.navbar_title_list}>
                <li onClick={() => navigate('/top_series')}> Top Rated Series </li>
                <li onClick={() => navigate('/popular_series')}> Most Popular Series </li>
              </ul>
            </li>
        </ul>
        */}

        <div className={`${styles.overlay} ${isSidebarOpen ? styles.opened : ''}`}></div>

        <RxHamburgerMenu className={styles.burger_button} onClick={() => handleSidebar()}/>

        <nav className={`${styles.sidebar} ${isSidebarOpen ? styles.opened : ''}`}>
          
          <IoClose className={styles.close_sidebar_button} onClick={() => handleSidebar()}/>

          <section className={styles.sidebar_topics}>

            <h3 onClick={() => handleNavigate('/')}> Home </h3>

            <h3 onClick={() => handleNavigate('/actors')}> Actors </h3>

            <div className={styles.topic}>
              <h3> Movies </h3>
              <ul>
                <li onClick={() => handleNavigate('/top_movies')}> Top Movies </li>
                <li onClick={() => handleNavigate('/popular_movies')}> Popular Movies </li>
              </ul>
            </div>

            <div className={styles.topic}>
              <h3> Series </h3>
              <ul>
                <li onClick={() => handleNavigate('/top_series')}> Top Series </li>
                <li onClick={() => handleNavigate('/popular_series')}> Popular Series </li>
              </ul>
            </div>

          </section>

        </nav>


        <form className={styles.navbar_form} onSubmit={handleQuery}>
            <input type="text" placeholder="Search here!" className={styles.navbar_input} onChange={(e) => setQuery(e.target.value)}/>
            <button type="submit" className={styles.navbar_button}>
              <IoSearchSharp/>
            </button>
        </form>
    </nav>
  )
}

export default Navbar