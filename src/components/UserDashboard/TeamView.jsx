// TeamView.jsx
import React from 'react';

const TeamView = ({ teamData }) => (
  <div className="p-6 bg-white rounded-lg border border-gray-200">
    <h3 className="text-xl font-semibold mb-6">ข้อมูลทีม</h3>
    <div className="space-y-4">
        {/* ฝากปรับให้มันเมหาะกับเพื่อนเตะบอลหน่อย อันนี้ดูจริงจังเกิน */}
      <p><strong>ชื่อทีม:</strong> {teamData.teamName}</p>
      <p><strong>ลีก:</strong> {teamData.league}</p>
      <p><strong>ฤดูกาล:</strong> {teamData.season}</p>
      <p><strong>ผู้ช่วยผู้อำนวยการ:</strong> {teamData.coach}</p>
      <p><strong>สนาม:</strong> {teamData.stadium}</p>
    </div>
  </div>
);

export default TeamView;
