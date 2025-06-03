import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const NotificationDropdown = ({ 
  notifications, 
  unreadCount, 
  markAsRead, 
  markAllAsRead, 
  removeNotification,
  onClose 
}) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'teamInvite': return '👥';
      case 'upcomingMatch': return '⚽';
      case 'teamRequest': return '📝';
      default: return '📢';
    }
  };

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
        {notifications.length === 0 ? (
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
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                {!notification.isRead && (
                  <button 
                    onClick={() => markAsRead(notification.id)} 
                    className="text-emerald-600 hover:text-emerald-700 p-1 rounded-md hover:bg-emerald-50"
                  >
                    <Check size={14} />
                  </button>
                )}
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
          <Link 
            to="/notifications"
            onClick={onClose}
            className="text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            ดูทั้งหมด
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
