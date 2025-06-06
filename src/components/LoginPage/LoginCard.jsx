import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <div className="bg-white/90 p-8 rounded-xl w-full max-w-[400px] shadow-lg">
      <h2 className="text-center mb-5 text-gray-800 text-2xl font-semibold">เข้าสู่ระบบ SoccerFriend</h2>
      <LoginForm />
      <p className="text-center mt-4 text-gray-600">
        ยังไม่มีบัญชีใช่ไหม ?<Link to="/register" className="text-blue-600 hover:text-blue-800"> สมัครสมาชิกเลย</Link>
      </p>
    </div>
  );
};

export default LoginCard;
