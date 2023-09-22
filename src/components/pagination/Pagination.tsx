import React from 'react';
// import classNames from 'classnames';

import "./Pagination.scss";

export interface Props {
    page: number;
    totalPages: number;
    handlePagination: (page: number) => void;
}

const Pagination = ({
    page,
    totalPages,
    handlePagination,
}: Props) => {
    return (
        <div>
            <div className="pagination-wrapper">
                {page !== 1 && (
                    <button
                        onClick={() => handlePagination(page - 1)}
                        type="button"
                        className='page-item sides'
                    >
                        &lt;
                    </button>
                )}

                <button
                    onClick={() => handlePagination(1)}
                    type="button"
                    className={`page-item ${page === 1 ? 'active' : ''}`}
                >
                    {1}
                </button>

                {page > 3 && <div className="separator">...</div>}

                {page === totalPages && totalPages > 3 && (
                    <button
                        onClick={() => handlePagination(page - 2)}
                        type="button"
                        className="page-item"
                    >
                        {page - 2}
                    </button>
                )}

                {page > 2 && (
                    <button
                        onClick={() => handlePagination(page - 1)}
                        type="button"
                        className="page-item"
                    >
                        {page - 1}
                    </button>
                )}

                {page !== 1 && page !== totalPages && (
                    <button
                        onClick={() => handlePagination(page)}
                        type="button"
                        className='page-item active'
                    >
                        {page}
                    </button>
                )}

                {page < totalPages - 1 && (
                    <button
                        onClick={() => handlePagination(page + 1)}
                        type="button"
                        className="page-item"
                    >
                        {page + 1}
                    </button>
                )}

                {page === 1 && totalPages > 3 && (
                    <button
                        onClick={() => handlePagination(page + 2)}
                        type="button"
                        className="page-item"
                    >
                        {page + 2}
                    </button>
                )}

                {page < totalPages - 2 && <div className="separator">...</div>}

                <button
                    onClick={() => handlePagination(totalPages)}
                    type="button"
                    className={`page-item ${page === totalPages ? "active" : ""}`}
                >
                    {totalPages}
                </button>

                {page !== totalPages && (
                    <button
                        onClick={() => handlePagination(page + 1)}
                        type="button"
                        className='page-item sides'
                    >
                        &gt;
                    </button>
                )}
            </div>
        </div>
    );
};

export default Pagination;