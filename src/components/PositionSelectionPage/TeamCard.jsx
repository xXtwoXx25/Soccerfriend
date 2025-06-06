import React from "react";

const renderSkillLevel = (level) => {
  switch (level) {
    case "beginner":
      return "มือใหม่";
    case "intermediate":
      return "ปานกลาง";
    case "advanced":
      return "เล่นประจำ";
    default:
      return "ไม่ระบุ";
  }
};

const TeamCard = ({ team, selectedPosition, onJoin }) => (
  <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-5 transition-all duration-300 shadow-md hover:-translate-y-2 hover:shadow-xl hover:border-green-500 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500"></div>
    
    {team.logoUrl && (
      <img
        src={`http://localhost:8080${team.logoUrl}`}
        alt="โลโก้ทีม"
        className="w-[60px] h-[60px] object-cover rounded-md"
      />
    )}
    
    <h5 className="text-gray-800 text-lg font-bold mt-0 mb-4 pt-1">{team.teamName}</h5>
    
    <div className="space-y-2">
      <p className="text-gray-600 text-sm">
        <span className="font-semibold text-gray-800">รายละเอียด:</span> {team.teamDetail}
      </p>
      <p className="text-gray-600 text-sm">
        <span className="font-semibold text-gray-800">วันเล่น:</span> {team.playDate}
      </p>
      <p className="text-gray-600 text-sm">
        <span className="font-semibold text-gray-800">เวลา:</span> {team.playTime}
      </p>
      <p className="text-gray-600 text-sm">
        <span className="font-semibold text-gray-800">ทักษะ:</span> {renderSkillLevel(team.skillLevel)}
      </p>
      <p className="text-gray-600 text-sm">
        <span className="font-semibold text-gray-800">สนาม:</span> {team.homeStadium || "ไม่ระบุ"}
      </p>
    </div>

    <button 
      onClick={onJoin}
      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white border-none py-3 px-5 rounded-lg text-base font-bold cursor-pointer transition-all duration-300 mt-4 shadow-md hover:from-green-600 hover:to-green-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
    >
      เข้าร่วมทีม
    </button>
    
    <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none py-3 px-5 rounded-lg text-base font-bold cursor-pointer transition-all duration-300 mt-2 shadow-md hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0">
      รายละเอียดทีม
    </button>
  </div>
);

export default TeamCard;
