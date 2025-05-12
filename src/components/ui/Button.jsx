import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false, 
  type = 'button',
  className = '',
  icon = null,
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none flex items-center justify-center';
  
  const variants = {
    primary: 'bg-optra-green text-white hover:bg-optra-darkGreen border-2 border-optra-darkGreen',
    secondary: 'bg-transparent text-white border-2 border-white hover:bg-white/10',
    outline: 'bg-transparent border-2 border-optra-green text-optra-green hover:bg-optra-green/10',
  };
  
  const sizes = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-6 py-4 text-xl',
  };
  
  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default Button;