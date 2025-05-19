
import React from 'react';

type SkeletonType = 'text' | 'circle' | 'rectangle' | 'card';

interface SkeletonLoaderProps {
  type?: SkeletonType;
  width?: string;
  height?: string;
  className?: string;
  repeat?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  type = 'text', 
  width, 
  height, 
  className = '', 
  repeat = 1 
}) => {
  const getStyle = () => {
    let baseStyle = 'bg-gradient-to-r from-pantog-gray to-pantog-gray-hover bg-[length:400%_100%] animate-[shimmer_1.5s_infinite] rounded';
    
    switch (type) {
      case 'text':
        return `${baseStyle} h-4 w-full`;
      case 'circle':
        return `${baseStyle} rounded-full`;
      case 'rectangle':
        return `${baseStyle} w-full`;
      case 'card':
        return `${baseStyle} w-full h-36 rounded-lg`;
      default:
        return baseStyle;
    }
  };
  
  const renderSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < repeat; i++) {
      skeletons.push(
        <div
          key={i}
          className={`${getStyle()} ${className}`}
          style={{
            width: width || (type === 'text' ? '100%' : undefined),
            height: height || undefined,
          }}
          aria-hidden="true"
        />
      );
    }
    return skeletons;
  };
  
  return (
    <>
      {repeat === 1 ? (
        <div
          className={`${getStyle()} ${className}`}
          style={{
            width: width || (type === 'text' ? '100%' : undefined),
            height: height || undefined,
          }}
          aria-hidden="true"
        />
      ) : (
        <div className="flex flex-col space-y-3">
          {renderSkeletons()}
        </div>
      )}
    </>
  );
};

export default SkeletonLoader;
