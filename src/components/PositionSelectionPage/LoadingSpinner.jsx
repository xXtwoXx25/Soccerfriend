import React from "react";

const LoadingSpinner = () => (
  <div className="flex flex-col items-center p-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mb-5"></div>
    <p className="text-white text-base text-center m-0">กำลังค้นหาทีมที่ต้องการผู้เล่นในตำแหน่งนี้...</p>
  </div>
);

export default LoadingSpinner;
