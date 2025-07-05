import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 200);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!show) return null;

  return (
    <button
      onClick={handleScrollTop}
      className="fixed bottom-8 right-8 z-50 bg-[#14B8A6] text-white p-3 rounded-full shadow-lg hover:bg-[#10B981] transition-colors"
      aria-label="Scroll to top"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
    </button>
  );
};

export default ScrollToTopButton; 