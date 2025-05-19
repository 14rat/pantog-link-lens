
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const GlobalFooter: React.FC = () => {
  return (
    <footer className="bg-pantog-gray/30 py-4 px-6 border-t border-pantog-gray/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-green"></div>
            <span className="text-gray-400 text-sm">Todos os sistemas operacionais</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/docs" className="text-gray-400 hover:text-pantog-green text-sm transition-colors">
              Documentação
            </Link>
            <Link to="/support" className="text-gray-400 hover:text-pantog-green text-sm transition-colors">
              Suporte
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-pantog-green text-sm transition-colors">
              Termos
            </Link>
          </div>
          
          <Button variant="outline" size="sm" className="border-pantog-gray hover:bg-pantog-gray/20 text-white text-sm">
            Enviar Feedback
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
