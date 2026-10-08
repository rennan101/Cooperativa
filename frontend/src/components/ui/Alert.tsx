import React from 'react';
import { Icon } from './Icon';

export interface AlertProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'info' | 'warning' | 'success' | 'danger';
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  children,
  variant = 'info',
  className = '',
}) => {
  const iconMap = {
    info: 'info',
    warning: 'warning',
    success: 'check_circle',
    danger: 'error',
  };

  const variantStyles = {
    info: 'bg-uber-gray border-uber-border text-uber-black',
    warning: 'bg-amber-50 border-amber-200 text-uber-black',
    success: 'bg-emerald-50 border-emerald-200 text-uber-black',
    danger: 'bg-red-50 border-red-200 text-uber-black',
  };

  const iconColors = {
    info: 'text-uber-black',
    warning: 'text-amber-700',
    success: 'text-emerald-700',
    danger: 'text-red-700',
  };

  return (
    <div
      role="alert"
      className={`border rounded-lg p-3.5 sm:p-4 flex items-start gap-3 text-left ${variantStyles[variant]} ${className}`}
    >
      <div className={`mt-0.5 shrink-0 ${iconColors[variant]}`}>
        <Icon name={iconMap[variant]} size="md" />
      </div>
      <div className="flex-1 text-xs sm:text-sm">
        {title && <p className="font-bold text-sm sm:text-base text-uber-black mb-1">{title}</p>}
        <div className="leading-relaxed font-normal text-uber-charcoal">{children}</div>
      </div>
    </div>
  );
};

