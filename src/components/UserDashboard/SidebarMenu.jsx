// SidebarMenu.jsx
import React from 'react';
import { User, Users, Settings } from 'lucide-react';

const SidebarMenu = ({ activeMenu, setActiveMenu }) => {
  const menuItems = [
    { id: 'profile', title: 'โปรไฟล์ของฉัน', icon: <User className="h-6 w-6" /> },
    { id: 'team', title: 'ทีมของฉัน', icon: <Users className="h-6 w-6" /> },
    { id: 'settings', title: 'การตั้งค่า', icon: <Settings className="h-6 w-6" /> },
  ];

  return (
    <nav className="space-y-4 p-4 bg-white border-r border-gray-200">
      {menuItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveMenu(item.id)}
          className={`flex items-center space-x-2 p-2 rounded-lg w-full text-left ${
            activeMenu === item.id ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {item.icon}
          <span>{item.title}</span>
        </button>
      ))}
    </nav>
  );
};

export default SidebarMenu;
