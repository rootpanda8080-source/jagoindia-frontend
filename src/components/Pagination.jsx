import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export const Pagination = ({ current, total, onPageChange }) => {
  if (total <= 1) return null

  // For large page numbers, show limited buttons
  const getPageButtons = () => {
    const pages = []
    const maxVisible = 5
    
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }
    
    pages.push(1)
    if (current > 3) pages.push('...')
    
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    if (current < total - 2) pages.push('...')
    pages.push(total)
    
    return pages
  }

  const pageButtons = getPageButtons()

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="p-2 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
        aria-label="Previous page"
      >
        <FiChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      <div className="flex gap-1">
        {pageButtons.map((page, idx) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${idx}`} className="px-3 py-2 text-gray-500 dark:text-gray-400">
                ...
              </span>
            )
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`min-w-[40px] h-10 rounded-lg font-semibold transition-all ${
                current === page
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                  : 'border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              {page}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="p-2 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md"
        aria-label="Next page"
      >
        <FiChevronRight size={20} />
      </button>

      {/* Page Info */}
      <span className="ml-4 text-sm text-gray-600 dark:text-gray-400">
        Page <strong>{current}</strong> of <strong>{total}</strong>
      </span>
    </div>
  )
}
