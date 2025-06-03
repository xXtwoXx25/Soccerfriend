import React, { useState } from 'react';
import TeamHeader from '../components/TeamSettings/TeamHeader';
import TeamCount from '../components/TeamSettings/TeamCount';
import TeamField from '../components/TeamSettings/TeamField';
import TeamMembersList from '../components/TeamSettings/TeamMemberList';
import InviteInput from '../components/TeamSettings/InviteInput';

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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <TeamHeader onInvite={handleInvite} />
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <TeamCount count={members.length} max={8} />
          <TeamField />
          <TeamMembersList members={members} />
        </div>
        <div className="mt-6">
          <InviteInput
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamSettings;
