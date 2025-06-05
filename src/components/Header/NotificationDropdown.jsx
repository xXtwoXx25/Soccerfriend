// NotificationDropdown.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const NotificationDropdown = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8080/api/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const enriched = (data.notifications || []).map(n => ({
          ...n,
          id: n._id,
          title: n.type === 'teamInvite' ? 'คำเชิญเข้าร่วมทีม' : 'แจ้งเตือน',
          time: new Date(n.createdAt).toLocaleString(),
          isRead: n.read,
        }));
        setNotifications(enriched);
      }
    } catch (err) {
      console.error("❌ Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8080/api/notifications/${id}/read`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch {}
  };

  const acceptInvite = async (matchId, id) => {
    await markAsRead(id);
    navigate(`/match/${matchId}`);
  };

  const removeNotification = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8080/api/notifications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch {}
  };

  const markAllAsRead = () => {
    notifications.forEach(n => {
      if (!n.isRead) markAsRead(n.id);
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'teamInvite': return '👥';
      case 'upcomingMatch': return '⚽';
      case 'teamRequest': return '📝';
      default: return '📢';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="w-80 bg-white shadow-lg rounded-lg border border-gray-200 animate-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">แจ้งเตือน</h3>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead} 
            className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            <Check size={16} /> อ่านทั้งหมด
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="text-center text-sm text-gray-500 py-6">
            <p>⏳ กำลังโหลด...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-sm text-gray-500 py-6">
            <p>ไม่มีการแจ้งเตือน</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id}
              className={`flex justify-between items-start p-4 border-b border-gray-100 ${
                !notification.isRead ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className="text-xl">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="text-sm">
                  <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                  <p className="text-gray-600">{notification.message}</p>
                  <span className="text-xs text-gray-400">{notification.time}</span>

                  {notification.type === 'teamInvite' && notification.matchId && !notification.isRead && (
                    <button
                      onClick={() => acceptInvite(notification.matchId, notification.id)}
                      className="mt-2 text-xs px-3 py-1 bg-emerald-500 text-white rounded hover:bg-emerald-600"
                    >
                      ไปเลือกตำแหน่ง
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <button 
                  onClick={() => removeNotification(notification.id)} 
                  className="text-red-500 hover:text-red-600 p-1 rounded-md hover:bg-red-50"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-3 text-center border-t border-gray-100 bg-gray-50">
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
