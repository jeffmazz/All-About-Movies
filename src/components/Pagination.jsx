import { useEffect, useState } from "react";

const Pagination = ({ totalPages, setActualPage }) => {
    const [actualPage, setActualPageState] = useState(1);

    useEffect(() => {
        setActualPage(actualPage);
    }, [actualPage, setActualPage]);

    const goToPrevPage = () => {
        setActualPageState(prevValue => prevValue - 1);
    };

    const goToNextPage = () => {
        setActualPageState(prevValue => prevValue + 1);
    };

    const goToPage = (number) => {
        setActualPageState(number);
    };

    return (
        <div className="pagination-container">
            <button onClick={goToPrevPage} disabled={actualPage === 1}>
                prev
            </button>

            {actualPage > 2 && (
                <div>
                    <span>...</span>
                    <button onClick={() => goToPage(1)}>1</button>
                </div>
            )}

            <button onClick={() => goToPage(actualPage - 1)} disabled={actualPage === 1}>
                {actualPage - 1}
            </button>
            <button className="active" disabled>
                {actualPage}
            </button>
            <button onClick={() => goToPage(actualPage + 1)} disabled={actualPage === totalPages}>
                {actualPage + 1}
            </button>

            {actualPage < totalPages - 2 && (
                <div>
                    <span>...</span>
                    <button onClick={() => goToPage(totalPages)}> {totalPages} </button>
                </div>
            )}

            <button onClick={goToNextPage} disabled={actualPage === totalPages}>
                next
            </button>
        </div>
    );
};

export default Pagination;
