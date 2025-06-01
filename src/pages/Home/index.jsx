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
  We transform{" "}
  <span className="relative inline-block">
    <span className="relative z-10">ideas</span>
    <span className="absolute left-0 bottom-0 w-full h-1 bg-teal-400"></span>
  </span>{" "}
  into
  <br className="sm:hidden"/>
  digital{" "}
  <span className="relative inline-block">
    <span className="relative z-10">Solutions</span>
    <span className="absolute left-0 bottom-0 w-full h-1 bg-teal-400"></span>
  </span>
</h1>

            
            <p className="text-lg text-text-light dark:text-white mb-10 font-cairo transition-colors sm:text-base md:text-lg">
              A passionate collective of creatives, designers, and developers, committed to <br className="sm:hidden"/>
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
        
        <div className="absolute bottom-0 right-0 z-0 hidden md:block">
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
