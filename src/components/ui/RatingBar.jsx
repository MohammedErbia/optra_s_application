import React from 'react';
import PropTypes from 'prop-types';

const RatingBar = ({ 
  value = 0, 
  maxValue = 5, 
  size = 'medium',
  color = 'green',
  showValue = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'flex items-center';
  
  const colors = {
    green: 'bg-optra-green',
    yellow: 'bg-yellow-400',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    gray: 'bg-gray-400',
  };
  
  const sizes = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
  };
  
  const containerClasses = `${baseClasses} ${className}`;
  const filledWidth = `${(value / maxValue) * 100}%`;

  return (
    <div className={containerClasses} {...props}>
      <div className="w-full bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`${colors[color]} ${sizes[size]} rounded-full`} 
          style={{ width: filledWidth }}
        ></div>
      </div>
      {showValue && (
        <span className="ml-2 text-sm font-medium text-white">{value}/{maxValue}</span>
      )}
    </div>
  );
};

RatingBar.propTypes = {
  value: PropTypes.number,
  maxValue: PropTypes.number,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  color: PropTypes.oneOf(['green', 'yellow', 'blue', 'red', 'gray']),
  showValue: PropTypes.bool,
  className: PropTypes.string,
};

export default RatingBar;