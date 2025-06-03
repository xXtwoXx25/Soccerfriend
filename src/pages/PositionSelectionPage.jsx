import React, { useState } from "react";
import SoccerField from "../components/PositionSelectionPage/SoccerField";
import SelectedPositionInfo from "../components/PositionSelectionPage/SelectedPositionInfo";
import TeamsList from "../components/PositionSelectionPage/TeamsList";
import NoTeamsFound from "../components/PositionSelectionPage/NoTeamsFound";
import LoadingSpinner from "../components/PositionSelectionPage/LoadingSpinner";

const PositionSelectionPage = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [searchingTeams, setSearchingTeams] = useState(false);
  const [availableTeams, setAvailableTeams] = useState([]);

  const positions = {
    GK: { name: "ผู้รักษาประตู", available: true, label: "GK", value: 5000, top: "10%", left: "50%" },
    LB: { name: "แบ็คซ้าย", available: true, label: "LB", value: 3000, top: "25%", left: "25%" },
    CB: { name: "กองหลังกลาง", available: true, label: "CB", value: 3500, top: "25%", left: "50%" },
    RB: { name: "แบ็คขวา", available: true, label: "RB", value: 3000, top: "25%", left: "75%" },
    LM: { name: "กองกลางซ้าย", available: true, label: "LM", value: 4000, top: "50%", left: "25%" },
    CM: { name: "กองกลางกลาง", available: true, label: "CM", value: 4500, top: "50%", left: "50%" },
    RM: { name: "กองกลางขวา", available: true, label: "RM", value: 4000, top: "50%", left: "75%" },
    CF: { name: "กองหน้า", available: true, label: "CF", value: 6000, top: "75%", left: "50%" },
  };

  const mockTeams = {
    GK: [
      {
        id: 1,
        teamName: "Thunder FC",
        teamDetail: "เล่นทุกเย็นเสาร์ รับทุกตำแหน่ง",
        playDate: "เสาร์",
        playTime: "17:00 - 19:00",
        skillLevel: "beginner",
        homeStadium: "สนาม A",
        logoUrl: "/uploads/logo_123.png",
      },
    ],
  };

  const handlePositionSelect = (position) => {
    if (positions[position].available) {
      setSelectedPosition(position);
      setSearchingTeams(true);
      setAvailableTeams([]);

      setTimeout(() => {
        const teams = mockTeams[position] || [];
        setAvailableTeams(teams);
        setSearchingTeams(false);
      }, 1500);
    }
  };

  const handleJoinTeam = (team) => {
    alert(
      `เข้าร่วมทีม ${team.teamName} สำเร็จ!\nตำแหน่ง: ${positions[selectedPosition].name}\nค่าตัว: ${positions[selectedPosition].value.toLocaleString()} บาท`
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-7xl mx-auto">
      <div className="flex-1">
        <SoccerField
          positions={positions}
          selectedPosition={selectedPosition}
          onSelect={handlePositionSelect}
        />
      </div>

      <div className="flex-1 space-y-6">
        {selectedPosition && (
          <SelectedPositionInfo position={positions[selectedPosition]} />
        )}
        {searchingTeams && <LoadingSpinner />}
        {!searchingTeams && availableTeams.length > 0 && (
          <TeamsList
            teams={availableTeams}
            selectedPosition={positions[selectedPosition]}
            onJoinTeam={handleJoinTeam}
          />
        )}
        {!searchingTeams &&
          selectedPosition &&
          availableTeams.length === 0 && <NoTeamsFound />}
      </div>
    </div>
  );
};

export default PositionSelectionPage;
