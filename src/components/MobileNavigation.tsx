
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BarChart2, Plus, Settings, User } from 'lucide-react';

const MobileNavigation: React.FC = () => {
  const location = useLocation();
  
  // Only show on dashboard routes
  if (!location.pathname.includes('/dashboard')) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-pantog-black border-t border-pantog-gray/30 md:hidden z-50">
      <nav className="flex items-center justify-around py-2">
        <NavItem 
          to="/dashboard" 
          icon={<Home size={20} />} 
          label="Home" 
          active={location.pathname === '/dashboard'}
        />
        <NavItem 
          to="/dashboard/analytics" 
          icon={<BarChart2 size={20} />} 
          label="Analytics" 
          active={location.pathname.includes('/analytics')}
        />
        <NavItem 
          to="/dashboard/new" 
          icon={<Plus size={20} className="text-pantog-green" />} 
          label="New" 
          active={location.pathname.includes('/new')}
          isPrimary
        />
        <NavItem 
          to="/dashboard/settings" 
          icon={<Settings size={20} />} 
          label="Settings" 
          active={location.pathname.includes('/settings')}
        />
        <NavItem 
          to="/dashboard/profile" 
          icon={<User size={20} />} 
          label="Profile" 
          active={location.pathname.includes('/profile')}
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  isPrimary?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, active, isPrimary = false }) => {
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center px-2 ${
        active ? 'text-pantog-green' : 'text-gray-400'
      }`}
      aria-label={label}
    >
      <div className={`p-1 rounded-full ${isPrimary ? 'bg-pantog-black shadow-sm shadow-pantog-green/20' : ''}`}>
        {icon}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default MobileNavigation;
