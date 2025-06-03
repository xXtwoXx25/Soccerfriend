// FooterBottom.jsx
const currentYear = new Date().getFullYear();

const FooterBottom = () => (
  <div className="flex flex-col items-center pt-6 border-t border-white/10 md:flex-row md:justify-between">
    <div className="text-[#a7f3d0] text-sm mb-4 md:mb-0">
      <p>© {currentYear} SoccerFriend. สงวนลิขสิทธิ์.</p>
    </div>
  </div>
);

export default FooterBottom;
