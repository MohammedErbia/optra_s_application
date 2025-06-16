import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background-light dark:bg-optra-black pt-12 border-t border-gray-200 dark:border-[#2c2c2c] transition-colors">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" onClick={scrollToTop}>
              <img src="/images/img_logo.svg" alt="Optra Logo" className="h-[45px] w-[209px] mb-6 h-8 w-auto sm:h-10 md:h-[45px]"
            />
            </Link>
            <p className="text-text-light dark:text-white text-base leading-relaxed mb-8 max-w-xs font-roboto transition-colors text-sm sm:text-base">
              IT solutions Agency company founded in 2024, specializing in integrated software solutions that help businesses digitally transform and improve operational efficiency through custom-designed systems
            </p>
            
            <div className="flex space-x-4"> 
              <a href="https://www.facebook.com/optraagency" target="_blank" rel="noopener noreferrer">
                <img src="/images/img_icon_jamicons_outline_logos_facebook.svg" alt="Facebook" className="w-6 h-6 w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://x.com/Agency_Optra" target="_blank" rel="noopener noreferrer">
                <img src="/images/img_icon_jamicons_outline_logos_twitter.svg" alt="Twitter" className="w-6 h-6 w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.instagram.com/optraagency" target="_blank" rel="noopener noreferrer">
                <img src="/images/img_icon_jamicons_outline_logos_instagram.svg" alt="Instagram" className="w-6 h-6 w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a href="https://www.linkedin.com/in/optraagency" target="_blank" rel="noopener noreferrer">
                <img src="/images/img_icon_jamicons_outline_logos_linkedin.svg" alt="LinkedIn" className="w-6 h-6 w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-text-light dark:text-white text-base font-medium mb-4 capitalize font-cairo transition-colors sm:text-sm md:text-base">Services</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/custom-software" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  Custom Software Solutions
                </Link>
              </li>
              <li>
                <Link to="/app-development" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  App Development
                </Link>
              </li>
              <li>
                <Link to="/technical-services" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  Technical Services
                </Link>
              </li>
              <li>
                <Link to="/ecommerce-solutions" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  E-commerce Solutions
                </Link>
              </li>
              <li>
                <Link to="/website-design" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  Website Design
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-text-light dark:text-white text-base font-medium mb-4 capitalize font-cairo transition-colors sm:text-sm md:text-base">Why Optra?</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/who-we-are" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green lowercase font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  Who We Are
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  Vision
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  Mission
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  Frequently Asked Questions (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  Team
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-text-light dark:text-white text-base font-medium mb-4 font-roboto transition-colors sm:text-sm md:text-base">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <img src="/images/img_marker.svg" alt="Location" className="w-6 h-6 mr-2 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-gray-600 dark:text-[#e0e0e0] text-base font-roboto transition-colors text-sm sm:text-base">Palestine Gaza</span>
              </li>
              <li className="flex items-center">
                <img src="/images/img_phone.svg" alt="Phone" className="w-5 h-5 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-gray-600 dark:text-[#e0e0e0] text-base font-roboto transition-colors text-sm sm:text-base">+9701234567654</span>
              </li>
              <li className="flex items-center">
                <img src="/images/img_mail.svg" alt="Email" className="w-5 h-5 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <a 
                  href="mailto:info@optraagency.com" 
                  className="text-blue-600 dark:text-[#007fff] text-base underline font-roboto transition-colors text-sm sm:text-base"
                >
                  info@optraagency.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-[#2c2c2c] mt-12 py-6 transition-colors">
          <p className="text-text-light dark:text-white text-base text-center font-roboto transition-colors text-sm sm:text-base">
            All Rights Reserved 2025| @OPTRA SOFWARE SOLUTIONS AGENCY
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;