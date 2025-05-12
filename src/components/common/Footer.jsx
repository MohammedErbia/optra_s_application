import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-optra-black pt-12 border-t border-[#e2e8f0]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/">
              <img src="/images/img_logo.svg" alt="Optra Logo" className="h-[45px] w-[209px] mb-6" />
            </Link>
            <p className="text-white text-base leading-relaxed mb-8 max-w-xs font-roboto">
              IT solutions Agency company founded in 2024, specializing in integrated software solutions that help businesses digitally transform and improve operational efficiency through custom-designed systems
            </p>
            
            <div className="flex space-x-4">
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/img_icon_jamicons_outline_logos_youtube.svg" alt="YouTube" className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/img_icon_jamicons_outline_logos_facebook.svg" alt="Facebook" className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/img_icon_jamicons_outline_logos_twitter.svg" alt="Twitter" className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/img_icon_jamicons_outline_logos_instagram.svg" alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="/images/img_icon_jamicons_outline_logos_linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white text-base font-medium mb-4 capitalize font-cairo">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/custom-software" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  Custom Software Solutions
                </Link>
              </li>
              <li>
                <Link to="/app-development" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  App Development
                </Link>
              </li>
              <li>
                <Link to="/technical-services" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  Technical Services
                </Link>
              </li>
              <li>
                <Link to="/ecommerce-solutions" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link to="/website-design" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  Website Design
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white text-base font-medium mb-4 capitalize font-cairo">Why Optra?</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/who-we-are" className="text-[#e0e0e0] text-base hover:text-optra-green lowercase font-roboto">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/vision" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  Vision
                </Link>
              </li>
              <li>
                <Link to="/mission" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  Mission
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  Frequently Asked Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-[#e0e0e0] text-base hover:text-optra-green font-roboto">
                  Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-white text-base font-medium mb-4 font-roboto">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <img src="/images/img_marker.svg" alt="Location" className="w-6 h-6 mr-2 mt-0.5" />
                <span className="text-[#e0e0e0] text-base font-roboto">Palestine Gaza</span>
              </li>
              <li className="flex items-center">
                <img src="/images/img_phone.svg" alt="Phone" className="w-5 h-5 mr-2" />
                <span className="text-[#e0e0e0] text-base font-roboto">+9701234567654</span>
              </li>
              <li className="flex items-center">
                <img src="/images/img_mail.svg" alt="Email" className="w-5 h-5 mr-2" />
                <a 
                  href="mailto:info@optraagency.com" 
                  className="text-[#007fff] text-base underline font-roboto"
                >
                  info@optraagency.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#2c2c2c] mt-12 py-6">
          <p className="text-white text-base text-center font-roboto">
            All Rights Reserved 2025| @OPTRA SOFWARE SOLUTIONS AGENCY
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;