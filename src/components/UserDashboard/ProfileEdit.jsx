// ProfileEdit.jsx
import React from 'react';
import { User } from 'lucide-react';

const ProfileEdit = ({
  profileData,
  onChange,
  onSave,
  onCancel,
  onProfilePictureChange,
}) => (
  <div className="space-y-8">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold">แก้ไขโปรไฟล์</h3>
      <div className="space-x-2">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
        >
          ยกเลิก
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
        >
          บันทึก
        </button>
      </div>
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">รูปภาพโปรไฟล์</label>
      <div className="flex items-center space-x-4">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-green-500">
          {profileData.profilePicture ? (
            <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <User className="h-12 w-12" />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onProfilePictureChange}
          className="hidden"
          id="profile-picture"
        />
        <label
          htmlFor="profile-picture"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
        >
          เปลี่ยนรูปภาพ
        </label>
      </div>
    </div>

    {/* Name, Soccer fields, Physical attributes, Username/Email - similar to your current inputs */}
    {/* Example for first name */}
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
        <input
          type="text"
          name="firstName"
          value={profileData.firstName}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
        />
      </div>
      {/* Other fields... */}
    </div>
  </div>
);

export default ProfileEdit;
