import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, Users, Trophy, User, Shield,
} from 'lucide-react';

const TeamDetailsPage = () => {
  const { id } = useParams();
  const [match, setMatch] = useState(null);
  const [positionUsers, setPositionUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [joinMessage, setJoinMessage] = useState("");

  useEffect(() => {
    fetchMatch();
  }, [id]);

  const fetchMatch = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/match/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setMatch(data.match || data);
        setPositionUsers(data.profiles || {});
      } else {
        setError(data.error || "ไม่พบแมตช์");
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!selectedPosition) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/match/${id}/join-position`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ position: selectedPosition }),
      });
      const data = await res.json();
      if (res.ok) {
        setJoinMessage("✅ เข้าร่วมทีมสำเร็จ");
        fetchMatch();
      } else {
        setJoinMessage("❌ " + (data.error || "ไม่สามารถเข้าร่วมได้"));
      }
    } catch (err) {
      setJoinMessage("⚠️ เกิดข้อผิดพลาด");
    }
  };

  const getFilledPositions = () =>
    Object.values(match?.positions || {}).filter(v => v !== "").length;

  const getAvailablePositions = () =>
    Object.entries(match?.positions || {}).filter(([_, userId]) => !userId);

  if (loading) return <div className="min-h-screen bg-emerald-50 flex items-center justify-center"><p className="text-emerald-700 text-lg font-semibold">⏳ กำลังโหลดข้อมูล...</p></div>;
  if (error) return <div className="min-h-screen bg-emerald-50 flex items-center justify-center"><p className="text-red-600 text-lg font-semibold">❌ {error}</p></div>;

  return (
    <div className="min-h-screen bg-emerald-50">
      {/* Header Section */}
      <div className="bg-emerald-700 text-white shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-start gap-8">
            <div className="w-24 h-24 bg-white/20 rounded-2xl overflow-hidden flex items-center justify-center border-2 border-white/30 shadow-lg">
              {match.logoUrl ? (
                <img src={`http://localhost:8080${match.logoUrl}`} alt="โลโก้" className="w-full h-full object-cover" />
              ) : (
                <Shield className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3 text-white">{match.title}</h1>
              <div className="flex items-center gap-6 text-sm mb-4">
                <span className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-emerald-700 shadow-md">
                  {match.skillLevel}
                </span>
                <span className="flex items-center gap-2 text-white/90 font-medium">
                  <Users className="w-5 h-5" />
                  {getFilledPositions()}/{match.requiredPlayers} คน
                </span>
              </div>
              <p className="text-white/90 leading-relaxed text-lg mb-6 max-w-3xl">{match.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            {/* Match Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8">
              <h2 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
                <Trophy className="w-7 h-7" />
                รายละเอียดการแข่งขัน
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem icon={<Calendar />} label="วัน" value={match.day} />
                <InfoItem icon={<Clock />} label="เวลา" value={match.timeRange} />
                <InfoItem icon={<MapPin />} label="สถานที่" value={match.location} />
                <InfoItem icon={<Trophy />} label="ระดับความเก่ง" value={match.skillLevel} />
              </div>
            </div>

            {/* Players Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8">
              <h2 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
                <Users className="w-7 h-7" />
                ตำแหน่งผู้เล่น
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {Object.entries(match.positions).map(([position, userId]) => {
                  const profile = positionUsers[position];
                  const hasAvatar = profile?.avatarUrl;

                  return (
                    <div 
                      key={position} 
                      className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                        userId 
                          ? 'border-emerald-200 bg-emerald-50 shadow-md hover:shadow-lg hover:border-emerald-300' 
                          : 'border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {userId && hasAvatar ? (
                            <img 
                              src={`http://localhost:8080${profile.avatarUrl}`} 
                              alt="avatar" 
                              className="w-12 h-12 rounded-full object-cover border-2 border-emerald-200 shadow-md" 
                            />
                          ) : (
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                              userId ? 'bg-emerald-100 border-2 border-emerald-300' : 'bg-gray-100 border-2 border-gray-200'
                            }`}>
                              <User className={`w-6 h-6 ${userId ? 'text-emerald-700' : 'text-gray-400'}`} />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900 text-lg">
                              {userId
                                ? (profile?.firstName || profile?.lastName
                                    ? `${profile?.firstName || ""} ${profile?.lastName || ""}`.trim()
                                    : profile?.email || userId)
                                : position}
                            </p>
                            {userId && <p className="text-sm text-emerald-700 font-medium">{position}</p>}
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                          userId 
                            ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          {userId ? '✓ เข้าร่วมแล้ว' : 'ตำแหน่งว่าง'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Join Section */}
              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
                <h3 className="text-lg font-bold text-emerald-700 mb-4">เข้าร่วมทีม</h3>
                <label className="block text-sm font-medium text-emerald-700 mb-2">เลือกตำแหน่งที่ต้องการเข้าร่วม</label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-emerald-200 rounded-xl text-sm bg-white focus:border-emerald-400 focus:outline-none transition-colors duration-200"
                >
                  <option value="">-- กรุณาเลือกตำแหน่ง --</option>
                  {getAvailablePositions().map(([pos]) => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
                <button
                  className="mt-4 w-full px-6 py-3 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  onClick={handleJoin}
                  disabled={!selectedPosition}
                >
                  🏃‍♂️ เข้าร่วมทีม
                </button>
                {joinMessage && (
                  <div className={`mt-4 p-3 rounded-xl text-sm font-medium ${
                    joinMessage.includes('✅') 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {joinMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <SidebarStats match={match} getFilledPositions={getFilledPositions} />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 shadow-sm">
      {React.cloneElement(icon, { className: "w-6 h-6" })}
    </div>
    <div>
      <p className="text-sm text-emerald-600 font-medium mb-1">{label}</p>
      <p className="font-semibold text-gray-900 text-lg">{value}</p>
    </div>
  </div>
);

const SidebarStats = ({ match, getFilledPositions }) => {
  const total = match.requiredPlayers || getFilledPositions();
  const filled = getFilledPositions();
  const percentage = (filled / total) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-6">
        <h3 className="text-xl font-bold text-emerald-700 mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          สถิติทีม
        </h3>
        <StatRow label="ผู้เล่นที่เข้าร่วม" value={filled} color="text-emerald-700" />
        <StatRow label="จำนวนที่ต้องการ" value={total} color="text-gray-600" />
        <StatRow label="ตำแหน่งว่าง" value={total - filled} color="text-orange-600" />
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">ความคืบหน้า</span>
            <span className="text-sm font-bold text-emerald-700">{Math.round(percentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-700 to-emerald-600 h-3 rounded-full transition-all duration-500 shadow-sm" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatRow = ({ label, value, color = "text-gray-900" }) => (
  <div className="flex justify-between items-center py-2 border-b border-emerald-100 last:border-b-0">
    <span className="text-gray-600 font-medium">{label}</span>
    <span className={`font-bold text-lg ${color}`}>{value}</span>
  </div>
);

export default TeamDetailsPage;