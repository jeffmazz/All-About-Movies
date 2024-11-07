// React Router Dom
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./Navbar.module.css"

// React Icons
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {

  const navigate = useNavigate()

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
        <div className={styles.navbar_input_block}>
            <input type="text" placeholder="Search here!" className={styles.navbar_input}/>
            <IoSearchSharp className={styles.navbar_input_icon} />
        </div>
    </nav>
  )
}

export default Navbar