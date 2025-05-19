
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  Menu, 
  ChevronDown 
} from 'lucide-react';
import Logo from './Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

interface GlobalHeaderProps {
  currentPage?: string;
  parentPages?: Array<{name: string, url: string}>;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ 
  currentPage = 'Dashboard',
  parentPages = []
}) => {
  const [notificationCount, setNotificationCount] = useState(3);

  return (
    <header className="py-3 px-4 lg:px-8 bg-pantog-black border-b border-pantog-gray/50 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          
          {/* Breadcrumbs */}
          <nav className="hidden md:flex items-center text-sm">
            <Link to="/dashboard" className="text-gray-400 hover:text-pantog-green transition-colors">
              Home
            </Link>
            
            {parentPages.map((page, index) => (
              <React.Fragment key={index}>
                <span className="mx-2 text-gray-500">/</span>
                <Link 
                  to={page.url} 
                  className="text-gray-400 hover:text-pantog-green transition-colors"
                >
                  {page.name}
                </Link>
              </React.Fragment>
            ))}
            
            {currentPage && (
              <>
                <span className="mx-2 text-gray-500">/</span>
                <span className="text-white">{currentPage}</span>
              </>
            )}
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex relative">
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-64 pl-10 bg-pantog-gray/50 border-pantog-gray text-white focus:border-pantog-green"
            />
            <Search size={16} className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
          </div>
          
          {/* Notifications */}
          <Button variant="ghost" className="relative" size="icon">
            <Bell size={20} className="text-gray-400" />
            {notificationCount > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-pantog-green text-pantog-black text-xs h-5 min-w-5 flex items-center justify-center rounded-full">
                {notificationCount}
              </Badge>
            )}
          </Button>
          
          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1 text-gray-300">
                <div className="w-8 h-8 rounded-full bg-pantog-gray flex items-center justify-center text-white">
                  U
                </div>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-pantog-gray border-pantog-gray text-white">
              <DropdownMenuItem className="hover:bg-pantog-black/30 cursor-pointer">
                Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-pantog-black/30 cursor-pointer">
                Configurações
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-pantog-black/30 cursor-pointer text-red-400">
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
