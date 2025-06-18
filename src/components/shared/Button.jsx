import React from 'react';
import clsx from 'clsx'; // You can remove clsx and use template literals if preferred

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center justify-center px-4 py-2 rounded font-medium transition-all duration-150';

  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300',
  };

  const finalClass = clsx(
    baseStyles,
    variants[variant] || variants.primary,
    disabled || loading ? 'opacity-50 cursor-not-allowed' : '',
    className
  );

  return (
    <button
      type={type}
      className={finalClass}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
