import React from 'react';

const AuthLayout = ({ children, backgroundImage }) => {
  return (
    <div
      className="min-h-screen flex justify-center items-center p-5 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-green-900/50 z-10"></div>
      <div className="w-full max-w-[450px] bg-white/90 rounded-xl shadow-lg p-10 relative z-20">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
