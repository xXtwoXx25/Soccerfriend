const TeamHeader = ({ onInvite }) => (
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold text-gray-800">หน้าทีม setting</h1>
    <button 
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
      onClick={onInvite}
    >
      เชิญ
    </button>
  </div>
);

export default TeamHeader;
