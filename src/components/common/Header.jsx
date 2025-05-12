import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const Header = () => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isWhyOptraOpen, setIsWhyOptraOpen] = useState(false);

  return (
    <header className="bg-optra-black border-b border-[#2c2c2c] h-24 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/images/img_logo.svg" alt="Optra Logo" className="h-[45px] w-[173px]" />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white font-semibold text-base font-cairo">
            Home
          </Link>
          
          <div className="relative">
            <button 
              className="flex items-center text-white font-medium text-base font-cairo"
              onClick={() => setIsWhyOptraOpen(!isWhyOptraOpen)}
            >
              Why Optra?
              <img 
                src="/images/img_icon_jamicons_outline_logos_chevrondown.svg" 
                alt="Dropdown" 
                className="ml-2 w-6 h-6"
              />
            </button>
            
            {isWhyOptraOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-optra-black border border-[#2c2c2c] rounded-md shadow-lg py-2 z-10">
                <Link to="/who-we-are" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  Who We Are
                </Link>
                <Link to="/vision" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  Vision
                </Link>
                <Link to="/mission" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  Mission
                </Link>
                <Link to="/faq" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  FAQ
                </Link>
                <Link to="/team" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  Team
                </Link>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              className="flex items-center text-white font-medium text-base font-cairo"
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Services
              <img 
                src="/images/img_icon_jamicons_outline_logos_chevrondown.svg" 
                alt="Dropdown" 
                className="ml-2 w-6 h-6"
              />
            </button>
            
            {isServicesOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-optra-black border border-[#2c2c2c] rounded-md shadow-lg py-2 z-10">
                <Link to="/web-development" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  Web Application Development
                </Link>
                <Link to="/mobile-development" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  Mobile Application Development
                </Link>
                <Link to="/erp-systems" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  ERP Systems
                </Link>
                <Link to="/ecommerce" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  E-Commerce Solutions
                </Link>
                <Link to="/translation" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  Translation Services
                </Link>
                <Link to="/digital-marketing" className="block px-4 py-2 text-white hover:bg-optra-darkGray">
                  Digital Marketing
                </Link>
              </div>
            )}
          </div>
          
          <Link to="/works" className="text-white font-medium text-base font-cairo">
            Works
          </Link>
          
          <Link to="/blog" className="text-white font-medium text-base font-cairo">
            Blog
          </Link>
          
          <Link to="/careers" className="text-white font-medium text-base font-cairo">
            Careers
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <img src="/images/img_translate.svg" alt="Language" className="w-8 h-8" />
            <span className="text-white font-semibold text-base ml-1 font-cairo">عربي</span>
          </div>
          
          <img src="/images/img_vector.svg" alt="Search" className="w-5 h-5" />
          
          <Button 
            variant="primary" 
            className="h-12 rounded-lg"
            icon={<img src="/images/img_icon_jamicons_outline_logos_arrowright.svg" alt="Arrow" className="w-6 h-6" />}
          >
            Apply now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;