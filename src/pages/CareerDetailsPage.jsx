import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import useCareerPostById from '../hooks/useCareerPostById';
import { supabase } from '../lib/supabase';
import FacebookIcon from '../components/icons/FacebookIcon';
import TwitterIcon from '../components/icons/TwitterIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import InstagramIcon from '../components/icons/InstagramIcon';

const CareerDetailsPage = () => {
  const { id } = useParams();
  const { careerPost, loading, error } = useCareerPostById(id);
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null);

  const [showFeedback, setShowFeedback] = useState(true);
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  useEffect(() => {
    if (careerPost) {
      setYesCount(careerPost.helpful_yes_count);
      setNoCount(careerPost.helpful_no_count);

      // Check if user has already voted for this career post
      const hasVoted = localStorage.getItem(`career_vote_${id}`);
      if (hasVoted) {
        setShowFeedback(false);
      }
    }
  }, [careerPost, id]);

  useEffect(() => {
    if (aboutImageRef.current) {
      gsap.to(aboutImageRef.current, {
        x: -50,
        y: 20,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    return () => {
      if (aboutImageRef.current) {
        gsap.killTweensOf(aboutImageRef.current);
      }
    };
  }, []);

  const handleVote = async (type) => {
    const voteKey = `career_vote_${id}`;
    if (localStorage.getItem(voteKey)) {
      return; // Already voted
    }

    let newYesCount = yesCount;
    let newNoCount = noCount;

    if (type === 'yes') {
      newYesCount = yesCount + 1;
      setYesCount(newYesCount);
    } else {
      newNoCount = noCount + 1;
      setNoCount(newNoCount);
    }

    try {
      const { error: updateError } = await supabase
        .from('careers')
        .update({
          helpful_yes_count: newYesCount,
          helpful_no_count: newNoCount,
        })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating vote counts:', updateError);
        // Revert local state if update fails
        if (type === 'yes') {
          setYesCount(yesCount); // revert to original
        } else {
          setNoCount(noCount); // revert to original
        }
        alert('Failed to submit feedback. Please try again.');
      } else {
        localStorage.setItem(voteKey, 'true');
        setShowFeedback(false);
      }
    } catch (err) {
      console.error('Unexpected error during vote:', err);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-optra-black"><p className="text-text-light dark:text-white">Loading job details...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center dark:bg-optra-black"><p className="text-red-500">Error loading job details: {error}</p></div>;
  if (!careerPost) return <div className="min-h-screen flex items-center justify-center dark:bg-optra-black"><p className="text-gray-600 dark:text-optra-lightGray">Job not found.</p></div>;

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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo text-white">{careerPost.title}</h1>
        </div>
      </section>

      {/* Breadcrumbs/Meta Info */}
      <div className="bg-[#121212] py-4 text-sm text-gray-400 dark:text-optra-lightGray">
        <div className="container mx-auto px-6">
          <p>
            <Link to="/careers" className="hover:underline">Careers</Link> / Job Type: {careerPost.job_type} / No of Vacancies: {careerPost.vacancy_id}
          </p>
        </div>
      </div>

      {/* Job Details Content Section */}
      <section className="py-16 dark:bg-[#121212] transition-colors">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 text-text-light dark:text-optra-lightGray prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-text-light dark:text-white mb-6 font-cairo uppercase">{careerPost.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: careerPost.description }} className="mb-8" />
            <div dangerouslySetInnerHTML={{ __html: careerPost.content }} />

            {/* Helpful Feedback Section */}
            {/* {showFeedback && (
              <div className="mt-12 p-6 bg-gray-100 dark:bg-black rounded-lg shadow-md flex items-center justify-between">
                <p className="text-lg font-semibold text-text-light dark:text-white">Was this article helpful?</p>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleVote('yes')}
                    className="flex items-center px-4 py-2 rounded-md bg-optra-green text-white hover:bg-green-600 transition-colors"
                  >
                    Yes ({yesCount})
                  </button>
                  <button 
                    onClick={() => handleVote('no')}
                    className="flex items-center px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    No ({noCount})
                  </button>
                </div>
              </div>
            )}
in 
            {!showFeedback && (
              <div className="mt-12 p-6 bg-gray-100 dark:bg-black rounded-lg shadow-md text-center text-lg font-semibold text-optra-green">
                Thank you for your feedback!
              </div>
            )} */}
          </div>

          {/* Right Column - Job Summary & Share */}
          <div className="lg:col-span-1 bg-gray-100 dark:bg-black p-8 rounded-lg shadow-lg">
            <Link to="/apply" className="block w-full text-center py-3 px-6 bg-optra-green text-white font-semibold rounded-md hover:bg-green-600 transition-colors mb-8">
              Apply Now
            </Link>

            <h3 className="text-xl font-bold text-text-light dark:text-white mb-6 font-cairo">Job Summary</h3>
            <div className="space-y-4 text-text-light dark:text-optra-lightGray">
              {careerPost.job_summary && careerPost.job_summary.map((item, index) => {
                // Special handling for Date Posted to format it
                const valueToDisplay = item.label === "Date Posted" ? new Date(item.value).toLocaleDateString() : item.value;
                return (
                  <p key={index} className="flex items-center">
                    <img src={item.image} alt={item.label} className="w-5 h-5 mr-3" /> {item.label}: {valueToDisplay}
                  </p>
                );
              })}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold text-text-light dark:text-white mb-4 font-cairo">Share this:</h3>
              <div className="flex space-x-4">
                {
                  careerPost.title && careerPost.id && (() => {
                    const postUrl = encodeURIComponent(`https://optraagency.com/#/careers/${careerPost.id}`);
                    const postTitle = encodeURIComponent(careerPost.title);
                    const socialLinks = [
                      {
                        platform: 'facebook',
                        url: `https://www.facebook.com/share_channel/?type=reshare&link=${postUrl}&app_id=542599432471018&source_surface=external_reshare&display=page&hashtag#&source=social.fb`,
                        icon: <FacebookIcon className="w-8 h-8 fill-gray-600 dark:fill-optra-lightGray hover:fill-optra-green dark:hover:fill-optra-green" />,
                        alt: 'Facebook'
                      },
                      {
                        platform: 'twitter',
                        url: `https://twitter.com/intent/tweet?text=${postTitle}&url=${postUrl}`,
                        icon: <TwitterIcon className="w-8 h-8 fill-gray-600 dark:fill-optra-lightGray hover:fill-optra-green dark:hover:fill-optra-green" />,
                        alt: 'Twitter'
                      },
                      {
                        platform: 'linkedin',
                        url: `https://www.linkedin.com/shareArticle?mini=true&url=${postUrl}&title=${postTitle}`,
                        icon: <LinkedInIcon className="w-8 h-8 fill-gray-600 dark:fill-optra-lightGray hover:fill-optra-green dark:hover:fill-optra-green" />,
                        alt: 'LinkedIn'
                      },
                      {
                        platform: 'instagram',
                        url: `https://www.instagram.com/share?url=${postUrl}`,
                        icon: <InstagramIcon className="w-8 h-8 fill-gray-600 dark:fill-optra-lightGray hover:fill-optra-green dark:hover:fill-optra-green" />,
                        alt: 'Instagram'
                      }
                    ];

                    return socialLinks.map(link => (
                      <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-optra-green dark:text-optra-lightGray dark:hover:text-optra-green transition-colors">
                        {link.icon}
                      </a>
                    ));
                  })()
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apply Now Button at the end of the page */}
      <div className="text-center py-16 dark:bg-[#121212]">
        <Link to="/apply" className="inline-block py-3 px-12 bg-optra-green text-white font-semibold rounded-md hover:bg-green-600 transition-colors text-lg">
          Apply Now
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default CareerDetailsPage; 