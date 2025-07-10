import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const handleToggle = () => {
    i18n.changeLanguage(isArabic ? 'en' : 'ar');
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#14B8A6] font-bold font-cairo hover:bg-[#14B8A6] hover:text-white transition-colors"
      aria-label="Toggle language"
    >
      <span className="text-lg">{isArabic ? 'English' : 'عربي'}</span>
      <img src="/images/img_translate.svg" alt="Language" className="w-6 h-6" />
    </button>
  );
};

export default LanguageSwitcher; 