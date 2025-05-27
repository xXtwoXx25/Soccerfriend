// src/components/SoccerField.jsx
import React, { useState } from 'react';
import '../styles/PositionSelectionPage.css';

const PositionSelectionPage = () => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [searchingTeams, setSearchingTeams] = useState(false);
  const [availableTeams, setAvailableTeams] = useState([]);
const [positions, setPositions] = useState({
  'GK': { name: 'ผู้รักษาประตู', available: true, label: 'GK', value: 5000, top: '10%', left: '50%' },
  'LB': { name: 'แบ็คซ้าย', available: true, label: 'LB', value: 3000, top: '25%', left: '25%' },
  'CB': { name: 'กองหลังกลาง', available: true, label: 'CB', value: 3500, top: '25%', left: '50%' },
  'RB': { name: 'แบ็คขวา', available: true, label: 'RB', value: 3000, top: '25%', left: '75%' },
  'LM': { name: 'กองกลางซ้าย', available: true, label: 'LM', value: 4000, top: '50%', left: '25%' },
  'CM': { name: 'กองกลางกลาง', available: true, label: 'CM', value: 4500, top: '50%', left: '50%' },
  'RM': { name: 'กองกลางขวา', available: true, label: 'RM', value: 4000, top: '50%', left: '75%' },
  'CF': { name: 'กองหน้า', available: true, label: 'CF', value: 6000, top: '75%', left: '50%' },
});

  const mockTeams = {
    'GK': [
      {
        id: 1,
        teamName: 'Thunder FC',
        teamDetail: 'เล่นทุกเย็นเสาร์ รับทุกตำแหน่ง',
        playDate: 'เสาร์',
        playTime: '17:00 - 19:00',
        skillLevel: 'beginner',
        homeStadium: 'สนาม A',
        logoUrl: '/uploads/logo_123.png'
      }
    ],
    // เพิ่มข้อมูลทีมตามตำแหน่งอื่นได้
  };

  const renderSkillLevel = (level) => {
    switch (level) {
      case 'beginner': return 'มือใหม่';
      case 'intermediate': return 'ปานกลาง';
      case 'advanced': return 'เล่นประจำ';
      default: return 'ไม่ระบุ';
    }
  };

  const handlePositionSelect = async (position) => {
    if (positions[position].available) {
      setSelectedPosition(position);
      setSearchingTeams(true);
      setAvailableTeams([]);

      setTimeout(() => {
        const teamsForPosition = mockTeams[position] || [];
        setAvailableTeams(teamsForPosition);
        setSearchingTeams(false);
      }, 1500);
    }
  };

  const handleJoinTeam = (team) => {
    alert(`เข้าร่วมทีม ${team.teamName} สำเร็จ!\nตำแหน่ง: ${positions[selectedPosition].name}\nค่าตัว: ${positions[selectedPosition].value.toLocaleString()} บาท`);
  };
  

  return (

    <div className="soccer-field-container">
      <div className="soccer-field">
        <div className="field-outline">
        {/* วาดสนามและปุ่มตำแหน่งเดิมทั้งหมด (เหมือนในโค้ดต้นฉบับ) */}
                {/* เส้นขอบสนาม */}
        <div className="field-outline"></div>
        
        {/* เส้นกลางสนาม */}
        <div className="field-line center-line"></div>
        <div className="field-line vertical-line"></div>
        
        {/* วงกลมกลางสนาม */}
        <div className="center-circle"></div>
        
        {/* เขตโทษและเขตประตู */}
        <div className="goal-area-top"></div>
        <div className="goal-area-bottom"></div>
        <div className="penalty-area-top"></div>
        <div className="penalty-area-bottom"></div>
        
        {/* มุมสนาม */}
        <div className="corner-arc corner-top-left"></div>
        <div className="corner-arc corner-top-right"></div>
        <div className="corner-arc corner-bottom-left"></div>
        <div className="corner-arc corner-bottom-right"></div>

      </div>
        
        
{Object.keys(positions).map((posKey) => {
  const pos = positions[posKey];
  return (
    <button
      key={posKey}
      className={`position-circle ${selectedPosition === posKey ? 'selected' : ''} ${!pos.available ? 'unavailable' : ''}`}
      onClick={() => handlePositionSelect(posKey)}
      style={{ top: pos.top, left: pos.left }}
      disabled={!pos.available}
    >
      {pos.label}
    </button>
  );
})}

      </div>

      <div className="position-info">
        {selectedPosition && (
          <div className="selected-position-info">
            <h3>ตำแหน่งที่เลือก: {positions[selectedPosition].name} ({positions[selectedPosition].label})</h3>
          </div>
        )}

        {searchingTeams && (
          <div className="searching-teams">
            <div className="loading-spinner"></div>
            <p>กำลังค้นหาทีมที่ต้องการผู้เล่นในตำแหน่งนี้...</p>
          </div>
        )}

        {!searchingTeams && availableTeams.length > 0 && (
          <div className="teams-list">
            <h4>ทีมที่ต้องการตำแหน่งนี้ ({availableTeams.length} ทีม)</h4>
            <div className="teams-grid">
              {availableTeams.map(team => (
                <div key={team.id} className="team-card">
                  {team.logoUrl && (
                    <img
                      src={`http://localhost:8080${team.logoUrl}`}
                      alt="โลโก้ทีม"
                      className="team-logo"
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                  )}
                  <h5>{team.teamName}</h5>
                  <p><strong>รายละเอียด:</strong> {team.teamDetail}</p>
                  <p><strong>วันเล่น:</strong> {team.playDate}</p>
                  <p><strong>เวลา:</strong> {team.playTime}</p>
                  <p><strong>ทักษะ:</strong> {renderSkillLevel(team.skillLevel)}</p>
                  <p><strong>สนาม:</strong> {team.homeStadium || 'ไม่ระบุ'}</p>

                  <button className="join-team-btn" onClick={() => handleJoinTeam(team)}>เข้าร่วมทีม</button>
                  <button className="join-team-btn" onClick={() => handleJoinTeam(team)}>รายละเอียดทีม</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {!searchingTeams && selectedPosition && availableTeams.length === 0 && (
          <div className="no-teams">
            <p>ไม่พบทีมที่ต้องการผู้เล่นในตำแหน่งนี้</p>
            <p>ลองเลือกตำแหน่งอื่นดูครับ</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionSelectionPage;
