import React from "react";
import { User } from "lucide-react";

const ProfileHeader = ({ profile, isEditing, setProfile }) => {
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/profile/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setProfile((prev) => ({ ...prev, avatarUrl: data.avatarUrl }));
    } catch (err) {
      alert("ไม่สามารถอัปโหลดรูปภาพได้");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 border-b border-gray-200">
      <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
        {profile.avatarUrl ? (
<img
  src={
    profile.avatarUrl?.startsWith("http")
      ? profile.avatarUrl
      : `http://localhost:8080${profile.avatarUrl.startsWith("/") ? "" : "/"}${profile.avatarUrl}`
  }
  alt="avatar"
  className="w-full h-full object-cover"
/>

        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <User className="w-16 h-16 text-gray-400" />
          </div>
        )}
      </div>
      {isEditing && (
        <label className="px-3 py-1.5 text-sm border border-emerald-700 text-emerald-700 rounded-md bg-white cursor-pointer transition-colors hover:bg-gray-50">
          เปลี่ยนรูปโปรไฟล์
          <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
        </label>
      )}
    </div>
  );
};

export default ProfileHeader;
