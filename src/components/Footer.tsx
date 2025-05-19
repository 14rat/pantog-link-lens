
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-pantog-gray/30 py-10 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-400 max-w-md">
              Gerencie e analise suas URLs encurtadas com facilidade.
              Obtenha insights valiosos sobre o desempenho dos seus links.
            </p>
            
            <div className="mt-6 flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse-green"></div>
              <span className="text-gray-400 text-sm">Todos os sistemas operacionais</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-pantog-green transition-colors">Home</Link></li>
              <li><Link to="/features" className="hover:text-pantog-green transition-colors">Funcionalidades</Link></li>
              <li><Link to="/pricing" className="hover:text-pantog-green transition-colors">Preços</Link></li>
              <li><Link to="/docs" className="hover:text-pantog-green transition-colors">Documentação</Link></li>
              <li><Link to="/support" className="hover:text-pantog-green transition-colors">Suporte</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/terms" className="hover:text-pantog-green transition-colors">Termos de Uso</Link></li>
              <li><Link to="/privacy" className="hover:text-pantog-green transition-colors">Política de Privacidade</Link></li>
              <li><Link to="/cookies" className="hover:text-pantog-green transition-colors">Política de Cookies</Link></li>
              <li><Link to="/compliance" className="hover:text-pantog-green transition-colors">Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-gray-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Pantog. Todos os direitos reservados.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-pantog-green transition-colors">Twitter</Link>
            <Link to="#" className="hover:text-pantog-green transition-colors">LinkedIn</Link>
            <Link to="#" className="hover:text-pantog-green transition-colors">Github</Link>
            <Link to="#" className="hover:text-pantog-green transition-colors">YouTube</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
