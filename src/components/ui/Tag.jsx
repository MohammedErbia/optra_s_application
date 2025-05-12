import React from 'react';
import PropTypes from 'prop-types';

const Tag = ({ 
  children, 
  variant = 'default', 
  size = 'medium',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md';
  
  const variants = {
    default: 'bg-optra-darkGray text-white',
    primary: 'bg-optra-green text-white',
    secondary: 'bg-white/10 text-white',
    outline: 'bg-transparent border border-optra-green text-optra-green',
  };
  
  const sizes = {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1.5 text-sm',
    large: 'px-4 py-2 text-base',
  };
  
  const tagClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <span
      className={tagClasses}
      {...props}
    >
      {children}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
};

export default Tag;