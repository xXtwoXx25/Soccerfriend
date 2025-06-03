// BrandSection.jsx
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const BrandSection = () => (
  <div className="text-center lg:text-left space-y-4">
    <Link to="/" className="text-[#f8fafc] text-2xl font-bold">
      SoccerFriend
    </Link>
    <p className="text-[#d1fae5] text-sm leading-relaxed">
      แพลตฟอร์มสำหรับคนรักฟุตบอล เชื่อมต่อผู้เล่น สร้างเกมที่สนุก
    </p>
    <div className="flex justify-center lg:justify-start space-x-4">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#d1fae5] hover:text-[#4ade80] transition-colors"
      >
        <Facebook size={20} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#d1fae5] hover:text-[#4ade80] transition-colors"
      >
        <Instagram size={20} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#d1fae5] hover:text-[#4ade80] transition-colors"
      >
        <Twitter size={20} />
      </a>
    </div>
  </div>
);

export default BrandSection;
