import React, { useState } from "react";
import "./Paging.css";

const Paging = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPageParent,
}) => {
  const [currentPage, setCurrentPage] = useState(currentPageParent);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? "active" : ""}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="paging">
      <ul className="page-numbers">
        <li>
          <button onClick={handlePrevClick} disabled={currentPage === 1}>
            Prev
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Paging;
