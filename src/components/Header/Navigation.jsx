import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="flex gap-6 items-center">
      <Link 
        to="/" 
        className="flex items-center gap-2 px-3 py-2 rounded-md text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </Link>
      <Link 
        to="/team-creation" 
        className="flex items-center gap-2 px-3 py-2 rounded-md text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
      >
        <Plus className="w-5 h-5" />
        <span>สร้างทีม</span>
      </Link>
            <Link 
        to="/match-list" 
        className="flex items-center gap-2 px-3 py-2 rounded-md text-emerald-800 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
      >
        <span>เเมตช์ทั้งหมด</span>
      </Link>
    </nav>
  );
};

export default Navigation;
