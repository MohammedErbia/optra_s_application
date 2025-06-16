import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { supabase } from '../lib/supabase'; // Import Supabase client

const ApplyNowPage = () => {
  const { isDarkMode } = useTheme();
  const aboutImageRef = useRef(null); // Ref for the animated image in the header

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z]+\s[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = 'Please enter both first and last name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitSuccess(false); // Reset success message on new submission attempt

    console.log("handleSubmit triggered!"); // Added for debugging

    if (!validateForm()) {
      console.log("Validation failed, not submitting."); // Added for debugging
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('contact_us')
        .insert([formData]);

      if (error) {
        throw error;
      }

      console.log('Form data saved to Supabase:', data);
      
      // Call the Edge Function to send email
      const response = await fetch('https://txpnwwmnuvncpusqnoxb.supabase.co/functions/v1/send-contact-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cG53d21udXZuY3B1c3Fub3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMDM2OTEsImV4cCI6MjA2MzY3OTY5MX0.XKFnB7QU_y0ZxsVH2-h92PSJ03-RvhubHBI7JmiZjI8', 
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email via Edge Function');
      }
      console.log('Email sent via Edge Function:', result);

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Submission error:', error.message);
      setErrors({ submit: 'Failed to send message. Please try again later.' }); // Set a general error message
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="bg-background-light dark:bg-optra-black min-h-screen transition-colors">
      <Header />

      {/* Page Header Section */}
      <section className="relative bg-black text-white py-20 md:py-32 flex items-center justify-center min-h-[400px] md:min-h-[500px] overflow-hidden">
        {/* Background Image */}
        <img 
          src="/images/img_group_2372.png" 
          alt="Header Background" 
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo">Contact Us</h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background-light dark:bg-optra-darkGray transition-colors">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white mb-8 font-cairo">Contact Us</h2>

            <div className="space-y-8">
              {/* Chat Info */}
              <div>
                <h3 className="text-xl font-semibold text-text-light dark:text-white mb-2 font-cairo">Chat</h3>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto">Chat with a member of our support team for US and Canada</p>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto">Hours: 4AM - 10PM PT, 7 days a week</p>
              </div>

              {/* Phone Info */}
              <div>
                <h3 className="text-xl font-semibold text-text-light dark:text-white mb-2 font-cairo">Phone</h3>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto">+9701234567654</p>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto">Hours: 5AM – 8PM PT, 7 days a week</p>
              </div>

              {/* Holiday Closures */}
              <div>
                <h3 className="text-xl font-semibold text-text-light dark:text-white mb-2 font-cairo">Holiday Closures</h3>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto mb-2">Our Customer Contact Center will be closed to observe the following US Holidays:</p>
                <ul className="text-gray-600 dark:text-optra-lightGray font-roboto list-disc list-inside space-y-1">
                  <li>New Years Day</li>
                  <li>Memorial Day</li>
                  <li>Independence Day</li>
                  <li>Labor Day</li>
                  <li>Thanksgiving</li>
                  <li>Christmas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-text-light dark:text-white text-base font-medium mb-2 font-cairo">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-optra-darkGray text-text-light dark:text-white border border-gray-300 dark:border-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-optra-green transition-colors"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 font-roboto">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-text-light dark:text-white text-base font-medium mb-2 font-cairo">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-optra-darkGray text-text-light dark:text-white border border-gray-300 dark:border-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-optra-green transition-colors"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 font-roboto">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-text-light dark:text-white text-base font-medium mb-2 font-cairo">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="6" 
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-optra-darkGray text-text-light dark:text-white border border-gray-300 dark:border-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-optra-green transition-colors"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1 font-roboto">{errors.message}</p>}
              </div>
              {submitSuccess && (
                <p className="text-optra-green text-center font-semibold">Your message has been sent successfully!</p>
              )}
              {errors.submit && (
                <p className="text-red-500 text-center text-sm font-roboto">{errors.submit}</p>
              )}
              <button 
                type="submit" 
                className="w-full md:w-auto px-6 py-3 bg-optra-green text-white font-semibold rounded-lg hover:bg-optra-darkGreen transition-colors"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ApplyNowPage; 