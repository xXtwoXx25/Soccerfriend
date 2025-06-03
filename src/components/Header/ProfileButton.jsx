import React from 'react';
import { ChevronDown } from 'lucide-react';

const ProfileButton = ({ userData, onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-emerald-50 transition-colors"
    >
      <img
        src={userData.avatar || "/default-avatar.png"}
        alt={userData.name}
        className="w-6 h-6 rounded-full object-cover border-2 border-gray-200"
      />
      <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">
        {userData.name}
      </span>
      <ChevronDown
        size={16}
        className={`transition-transform duration-200 ${
          isOpen ? 'rotate-180' : ''
        } text-gray-500`}
      />
    </button>
  );
};

export default ProfileButton;
