
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardCardProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, icon, children, className }) => {
  return (
    <Card className={`bg-pantog-gray border-pantog-gray hover:border-pantog-green/50 transition-colors ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium text-white">{title}</CardTitle>
        <div className="text-pantog-green">{icon}</div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
