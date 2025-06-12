import React from 'react';

const ShimmerCard = () => {
  return (
    <div className="bg-white dark:bg-optra-black rounded-lg shadow-md overflow-hidden transition-colors border border-gray-200 dark:border-[#23232b]">
      <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-6 animate-pulse"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
      </div>
    </div>
  );
};

export default ShimmerCard; 