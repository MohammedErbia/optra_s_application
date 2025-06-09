import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

const FaqPage = () => {
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null); // Ref for the animated image in the header
  const [openFaq, setOpenFaq] = useState(null);

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

  const faqs = [
    {
      question: "What services does Optra offer?",
      answer: "We provide comprehensive solutions including website and mobile app development, UI/UX design, ERP systems, e-commerce solutions, digital marketing, professional translation, cloud services, and artificial intelligence solutions."
    },
    {
      question: "How can I request a service?",
      answer: "You can request a service by visiting our 'Apply Now' page or by contacting us directly via email or phone."
    },
    {
      question: "Do you offer customized services based on each client's requirements?",
      answer: "Yes, we specialize in providing custom-tailored solutions to meet the unique needs and specifications of each client."
    },
    {
      question: "What is the project delivery timeline?",
      answer: "The project delivery timeline varies depending on the complexity and scope of the project. We will provide a detailed timeline after the initial consultation and requirements gathering."
    },
    {
      question: "Do I need to provide website or app content when requesting a service?",
      answer: "Ideally, providing content upfront helps us in design and development. However, we can also assist with content creation if needed."
    },
    {
      question: "Do you provide technical support after project delivery?",
      answer: "Yes, we offer post-delivery technical support and maintenance packages to ensure your solution continues to run smoothly."
    },
    {
      question: "Can I follow up on the project's progress?",
      answer: "Absolutely! We believe in transparent communication and will provide regular updates and access to project progress tracking tools."
    },
    {
      question: "Are your services available across the Arab world?",
      answer: "Yes, our services are available to clients across the Arab world and internationally."
    },
    {
      question: "What payment methods are available?",
      answer: "We accept various payment methods, including bank transfers and major credit cards. Specific details will be provided during the contracting phase."
    },
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
      <Header />

      {/* FAQ Header Section */}
      <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <img 
          src="/images/img_group_2372.png" 
          alt="FAQ Background" 
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo">Frequently Asked Questions (FAQ)</h1>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="relative py-20 bg-background-light dark:bg-optra-darkGray transition-colors overflow-hidden">
        {/* Background Pattern */}
        <img src="/images/img_frame_2310.svg" alt="Background Pattern" className="absolute top-0 left-0 z-0 h-[1020px] w-[366px]" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light dark:text-white mb-12 font-cairo transition-colors">Answers to your questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-300 dark:border-[#23232b] pb-6">
                <button 
                  className="flex justify-between items-center w-full text-left text-text-light dark:text-white font-semibold text-lg md:text-xl font-cairo focus:outline-none py-2"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <svg 
                    className={`w-6 h-6 transform transition-transform duration-300 ${openFaq === index ? 'rotate-180' : 'rotate-0'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {openFaq === index && (
                  <p className="mt-4 text-gray-600 dark:text-optra-lightGray text-base md:text-lg font-cairo leading-relaxed animate-fade-in">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FaqPage; 