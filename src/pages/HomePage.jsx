import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User, Users, Calendar, Search, Award } from "lucide-react";
import "../styles/HomePage.css";

const HomePage = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (token) {
      fetch("http://localhost:8080/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.email) {
            setUserEmail(data.email);
          }
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    }
  }, [token]);

  const features = [
    {
      icon: <Search className="feature-icon" />,
      title: "ค้นหาแมตช์",
      description: "ค้นหาแมตช์ที่ตรงกับเวลาและสถานที่ที่คุณต้องการ",
    },
    {
      icon: <User className="feature-icon" />,
      title: "เลือกตำแหน่งที่ชอบ",
      description: "เลือกตำแหน่งในสนามที่คุณถนัด",
    },
    {
      icon: <Users className="feature-icon" />,
      title: "สร้างและจัดการทีม",
      description: "สร้างทีมของคุณเองและเชิญเพื่อนเข้าร่วม",
    },
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                {userEmail
                  ? `สวัสดี, ${userEmail}`
                  : "ค้นหาแมตช์ฟุตบอล"}{" "}
                <br />
                <span className="title-highlight">และเพื่อนร่วมทีม</span>
              </h1>
              <p className="hero-description">
                แพลตฟอร์มสำหรับคนรักฟุตบอล ที่ต้องการหาแมตช์ หาเพื่อนร่วมทีม
                และจัดการทีมของคุณ
              </p>
              <div className="hero-buttons">
                <Link to="/position-selection" className="btn btn-primary">
                  เริ่มค้นหาแมตช์
                </Link>
                {!token && (
                  <Link to="/register" className="btn btn-outline">
                    สมัครสมาชิก
                  </Link>
                )}
              </div>
            </div>
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1170&auto=format&fit=crop"
                alt="Soccer Players"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">คุณสมบัติหลัก</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title">พร้อมที่จะเริ่มใช้งานแล้วหรือยัง?</h2>
          <p className="cta-description">
            สมัครสมาชิกฟรี และเริ่มค้นหาแมตช์และเพื่อนร่วมทีมได้เลยวันนี้
          </p>
          <div className="cta-buttons">
            <Link to="/position-selection" className="btn btn-primary">
              เริ่มค้นหาแมตช์
            </Link>
            {!token && (
              <Link to="/register" className="btn btn-outline-dark">
                สมัครสมาชิก
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;