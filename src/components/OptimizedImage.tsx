
import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  decoding?: 'async' | 'sync' | 'auto';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  placeholderColor?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  priority = false,
  decoding = 'async',
  objectFit = 'cover',
  placeholderColor = '#121212'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Reset states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setError(false);
  }, [src]);
  
  // Set loading attribute based on priority
  const loadingAttribute = priority ? 'eager' : loading;
  
  // Generate unique ID for ARIA purposes
  const imageId = `img-${Math.random().toString(36).substring(2, 9)}`;
  
  return (
    <div 
      className="relative" 
      style={{ width: width || '100%', height: height || 'auto' }}
      role="img"
      aria-labelledby={imageId}
    >
      {/* Placeholder while loading */}
      {!isLoaded && !error && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse" 
          style={{ backgroundColor: placeholderColor }}
          aria-hidden="true"
        />
      )}
      
      {/* Error state */}
      {error && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-pantog-gray text-white text-sm p-2 text-center"
          aria-hidden="true"
        >
          <span>Falha ao carregar imagem</span>
        </div>
      )}
      
      {/* Hidden span for screen readers */}
      <span id={imageId} className="sr-only">{alt}</span>
      
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loadingAttribute}
        decoding={decoding}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        style={{ objectFit }}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.error(`Falha ao carregar imagem: ${src}`);
          setError(true);
          setIsLoaded(false);
        }}
      />
    </div>
  );
};

export default OptimizedImage;
