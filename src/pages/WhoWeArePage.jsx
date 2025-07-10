import React, { useRef, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import { useTranslation } from 'react-i18next';

const WhoWeArePage = () => {
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null); // Ref for the image in About Us header
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    if (aboutImageRef.current) {
      gsap.to(aboutImageRef.current, {
        x: -50, // Adjust position as needed
        y: 20, // Adjust position as needed
        duration: 8, // Animation duration in seconds (slow)
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Go back and forth
        ease: "sine.inOut" // Smooth easing
      });
    }

    // Cleanup function to kill the animation on component unmount
    return () => {
      if (aboutImageRef.current) {
        gsap.killTweensOf(aboutImageRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
      <Header />

      {/* About Us Header Section */}
      <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <img 
          src="/images/img_group_2372.png" 
          alt="About Us Background" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        />
        {/* Animated Image Next to About Us Text */}
        <img 
          ref={aboutImageRef}
          src={isDarkMode ? '/images/img_export_2.png' : '/images/export-2.png'}
          alt="Device Mockup"
          className="absolute right-10 top-1/2 -translate-y-1/2 h-[200px] w-[200px] md:h-[300px] md:w-[300px] z-10 hidden md:block" 
          style={{ filter: isDarkMode ? 'drop-shadow(-10px 8px 50px rgba(255, 255, 255, 0.4))': 'drop-shadow(-10px 8px 50px rgba(0, 0, 0, 0.6))'}}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo">{t('aboutPage.header')}</h1>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who-we-are" className="relative py-20 bg-background-light dark:bg-optra-darkGray transition-colors">
        {/* Background Pattern */}
        <img src="/images/img_frame_2310.svg" alt="Background Pattern" className="absolute top-0 left-0 z-0 h-[1020px] w-[366px]" />
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-start gap-12 md:gap-24">
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light dark:text-white mb-6 font-cairo transition-colors">{t('aboutPage.whoWeAreTitle')}</h2>
            <p className="text-text-light dark:text-white text-base md:text-lg font-cairo leading-relaxed transition-colors">
              {t('aboutPage.whoWeAreText')}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
             {/* Placeholder for image/illustration if needed */}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-white dark:bg-black transition-colors">
         <div className="container mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light dark:text-white mb-6 font-cairo transition-colors">{t('aboutPage.visionTitle')}</h2>
            <p className="text-text-light dark:text-white text-base md:text-lg font-cairo leading-relaxed transition-colors">
              {t('aboutPage.visionText')}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
             <img src="/images/shapes.svg" alt="Vision Graphic" className="w-48 h-48 md:w-64 md:h-64 object-contain"/>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-background-light dark:bg-optra-darkGray transition-colors">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light dark:text-white mb-6 font-cairo transition-colors">{t('aboutPage.missionTitle')}</h2>
            <p className="text-text-light dark:text-white text-base md:text-lg font-cairo leading-relaxed transition-colors">
              {t('aboutPage.missionText')}
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
             <img src="/images/shapes.svg" alt="Mission Graphic" className="w-48 h-48 md:w-64 md:h-64 object-contain"/>
          </div>
        </div>
      </section>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default WhoWeArePage; 