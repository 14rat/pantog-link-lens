
import React from 'react';
import EnhancedPerformanceChart from './EnhancedPerformanceChart';
import EnhancedNewLinkCard from './EnhancedNewLinkCard';

interface MiddleSectionProps {
  sidebarCollapsed: boolean;
}

const MiddleSection: React.FC<MiddleSectionProps> = ({ sidebarCollapsed }) => {
  return (
    <div className={`grid grid-cols-1 gap-4 md:gap-6 ${
      sidebarCollapsed
        ? 'lg:grid-cols-3'
        : 'lg:grid-cols-3'
    } mb-8`}>
      <div className="lg:col-span-2">
        <EnhancedPerformanceChart />
      </div>
      
      <div>
        <EnhancedNewLinkCard />
      </div>
    </div>
  );
};

export default MiddleSection;
