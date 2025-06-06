import React, { useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import Toast from './Toast';

const ToastContainer = forwardRef((props, ref) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((title, message) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  useImperativeHandle(ref, () => ({
    showToast
  }));

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-4">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          title={toast.title}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
});

export default ToastContainer; 