import React, { useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import PartnersSection from './PartnersSection';
import AboutSection from './AboutSection';
import MissionSection from './MissionSection';
import ServicesSection from './ServicesSection';
import ProjectsSection from './ProjectsSection';
import TestimonialsSection from './TestimonialsSection';
import CtaSection from './CtaSection';

const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // add a scroll to top button 

  return (
    <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-background-light dark:bg-optra-black pt-24 relative min-h-[799px] flex items-center transition-colors">
        <div className="absolute top-0 right-0 z-0">
          <img src="/images/img_frame_2310.svg" alt="Background Pattern" className="h-[797px] w-[366px]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-6xl font-extrabold text-text-light dark:text-white mb-6 leading-tight font-cairo transition-colors">
              We transform ideas into <br />digital Solutions
            </h1>
            
            <p className="text-lg text-text-light dark:text-white mb-10 font-cairo transition-colors">
              A passionate collective of creatives, designers, and developers, committed to <br />
              making a real impact in digital development.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                className="bg-optra-green border-2 border-optra-darkGreen text-white px-8 py-4 rounded-lg font-medium text-xl font-roboto hover:bg-opacity-90 transition-colors"
                onClick={() => window.location.href = '/apply'}
              >
                Apply now
              </button>
              
              <button 
                className="border-2 border-text-light dark:border-white text-text-light dark:text-white px-8 py-4 rounded-lg font-medium text-xl font-roboto hover:bg-gray-100 dark:hover:bg-optra-darkGray transition-colors"
                onClick={() => window.location.href = '/works'}
              >
                View works
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 right-0 z-0">
          <img src="/images/img_export_2.png" alt="Device Mockup" className="h-[414px] w-[414px]" />
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