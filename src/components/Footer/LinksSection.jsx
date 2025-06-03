// LinksSection.jsx
import { Link } from 'react-router-dom';

const LinksSection = () => (
  <div className="grid grid-cols-2 gap-8 lg:grid-cols-3">
    <div>
      <h3 className="text-[#f8fafc] text-base font-semibold mb-5 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#10b981]">
        เกี่ยวกับเรา
      </h3>
      <ul className="list-none p-0 m-0">
        <li className="mb-3">
          <Link to="/about" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            เกี่ยวกับ SoccerFriend
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/team" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            ทีมงานของเรา
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/careers" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            ร่วมงานกับเรา
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/news" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            ข่าวสารและบทความ
          </Link>
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-[#f8fafc] text-base font-semibold mb-5 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#10b981]">
        เริ่มต้นใช้งาน
      </h3>
      <ul className="list-none p-0 m-0">
        <li className="mb-3">
          <Link to="/how-it-works" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            วิธีใช้งาน
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/create-team" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            สร้างทีม
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/find-match" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            ค้นหาแมตช์
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/position-selection" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            เลือกตำแหน่ง
          </Link>
        </li>
      </ul>
    </div>

    <div>
      <h3 className="text-[#f8fafc] text-base font-semibold mb-5 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#10b981]">
        ช่วยเหลือ
      </h3>
      <ul className="list-none p-0 m-0">
        <li className="mb-3">
          <Link to="/faq" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            คำถามที่พบบ่อย
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/support" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            ศูนย์ช่วยเหลือ
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/terms" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            ข้อกำหนดการใช้งาน
          </Link>
        </li>
        <li className="mb-3">
          <Link to="/privacy" className="text-[#d1fae5] text-sm hover:text-[#4ade80] hover:underline inline-block">
            นโยบายความเป็นส่วนตัว
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default LinksSection;
