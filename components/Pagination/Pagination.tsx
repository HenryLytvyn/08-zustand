import React from 'react';
import css from './Pagination.module.css';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (nextPage: number) => void;
  maxVisible: number;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  maxVisible = 5,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const createRange = () => {
    const delta = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - delta);
    let end = Math.min(totalPages, currentPage + delta);

    if (currentPage <= delta) {
      end = Math.min(totalPages, maxVisible);
    }

    if (currentPage + delta > totalPages) {
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pages = createRange();

  function handleClick(page: number) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  }

  return (
    <nav aria-label="Pagination">
      <ul className={css.pagination}>
        <li className={css.pageItem}>
          <a
            href="#"
            className={css.pageLink}
            onClick={e => {
              e.preventDefault();
              handleClick(currentPage - 1);
            }}
            aria-disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ←
          </a>
        </li>

        {pages.map(page => (
          <li
            key={page}
            className={`${css.pageItem} ${page === currentPage ? css.active : ''}`}
          >
            <a
              href="#"
              className={css.pageLink}
              aria-current={page === currentPage ? 'page' : undefined}
              onClick={e => {
                e.preventDefault();
                handleClick(page);
              }}
            >
              {page}
            </a>
          </li>
        ))}

        <li className={css.pageItem}>
          <a
            href="#"
            className={css.pageLink}
            onClick={e => {
              e.preventDefault();
              handleClick(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            →
          </a>
        </li>
      </ul>
    </nav>
  );
}
