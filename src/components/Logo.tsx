
import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  compact?: boolean;
}

const Logo: React.FC<LogoProps> = ({ variant = 'light', size = 'md', compact = false }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-pantog-black';
  const accentColor = 'text-pantog-green';
  
  const sizeClasses = {
    xs: 'text-base',
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };
  
  if (compact) {
    return (
      <div className={`font-bold ${sizeClasses[size]} flex items-center justify-center`}>
        <span className={`${accentColor} transition-all duration-300`}>P</span>
      </div>
    );
  }
  
  return (
    <div className={`font-bold ${sizeClasses[size]} flex items-center transition-all duration-300`}>
      <span className={`${textColor} transition-colors duration-300`}>Pant</span>
      <span className={`${accentColor} transition-colors duration-300`}>og</span>
    </div>
  );
};

export default Logo;
