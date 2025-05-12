import React from 'react';
import PropTypes from 'prop-types';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

const HeroSection = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImage,
  className = '',
}) => {
  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center py-20 ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 leading-tight font-cairo">
          {title}
        </h1>
        
        <p className="text-lg md:text-xl text-white mb-10 max-w-3xl mx-auto font-cairo">
          {subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {primaryButtonText && (
            <Link to={primaryButtonLink || '#'}>
              <Button 
                variant="primary" 
                size="large"
              >
                {primaryButtonText}
              </Button>
            </Link>
          )}
          
          {secondaryButtonText && (
            <Link to={secondaryButtonLink || '#'}>
              <Button 
                variant="secondary" 
                size="large"
              >
                {secondaryButtonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  primaryButtonText: PropTypes.string,
  primaryButtonLink: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  secondaryButtonLink: PropTypes.string,
  backgroundImage: PropTypes.string,
  className: PropTypes.string,
};

export default HeroSection;