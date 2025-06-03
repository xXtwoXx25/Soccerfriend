// Footer.jsx
import React from 'react';
import BrandSection from './BrandSection';
import LinksSection from './LinksSection';
import ContactSection from './ContactSection';
import FooterBottom from './FooterBottom';

const Footer = () => (
  <footer className="bg-[#0a3622] text-[#f8fafc] py-16 pb-6 font-sans">
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="grid gap-10 mb-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_3fr_2fr] lg:gap-16">
        <BrandSection />
        <LinksSection />
        <ContactSection />
      </div>
      <FooterBottom />
    </div>
  </footer>
);

export default Footer;
