import React from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '../icons/FacebookIcon';
import TwitterIcon from '../icons/TwitterIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import InstagramIcon from '../icons/InstagramIcon';
import { useData } from '../../hooks/useData.ts';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const { data: services, loading: servicesLoading } = useData({ table: 'services' });

  return (
    <footer className="bg-background-light dark:bg-optra-black pt-12 border-t border-gray-200 dark:border-[#2c2c2c] transition-colors">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link to="/" onClick={scrollToTop}>
              <img src="/images/img_logo.svg" alt="Optra Logo" className="h-[45px] w-[209px] mb-6 h-8 w-auto sm:h-10 md:h-[45px]"
            />
            </Link>
            <p className="text-text-light dark:text-white text-base leading-relaxed mb-8 max-w-xs font-roboto transition-colors text-sm sm:text-base">
              {t('footer.description')}
            </p>
            
            <div className="flex space-x-4"> 
              <a href="https://www.facebook.com/optraagency" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-optra-green dark:text-optra-lightGray dark:hover:text-optra-green transition-colors">
                <FacebookIcon className="w-6 h-6 fill-gray-600 dark:fill-optra-lightGray hover:fill-optra-green dark:hover:fill-optra-green" />
              </a>
              <a href="https://x.com/Agency_Optra" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-optra-green dark:text-optra-lightGray dark:hover:text-optra-green transition-colors">
                <TwitterIcon className="w-6 h-6 fill-gray-600 dark:fill-optra-lightGray hover:fill-optra-green dark:hover:fill-optra-green" />
              </a>
              <a href="https://www.instagram.com/optraagency" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-optra-green dark:text-optra-lightGray dark:hover:text-optra-green transition-colors">
                <InstagramIcon className="w-6 h-6 fill-gray-600 dark:fill-optra-lightGray hover:fill-optra-green dark:hover:fill-optra-green" />
              </a>
              <a href="https://www.linkedin.com/in/optraagency" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-optra-green dark:text-optra-lightGray dark:hover:text-optra-green transition-colors">
                <LinkedInIcon className="w-6 h-6 fill-gray-600 dark:fill-optra-lightGray hover:fill-optra-green dark:hover:fill-optra-green" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-text-light dark:text-white text-base font-medium mb-4 capitalize font-cairo transition-colors sm:text-sm md:text-base">{t('footer.services')}</h3>
            <ul className="space-y-4">
              {services.map(service => (
                <li key={service.id}>
                  <Link
                    to="/services"
                    className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base"
                    onClick={scrollToTop}
                  >
                    {isArabic ? service.title_ar || service.title : service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-text-light dark:text-white text-base font-medium mb-4 capitalize font-cairo transition-colors sm:text-sm md:text-base">{t('footer.whyOptra')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/who-we-are" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green lowercase font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  {t('footer.whoWeAre')}
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  {t('footer.vision')}
                </Link>
              </li>
              <li>
                <Link to="/who-we-are" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  {t('footer.mission')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  {t('footer.faq')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  {t('footer.blog')}
                </Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-600 dark:text-[#e0e0e0] text-base hover:text-optra-green dark:hover:text-optra-green font-roboto transition-colors text-sm sm:text-base" onClick={scrollToTop}>
                  {t('footer.team')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-text-light dark:text-white text-base font-medium mb-4 font-roboto transition-colors sm:text-sm md:text-base">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <img src="/images/img_marker.svg" alt="Location" className="w-6 h-6 mr-2 mt-0.5 w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-gray-600 dark:text-[#e0e0e0] text-base font-roboto transition-colors text-sm sm:text-base">{t('footer.location')}</span>
              </li>
              <li className="flex items-center">
                <img src="/images/img_phone.svg" alt="Phone" className="w-5 h-5 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-gray-600 dark:text-[#e0e0e0] text-base font-roboto transition-colors text-sm sm:text-base">+970597776576</span>
              </li>
              <li className="flex items-center">
                <img src="/images/img_mail.svg" alt="Email" className="w-5 h-5 mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <a 
                  href="mailto:info@optraagency.com" 
                  className="text-blue-600 dark:text-[#007fff] text-base underline font-roboto transition-colors text-sm sm:text-base"
                >
                  info@optraagency.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-[#2c2c2c] mt-12 py-6 transition-colors">
          <p className="text-text-light dark:text-white text-base text-center font-roboto transition-colors text-sm sm:text-base">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;