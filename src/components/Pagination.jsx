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

            <button onClick={() => goToPage(1)} disabled={actualPage === 1} aria-label="Go to page 1">
                <GrChapterPrevious/>
            </button>

            <button onClick={() => goToPage(Number(actualPage) - 1)} disabled={actualPage === 1} aria-label="Go to previous page">
                <GrCaretPrevious/>
            </button>

            <div className={styles.actual_page}>
                {actualPage}
            </div>
            
            <button onClick={() => goToPage(Number(actualPage) + 1)} disabled={actualPage === totalPages} aria-label="Go to next page">
                <GrCaretNext/>
            </button>

            <button onClick={() => goToPage(totalPages)} disabled={actualPage === totalPages} aria-label="Go to last page">
                <GrChapterNext/>
            </button>

        </div>
    );
};

export default Pagination;
