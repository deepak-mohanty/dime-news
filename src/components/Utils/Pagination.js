import React, {useState} from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({perPage, totalPages, currentPage, handlePageChange}) => {

    // const [currentPage, setCurrentPage] = useState(0);

    const PER_PAGE = perPage;
    const pageCount = Math.ceil(totalPages / PER_PAGE);

    return (
        <React.Fragment>
            <ReactPaginate 
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                pageRange={2}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                pageClassName={'paginate-li'}
                onPageChange={handlePageChange}
                activeClassName={"pagination__link--active"}
            />
        </React.Fragment>
    )
}

export default Pagination
