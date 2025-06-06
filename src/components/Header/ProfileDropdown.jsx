import React from 'react';
import { Link } from 'react-router-dom';
import { User, Settings, Users, LogOut } from 'lucide-react';

const ProfileDropdown = ({ userData, onLogout, onClose }) => {
  return (
    <div className="w-70 bg-white border border-gray-200 rounded-xl shadow-lg z-50 mt-2 overflow-hidden animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-200">
<img 
  src={`http://localhost:8080${userData.avatarUrl || "/default-avatar.png"}`} 
  alt={userData.name || "Avatar"} 
  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
/>
        <div className="flex-1 min-w-0">
          <h4 className="text-base font-semibold text-gray-900 m-0 truncate">
            {userData.name}
          </h4>
          <p className="text-sm text-gray-500 m-0 truncate">
            {userData.email}
          </p>
        </div>
      </div>

      <div className="py-2">
        <Link 
          to="/profile" 
          className="flex items-center gap-3 px-5 py-3 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <User size={16} />
          <span>โปรไฟล์</span>
        </Link>
        <Link 
          to="/team-settings" 
          className="flex items-center gap-3 px-5 py-3 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <Users size={16} />
          <span>จัดการทีม</span>
        </Link>
        <Link 
          to="/match-schedulePage" 
          className="flex items-center gap-3 px-5 py-3 text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <Settings size={16} />
          <span>ตารานัดหมายที่ลงไว้</span>
        </Link>
        <hr className="border-0 border-t border-gray-200 my-2" />
        <button 
          className="flex items-center gap-3 px-5 py-3 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors w-full text-left"
          onClick={() => { onLogout(); onClose(); }}
        >
          <LogOut size={16} />
          <span>ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;