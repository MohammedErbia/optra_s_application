import React, { useRef, useState, useEffect } from 'react';
import { usePartners } from '../../hooks/usePartners';
import { useTheme } from '../../context/ThemeContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const PartnersSection = () => {
  const { partners, loading, error } = usePartners();
  const { isDarkMode } = useTheme();
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // GSAP fade/slide-in animation for each partner item
  useEffect(() => {
    if (!partners || !itemsRef.current.length) return;
    itemsRef.current.forEach((el, idx) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: idx * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            ease: 'power2.out',
          }
        );
      }
    });
  }, [partners]);

  // GSAP auto-scroll animation (slower)
  useEffect(() => {
    if (!scrollRef.current || !partners?.length) return;
    let ctx = gsap.context(() => {
      const el = scrollRef.current;
      let scrollTween;
      function startScroll() {
        const scrollWidth = el.scrollWidth / 2;
        scrollTween = gsap.to(el, {
          scrollLeft: scrollWidth,
          duration: 40, // slower scroll
          ease: 'none',
          repeat: -1,
          modifiers: {
            scrollLeft: (value) => {
              if (parseFloat(value) >= scrollWidth) {
                el.scrollLeft = 0;
                return 0;
              }
              return value;
            },
          },
        });
      }
      if (!paused) startScroll();
      return () => {
        if (scrollTween) scrollTween.kill();
      };
    }, scrollRef);
    return () => ctx.revert();
  }, [paused, partners]);

  // Scale animation for items on hover/focus
  const handleItemMouseEnter = (idx) => {
    setHoveredIdx(idx);
    if (itemsRef.current[idx]) {
      gsap.to(itemsRef.current[idx], { scale: 1.2, zIndex: 10, duration: 0.3, ease: 'power2.out' });
    }
  };
  const handleItemMouseLeave = (idx) => {
    setHoveredIdx(null);
    if (itemsRef.current[idx]) {
      gsap.to(itemsRef.current[idx], { scale: 1, zIndex: 1, duration: 0.3, ease: 'power2.out' });
    }
  };

  // Pause/resume scroll when mouse enters/leaves the scroll area
  const handleScrollAreaMouseEnter = () => setPaused(true);
  const handleScrollAreaMouseLeave = () => setPaused(false);
  const handleScrollAreaFocus = () => setPaused(true);
  const handleScrollAreaBlur = () => setPaused(false);

  // Show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading) return <div className="py-12"><LoadingSpinner size="large" /></div>;
  if (error || !partners || partners.length === 0) return null;

  // Duplicate partners for seamless looping
  const displayPartners = [...partners, ...partners];

  return (
    <section className={`py-16 md:py-24 ${isDarkMode ? 'bg-[#18181B]' : 'bg-[#F3F4F6]'} transition-colors`}>
      <div className="container mx-auto px-6">
        <div className="mb-12 text-left">
          <div className={`uppercase tracking-[0.2em] text-base md:text-lg font-semibold mb-6 ${isDarkMode ? 'text-[#F3F4F6]/70' : 'text-[#18181B]/70'} sm:text-sm`}>Collaboration with leading companies</div>
          <h2 className={`text-4xl md:text-6xl font-extrabold mb-0 font-poppins ${isDarkMode ? 'text-white' : 'text-[#18181B]'} text-3xl sm:text-4xl md:text-5xl lg:text-6xl`} style={{ lineHeight: 1.1 }}>
            We partner with <span className="text-[#14B8A6]">10+</span> leading<br className="hidden md:block" /> companies
          </h2>
        </div>
        <div className="flex justify-start">
          <div
            ref={scrollRef}
            className="flex flex-nowrap gap-12 md:gap-16 overflow-x-auto scrollbar-none px-2 md:px-8 py-4 w-full"
            tabIndex={0}
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            aria-label="Partner companies logos and names"
            onMouseEnter={handleScrollAreaMouseEnter}
            onMouseLeave={handleScrollAreaMouseLeave}
            onFocus={handleScrollAreaFocus}
            onBlur={handleScrollAreaBlur}
          >
            {displayPartners.map((partner, idx) => (
              <div
                key={idx + partner.id}
                ref={el => itemsRef.current[idx] = el}
                className="partner-item flex flex-row items-center min-w-[200px] md:min-w-[240px] mx-2 gap-4 opacity-0"
                tabIndex={0}
                aria-label={partner.name}
                onMouseEnter={() => handleItemMouseEnter(idx)}
                onMouseLeave={() => handleItemMouseLeave(idx)}
                onFocus={() => handleItemMouseEnter(idx)}
                onBlur={() => handleItemMouseLeave(idx)}
                style={{ zIndex: hoveredIdx === idx ? 10 : 1 }}
              >
                <img
                  src={partner.logo_image}
                  alt={partner.name}
                  className="h-12 w-auto max-w-[120px] object-contain h-8 sm:h-10 md:h-12 w-auto max-w-[80px] sm:max-w-[100px] md:max-w-[120px]"
                  draggable="false"
                />
                <span className={`font-semibold text-lg md:text-xl ${isDarkMode ? 'text-white' : 'text-[#18181B]'} text-base sm:text-lg md:text-xl`}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={handleScrollTop}
          className="fixed bottom-8 right-8 z-50 bg-[#14B8A6] text-white p-3 rounded-full shadow-lg hover:bg-[#10B981] transition-colors"
          aria-label="Scroll to top"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
        </button>
      )}
      <style>{`
        .partner-item { transition: opacity 0.7s; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
};

export default PartnersSection;