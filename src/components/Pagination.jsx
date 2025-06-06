import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination() {
  const currentPage = 1;
  const totalPages = 5;

  return (
    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
        <span className="font-medium">20</span> results
      </div>

      <div className="flex items-center space-x-2">
        <button
          disabled={currentPage === 1}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === page
                  ? 'bg-green-600 text-white'
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-green-50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          disabled={currentPage >= totalPages}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
}
