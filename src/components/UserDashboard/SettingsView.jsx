// SettingsView.jsx
import React from 'react';

const SettingsView = ({ onPasswordChange, onDeleteAccount }) => (
  <div className="p-6 bg-white rounded-lg border border-gray-200 space-y-6">
    <h3 className="text-xl font-semibold mb-6">การตั้งค่า</h3>
    <button
      onClick={onPasswordChange}
      className="w-full p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
    >
      เปลี่ยนรหัสผ่าน
    </button>
    <button
      onClick={onDeleteAccount}
      className="w-full p-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
    >
      ลบบัญชี
    </button>
  </div>
);

export default SettingsView;

