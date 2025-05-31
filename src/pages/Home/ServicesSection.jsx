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
          <h2 className="text-5xl font-extrabold text-text-light dark:text-white leading-tight mb-8 font-cairo transition-colors">
            <span className="text-optra-green">Quality</span> you can rely on, in services 
            <span className="block">you truly deserve</span>
          </h2>
           
          <p className="text-lg text-text-light dark:text-white max-w-3xl font-cairo transition-colors">
            Embark on a journey of innovation and technology with our wide range of services that enhance your digital presence, starting from captivating designs to intelligent, strategic solutions.
          </p>
        </div>
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="h-full border border-gray-200 dark:border-[#23232b] rounded-xl bg-background-light dark:bg-[#18181B] transition-transform transition-shadow duration-300 hover:scale-105 hover:shadow-xl group"
              style={{ minHeight: 280 }}
            >
              <Card
                title={service.title}
                description={service.description}
                icon={
                  <img
                    src={service.icon_image}
                    alt={service.title}
                    className="h-12 filter invert-0 dark:invert group-hover:scale-110 transition-transform duration-300"
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