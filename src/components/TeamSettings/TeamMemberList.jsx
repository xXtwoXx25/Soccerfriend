const TeamMembersList = ({ members }) => (
  <div className="flex-2">
    <p className="text-gray-700 mb-2">รายชื่อผู้เล่น</p>
    <ul className="space-y-2">
      {members.map((m, i) => (
        <li key={i} className="text-gray-600">
          {m.name} - <span className="text-yellow-600">รอการยืนยัน</span>
        </li>
      ))}
    </ul>
  </div>
);

export default TeamMembersList;
