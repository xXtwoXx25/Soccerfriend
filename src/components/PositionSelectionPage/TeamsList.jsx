import React from "react";
import TeamCard from "./TeamCard";

const TeamsList = ({ teams, selectedPosition, onJoinTeam }) => (
  <div className="bg-white/95 p-6 rounded-2xl shadow-lg">
    <h4 className="text-gray-800 text-2xl m-0 mb-5 text-center font-bold">
      ทีมที่ต้องการตำแหน่งนี้ ({teams.length} ทีม)
    </h4>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {teams.map((team) => (
        <TeamCard
          key={team.id}
          team={team}
          selectedPosition={selectedPosition}
          onJoin={() => onJoinTeam(team)}
        />
      ))}
    </div>
  </div>
);

export default TeamsList;
