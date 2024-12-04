import { useState } from "react";

import { useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css"

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