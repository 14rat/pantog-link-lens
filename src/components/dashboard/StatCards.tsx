
import React from 'react';
import DashboardCard from '@/components/DashboardCard';
import { BarChart3, Link, Link2, Users } from 'lucide-react';

interface StatCardsProps {
  sidebarCollapsed: boolean;
}

const StatCards: React.FC<StatCardsProps> = ({ sidebarCollapsed }) => {
  return (
    <div className={`grid grid-cols-1 gap-4 md:gap-6 ${
      sidebarCollapsed 
        ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'md:grid-cols-2 lg:grid-cols-3'
    } mb-8`}>
      <DashboardCard title="Total de Links" icon={<Link2 />}>
        <div className="flex items-center">
          <p className="text-3xl font-bold text-white">12</p>
          <span className="text-sm text-pantog-green ml-2">+3 este mês</span>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Cliques Totais" icon={<BarChart3 />}>
        <div className="flex items-center">
          <p className="text-3xl font-bold text-white">1,243</p>
          <span className="text-sm text-pantog-green ml-2">
            <span className="flex items-center">
              +18% <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m5 12 7-7 7 7"></path><path d="M12 19V5"></path></svg>
            </span>
          </span>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Taxa de Conversão" icon={<Users />}>
        <div className="flex items-center">
          <p className="text-3xl font-bold text-white">24.8%</p>
          <span className="text-sm text-pantog-green ml-2">+2.3% este mês</span>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Links Ativos" icon={<Link />}>
        <div className="flex items-center">
          <p className="text-3xl font-bold text-white">8</p>
          <span className="text-sm text-gray-400 ml-2">de 12 links</span>
        </div>
      </DashboardCard>
    </div>
  );
};

export default StatCards;
