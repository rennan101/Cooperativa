import React from 'react';
import { Icon } from './Icon';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  iconLeft?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  helperText,
  errorMessage,
  iconLeft,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs sm:text-sm font-black text-slate-950">
          {label}
        </label>
      )}
      <div className="relative flex items-center group">
        {iconLeft && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-600 group-focus-within:text-coop-primary transition-colors">
            <Icon name={iconLeft} size="md" />
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full bg-white border-2 text-sm sm:text-base text-slate-950 font-bold placeholder-slate-400 rounded-md transition-all duration-150 focus:outline-none min-h-[46px] ${
            iconLeft ? 'pl-11 pr-4' : 'px-4'
          } ${
            errorMessage
              ? 'border-red-600 focus:ring-2 focus:ring-red-200 focus:border-red-600'
              : 'border-slate-300 focus:border-coop-primary focus:ring-3 focus:ring-emerald-500/20'
          } ${className}`}
          {...props}
        />
      </div>
      {errorMessage ? (
        <p className="text-xs sm:text-sm font-bold text-red-700 flex items-center gap-1 mt-0.5 animate-fade-in">
          <Icon name="error" size="sm" />
          <span>{errorMessage}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs font-semibold text-slate-600 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
