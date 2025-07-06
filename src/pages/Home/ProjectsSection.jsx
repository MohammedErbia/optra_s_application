import React, { useState, useMemo } from 'react';
import { useWorks } from '../../hooks/useWorks';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
  const { works, loading, error } = useWorks();
  const [filter, setFilter] = useState('All');

  // Get unique project types
  const projectTypes = useMemo(() => {
    const types = works.map(w => w["project-type"]).filter(Boolean);
    return ['All', ...Array.from(new Set(types.map(type => type.trim())))];
  }, [works]);

  // Filter works by selected type
  const filteredWorks = filter === 'All' ? works : works.filter(w => w["project-type"] === filter);

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {error}</div>;

  return (
    <section className="py-20 bg-background-light dark:bg-optra-black transition-colors">
      <div className="container mx-auto px-6">
        <div className="text-left mb-12">
          <div className="uppercase tracking-[0.2em] text-base md:text-lg font-semibold mb-2 text-text-light dark:text-white/70 font-cairo transition-colors sm:text-sm">
            Our Work
          </div>
          <br />
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-cairo text-text-light dark:text-white transition-colors">
            Experience the story behind our <br/>
            <span className="text-optra-green">creative projects</span>
          </h2>
        </div>

        {/* Filter Bar */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-gray-200 dark:bg-[#232323] p-1">
            {projectTypes.map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-lg font-semibold text-base transition-colors
                  ${filter === type
                    ? 'bg-optra-green text-white shadow'
                    : 'bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#333]'}
                `}
                style={{ minWidth: 80 }}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex overflow-x-auto flex-nowrap gap-6 px-2 md:grid md:grid-cols-2 md:gap-8 pb-32">
          {filteredWorks.map((work) => (
            work.url_work ? (
              <a
                key={work.id}
                href={work.url_work}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-72 group relative overflow-hidden rounded-lg md:w-auto flex flex-col bg-white dark:bg-optra-darkGray transition-colors md:min-h-[350px] shadow-md cursor-pointer"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105 md:h-full md:w-full"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <div className="uppercase text-xs md:text-sm font-semibold mb-2 text-gray-600 dark:text-optra-lightGray font-cairo transition-colors">
                    {work["project-type"]?.toUpperCase() ?? ''}
                  </div>
                  <h3 className="text-text-light dark:text-white text-lg font-semibold mb-2 flex-grow transition-colors">{work.title}</h3>
                  <span className="text-optra-green text-sm hover:underline mt-2">Browse →</span>
                </div>
              </a>
            ) : (
              <div
                key={work.id}
                className="flex-shrink-0 w-72 group relative overflow-hidden rounded-lg md:w-auto flex flex-col bg-white dark:bg-optra-darkGray transition-colors md:min-h-[350px] shadow-md"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-48 object-cover md:h-full md:w-full"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <div className="uppercase text-xs md:text-sm font-semibold mb-2 text-gray-600 dark:text-optra-lightGray font-cairo transition-colors">
                    {work["project-type"]?.toUpperCase() ?? ''}
                  </div>
                  <h3 className="text-text-light dark:text-white text-lg font-semibold mb-2 flex-grow transition-colors">{work.title}</h3>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;