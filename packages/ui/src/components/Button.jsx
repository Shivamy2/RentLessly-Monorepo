/**
 * Shared Button Component
 * Base button component used across the app
 */

'use client';

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  ...props
}) {
  const baseStyles = 'font-medium rounded-sm transition-colors focus:outline-none';

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-300',
    secondary: 'bg-gray-200 text-black hover:bg-gray-300',
    outline: 'border border-black text-black hover:bg-black hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
