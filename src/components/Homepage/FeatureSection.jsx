import React from "react";
import FeatureCard from "./FeatureCard";
import { Search, User, Users } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: "ค้นหาแมตช์",
      description: "ค้นหาแมตช์ที่ตรงกับเวลาและสถานที่ที่คุณต้องการ",
    },
    {
      icon: <User className="w-8 h-8 text-green-600" />,
      title: "เลือกตำแหน่งที่ชอบ",
      description: "เลือกตำแหน่งในสนามที่คุณถนัด",
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "สร้างและจัดการทีม",
      description: "สร้างทีมของคุณเองและเชิญเพื่อนเข้าร่วม",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-green-800 mb-12">
          คุณสมบัติหลัก
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
