import React from "react";

const ProfileForm = ({ profile, setProfile, isEditing }) => {
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <div className="grid gap-4 p-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">ชื่อผู้เล่น</label>
        <input
          className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
            !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
          }`}
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          disabled={!isEditing}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">อีเมล</label>
        <input
          className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
            !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
          }`}
          type="email"
          value={profile.email || ""}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          disabled={!isEditing}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">วันเกิด</label>
        <div className="flex items-center gap-4">
          <input
            className={`px-3 py-2 border border-gray-300 rounded-md text-sm transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
              !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
            }`}
            type="date"
            value={profile.birthDate || ""}
            onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
            disabled={!isEditing}
          />
          <span className="text-sm text-gray-500">
            อายุ: {profile.birthDate ? calculateAge(profile.birthDate) : "-"} ปี
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">ระดับฝีเท้า</label>
        <div className="relative">
          <select
            className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-no-repeat bg-right pr-10 transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
              !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundSize: "16px"
            }}
            disabled={!isEditing}
            value={profile.skillLevel || ""}
            onChange={(e) => setProfile({ ...profile, skillLevel: e.target.value })}
          >
            <option value="Beginner">มือใหม่</option>
            <option value="Intermediate">ปานกลาง</option>
            <option value="Advanced">ขั้นสูง</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">ตำแหน่งที่ถนัด</label>
        <div className="relative">
          <select
            className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm appearance-none bg-no-repeat bg-right pr-10 transition-colors focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 ${
              !isEditing ? "bg-gray-50 cursor-not-allowed" : ""
            }`}
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundSize: "16px"
            }}
            disabled={!isEditing}
            value={profile.position || ""}
            onChange={(e) => setProfile({ ...profile, position: e.target.value })}
          >
            <option value="ผู้รักษาประตู">ผู้รักษาประตู</option>
            <option value="กองหลัง">กองหลัง</option>
            <option value="กองกลาง">กองกลาง</option>
            <option value="กองหน้า">กองหน้า</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
