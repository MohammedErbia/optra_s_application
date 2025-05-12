import React from 'react';

const PartnersSection = () => {
  const partners = [
    { id: 1, name: 'SmartFinder', icon: '/images/img_group_45.svg' },
    { id: 2, name: 'Zoomerr', icon: '/images/img_vector_32x32.svg' },
    { id: 3, name: 'SHELLS', icon: '/images/img_vector_32x30.svg' },
    { id: 4, name: 'WAVES', icon: '/images/img_vector_32x21.svg' },
    { id: 5, name: 'ArtVenue', icon: '/images/img_group_46.svg' },
    { id: 6, name: 'ArtVenue', icon: '/images/img_group_46.svg' },
  ];

  return (
    <section className="bg-optra-darkGray py-16">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h3 className="text-base font-bold tracking-[3px] uppercase text-white mb-4 font-cairo">
            Collaboration with leading companies
          </h3>
          <h2 className="text-5xl font-extrabold text-white leading-tight font-cairo">
            We partner with <span className="text-optra-green">10+</span> leading companies
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div key={partner.id} className="flex flex-col items-center justify-center">
              <div className="flex items-center mb-4">
                <img src={partner.icon} alt={partner.name} className="h-8 w-auto" />
                <h3 className="text-2xl font-bold text-white ml-2 font-roboto">{partner.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;