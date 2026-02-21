import React, { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { useBlogPostBySlug } from '../hooks/useBlogPostBySlug'; // Import the new hook
import ShimmerCard from '../components/common/ShimmerCard'; // Use ShimmerCard for loading
import { db } from '../lib/firebase'; // Import firebase
import { doc, updateDoc, getDoc } from 'firebase/firestore'; // Import firestore functions
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const BlogDetailsPage = () => {
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null); // Ref for the animated image in the header
  const { slug } = useParams(); // Get the slug from the URL

  const [showFeedbackSection, setShowFeedbackSection] = useState(true); // State for feedback section visibility
  const [showThankYou, setShowThankYou] = useState(false); // New state for thank you message
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  // Fetch blog post details using the custom hook
  const { blogPost, loading, error } = useBlogPostBySlug(slug);

  useEffect(() => {
    if (aboutImageRef.current) {
      gsap.to(aboutImageRef.current, {
        x: -50, // Adjust position as needed
        y: 20, // Adjust position as needed
        duration: 8, // Animation duration in seconds (slow)
        repeat: -1, // Repeat indefinitely
        yoyo: true, // Go back and forth
        ease: "sine.inOut" // Smooth easing
      });
    }

    // Cleanup function to kill the animation on component unmount
    return () => {
      if (aboutImageRef.current) {
        gsap.killTweensOf(aboutImageRef.current);
      };
    };
  }, []);

  // Check local storage for vote on mount or when slug changes
  useEffect(() => {
    if (slug) {
      const voted = localStorage.getItem(`voted_for_${slug}`);
      if (voted) {
        setShowFeedbackSection(false);
        setShowThankYou(true); // Show thank you if already voted
      }
    }
  }, [slug]);

  // Update counts when blogPost is loaded
  useEffect(() => {
    if (blogPost) {
      setYesCount(blogPost.helpful_yes_count || 0);
      setNoCount(blogPost.helpful_no_count || 0);
    }
  }, [blogPost]);

  const handleVote = async (type) => {
    if (!blogPost || !slug) return;

    const columnToUpdate = type === 'yes' ? 'helpful_yes_count' : 'helpful_no_count';
    const newCount = (type === 'yes' ? yesCount : noCount) + 1;

    try {
      const docRef = doc(db, 'blog', blogPost.id);

      await updateDoc(docRef, { [columnToUpdate]: newCount });

      // Re-fetch the blog post to get the updated counts from Firestore
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error("Document not found after update");
      }

      const updatedPost = docSnap.data();

      setYesCount(updatedPost.helpful_yes_count || 0);
      setNoCount(updatedPost.helpful_no_count || 0);
      localStorage.setItem(`voted_for_${slug}`, 'true');
      setShowFeedbackSection(false);
      setShowThankYou(true);
    } catch (err) {
      console.error("Error updating helpfulness count:", err);
      // Optionally, show an error message to the user
    }
  };

  if (loading) {
    return (
      <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
        <Header />
        <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo">Loading Blog Post...</h1>
          </div>
        </section>
        <section className="relative py-20 bg-background-light dark:bg-optra-darkGray transition-colors overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <ShimmerCard />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
        <Header />
        <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo text-red-500">Error loading post: {error}</h1>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!blogPost) {
    return (
      <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
        <Header />
        <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo">Blog Post Not Found</h1>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  // Format date
  const publishedDate = blogPost.published_at ? new Date(blogPost.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
      <Header />

      {/* Blog Header Section */}
      <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/img_group_2372.png"
          alt="Blog Background"
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
        />
        {/* Animated Image Next to Title */}
        <img
          ref={aboutImageRef}
          src={isDarkMode ? '/images/img_export_2.png' : '/images/export-2.png'}
          alt="Device Mockup"
          className="absolute right-10 top-1/2 -translate-y-1/2 h-[200px] w-[200px] md:h-[300px] md:w-[300px] z-10 hidden md:block"
          style={{ filter: isDarkMode ? 'drop-shadow(-10px 8px 50px rgba(255, 255, 255, 0.4))' : 'drop-shadow(-10px 8px 50px rgba(0, 0, 0, 0.6))' }}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo">{blogPost.title}</h1>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="relative py-20 bg-background-light dark:bg-optra-darkGray transition-colors overflow-hidden">
        {/* Background Pattern */}
        <img src="/images/img_frame_2310.svg" alt="Background Pattern" className="absolute top-20 left-0 z-0 h-[1020px] w-[356px]" />

        <div className="container mx-auto px-6 relative z-10 max-w-4xl mx-auto bg-white dark:bg-optra-black p-8 rounded-lg">
          {/* Breadcrumb */}
          <div className="mb-8 text-gray-500 dark:text-optra-lightGray text-sm">
            <Link to="/blog" className="hover:underline">Blog</Link>
            <span className="mx-2">/</span>
            <span>{blogPost.title}</span>
          </div>

          {/* Author, Date, Category */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-text-light dark:text-white text-lg font-bold overflow-hidden">
              {blogPost.author_image_url ? (
                <img src={blogPost.author_image_url} alt={blogPost.author_name} className="w-full h-full object-cover" />
              ) : (
                blogPost.author_name ? blogPost.author_name.charAt(0).toUpperCase() : 'A'
              )}
            </div>
            <div>
              <p className="text-text-light dark:text-white font-semibold mb-1">{blogPost.author_name || 'Unknown Author'}</p>
              <p className="text-gray-500 dark:text-optra-lightGray text-sm mb-1">{blogPost.author_role || ''}</p>
              <p className="text-gray-500 dark:text-optra-lightGray text-sm mb-1">{publishedDate}</p>
              {blogPost.category && (
                <span className="inline-block bg-optra-green-light text-optra-green text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {blogPost.category}
                </span>
              )}
            </div>
          </div>

          {blogPost.cover_image_url && blogPost.show_cover_image && (
            <img src={blogPost.cover_image_url} alt={blogPost.title} className="w-full h-auto rounded-lg mb-8 object-cover max-h-[400px]" />
          )}

          <div
            className="prose dark:prose-invert max-w-none text-gray-600 dark:text-optra-lightGray font-cairo leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          {blogPost.tags && blogPost.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-[#23232b]">
              <h3 className="text-lg font-bold text-text-light dark:text-white mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {blogPost.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-gray-100 dark:bg-optra-darkGray text-text-light dark:text-white text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {showFeedbackSection ? (
            <div className="mt-12 p-6 bg-gray-100 dark:bg-optra-darkGray rounded-lg flex items-center justify-between opacity-100 transition-opacity duration-500">
              <p className="text-text-light dark:text-white font-cairo">Was this article helpful?</p>
              <div className="flex space-x-4">
                <button
                  className="px-6 py-2 bg-optra-green text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  onClick={() => handleVote('yes')}
                >
                  Yes ({yesCount})
                </button>
                <button
                  className="px-6 py-2 border border-gray-300 dark:border-optra-gray text-text-light dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-[#2c2c2c] transition-colors"
                  onClick={() => handleVote('no')}
                >
                  No ({noCount})
                </button>
              </div>
            </div>
          ) : (
            <div className={`mt-12 p-6 bg-gray-100 dark:bg-optra-darkGray rounded-lg text-center text-text-light dark:text-white font-cairo ${showThankYou ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
              Thank you for your feedback!
            </div>
          )}
        </div>
      </section>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default BlogDetailsPage; 