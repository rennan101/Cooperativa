import React from 'react';

export interface IconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  fill?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = '',
  size = 'md',
  fill = false,
}) => {
  let sizeClass = 'text-[24px]';
  let inlineStyle: React.CSSProperties = {};

  if (typeof size === 'number') {
    inlineStyle = { fontSize: `${size}px` };
  } else {
    switch (size) {
      case 'sm':
        sizeClass = 'text-[18px]';
        break;
      case 'md':
        sizeClass = 'text-[24px]';
        break;
      case 'lg':
        sizeClass = 'text-[32px]';
        break;
      case 'xl':
        sizeClass = 'text-[40px]';
        break;
    }
  }

  return (
    <span
      className={`material-symbols-outlined select-none align-middle ${sizeClass} ${fill ? 'fill' : ''} ${className}`}
      style={inlineStyle}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
