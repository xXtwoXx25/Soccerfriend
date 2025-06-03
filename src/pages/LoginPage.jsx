import React from "react";
import LoginCard from "../components/LoginPage/LoginCard";
import fieldImg from "../assets/Football.jpg";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `url(${fieldImg})`,
      }}
    >
      <div className="absolute inset-0 bg-green-900/50"></div>
      <div className="relative z-10 w-full max-w-md px-4">
        <LoginCard />
      </div>
    </div>
  );
};

export default LoginPage;
