
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  priority?: 'low' | 'medium' | 'high';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  className = '',
  priority = 'medium'
}) => {
  // Set visual emphasis based on priority
  const cardClasses = {
    low: 'bg-pantog-gray',
    medium: 'bg-pantog-gray border border-transparent hover:border-pantog-green/30',
    high: 'bg-gradient-to-br from-pantog-gray to-[#252525] border border-pantog-green/20'
  };

  return (
    <div className={`rounded-xl p-6 card-hover transition-all duration-300 ${cardClasses[priority]} ${className}`}>
      <div className="w-12 h-12 bg-pantog-green/20 flex items-center justify-center rounded-lg mb-4 transition-all duration-300 hover:bg-pantog-green/30">
        <Icon className="text-pantog-green" size={24} />
      </div>
      <h3 className="text-white text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
