import React, { useState } from 'react';
import AuthInput from './AuthInput';

const RegisterForm = ({ onRegister, error }) => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    position: 'GK',
    location: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // แยกชื่อก่อนส่ง
    const names = form.fullName.trim().split(' ');
    const firstName = names[0] || '';
    const lastName = names.slice(1).join(' ') || '';

    const payload = {
      firstName,
      lastName,
      email: form.email,
      phone: form.phone,
      password: form.password,
      confirmPassword: form.confirmPassword,
      position: form.position,
      location: form.location,
    };

    onRegister(payload);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">สร้างบัญชีผู้ใช้ใหม่</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput label="ชื่อ-นามสกุล" name="fullName" type="text" value={form.fullName} onChange={handleChange} />
        <AuthInput label="อีเมล" name="email" type="email" value={form.email} onChange={handleChange} />
        <AuthInput label="เบอร์โทร" name="phone" type="tel" value={form.phone} onChange={handleChange} />
        <AuthInput label="รหัสผ่าน" name="password" type="password" value={form.password} onChange={handleChange} />
        <AuthInput label="ยืนยันรหัสผ่าน" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">ตำแหน่ง</label>
          <select
            name="position"
            value={form.position}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="GK">ผู้รักษาประตู (GK)</option>
            <option value="CB">กองหลัง (CB)</option>
            <option value="LB">แบ็คซ้าย (LB)</option>
            <option value="RB">แบ็คขวา (RB)</option>
            <option value="CM">กองกลาง (CM)</option>
            <option value="ST">กองหน้า (ST)</option>
          </select>
        </div>

        <AuthInput label="สถานที่" name="location" type="text" value={form.location} onChange={handleChange} />

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
