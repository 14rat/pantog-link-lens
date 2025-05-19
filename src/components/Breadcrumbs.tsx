
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  homeHref?: string;
  showHomeIcon?: boolean;
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  homeHref = '/',
  showHomeIcon = true,
  className = ''
}) => {
  return (
    <nav aria-label="Breadcrumbs" className={`flex items-center text-sm ${className}`}>
      <ol className="flex items-center flex-wrap">
        {showHomeIcon && (
          <li className="flex items-center">
            <Link 
              to={homeHref}
              className="text-gray-400 hover:text-pantog-green transition-colors focus:outline-none focus:ring-2 focus:ring-pantog-green rounded-sm"
              aria-label="Página inicial"
            >
              <Home size={16} />
            </Link>
          </li>
        )}
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight size={14} className="mx-2 text-gray-500" aria-hidden="true" />
            
            {item.href ? (
              <Link 
                to={item.href}
                className="text-gray-400 hover:text-pantog-green transition-colors focus:outline-none focus:ring-2 focus:ring-pantog-green rounded-sm"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-white" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
