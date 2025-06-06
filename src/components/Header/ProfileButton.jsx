import React from 'react';
import { ChevronDown, User } from 'lucide-react';

const ProfileButton = ({ userData, onClick, isOpen }) => {
  const avatarUrl =
    userData.avatar && userData.avatar !== ""
      ? userData.avatar.startsWith("http")
        ? userData.avatar
        : `http://localhost:8080${userData.avatar.startsWith("/") ? "" : "/"}${userData.avatar}`
      : null;

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-emerald-50 transition-colors"
    >
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={userData.name}
          className="w-6 h-6 rounded-full object-cover border-2 border-gray-200"
        />
      ) : (
        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-200">
          <User className="w-4 h-4 text-gray-500" />
        </div>
      )}
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
