import React, { useState } from 'react';
import AuthInput from './AuthInput';

const RegisterForm = ({ onRegister, error }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(form);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">สร้างบัญชีผู้ใช้ใหม่</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput label="ชื่อ" name="fullName" type="text" value={form.fullName} onChange={handleChange} />
        <AuthInput label="อีเมล" name="email" type="email" value={form.email} onChange={handleChange} />
        <AuthInput label="รหัสผ่าน" name="password" type="password" value={form.password} onChange={handleChange} />
        <AuthInput label="ยืนยันรหัสผ่าน" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md">
            {error}
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 transition-colors duration-200 hover:-translate-y-0.5 hover:shadow-md"
        >
          สมัครสมาชิก
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
