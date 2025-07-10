import React, { useState, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useTestimonials } from '../../hooks/useTestimonials';
import LoadingSpinner from '../../components/LoadingSpinner';
import { CSSTransition } from 'react-transition-group';
import './TestimonialsSection.css'; // Import CSS for fade-in transition
import { useTranslation } from 'react-i18next';

const TestimonialsSection = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { data: testimonials, loading, error } = useTestimonials(); // Fetch testimonials
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const [currentPage, setCurrentPage] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // State for fade-in animation
  const [highlightedItemIndex, setHighlightedItemIndex] = useState(-1); // State for highlighted item index
  const sectionRef = useRef(null); // Ref for IntersectionObserver
  const transitionNodeRef = useRef(null); // Ref for CSSTransition
  const timersRef = useRef([]); // Ref to store timer IDs
  // Removed testimonialsContainerRef as it's not needed for the simple grid

  // Intersection Observer for fade-in
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Calculate items per page based on window size and total testimonials
  const testimonialsPerPage = testimonials ? (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1) : 1;
  const pageCount = testimonials ? Math.ceil(testimonials.length / testimonialsPerPage) : 0;

  // Revert to slicing for visible testimonials
  const visibleTestimonials = testimonials ? testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  ) : [];

  // Effect to handle sequential item highlighting using useRef
  useEffect(() => {
    // Clear any existing timers before starting new ones
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = []; // Reset the array

    // Only start the animation if visible, data is loaded, and there are items
    if (isVisible && testimonials && testimonials.length > 0 && visibleTestimonials.length > 0) {
      // console.log('Starting highlight animation', visibleTestimonials.length);
      const delay = 600; // Delay before starting the sequence
      const itemHighlightDuration = 1000; // Duration each item is highlighted
      const interval = itemHighlightDuration + 100; // Interval between highlights

      setHighlightedItemIndex(-1); // Reset highlight before starting

      visibleTestimonials.forEach((_, index) => {
        const timer = setTimeout(() => {
          setHighlightedItemIndex(index);
        }, delay + index * interval);
        timersRef.current.push(timer); // Push timer ID to the ref
      });

      // Optional: Set highlightedItemIndex back to -1 after the sequence
       const resetTimer = setTimeout(() => {
         setHighlightedItemIndex(-1);
       }, delay + visibleTestimonials.length * interval);
       timersRef.current.push(resetTimer); // Push timer ID to the ref
    }

    // Cleanup function - always runs on unmount or before effect re-runs
    return () => {
      // console.log('Cleaning up timers', timersRef.current.length);
      timersRef.current.forEach(timer => clearTimeout(timer));
    };

     // Dependencies: Rerun when visible, testimonials change, currentPage changes, or visibleTestimonials changes
  }, [isVisible, testimonials, currentPage, visibleTestimonials]);

  // Revert pagination handlers
  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? pageCount - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === pageCount - 1 ? 0 : prev + 1));
  };

  if (error) return <div className="py-12 text-center text-red-500">{t('testimonials.error', { error: error.message })}</div>;

  return (
    <section ref={sectionRef} className={`${isDarkMode ? 'bg-optra-darkGray' : 'bg-gray-50'} py-20 transition-colors`}>
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight mb-6 font-roboto`}>
            {t('testimonials.title')} <span className="text-optra-green">{t('testimonials.clientsSay')}</span><br/> {t('testimonials.aboutUs')}
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-600'} max-w-3xl font-roboto sm:text-base md:text-lg`}>
            {t('testimonials.subtitle')}
          </p>
        </div>

        {loading && <LoadingSpinner size="large" />}
        {!loading && (!testimonials || testimonials.length === 0) && (
          <div className="text-center text-text-light dark:text-white">{t('testimonials.noTestimonials')}</div>
        )}

        {!loading && testimonials && testimonials.length > 0 && (
          <CSSTransition
            in={isVisible}
            timeout={500}
            classNames="fade"
            appear
            nodeRef={transitionNodeRef}
          >
            <div ref={transitionNodeRef}>
              {/* Revert to grid layout and map over visibleTestimonials */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleTestimonials.map((testimonial, index) => (
                  <div 
                    key={testimonial.id} 
                    className={`testimonial-card flex flex-col ${isDarkMode ? 'bg-optra-darkGray border-optra-border' : 'bg-white border-gray-200'} border rounded-[10px] p-8 shadow-md ${index === highlightedItemIndex ? 'highlighted' : ''}`} // Apply highlighted class
                  >
                    <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-12 font-roboto flex-grow`}>
                      {isArabic ? testimonial.quote_ar || testimonial.quote : testimonial.quote}
                    </p>
                    <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''} gap-4`}>
                      <img 
                        src={testimonial.user_image}
                        alt={isArabic ? testimonial.name_ar || testimonial.name : testimonial.name}
                        className="w-16 h-16 rounded-full w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                      />
                      <h4 className={`text-lg font-normal ${isDarkMode ? 'text-white' : 'text-gray-900'} font-roboto text-base sm:text-lg`}>
                        {isArabic ? testimonial.name_ar || testimonial.name : testimonial.name}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* Revert pagination controls to use handlePrevPage and handleNextPage */}
              {pageCount > 1 && (
                <div className={`flex items-center justify-left mt-8 gap-x-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <button 
                    onClick={handlePrevPage}
                    className="w-12 h-12 rounded-full border-2 border-optra-green flex items-center justify-center hover:bg-optra-green/10 transition-colors"
                    aria-label="Previous testimonial page"
                  >
                    <img 
                      src="/images/img_icon_iconoir_arrowleft.svg" 
                      alt="Previous" 
                      className="w-6 h-6"
                    />
                  </button>
                  <button 
                    onClick={handleNextPage}
                    className="w-12 h-12 rounded-full border-2 border-optra-green flex items-center justify-center hover:bg-optra-green/10 transition-colors"
                    aria-label="Next testimonial page"
                  >
                    <img 
                      src="/images/img_icon_iconoir_arrowleft.svg" 
                      alt="Next" 
                      className="w-6 h-6 transform rotate-180"
                    />
                  </button>
                </div>
              )}
            </div>
          </CSSTransition>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
