import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/hero-image.jpg";

const HeroSection = ({ userEmail, token }) => {
  return (
    <section className="bg-gradient-to-br from-green-800 to-green-700 text-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Hero image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              {userEmail ? `สวัสดี, ${userEmail}` : "ค้นหาแมตช์ฟุตบอล"}
              <br />
              <span className="text-lime-400">และเพื่อนร่วมทีม</span>
            </h1>
            <p className="text-lg md:text-xl opacity-90">
              แพลตฟอร์มสำหรับคนรักฟุตบอล ที่ต้องการหาแมตช์ หาเพื่อนร่วมทีม
              และจัดการทีมของคุณ
            </p>
            <div className="flex gap-4">
              <Link
                to="/position-selection"
                className="inline-block px-6 py-3 text-base font-medium text-green-800 bg-white rounded-lg transition-all duration-200 hover:bg-green-50 hover:shadow-lg hover:-translate-y-0.5"
              >
                เริ่มค้นหาแมตช์
              </Link>
              {!token && (
                <Link
                  to="/register"
                  className="inline-block px-6 py-3 text-base font-medium text-white border-2 border-white rounded-lg transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  สมัครสมาชิก
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
