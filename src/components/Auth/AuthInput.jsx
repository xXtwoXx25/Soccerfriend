import React from 'react';

const AuthInput = ({ label, name, type, value, onChange }) => (
  <div className="flex flex-col space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`${label.toLowerCase()}`}
      required
      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
    />
  </div>
);

export default AuthInput;
