import { MapPin, Calendar } from 'lucide-react';

export default function ResultCard({ matches }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <div className="flex">
        {/* Image */}
        <div className="w-48 h-32 flex-shrink-0">
          <img
            src={matches.image}
            alt={matches.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="mb-2">
            <h3 className="text-lg font-semibold text-green-800 mb-1">{matches.title}</h3>
            <p className="text-gray-600 text-sm">{matches.description}</p>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(matches.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{matches.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <div className="flex space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
                ดูข้อมูล
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-md hover:bg-green-800 transition-colors">
                ขอเตะด้วย!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
