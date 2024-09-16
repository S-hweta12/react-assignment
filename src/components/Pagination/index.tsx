import React, { useState, useEffect } from "react";
import "./index.scss";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage, activePage, totalPages]);

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    let pages: number[] = [];
    const windowSize = 3;
    let startPage: number, endPage: number;

    if (activePage === 1) {
      startPage = 1;
      endPage = Math.min(windowSize, totalPages);
    } else if (activePage === totalPages) {
      startPage = Math.max(1, totalPages - windowSize + 1);
      endPage = totalPages;
    } else {
      startPage = Math.max(1, activePage - 1);
      endPage = Math.min(totalPages, activePage + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages.map((page) => (
      <button
        key={page}
        className={`pagination__page ${page === activePage ? "active" : ""}`}
        onClick={() => handleClick(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <button
        className="pagination__prev"
        disabled={activePage === 1}
        onClick={() => handleClick(activePage - 1)}
      >
        &lt;
      </button>

      <div className="pagination__pages">{renderPages()}</div>

      <button
        className="pagination__next"
        disabled={activePage === totalPages}
        onClick={() => handleClick(activePage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
