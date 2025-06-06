import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Calendar, MapPin, Edit3, Trash2, Plus } from 'lucide-react';

const MatchMyPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/match/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMatches(data.matches || []);
      }
    } catch (err) {
      console.error("❌ ไม่สามารถโหลดข้อมูลแมตช์", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  const deleteMatch = async (id) => {
    const confirmDelete = window.confirm("คุณต้องการลบแมตช์นี้ใช่หรือไม่?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/match/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setMatches((prev) => prev.filter((m) => m._id !== id));
      } else {
        alert("ลบไม่สำเร็จ: " + (data.error || "เกิดข้อผิดพลาด"));
      }
    } catch (err) {
      console.error("❌ Error deleting match:", err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  const getFilledCount = (positions) =>
    Object.values(positions || {}).filter((pos) => pos !== "").length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-700 p-4 rounded-2xl shadow-lg">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-emerald-700">แมตช์ของฉัน</h1>
                <p className="text-gray-600 text-lg mt-1">จัดการและติดตามแมตช์ที่คุณสร้างไว้</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg">
                <p className="font-semibold text-lg">{matches.length} แมตช์</p>
              </div>
              <button
                onClick={() => navigate("/team-creation")}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>สร้างแมตช์ใหม่</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700 mx-auto mb-4"></div>
              <p className="text-emerald-700 font-semibold">กำลังโหลดแมตช์...</p>
            </div>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-xl p-12 max-w-md mx-auto">
              <div className="bg-emerald-100 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-16 h-16 text-emerald-700" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-700 mb-3">ยังไม่มีแมตช์</h3>
              <p className="text-gray-600 mb-8 text-lg">เริ่มสร้างแมตช์แรกของคุณเพื่อหาเพื่อนเล่นกีฬา</p>
              <button
                onClick={() => navigate("/team-creation")}
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
              >
                <Plus className="w-5 h-5" />
                <span>สร้างแมตช์ใหม่</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {matches.map((match) => {
              const filled = getFilledCount(match.positions);
              const percent = Math.round((filled / match.requiredPlayers) * 100);
              return (
                <div key={match._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Card Header */}
                  <div className="bg-emerald-700 p-6 text-white relative">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-xl leading-tight pr-4">{match.title}</h3>
                      <div className="flex space-x-2 flex-shrink-0">
                        <button
                          onClick={() => deleteMatch(match._id)}
                          className="p-2 hover:bg-red-500 hover:bg-opacity-30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 bg-red-500" />
                        </button>
                      </div>
                    </div>
                    <p className="text-emerald-100 text-sm leading-relaxed">{match.description || "ไม่มีคำอธิบาย"}</p>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Date & Time */}
                    <div className="flex items-center text-gray-700">
                      <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                        <Calendar className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-700">{match.day}</p>
                        <p className="text-sm text-gray-500">{match.timeRange}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-gray-700">
                      <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                        <MapPin className="w-4 h-4 text-emerald-700" />
                      </div>
                      <p className="font-medium text-gray-800">{match.location}</p>
                    </div>

                    {/* Players Count */}
                    <div className="flex items-center text-gray-700">
                      <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                        <Users className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-emerald-700">ผู้เล่น: {filled}/{match.requiredPlayers}</p>
                        <p className="text-sm text-gray-500">เหลือ {match.requiredPlayers - filled} ที่นั่ง</p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 font-medium">ความคืบหน้า</span>
                        <span className="text-emerald-700 font-bold">{percent}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-emerald-700 h-3 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Created Date */}
                    <div className="text-xs text-gray-400 bg-gray-50 p-3 rounded-lg">
                      สร้างเมื่อ: {new Date(match.createdAt).toLocaleDateString("th-TH", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => navigate(`/match/${match._id}/settings`)}
                      className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                    > 
                      ดูรายละเอียด
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchMyPage;