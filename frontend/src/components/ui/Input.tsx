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
        <label htmlFor={inputId} className="text-xs font-bold text-uber-black uppercase tracking-wider">
          {label}
        </label>
      )}
      <div className="relative flex items-center group">
        {iconLeft && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-uber-iron group-focus-within:text-uber-black transition-colors">
            <Icon name={iconLeft} size="md" />
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          className={`w-full bg-uber-gray border text-sm sm:text-base text-uber-black font-semibold placeholder-uber-iron rounded-lg transition-all duration-150 focus:outline-none focus:bg-white min-h-[48px] ${
            iconLeft ? 'pl-11 pr-4' : 'px-4'
          } ${
            errorMessage
              ? 'border-red-600 focus:ring-2 focus:ring-red-100 focus:border-red-600'
              : 'border-transparent focus:border-uber-black focus:ring-1 focus:ring-uber-black'
          } ${className}`}
          {...props}
        />
      </div>
      {errorMessage ? (
        <p className="text-xs font-bold text-red-600 flex items-center gap-1 mt-0.5 animate-fade-in">
          <Icon name="error" size="sm" />
          <span>{errorMessage}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs font-medium text-uber-iron mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
