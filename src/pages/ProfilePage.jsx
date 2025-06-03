import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileForm from "../components/Profile/ProfileForm";
import showToast from "../components/Profile/Toast";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found. Please login again.");

      const res = await axios.get("http://localhost:8080/api/profile/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.data.profile) throw new Error("No profile data found.");

      setProfile(res.data.profile);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message || "Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:8080/api/profile/me", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsEditing(false);
      showToast("บันทึกข้อมูลสำเร็จ", "โปรไฟล์ของคุณได้รับการอัพเดทแล้ว");
    } catch (err) {
      console.error(err);
      alert("Failed to save profile.");
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:8080/api/profile/avatar", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfile((prev) => ({ ...prev, avatarUrl: res.data.avatarUrl }));
    } catch (err) {
      console.error("Upload failed", err);
      alert("ไม่สามารถอัปโหลดรูปภาพได้");
    }
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-500">{error}</div>;
  if (!profile) return <div className="flex items-center justify-center min-h-screen text-red-500">Profile not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <ProfileHeader
          profile={profile}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          handleAvatarUpload={handleAvatarUpload}
        />

        <ProfileForm
          profile={profile}
          setProfile={setProfile}
          isEditing={isEditing}
        />

        {isEditing && (
          <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
            <button 
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setIsEditing(false)}
            >
              ยกเลิก
            </button>
            <button 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={handleSave}
            >
              บันทึก
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
