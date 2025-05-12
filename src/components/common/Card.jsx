import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  title,
  description,
  icon,
  image,
  className = '',
  children,
  onClick,
  ...props
}) => {
  const baseClasses = 'bg-optra-darkGray rounded-[20px] overflow-hidden transition-all duration-300';
  const cardClasses = `${baseClasses} ${className}`;

  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      {...props}
    >
      {image && (
        <div className="w-full">
          <img src={image} alt={title} className="w-full h-auto object-cover" />
        </div>
      )}
      
      <div className="p-8">
        {icon && (
          <div className="mb-6">
            {icon}
          </div>
        )}
        
        {title && (
          <h3 className="text-[27px] font-semibold leading-[50px] text-white font-cairo mb-2">
            {title}
          </h3>
        )}
        
        {description && (
          <p className="text-base font-normal leading-[29px] text-optra-lightGray font-cairo">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  icon: PropTypes.node,
  image: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Card;