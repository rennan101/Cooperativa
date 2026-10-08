import React from 'react';
import { Icon } from './Icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: string;
  iconRight?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-md shrink-0 cursor-pointer active:scale-[0.98]';

  const sizeStyles = {
    sm: 'h-10 px-3 text-xs sm:text-sm gap-1.5',
    md: 'h-12 px-4 text-sm sm:text-base gap-2',
    lg: 'h-14 px-6 text-base sm:text-lg gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-coop-primary text-white hover:bg-coop-primary-hover focus:ring-coop-500 border border-transparent shadow-xs hover:shadow-sm active:bg-coop-900',
    secondary: 'bg-coop-dark text-white hover:bg-coop-950 focus:ring-coop-dark border border-transparent shadow-xs active:bg-black',
    outline: 'bg-white text-slate-900 hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400 focus:ring-coop-500 shadow-xs active:bg-slate-100',
    ghost: 'bg-transparent text-slate-800 hover:bg-slate-100 border border-transparent active:bg-slate-200',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border border-transparent shadow-xs active:bg-red-800',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon name="progress_activity" size={size === 'sm' ? 'sm' : 'md'} className="animate-spin text-current shrink-0" />
      ) : iconLeft ? (
        <Icon name={iconLeft} size={size === 'sm' ? 'sm' : 'md'} className="text-current shrink-0 transition-transform group-hover:scale-105" />
      ) : null}
      {children ? <span className="truncate">{children}</span> : null}
      {!isLoading && iconRight ? (
        <Icon name={iconRight} size={size === 'sm' ? 'sm' : 'md'} className="text-current shrink-0 transition-transform group-hover:translate-x-0.5" />
      ) : null}
    </button>
  );
};
