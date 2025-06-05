import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, Clock, Trophy, User } from 'lucide-react';

const MatchSchedulePage = () => {
  const [joinedMatches, setJoinedMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJoinedMatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/match/joined", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      console.log("✅ matches ที่ได้จาก backend:", data.matches);

      if (res.ok) {
        setJoinedMatches(data.matches || []);
      }
    } catch (err) {
      console.error("❌ ไม่สามารถโหลดแมตช์ที่เข้าร่วม", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJoinedMatches();
  }, []);

  const leaveMatch = async (matchId) => {
    const confirmLeave = window.confirm("คุณต้องการออกจากแมตช์นี้ใช่หรือไม่?");
    if (!confirmLeave) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/match/${matchId}/leave`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setJoinedMatches((prev) => prev.filter((m) => m._id !== matchId));
        alert("ออกจากแมตช์เรียบร้อยแล้ว");
      } else {
        alert("ออกจากแมตช์ไม่สำเร็จ: " + (data.error || "เกิดข้อผิดพลาด"));
      }
    } catch (err) {
      console.error("❌ Error leaving match:", err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  const getFilledCount = (positions) =>
    Object.values(positions || {}).filter((pos) => pos !== "").length;

  const getMatchStatus = (match) => {
    const matchDate = new Date(match.createdAt);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const matchDay = new Date(matchDate.getFullYear(), matchDate.getMonth(), matchDate.getDate());

    if (matchDay < today) return { status: 'completed', text: 'เสร็จสิ้น', color: 'text-gray-500' };
    if (matchDay.getTime() === today.getTime()) return { status: 'today', text: 'วันนี้', color: 'text-red-500' };
    return { status: 'upcoming', text: 'กำลังจะมาถึง', color: 'text-emerald-600' };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white p-3 rounded-full shadow-md">
                <Calendar className="w-7 h-7 text-emerald-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">ตารางแมตช์ของฉัน</h1>
                <p className="text-emerald-100 text-lg">แมตช์ที่คุณเข้าร่วมทั้งหมด</p>
              </div>
            </div>
            <div className="bg-white px-6 py-3 rounded-full shadow-md">
              <p className="text-emerald-700 font-bold text-lg">{joinedMatches.length} แมตช์</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-700 mx-auto mb-4"></div>
              <p className="text-emerald-700 font-semibold text-lg">กำลังโหลดแมตช์...</p>
            </div>
          </div>
        ) : joinedMatches.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-xl p-12 mx-auto max-w-md">
              <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-3">ยังไม่ได้เข้าร่วมแมตช์</h3>
              <p className="text-gray-600 mb-6 text-lg">เข้าร่วมแมตช์เพื่อเริ่มเล่นกีฬากับเพื่อนใหม่</p>
              <button 
                onClick={() => navigate('/match-list')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-full font-bold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                ค้นหาแมตช์
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* รายการแมตช์ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {joinedMatches.map((match) => {
                const filled = getFilledCount(match.positions);
                const percent = Math.round((filled / match.requiredPlayers) * 100);
                const matchStatusInfo = getMatchStatus(match);

                return (
                  <div key={match._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:scale-105">
                    {/* Header Card */}
                    <div className="bg-emerald-700 p-6 text-white relative">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -translate-y-10 translate-x-10"></div>
                      <div className="relative z-10">
                        <h3 className="font-bold text-xl mb-2">{match.title}</h3>
                        <p className="text-emerald-100 text-sm leading-relaxed">{match.description || "ไม่มีคำอธิบาย"}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      {/* Status Badge */}
                      <div className="flex justify-between items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${matchStatusInfo.color} bg-gray-100`}>
                          {matchStatusInfo.text}
                        </span>
                      </div>

                      {/* Match Details */}
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-center text-sm">
                          <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                            <Calendar className="w-4 h-4 text-emerald-700" />
                          </div>
                          <span className="font-medium">{match.day} เวลา {match.timeRange}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                            <MapPin className="w-4 h-4 text-emerald-700" />
                          </div>
                          <span className="font-medium">{match.location}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                            <Users className="w-4 h-4 text-emerald-700" />
                          </div>
                          <span className="font-medium">ผู้เล่น: {filled}/{match.requiredPlayers}</span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                            <User className="w-4 h-4 text-emerald-700" />
                          </div>
                          <span className="font-medium">ผู้จัด: {match.creator?.name || 'ไม่ระบุ'}</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="bg-gray-100 rounded-xl p-4">
                        <div className="flex justify-between text-sm font-semibold mb-2 text-gray-700">
                          <span>ความคืบหน้า</span>
                          <span className="text-emerald-700">{percent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-emerald-600 to-emerald-700 h-3 rounded-full transition-all duration-500 shadow-sm"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Join Date */}
                      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                        เข้าร่วมเมื่อ: {new Date(match.createdAt).toLocaleDateString("th-TH")}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-3 pt-2">
                        <button
                          onClick={() => navigate(`/match/${match._id}`)}
                          className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-3 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                          ดูรายละเอียด
                        </button>
                        <button
                          onClick={() => leaveMatch(match._id)}
                          className="bg-white hover:bg-red-50 text-red-500 border-2 border-red-200 hover:border-red-300 px-4 py-3 rounded-xl font-bold transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          ออก
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchSchedulePage;