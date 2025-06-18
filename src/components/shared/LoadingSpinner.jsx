import React from 'react';

const sizes = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-4',
};

const LoadingSpinner = ({ size = 'md', centered = false, className = '' }) => {
  const spinner = (
    <div
      className={`
        animate-spin rounded-full border-t-transparent border-blue-600
        ${sizes[size] || sizes.md}
        border-solid
        ${className}
      `}
    />
  );

  if (centered) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
