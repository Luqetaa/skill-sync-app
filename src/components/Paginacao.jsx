import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const getPageNumbers = (currentPage, totalPages, pageRange = 2) => {
  const pages = [];

  if (totalPages > 0) pages.push(1);

  if (currentPage > pageRange + 2) {
    pages.push('...');
  }

  for (let i = Math.max(2, currentPage - pageRange); i <= Math.min(totalPages - 1, currentPage + pageRange); i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - pageRange - 1) {
    pages.push('...');
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};


const Paginacao = ({ currentPage, totalPages, onPageChange, theme }) => {
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const buttonClasses = (page) => {
    const isActive = page === currentPage;
    
    if (isActive) {
      return 'bg-(--accent) text-(--texti)';
    }
    

    return 'hover:bg-(--container) text-(--text)'

  };

  return (
    <nav className="flex items-center justify-center space-x-2 mt-10">
      {/* Botão Anterior */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg text-(--text) hover:text-(--text)/70 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <FaChevronLeft />
      </button>

      {/* Números da Página */}
      {pageNumbers.map((page, index) =>
        page === '...' ? (
          <span
            key={`ellipsis-${index}`}
            className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${buttonClasses(page)}`}
          >
            {page}
          </button>
        )
      )}

      {/* Botão Próximo */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg text-(--text) hover:text-(--text)/70 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <FaChevronRight />
      </button>
    </nav>
  );
};

export default Paginacao;