import { useState } from "react";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./Navbar.module.css"

// React Icons
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {

  const navigate = useNavigate()

  const [query, setQuery] = useState('')

  const handleQuery = (e) => {
    e.preventDefault()
    if(query == '' || query.trim == '') return
    navigate(`/searched?q=${query}`)
  }

  return (
    <nav className={styles.navbar}>
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