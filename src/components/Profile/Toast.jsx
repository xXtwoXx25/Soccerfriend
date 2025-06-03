import React, { useEffect } from 'react';

const Toast = ({ title, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-in">
      <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] animate-fade-out">
        <h4 className="text-base font-semibold mb-1">{title}</h4>
        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default Toast;
  