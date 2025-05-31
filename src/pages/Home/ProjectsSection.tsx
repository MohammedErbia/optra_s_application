import React from 'react';
import { useData } from '../../hooks/useData';
import { useImageOptimization } from '../../hooks/useImageOptimization';
import LoadingSpinner from '../../components/LoadingSpinner';
import type { Work } from '../../types';

const ProjectsSection: React.FC = () => {
  const { data: works, loading, error } = useData<Work>({ table: 'works' });

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Experience the story behind our creative projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {works.map((work) => (
            <ProjectCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  work: Work;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ work }) => {
  const { optimizedSrc, loading: imageLoading } = useImageOptimization({
    src: work.image,
    width: 800,
    quality: 80
  });

  return (
    <div className="group relative overflow-hidden rounded-lg">
      {imageLoading ? (
        <LoadingSpinner size="medium" />
      ) : (
        <img
          src={optimizedSrc}
          alt={work.title}
          className="w-full h-[240px] object-cover transition-transform group-hover:scale-105"
        />
      )}
      {/* Rest of the card content */}
    </div>
  );
};

export default ProjectsSection; 