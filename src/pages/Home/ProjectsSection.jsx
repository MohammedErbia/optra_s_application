import React, { useState, useMemo, useEffect } from 'react';
import { useWorks } from '../../hooks/useWorks';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ProjectsSection = () => {
  const { works, loading, error } = useWorks();
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const allLabel = t('work.all');
  const [filter, setFilter] = useState(allLabel);

  // Get unique project types (translated)
  const projectTypes = useMemo(() => {
    const types = works.map(w => isArabic ? w["project-type_ar"] || w["project-type"] : w["project-type"]).filter(Boolean);
    const uniqueTypes = Array.from(new Set(types.map(type => type.trim())));
    return [allLabel, ...uniqueTypes];
  }, [works, isArabic, allLabel]);

  // Update filter if language changes so 'All' stays selected
  useEffect(() => {
    setFilter(allLabel);
  }, [allLabel]);

  // Filter works by selected type (translated)
  const filteredWorks = filter === allLabel
    ? works
    : works.filter(w => {
        const type = isArabic ? w["project-type_ar"] || w["project-type"] : w["project-type"];
        return type === filter;
      });

  if (loading) return <div>{t('work.loading')}</div>;
  if (error) return <div>{t('work.error', { error })}</div>;

  return (
    <section className="py-20 bg-background-light dark:bg-optra-black transition-colors">
      <div className="container mx-auto px-6">
        <div className={`mb-12 ${isArabic ? 'text-right' : 'text-left'}`} dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="uppercase tracking-[0.2em] text-base md:text-lg font-semibold mb-2 text-text-light dark:text-white/70 font-cairo transition-colors sm:text-sm">
            {t('work.ourWork')}
          </div>
          <br />
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight font-cairo text-text-light dark:text-white transition-colors">
            {t('work.experienceStory')} <br/>
            <span className="text-optra-green">{t('work.creativeProjects')}</span>
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
          {filteredWorks.map((work) => {
            const projectType = isArabic ? work["project-type_ar"] || work["project-type"] : work["project-type"];
            return work.url_work ? (
              <a
                key={work.id}
                href={work.url_work}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-72 group relative overflow-hidden rounded-lg md:w-auto flex flex-col bg-white dark:bg-optra-darkGray transition-colors md:min-h-[350px] shadow-md cursor-pointer"
              >
                <img
                  src={work.image}
                  alt={isArabic ? work.title_ar || work.title : work.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105 md:h-full md:w-full"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <div className="uppercase text-xs md:text-sm font-semibold mb-2 text-gray-600 dark:text-optra-lightGray font-cairo transition-colors">
                    {projectType?.toUpperCase() ?? ''}
                  </div>
                  <h3 className="text-text-light dark:text-white text-lg font-semibold mb-2 flex-grow transition-colors">
                    {isArabic ? work.title_ar || work.title : work.title}
                  </h3>
                  <span className="text-optra-green text-sm hover:underline mt-2">{t('work.browse')}</span>
                </div>
              </a>
            ) : (
              <div
                key={work.id}
                className="flex-shrink-0 w-72 group relative overflow-hidden rounded-lg md:w-auto flex flex-col bg-white dark:bg-optra-darkGray transition-colors md:min-h-[350px] shadow-md"
              >
                <img
                  src={work.image}
                  alt={isArabic ? work.title_ar || work.title : work.title}
                  className="w-full h-48 object-cover md:h-full md:w-full"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <div className="uppercase text-xs md:text-sm font-semibold mb-2 text-gray-600 dark:text-optra-lightGray font-cairo transition-colors">
                    {projectType?.toUpperCase() ?? ''}
                  </div>
                  <h3 className="text-text-light dark:text-white text-lg font-semibold mb-2 flex-grow transition-colors">
                    {isArabic ? work.title_ar || work.title : work.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;