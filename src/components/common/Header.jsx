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
  const location = useLocation();
  const navRef = useRef();

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
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
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
      </div>
    </header>
  );
};

export default Header;