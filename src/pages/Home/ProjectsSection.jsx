import React from 'react';
import { useWorks } from '../../hooks/useWorks';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
  const { works, loading, error } = useWorks();

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
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight font-cairo text-text-light dark:text-white transition-colors text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Experience the story behind our <br className="sm:hidden"/>
            <span className="text-optra-green">creative projects</span>
          </h2>
        </div>

        <div className="flex overflow-x-auto flex-nowrap gap-6 px-2 md:grid md:grid-cols-2 md:gap-8">
          {works.map((work) => (
            <Link 
              key={work.id} 
              to={`/works/${work.slug}`}
              className="flex-shrink-0 w-72 h-80 group relative overflow-hidden rounded-lg md:w-auto md:h-auto"
            >
              <img 
                src={work.image}
                alt={work.title}
                className="w-full h-48 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#14B8A6] text-white px-3 py-1 rounded text-sm">
                {work.category}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xl font-semibold mb-2 text-lg sm:text-xl">{work.title}</h3>
                <span className="text-[#14B8A6] text-sm sm:text-base">View Case Study →</span>
              </div>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;