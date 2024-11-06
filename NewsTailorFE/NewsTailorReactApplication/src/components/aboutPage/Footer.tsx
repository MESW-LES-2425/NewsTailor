import React from 'react';
import '../../styles/aboutPage/Footer.css';
import { FaReact } from 'react-icons/fa';
import { SiDjango } from 'react-icons/si';
import { BiLogoTypescript } from "react-icons/bi";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <FaReact className="footer-icon react-icon" title="React" />
        <SiDjango className="footer-icon django-icon" title="Django" />
        <BiLogoTypescript className="footer-icon typescript-icon" title="TypeScript" />
      </div>
    </footer>
  );
};

export default Footer;
