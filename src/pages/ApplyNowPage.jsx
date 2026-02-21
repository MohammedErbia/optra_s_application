import React, { useRef, useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { db } from '../lib/firebase'; // Import Firebase db
import { collection, addDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

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

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const validateForm = () => {
    let newErrors = {};
    const nameRegex = /^[A-Za-z]+\s[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!formData.name.trim()) {
      newErrors.name = 'applyPage.nameRequired';
    } else if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = 'applyPage.nameInvalid';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'applyPage.emailRequired';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'applyPage.emailInvalid';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'applyPage.messageRequired';
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
      const docRef = await addDoc(collection(db, "contact_us"), formData);
      console.log('Form data saved to Firebase with ID: ', docRef.id);

      // Migration Note:
      // The old code called a Supabase Edge Function to send emails:
      // fetch('https://txpnwwmnuvncpusqnoxb.supabase.co/functions/v1/send-contact-email')
      // You will need to replace this with a Firebase Cloud Function for sending emails
      // or implement an alternative email sending logic. 
      console.warn('Email sending via Edge Function is currently disabled post-migration to Firebase. Please implement Firebase Cloud Functions.');

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' }); // Clear form
    } catch (error) {
      console.error('Submission error:', error.message);
      setErrors({ submit: 'applyPage.submitError' }); // Set a general error message
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
    <div className={`bg-background-light dark:bg-optra-black min-h-screen transition-colors`} dir={isArabic ? 'rtl' : 'ltr'}>
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
          style={{ filter: isDarkMode ? 'drop-shadow(-10px 8px 50px rgba(255, 255, 255, 0.4))' : 'drop-shadow(-10px 8px 50px rgba(0, 0, 0, 0.6))' }}
        />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-cairo">{t('applyPage.header')}</h1>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-background-light dark:bg-optra-darkGray transition-colors">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white mb-8 font-cairo">{t('applyPage.header')}</h2>

            <div className="space-y-8">
              {/* Chat Info */}
              <div>
                <h3 className="text-xl font-semibold text-text-light dark:text-white mb-2 font-cairo">{t('applyPage.chatTitle')}</h3>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto">{t('applyPage.chatDesc')}</p>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto">{t('applyPage.chatHours')}</p>
              </div>

              {/* Phone Info */}
              <div>
                <h3 className="text-xl font-semibold text-text-light dark:text-white mb-2 font-cairo">{t('applyPage.phoneTitle')}</h3>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto">+970597776576</p>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto">{t('applyPage.phoneHours')}</p>
              </div>

              {/* Holiday Closures */}
              <div>
                <h3 className="text-xl font-semibold text-text-light dark:text-white mb-2 font-cairo">{t('applyPage.holidayTitle')}</h3>
                <p className="text-gray-600 dark:text-optra-lightGray font-roboto mb-2">{t('applyPage.holidayDesc')}</p>
                <ul className="text-gray-600 dark:text-optra-lightGray font-roboto list-disc list-inside space-y-1">
                  <li>{t('applyPage.holidayNewYear')}</li>
                  <li>{t('applyPage.holidayMemorial')}</li>
                  <li>{t('applyPage.holidayIndependence')}</li>
                  <li>{t('applyPage.holidayLabor')}</li>
                  <li>{t('applyPage.holidayChristmas')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-text-light dark:text-white text-base font-medium mb-2 font-cairo">{t('applyPage.nameLabel')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-optra-darkGray text-text-light dark:text-white border border-gray-300 dark:border-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-optra-green transition-colors"
                  placeholder={t('applyPage.namePlaceholder')}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{t(errors.name)}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-text-light dark:text-white text-base font-medium mb-2 font-cairo">{t('applyPage.emailLabel')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-optra-darkGray text-text-light dark:text-white border border-gray-300 dark:border-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-optra-green transition-colors"
                  placeholder={t('applyPage.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{t(errors.email)}</p>}
              </div>
              <div>
                <label htmlFor="message" className="block text-text-light dark:text-white text-base font-medium mb-2 font-cairo">{t('applyPage.messageLabel')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-optra-darkGray text-text-light dark:text-white border border-gray-300 dark:border-[#2c2c2c] focus:outline-none focus:ring-2 focus:ring-optra-green transition-colors"
                  placeholder={t('applyPage.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{t(errors.message)}</p>}
              </div>
              {submitSuccess && (
                <div className="text-green-600 text-center mt-4 font-semibold">{t('applyPage.successMessage')}</div>
              )}
              {errors.submit && <p className="text-red-500 text-sm mt-1">{t('applyPage.submitError')}</p>}
              <button
                type="submit"
                className="w-full py-3 px-6 bg-optra-green text-white font-semibold rounded-lg hover:bg-green-600 transition-colors text-lg font-cairo"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('applyPage.sending') : t('applyPage.sendMessage')}
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