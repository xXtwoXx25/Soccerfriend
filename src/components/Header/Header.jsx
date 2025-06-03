import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Import components
import Navigation from './Navigation';
import NotificationButton from './NotificationButton';
import NotificationDropdown from './NotificationDropdown';
import ProfileButton from './ProfileButton';
import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';

// Import custom hooks
import { useAuth } from "../hooks/useAuth";
import { useNotifications } from "../hooks/useNotifications";
import { useClickOutside } from "../hooks/useClickOutside";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  // Custom hooks
  const { userData, token } = useAuth();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification
  } = useNotifications();

  useClickOutside(
    [notificationRef, profileRef],
    [
      () => setIsNotificationOpen(false),
      () => setIsProfileDropdownOpen(false)
    ]
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsProfileDropdownOpen(false);
  };
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsNotificationOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-emerald-800">
              SoccerFriend
            </Link>
          </div>

          {/* Right side items */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Navigation />
            </div>

            {/* Search Bar */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              {/* Notification */}
              <div ref={notificationRef} className="relative">
                <NotificationButton 
                  onClick={toggleNotification}
                  unreadCount={unreadCount}
                />
                {isNotificationOpen && (
                  <div className="absolute right-0 mt-2 z-50">
                    <NotificationDropdown
                      notifications={notifications}
                      unreadCount={unreadCount}
                      markAsRead={markAsRead}
                      markAllAsRead={markAllAsRead}
                      removeNotification={removeNotification}
                      onClose={() => setIsNotificationOpen(false)}
                    />
                  </div>
                )}
              </div>

              {/* Auth */}
              {!token || !userData ? (
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                >
                  เข้าสู่ระบบ
                </Link>
              ) : (
                <div ref={profileRef} className="relative">
                  <ProfileButton
                    userData={userData}
                    onClick={toggleProfileDropdown}
                    isOpen={isProfileDropdownOpen}
                  />
                  {isProfileDropdownOpen && (
                    <div className="absolute right-0 mt-2 z-50">
                      <ProfileDropdown
                        userData={userData}
                        onLogout={handleLogout}
                        onClose={() => setIsProfileDropdownOpen(false)}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-md text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
