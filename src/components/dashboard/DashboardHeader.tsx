
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard</h1>
      
      <div className="flex gap-2 items-center">
        <Button 
          size="sm" 
          className="bg-pantog-green text-pantog-black hover:bg-pantog-green-dark"
        >
          <Plus size={16} className="mr-1" /> Novo Link
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
