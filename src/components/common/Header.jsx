import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import ThemeToggle from '../ThemeToggle';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Why Optra?', path: '/who-we-are', dropdown: [
    { label: 'Who We Are', path: '/who-we-are' },
    { label: 'Vision', path: '/vision' },
    { label: 'Mission', path: '/mission' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Team', path: '/team' },
  ] },
  { label: 'Services', path: '/web-development', dropdown: [
    { label: 'Web Application Development', path: '/web-development' },
    { label: 'Mobile Application Development', path: '/mobile-development' },
    { label: 'ERP Systems', path: '/erp-systems' },
    { label: 'E-Commerce Solutions', path: '/ecommerce' },
    { label: 'Translation Services', path: '/translation' },
    { label: 'Digital Marketing', path: '/digital-marketing' },
  ] },
  { label: 'Works', path: '/works' },
  { label: 'Blog', path: '/blog' },
  { label: 'Careers', path: '/careers' },
];

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef();
  const sideMenuRef = useRef();

  // Handle nav underline
  const getActiveIndex = () => {
    const idx = navItems.findIndex(item => {
      if (item.dropdown) {
        return item.dropdown.some(sub => location.pathname.startsWith(sub.path));
      }
      return location.pathname === item.path;
    });
    return idx === -1 ? 0 : idx;
  };
  const activeIdx = getActiveIndex();

  // Dropdown hover logic
  const handleDropdownEnter = (idx) => setOpenDropdown(idx);
  const handleDropdownLeave = () => setOpenDropdown(null);

  // Language toggle
  const handleLanguageToggle = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'ar' : 'en';
      console.log('Language switched to', next);
      return next;
    });
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-background-light dark:bg-optra-black border-b border-border-light dark:border-[#2c2c2c] h-24 fixed top-0 left-0 right-0 z-50 transition-colors">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/images/optra-logo.png" alt="Optra Logo" className="h-[45px] w-[45px] mr-2" />
          <span className="font-orbitron font-extrabold text-2xl tracking-wide select-none transition-colors text-[#18181B] dark:text-white">OPTRA</span>
        </Link>

        <nav ref={navRef} className="hidden md:flex items-center space-x-6 relative">
          {navItems.map((item, idx) => (
            <div
              key={item.label}
              className="relative flex flex-col items-center"
              onMouseEnter={() => item.dropdown && handleDropdownEnter(idx)}
              onMouseLeave={item.dropdown ? handleDropdownLeave : undefined}
            >
              <Link
                to={item.path}
                className={`text-text-light dark:text-white font-semibold text-base font-cairo px-2 pb-1 transition-colors ${activeIdx === idx ? 'relative' : ''}`}
                style={{ position: 'relative' }}
              >
                {item.label}
                {activeIdx === idx && (
                  <span className="absolute left-0 right-0 -bottom-1 h-1 bg-[#14B8A6] rounded transition-all" style={{ width: '100%' }} />
                )}
              </Link>
              {item.dropdown && openDropdown === idx && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-background-light dark:bg-optra-black border border-border-light dark:border-[#2c2c2c] rounded-md shadow-lg py-2 z-10 animate-fade-in">
                  {item.dropdown.map(sub => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="block px-4 py-2 text-text-light dark:text-white hover:bg-gray-100 dark:hover:bg-optra-darkGray"
                      onClick={closeMenu}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={handleLanguageToggle}
            className="flex items-center px-3 py-2 rounded-lg border border-[#14B8A6] text-[#14B8A6] font-bold font-cairo hover:bg-[#14B8A6] hover:text-white transition-colors"
            aria-label="Toggle language"
          >
            <img src="/images/img_translate.svg" alt="Language" className="w-6 h-6 mr-1" />
            {language === 'en' ? 'عربي' : 'English'}
          </button>
          <Button
            variant="primary"
            className="h-12 rounded-lg"
            icon={<img src="/images/img_icon_jamicons_outline_logos_arrowright.svg" alt="Arrow" className="w-6 h-6" />}
          >
            Apply now
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-text-light dark:text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <div 
        ref={sideMenuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-background-light dark:bg-optra-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6">
          <button onClick={toggleMenu} className="text-text-light dark:text-white absolute top-4 right-4 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="mt-12">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.dropdown ? (
                    <div className="text-text-light dark:text-white font-semibold text-lg font-cairo cursor-pointer" onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}>
                      {item.label}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block text-text-light dark:text-white font-semibold text-lg font-cairo hover:text-optra-green transition-colors"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.dropdown && openDropdown === item.label && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map(sub => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block text-text-light dark:text-white text-base font-cairo hover:text-optra-green transition-colors"
                          onClick={closeMenu}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-8 flex flex-col space-y-4">
              <ThemeToggle />
               <button
                onClick={() => {handleLanguageToggle(); closeMenu();}}
                className="flex items-center px-3 py-2 rounded-lg border border-[#14B8A6] text-[#14B8A6] font-bold font-cairo hover:bg-[#14B8A6] hover:text-white transition-colors justify-center"
                aria-label="Toggle language"
              >
                <img src="/images/img_translate.svg" alt="Language" className="w-6 h-6 mr-1" />
                {language === 'en' ? 'عربي' : 'English'}
              </button>
              <Button
                variant="primary"
                className="h-12 rounded-lg w-full"
                icon={<img src="/images/img_icon_jamicons_outline_logos_arrowright.svg" alt="Arrow" className="w-6 h-6" />}
                 onClick={() => {window.location.href = '/apply'; closeMenu();}}
              >
                Apply now
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;