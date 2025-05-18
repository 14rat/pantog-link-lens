
import React from 'react';
import PerformanceChart from './PerformanceChart';
import NewLinkCard from './NewLinkCard';

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
        <PerformanceChart />
      </div>
      
      <div>
        <NewLinkCard />
      </div>
    </div>
  );
};

export default MiddleSection;
