import React from 'react';
import Card from '../../components/common/Card';
import { useData } from '../../hooks/useData.ts';
import LoadingSpinner from '../../components/LoadingSpinner';

const ServicesSection = () => {
  const { data: services, loading, error } = useData({ table: 'services' });

  if (loading) return <div className="py-12"><LoadingSpinner size="large" /></div>;
  if (error || !services || services.length === 0) return null;

  return (
    <section className="bg-background-light dark:bg-optra-darkGray py-20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-5xl font-extrabold text-text-light dark:text-white leading-tight mb-8 font-cairo transition-colors sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-optra-green">Quality</span> you can rely on, in services 
            <span className="block">you truly deserve</span>
          </h2>
           
          <p className="text-lg text-text-light dark:text-white max-w-3xl font-cairo transition-colors sm:text-base md:text-lg">
            Embark on a journey of innovation and technology with our wide range of services that enhance your digital presence, starting from captivating designs to intelligent, strategic solutions.
          </p>
        </div>
        

        <div className="flex overflow-x-auto flex-nowrap gap-6 px-2 md:grid md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex-shrink-0 w-64 h-full border border-gray-200 dark:border-[#23232b] rounded-xl bg-background-light dark:bg-[#18181B] transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-xl group md:w-auto md:flex-shrink w-72 h-96 md:h-auto"
              style={{ minHeight: 280 }}
            >
              <Card
                title={service.title}
                description={service.description}
                icon={
                  <img
                    src={service.icon_image}
                    alt={service.title}
                    className="h-12 filter invert-0 dark:invert group-hover:scale-110 transition-transform duration-300 sm:h-8 md:h-10 lg:h-12"
                    style={{ filter: 'drop-shadow(0 0 2px #14B8A6)' }}
                  />
                }
                className="h-full bg-transparent shadow-none border-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;