import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

const TeamPage = () => {
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null); // Ref for the animated image in the header

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

      {/* Team Header Section */}
      <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <img 
          src="/images/img_group_2372.png" 
          alt="Team Background" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        />
        {/* Animated Image Next to Title */}
        <img 
          ref={aboutImageRef}
          src={isDarkMode ? '/images/img_export_2.png' : '/images/export-2.png'}
          alt="Device Mockup"
          className="absolute right-10 top-1/2 -translate-y-1/2 h-[200px] w-[200px] md:h-[300px] md:w-[300px] z-10 hidden md:block" 
          style={{ filter: isDarkMode ? 'drop-shadow(-10px 8px 50px rgba(255, 255, 255, 0.4))': 'drop-shadow(-10px 8px 50px rgba(0, 0, 0, 0.6))'}}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo">Team</h1>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="relative bg-background-light dark:bg-optra-darkGray transition-colors overflow-hidden min-h-[900px] flex items-center justify-center">
        {/* Background Pattern */}
        <img src="/images/img_frame_2310.svg" alt="Background Pattern" className="absolute top-0 left-0 z-0 h-[1020px] w-[306px]" />
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 text-center md:text-left">
          <div className="md:w-1/2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light dark:text-white mb-6 font-cairo transition-colors">Our Team</h2>
            <p className="text-text-light dark:text-white text-base md:text-lg font-cairo leading-[201%] transition-colors">
              We Are IT solutions Agency company specializing in providing integrated software solutions, catering to the needs of
              businesses and organizations. Established in 2024 in an exceptional environment, we have quickly established ourselves
              thanks to a clear vision and a highly qualified team. We offer our services to enable companies to transform digitally and
              achieve greater operational efficiency through software systems specifically designed to suit the nature of their
              businesses.
            </p>    
          </div>
          <div className="md:w-1/2 flex justify-center items-center">
             {/* Placeholder for team members if needed */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TeamPage; 