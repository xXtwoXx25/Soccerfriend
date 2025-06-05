import React from "react";

const ProfileForm = ({ profile, setProfile, isEditing }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">ชื่อจริง</label>
        <input
          type="text"
          name="firstName"
          value={profile.firstName || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="mt-1 w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">นามสกุล</label>
        <input
          type="text"
          name="lastName"
          value={profile.lastName || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="mt-1 w-full px-4 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">อีเมล</label>
        <input
          type="email"
          name="email"
          value={profile.email || ""}
          disabled
          className="mt-1 w-full px-4 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">ตำแหน่งที่ถนัด</label>
        <select
          name="position"
          value={profile.position || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="mt-1 w-full px-4 py-2 border rounded-md"
        >
          <option value="">เลือกตำแหน่ง</option>
          <option value="GK">ผู้รักษาประตู</option>
          <option value="CB">กองหลัง (CB)</option>
          <option value="LB">แบ็คซ้าย (LB)</option>
          <option value="RB">แบ็คขวา (RB)</option>
          <option value="CM">กองกลาง (CM)</option>
          <option value="ST">กองหน้า (ST)</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">สถานที่ประจำ</label>
        <input
          type="text"
          name="location"
          value={profile.location || ""}
          onChange={handleChange}
          disabled={!isEditing}
          className="mt-1 w-full px-4 py-2 border rounded-md"
        />
      </div>
    </div>
  );
};

export default ProfileForm;
