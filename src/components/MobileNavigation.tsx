
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Link as LinkIcon, Settings, Plus, Search } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    return currentPath.includes(path);
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 md:hidden bg-pantog-black border-t border-pantog-gray/50 z-20">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center justify-center px-4 ${
            isActive('/dashboard') && !isActive('/dashboard/analytics') && !isActive('/dashboard/settings') 
              ? 'text-pantog-green' 
              : 'text-gray-400'
          }`}
        >
          <LinkIcon size={20} />
          <span className="text-xs mt-1">Links</span>
        </Link>
        
        <Link 
          to="/dashboard/analytics" 
          className={`flex flex-col items-center justify-center px-4 ${
            isActive('/dashboard/analytics') 
              ? 'text-pantog-green' 
              : 'text-gray-400'
          }`}
        >
          <BarChart3 size={20} />
          <span className="text-xs mt-1">Analytics</span>
        </Link>
        
        <Link 
          to="/dashboard/create" 
          className="flex flex-col items-center justify-center"
        >
          <div className="bg-pantog-green text-pantog-black w-12 h-12 rounded-full flex items-center justify-center -mt-5 mb-1 shadow-lg">
            <Plus size={24} />
          </div>
          <span className="text-xs text-pantog-green">Criar</span>
        </Link>
        
        <Link 
          to="/dashboard/search" 
          className={`flex flex-col items-center justify-center px-4 ${
            isActive('/dashboard/search') 
              ? 'text-pantog-green' 
              : 'text-gray-400'
          }`}
        >
          <Search size={20} />
          <span className="text-xs mt-1">Buscar</span>
        </Link>
        
        <Link 
          to="/dashboard/settings" 
          className={`flex flex-col items-center justify-center px-4 ${
            isActive('/dashboard/settings') 
              ? 'text-pantog-green' 
              : 'text-gray-400'
          }`}
        >
          <Settings size={20} />
          <span className="text-xs mt-1">Config</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavigation;
