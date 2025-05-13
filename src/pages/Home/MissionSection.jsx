import React from 'react';
import Counter from './Counter';

const MissionSection = () => {
  const stats = [
    { id: 1, label: 'Clients', value: '12K' },
    { id: 2, label: 'Annual growth', value: '55%' },
    { id: 3, label: 'No. of projects', value: '5k' },
    { id: 4, label: 'Positive ratings', value: '80%' },
  ];

  // Helper to split value into number and suffix
  const parseValue = (value) => {
    const match = value.match(/(\d+)([a-zA-Z%]*)/);
    if (!match) return { number: value, suffix: '' };
    return { number: Number(match[1]), suffix: match[2] };
  };

  return (
    <section className="bg-background-light dark:bg-optra-black py-20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-5xl font-extrabold text-text-light dark:text-white leading-tight max-w-3xl font-cairo transition-colors">
            Delve into our mission and our dedication to <span className="text-optra-green">elevating development</span>
          </h2>
        </div>

        <div className="bg-gray-100 dark:bg-optra-darkGray rounded-[10px] p-8 mt-8 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const { number, suffix } = parseValue(stat.value);
              return (
                <div key={stat.id} className="flex flex-col items-center">
                  <h3 className="text-2xl font-semibold text-optra-green mb-2 font-cairo">
                    {stat.label}
                  </h3>
                  <p className="text-4xl font-bold text-text-light dark:text-white font-cairo transition-colors">
                    <Counter end={number} suffix={suffix} />
                  </p>
                  {index < stats.length - 1 && (
                    <div className="hidden lg:block h-10 w-px bg-gray-300 dark:bg-[#b8b8b8] absolute right-0 transition-colors"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;