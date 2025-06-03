import React from 'react';
import { Bell } from 'lucide-react';

const NotificationButton = ({ onClick, unreadCount }) => {
  return (
    <button 
      onClick={onClick} 
      className="relative p-2 rounded-md hover:bg-emerald-50 transition-colors"
    >
      <Bell className="w-5 h-5 text-emerald-800" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {unreadCount}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;
