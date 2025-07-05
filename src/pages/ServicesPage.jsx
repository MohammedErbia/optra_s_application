import React, { useRef, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { useData } from '../hooks/useData.ts';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null);
  const { data: services, loading, error } = useData({ table: 'services' });

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
          alt="Services Background"
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo text-white">Our Services</h1>
        </div>
      </section>
      {/* Services List Section */}
      <section className="py-16 dark:bg-[#121212] transition-colors">
        <div className="container mx-auto px-6">
          {loading && <div className="py-12 text-center text-text-light dark:text-white">Loading services...</div>}
          {error && <div className="py-12 text-center text-red-500">Error loading services.</div>}
          <div className="space-y-16">
            {services && services.map(service => (
              <div key={service.id} className="flex flex-col md:flex-row items-center bg-white dark:bg-[#18181B] rounded-xl p-8 md:p-12 gap-8 md:gap-12 transition-colors border border-gray-200 dark:border-none">
                <div className="flex-shrink-0 mb-6 md:mb-0 flex items-center justify-center h-48 md:h-64">
                  <img
                    src={service.icon_image}
                    alt={service.title}
                    className="h-28 md:h-36 w-auto object-contain filter invert-0 dark:invert"
                    style={{ filter: isDarkMode ? 'drop-shadow(0 0 2px #14B8A6)' : undefined }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left md:ml-8 ml-0">
                  <h2 className="text-2xl md:text-3xl font-bold text-text-light dark:text-white mb-4 font-cairo">{service.title}</h2>
                  <p className="text-base md:text-lg text-gray-700 dark:text-optra-lightGray mb-6 font-roboto">{service.description}</p>
                  <Link to="/apply" className="inline-block py-3 px-8 bg-optra-green text-white font-semibold rounded-md hover:bg-green-600 transition-colors text-base md:text-lg">
                    Apply now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ServicesPage; 