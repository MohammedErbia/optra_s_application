import React, { useRef, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import ProjectsSection from './Home/ProjectsSection';
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const WorkPage = () => {
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null);

  useEffect(() => {
    if (aboutImageRef.current) {
      gsap.to(aboutImageRef.current, {
        x: -50,
        y: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    return () => {
      if (aboutImageRef.current) {
        gsap.killTweensOf(aboutImageRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[300px] md:min-h-[400px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/blog-background.svg"
          alt="Works Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        />
        {/* Animated Image */}
        <img
          ref={aboutImageRef}
          src={isDarkMode ? '/images/img_export_2.png' : '/images/export-2.png'}
          alt="Device Mockup"
          className="absolute right-10 top-1/2 -translate-y-1/2 h-[200px] w-[200px] md:h-[300px] md:w-[300px] z-10 hidden md:block"
          style={{ filter: isDarkMode ? 'drop-shadow(-10px 8px 50px rgba(255, 255, 255, 0.4))' : 'drop-shadow(-10px 8px 50px rgba(0, 0, 0, 0.6))' }}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo text-white">Works</h1>
        </div>
      </section>
      {/* Our Work Section (from Home) */}
      <ProjectsSection />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default WorkPage; 