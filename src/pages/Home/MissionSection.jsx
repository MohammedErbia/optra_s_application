import React, { useState, useEffect } from 'react';
import Counter from './Counter';
import { useMissionStats } from '../../hooks/useMissionStats';
import LoadingSpinner from '../../components/LoadingSpinner';
import { CSSTransition } from 'react-transition-group'; // Removed TransitionGroup as it's not used here
import './MissionSection.css'; // Import CSS for fade-in transition
import { formatMissionStatValue } from '../../constants/missionStatTypes'; // Import formatting function

const MissionSection = () => {
  const { data: stats, loading, error } = useMissionStats();
  const [isVisible, setIsVisible] = useState(false);
  const [startCounterAnimation, setStartCounterAnimation] = useState(false); // New state for counter animation
  const sectionRef = React.useRef(null);
  const transitionNodeRef = React.useRef(null);

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

  if (error) return <div className="py-12 text-center text-red-500">Error loading mission stats: {error.message}</div>;

  return (
    <section ref={sectionRef} className="bg-background-light dark:bg-optra-black py-20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-text-light dark:text-white leading-tight max-w-3xl font-cairo transition-colors">
            Delve into our mission and our dedication to <span className="text-optra-green">elevating development</span>
          </h2>
        </div>

        <div className="bg-gray-100 dark:bg-optra-darkGray rounded-[10px] p-8 mt-8 transition-colors">
          {loading && <LoadingSpinner size="large" />}
          {!loading && (!stats || stats.length === 0) && (
            <div className="text-center text-text-light dark:text-white">No mission stats available.</div>
          )}
          {!loading && stats && stats.length > 0 && (
            <CSSTransition
              in={isVisible}
              timeout={500}
              classNames="fade"
              appear
              nodeRef={transitionNodeRef}
              onEntered={() => setStartCounterAnimation(true)} // Start counter animation after fade-in
            >
              <div ref={transitionNodeRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${stats.length > 10 ? 'overflow-x-auto whitespace-nowrap flex' : ''}`}>
                {stats.map((stat) => {
                  const { displayValue, suffix } = formatMissionStatValue(stat.value, stat.type);
                  return (
                    <div key={stat.id} className={`flex flex-col items-center ${stats.length > 10 ? 'inline-block px-4' : ''}`}>
                      <h3 className="text-xl sm:text-xl md:text-2xl font-semibold text-optra-green mb-2 font-cairo">
                        {stat.label}
                      </h3>
                      {startCounterAnimation && ( // Render counter only when animation should start
                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-text-light dark:text-white font-cairo transition-colors">
                          <Counter end={displayValue} suffix={suffix} />
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </CSSTransition>
          )}
        </div>
      </div>
    </section>
  );
};

export default MissionSection;