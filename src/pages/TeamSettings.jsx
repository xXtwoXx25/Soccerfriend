import React, { useState } from 'react';
import "../styles/TeamSettings.css";

const TeamSettings = () => {
  const [members, setMembers] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = () => {
    if (inviteEmail) {
      setMembers([...members, { name: inviteEmail }]);
      setInviteEmail('');
    }
  };

  return (
    <div className="team-settings-container">
      <div className="team-header">
        <h1>หน้าทีม setting</h1>
        <button className="invite-btn" onClick={handleInvite}>เชิญ</button>
      </div>

      <div className="team-body">
        <div className="team-count">
          <p>จำนวนคน</p>
          <div className="count-box">{members.length}/8</div>
        </div>

        <div className="team-field">
          <p>สนามฟุตบอล 7 คน</p>
          <div className="circle-positions">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="circle"></div>
            ))}
          </div>
        </div>

        <div className="team-members">
          <p>รายชื่อผู้เล่น</p>
          <ul>
            {members.map((m, i) => (
              <li key={i}>{m.name} - รอการยืนยัน</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="team-footer">
        <input
          type="text"
          placeholder="กรอกอีเมล"
          value={inviteEmail}
          onChange={(e) => setInviteEmail(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TeamSettings;
