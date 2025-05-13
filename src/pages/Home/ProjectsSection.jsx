import React from 'react';
import { Link } from 'react-router-dom';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: 'Wild Horse Event',
      category: 'Mobile',
      image: '/images/img_picture_326x635.png',
      link: '/case-study/wild-horse-event',
    },
    {
      id: 2,
      title: 'Wild Horse Event',
      category: 'Mobile',
      image: '/images/img_picture_2.png',
      link: '/case-study/wild-horse-event',
    },
    {
      id: 3,
      title: 'Wild Horse Event',
      category: 'Mobile',
      image: '/images/img_picture_326x635.png',
      link: '/case-study/wild-horse-event',
    },
    {
      id: 4,
      title: 'Wild Horse Event',
      category: 'Mobile',
      image: '/images/img_picture_326x635.png',
      link: '/case-study/wild-horse-event',
    },
  ];

  return (
    <section className="bg-background-light dark:bg-optra-black py-20 transition-colors">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h3 className="text-xl font-bold tracking-[3px] uppercase text-text-light dark:text-white mb-4 font-cairo transition-colors">
            Our work
          </h3>
          <h2 className="text-5xl font-extrabold text-optra-green leading-tight font-cairo">
            Experience the story behind our creative projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="flex flex-col">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-auto rounded-md mb-4"
              />
              <p className="text-base font-medium text-text-light dark:text-white mb-1 font-cairo transition-colors">
                {project.category}
              </p>
              <h3 className="text-4xl font-bold text-text-light dark:text-white mb-4 font-cairo transition-colors">
                {project.title}
              </h3>
              <Link 
                to={project.link} 
                className="flex items-center text-optra-green font-medium text-base font-cairo hover:opacity-80 transition-opacity"
              >
                View Case Study
                <img 
                  src="/images/img_icon_jamicons_outline_logos_arrowright_24x24.svg" 
                  alt="Arrow" 
                  className="ml-2 w-6 h-6 dark:invert"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;