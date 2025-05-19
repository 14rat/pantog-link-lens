
import React, { useEffect, useRef, useState } from 'react';
import SkeletonLoader from './ui/skeleton-loader';

interface LazySectionProps {
  children: React.ReactNode;
  height?: string | number;
  width?: string | number;
  skeletonType?: 'text' | 'circle' | 'rectangle' | 'card';
  threshold?: number;
  className?: string;
}

const LazySection: React.FC<LazySectionProps> = ({
  children,
  height,
  width,
  skeletonType = 'rectangle',
  threshold = 0.1,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { 
        threshold,
        rootMargin: '200px' // Load when within 200px of viewport
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div 
      ref={sectionRef}
      className={className}
      style={{ minHeight: height, width: width }}
    >
      {isVisible ? (
        children
      ) : (
        <div aria-hidden="true">
          <SkeletonLoader 
            type={skeletonType}
            width={width as string} 
            height={height as string}
            className={className}
          />
        </div>
      )}
    </div>
  );
};

export default LazySection;
