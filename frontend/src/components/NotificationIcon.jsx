import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useNotifications } from '../context/NotificationContext';

const NotificationIcon = () => {
  const ctx = useNotifications();
  const { notifications = [], unreadCount = 0, markAllAsRead, addNotification } = ctx || {};
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(prev => {
      const next = !prev;
      if (next && typeof markAllAsRead === 'function') {
        markAllAsRead();
      }
      return next;
    });
  };

  const handleAdd = () => {
    if (typeof addNotification === 'function') {
      addNotification({ id: Date.now(), message: 'New notification' });
    }
  };

  return (
    <div className="relative">
      <button onClick={toggle} className="p-2 rounded-full hover:bg-gray-100">
        <FaBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-32px)] sm:w-80 max-w-[340px] bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-3 border-b flex justify-between items-center bg-gray-50/70">
            <div className="font-semibold text-sm">Notifications</div>
            <button onClick={markAllAsRead} className="text-xs text-blue-600 hover:underline">
              Mark all
            </button>
          </div>
          <div className="max-h-72 overflow-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              notifications.map(n => (
                <div key={n.id} className={`p-3 border-b ${!n.read ? 'bg-blue-50' : ''}`}>
                  <div className="text-sm">{n.message}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(n.timestamp).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
