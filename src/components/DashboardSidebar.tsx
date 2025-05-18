
import React from 'react';
import Logo from './Logo';
import { Link, useLocation } from 'react-router-dom';
import { BarChart3, Home, Link2, LogOut, Settings, User } from 'lucide-react';

const DashboardSidebar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Link2, label: 'Meus Links', path: '/dashboard/links' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
    { icon: User, label: 'Perfil', path: '/dashboard/profile' },
    { icon: Settings, label: 'Configurações', path: '/dashboard/settings' },
  ];
  
  return (
    <aside className="w-64 h-screen bg-pantog-gray fixed left-0 top-0 flex flex-col">
      <div className="p-6">
        <Logo />
      </div>
      
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`flex items-center px-3 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-pantog-green text-pantog-black font-medium'
                    : 'text-gray-300 hover:bg-pantog-black/30'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-pantog-black/30">
        <Link 
          to="/logout" 
          className="flex items-center px-3 py-3 rounded-lg text-gray-300 hover:bg-pantog-black/30 transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sair
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
