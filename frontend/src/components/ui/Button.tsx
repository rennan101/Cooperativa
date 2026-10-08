import React from 'react';
import { Icon } from './Icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'pill' | 'white';
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
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer select-none text-center';

  const variants = {
    primary:
      'bg-black text-white hover:bg-neutral-900 active:bg-neutral-800 border border-transparent shadow-none',
    secondary:
      'bg-uber-gray text-black hover:bg-uber-gray-hover active:bg-neutral-200 border border-transparent',
    white:
      'bg-white text-black hover:bg-neutral-100 active:bg-neutral-200 border border-transparent',
    outline:
      'bg-white text-black border border-neutral-300 hover:bg-uber-gray active:bg-neutral-200',
    ghost:
      'bg-transparent text-black hover:bg-uber-gray active:bg-neutral-200 border border-transparent',
    danger:
      'bg-black text-white hover:bg-red-700 active:bg-red-800 border border-transparent',
    pill:
      'bg-white text-black hover:bg-neutral-100 active:bg-neutral-200 rounded-full border border-neutral-300 font-medium',
  };

  const sizes = {
    sm: 'h-9 px-3.5 text-xs gap-1.5 rounded-lg',
    md: 'h-11 px-4 text-sm gap-2 rounded-lg',
    lg: 'h-13 px-6 text-base gap-2.5 rounded-lg',
  };

  const isPill = variant === 'pill';
  const radiusClass = isPill ? 'rounded-full' : sizes[size].split(' ').find(c => c.startsWith('rounded-')) || 'rounded-lg';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${radiusClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : iconLeft ? (
        <Icon name={iconLeft} size={size === 'sm' ? 'sm' : 'md'} className="shrink-0" />
      ) : null}

      <span className="truncate">{children}</span>

      {!isLoading && iconRight && (
        <Icon name={iconRight} size={size === 'sm' ? 'sm' : 'md'} className="shrink-0" />
      )}
    </button>
  );
};
