import { Filter } from 'lucide-react';

export default function Filters() {
  return (
    <div className="w-80 bg-white rounded-lg shadow-lg p-6 h-fit">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-5 h-5 text-green-600" />
        <h2 className="text-lg font-semibold text-green-800">ตัวกรอง</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-green-700 mb-3">วันที่</h3>
          <div className="space-y-2">
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-green-700 mb-3">สถานที่</h3>
          <input
            type="text"
            placeholder="กรอกชื่อเมืองหรือสนาม"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button className="w-full mt-6 px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors">
          ล้างตัวกรองทั้งหมด
        </button>
      </div>
    </div>
  );
}
