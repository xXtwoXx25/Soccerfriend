import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import '../styles/Footer.css';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="sf-footer">
      <div className="sf-footer-container">
        <div className="sf-footer-top">
          <div className="sf-footer-brand">
            <Link to="/" className="sf-footer-logo">
              <span>SoccerFriend</span>
            </Link>
            <p className="sf-footer-tagline">
              แพลตฟอร์มสำหรับคนรักฟุตบอล เชื่อมต่อผู้เล่น สร้างเกมที่สนุก
            </p>
            <div className="sf-social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="sf-social-link">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="sf-social-link">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="sf-social-link">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="sf-footer-links">
            <div className="sf-footer-links-section">
              <h3 className="sf-footer-heading">เกี่ยวกับเรา</h3>
              <ul className="sf-footer-menu">
                <li><Link to="/about" className="sf-footer-link">เกี่ยวกับ SoccerFriend</Link></li>
                <li><Link to="/team" className="sf-footer-link">ทีมงานของเรา</Link></li>
                <li><Link to="/careers" className="sf-footer-link">ร่วมงานกับเรา</Link></li>
                <li><Link to="/news" className="sf-footer-link">ข่าวสารและบทความ</Link></li>
              </ul>
            </div>

            <div className="sf-footer-links-section">
              <h3 className="sf-footer-heading">เริ่มต้นใช้งาน</h3>
              <ul className="sf-footer-menu">
                <li><Link to="/how-it-works" className="sf-footer-link">วิธีใช้งาน</Link></li>
                <li><Link to="/create-team" className="sf-footer-link">สร้างทีม</Link></li>
                <li><Link to="/find-match" className="sf-footer-link">ค้นหาแมตช์</Link></li>
                <li><Link to="/position-selection" className="sf-footer-link">เลือกตำแหน่ง</Link></li>
              </ul>
            </div>

            <div className="sf-footer-links-section">
              <h3 className="sf-footer-heading">ช่วยเหลือ</h3>
              <ul className="sf-footer-menu">
                <li><Link to="/faq" className="sf-footer-link">คำถามที่พบบ่อย</Link></li>
                <li><Link to="/support" className="sf-footer-link">ศูนย์ช่วยเหลือ</Link></li>
                <li><Link to="/terms" className="sf-footer-link">ข้อกำหนดการใช้งาน</Link></li>
                <li><Link to="/privacy" className="sf-footer-link">นโยบายความเป็นส่วนตัว</Link></li>
              </ul>
            </div>
          </div>

          <div className="sf-footer-contact">
            <h3 className="sf-footer-heading">ติดต่อเรา</h3>
            <div className="sf-contact-info">
              <div className="sf-contact-item">
                <MapPin size={18} />
                <span>123 ถนนกีฬา เขตสนามกีฬา กรุงเทพฯ 10110</span>
              </div>
              <div className="sf-contact-item">
                <Phone size={18} />
                <span>02-123-4567</span>
              </div>
              <div className="sf-contact-item">
                <Mail size={18} />
                <span>contact@soccerfriend.com</span>
              </div>
            </div>
            <div className="sf-newsletter">
              <h4 className="sf-newsletter-heading">รับข่าวสารจากเรา</h4>
              <div className="sf-newsletter-form">
                <input 
                  type="email" 
                  placeholder="อีเมลของคุณ" 
                  className="sf-newsletter-input" 
                />
                <button className="sf-newsletter-button">ติดตาม</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="sf-footer-bottom">
          <div className="sf-footer-copyright">
            <p>© {currentYear} SoccerFriend. สงวนลิขสิทธิ์.</p>
          </div>
          <div className="sf-footer-language-selector">
            <select className="sf-language-select">
              <option value="th">ภาษาไทย</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;