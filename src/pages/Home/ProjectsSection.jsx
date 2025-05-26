import React from 'react';
import { useWorks } from '../../hooks/useWorks';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
  const { works, loading, error } = useWorks();

  if (loading) return <div>Loading projects...</div>;
  if (error) return <div>Error loading projects: {error}</div>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
            Experience the story behind our creative projects
          </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {works.map((work) => (
            <Link 
              key={work.id} 
              to={`/works/${work.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <img 
                src={work.image}
                alt={work.title}
                className="w-full h-[240px] object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#14B8A6] text-white px-3 py-1 rounded">
                {work.category}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xl font-semibold mb-2">{work.title}</h3>
                <span className="text-[#14B8A6]">View Case Study →</span>
              </div>
              </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;