import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Star, User, Search, Filter, Sparkles } from 'lucide-react';

const MatchListPage = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");
  const [dayFilter, setDayFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/api/match/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setMatches(data.matches || []);
        }
      } catch (err) {
        console.error("❌ Error fetching matches", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const getSkillLevelColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'intermediate':
        return 'bg-yellow-300 text-emerald-800 border-emerald-300';
      case 'advanced':
        return 'bg-red-600 text-white border-emerald-700';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSkillLevelText = (level) => {
    switch (level) {
      case 'beginner':
        return 'มือใหม่';
      case 'intermediate':
        return 'ปานกลาง';
      case 'advanced':
        return 'ขั้นสูง';
      default:
        return level;
    }
  };

  const getFilledPositions = (positions) => {
    return Object.values(positions || {}).filter(pos => pos !== '').length;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const filteredMatches = matches.filter((match) => {
    const keyword = searchTerm.toLowerCase();
    const matchTitle = match.title?.toLowerCase() || "";
    const matchDesc = match.description?.toLowerCase() || "";
    const matchLocation = match.location?.toLowerCase() || "";
    const matchDay = formatDate(match.day);
    const matchSkill = match.skillLevel || "";

    const searchMatch =
      matchTitle.includes(keyword) ||
      matchDesc.includes(keyword) ||
      matchLocation.includes(keyword);

    const skillMatch = skillFilter === "all" || matchSkill === skillFilter;
    const dayMatch = dayFilter === "all" || matchDay.includes(dayFilter);

    return searchMatch && skillMatch && dayMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-700"></div>
            <p className="text-emerald-700 font-semibold text-lg">กำลังโหลด...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800">
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-white mr-3" />
                <h1 className="text-4xl lg:text-5xl font-bold text-white">รายการแมตช์ฟุตซอล</h1>
                <Sparkles className="w-8 h-8 text-white ml-3" />
              </div>
              <p className="text-white/80 text-lg">ค้นหาและเข้าร่วมแมตช์ที่เหมาะกับคุณ</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with White Background */}
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 mb-8 border border-gray-200">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="ค้นหาแมตช์..."
                  className="w-full pl-10 pr-4 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-700 focus:outline-none transition-colors text-emerald-800 placeholder-emerald-400"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 w-5 h-5" />
                  <select
                    value={skillFilter}
                    onChange={(e) => setSkillFilter(e.target.value)}
                    className="pl-10 pr-8 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-700 focus:outline-none transition-colors text-emerald-800 bg-white min-w-[140px]"
                  >
                    <option value="all">ระดับทั้งหมด</option>
                    <option value="beginner">มือใหม่</option>
                    <option value="intermediate">ปานกลาง</option>
                    <option value="advanced">ขั้นสูง</option>
                  </select>
                </div>
                
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700 w-5 h-5" />
                  <select
                    value={dayFilter}
                    onChange={(e) => setDayFilter(e.target.value)}
                    className="pl-10 pr-8 py-3 border-2 border-emerald-200 rounded-xl focus:border-emerald-700 focus:outline-none transition-colors text-emerald-800 bg-white min-w-[120px]"
                  >
                    <option value="all">ทุกวัน</option>
                    <option value="จันทร์">จันทร์</option>
                    <option value="อังคาร">อังคาร</option>
                    <option value="พุธ">พุธ</option>
                    <option value="พฤหัสบดี">พฤหัสบดี</option>
                    <option value="ศุกร์">ศุกร์</option>
                    <option value="เสาร์">เสาร์</option>
                    <option value="อาทิตย์">อาทิตย์</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Match Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <div key={match._id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-200">
                {/* Card Header */}
                <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 p-4">
                  <div className="flex items-center space-x-3">
                    {match.logoUrl ? (
                      <img
                        src={`http://localhost:8080${match.logoUrl}`}
                        alt="Team Logo"
                        className="w-12 h-12 object-cover rounded-full border-2 border-white shadow-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <User className="w-6 h-6 text-emerald-700" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white truncate">{match.title}</h2>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getSkillLevelColor(match.skillLevel)}`}>
                        {getSkillLevelText(match.skillLevel)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{match.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-emerald-700">
                      <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{formatDate(match.day)}</span>
                    </div>
                    <div className="flex items-center text-emerald-700">
                      <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">{match.timeRange} น.</span>
                    </div>
                    <div className="flex items-center text-emerald-700">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm truncate">{match.location}</span>
                    </div>
                    <div className="flex items-center text-emerald-700">
                      <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        {getFilledPositions(match.positions)}/{match.requiredPlayers} คน
                      </span>
                      <div className="ml-2 flex-1 bg-emerald-100 rounded-full h-2">
                        <div 
                          className="bg-emerald-700 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(getFilledPositions(match.positions) / match.requiredPlayers) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/match/${match._id}`)}
                    className="w-full bg-gradient-to-r from-emerald-700 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-800 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform active:scale-95"
                  >
                    ดูรายละเอียด
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto border border-gray-200">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-emerald-700" />
                </div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">ไม่พบแมตช์</h3>
                <p className="text-emerald-600">ไม่พบแมตช์ที่ตรงกับเงื่อนไขการค้นหาของคุณ</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatchListPage;