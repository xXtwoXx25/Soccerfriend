import React from "react";

const PositionCircle = ({ posKey, pos, isSelected, onSelect }) => (
  <button
    className={`
      absolute w-12 h-12 rounded-full border-3 border-white
      bg-green-600 text-white font-bold text-xs cursor-pointer
      transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300
      shadow-lg hover:scale-110 hover:shadow-xl
      ${isSelected ? 'bg-gradient-to-br from-green-500 to-green-600 border-yellow-400 animate-pulse' : ''}
      ${!pos.available ? 'bg-gray-600 opacity-50 cursor-not-allowed' : ''}
    `}
    onClick={() => onSelect(posKey)}
    style={{ top: pos.top, left: pos.left }}
    disabled={!pos.available}
  >
    {pos.label}
  </button>
);

export default PositionCircle;
