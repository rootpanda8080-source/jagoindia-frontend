import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const Pagination = ({ current, total, onPageChange }) => {
  if (total <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        aria-label="Previous page"
      >
        <FiChevronLeft size={20} />
      </button>

      <div className="flex gap-2">
        {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-lg font-semibold transition ${
              current === page
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
        aria-label="Next page"
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  )
}
