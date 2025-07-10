import React from 'react';
import Button from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

const CtaSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div 
          className="rounded-[30px] bg-gradient-to-r from-black to-[#0f9d8e] p-20"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-8 font-cairo">
              {t('cta.title')}
            </h2>
            
            <Button 
              variant="primary" 
              size="medium"
              className="mt-8 mx-auto flex items-center justify-center"
              icon={<img src="/images/img_icon_jamicons_outline_logos_arrowright.svg" alt="Arrow" className="w-6 h-6" />}
              onClick={() => window.location.href = '/contact'}
            >
              {t('cta.contactUs')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;