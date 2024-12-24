import React, { useState } from "react"
import styles from "./Pagination.module.css"

import { GrCaretNext } from "react-icons/gr";
import { GrChapterNext } from "react-icons/gr";

import { GrCaretPrevious } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";


const Pagination = ({ totalPages, actualPage, setActualPage }) => {

    const [inputValue, setInputValue] = useState(actualPage)

    const handlePageChange = (page) => {
        if(page >= 1 && page <= totalPages) {
            setActualPage(page)
            setInputValue(page)
        }
    }

    const handleInputChange = (e) => {
        const value = e.target.value
        if(/^\d*/.test(value)) {
            setInputValue(value === "" ? "" : Number(value))
        }
    }

    const handleInputSubmit = (e) => {
        e.preventDefault()
        if(inputValue >= 1 && inputValue <= totalPages) {
            setActualPage(inputValue)
        } else {
            setInputValue(actualPage)
        }
    }

    return (
        <div className={styles.pagination_container}>

            <button onClick={() => handlePageChange(1)} disabled={actualPage === 1} aria-label="Go to page 1">
                <GrChapterPrevious/>
            </button>

            <button onClick={() => handlePageChange(Number(actualPage) - 1)} disabled={actualPage === 1} aria-label="Go to previous page">
                <GrCaretPrevious/>
            </button>

            <div className={styles.actual_page}>
                <form onSubmit={handleInputSubmit}>
                    <input type="text" value={inputValue} onChange={handleInputChange}/>
                </form>
                <span> of </span>
                <span> {totalPages} </span>
            </div>
            
            <button onClick={() => handlePageChange(Number(actualPage) + 1)} disabled={actualPage === totalPages} aria-label="Go to next page">
                <GrCaretNext/>
            </button>

            <button onClick={() => handlePageChange(totalPages)} disabled={actualPage === totalPages} aria-label="Go to last page">
                <GrChapterNext/>
            </button>

        </div>
    );
};

export default Pagination;
