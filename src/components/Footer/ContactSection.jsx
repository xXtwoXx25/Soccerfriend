import { MapPin, Phone, Mail } from 'lucide-react';

const ContactSection = () => (
  <div>
    <h3 className="text-[#f8fafc] text-base font-semibold mb-5 pb-2.5 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#10b981]">
      ติดต่อเรา
    </h3>
    <div className="mb-6">
      <div className="flex items-start mb-4 text-[#d1fae5] text-sm">
        <MapPin className="mr-3 min-w-[18px] text-[#4ade80]" size={18} />
        <span>126 ถนนประชาอุทิศ แขวงบางมด เขตทุ่งครุ กทม. 10140</span>
      </div>
      <div className="flex items-start mb-4 text-[#d1fae5] text-sm">
        <Phone className="mr-3 min-w-[18px] text-[#4ade80]" size={18} />
        <span>02-123-4567</span>
      </div>
      <div className="flex items-start mb-4 text-[#d1fae5] text-sm">
        <Mail className="mr-3 min-w-[18px] text-[#4ade80]" size={18} />
        <span>contact@soccerfriend.com</span>
      </div>
    </div>
  </div>
);

export default ContactSection;
