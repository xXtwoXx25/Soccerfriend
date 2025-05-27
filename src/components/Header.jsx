import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell, Home, Plus, Menu, X, Check, User, Settings, Users, LogOut, ChevronDown
} from "lucide-react";
import '../styles/Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const token = localStorage.getItem("token");

  const [userData, setUserData] = useState(null); // ✅ user data from API
  const [notifications, setNotifications] = useState([]);

 useEffect(() => {
  const fetchProfile = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8080/api/profile/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contentType = res.headers.get("content-type");
      const text = await res.text(); // ดึงข้อมูลมาแบบ raw ก่อน

      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON:\n" + text);
      }

      const data = JSON.parse(text); // แปลงเป็น JSON ภายหลัง
      if (res.ok) {
        setUserData(data.profile);
      } else {
        console.warn("❌ โหลดโปรไฟล์ไม่สำเร็จ:", data.error);
      }
    } catch (err) {
      console.error("⚠️ Error fetching user info:", err.message);
    }
  };

  fetchProfile();
}, [token]);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(n => (
      n.id === notificationId ? { ...n, isRead: true } : n
    )));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'teamInvite': return '👥';
      case 'upcomingMatch': return '⚽';
      case 'teamRequest': return '📝';
      default: return '📢';
    }
  };

  return (
    <header className="sf-header">
      <div className="sf-header-container">
        <div className="sf-header-content">
          <div className="sf-logo-container">
            <Link to="/" className="sf-logo-link">
              <span className="sf-logo-text">SoccerFriend</span>
            </Link>
          </div>

          <nav className="sf-desktop-nav">
            <Link to="/" className="sf-nav-item">
              <Home className="sf-nav-icon" />
              <span>Home</span>
            </Link>
            <Link to="/team-creation" className="sf-nav-item">
              <Plus className="sf-nav-icon" />
              <span>สร้างทีม</span>
            </Link>

            <div className="sf-notification-container" ref={notificationRef}>
              <button className="sf-notification-button" onClick={toggleNotification}>
                <Bell className="sf-nav-icon" />
                {unreadCount > 0 && (
                  <span className="sf-notification-badge">{unreadCount}</span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="sf-notification-popup">
                  <div className="sf-notification-header">
                    <h3 className="sf-notification-title">แจ้งเตือน</h3>
                    {unreadCount > 0 && (
                      <button className="sf-mark-all-read" onClick={markAllAsRead}>
                        <Check size={16} /> อ่านทั้งหมด
                      </button>
                    )}
                  </div>

                  <div className="sf-notification-list">
                    {notifications.length === 0 ? (
                      <div className="sf-no-notifications"><p>ไม่มีการแจ้งเตือน</p></div>
                    ) : (
                      notifications.map(notification => (
                        <div key={notification.id} className={`sf-notification-item ${!notification.isRead ? 'sf-notification-unread' : ''}`}>
                          <div className="sf-notification-content">
                            <div className="sf-notification-icon">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="sf-notification-text">
                              <h4 className="sf-notification-item-title">{notification.title}</h4>
                              <p className="sf-notification-message">{notification.message}</p>
                              <span className="sf-notification-time">{notification.time}</span>
                            </div>
                          </div>
                          <div className="sf-notification-actions">
                            {!notification.isRead && (
                              <button className="sf-mark-read-btn" onClick={() => markAsRead(notification.id)}>
                                <Check size={14} />
                              </button>
                            )}
                            <button className="sf-remove-notification" onClick={() => removeNotification(notification.id)}>
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className="sf-notification-footer">
                      <Link to="/notifications" className="sf-view-all-notifications" onClick={() => setIsNotificationOpen(false)}>
                        ดูทั้งหมด
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>

            {!token || !userData ? (
              <Link to="/login" className="sf-login-button">เข้าสู่ระบบ</Link>
            ) : (
              <div className="sf-profile-container" ref={profileRef}>
                <button className="sf-profile-button" onClick={toggleProfileDropdown}>
                  <img src={userData.avatar || "/default-avatar.png"} alt={userData.name} className="sf-profile-avatar" />
                  <span className="sf-profile-name">{userData.name}</span>
                  <ChevronDown className={`sf-profile-chevron ${isProfileDropdownOpen ? 'sf-profile-chevron-open' : ''}`} size={16} />
                </button>

                {isProfileDropdownOpen && (
                  <div className="sf-profile-dropdown">
                    <div className="sf-profile-header">
                      <img src={userData.avatar || "/default-avatar.png"} alt={userData.name} className="sf-profile-dropdown-avatar" />
                      <div className="sf-profile-info">
                        <h4 className="sf-profile-dropdown-name">{userData.name}</h4>
                        <p className="sf-profile-dropdown-email">{userData.email}</p>
                      </div>
                    </div>

                    <div className="sf-profile-menu">
                      <Link to="/profile" className="sf-profile-menu-item" onClick={() => setIsProfileDropdownOpen(false)}>
                        <User size={16} /><span>โปรไฟล์</span>
                      </Link>
                      <Link to="/team-settings" className="sf-profile-menu-item" onClick={() => setIsProfileDropdownOpen(false)}>
                        <Users size={16} /><span>จัดการทีม</span>
                      </Link>
                      <Link to="/match-schedulePage" className="sf-profile-menu-item" onClick={() => setIsProfileDropdownOpen(false)}>
                        <Settings size={16} /><span>ตารานัดหมายที่ลงไป</span>
                      </Link>
                      <hr className="sf-profile-divider" />
                      <button className="sf-profile-menu-item sf-logout-item" onClick={() => { handleLogout(); setIsProfileDropdownOpen(false); }}>
                        <LogOut size={16} /><span>ออกจากระบบ</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </nav>

          <div className="sf-mobile-menu-button">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <X className="sf-menu-icon" /> : <Menu className="sf-menu-icon" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
