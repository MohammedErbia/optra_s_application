import React, { useEffect, useRef } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import PartnersSection from './PartnersSection';
import AboutSection from './AboutSection';
import MissionSection from './MissionSection';
import ServicesSection from './ServicesSection';
import ProjectsSection from './ProjectsSection';
import TestimonialsSection from './TestimonialsSection';
import CtaSection from './CtaSection';
import gsap from 'gsap';
import { useTheme } from '../../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

const HomePage = () => {
  const imageRef = useRef(null);
  const { isDarkMode } = useTheme();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
     
  useEffect(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: -80, // Move 100 pixels horizontally
        duration: 8, // Animation duration in seconds (slow)
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Go back and forth
        ease: "sine.inOut" // Smooth easing
      });
    }

    // Cleanup function to kill the animation on component unmount
    return () => {
      if (imageRef.current) {
        gsap.killTweensOf(imageRef.current);
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once


  return (
    <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-background-light dark:bg-optra-black pt-24 relative min-h-[950px] flex items-center transition-colors">
        <div className="absolute top-0 left-0 z-0">
          <img src="/images/img_frame_2310.svg" alt="Background Pattern" className="h-[1020px] w-[366px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-light dark:text-white mb-6 leading-tight font-cairo transition-colors text-center">
            {isArabic ? (
              <>
                {t('weTransform')} {" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t('ideas')}</span>
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-teal-400"></span>
                </span>{" "}
                {t('into')}
                <br />
                {t('solutions')} {" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t('digital')}</span>
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-teal-400"></span>
                </span>
              </>
            ) : (
              <>
                {t('weTransform')} {" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t('ideas')}</span>
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-teal-400"></span>
                </span>{" "}
                {t('into')} <br />
                {t('digital')} {" "}
                <span className="relative inline-block">
                  <span className="relative z-10">{t('solutions')}</span>
                  <span className="absolute left-0 bottom-0 w-full h-1 bg-teal-400"></span>
                </span>
              </>
            )}
          </h1>
          <br />

            <p className="text-lg text-text-light dark:text-white mb-10 font-cairo transition-colors sm:text-base md:text-lg">
              <Trans i18nKey="heroSubtitle" />
            </p>
            
            <div className="flex flex-row items-center justify-center gap-4 sm:flex-row">
              <Link to="/apply">
                <button 
                  className="bg-optra-green border-2 border-optra-darkGreen text-white px-4 py-2 rounded-lg font-medium text-base font-roboto hover:bg-opacity-90 transition-colors sm:px-8 sm:py-4 sm:text-xl"
                >
                  {t('applyNow')}
                </button>
              </Link>
              
              <button 
                className="border-2 border-text-light dark:border-white text-text-light dark:text-white px-4 py-2 rounded-lg font-medium text-base font-roboto hover:bg-gray-100 dark:hover:bg-optra-darkGray transition-colors sm:px-8 sm:py-4 sm:text-xl"
                onClick={() => navigate('/works')}
              >
                {t('viewWorks')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 z-0 hidden md:block">
          <img 
            ref={imageRef} 
            src={isDarkMode ? '/images/img_export_2.png' : '/images/export-2.png'} 
            alt="Device Mockup" 
            className="h-[494px] w-[494px]"
            style={{ filter: isDarkMode ? 'drop-shadow(-20px 15px 100px rgba(255, 255, 255, 0.2))' : 'drop-shadow(-20px 15px 90px rgba(0, 0, 0, 0.05))' }}
          />
        </div>
      </section>
      
      <PartnersSection />
      <AboutSection />
      <MissionSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <CtaSection />
      
      <Footer />
    </div>
  );
};

export default HomePage;
