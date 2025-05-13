import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const TestimonialsSection = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const testimonials = [
    {
      id: 1,
      name: 'Jane Cooper',
      avatar: '/images/img_user_thumb.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      name: 'Ralph Edwards',
      avatar: '/images/img_user_thumb_64x64.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 3,
      name: 'Courtney Henry',
      avatar: '/images/img_user_thumb_1.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 4,
      name: 'Cameron Williamson',
      avatar: '/images/img_user_thumb_2.png',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? pageCount - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === pageCount - 1 ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage
  );

  return (
    <section className={`${isDarkMode ? 'bg-optra-darkGray' : 'bg-gray-50'} py-20`}>
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className={`text-5xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'} leading-tight mb-6 font-roboto`}>
            What Our <span className="text-optra-green">Clients Say</span> About Us
          </h2>
          <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-600'} max-w-3xl font-roboto`}>
            We are proud that our clients' experiences genuinely reflect the excellence of our digital services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`${isDarkMode ? 'bg-optra-darkGray border-optra-border' : 'bg-white border-gray-200'} border rounded-[10px] p-8 shadow-md`}
            >
              <p className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-700'} mb-8 font-roboto`}>
                {testimonial.text}
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="w-16 h-16 rounded-full mr-4"
                />
                <h4 className={`text-lg font-normal ${isDarkMode ? 'text-white' : 'text-gray-900'} font-roboto`}>
                  {testimonial.name}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center mt-8">
          <button 
            onClick={handlePrevPage}
            className="w-12 h-12 rounded-full border-2 border-optra-green flex items-center justify-center mr-4 hover:bg-optra-green/10 transition-colors"
          >
            <img 
              src="/images/img_icon_iconoir_arrowleft.svg" 
              alt="Previous" 
              className="w-6 h-6"
            />
          </button>
          <button 
            onClick={handleNextPage}
            className="w-12 h-12 rounded-full border-2 border-optra-green flex items-center justify-center hover:bg-optra-green/10 transition-colors"
          >
            <img 
              src="/images/img_icon_iconoir_arrowleft.svg" 
              alt="Next" 
              className="w-6 h-6 transform rotate-180"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;