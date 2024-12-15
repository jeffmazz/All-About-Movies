import React from "react"
import styles from "./Pagination.module.css"

import { GrCaretNext } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";

import { GrCaretPrevious } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";


const Pagination = ({ totalPages, actualPage, setActualPage }) => {

    const goToPage = (page) => {
        setActualPage(page);
    }

    return (
        <div className={styles.pagination_container}>

            <button onClick={() => goToPage(1)} disabled={actualPage === 1}>
                <GrChapterPrevious/>
            </button>

            <button onClick={() => goToPage(actualPage - 1)} disabled={actualPage === 1}>
                <GrCaretPrevious/>
            </button>

            <button className={styles.actualPage}>
                {actualPage}
            </button>
            
            <button onClick={() => goToPage(actualPage + 1)} disabled={actualPage === totalPages}>
                <GrCaretNext/>
            </button>

            <button onClick={() => goToPage(totalPages)} disabled={actualPage === totalPages}>
                <GrChapterNext/>
            </button>

        </div>
    );
};

export default Pagination;
