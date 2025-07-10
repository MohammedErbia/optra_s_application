import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher';
import { useData } from '../../hooks/useData.ts';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef();
  const sideMenuRef = useRef();
  const dropdownTimeoutRef = useRef(null); // Ref to store timeout ID

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { data: services, loading: servicesLoading } = useData({ table: 'services' });

  const navItems = [
    { label: 'nav.home', path: '/' },
    ...(isArabic ? [{ label: 'spacer', isSpacer: true }] : []),
    { label: 'nav.whyOptra', path: '/who-we-are', dropdown: [
      { label: 'nav.whoWeAre', path: '/who-we-are' },
      { label: 'nav.vision', path: '/who-we-are' },
      { label: 'nav.mission', path: '/who-we-are' },
      { label: 'nav.faq', path: '/faq' },
      { label: 'nav.team', path: '/team' },
    ] },
    {
      label: 'nav.services',
      path: '/services',
      dropdown: services.map(service => ({
        label: isArabic ? service.title_ar || service.title : service.title,
        path: '/services'
      }))
    },
    { label: 'nav.works', path: '/works' },
    { label: 'nav.blog', path: '/blog' },
    { label: 'nav.careers', path: '/careers' },
  ];

  // Handle nav underline
  const getActiveIndex = () => {
    const idx = navItems.findIndex(item => {
      if (item.dropdown) {
        // Special handling for services page
        if (item.path === '/services' && location.pathname === '/services') {
          return true;
        }
        return item.dropdown.some(sub => location.pathname.startsWith(sub.path));
      }
      // Special handling for blog pages: highlight 'Blog' if path starts with '/blog'
      if (item.path === '/blog') {
        return location.pathname.startsWith('/blog');
      }
      // Special handling for careers pages: highlight 'Careers' if path starts with '/careers'
      if (item.path === '/careers') {
        return location.pathname.startsWith('/careers');
      }
      return location.pathname === item.path;
    });
    return idx === -1 ? 0 : idx;
  };
  const activeIdx = getActiveIndex();

  // Dropdown hover logic with delay
  const handleDropdownEnter = (idx) => {
    clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(idx);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200); // 200ms delay before closing (adjust as needed)
  };

  // Language toggle
  const handleLanguageToggle = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'ar' : 'en';
      // console.log('Language switched to', next);
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
            item.isSpacer ? (
              <span
                key={`spacer-${idx}`}
                aria-hidden="true"
                style={{ display: 'inline-block', width: 40 }}
                className="mx-2"
              />
            ) : (
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
                  {t(item.label) || item.label}
                  {activeIdx === idx && (
                    <span className="absolute left-0 right-0 -bottom-1 h-1 bg-[#14B8A6] rounded transition-all" style={{ width: '100%' }} />
                  )}
                </Link>
                {item.dropdown && openDropdown === idx && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-background-light dark:bg-optra-black border border-border-light dark:border-[#2c2c2c] rounded-md shadow-lg py-2 z-10 animate-fade-in"
                    onMouseEnter={() => clearTimeout(dropdownTimeoutRef.current)} // Keep open when hovering dropdown
                    onMouseLeave={handleDropdownLeave} // Set timeout to close when leaving dropdown
                  >
                    {item.dropdown.map((sub, subIdx) => (
                      <Link
                        key={`${sub.path}-${subIdx}`}
                        to={sub.path}
                        className="block px-4 py-2 text-text-light dark:text-white hover:bg-gray-100 dark:hover:bg-optra-darkGray"
                        onClick={() => setOpenDropdown(null)} // Close dropdown on link click
                      >
                        {sub.label.startsWith('nav.') ? t(sub.label) : sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link to="/apply">
            <Button
              variant="primary"
              className="h-12 rounded-lg"
              icon={<img src="/images/img_icon_jamicons_outline_logos_arrowright.svg" alt="Arrow" className="w-6 h-6" />}
            >
              {t('nav.applyNow')}
            </Button>
          </Link>
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
                      {t(item.label) || item.label}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      className="block text-text-light dark:text-white font-semibold text-lg font-cairo hover:text-optra-green transition-colors"
                      onClick={closeMenu}
                    >
                      {t(item.label) || item.label}
                    </Link>
                  )}
                  {item.dropdown && openDropdown === item.label && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.dropdown.map((sub, subIdx) => (
                        <Link
                          key={`${sub.path}-${subIdx}`}
                          to={sub.path}
                          className="block text-text-light dark:text-white text-base font-cairo hover:text-optra-green transition-colors"
                          onClick={closeMenu} // Close mobile menu and dropdown on link click
                        >
                          {sub.label.startsWith('nav.') ? t(sub.label) : sub.label}
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
              <Link to="/apply">
                <Button
                  variant="primary"
                  className="h-12 rounded-lg w-full"
                  icon={<img src="/images/img_icon_jamicons_outline_logos_arrowright.svg" alt="Arrow" className="w-6 h-6" />}
                   onClick={() => {window.location.href = '/apply'; closeMenu();}}
                >
                  {t('nav.applyNow')}
                </Button>
              </Link>
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