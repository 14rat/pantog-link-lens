
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pantog-black p-4 text-white">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-medium mb-4">Página não encontrada</h2>
        <p className="text-gray-400 mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            variant="outline" 
            className="border-pantog-gray hover:bg-pantog-gray/20"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} className="mr-2" />
            Voltar
          </Button>
          
          <Link to="/">
            <Button className="bg-pantog-green text-pantog-black hover:bg-pantog-green/90 w-full sm:w-auto">
              <Home size={18} className="mr-2" />
              Ir para Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
