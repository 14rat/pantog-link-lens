
import React, { useEffect, useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import MiddleSection from '@/components/dashboard/MiddleSection';
import RecentLinksTable from '@/components/dashboard/RecentLinksTable';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check sidebar state from localStorage and listen for window resizes
  useEffect(() => {
    const checkSidebarState = () => {
      const savedState = localStorage.getItem('sidebar-collapsed');
      setSidebarCollapsed(savedState === 'true');
    };

    const checkDeviceSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial checks
    checkSidebarState();
    checkDeviceSize();
    
    // Set up event listeners
    window.addEventListener('storage', checkSidebarState);
    window.addEventListener('sidebarStateChanged', checkSidebarState);
    window.addEventListener('resize', checkDeviceSize);
    
    return () => {
      window.removeEventListener('storage', checkSidebarState);
      window.removeEventListener('sidebarStateChanged', checkSidebarState);
      window.removeEventListener('resize', checkDeviceSize);
    };
  }, []);
  
  return (
    <div className="min-h-screen bg-pantog-black">
      <DashboardSidebar />
      
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } p-4 md:p-6 lg:p-8 pt-6`}
      >
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />
          <StatCards sidebarCollapsed={sidebarCollapsed} />
          <MiddleSection sidebarCollapsed={sidebarCollapsed} />
          <RecentLinksTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
