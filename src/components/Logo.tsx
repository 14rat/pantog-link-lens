
import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ variant = 'light', size = 'md' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-pantog-black';
  const accentColor = 'text-pantog-green';
  
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };
  
  return (
    <div className={`font-bold ${sizeClasses[size]} flex items-center`}>
      <span className={textColor}>Pant</span>
      <span className={accentColor}>og</span>
    </div>
  );
};

export default Logo;
