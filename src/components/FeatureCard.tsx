
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-pantog-gray rounded-xl p-6 card-hover">
      <div className="w-12 h-12 bg-pantog-green/20 flex items-center justify-center rounded-lg mb-4">
        <Icon className="text-pantog-green" size={24} />
      </div>
      <h3 className="text-white text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

export default FeatureCard;
