import React from 'react';

const MissionSection = () => {
  const stats = [
    { id: 1, label: 'Clients', value: '12K' },
    { id: 2, label: 'Annual growth', value: '55%' },
    { id: 3, label: 'No. of projects', value: '5k' },
    { id: 4, label: 'Positive ratings', value: '80%' },
  ];

  return (
    <section className="bg-optra-black py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-5xl font-extrabold text-white leading-tight max-w-3xl font-cairo">
            Delve into our mission and our dedication to <span className="text-optra-green">elevating development</span>
          </h2>
        </div>

        <div className="bg-optra-darkGray rounded-[10px] p-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.id} className="flex flex-col items-center">
                <h3 className="text-2xl font-semibold text-optra-green mb-2 font-cairo">
                  {stat.label}
                </h3>
                <p className="text-4xl font-bold text-white font-cairo">
                  {stat.value}
                </p>
                {index < stats.length - 1 && (
                  <div className="hidden lg:block h-10 w-px bg-[#b8b8b8] absolute right-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;