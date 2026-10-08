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
    info: 'bg-sky-50 border-sky-300 text-slate-950',
    warning: 'bg-amber-50 border-amber-300 text-slate-950',
    success: 'bg-emerald-50 border-emerald-300 text-slate-950',
    danger: 'bg-red-50 border-red-300 text-slate-950',
  };

  const iconColors = {
    info: 'text-sky-700',
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
        {title && <p className="font-extrabold text-sm sm:text-base text-slate-950 mb-1">{title}</p>}
        <div className="leading-relaxed font-medium text-slate-900">{children}</div>
      </div>
    </div>
  );
};
