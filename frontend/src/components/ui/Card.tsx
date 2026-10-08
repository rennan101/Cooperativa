import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverable?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white border rounded-lg transition-all duration-150 ${
        hoverable
          ? 'hover:shadow-md hover:border-coop-primary active:scale-[0.995] cursor-pointer'
          : 'shadow-xs'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
