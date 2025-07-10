import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useRecentBlogPosts } from '../hooks/useRecentBlogPosts';
import { useBlogCategories } from '../hooks/useBlogCategories';
import { useBlogTags } from '../hooks/useBlogTags';
import { useBlogSearchSuggestions } from '../hooks/useBlogSearchSuggestions';
import ShimmerCard from '../components/common/ShimmerCard';
import ScrollToTopButton from '../components/common/ScrollToTopButton';
import { useTranslation } from 'react-i18next';

const BlogPage = () => {
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null); // Ref for the animated image in the header
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [selectedTag, setSelectedTag] = useState(''); // State for selected tag
  const [showSuggestions, setShowSuggestions] = useState(false); // State to control suggestion list visibility
  const searchInputRef = useRef(null); // Ref for the search input
  const postsPerPage = 5; // Number of posts per page

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  // Fetch blog posts using the custom hook
  const { blogPosts, loading, error, totalCount } = useBlogPosts(currentPage, postsPerPage, searchTerm, selectedCategory, selectedTag);
  const totalPages = Math.ceil(totalCount / postsPerPage); // Calculate total pages

  // Fetch recent blog posts using the new hook
  const { recentPosts, loading: recentPostsLoading, error: recentPostsError } = useRecentBlogPosts(5);

  // Fetch blog categories using the new hook
  const { categories, loading: categoriesLoading, error: categoriesError } = useBlogCategories();

  // Fetch blog tags using the new hook
  const { tags, loading: tagsLoading, error: tagsError } = useBlogTags();

  // Fetch search suggestions
  const { suggestions, loading: suggestionsLoading, error: suggestionsError } = useBlogSearchSuggestions(searchTerm);

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
      }
    };
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
    setSelectedCategory(''); // Clear category when searching
    setSelectedTag(''); // Clear tag when searching
    setShowSuggestions(true); // Show suggestions when typing
  };

  // Handle category click
  const handleCategoryClick = (categoryObj) => {
    setSelectedCategory(categoryObj.name);
    setSearchTerm(''); // Clear search term when selecting a category
    setSelectedTag(''); // Clear tag when selecting a category
    setCurrentPage(1); // Reset to first page on new category selection
    setShowSuggestions(false); // Hide suggestions when selecting a category
  };

  // Handle tag click
  const handleTagClick = (tagObj) => {
    setSelectedTag(tagObj.name);
    setSearchTerm(''); // Clear search term when selecting a tag
    setSelectedCategory(''); // Clear category when selecting a tag
    setCurrentPage(1); // Reset to first page on new tag selection
    setShowSuggestions(false); // Hide suggestions when selecting a tag
  };

  // Handle suggestion click
  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setCurrentPage(1);
    setSelectedCategory('');
    setSelectedTag('');
    setShowSuggestions(false); // Hide suggestions after clicking
  };

  // Placeholder data for tags (will be made dynamic later)
  const tagsPlaceholder = [
    "ECOMERS APP", "MUSIC APP", "BANK APP", "SOCIAL APP"
  ];

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5; // Max number of page buttons to show at once
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(
        <button key="first" className="px-3 py-1 rounded-md text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-optra-darkGray transition-colors" onClick={() => handlePageChange(1)}>&laquo; First</button>
      );
      if (startPage > 2) {
        buttons.push(<span key="dots-start">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button 
          key={i} 
          className={`px-3 py-1 rounded-md ${i === currentPage ? 'bg-optra-green text-white' : 'text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-optra-darkGray'} transition-colors`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(<span key="dots-end">...</span>);
      }
      buttons.push(
        <button key="last" className="px-3 py-1 rounded-md text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-optra-darkGray transition-colors" onClick={() => handlePageChange(totalPages)}>Last &raquo;</button>
      );
    }

    return buttons;
  };

  return (
    <div className={`bg-background-light dark:bg-optra-black min-h-screen transition-colors`} dir={isArabic ? 'rtl' : 'ltr'}>
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
          style={{ filter: isDarkMode ? 'drop-shadow(-10px 8px 50px rgba(255, 255, 255, 0.4))': 'drop-shadow(-10px 8px 50px rgba(0, 0, 0, 0.6))'}}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo">{t('blogPage.header')}</h1>
        </div>
      </section>

      {/* Blog Content Section */}
      <section className="relative py-20 bg-background-light dark:bg-optra-darkGray transition-colors overflow-hidden">
        {/* Background Pattern */}
        <img src="/images/img_frame_2310.svg" alt="Background Pattern" className="absolute top-0 left-0 z-0 h-[1020px] w-[366px]" />
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Blog Posts Column */}
          <div className="md:col-span-2 space-y-12">
            {loading ? (
              Array.from({ length: postsPerPage }).map((_, index) => <ShimmerCard key={index} />)
            ) : error ? (
              <div className="text-red-500">Error loading posts: {error.message}</div>
            ) : !blogPosts.length ? (
              <div className="text-text-light dark:text-white">{t('blogPage.noPostsFound')}</div>
            ) : (
              blogPosts.map(post => (
                <div key={post.id} className="bg-white dark:bg-optra-black rounded-lg shadow-md overflow-hidden transition-colors border border-gray-200 dark:border-[#23232b]">
                  <img src={post.cover_image_url} alt={post.title} className="w-full h-64 object-cover" />
                  <div className="p-6">
                    <h2 className="text-xl md:text-2xl font-bold text-text-light dark:text-white mb-4 font-cairo">{isArabic ? post.title_ar || post.title : post.title}</h2>
                    <p className="text-gray-600 dark:text-optra-lightGray text-base font-cairo leading-relaxed mb-6">{isArabic ? post.short_description_ar || post.short_description : post.short_description}</p>
                    <Link to={`/blog/${post.slug}`} className="text-optra-green font-semibold hover:underline">{t('blogPage.readMore')}</Link>
                  </div>
                </div>
              ))
            )}

            {/* Pagination */}
            {!loading && !error && blogPosts.length > 0 && totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12">
                <button 
                  className="px-3 py-1 rounded-md text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-optra-darkGray transition-colors"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {t('blogPage.previous')}
                </button>
                {renderPaginationButtons()}
                <button 
                  className="px-3 py-1 rounded-md text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-optra-darkGray transition-colors"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {t('blogPage.next')}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="md:col-span-1 space-y-10">
            {/* Search Bar */}
            <div className="bg-white dark:bg-optra-black p-6 rounded-lg shadow-md border border-gray-200 dark:border-[#23232b] transition-colors">
              <div className="relative" ref={searchInputRef}>
                <input 
                  type="text" 
                  placeholder={t('blogPage.searchPlaceholder')} 
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => searchTerm.length > 1 && setShowSuggestions(true)}
                  className="w-full p-3 pl-10 rounded-lg bg-gray-100 dark:bg-optra-darkGray text-text-light dark:text-white border border-gray-300 dark:border-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-optra-green transition-colors"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                {showSuggestions && searchTerm.length > 1 && suggestions.length > 0 && (
                  <ul className="absolute left-0 right-0 bg-white dark:bg-optra-black border border-gray-200 dark:border-[#23232b] rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion) => (
                      <li key={suggestion.id} className="p-3 hover:bg-gray-100 dark:hover:bg-optra-darkGray cursor-pointer text-text-light dark:text-white">
                        <Link 
                          to={`/blog/${suggestion.slug}`}
                          onClick={() => handleSuggestionClick(suggestion.title)}
                          className="block"
                        >
                          {suggestion.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {showSuggestions && searchTerm.length > 1 && suggestionsLoading && (
                  <ul className="absolute left-0 right-0 bg-white dark:bg-optra-black border border-gray-200 dark:border-[#23232b] rounded-lg shadow-lg mt-1 z-10">
                    <li className="p-3 text-text-light dark:text-white">{t('blogPage.loadingSuggestions')}</li>
                  </ul>
                )}
                {showSuggestions && searchTerm.length > 1 && !suggestionsLoading && !suggestions.length && !suggestionsError && (
                  <ul className="absolute left-0 right-0 bg-white dark:bg-optra-black border border-gray-200 dark:border-[#23232b] rounded-lg shadow-lg mt-1 z-10">
                    <li className="p-3 text-text-light dark:text-white">{t('blogPage.noSuggestionsFound')}</li>
                  </ul>
                )}
                {showSuggestions && searchTerm.length > 1 && suggestionsError && (
                  <ul className="absolute left-0 right-0 bg-white dark:bg-optra-black border border-gray-200 dark:border-[#23232b] rounded-lg shadow-lg mt-1 z-10">
                    <li className="p-3 text-red-500">{t('blogPage.errorLoadingSuggestions')}</li>
                  </ul>
                )}
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-white dark:bg-optra-black p-6 rounded-lg shadow-md border border-gray-200 dark:border-[#23232b] transition-colors">
              <h3 className="text-xl font-bold text-text-light dark:text-white mb-6 font-cairo">{t('blogPage.recentPosts')}</h3>
              <div className="space-y-4">
                {recentPostsLoading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-24 h-16 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  ))
                ) : recentPostsError ? (
                  <div className="text-red-500">{t('blogPage.errorLoadingRecentPosts')}</div>
                ) : !recentPosts.length ? (
                  <div className="text-text-light dark:text-white">{t('blogPage.noRecentPostsFound')}</div>
                ) : (
                  recentPosts.map(post => (
                    <Link to={`/blog/${post.slug}`} key={post.id} className={`flex items-center group ${isArabic ? 'flex-row-reverse gap-x-4' : 'gap-x-4'}`}>
                      <img src={post.cover_image_url} alt={post.title} className="w-24 h-16 object-cover rounded-md group-hover:scale-105 transition-transform duration-300"/>
                      <p className="text-text-light dark:text-white text-sm font-cairo group-hover:text-optra-green transition-colors">{isArabic ? post.title_ar || post.title : post.title}</p>
                    </Link>
                  ))
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white dark:bg-optra-black p-6 rounded-lg shadow-md border border-gray-200 dark:border-[#23232b] transition-colors">
              <h3 className="text-xl font-bold text-text-light dark:text-white mb-6 font-cairo">{t('blogPage.categories')}</h3>
              <ul className="space-y-3">
                {categoriesLoading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <li key={index} className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></li>
                  ))
                ) : categoriesError ? (
                  <div className="text-red-500">{t('blogPage.errorLoadingCategories')}</div>
                ) : !categories.length ? (
                  <div className="text-text-light dark:text-white">{t('blogPage.noCategoriesFound')}</div>
                ) : (
                  categories.map(category => (
                    <li key={category.name}>
                      <a 
                        href="#" 
                        className={`flex items-center ${selectedCategory === category.name ? 'text-optra-green font-semibold' : 'text-text-light dark:text-white'} hover:text-optra-green transition-colors`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category);
                        }}
                      >
                        <span className="mr-2 text-optra-green">&#9656;</span> {isArabic ? category.name_ar || category.name : category.name}
                      </a>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-optra-black p-6 rounded-lg shadow-md border border-gray-200 dark:border-[#23232b] transition-colors">
              <h3 className="text-xl font-bold text-text-light dark:text-white mb-6 font-cairo">{t('blogPage.tags')}</h3>
              <div className="flex flex-wrap gap-2">
                {tagsLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  ))
                ) : tagsError ? (
                  <div className="text-red-500">{t('blogPage.errorLoadingTags')}</div>
                ) : !tags.length ? (
                  <div className="text-text-light dark:text-white">{t('blogPage.noTagsFound')}</div>
                ) : (
                  tags.map(tag => (
                    <a 
                      href="#" 
                      key={tag.name} 
                      className={`px-4 py-2 rounded-full ${selectedTag === tag.name ? 'bg-optra-green text-white' : 'bg-gray-100 dark:bg-optra-darkGray text-text-light dark:text-white'} text-sm hover:bg-optra-green hover:text-white transition-colors`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTagClick(tag);
                      }}
                    >
                      {isArabic ? tag.name_ar || tag.name : tag.name}
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default BlogPage; 