import React from "react";
import { Link } from "react-router-dom";

const CTASection = ({ token }) => {
  return (
    <section className="py-16 bg-green-50 text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-4">
          พร้อมที่จะเริ่มใช้งานแล้วหรือยัง?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          สมัครสมาชิกฟรี และเริ่มค้นหาแมตช์และเพื่อนร่วมทีมได้เลยวันนี้
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link
            to="/position-selection"
            className="inline-block px-6 py-3 text-base font-medium text-white bg-green-600 rounded-lg transition-all duration-200 hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5"
          >
            เริ่มค้นหาแมตช์
          </Link>
          {!token && (
            <Link
              to="/register"
              className="inline-block px-6 py-3 text-base font-medium text-green-600 border-2 border-green-600 rounded-lg transition-all duration-200 hover:bg-green-50 hover:-translate-y-0.5"
            >
              สมัครสมาชิก
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
