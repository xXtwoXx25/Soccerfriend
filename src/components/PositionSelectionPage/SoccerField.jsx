import React from "react";
import PositionCircle from "./PositionCircle";

const SoccerField = ({ positions, selectedPosition, onSelect }) => (
  <div className="w-[300px] h-[450px] bg-green-700 relative rounded-lg shadow-lg overflow-hidden">
    <div className="absolute top-[10px] left-[10px] right-[10px] bottom-[10px] border border-white/50 rounded-sm pointer-events-none"></div>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/70 transform -translate-y-1/2"></div>
    <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/70 transform -translate-x-1/2"></div>
    <div className="absolute top-1/2 left-1/2 w-20 h-20 border border-white/70 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    <div className="absolute top-0 left-1/2 w-30 h-[50px] border border-white/70 border-t-0 transform -translate-x-1/2"></div>
    <div className="absolute bottom-0 left-1/2 w-30 h-[50px] border border-white/70 border-b-0 transform -translate-x-1/2"></div>
    <div className="absolute top-0 left-1/2 w-[180px] h-20 border border-white/70 border-t-0 transform -translate-x-1/2"></div>
    <div className="absolute bottom-0 left-1/2 w-[180px] h-20 border border-white/70 border-b-0 transform -translate-x-1/2"></div>
    <div className="absolute top-0 left-0 w-5 h-5 border border-white/70 border-t-0 border-l-0 rounded-full"></div>
    <div className="absolute top-0 right-0 w-5 h-5 border border-white/70 border-t-0 border-r-0 rounded-full"></div>
    <div className="absolute bottom-0 left-0 w-5 h-5 border border-white/70 border-b-0 border-l-0 rounded-full"></div>
    <div className="absolute bottom-0 right-0 w-5 h-5 border border-white/70 border-b-0 border-r-0 rounded-full"></div>

    {Object.keys(positions).map((posKey) => (
      <PositionCircle
        key={posKey}
        posKey={posKey}
        pos={positions[posKey]}
        isSelected={selectedPosition === posKey}
        onSelect={onSelect}
      />
    ))}
  </div>
);

export default SoccerField;
