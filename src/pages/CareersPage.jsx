import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import useCareers from '../hooks/useCareers';
import ShimmerCard from '../components/common/ShimmerCard';
import useCareerCategories from '../hooks/useCareerCategories';
import { Link } from 'react-router-dom';
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const CareersPage = () => {
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null); // Ref for the animated image in the header
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { jobs, loading: jobsLoading, error: jobsError } = useCareers(selectedCategory);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCareerCategories();

  const allCategories = [{
    name: "All",
    count: categories.reduce((sum, cat) => sum + cat.count, 0) // Calculate total count
  }, ...categories];

  useEffect(() => {
    if (aboutImageRef.current) {
      gsap.to(aboutImageRef.current, {
        x: -50, // Adjust position as needed
        y: 20, // Adjust position as needed
        duration: 8, // Animation duration in seconds (slow)
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Go back and forth
        ease: "sine.inOut"
      });
    }

    // Cleanup function to kill the animation on component unmount
    return () => {
      if (aboutImageRef.current) {
        gsap.killTweensOf(aboutImageRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
      <Header />

      {/* Page Header Section (Hero) */}
      <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <img 
          src="/images/blog-background.svg" 
          alt="Careers Background" 
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        />
        {/* Animated Image */}
        <img 
          ref={aboutImageRef}
          src={isDarkMode ? '/images/img_export_2.png' : '/images/export-2.png'}
          alt="Device Mockup"
          className="absolute right-10 top-1/2 -translate-y-1/2 h-[200px] w-[200px] md:h-[300px] md:w-[300px] z-10 hidden md:block" 
          style={{ filter: isDarkMode ? 'drop-shadow(-10px 8px 50px rgba(255, 255, 255, 0.4))': 'drop-shadow(-10px 8px 50px rgba(0, 0, 0, 0.6))'}}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo text-white">Careers</h1>
        </div>
      </section>

      {/* Why You Should Join Our Awesome Team Section */}
      <section className="py-20 dark:bg-[#121212] transition-colors">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Text Content */}
          <div>
            <h2 className="text-[36px] leading-[40px] font-bold text-text-light dark:text-white mb-6 font-cairo">
              Why You Should Join Our
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">Awesome Team</span>
                <span className="absolute left-0 bottom-0 w-full h-1 bg-optra-green"></span>
              </span>
            </h2>
            <p className="text-gray-600 dark:text-optra-lightGray font-cairo text-sm leading-[26px]">
              we want to feel like home when you are working at Optra Agency & for that we have curated a great set of benefits for you.
            </p>
          </div>

          {/* Right Column - Icons and Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team Work */}
            <div className="flex flex-col items-start">
              <div className="bg-[#E7F2FF] p-0 mb-4 w-[74px] h-[74px] flex items-center justify-center rounded-md">
                <img src="/images/team-work.svg" alt="Team Work" className="w-[38px] h-[38px]" />
              </div>
              <h3 className="text-[18px] leading-[21px] font-bold text-text-light dark:text-white mb-2 font-rubik">Team work</h3>
              <p className="text-gray-600 dark:text-optra-lightGray font-rubik text-sm leading-[24px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
              </p>
            </div>

            {/* Secured Future */}
            <div className="flex flex-col items-start">
              <div className="bg-[#F1F7E8] p-0 mb-4 w-[74px] h-[74px] flex items-center justify-center rounded-md">
                <img src="/images/secured-future.svg" alt="Secured Future" className="w-[38px] h-[38px]" />
              </div>
              <h3 className="text-[18px] leading-[34px] font-bold text-text-light dark:text-white mb-2 font-cairo">Secured Future</h3>
              <p className="text-gray-600 dark:text-optra-lightGray font-rubik text-sm leading-[24px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
              </p>
            </div>

            {/* Learning Opportunity */}
            <div className="flex flex-col items-start">
              <div className="bg-[#EFF2F5] p-0 mb-4 w-[74px] h-[74px] flex items-center justify-center rounded-md">
                <img src="/images/learning-opportunity.svg" alt="Learning Opportunity" className="w-[38px] h-[38px]" />
              </div>
              <h3 className="text-[18px] leading-[34px] font-bold text-text-light dark:text-white mb-2 font-cairo">Learning Opportunity</h3>
              <p className="text-gray-600 dark:text-optra-lightGray font-rubik text-sm leading-[24px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
              </p>
            </div>

            {/* Upgrade Skills */}
            <div className="flex flex-col items-start">
              <div className="bg-[#FFEEED] p-0 mb-4 w-[74px] h-[74px] flex items-center justify-center rounded-md">
                <img src="/images/upgrate-skills.svg" alt="Upgrade Skills" className="w-[38px] h-[38px]" />
              </div>
              <h3 className="text-[18px] leading-[21px] font-bold text-text-light dark:text-white mb-2 font-rubik">Upgrate Skills</h3>
              <p className="text-gray-600 dark:text-optra-lightGray font-rubik text-sm leading-[24px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Career Openings Section */}
      <section className="py-20 bg-background-light dark:bg-optra-black transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-lg font-semibold text-optra-green font-cairo uppercase">Come Join Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white mt-2 font-cairo">Career Openings</h2>
            <p className="text-gray-600 dark:text-optra-lightGray font-roboto text-lg mt-4 max-w-2xl mx-auto">
              We're always looking for creative, talented self-starters to join the JMC family. Check out our open roles below and fill out an application.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Left Column - Categories */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {categoriesLoading && (
                  <>
                    <ShimmerCard className="w-full h-12" />
                    <ShimmerCard className="w-full h-12" />
                    <ShimmerCard className="w-full h-12" />
                  </>
                )}
                {categoriesError && <p className="text-red-500">Error loading categories: {categoriesError}</p>}
                {!categoriesLoading && !categoriesError && allCategories.map((categoryItem) => (
                  <div
                    key={categoryItem.name}
                    className={`py-2 px-4 cursor-pointer font-cairo font-medium text-lg leading-[34px] uppercase
                      ${selectedCategory === categoryItem.name ? 'bg-optra-green text-white text-xl leading-[37px] rounded-lg' : 'text-gray-600 dark:text-optra-lightGray'}`}
                    onClick={() => setSelectedCategory(categoryItem.name)}
                  >
                    {categoryItem.name} {categoryItem.name === "All" ? `(${categoryItem.count})` : categoryItem.count > 0 && `(${categoryItem.count})`}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Job Listings */}
            <div className="lg:col-span-3 space-y-6">
              {jobsLoading && (
                <>
                  <ShimmerCard className="w-full h-[100px]" />
                  <ShimmerCard className="w-full h-[100px]" />
                  <ShimmerCard className="w-full h-[100px]" />
                </>
              )}

              {jobsError && <p className="text-red-500">Error: {jobsError}</p>}

              {!jobsLoading && !jobsError && jobs.length === 0 && (
                <p className="text-gray-600 dark:text-optra-lightGray text-center">No job openings found for this category.</p>
              )}

              {!jobsLoading && !jobsError && jobs.map((job) => (
                <Link key={job.id} to={`/careers/${job.id}`} className="block">
                  <div className="bg-gray-100 dark:bg-[#2C2C2C] shadow-md rounded-lg flex flex-col md:flex-row justify-between items-center transition-colors p-6 w-[897px] h-[100px]">
                    <div>
                      <h3 className="text-xl font-semibold text-text-light dark:text-white font-cairo mb-2">{job.title}</h3>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 dark:text-optra-lightGray text-base font-roboto">
                        {(() => {
                          const experienceItem = job.job_summary && job.job_summary.find(item => item.label === "Experience");
                          let deadlineItem = job.job_summary && job.job_summary.find(item => item.label === "Deadline");
                          let deadlineValue = deadlineItem ? deadlineItem.value : job.deadline;
                          let formattedDeadline = deadlineValue ? new Date(deadlineValue).toLocaleDateString() : null;
                          return (
                            <>
                              {experienceItem && (
                                <p key="experience">Experience <span className="font-bold">{experienceItem.value}</span></p>
                              )}
                              {formattedDeadline && (
                                <p key="deadline">Deadline <span className="font-bold">{formattedDeadline}</span></p>
                              )}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <img src="/images/img_arrow_right.svg" alt="View Details" className="w-8 h-8" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default CareersPage; 