
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, ChevronLeft, ChevronRight, Home, Link2, LogOut, Settings, Sparkles, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from './ui/button';

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState !== null) {
      setCollapsed(savedState === 'true');
    } else {
      // Default to collapsed on mobile devices
      const isMobile = window.innerWidth < 768;
      setCollapsed(isMobile);
    }
  }, []);
  
  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', String(collapsed));
    
    // Dispatch custom event to notify other components about the sidebar state change
    const event = new Event('sidebarStateChanged');
    window.dispatchEvent(event);
  }, [collapsed]);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Link2, label: 'Meus Links', path: '/dashboard/links' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: Settings, label: 'Configurações', path: '/dashboard/settings' },
    { icon: Sparkles, label: 'Premium', path: '/dashboard/premium', highlight: true },
  ];
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  return (
    <aside className={`h-screen bg-gradient-to-br from-pantog-gray to-[#252525] fixed left-0 top-0 flex flex-col transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } shadow-lg z-30`}>
      <div className={`p-4 flex ${collapsed ? 'justify-center' : 'justify-between'} items-center`}>
        <Logo compact={collapsed} size={collapsed ? 'xs' : 'md'} />
        
        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="text-gray-300 hover:bg-pantog-black/30"
          >
            <ChevronLeft className="h-5 w-5 text-pantog-green" />
          </Button>
        )}
      </div>
      
      {collapsed && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="mx-auto my-2 text-gray-300 hover:bg-pantog-black/30"
        >
          <ChevronRight className="h-5 w-5 text-pantog-green" />
        </Button>
      )}
      
      <nav className="flex-1 px-2 py-4 overflow-y-auto">
        <TooltipProvider delayDuration={0}>
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActiveItem = isActive(item.path);
              const itemContent = (
                <Link 
                  to={item.path} 
                  className={`flex items-center ${collapsed ? 'justify-center' : 'px-3'} py-3 rounded-lg transition-all duration-200 relative ${
                    isActiveItem
                      ? 'bg-pantog-black/30 text-pantog-green font-medium hover-elevate'
                      : item.highlight 
                        ? 'text-pantog-green hover:bg-pantog-black/30' 
                        : 'text-gray-300 hover:bg-pantog-black/30'
                  } ${isActiveItem && !collapsed ? 'pl-4' : ''}`}
                >
                  {/* Active indicator bar */}
                  {isActiveItem && (
                    <span className="absolute left-0 top-0 w-1 h-full bg-pantog-green rounded-r-full"></span>
                  )}
                  <item.icon className={`h-5 w-5 ${isActiveItem ? 'text-pantog-green' : ''} ${!collapsed && 'mr-3'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
              
              return (
                <li key={item.path} className="hover-scale">
                  {collapsed ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {itemContent}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="bg-pantog-black text-white border-pantog-gray">
                        <p>{item.label}</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    itemContent
                  )}
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </nav>
      
      <div className={`p-2 border-t border-pantog-black/30 ${collapsed ? 'flex justify-center' : ''}`}>
        {collapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                to="/logout" 
                className="flex items-center justify-center p-3 rounded-lg text-gray-300 hover:bg-pantog-black/30 transition-colors hover-scale"
              >
                <LogOut className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-pantog-black text-white border-pantog-gray">
              <p>Sair</p>
            </TooltipContent>
          </Tooltip>
        ) : (
          <Link 
            to="/logout" 
            className="flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-pantog-black/30 transition-colors hover-scale"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Sair
          </Link>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;
