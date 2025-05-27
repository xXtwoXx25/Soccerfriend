import React, { useState, useEffect } from "react";
import { Edit, User } from "lucide-react";
import axios from "axios";
import '../styles/ProfilePage.css';

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
      const token = localStorage.getItem('token');
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
      const token = localStorage.getItem('token');
      await axios.put("http://localhost:8080/api/profile/me", profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsEditing(false);
      const toastContainer = document.createElement("div");
      toastContainer.className = "profile-toast";
      toastContainer.innerHTML = `
        <div class="profile-toast-content">
          <h4>บันทึกข้อมูลสำเร็จ</h4>
          <p>โปรไฟล์ของคุณได้รับการอัพเดทแล้ว</p>
        </div>
      `;
      document.body.appendChild(toastContainer);
      setTimeout(() => toastContainer.remove(), 3000);
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

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  if (loading) return <div className="profile-loading">Loading...</div>;
  if (error) return <div className="profile-error">{error}</div>;
  if (!profile) return <div className="profile-error">Profile not found.</div>;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-title-row">
            <h2 className="profile-title">โปรไฟล์ของฉัน</h2>
            <button className="profile-edit-button" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="profile-edit-icon" />
            </button>
          </div>
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="profile-avatar-image"
                  style={{ borderRadius: "50%", objectFit: "cover" }}
                />
              ) : (
                <div className="profile-avatar-fallback">
                  <User className="profile-avatar-placeholder" />
                </div>
              )}
            </div>
            {isEditing && (
              <label className="profile-change-avatar-button">
                เปลี่ยนรูปโปรไฟล์
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarUpload}
                />
              </label>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-form">
            <div className="profile-form-group">
              <label className="profile-label">ชื่อผู้เล่น</label>
              <input
                className="profile-input"
                value={profile.name || ""}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-form-group">
              <label className="profile-label">อีเมล</label>
              <input
                className="profile-input"
                type="email"
                value={profile.email || ""}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="profile-form-group">
              <label className="profile-label">วันเกิด</label>
              <div className="profile-date-container">
                <input
                  className="profile-input"
                  type="date"
                  value={profile.birthDate || ""}
                  onChange={(e) => setProfile({ ...profile, birthDate: e.target.value })}
                  disabled={!isEditing}
                />
                <span className="profile-age-text">
                  อายุ: {profile.birthDate ? calculateAge(profile.birthDate) : "-"} ปี
                </span>
              </div>
            </div>

            <div className="profile-form-group">
              <label className="profile-label">ระดับฝีเท้า</label>
              <div className="profile-select-wrapper">
                <select
                  className="profile-select"
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

            <div className="profile-form-group">
              <label className="profile-label">ตำแหน่งที่ถนัด</label>
              <div className="profile-select-wrapper">
                <select
                  className="profile-select"
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

          {isEditing && (
            <div className="profile-actions">
              <button className="profile-cancel-button" onClick={() => setIsEditing(false)}>
                ยกเลิก
              </button>
              <button className="profile-save-button" onClick={handleSave}>
                บันทึก
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
