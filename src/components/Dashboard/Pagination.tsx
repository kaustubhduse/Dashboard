import React from 'react';

interface PaginationProps {
  usersPerPage: number;
  totalUsers: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // Calculate the range of pages to display
  const maxVisiblePages = 4;
  let startPage = currentPage <= maxVisiblePages ? 1 : currentPage - Math.floor(maxVisiblePages / 2);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  // Ensure the range is within valid bounds
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Push the page numbers into the array
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-[4%]">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          {/* Previous Button */}
          <li>
            <a
              href="#"
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              className="flex items-center justify-center px-4 py-2 h-10 ms-0 leading-tight text-white bg-gray-800 border border-e-0 border-gray-600 rounded-s-lg hover:bg-gray-700 hover:text-gray-300 dark:bg-gray-900 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              Previous
            </a>
          </li>

          {/* Page Numbers */}
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
                href="#"
                onClick={() => paginate(number)}
                className={`flex items-center justify-center px-4 py-2 h-10 leading-tight ${
                  number === currentPage
                    ? 'text-white bg-gray-600 border border-gray-700 hover:bg-gray-500 hover:text-white dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600'
                    : 'text-gray-400 bg-gray-800 border border-gray-600 hover:bg-gray-700 hover:text-gray-300 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-400'
                }`}
              >
                {number}
              </a>
            </li>
          ))}

          {/* Next Button */}
          <li>
            <a
              href="#"
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              className="flex items-center justify-center px-4 py-2 h-10 leading-tight text-white bg-gray-800 border border-gray-600 rounded-e-lg hover:bg-gray-700 hover:text-gray-300 dark:bg-gray-900 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
