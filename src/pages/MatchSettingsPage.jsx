import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar, Clock, MapPin, Users, Trophy, User, Shield,
} from 'lucide-react';

const MatchSettingsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [match, setMatch] = useState(null);
  const [positionUsers, setPositionUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleInvite = async () => {
    const email = prompt("ใส่อีเมลเพื่อนที่คุณต้องการเชิญ:");
    if (!email) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/match/${id}/invite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      alert(res.ok ? "✅ เชิญสำเร็จ" : `❌ เชิญไม่สำเร็จ: ${data.error}`);
    } catch {
      alert("เกิดข้อผิดพลาดในการเชิญเพื่อน");
    }
  };

  const handleKick = async (position) => {
    if (!window.confirm(`คุณต้องการเตะผู้เล่นจากตำแหน่ง "${position}" หรือไม่?`)) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/match/${id}/kick`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ position }),
      });
      const data = await res.json();
      alert(res.ok ? "✅ เตะสำเร็จ" : `❌ เตะไม่สำเร็จ: ${data.error}`);
      if (res.ok) fetchMatch();
    } catch {
      alert("เกิดข้อผิดพลาดในการเตะผู้เล่น");
    }
  };

  const handleDeleteMatch = async () => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบแมตช์นี้?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/match/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert("✅ ลบแมตช์สำเร็จ");
        navigate("/");
      } else {
        const data = await res.json();
        alert(`❌ ลบไม่สำเร็จ: ${data.error}`);
      }
    } catch {
      alert("เกิดข้อผิดพลาดในการลบแมตช์");
    }
  };

  const getFilledPositions = () =>
    Object.values(match?.positions || {}).filter(v => v !== "").length;

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
              <div className="flex gap-3">
                <button 
                  onClick={handleInvite} 
                  className="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  📧 เชิญเพื่อน
                </button>
                <button 
                  onClick={handleDeleteMatch} 
                  className="bg-red-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-red-500 transition-all duration-200 shadow-lg hover:shadow-xl border border-red-500"
                >
                  🗑️ ลบแมตช์
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Players Section */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-8">
              <h2 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
                <Users className="w-7 h-7" />
                ตำแหน่งผู้เล่น
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div className="flex flex-col items-end gap-2">
                          <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                            userId 
                              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
                              : 'bg-gray-100 text-gray-600 border border-gray-200'
                          }`}>
                            {userId ? '✓ เข้าร่วมแล้ว' : 'ตำแหน่งว่าง'}
                          </span>
                          {userId && (
                            <button 
                              onClick={() => handleKick(position)} 
                              className="text-xs text-red-600 hover:text-red-700 hover:underline font-medium transition-colors duration-200"
                            >
                              เตะออก
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
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

export default MatchSettingsPage;