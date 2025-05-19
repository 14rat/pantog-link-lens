
import React, { useEffect, useState } from 'react';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import MiddleSection from '@/components/dashboard/MiddleSection';
import LinkManagement from '@/components/dashboard/LinkManagement';
import GlobalHeader from '@/components/GlobalHeader';
import GlobalFooter from '@/components/GlobalFooter';
import MobileNavigation from '@/components/MobileNavigation';
import { Toaster } from 'sonner';

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
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-collapse sidebar on mobile
      if (mobile && !sidebarCollapsed) {
        localStorage.setItem('sidebar-collapsed', 'true');
        setSidebarCollapsed(true);
        // Dispatch event to notify other components
        window.dispatchEvent(new Event('sidebarStateChanged'));
      }
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
  }, [sidebarCollapsed]);
  
  return (
    <div className="min-h-screen bg-pantog-black">
      <GlobalHeader currentPage="Dashboard" />
      <DashboardSidebar />
      
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        } pb-20 md:pb-4 p-4 md:p-6 lg:p-8 pt-6`}
      >
        <div className="max-w-7xl mx-auto">
          <DashboardHeader />
          <StatCards sidebarCollapsed={sidebarCollapsed} />
          <MiddleSection sidebarCollapsed={sidebarCollapsed} />
          <LinkManagement />
          <GlobalFooter />
        </div>
      </div>
      
      <MobileNavigation />
      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;
