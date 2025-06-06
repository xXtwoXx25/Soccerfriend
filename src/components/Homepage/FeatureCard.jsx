import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-green-200 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-50">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
