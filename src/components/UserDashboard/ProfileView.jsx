// ProfileView.jsx
import React from 'react';
import { User } from 'lucide-react';

const ProfileView = ({ profileData, onEdit }) => (
  <div className="space-y-8">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold">โปรไฟล์ผู้เล่น</h3>
      <button
        onClick={onEdit}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span>แก้ไขโปรไฟล์</span>
      </button>
    </div>

    <div className="bg-white rounded-lg p-6 space-y-6 border border-gray-200">
      <div className="flex items-center space-x-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 border-4 border-green-500">
          {profileData.profilePicture ? (
            <img src={profileData.profilePicture} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <User className="h-12 w-12" />
            </div>
          )}
        </div>
        <div>
          <h4 className="text-lg font-medium">{profileData.firstName} {profileData.lastName}</h4>
          <p className="text-gray-600">#{profileData.jerseyNumber} • {profileData.position}</p>
          <p className="text-green-600 font-medium">@{profileData.username}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Repeat fields as before */}
        <div><h5 className="text-sm font-medium text-gray-500 mb-1">ชื่อ</h5><p className="text-gray-900">{profileData.firstName}</p></div>
        <div><h5 className="text-sm font-medium text-gray-500 mb-1">นามสกุล</h5><p className="text-gray-900">{profileData.lastName}</p></div>
        {/* etc... */}
      </div>
    </div>
  </div>
);

export default ProfileView;
