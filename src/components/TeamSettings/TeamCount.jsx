const TeamCount = ({ count, max }) => (
  <div className="flex-1 text-center">
    <p className="text-gray-700 mb-2">จำนวนคน</p>
    <div className="text-2xl font-bold border-2 border-gray-800 w-16 mx-auto p-2">
      {count}/{max}
    </div>
  </div>
);

export default TeamCount;
